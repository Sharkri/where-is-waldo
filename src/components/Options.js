import React from "react";
import { PropTypes } from "prop-types";

function Options({ isOpen, children }) {
  if (isOpen) return <div className="options">{children}</div>;
}

Options.defaultProps = {
  children: null,
};

Options.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Options;
