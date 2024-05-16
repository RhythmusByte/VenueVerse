// Importing necessary modules
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

// Defining the path to the templates directory
const templatePath = path.join(__dirname, '../templates');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Setting the view engine to Handlebars
app.set('view engine', 'hbs');

// Setting the directory where views are located
app.set('views', templatePath);

// Route to render the login page
app.get('/', (req, res) => {
  res.render('login'); 
});

// Route to render the signup page
app.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Starting the server on port 1080
app.listen(1080, () => {
  console.log('Port connected successfully!!');
});
