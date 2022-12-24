import React from "react";
import LeaderboardSubmission from "./LeaderboardSubmission";
import "../css/Leaderboard.css";
import LoadingScreen from "./LoadingScreen";
import useLevels from "../helper/useLevels";

function Leaderboard() {
  const levels = useLevels();

  if (levels == null) return <LoadingScreen />;

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th scope="col">Place</th>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((submission) => (
            <LeaderboardSubmission
              submission={submission}
              key={submission.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
