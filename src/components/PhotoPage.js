import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import Characters from "./Characters";

function PhotoPage() {
  const { id } = useParams();
  const level = getLevelById(Number(id));

  return (
    <>
      <Header>
        <Characters characters={level.characters} />
      </Header>
      <div className="photo-page">
        <img src={level.photo} alt={level.name} />
      </div>
    </>
  );
}

export default PhotoPage;
