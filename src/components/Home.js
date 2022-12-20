import React, { useEffect, useState } from "react";
import LevelPreviewCard from "./LevelPreviewCard";
import "../css/Home.css";
import getLevels from "../helper/levels";
import LoadingScreen from "./LoadingScreen";

function Home() {
  // CHANGE LATER
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    getLevels().then(setLevels);
  }, []);

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
