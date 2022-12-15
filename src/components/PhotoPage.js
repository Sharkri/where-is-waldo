import React from "react";
import { useParams } from "react-router-dom";
import getLevelById from "../helper/getLevelById";
import Characters from "./Characters";

function PhotoPage() {
  const { id } = useParams();
  const level = getLevelById(Number(id));

  return (
    <div className="photo-page">
      <img src={level.photo.src} alt={level.photo.alt} />
      <Characters characters={level.characters} />
    </div>
  );
}

export default PhotoPage;
