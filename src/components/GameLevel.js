import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import Characters from "./Characters";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";

function GameLevel() {
  const { id } = useParams();
  const level = getLevelById(Number(id));
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted && (
        <GameInstructions onStart={() => setIsStarted(true)} level={level} />
      )}
      <div className="game-level">
        <Header>
          <Characters characters={level.characters} />
        </Header>
        <div className="game-image-container">
          <img src={level.photo} alt={level.name} />
        </div>
      </div>
    </>
  );
}

export default GameLevel;