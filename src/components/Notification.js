import React from "react";
import "../css/Notification.css";
import { PropTypes } from "prop-types";

function Notification({ isShowing, message, success }) {
  if (isShowing) {
    return (
      <div className="notification-container">
        <div
          className="notification"
          data-success={success}
          data-testid="notification"
        >
          <i className={`fa-solid fa-${success ? "check" : "xmark"}`} />
          <p className="notification-message">{message}</p>
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isShowing: PropTypes.bool.isRequired,

  success: PropTypes.bool.isRequired,
};

export default Notification;
