import React from 'react';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const navigate = useNavigate();


  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-title">InsureHub</div>
        <div className="header-buttons">
          <button className="header-button" onClick={() => navigate('/login')}>Login</button>
          <button className="header-button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>
      <main className="homepage-main">
        <section className="welcome-section">
          <h1>Welcome to InsuranceHub</h1>
          <p>Your one-stop solution for all insurance needs. Secure your future today!</p>
          <button className="cta-button">Explore Now</button>

          
        </section>

 

      </main>
    </div>
  );
};

export default Homepage;
