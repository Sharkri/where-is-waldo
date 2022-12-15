import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import Characters from "./Characters";
import "../css/PhotoPage.css";

function PhotoPage() {
  const { id } = useParams();
  const level = getLevelById(Number(id));

  return (
    <div className="photo-page">
      <Header>
        <Characters characters={level.characters} />
      </Header>
      <div className="game-image-container">
        <img src={level.photo} alt={level.name} />
      </div>
    </div>
  );
}

export default PhotoPage;
