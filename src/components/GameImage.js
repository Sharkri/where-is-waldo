import React from "react";
import { PropTypes } from "prop-types";
import "../css/GameImage.css";

function GameImage({ photo, name, onImageClick, foundList }) {
  return (
    <>
      <input
        type="image"
        src={photo}
        alt={name}
        onClick={onImageClick}
        draggable={false}
        className="input-game-image"
      />

      {foundList.map((found) => (
        <div
          className="found-item"
          data-testid="found-item"
          style={{ position: "absolute", left: found.x, top: found.y }}
          key={found.id}
        >
          {found.name}
        </div>
      ))}
    </>
  );
}

GameImage.propTypes = {
  photo: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  foundList: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GameImage;
