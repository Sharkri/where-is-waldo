import React, { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import "../css/Dropdown.css";

function Dropdown({ x, y, children, containerSize }) {
  const selectRef = useRef(null);

  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const select = selectRef.current;

    function willElemWidthOverflow(startWidth, elementWidth) {
      return startWidth + elementWidth > containerSize.width;
    }

    function willElemHeightOverflow(startHeight, elementHeight) {
      return startHeight + elementHeight > containerSize.height;
    }

    const selectWidth = select.scrollWidth;
    const selectHeight = select.scrollHeight;
    // if select is going to overflow then push it to other side
    const left = willElemWidthOverflow(x, selectWidth) ? x - selectWidth : x;
    const top = willElemHeightOverflow(y, selectHeight) ? y - selectHeight : y;
    setPosition({ left, top });
  }, []);

  return (
    <ul
      className="dropdown-select"
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
      }}
      size={children?.length || 1}
      ref={selectRef}
    >
      {children}
    </ul>
  );
}

Dropdown.defaultProps = {
  children: null,
};

Dropdown.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node,
  containerSize: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
};

export default Dropdown;
