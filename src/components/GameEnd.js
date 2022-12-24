import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "../css/GameEnd.css";
import formatTimeDuration from "../helper/formatTimeDuration";
import submitToLeaderboard from "../helper/submitToLeaderboard";
import getLevelById from "../helper/getLevelById";

function GameEnd({ start, end, levelId }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const updateLeaderboard = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const level = await getLevelById(levelId);
    // if leaderboard doesn't exist yet
    if (!level.leaderboard) level.leaderboard = [];
    // push new entry to leaderboard
    level.leaderboard.push({ name, start, end });

    submitToLeaderboard(levelId, level);
  };

  return (
    <div className="game-end modal">
      <div className="game-end-content">
        <h2 className="time-finished-in">
          You finished in {formatTimeDuration(start, end)}!
        </h2>
        <form
          action=""
          onSubmit={updateLeaderboard}
          className="submit-score-form"
        >
          <p>Submit your score on the global leaderboard!</p>

          <label htmlFor="name" className="name-label">
            <span>Name:</span>
            <input
              type="text"
              id="name"
              placeholder="Don't use your real name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <div className="game-end-buttons">
            <button
              type="submit"
              className="submit-to-leaderboard"
              disabled={isLoading}
            >
              Submit Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

GameEnd.propTypes = {
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  levelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default GameEnd;
