import React from 'react';
import './PikaptchaPage.css'; // Add relevant styles for this page
 
const PikaptchaPage: React.FC = () => {
  return (
    <div className="pikaptcha-page">
      <header className="pikaptcha-header">
        <h1>About Pikaptcha</h1>
        <p>
          Pikaptcha is an innovative web platform developed as part of the BuzzOnHackathon by IIT Kanpur, powered by Intel using the Intel Cloud Developer Platform. This tool predicts and analyzes the Air Quality Index (AQI) across various cities and stations in India in real-time. Built with NextJS, Tailwind CSS, and Django, it incorporates advanced time series models, including LSTM networks, optimized with Intel AI Analytics Toolkit for enhanced performance.
        </p>
        <p>Read more about its key features below:</p>
        <ul>
          <li>AQI Prediction</li>
          <li>Real-time Monitoring</li>
          <li>Interactive AQI Simulator</li>
          <li>AI-driven Insights</li>
        </ul>
        <p>Empowering users with actionable data for informed decisions and environmental awareness.</p>
      </header>

      <div className="prediction-section">
        <h2>Predict AQI</h2>
        {/* Add components for predicting AQI here */}
      </div>

      <div className="city-data-section">
        <h2>Metro Cities - Air Quality Index</h2>
        {/* Add relevant components for city AQI data */}
      </div>
    </div>
  );
};

export default PikaptchaPage;
