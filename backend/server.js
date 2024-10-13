const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studyTracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Study Schema
const studySchema = new mongoose.Schema({
  hours: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Study = mongoose.model('Study', studySchema);

// API Endpoints
app.post('/api/study', async (req, res) => {
  const { hours } = req.body;
  try {
    const newStudy = new Study({ hours });
    await newStudy.save();
    res.status(201).json(newStudy);
  } catch (error) {
    res.status(400).json({ message: 'Error saving study hours' });
  }
});

app.get('/api/study', async (req, res) => {
  try {
    const studies = await Study.find();
    const totalHours = studies.reduce((total, study) => total + study.hours, 0);
    const remainingHours = 5850 - totalHours; // Goal is 5850 hours
    res.json({ totalHours, remainingHours, studies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching study hours' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
