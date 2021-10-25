import { getCountdown } from "./getCountdown";
import { getTripLength } from "./getTripLength";
// import { Loader } from "@googlemaps/js-api-loader";

// Create a new date instance dynamically with JS //

let d = new Date();
let dateToday = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

// Geonames data //

const baseURL = "http://api.geonames.org/searchJSON?";
const GEONAMES_USERNAME = "markgoudie";

// Weatherbit data //

const WEATHERBIT_API_KEY = "07baaa66d9474c75b4e1b85d129a82ec";
const weatherbitURL = "http://api.weatherbit.io/v2.0/current?";

// Pixabay data //

const pixabayURL = "https://pixabay.com/api/?";
const PIXABAY_API_KEY = "23770721-9e6b37df3a019ae92c78a3c3a";

// Rest Countries //

const restCountriesURL = "http://api.countrylayer.com/v2/name/";
const REST_API_KEY = "2192a2fb4c9b216a7d577ca52001cced";

// Google Maps //

const googleMapsURL = "https://maps.googleapis.com/maps/api/staticmap?center=";
const GOOGLE_API_KEY = "AIzaSyCTjMUnkF9ycmBqFcgIWKET8xDx9gCz_qU";

// Event listener to add function to existing HTML DOM element

document.getElementById("search").addEventListener("click", generateCoords);

// Function called by event listener //

export async function generateCoords(e) {
  e.preventDefault();

  const cityInput = document.getElementById("cityInput").value;
  const arrival = document.getElementById("arrival").valueAsDate;
  const departure = document.getElementById("departure").valueAsDate;
  const countdown = getCountdown(arrival);
  const tripLength = getTripLength(arrival, departure);

  const geoData = await getCoords(baseURL, GEONAMES_USERNAME, cityInput);
  const weatherData = await getWeather(
    weatherbitURL,
    WEATHERBIT_API_KEY,
    geoData.geonames[0].lat,
    geoData.geonames[0].lng
  );
  const countryData = geoData.geonames[0].countryName;

  const restData = await getRestData(
    restCountriesURL,
    REST_API_KEY,
    countryData
  );

  // Google Maps API data //

  const map =
    googleMapsURL + cityInput + "&zoom=12&size=400x400&key=" + GOOGLE_API_KEY;

  const pixData = await getPicture(pixabayURL, PIXABAY_API_KEY, cityInput);

  const icon = weatherData.data[0].weather.icon;
  const imageURL =
    "https://www.weatherbit.io/static/img/icons/" + icon + ".png";

  await postData("http://localhost:3000/create", {
    dateToday: dateToday,
    weatherData: weatherData,
    city: cityInput,
    countryData: countryData,
    capital: restData[0].capital,
    region: restData[0].region,
    arrivalDate: arrival,
    departureDate: departure,
    days: countdown,
    tripLength: tripLength,
    picture: pixData,
    map: map,
    icon: imageURL,
  });
  updateUI(pixData.hits[1].webformatURL);
}

//  Geonames API data //

