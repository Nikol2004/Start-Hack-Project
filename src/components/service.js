// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/land_degradation_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  district: String,
  registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Define District Schema
const districtSchema = new mongoose.Schema({
  name: String,
  population: String,
  degradation: String,
  solution: String,
  tifFilePath: String, // Path to the .tif file
});

const District = mongoose.model("District", districtSchema);

// API Endpoints

// Register a new user
app.post("/api/register", async (req, res) => {
  const { username, email, password, district } = req.body;
  const newUser = new User({ username, email, password, district });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Get district statistics
app.get("/api/district/:name", async (req, res) => {
  const districtName = req.params.name;
  const district = await District.findOne({ name: districtName });
  if (district) {
    res.json(district);
  } else {
    res.status(404).json({ message: "District not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});