import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import getLevelById from "../helper/getLevelById";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";
import Character from "./Character";
import GameTimer from "./GameTimer";
import Dropdown from "./Dropdown";
import LoadingScreen from "./LoadingScreen";

function GameLevel() {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [containerSize, setContainerSize] = useState({
    height: imageRef.current ? imageRef.current.scrollHeight : null,
    width: imageRef.current ? imageRef.current.scrollWidth : null,
  });

  useEffect(() => {
    (async function setLvl() {
      const lvl = await getLevelById(Number(id));
      setLevel(lvl);
    })();
  }, []);

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
      x: (level.characters[0].x / originalImg.width) * 100,
      y: (level.characters[0].y / originalImg.height) * 100,
    };
    // Convert x and y to decimal and then times by width/height
    const x = (percentage.x / 100) * containerSize.width;
    const y = (percentage.y / 100) * containerSize.height;
    console.log(x, y);
  };

  useEffect(() => {
    if (containerSize.height && containerSize.width) getActualCoords();
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

  if (level == null) return <LoadingScreen />;

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
            ref={imageRef}
          />

          {isDropdownOpen && (
            <Dropdown x={coords.x} y={coords.y} containerSize={containerSize}>
              {level.characters.map((character) => (
                <li key={character.id} className="character-list-item">
                  <button
                    type="submit"
                    className="character-button-submit"
                    data-id={character.id}
                  >
                    <img
                      src={character.photo}
                      alt={`character ${character.name}`}
                    />
                    <span className="character-name">{character.name}</span>
                  </button>
                </li>
              ))}
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}

export default GameLevel;
