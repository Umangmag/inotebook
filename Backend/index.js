const connectToMongo = require('./db');
const express = require('express');

connectToMongo(); 

// Import Express.js module


// Initialize the Express application
const app = express();

// Define the port number for the server to listen on
const port = 3000;

// Define a route for the root URL ('/') and specify the response
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send 'Hello, World!' as the response
});

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating the server is running
});