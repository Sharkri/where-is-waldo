import { PropTypes } from "prop-types";
import React from "react";
import Characters from "./Characters";
import "../css/GameInstructions.css";

function GameInstructions({ level, onStart }) {
  return (
    <div className="game-instructions">
      <div className="game-instructions-content">
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

GameInstructions.propTypes = {
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

export default GameInstructions;
