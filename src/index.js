import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import getFirebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
