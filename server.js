// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// complete GET '/all'
app.get("/all", (req, res) => {
  res.send(projectData);
});

//complete POST route
app.post('/add', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['feeling'] = req.body.feeling;
    res.send(projectData);
    console.log(req.body);
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
