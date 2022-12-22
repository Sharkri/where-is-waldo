import React from "react";
import { PropTypes } from "prop-types";
import "../css/GameLevel.css";

function GameImage({ photo, name, onImageClick, foundList }) {
  return (
    <>
      <input
        type="image"
        src={photo}
        alt={name}
        onClick={onImageClick}
        draggable={false}
      />

      {foundList.map(({ x, y, id }) => (
        <div
          className="circle"
          data-testid="circle"
          style={{ position: "absolute", left: x, top: y }}
          key={id}
        />
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
    })
  ).isRequired,
};

export default GameImage;
