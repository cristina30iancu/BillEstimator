const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://iancucristina:stud@clusterseminar.rytdhbp.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;