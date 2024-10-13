const express = require('express');
const router = express.Router();
const Study = require('../models/Study');

// POST endpoint to save study hours
router.post('/', async (req, res) => {
  const { date, hours } = req.body;

  // Create a new study entry
  const newStudy = new Study({ date, hours });

  try {
    await newStudy.save(); // Save the entry to the database
    res.status(201).json({ message: 'Study hours saved!' }); // Send success response
  } catch (error) {
    res.status(400).json({ message: 'Error saving study hours', error });
  }
});

// GET endpoint to retrieve study hours and calculations
router.get('/', async (req, res) => {
  try {
    const studies = await Study.find(); // Retrieve all study entries
    const totalHours = studies.reduce((acc, study) => acc + study.hours, 0); // Calculate total hours
    const remainingHours = 5850 - totalHours; // Calculate remaining hours
    const daysLeft = Math.floor((new Date('2026-05-20') - new Date()) / (1000 * 60 * 60 * 24)); // Calculate days left
    const dailyHoursRequired = remainingHours > 0 ? remainingHours / daysLeft : 0; // Calculate daily hours required

    // Send the calculated data as response
    res.json({
      totalHours,
      remainingHours,
      dailyHoursRequired,
      studies,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving study hours', error });
  }
});

module.exports = router; // Export the router
