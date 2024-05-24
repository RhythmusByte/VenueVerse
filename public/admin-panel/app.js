const express = require('express');
const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const path = require('path');
require('dotenv').config(); 

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_ADMIN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint to fetch bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 2808;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
