const express = require('express');
const mongoose = require('mongoose');
const Booking = require('./models/Booking'); // Ensure the correct path
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://venueverse:VenueVerse@venue-verse.lu2nlwz.mongodb.net/bookings', {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
