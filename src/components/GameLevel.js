import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";
import Character from "./Character";
import GameTimer from "./GameTimer";

function GameLevel() {
  const { id } = useParams();
  const level = getLevelById(Number(id));
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setInterval(() => setCurrentTime(Date.now()), 1);
  };

  if (!isStarted) {
    // Stop scroll if game not started
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = "unset";

  return (
    <>
      {!isStarted && <GameInstructions onStart={onStart} level={level} />}
      <div className="game-level">
        <Header>
          <div className="characters-dropdown">
            <button
              type="button"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
              open characters list
            </button>
            {isOptionsOpen && (
              <div className="options">
                {level.characters.map((character) => (
                  <Character character={character} key={character.id} />
                ))}
              </div>
            )}
          </div>
          <GameTimer startTime={startTime} currentTime={currentTime} />
        </Header>
        <div className="game-image-container">
          <input
            type="image"
            src={level.photo}
            alt={level.name}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </div>
        {isDropdownOpen && (
          <select>
            {level.characters.map((character) => (
              <option value={character.id} key={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

export default GameLevel;
