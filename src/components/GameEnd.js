import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "../css/GameEnd.css";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import formatTimeDuration from "../helper/formatTimeDuration";
import submitToLeaderboard from "../helper/submitToLeaderboard";

function GameEnd({ timeTaken, levelId }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const navigate = useNavigate();
  const updateLeaderboard = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await submitToLeaderboard(levelId, {
        name,
        timeTaken,
        dateSubmitted: Date.now(),
        id: uniqid(),
      });
      navigate(`/leaderboard?level=${levelId}`);
    } catch (error) {
      setIsErrorActive(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="game-end modal">
      <div className="game-end-content">
        <h2 className="time-finished-in">
          You finished in {formatTimeDuration(timeTaken)}!
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
              maxLength="20"
              required
            />
          </label>
          {isErrorActive && (
            <span className="error-text">
              Something went wrong. Please try again
            </span>
          )}
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
  timeTaken: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  levelId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default GameEnd;
