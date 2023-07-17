import React, { useEffect, useState } from "react";
import "../css/Leaderboard.css";
import { useSearchParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import useLevels from "../helper/useLevels";
import LevelPreviewCard from "./LevelPreviewCard";
import LeaderboardTable from "./LeaderboardTable";

function Leaderboard() {
  const levels = useLevels();
  const [searchParams] = useSearchParams();
  const levelId = searchParams.get("level");

  const [activeLevel, setActiveLevel] = useState({});

  useEffect(() => {
    if (levels == null || !levelId) return;

    const level = levels.find((lvl) => lvl.id === levelId);
    if (level) setActiveLevel(level);
  }, [levelId, levels]);

  document.body.style.overflow = "unset";

  if (levels == null) return <LoadingScreen />;

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">
        {activeLevel.name || "Select a level"}
      </h1>
      <div className="leaderboard-levels">
        {levels.map((level) => (
          <button
            type="button"
            key={level.id}
            aria-label="level"
            className="leaderboard-level"
            onClick={() => setActiveLevel(level)}
            data-isactive={level.id === activeLevel.id}
          >
            <LevelPreviewCard level={level} />
          </button>
        ))}
      </div>

      <h2 className="leaderboard-title">
        {activeLevel.name && `Leaderboard - ${activeLevel.name}`}
      </h2>
      <LeaderboardTable leaderboard={activeLevel.leaderboard} />
    </div>
  );
}

export default Leaderboard;
