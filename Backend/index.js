const connectToMongo = require('./db');
const express = require('express');

connectToMongo(); 

// Import Express.js module


// Initialize the Express application
const app = express();

// Define the port number for the server to listen on
const port = 5000;

app.use(express.json())

// Available Routes

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js')) 
 

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating the server is running
});