import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import formatTimeDuration from "../helper/formatTimeDuration";

function LeaderboardSubmission({ submission }) {
  const formattedDate = format(submission.dateSubmitted, "MMM L, y");
  return (
    <tr className="leaderboard-submission">
      <td>{submission.place}</td>
      <td>{submission.name}</td>
      <td>{formatTimeDuration(submission.startTime, submission.endTime)}</td>
      <td>{formattedDate}</td>
    </tr>
  );
}

LeaderboardSubmission.propTypes = {
  submission: PropTypes.shape({
    place: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    endTime: PropTypes.instanceOf(Date).isRequired,
    dateSubmitted: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default LeaderboardSubmission;
