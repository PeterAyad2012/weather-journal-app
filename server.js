// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('webApp'));
const port = 8080;

// Spin up the server
const server = app.listen(port, listening);
function listening(){
    console.log(`This server is running and listen for port ${port}`);
}

// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// Post Route
app.post('/add', addData);

function addData(req,res){
    projectData.push(req.body);
}
  