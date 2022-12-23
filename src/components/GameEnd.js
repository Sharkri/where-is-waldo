import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "../css/Dropdown.css";
import formatTimeDuration from "../helper/formatTimeDuration";
import submitToLeaderboard from "../helper/submitToLeaderboard";
import getLevelById from "../helper/getLevelById";

function GameEnd({ start, end, levelId }) {
  const [name, setName] = useState("");

  return (
    <div>
      <p>You finished in {formatTimeDuration(start, end)}!</p>
      <form
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const level = await getLevelById(levelId);
          // if leaderboard doesn't exist yet
          if (!level.leaderboard) level.leaderboard = [];
          // push new entry to leaderboard
          level.leaderboard.push({ name, start, end });

          submitToLeaderboard(levelId, level);
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
  levelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default GameEnd;
