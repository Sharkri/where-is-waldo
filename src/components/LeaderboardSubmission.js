import React from "react";
import PropTypes from "prop-types";
import { format, formatDistanceToNowStrict } from "date-fns";
import formatTimeDuration from "../helper/formatTimeDuration";

function getNumberWithOrdinal(number) {
  const ordinals = ["th", "st", "nd", "rd"];
  const tens = number % 100;
  return number + (ordinals[(tens - 20) % 10] || ordinals[tens] || ordinals[0]);
}

function LeaderboardSubmission({ submission }) {
  const dateSubmitted = new Date(submission.dateSubmitted);
  const formattedDate = format(dateSubmitted, "MMM d, y");
  const distanceToNow = formatDistanceToNowStrict(dateSubmitted, {
    addSuffix: true,
  });

  return (
    <tr className="leaderboard-submission">
      <td className="submission-place">
        {getNumberWithOrdinal(submission.place)}
      </td>
      <td className="submission-name">{submission.name}</td>
      <td className="submission-time">
        {formatTimeDuration(submission.startTime, submission.endTime)}
      </td>
      <td className="submission-date" title={distanceToNow}>
        {formattedDate}
      </td>
    </tr>
  );
}

LeaderboardSubmission.propTypes = {
  submission: PropTypes.shape({
    place: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
    ]).isRequired,

    endTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
      .isRequired,

    dateSubmitted: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
};

export default LeaderboardSubmission;
