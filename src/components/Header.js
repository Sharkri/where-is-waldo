import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

function Header({ children }) {
  return (
    <header>
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
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
