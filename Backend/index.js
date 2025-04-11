const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo(); 

// Import Express.js module

const app = express();   

// Define the port number for the server to listen on
const port = 5000;
app.use(cors())
app.use(express.json())

// Available Routes

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js')) 
 

// Start the server and have it listen on the defined port
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`); // Log a message to the console indicating the server is running
});