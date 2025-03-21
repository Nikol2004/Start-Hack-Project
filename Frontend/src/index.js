import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use "react-dom/client" for React 18
import App from "./App"; // Ensure you have App.js in src

// ✅ Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
