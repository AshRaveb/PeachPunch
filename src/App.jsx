import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Components/Home";
import Registrationform from "./Components/Registrationform";
import Login from "./Components/Login";
import { logIn, logOut, isLoggedIn } from "./Helpers/authhelpers";
import { fetchWithHeaders } from "./Helpers/api";
import { Carousel } from "./Components/Carousel";

export default function App() {
  const BASE_URL = 'https://fakestoreapi.com';
  const storedToken = localStorage.getItem("authToken");
  const [token, setToken] = useState(storedToken || "");

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setToken(authToken);
    }
  }, []);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken("");
  };

  return (
    <Router>
      <div className="app">
        <Navbar isLoggedIn={Boolean(token)} logout={handleLogout} />
        <Carousel /> {/* Include the Carousel component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}