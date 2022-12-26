import React from "react";
import { Link } from "react-router-dom";
import "../css/PageNotFound.css";

function PageNotFound() {
  return (
    <div id="not-found">
      <i className="fa-solid fa-triangle-exclamation" />
      <h1>not found</h1>
      <p>i couldn&apos;t find what you were looking for.</p>
      <p>
        i can&apos;t point you in the right direction, but i can at least bring
        you back <Link to="/">home</Link>.
      </p>
    </div>
  );
}

export default PageNotFound;
