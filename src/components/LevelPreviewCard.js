import { PropTypes } from "prop-types";
import React from "react";
import "../css/LevelPreviewCard.css";

function LevelPreviewCard({ level }) {
  return (
    <div className="level-preview-card">
      <div className="level-preview-card-image-container">
        <img
          src={level.photo}
          alt={level.name}
          className="level-preview-card-image"
        />
      </div>
      <div className="level-preview-card-info">
        <p className="level-preview-card-name">{level.name}</p>
      </div>
    </div>
  );
}

LevelPreviewCard.propTypes = {
  level: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LevelPreviewCard;
