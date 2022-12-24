import React from "react";
import { PropTypes } from "prop-types";
import LeaderboardSubmission from "./LeaderboardSubmission";
import "../css/LeaderboardTable.css";

function LeaderboardTable({ leaderboard }) {
  // sort leaderboard from least time taken to most
  const sortedLeaderboard = leaderboard.sort(
    (a, b) => a.timeTaken - b.timeTaken
  );

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
        {sortedLeaderboard.map((submission, index) => (
          <LeaderboardSubmission
            submission={{ ...submission, place: index + 1 }}
            key={submission.id}
          />
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
      timeTaken: PropTypes.oneOfType([
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
