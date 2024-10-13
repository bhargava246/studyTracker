import React, { useState } from 'react';
import axios from 'axios';

const StudyForm = ({ fetchStudies }) => {
  const [hours, setHours] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/study', { hours: Number(hours) });
      setHours(''); // Clear the input field
      if (fetchStudies) {
        fetchStudies(); // Call fetchStudies after adding new hours
      }
    } catch (error) {
      console.error('Error adding study hours:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        placeholder="Enter study hours"
        required
      />
      <button type="submit">Add Hours</button>
    </form>
  );
};

export default StudyForm;
