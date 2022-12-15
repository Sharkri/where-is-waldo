import React from "react";
import { PropTypes } from "prop-types";

function Character({ character }) {
  return (
    <div className="character">
      <img src={character.photo} alt={character.name} />
      <p>{character.name}</p>
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