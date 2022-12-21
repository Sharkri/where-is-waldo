import React, { useState } from "react";
import { PropTypes } from "prop-types";
import Header from "./Header";
import "../css/GameLevel.css";
import Character from "./Character";
import GameTimer from "./GameTimer";

function GameLevelHeader({ characters, startTime, currentTime }) {
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);

  return (
    <Header>
      <div className="characters-dropdown">
        <button
          type="button"
          onClick={() => setIsCharactersOpen(!isCharactersOpen)}
        >
          open characters list
        </button>
        {isCharactersOpen && (
          <ul className="options">
            {characters.map((character) => (
              <li key={character.id} data-found={!!character.found}>
                <Character character={character} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <GameTimer startTime={startTime} currentTime={currentTime} />
    </Header>
  );
}

GameLevelHeader.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.node.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    })
  ).isRequired,
  startTime: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Date)])
    .isRequired,
  currentTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]).isRequired,
};

export default GameLevelHeader;
