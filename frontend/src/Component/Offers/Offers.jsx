import React from 'react';
import './Offers.css';
import bannerImage from '../assets/banner1.png'; // Replace with your actual image path

const Offers = () => {
  return (
    <div className="wholesale-banner">
      <div className="banner-content">
        <h1 className="banner-title">Shoppers Business</h1>
        <p className="banner-subtitle">Wholesale Price on Collection</p>
        <div className="offer-highlight">50% OFF</div>
        <p className="banner-details">
          Upto ₹1500 Cashback | Bulk Order Discount | Upto 20% GST Saving
        </p>
        <button className="shop-now-button">Shop Now</button>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Wholesale Offer" />
      </div>
    </div>
  );
};

export default Offers;
