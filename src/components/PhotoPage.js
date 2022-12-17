import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import Characters from "./Characters";
import "../css/PhotoPage.css";
import PhotoLevelInstructions from "./PhotoLevelInstructions";

function PhotoPage() {
  const { id } = useParams();
  const level = getLevelById(Number(id));
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted && (
        <PhotoLevelInstructions
          onStart={() => setIsStarted(true)}
          level={level}
        />
      )}
      <div className="photo-page">
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

export default PhotoPage;
