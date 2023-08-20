const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030;

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
// Import the database connection function and models
const connectDB = require('./database');

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