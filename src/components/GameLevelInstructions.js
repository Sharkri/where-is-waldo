import { PropTypes } from "prop-types";
import React from "react";
import Characters from "./Characters";
import "../css/GameLevelInstructions.css";

function GameLevelInstructions({ level, onStart }) {
  return (
    <div className="game-level-instructions">
      <div className="game-level-instructions-content">
        <h1>{level.name}</h1>
        <img src={level.photo} alt={level.name} />
        <Characters characters={level.characters} />
        <button type="button" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  );
}

GameLevelInstructions.propTypes = {
  level: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        photo: PropTypes.node.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onStart: PropTypes.func.isRequired,
};

export default GameLevelInstructions;
