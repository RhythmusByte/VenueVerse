const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  fromDate: Date, 
  toDate: Date    
});

module.exports = mongoose.model('Booking', bookingSchema);
