// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const Result = require('./models/results'); // Import your model

const app = express();
const port = process.env.PORT || 4000; // Port for your server

// Connect to MongoDB
mongoose.connect('mongodb+srv://result:result@cluster0.ajwm45j.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for your frontend

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

app.get("/", async (req,res)=>{
res.send("hello from backend")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
