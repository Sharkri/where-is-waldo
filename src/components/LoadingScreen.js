import React from "react";
import "../css/LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="screen">
      <div className="loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
}

export default LoadingScreen;
