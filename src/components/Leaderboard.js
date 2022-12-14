import React from "react";
import { PropTypes } from "prop-types";
import LeaderboardSubmission from "./LeaderboardSubmission";
import "../css/Leaderboard.css";

function Leaderboard({ leaderboard }) {
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
          {leaderboard.map((submission) => (
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

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startTime: PropTypes.instanceOf(Date).isRequired,
      endTime: PropTypes.instanceOf(Date).isRequired,
      dateSubmitted: PropTypes.instanceOf(Date).isRequired,
    }).isRequired
  ).isRequired,
};

export default Leaderboard;
