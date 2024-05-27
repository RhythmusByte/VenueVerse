require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the schema and model
const auditoriumSchema = new mongoose.Schema({
  ownerName: String,
  auditoriumName: String,
  address: String,
  location: String,
  email: String,
  mobile: String,
  image1: String,
  image2: String,
  image3: String,
  description: String
});

const Auditorium = mongoose.model('Auditorium', auditoriumSchema);

// Route to handle form submission
app.post('/register', async (req, res) => {
  const newAuditorium = new Auditorium(req.body);

  try {
    await newAuditorium.save();
    res.status(200).json({ message: 'Auditorium registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving to database', error: err.message });
  }
});

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
