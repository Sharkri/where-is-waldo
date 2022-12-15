import { PropTypes } from "prop-types";
import React from "react";
import "../css/PhotoLevel.css";

function PhotoLevel({ photo, name, onClick }) {
  return (
    <button className="photo-level" type="button" onClick={onClick}>
      <h1 className="photo-level-name">{name}</h1>
      <div className="photo-level-image-container">
        <img src={photo} alt={name} className="photo-level-image" />
      </div>
    </button>
  );
}

PhotoLevel.propTypes = {
  photo: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoLevel;