const getCoords = async (baseURL, GEONAMES_USERNAME, cityInput) => {
  const response = await fetch(
    `${baseURL}username=${GEONAMES_USERNAME}&q=${cityInput}`
  );
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Weatherbit API data //

export const getWeather = async (
  weatherbitURL,
  WEATHERBIT_API_KEY,
  lat,
  lng
) => {
  const response = await fetch(
    `${weatherbitURL}lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
  );
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// REST API data //
export const getRestData = async (
  restCountriesURL,
  REST_API_KEY,
  countryData
) => {
  const response = await fetch(
    `${restCountriesURL}${countryData}?access_key=${REST_API_KEY}& Fulltext`
  );
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Pixabay API data //

export const getPicture = async (pixabayURL, PIXABAY_API_KEY, cityInput) => {
  const response = await fetch(
    `${pixabayURL}key=${PIXABAY_API_KEY}&q=${cityInput}&image_type=photo`
  );
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const postData = async (url = "", data = {}) => {
  console.log("API Data: ", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newWeatherData = await response.json();
    console.log(newWeatherData);
    return newWeatherData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to update UI //

const updateUI = async (webformatURL) => {
  const request = await fetch("http://localhost:3000/all");
  try {
    const allData = await request.json();
    document.getElementById(
      "dateToday"
    ).innerHTML = `Today's date: ${allData.dateToday}  (dd/mm/yyyy)`;
    document.getElementById("picture").src = webformatURL;
    document.getElementById("picture").alt = allData.city;
    document.getElementById("icon").innerHTML = `<img src=${allData.icon}>`;
    document.getElementById("icon").innerHTML = `<img src=${allData.map}>`;
    document.getElementById(
      "city"
    ).innerHTML = `Your trip's destination is: ${allData.city}`;
    document.getElementById(
      "days"
    ).innerHTML = `Only ${allData.days} days to go!`;
    document.getElementById(
      "tripLength"
    ).innerHTML = `Your trip will last ${allData.tripLength} days`;
    document.getElementById(
      "capital"
    ).innerHTML = `This capital city is: ${allData.capital}`;
    document.getElementById(
      "country"
    ).innerHTML = `Country: ${allData.countryData}`;
    // if (allData.days <= 7) {
    document.getElementById(
      "currentWeather"
    ).innerHTML = `Current weather is: ${allData.weatherData.data[0].temp}°C`;
  } catch (error) {
    console.log("error", error);
  }
};

// Global Variables //

// URL endpoint (Zip) //

// const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// const apiKey = ",us&APPID=a1e49d3d4d260adc7270879910d76956&units=metric";

// // Create a new date instance dynamically with JS //

// let d = new Date();
// let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

// // Event listener to add function to existing HTML DOM element

// document.getElementById("generate").addEventListener("click", generateWeather);

// function generateWeather() {
//   getWeather(baseURL, zip, apiKey)
//     .then(function (newData) {
//       const icon = newData.weather[0].icon;
//       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//       postData("/create", {
//         location: newData.name,
//         date: date,
//         temp: newData.main.temp,
//         description: newData.weather[0].description,
//         feelings: feelings.value,
//         icon: imageURL,
//       });
//     })
//     .then(() => retrieveData("/all"))
//     .then(() => updateUI());
// }

// // Function to GET Web API Data //

// const getWeather = async (baseURL, zip, apiKey) => {
//   const response = await fetch(`${baseURL}${zip.value}${apiKey}`);
//   const weatherData = await response.json();
//   console.log(weatherData);
//   return weatherData;
// };

// // Function to POST data - Boilerplate from course content //

// const postData = async (url = "", data = {}) => {
//   console.log(data);
//   const response = await fetch(url, {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   try {
//     const newData = await res.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//     // Appropriately handle the error
//   }
// };

// // Function to GET Project Data //

// const retrieveData = async (url = "") => {
//   const request = await fetch(url);
//   try {
//     // Transform into JSON
//     const allData = await request.json();
//     return allData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // Function to update UI //

// const updateUI = async () => {
//   const request = await fetch("/all");

//   try {
//     const allData = await request.json();

//     document.getElementById("location").innerHTML = `Location: ${
//       allData.newEntry[allData.newEntry.length - 1].location
//     }`;
//     document.getElementById("date").innerHTML = `Date: ${
//       allData.newEntry[allData.newEntry.length - 1].date
//     }  (dd/mm/yyyy)`;
//     document.getElementById("temp").innerHTML = `Temperature: ${
//       allData.newEntry[allData.newEntry.length - 1].temp
//     } Celsius`;
//     document.getElementById("description").innerHTML = `Description: ${
//       allData.newEntry[allData.newEntry.length - 1].description
//     }`;
//     document.getElementById("content").innerHTML = `How I'm feeling: ${
//       allData.newEntry[allData.newEntry.length - 1].feelings
//     }`;
//     document.getElementById("icon").innerHTML = `<img src=${
//       allData.newEntry[allData.newEntry.length - 1].icon
//     }>`;
//   } catch (error) {
//     console.log("error", error);
//   }
// };
