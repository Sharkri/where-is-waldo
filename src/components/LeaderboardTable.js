import React from "react";
import { PropTypes } from "prop-types";
import LeaderboardSubmission from "./LeaderboardSubmission";
import "../css/Leaderboard.css";

function LeaderboardTable({ leaderboard }) {
  return (
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
          <LeaderboardSubmission submission={submission} key={submission.id} />
        ))}
      </tbody>
    </table>
  );
}

LeaderboardTable.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number,
      ]).isRequired,

      endTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number,
      ]).isRequired,

      dateSubmitted: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number,
      ]).isRequired,
    }).isRequired
  ).isRequired,
};

export default LeaderboardTable;
