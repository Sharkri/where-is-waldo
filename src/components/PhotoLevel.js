import { PropTypes } from "prop-types";
import React from "react";
import "../css/PhotoLevel.css";

function PhotoLevel({ level, onClick }) {
  return (
    <button className="photo-level" type="button" onClick={onClick}>
      <h1 className="photo-level-name">{level.name}</h1>
      <div className="photo-level-image-container">
        <img src={level.photo} alt={level.name} className="photo-level-image" />
      </div>
    </button>
  );
}

PhotoLevel.propTypes = {
  level: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoLevel;
