import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from './logo.png';
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
  const [isBotDetected, setIsBotDetected] = useState(false); // To flag bot detection

  useEffect(() => {
    const loadLanguages = async () => {
      const data = await fetchLanguages();
      setLanguages(data);
    };

    loadLanguages();
  }, []);

  const navigate = useNavigate();

  const handleLanguageSelect = (langCode: string) => {
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

  // Honeypot event handler for detecting bot interaction
  const handleHoneypotClick = () => {
    setIsBotDetected(true); // Flag as bot detected
    console.log("Bot interaction detected");
  };

  const handleSaveMouseMovements = () => {
    console.log("Mouse Movements Data:", mouseMovements);
    // You can also send this data to your backend API for further processing
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo-small" alt="Logo" />
        <h1 className="team-text">Team Name: Zoeo</h1>
        <h2 className="sih-code">Team ID: A0064</h2>
        <h2 className="sih-code">Problem Statement Taken :  REDEFINING CAPTCHA WITH AI GENERATED HONEYPOTS</h2>
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

      {/* Hidden honeypot link for bot detection */}
      <a 
        href="#"
        style={{ display: 'none' }} 
        onClick={handleHoneypotClick}
        aria-hidden="true"
      >
        Hidden Honeypot Link
      </a>

      {/* React Router v6 Routes Setup */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pikaptcha" element={<PikaptchaPage />} />
      </Routes>

      {/* Optional logging of bot detection */}
      {isBotDetected && <p style={{ color: 'red' }}>Bot Detected!</p>}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
