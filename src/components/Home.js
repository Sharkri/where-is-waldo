import React, { useEffect, useState } from "react";
import LevelPreviewCard from "./LevelPreviewCard";
import "../css/Home.css";
import getLevels from "../helper/levels";

function Home() {
  // CHANGE LATER
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    getLevels().then(setLevels);
  }, []);

  if (levels == null) return <div>Loading...</div>;

  return (
    <div className="home">
      {levels.map((level) => (
        <LevelPreviewCard level={level} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
