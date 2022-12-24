import React from "react";
import LevelPreviewCard from "./LevelPreviewCard";
import "../css/Home.css";
import LoadingScreen from "./LoadingScreen";
import useLevels from "../helper/useLevels";

function Home() {
  const levels = useLevels();

  if (levels == null) return <LoadingScreen />;

  return (
    <div className="home">
      {levels.map((level) => (
        <LevelPreviewCard level={level} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
