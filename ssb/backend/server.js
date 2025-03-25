const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Barber = require('./models/barber');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with proper error handling
mongoose.connect('mongodb+srv://hvrSSB04:qwertySSB1234@clusterssb.6zmqk.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Only start the server after successful database connection
    app.listen(4000, () => console.log('Server running on port 4000'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with error
  });

// API endpoint for creating a barber account
app.post('/create-account', async (req, res) => {
  try {
    const {firstName, lastName, email, phone, shopName, address, experience, specialties, password} = req.body;
    
    console.log('Received data:', req.body); // Log the received data
    
    const barberDoc = await Barber.create({
      firstName,
      lastName,
      email,
      phone,
      shopName,
      address,
      experience,
      specialties,
      password
    });
    
    console.log('Barber created:', barberDoc);
    res.json(barberDoc);
  } catch (error) {
    console.error('Error creating barber:', error);
    res.status(500).json({ error: error.message });
  }
});

// Don't call app.listen here - it's now in the mongoose.connect callback