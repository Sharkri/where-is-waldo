import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../css/LevelPreviewCard.css";

function LevelPreviewCard({ level }) {
  return (
    <Link
      to={`levels/${level.id}`}
      className="photo-level"
      aria-label="link to level"
    >
      <h1 className="photo-level-name">{level.name}</h1>
      <div className="photo-level-image-container">
        <img src={level.photo} alt={level.name} className="photo-level-image" />
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
