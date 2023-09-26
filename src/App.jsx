import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import AllPosts from "./Components/AllPosts";
import RegistrationForm from "./Components/RegistrationForm";
import Login from "./Components/Login";
import { logIn, logOut, isLoggedIn } from "./Helpers/authHelpers";
import CreatePostForm from "./Components/CreatePostForm";
import { fetchWithHeaders } from "./Helpers/api";

export default function App() {
  const COHORT_NAME = "2302-ACC-PT-WEB-PT-A";
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  const storedToken = localStorage.getItem("authToken"); // Check if there is a token in localStorage
  const [token, setToken] = useState(storedToken || ""); // Set initial value to storedToken

  // State to store the authentication token
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken"); // Check if there's a token in sessionStorage
    if (authToken) {
      setToken(authToken); // Set the token in state
    }
  }, []);

  // Function to handle successful login and set token
  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("authToken", newToken); // Store the token in localStorage
    setToken(newToken); // Set the token in state
  };

  // Function to handle logout and clear token
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    setToken("");  // Clear the token from state
       // Reload the page to trigger re-render
    // Reload the page to trigger re-render
    // window.location.reload();
  };

  return (
    <Router>
      <div className="app">
      <NavBar isLoggedIn={Boolean(token)} logout={handleLogout} />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<AllPosts BASE_URL={BASE_URL} token={token} />} />
          <Route path="/register" element={<RegistrationForm BASE_URL={BASE_URL} />} />
          <Route path="/login" element={<Login BASE_URL={BASE_URL} handleLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}