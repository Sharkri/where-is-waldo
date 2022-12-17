import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../css/LevelPreviewCard.css";

function LevelPreviewCard({ level }) {
  return (
    <Link
      to={`levels/${level.id}`}
      className="level-preview-card"
      aria-label="link to level"
    >
      <h1 className="level-preview-card-name">{level.name}</h1>
      <div className="level-preview-card-image-container">
        <img
          src={level.photo}
          alt={level.name}
          className="level-preview-card-image"
        />
      </div>
    </Link>
  );
}

LevelPreviewCard.propTypes = {
  level: PropTypes.shape({
    photo: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default LevelPreviewCard;
