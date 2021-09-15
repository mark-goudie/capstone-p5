# Notes

- version: node -v
- install cors: npm install cors
- install body-parser: npm install body-parser
- npm install express

- run a file: node (filename)

## Development Strategy

1. Set up project environment. - Done

## 2. Add a GET route that returns the projectData object in your server code Then, add a POST route that adds incoming data to projectData.

3. Acquire API credentials from OpenWeatherMap website. Use your credentials and the base url to create global variables at the top of your app.js code. - Done

## 4. After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.

## 5. Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request.
