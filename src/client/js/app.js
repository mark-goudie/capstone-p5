import { getCountdown } from "./getCountdown";
import { getTripLength } from "./getTripLength";
import { updateUI } from "./updateUI";

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

document
  .getElementById("generate")
  .addEventListener("click", generateCoordinates);

// Function called by event listener //

export async function generateCoordinates(e) {
  e.preventDefault();

  const cityInput = document.getElementById("cityInput").value;
  const arrival = document.getElementById("departure").valueAsDate;
  const departure = document.getElementById("arrival").valueAsDate;
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

  await postData("http://localhost:8080/create", {
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
