import React from "react";
import { PropTypes } from "prop-types";
import "../css/Character.css";

function Character({ character }) {
  return (
    <div className="character">
      <img
        src={character.photo}
        alt={character.name}
        className="character-image"
      />
      <p className="character-name">{character.name}</p>
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Character;
