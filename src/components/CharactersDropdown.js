import React from "react";
import "../css/GameLevel.css";
import { PropTypes } from "prop-types";
import Dropdown from "./Dropdown";

function CharactersDropdown({
  characters,
  onCharacterClick,
  coordinates,
  containerSize,
}) {
  const availableCharacters = characters.filter(
    (character) => !character.found
  );

  return (
    <form action="" onSubmit={onCharacterClick}>
      <Dropdown
        x={coordinates.x}
        y={coordinates.y}
        containerSize={containerSize}
      >
        {availableCharacters.map((character) => (
          <li key={character.id} className="character-list-item">
            <button
              type="submit"
              className="character-button-submit"
              data-id={character.id}
            >
              <img src={character.photo} alt="character" />
              <span className="character-name">{character.name}</span>
            </button>
          </li>
        ))}
      </Dropdown>
    </form>
  );
}

CharactersDropdown.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      photo: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,

  onCharacterClick: PropTypes.func.isRequired,

  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,

  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default CharactersDropdown;
