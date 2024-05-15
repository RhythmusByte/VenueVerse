const express = require("express");
const app = express();
const dbConfig = require('./db');

const port = process.env.PORT || 5000;

// Define a route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, world! This is the root URL.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
