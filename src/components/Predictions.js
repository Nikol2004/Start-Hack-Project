import React from "react";
import PageTransition from "./PageTransition";
import { motion } from "framer-motion";
import "../Predictions.css";

const Predictions = () => {
    return (
        <PageTransition>
            <div className="predictions-container">
                
                {/* Hero Section */}
                <section className="predictions-hero">
                    <div className="hero-overlay">
                        <div className="hero-content">
                            <h1 className="predictions-title">Future Land Degradation Risks</h1>
                            <p className="predictions-subtitle">
                                Insights from advanced predictive modeling
                            </p>
                        </div>
                    </div>
                </section>

                {/* Predictions Content */}
                <section className="predictions-content">
                    <h2 className="section-title">Projected Land Degradation in 2050</h2>
                    <p className="section-description">
                        Leveraging AI-driven analysis of environmental factors, we predict 
                        potential land degradation hotspots. The visualization below highlights 
                        the estimated risk levels for different districts.
                    </p>

                    {/* Image Instead of Chart */}
                    <motion.div 
                        className="chart-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img src={"/images/Prediction Graph.jpg"} alt="Land Degradation Predictions" className="prediction-chart" />
                    </motion.div>

                    {/* Summary Section */}
                    <section className="summary-section">
                        <h2 className="section-title">Key Insights</h2>
                        <p>
                            Our model identifies Barkeiwel, Bou Lahrath, and Boumeid as the 
                            most vulnerable districts, facing the highest risk of degradation by 2050.
                            Proactive conservation efforts and sustainable land management strategies 
                            will be crucial in mitigating these risks.
                        </p>
                    </section>
                </section>
            </div>
        </PageTransition>
    );
};

export default Predictions;
