// server.js
const express = require('express');
const app = express();
const port = 3000; // Change this to your desired port number

// Import the database connection function and models
const connectDB = require('./database');
const { Benefit, Plan } = require('./models');

// Parse JSON request bodies
app.use(express.json());

// Start the server and connect to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
});

// Define your endpoints here
const endpoints = require('./endpoints');
app.use('/api', endpoints);