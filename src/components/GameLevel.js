import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";
import Character from "./Character";
import GameTimer from "./GameTimer";
import Dropdown from "./Dropdown";

function GameLevel() {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState(null);

  useEffect(() => {
    getLevelById(Number(id)).then((z) => setLevel(z));
  }, []);

  // STORE COORDS IN FIREBASE LATER
  const [originalX, originalY] = [623, 742];

  const onStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setInterval(() => setCurrentTime(Date.now()), 1);
  };

  // Work out the x and y coord as a percentage of the width.
  const getActualCoords = () => {
    const originalImg = { height: 822, width: 640 };
    // Gets original image's x and y percentage
    const percentage = {
      x: (originalX / originalImg.width) * 100,
      y: (originalY / originalImg.height) * 100,
    };
    // Convert x and y to decimal and then times by width/height
    const x = (percentage.x / 100) * containerSize.width;
    const y = (percentage.y / 100) * containerSize.height;
    console.log(x, y);
  };

  useEffect(() => {
    if (containerSize) getActualCoords();
  }, [containerSize]);

  const handleImageClick = (e) => {
    if (!isStarted) return;
    const image = e.target;
    setContainerSize({ height: image.scrollHeight, width: image.scrollWidth });

    setIsDropdownOpen(!isDropdownOpen);
    const rect = image.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  // Stop scroll if game not started
  document.body.style.overflow = isStarted ? "unset" : "hidden";

  if (level == null) return <div>Loading...</div>;

  return (
    <>
      {!isStarted && <GameInstructions onStart={onStart} level={level} />}
      <div className="game-level">
        <Header>
          <div className="characters-dropdown">
            <button
              type="button"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
              open characters list
            </button>
            {isOptionsOpen && (
              <div className="options">
                {level.characters.map((character) => (
                  <Character character={character} key={character.id} />
                ))}
              </div>
            )}
          </div>
          <GameTimer startTime={startTime} currentTime={currentTime} />
        </Header>
        <div className="game-image-container">
          <input
            type="image"
            src={level.photo}
            alt={level.name}
            onClick={handleImageClick}
            draggable={false}
          />
          {isDropdownOpen && (
            <Dropdown x={coords.x} y={coords.y} containerSize={containerSize}>
              {level.characters.map((character) => (
                <option value={character.id} key={character.id}>
                  {character.name}
                </option>
              ))}
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}

export default GameLevel;
