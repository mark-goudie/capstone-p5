// Environment variables
const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes

let projectData = {};

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

// Setup Server

const port = 8080;
const server = app.listen(port, () =>
  console.log(`Server running on localhost:${port}`)
);

// Get request

app.get("/all", function (req, res) {
  res.send(projectData);
});

// Post response

let data = [];

app.post("/create", function (req, res) {
  data.push(req.body);
  projectData["newEntry"] = data;
});
