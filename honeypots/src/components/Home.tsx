import React, { useState } from 'react';
import './Home.css'; // If you want to add specific styles for Home page

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    email: '',
    secondaryEmail: '',  // Honeypot
    favouriteColor: ''    // Honeypot
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot fields to detect bots
    if (formData.secondaryEmail || formData.favouriteColor) {
      alert("Bot detected!");
      return;
    }

    // Proceed if the honeypot fields are empty
    console.log(formData); // Handle form submission
  };

  return (
    <div className="home-container">
      <h1>Welcome to PIKAPTCHA</h1>
      <p>
        This project aims to develop a user-friendly Passive Captcha model - API which could be plugged to UIDAI's application.
      </p>

      <div className="info-section">
        <h2>About PIKAPTCHA</h2>
        <p>
          PIKAPTCHA is an innovative solution being developed as part of the Intel AI Hackathon 2024 - Harnessing the power of Intel OneAPI . 
          Enhances online security with a dual-layered CAPTCHA-free approach, using passive detection and interactive challenges to differentiate between humans and bots while addressing evolving cyber threats.
        </p>
      </div>

      <div className="link-section">
        <a
          className="explore-link"
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore our TRAPLINK!
        </a>
      </div>

      {/* Register Section */}
      <div className="register-section">
        <h2 >Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="text"
    name="username"
    placeholder="Username"
    value={formData.username}
    onChange={handleChange}
    required
  />
  <input
    type="tel"
    name="phoneNumber"
    placeholder="Phone Number"
    value={formData.phoneNumber}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  
  {/* Honeypot Fields */}
  <input
    type="email"
    name="secondaryEmail"
    placeholder="Secondary Email"
    value={formData.secondaryEmail}
    onChange={handleChange}
    className="honeypot"
  />
  <input
    type="text"
    name="favouriteColor"
    placeholder="Favourite Color"
    value={formData.favouriteColor}
    onChange={handleChange}
    className="honeypot"
  />
  
  <button type="submit">Submit</button>
</form>
      </div>
    </div>
  );
};

export default Home;
