import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Auth.css"; // Ensure CSS is correctly linked
import logo from "../GG_logo.png"; // Update with correct path

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Dark Overlay */}
      <div className="background-overlay"></div>

      {/* Main Content */}
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Animated Text */}
        <div className="welcome-text">
          <motion.h1
            className="welcome-title"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to <span className="highlight">GeoGuard</span>
          </motion.h1>

          <motion.p
            className="welcome-description"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            Restore the Sahel. Restore the Earth. 
          </motion.p>

          {/* Buttons */}
          <div className="button-container">
            <Link to="/login" className="welcome-button">
              Login
            </Link>
            <Link to="/register" className="welcome-button secondary">
              Register
            </Link>
          </div>
        </div>

        {/* Right Side - Large Spinning Logo */}
        <motion.div
          className="welcome-image"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src={logo} alt="Spinning Logo" className="spinning-logo" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
