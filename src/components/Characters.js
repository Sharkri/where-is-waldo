import React from "react";
import { PropTypes } from "prop-types";
import Character from "./Character";

function Characters({ characters }) {
  return (
    <div className="characters">
      {characters.map((character) => (
        <Character character={character} />
      ))}
    </div>
  );
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        photo: PropTypes.node.isRequired,
      }.isRequired
    )
  ).isRequired,
};

export default Characters;
