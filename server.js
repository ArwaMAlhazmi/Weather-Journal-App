// Setup empty JS object to act as endpoint for all routes
projectData = [{"date": "15 August 2020", "temperature": "75", "feelings": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, vitae."}];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Callback function to complete GET '/all'
app.get('/all', (req, res)=>{
	res.send(projectData);
}); 

// Post Route
app.post('/add', (req, res)=>{

	const postData = {};
	postData.date = req.body.date;
	postData.temperature = req.body.temperature;
	postData.feelings = req.body.feelings;

	projectData.push(postData);
	res.send(true);
}); 

//start server
app.listen(3000, ()=>{
	console.log('server started on port 3000');
});