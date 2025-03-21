import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import "../Dashboard.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { district: "Aghorat" };
  const [selectedDistrict, setSelectedDistrict] = useState(user.district);
  const [districtStats, setDistrictStats] = useState({});
  const [futurePrediction, setFuturePrediction] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const districts = [
    "Aghorat", "Barkeiweil", "Blajmil", "Bou Lahrath", "Boumdeid",
    "Daghveg", "El Ghabra", "El Ghaira", "El Megue", "Gueller",
    "Guerou", "Hamed", "Hseiy Tin", "Kamour", "Kankoussa",
    "Kiffa", "Kouroudjel", "Lavtah", "Laweissi", "Lebheir",
    "Legrane", "Nouamlein", "Oudeiy Jrid", "R'Dheidhie", "Sani",
    "Tenaha"
  ];

  const districtImages = {
    Aghorat: "aghorat.jpg",
    Barkeiweil: "barkeiweil.jpg",
    Blajmil: "blajmil.jpg",
    "Bou Lahrath": "bou-lahrath.jpg",
    Boumdeid: "boumdeid.jpg",
    Daghveg: "daghveg.jpg",
    "El Ghabra": "el-ghabra.jpg",
    "El Ghaira": "el-ghaira.jpg",
    "El Megue": "el-megue.jpg",
    Gueller: "gueller.jpg",
    Guerou: "guerou.jpg",
    Hamed: "hamed.jpg",
    "Hseiy Tin": "hseiy-tin.jpg",
    Kamour: "kamour.jpg",
    Kankoussa: "kankoussa.jpg",
    Kiffa: "kiffa.jpg",
    Kouroudjel: "kouroudjel.jpg",
    Lavtah: "lavtah.jpg",
    Laweissi: "laweissi.jpg",
    Lebheir: "lebheir.jpg",
    Legrane: "legrane.jpg",
    Nouamlein: "nouamlein.jpg",
    "Oudeiy Jrid": "oudeiy-jrid.jpg",
    "R'Dheidhie": "r-dheidhie.jpg",
    Sani: "sani.jpg",
    Tenaha: "tenaha.jpg"
  };

  const fetchDistrictStats = (district) => {
    console.log("Fetching data for:", district); // Debugging
    const mockData = {
      Aghorat: { population: "20,000", degradation: "Moderate", solution: "Reforestation & Water Conservation" },
      Barkeiweil: { population: "35,000", degradation: "Severe", solution: "Soil Regeneration & Erosion Control" },
      Blajmil: { population: "15,000", degradation: "Stable", solution: "Sustainable Agriculture Practices" },
      "Bou Lahrath": { population: "22,500", degradation: "Mild", solution: "Agroforestry & Soil Management" },
      Boumdeid: { population: "28,000", degradation: "Critical", solution: "Flood Prevention & Tree Planting" }
    };

    const defaultData = { population: "Unknown", degradation: "Unknown", solution: "No data available" };
    
    setDistrictStats(mockData[district] || defaultData);
    generateFuturePrediction(district);
  };

  const generateFuturePrediction = (district) => {
    const predictionTemplates = [
      `By 2030, ${district} is expected to experience a 10% increase in land degradation if preventive measures are not taken.`,
      `Agricultural sustainability in ${district} is projected to improve by 15% due to new conservation policies.`,
      `Soil erosion in ${district} is anticipated to rise by 20% due to reduced precipitation levels.`,
      `${district} could see a 30% improvement in vegetation cover if afforestation programs are implemented.`,
      `Water scarcity may impact farming in ${district} unless innovative irrigation techniques are adopted.`,
      `${district} is likely to witness a gradual recovery in land fertility over the next decade.`,
      `Desertification in ${district} could accelerate by 25% if urban expansion continues unchecked.`
    ];

    const randomPrediction = predictionTemplates[Math.floor(Math.random() * predictionTemplates.length)];
    setFuturePrediction(randomPrediction);
  };

  useEffect(() => {
    fetchDistrictStats(selectedDistrict);
  }, [selectedDistrict]);

  return (
    <PageTransition>
      <div className="dashboard-container">
        {/* Sidebar with Animated Dropdown */}
        <div className="dashboard-sidebar">
          <h3>Select District</h3>
          <div className="custom-dropdown">
            <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedDistrict} ▼
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul 
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {districts.map((district) => (
                    <li key={district} onClick={() => { setSelectedDistrict(district); setDropdownOpen(false); }}>
                      {district}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <Link to="/socioeconomic-impacts" className="sidebar-button">Socioeconomic Impacts</Link>
          <Link to="/predictions" className="sidebar-button">Predictions</Link>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDistrict}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="dashboard-hero" 
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${districtImages[selectedDistrict]})` }}>
                <div className="dashboard-header">
                  <h1 className="dashboard-title">The {selectedDistrict} District</h1>
                  <p className="dashboard-subtitle">Monitoring land degradation and suggesting solutions.</p>
                </div>
              </div>

              <div className="stats-section">
                <h2>Current Statistics for {selectedDistrict}</h2>
                <div className="stats-grid">
                  <div className="stats-card">
                    <h3>Population</h3>
                    <p>{districtStats.population}</p>
                  </div>
                  <div className="stats-card">
                    <h3>Degradation Status</h3>
                    <p>{districtStats.degradation}</p>
                  </div>
                  <div className="stats-card">
                    <h3>Recommended Solution</h3>
                    <p>{districtStats.solution}</p>
                  </div>
                </div>
              </div>

              <div className="prediction-section">
                <h2>Future AI Predictions</h2>
                <p>{futurePrediction}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;