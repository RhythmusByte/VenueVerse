const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection for login
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB for login");
}).catch(err => {
  console.error("Error connecting to MongoDB for login:", err);
});

// MongoDB connection for bookings
const bookingConnection = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

bookingConnection.on('connected', () => {
  console.log("Connected to MongoDB for bookings");
});

bookingConnection.on('error', (err) => {
  console.error("Error connecting to MongoDB for bookings:", err);
});

// Define User Schema for login
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Define Booking Schema for bookings
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
});

const Booking = bookingConnection.model("Booking", bookingSchema);

// Middleware to check session
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/");
};

// Login and Registration Routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.session.user = { email: email };
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).json({ error: "Unable to logout" });
    } else {
      res.redirect("/");
    }
  });
});

// Route to serve the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route to serve the signup page
app.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Route to serve the next page after login
app.get("/mainpage/index.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "mainpage", "index.html"));
});

// Booking Routes
app.post("/api/bookings", async (req, res) => {
  const { name, email, mobile, fromDate, toDate } = req.body;
  const newBooking = new Booking({ name, email, mobile, fromDate, toDate });

  try {
    await newBooking.save();
    console.log("Booking saved:", newBooking);
    res.json({ message: "Booking successful!" });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Catch-all route for handling non-matching routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
