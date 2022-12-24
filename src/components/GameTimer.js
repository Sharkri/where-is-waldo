import { intervalToDuration } from "date-fns";
import React from "react";
import { PropTypes } from "prop-types";
import "../css/GameTimer.css";

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function GameTimer({ timeTaken }) {
  const duration = intervalToDuration({ start: 0, end: timeTaken });
  // Manually add ms since duration doesn't give it
  duration.ms = Math.round((timeTaken % 1000) / 10);

  let formattedTimer = "";
  // Pad all times with a zero
  Object.keys(duration).forEach((timeUnit) => {
    duration[timeUnit] = padZero(duration[timeUnit]);

    if (
      duration[timeUnit] !== "00" &&
      !["minutes", "seconds", "ms"].includes(timeUnit)
    )
      formattedTimer += `${duration[timeUnit]}:`;
  });

  formattedTimer += `${duration.minutes}:${duration.seconds}:${duration.ms}`;

  return <p className="game-timer">{formattedTimer}</p>;
}

GameTimer.propTypes = {
  timeTaken: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
};

export default GameTimer;
