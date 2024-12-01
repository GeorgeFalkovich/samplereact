import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  useEffect(() => {
    const triangle = document.querySelector(".triangle");
    if (triangle) {
      triangle.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        {
          duration: 5000,
          iterations: Infinity,
        }
      );
    }
  }, []);

  return (
    <div className="app-container">
      <svg width="200" height="200" className="triangle">
        <polygon points="100,10 40,198 190,78" fill="blue" />
      </svg>
      <p className="triangle-text">Color: Blue</p>
      <p className="version">Version: 1.0</p>
    </div>
  );
}

export default App;
