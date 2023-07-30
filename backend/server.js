const express = require('express');
const app = express();
const port = 3000; 

// Import the database connection function and models
const connectDB = require('./database');
const { Benefit, Plan } = require('./models');

app.use(express.json());

// Start the server and connect to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
});

// Defining, declaring and using the endpoints here
const endpoints = require('./endpoints');
app.use('/api', endpoints);