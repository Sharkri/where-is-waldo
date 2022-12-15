import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { initializeApp } from "firebase/app";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import getFirebaseConfig from "./firebase-config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
