import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import GameLevel from "./components/GameLevel";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/levels/:id" element={<GameLevel />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <>
              <Header />
              <Leaderboard />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
