// Setup empty JS object to act as endpoint for all routes

let projectData = {};

// Environment variables

const dotenv = require("dotenv");
dotenv.config();

const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const REST_API_KEY = process.env.REST_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Require Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

// Dependencies //

const bodyParser = require("body-parser");

/* Middleware*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

// Setup Server

app.get("/getKey", (req, res) => {
  res.send({
    GEONAMES_USERNAME: GEONAMES_USERNAME,
    WEATHERBIT_API_KEY: WEATHERBIT_API_KEY,
    PIXABAY_API_KEY: PIXABAY_API_KEY,
    REST_API_KEY: REST_API_KEY,
    GOOGLE_API_KEY: GOOGLE_API_KEY,
  });
});

const port = 3000;
const server = app.listen(port, () =>
  console.log(`Server is running on localhost:${port}`)
);
console.log(`Geonames:${GEONAMES_USERNAME}`);
console.log(`Weatherbit:${WEATHERBIT_API_KEY}`);
console.log(`Pixabay:${PIXABAY_API_KEY}`);
console.log(`Rest Countries:${REST_API_KEY}`);
console.log(`Google:${GOOGLE_API_KEY}`);

//Get request

app.get("/all", function (req, res) {
  res.send(projectData);
  console.log("Project Data");
});

// Post response

let data = [];

app.post("/create", function (req, res) {
  console.log(req.body);
  projectData = req.body;
  res.send(projectData);
});
