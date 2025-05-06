import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon2.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar">
      {/* Left: Logo + Hamburger */}
      <div className="nav-left">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <p>SHOPPER</p>
        </div>
        <button className="hamburger" onClick={toggleMenu}>☰</button>
      </div>

      {/* Center: Navigation Menu */}
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <li onClick={() => setMenu("shop")}>
          <Link to="/" className={menu === "shop" ? "active" : ""}>Shop</Link>
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens" className={menu === "mens" ? "active" : ""}>Men</Link>
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens" className={menu === "womens" ? "active" : ""}>Women</Link>
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" className={menu === "kids" ? "active" : ""}>Kids</Link>
        </li>

        {/* Mobile: Actions + Cart */}
        <div className="mobile-actions">
          {localStorage.getItem("auth-token") ? (
            <>
              <button onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}>Logout</button>
              <a href="https://e-commerce-mern-stack1admin4.vercel.app/" target="_blank" rel="noopener noreferrer">
                <button className='admin-btn'>Admin</button>
              </a>
            </>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}

          <Link to="/cart">
            <div className="cart-wrapper">
              <img src={cart_icon} alt="Cart" />
              <span className="cart-count">{getTotalCartItems()}</span>
            </div>
          </Link>
        </div>
      </ul>

      {/* Right: Login & Cart for Desktop */}
      <div className="nav-right">
        {localStorage.getItem("auth-token") ? (
          <>
            <button onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}>Logout</button>
            <a href="https://e-commerce-mern-stack1admin4.vercel.app/" target="_blank" rel="noopener noreferrer">
              <button>Admin</button>
            </a>
          </>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}

        <Link to="/cart">
          <div className="cart-wrapper">
            <img src={cart_icon} alt="Cart" />
            <span className="cart-count">{getTotalCartItems()}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
