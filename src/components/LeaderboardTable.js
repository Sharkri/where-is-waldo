import React from "react";
import { PropTypes } from "prop-types";
import LeaderboardSubmission from "./LeaderboardSubmission";
import "../css/LeaderboardTable.css";

function LeaderboardTable({ leaderboard }) {
  if (!leaderboard) {
    return <p className="no-active-level">No level selected.</p>;
  }

  if (!leaderboard.length) {
    return <p className="no-submissions">No submissions yet, be the first!</p>;
  }

  // sort leaderboard from least time taken to most
  const sortedLeaderboard = leaderboard.sort(
    (a, b) => a.timeTaken - b.timeTaken
  );

  return (
    <div className="leaderboard-table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th scope="col">#</th>
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
    </div>
  );
}

LeaderboardTable.defaultProps = {
  leaderboard: undefined,
};

LeaderboardTable.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
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
  ),
};

export default LeaderboardTable;
