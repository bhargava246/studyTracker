import React, { useState, useEffect } from 'react';

const Dashboard = ({ studies }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [remainingHours, setRemainingHours] = useState(5850); // Total goal hours

  useEffect(() => {
    const total = studies.reduce((total, study) => total + study.hours, 0);
    setTotalHours(total);
    setRemainingHours(5850 - total); // Goal is 5850 hours
  }, [studies]);

  return (
    <div>
      <h2>Study Tracker Dashboard</h2>
      <div className="info-box">
        <p>Total Hours Studied: {totalHours}</p>
        <p>Remaining Hours: {remainingHours}</p>
      </div>
      <h3>Study Logs:</h3>
      <ul>
        {studies.map((study, index) => (
          <li key={index}>
            {study.hours} hours on {new Date(study.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
