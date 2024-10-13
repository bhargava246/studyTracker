import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import StudyForm from './components/StudyForm';
import Dashboard from './components/Dashboard';

const App = () => {
  const [studies, setStudies] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [totalLag, setTotalLag] = useState(0);
  const [streak, setStreak] = useState(0); // New state for streak

  const fetchStudies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/study');
      setStudies(response.data.studies);
    } catch (error) {
      console.error('Error fetching study data:', error);
    }
  };

  // Toggle night mode
  const toggleNightMode = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  // Calculate total lag based on a 10 hours/day target
  const calculateLag = () => {
    const startDate = new Date(); // Set your start date
    const currentDate = new Date();
    const daysElapsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)); // Days since start date
    const expectedHours = daysElapsed * 10; // Expected total hours
    const actualHours = studies.reduce((total, study) => total + study.hours, 0); // Total hours studied
    const lag = expectedHours - actualHours;
    setTotalLag(lag > 0 ? lag : 0); // Set total lag only if the user is behind
  };

  // Calculate study streak (consecutive days with 10+ hours)
  const calculateStreak = () => {
    const sortedStudies = [...studies].sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    let currentStreak = 0;
    let streakDays = 0;

    for (let i = 0; i < sortedStudies.length; i++) {
      const study = sortedStudies[i];
      const studyDate = new Date(study.date);
      const nextDate = new Date(sortedStudies[i + 1]?.date);

      // Check if user logged 10 or more hours on the current day
      if (study.hours >= 10) {
        streakDays++;
      } else {
        streakDays = 0; // Reset streak if less than 10 hours
      }

      // Check if next day is consecutive
      const dayDifference = (nextDate - studyDate) / (1000 * 60 * 60 * 24);
      if (i < sortedStudies.length - 1 && dayDifference === 1) {
        currentStreak = streakDays;
      } else if (dayDifference > 1 || i === sortedStudies.length - 1) {
        break; // If there's a gap, break the streak
      }
    }

    setStreak(currentStreak); // Set the current streak
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  useEffect(() => {
    calculateLag();
    calculateStreak(); // Calculate streak every time studies update
  }, [studies]);

  return (
    <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
      <div className="container">
        <h1>Study Hours Tracker</h1>
        <button onClick={toggleNightMode}>
          {isNightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
        </button>
      
        <div className="info-box">
          <StudyForm fetchStudies={fetchStudies} />
        </div>

        <div className="info-box">
          <Dashboard studies={studies} fetchStudies={fetchStudies} />
        </div>
        
        <div className="info-box">
          <p>Total Lag (Hours): {totalLag} hours</p>
          <p>Current Streak: {streak} days</p> {/* Display streak here */}
        </div>
      </div>
    </div>
  );
};

export default App;
