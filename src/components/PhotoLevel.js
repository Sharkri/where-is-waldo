import { PropTypes } from "prop-types";
import React from "react";

function PhotoLevel({ photo, name, onClick }) {
  return (
    <button className="photo-level" type="button" onClick={onClick}>
      <p>{name}</p>
      <img src={photo} alt={name} />
    </button>
  );
}

PhotoLevel.propTypes = {
  photo: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoLevel;
