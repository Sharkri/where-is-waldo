import React from "react";
import { PropTypes } from "prop-types";
function Dropdown({ x, y, children }) {
  return (
    <select className="dropdown-select" data-x={x} data-y={y}>
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
