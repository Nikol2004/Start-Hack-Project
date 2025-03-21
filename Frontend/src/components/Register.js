import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    district: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); // ✅ Controls fade-in message
  const navigate = useNavigate();

  const districts = [
    "Aghorat", "Barkeiweil", "Blajmil", "Bou Lahrath", "Boumdeid",
    "Daghveg", "El Ghabra", "El Ghaira", "El Megue", "Gueller",
    "Guerou", "Hamed", "Hseiy Tin", "Kamour", "Kankoussa",
    "Kiffa", "Kouroudjel", "Lavtah", "Laweissi", "Lebheir",
    "Legrane", "Nouamlein", "Oudeiy Jrid", "R'Dheidhie", "Sani",
    "Tenaha"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData)); // ✅ Save user details
    setShowSuccess(true); // ✅ Show fade-in success message

    setTimeout(() => {
      navigate("/dashboard"); // ✅ Redirect after 2 seconds
    }, 2000);
  };

  return (
    <div className="register-container">
      {showSuccess && (
        <div className="success-message">
          Registration Successful.
        </div>
      )}
      
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="animated-button">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
