import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "../css/Dropdown.css";
import formatTimeDuration from "../helper/formatTimeDuration";
import submitToLeaderboard from "../helper/submitToLeaderboard";

function GameEnd({ start, end, level }) {
  const [name, setName] = useState("");

  return (
    <div>
      <p>You finished in {formatTimeDuration(start, end)}!</p>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const newLevel = { ...level };
          // if leaderboard doesn't exist yet
          if (!newLevel.leaderboard) newLevel.leaderboard = [];
          // push new entry to leaderboard
          newLevel.leaderboard.push({ name, start, end });

          submitToLeaderboard(level.id, newLevel);
        }}
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
}

GameEnd.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  level: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default GameEnd;
