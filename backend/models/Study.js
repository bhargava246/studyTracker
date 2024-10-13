const mongoose = require('mongoose');

// Define the study hours schema
const studySchema = new mongoose.Schema({
  date: {
    type: String,    // Storing date as a string (you could also use Date type)
    required: true,  // This field is mandatory
  },
  hours: {
    type: Number,    // Hours studied should be a number
    required: true,  // This field is mandatory
  },
});

// Create a model based on the schema
const Study = mongoose.model('Study', studySchema);

// Export the model for use in other parts of the application
module.exports = Study;
