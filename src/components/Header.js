import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </header>
  );
}

export default Header;
