import React, { useState } from "react";
import PageTransition from "./PageTransition";
import { motion } from "framer-motion";
import lina1 from "../assets/Lina1.jpg";
import lina2 from "../assets/Lina2.jpg";
import lina3 from "../assets/Lina3.jpg";
import lina4 from "../assets/Lina4.jpg";
import lina5 from "../assets/Lina5.jpg";
import "../SocioEconomic.css";


const descriptions = {
  lina1: {
    title: "Fertility Rates in Selected Sahel Countries (2010–2023)",
    points: [
      "This graph illustrates fertility rates (births per woman) in Mali, Niger, Nigeria, and Senegal over the past decade.",
      "A declining trend is evident, particularly in Senegal and Nigeria, suggesting demographic transitions.",
      "Factors influencing this decline include improved female education, enhanced healthcare access, and family planning initiatives.",
      "Western Sahara, due to its geographical proximity, may experience similar fertility trends if comparable socio-economic policies are implemented."
    ]
  },
  lina2: {
    title: "Trends in Female Education Across Selected Sahel Countries",
    points: [
      "This dataset highlights the progression of female education levels in Mali, Niger, Nigeria, and Senegal.",
      "Significant improvements are observed, especially in Nigeria and Senegal, where female literacy and enrollment rates have risen substantially.",
      "Niger lags behind, with lower female education levels correlating with higher fertility rates.",
      "A strong inverse relationship exists between female education and fertility rates, reinforcing the importance of educational access.",
      "If Western Sahara prioritizes female education, a similar decline in fertility rates could be anticipated."
    ]
  },
  lina3: {
    title: "Fertility Rate vs. Female Education Levels",
    points: [
      "This scatter plot examines the relationship between female education levels and fertility rates in Mali, Niger, Nigeria, and Senegal.",
      "A negative correlation is evident: as female education levels rise, fertility rates decrease.",
      "Niger demonstrates the highest fertility rates, corresponding to the lowest levels of female education.",
      "Senegal, with higher education levels, exhibits lower fertility rates, highlighting the role of education in demographic transitions.",
      "These findings underscore the importance of educational investments in shaping population growth trends."
    ]
  },
  lina4: {
    title: "Population Density vs. Fertility Rate",
    points: [
      "This visualization explores the link between population density and fertility rates in selected Sahel countries.",
      "Higher population density (e.g., Nigeria) often corresponds with lower fertility rates, possibly due to better access to healthcare and family planning services.",
      "Conversely, countries with lower population density, such as Niger, exhibit higher fertility rates.",
      "Urbanization and economic opportunities in densely populated areas may contribute to lower birth rates."
    ]
  },
  lina5: {
    title: "Population Density vs. Female Education Levels",
    points: [
      "This analysis investigates the relationship between population density and female education levels in Sahel countries.",
      "Higher population density (e.g., Nigeria) correlates with improved access to education, particularly for women.",
      "Niger, characterized by a lower population density, exhibits lower female education levels.",
      "Regions with greater access to educational infrastructure tend to have better female literacy rates, which in turn influence demographic and economic development."
    ]
  }
};

const SocioEconomic = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <PageTransition>
      <div className="socio-container">
        
        {/* Hero Section */}
        <section className="socio-hero">
          <div className="socio-hero-overlay">
            <div className="hero-content">
              <h1 className="socio-title">Socio-Economic Factors</h1>
              <p className="socio-subtitle">
                Understanding the relationship between land degradation and socio-economic conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Socio-Economic Impact Section */}
        <section className="socio-content">
          <h2 className="section-title">Impact of Socio-Economic Factors</h2>
          <p className="section-description">
            Land degradation is influenced by multiple socio-economic factors such as population growth, 
            poverty, agricultural practices, and urbanization. These factors play a crucial role in 
            determining the vulnerability of different regions to degradation.
          </p>

          {/* Charts with Tooltips */}
          <div className="charts-grid">
            {[lina1, lina2, lina3, lina4, lina5].map((image, index) => {
              const key = `lina${index + 1}`;
              return (
                <motion.div
                  key={key}
                  className="chart-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <img src={image} alt={descriptions[key].title} className="chart-image" />
                  {hovered === key && (
                    <motion.div 
                      className="tooltip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>{descriptions[key]?.title}</h4>
                      <ul>
                        {descriptions[key]?.points?.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default SocioEconomic;
