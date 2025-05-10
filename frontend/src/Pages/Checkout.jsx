import React, { useState, useContext } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';


const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Confirmed!', formData);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Optionally clear form or redirect here
  };

  // ✅ Get total amount from ShopContext
  const cartTotal = getTotalCartAmount().toFixed(2);

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <h3>Payment Information</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            required
          />

          <button type="submit" className="checkout-button">
            Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-summary-details">
            <p>Items: <span>₹{cartTotal}</span></p>
            <p>Shipping: <span>Free</span></p>
            <hr />
            <h4>Total: <span>₹{cartTotal}</span></h4>
          </div>
        </div>
      </div>

      {/* ✅ Confirmation Popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-box">
            <h3>✅ Order Confirmed!</h3>
            <p>Thank you, your order has been placed successfully.</p>
            <button onClick={handleCloseConfirmation}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
