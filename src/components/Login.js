import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css"; // Ensure this is correctly linked

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated authentication (Replace with actual backend logic)
    if (username === "testuser" && password === "password") {
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard after login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="register-container"> {/* Matches Register.js styling */}
      <h2>Login</h2> {/* Title at the top */}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="animated-button">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
