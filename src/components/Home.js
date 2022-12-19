import React from "react";
import LevelPreviewCard from "./LevelPreviewCard";
import "../css/Home.css";
// import getLevels from "../helper/levels";

function Home() {
  // CHANGE LATER
  const levels = [];
  return (
    <div className="home">
      {levels.map((level) => (
        <LevelPreviewCard level={level} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
