import React from 'react';
import { Link } from 'react-router-dom';
import overlayImage from '../assets/Logo7.png';

function NavBar({ isLoggedIn, logout }) {
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <img src={overlayImage} alt="Logo" />
      </div> */}
      <ul className="navbar-list">
      <div className="navbar-logo">
        <img src={overlayImage} alt="Logo" />
      </div>
      <div className= "navbar-item-container">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts">All Posts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register">Register</Link>
        </li>
        {!isLoggedIn ? ( 
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li className="navbar-item">
            <button onClick={logout}>Logout</button>
          </li>
          
        )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;