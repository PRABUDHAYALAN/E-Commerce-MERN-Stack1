import React from 'react';
import './Hero.css';
import hand_icon from '../assets/banner5.png';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <img src={hand_icon} alt="Banner" className="hero-background" />
      
      <div className="hero-overlay">
        <div className="hero-buttons">
          <button className="hero-button">Buy Now</button>
          <button className="hero-button">Shop All</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
