import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import sihLogo from './sih.png';
import { fetchLanguages } from './api/languageAPI';
import Home from './components/Home'; 
import PikaptchaPage from './components/PikaptchaPage'; 
import './App.css';

interface Language {
  code: string;
  label: string; 
}

const App: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [mouseMovements, setMouseMovements] = useState<{ x: number; y: number; timestamp: number }[]>([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const data = await fetchLanguages();
      setLanguages(data);
    };

    loadLanguages();
  }, []);

  const navigate = useNavigate(); // Hook for navigation

  const handleLanguageSelect = (langCode: string) => {
    // Redirect to the PikaptchaPage on language selection
    navigate('/pikaptcha');
  };

  // Function to handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const timestamp = Date.now();
    setMouseMovements((prev) => [...prev, { x: clientX, y: clientY, timestamp }]);
  };

  useEffect(() => {
    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSaveMouseMovements = () => {
    // Save the mouseMovements to your desired storage method
    console.log("Mouse Movements Data:", mouseMovements);
    // You can also send this data to your backend API for further processing
    // e.g., fetch('/api/saveMouseData', { method: 'POST', body: JSON.stringify(mouseMovements) });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={sihLogo} className="App-logo-small" alt="SIH Logo" />
        <h1 className="team-text">Team Name: Zoeo</h1>
        <h2 className="sih-code">Team ID: A0064</h2>
        <h2 className="sih-code">Problem Statement Title: Develop a ML Model based solution to redefine CAPTCHA.</h2>
        <h1>UIDAI</h1>
      </header>

      <div className="content">
        <h2>Select your Preferred Language</h2>
        <div className="languages-grid">
          {languages.map((lang) => (
            <button 
              key={lang.code} 
              className="language-btn"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
        
      </div>

      {/* React Router v6 Routes Setup */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pikaptcha" element={<PikaptchaPage />} />
      </Routes>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
