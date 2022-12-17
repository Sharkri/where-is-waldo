import React from "react";
import { PropTypes } from "prop-types";

function Dropdown({ x, y, children }) {
  return (
    <select
      className="dropdown-select"
      style={{ position: "absolute", left: x, top: y, zIndex: 5 }}
    >
      {children}
    </select>
  );
}

Dropdown.defaultProps = {
  children: null,
};

Dropdown.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Dropdown;
