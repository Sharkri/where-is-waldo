import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Leaderboard from "./components/Leaderboard";
import Header from "./components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import PhotoPage from "./components/PhotoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels/:id" element={<PhotoPage />} />
          <Route
            path="/leaderboard"
            element={
              <Leaderboard
                leaderboard={[
                  // FAKE LEADERBOARD TO VISUALIZE (CHANGE LATER)
                  {
                    place: 1,
                    name: "Alice",
                    startTime: new Date(0),
                    endTime: new Date(12345),
                    dateSubmitted: new Date("1/2/1970"),
                    id: 1,
                  },
                  {
                    place: 2,
                    name: "John",
                    startTime: new Date(0),
                    endTime: new Date(12346),
                    dateSubmitted: new Date("1/2/1971"),
                    id: 2,
                  },
                  {
                    place: 3,
                    name: "Bob",
                    startTime: new Date(0),
                    endTime: new Date(12347),
                    dateSubmitted: new Date("7/23/2008"),
                    id: 3,
                  },
                  {
                    place: 4,
                    name: "Emmanuel",
                    startTime: new Date(1234),
                    endTime: new Date(504395),
                    dateSubmitted: new Date("5/2/2021"),
                    id: 4,
                  },
                ]}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
