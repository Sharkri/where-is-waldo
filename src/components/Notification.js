import React from "react";
import { PropTypes } from "prop-types";

function Notification({ isShowing, message, position }) {
  if (isShowing)
    return (
      <div
        className="notification"
        style={{ position: "absolute", top: position.y, left: position.x }}
      >
        {message}
      </div>
    );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isShowing: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};

export default Notification;
