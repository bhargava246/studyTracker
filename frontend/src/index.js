import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // Import your CSS file (optional)
import App from './App'; // Import the main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This references the root div in the public/index.html
);

