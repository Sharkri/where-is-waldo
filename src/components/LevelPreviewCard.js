import { PropTypes } from "prop-types";
import React from "react";
import "../css/LevelPreviewCard.css";

function LevelPreviewCard({ level, showCharacters }) {
  return (
    <div
      className="level-preview-card"
      data-characters-showing={showCharacters}
    >
      <div className="level-preview-card-image-container">
        <img
          src={level.photo}
          alt={level.name}
          className="level-preview-card-image"
        />
      </div>
      <div className="level-preview-card-info">
        <p className="level-preview-card-name">{level.name}</p>
        {showCharacters && level.characters.length > 0 && (
          <div className="level-preview-card-character-photos">
            {level.characters.map(({ photo, id }) => (
              <img
                src={photo}
                alt="character"
                className="level-preview-card-character-photo"
                key={id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

LevelPreviewCard.defaultProps = {
  showCharacters: false,
};

LevelPreviewCard.propTypes = {
  level: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    characters: PropTypes.arrayOf(
      PropTypes.shape({ photo: PropTypes.node.isRequired })
    ),
  }).isRequired,
  showCharacters: PropTypes.bool,
};

export default LevelPreviewCard;
