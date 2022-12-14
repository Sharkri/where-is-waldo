import React from "react";
import { PropTypes } from "prop-types";
import LeaderboardSubmission from "./LeaderboardSubmission";

function Leaderboard({ leaderboard }) {
  return (
    <table>
      <tbody className="leaderboard">
        {leaderboard.map((submission) => (
          <LeaderboardSubmission submission={submission} key={submission.id} />
        ))}
      </tbody>
    </table>
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
