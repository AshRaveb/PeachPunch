import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import overlayImage from '../Images/logo.jpg';
import {
  ShoppingCart,
  House,
  SignIn,
  UserPlus,
  ShoppingBagOpen,
  Signout,
} from "phosphor-react";

function NavBar({ isLoggedIn, logout }) {
  return (
    <nav className="navbar">
     
      <ul className="navbar-list">
      <div className="navbar-logo">
        <img src={overlayImage} alt="Logo" />
      </div>
      <div className= "navbar-item-container">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts">Cart</Link>
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