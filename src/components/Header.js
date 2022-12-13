import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
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
    </header>
  );
}

export default Header;
