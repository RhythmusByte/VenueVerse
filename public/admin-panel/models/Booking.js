const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String, // Change phone to mobile
  fromDate: Date, // Change from to fromDate
  toDate: Date    // Change to toDate
});

module.exports = mongoose.model('Booking', bookingSchema);
