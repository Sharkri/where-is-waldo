import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
