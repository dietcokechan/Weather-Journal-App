// Setup empty JS object to act as endpoint for all routes
projectData = {};

// requestuestuire Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
// Spin up the server
function listening()
{
    console.log(`server is running on localhost: ${port}`);
};

// Callback to debug

// Initialize all route with a callback function
// Get Route
app.get('/getWeather', getData);
function getData(req, res)
{
    res.send(projectData);
};

// Post Route
app.post('/postWeather', postData);
function postData(req, res)
{
    projectData = { ...req.body };
    res.end();
};