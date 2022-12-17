import React from "react";
import LevelPreviewCard from "./LevelPreviewCard";
import "../css/Home.css";
import levels from "../levels";

function Home() {
  return (
    <div className="home">
      {levels.map((level) => (
        <LevelPreviewCard level={level} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
