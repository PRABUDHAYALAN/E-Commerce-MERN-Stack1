import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon2.png';
import user_icon from '../assets/user_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("auth-token");

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <p>SHOPPER</p>
        </div>
      </div>

      <ul className="nav-menu">
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
      </ul>

      <div className="nav-right">
        <Link to="/cart">
          <div className="cart-wrapper">
            <img src={cart_icon} alt="Cart" />
            <span className="cart-count">{getTotalCartItems()}</span>
          </div>
        </Link>

        {isAuthenticated ? (
          <img
            src={user_icon}
            alt="User"
            className="user-icon"
            onClick={() => navigate('/dashboard')}
          />
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
