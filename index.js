const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Result = require('./models/results'); // Adjust the path to your model

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://result:result@cluster0.ajwm45j.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: ['https://ieltsidp.online', 'http://localhost:3000'], // Replace with your frontend URLs
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Allow cookies to be sent cross-origin
}));

// API Routes
app.post('/results', async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully', result: newResult });
  } catch (err) {
    res.status(400).json({ message: 'Error saving result', error: err });
  }
});

app.get('/results/:passport', async (req, res) => {
  try {
    const result = await Result.findOne({ passport: req.params.passport });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching result', error: err });
  }
});

app.get("/", async (req, res) => {
  res.send("Hello from backend ilets");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
