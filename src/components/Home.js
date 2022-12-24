import React from "react";
import { Link } from "react-router-dom";
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
        <Link
          to={`levels/${level.id}`}
          aria-label="link to level"
          key={level.id}
        >
          <LevelPreviewCard level={level} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
