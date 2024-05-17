const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://venueverse:VenueVerse@venue-verse.lu2nlwz.mongodb.net/login')
.then(() => {
  console.log('MongoDB Connected Successfully!!');
})
.catch(() => {
  console.log('MongoDB Connection Failed!!')
});

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model('Login-Collection', logInSchema);

module.exports = collection;