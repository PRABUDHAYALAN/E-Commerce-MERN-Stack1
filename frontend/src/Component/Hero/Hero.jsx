import React, { useEffect, useState } from 'react';
import './Hero.css';

import hand_icon1 from '../assets/Banners1.png';
import hand_icon2 from '../assets/Banners2.png';
import hand_icon3 from '../assets/Banners3.png';
import hand_icon4 from '../assets/Banners4.png';

const images = [hand_icon1, hand_icon2, hand_icon3, hand_icon4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic Slider Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Manual Dot Navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="hero" id="hero">
      <div className="slider-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
