import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function Header({ children, className }) {
  return (
    <header className={className}>
      <ul className="links">
        <li>
          <Link to="/" aria-label="home">
            <i className="fa-solid fa-house" />
          </Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
      </ul>
      {children}
    </header>
  );
}

Header.defaultProps = {
  children: null,
  className: "",
};

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Header;
