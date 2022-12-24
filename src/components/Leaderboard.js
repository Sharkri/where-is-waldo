import React, { useEffect, useState } from "react";
import "../css/Leaderboard.css";
import LoadingScreen from "./LoadingScreen";
import useLevels from "../helper/useLevels";
import LevelPreviewCard from "./LevelPreviewCard";
import LeaderboardTable from "./LeaderboardTable";

function Leaderboard() {
  const levels = useLevels();
  const [activeLevel, setActiveLevel] = useState(null);
  document.body.style.overflow = "unset";

  useEffect(() => {
    if (levels?.length) setActiveLevel(levels[0]);
  }, [levels]);

  if (levels == null) return <LoadingScreen />;

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-levels">
        {levels.map((level) => (
          <button
            type="button"
            key={level.id}
            aria-label="level"
            className="leaderboard-level"
            onClick={() => {
              setActiveLevel(level);
            }}
          >
            <LevelPreviewCard level={level} />
          </button>
        ))}
      </div>
      {activeLevel != null && (
        <LeaderboardTable leaderboard={activeLevel.leaderboard} />
      )}
    </div>
  );
}

export default Leaderboard;
