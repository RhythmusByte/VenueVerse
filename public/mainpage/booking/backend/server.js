require("dotenv").config({ path: "../.env" }); // Load environment variables from the root .env file
console.log("MongoDB URI:", process.env.MONGODB_URI); // Debug statement

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "../")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Booking schema and model
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

// API endpoint to handle bookings
app.post("/api/bookings", async (req, res) => {
  const { name, email, mobile, fromDate, toDate } = req.body;
  const newBooking = new Booking({ name, email, mobile, fromDate, toDate });

  try {
    await newBooking.save();
    console.log("Booking saved:", newBooking); // Debug statement
    res.json({ message: "Booking successful!" });
  } catch (err) {
    console.log("Error saving booking:", err); // Debug statement
    res.status(500).json({ message: "Server error" });
  }
});

// Handle any other routes with index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// Start the server
const PORT = process.env.PORT || 2808;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
