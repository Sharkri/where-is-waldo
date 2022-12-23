import { intervalToDuration } from "date-fns";
import React from "react";
import { PropTypes } from "prop-types";

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function GameTimer({ startTime, currentTime }) {
  const duration = intervalToDuration({ start: startTime, end: currentTime });
  // Manually add ms since duration doesn't give it
  duration.ms = Math.round(((currentTime - startTime) % 1000) / 10);

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

  return <div className="game-timer">{formattedTimer}</div>;
}

GameTimer.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  currentTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};

export default GameTimer;
