import React from "react";
import { PropTypes } from "prop-types";
import "../css/Dropdown.css";
import formatTimeDuration from "../helper/formatTimeDuration";

function GameEnd({ start, end }) {
  return (
    <div>
      <p>You finished in {formatTimeDuration(start, end)}!</p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" />
        </label>

        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
}

GameEnd.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
};

export default GameEnd;
