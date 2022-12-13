import React from "react";
import PropTypes from "prop-types";

function LeaderboardSubmission({ submission }) {
  return (
    <tr className="leaderboard-submission">
      <td>{submission.place}</td>
      <td>{submission.name}</td>
    </tr>
  );
}

LeaderboardSubmission.propTypes = {
  submission: PropTypes.shape({
    place: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

export default LeaderboardSubmission;
