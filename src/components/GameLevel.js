import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";
import Character from "./Character";

function GameLevel() {
  const { id } = useParams();
  const level = getLevelById(Number(id));
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <>
      {!isStarted && (
        <GameInstructions onStart={() => setIsStarted(true)} level={level} />
      )}
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
        </Header>
        <div className="game-image-container">
          <img src={level.photo} alt={level.name} />
        </div>
      </div>
    </>
  );
}

export default GameLevel;
