import { PropTypes } from "prop-types";
import React from "react";
import Characters from "./Characters";

function PhotoPage({ photo, characters }) {
  return (
    <div className="photo-page">
      <img src={photo.src} alt={photo.alt} />
      <Characters characters={characters} />
    </div>
  );
}

PhotoPage.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.node.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,

  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default PhotoPage;
