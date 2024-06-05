// backend/models/results.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  passport: String, // Add unique ID validation here
  listening: Number,
  reading: Number,
  writing: Number,
  speaking: Number,
  overall: Number,
  dob: Date, // Store Date of Birth
  candidateName: String,
  candidateNum: String,
  centreNum: String,
  testDate: Date
});

module.exports = mongoose.model('Result', resultSchema);