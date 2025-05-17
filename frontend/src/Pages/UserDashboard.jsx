import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { User,  Settings, LogOut, ArrowRight } from 'lucide-react';
import './CSS/UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  };

  return (
    <div className="user-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowRight size={20} />
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="account-settings">
              <Settings size={20} className="icon" />
              Account Settings
            </Link>
          </li>
         
          <li>
            <a
              href="https://e-commerce-mern-stack1admin4.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <User size={20} className="icon" />
              Admin Panel
            </a>
          </li>
          <li onClick={handleLogout} className="logout">
            <LogOut size={20} className="icon" />
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
