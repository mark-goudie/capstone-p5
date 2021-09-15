// Global Variables //

// URL endpoint (Zip) //

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&APPID=a1e49d3d4d260adc7270879910d76956&units=metric";

// Create a new date instance dynamically with JS //

let d = new Date();
let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", generateWeather);

function generateWeather() {
  getWeather(baseURL, zip, apiKey)
    .then(function (newData) {
      const icon = newData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      postData("/create", {
        location: newData.name,
        date: date,
        temp: newData.main.temp,
        description: newData.weather[0].description,
        feelings: feelings.value,
        icon: imageURL,
      });
    })
    .then(() => retrieveData("/all"))
    .then(() => updateUI());
}

// Function to GET Web API Data //

const getWeather = async (baseURL, zip, apiKey) => {
  const response = await fetch(`${baseURL}${zip.value}${apiKey}`);
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

// Function to POST data - Boilerplate from course content //

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // Appropriately handle the error
  }
};

// Function to GET Project Data //

const retrieveData = async (url = "") => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to update UI //

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();

    document.getElementById("location").innerHTML = `Location: ${
      allData.newEntry[allData.newEntry.length - 1].location
    }`;
    document.getElementById("date").innerHTML = `Date: ${
      allData.newEntry[allData.newEntry.length - 1].date
    }  (dd/mm/yy)`;
    document.getElementById("temp").innerHTML = `Temperature: ${
      allData.newEntry[allData.newEntry.length - 1].temp
    } Celsius`;
    document.getElementById("description").innerHTML = `Description: ${
      allData.newEntry[allData.newEntry.length - 1].description
    }`;
    document.getElementById("content").innerHTML = `How I'm feeling: ${
      allData.newEntry[allData.newEntry.length - 1].feelings
    }`;
    document.getElementById("icon").innerHTML = `<img src=${
      allData.newEntry[allData.newEntry.length - 1].icon
    }>`;
  } catch (error) {
    console.log("error", error);
  }
};
