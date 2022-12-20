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
import Notification from "./Notification";

function GameLevel() {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationShowing, setIsNotificationShowing] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [coordsClicked, setCoordsClicked] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerSize = {
    height: imageRef.current ? imageRef.current.scrollHeight : null,
    width: imageRef.current ? imageRef.current.scrollWidth : null,
  };

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
  const getActualCoords = (x, y) => {
    const originalImg = { height: 822, width: 640 };
    // Gets original image's x and y percentage
    const percentage = {
      x: (x / originalImg.width) * 100,
      y: (y / originalImg.height) * 100,
    };
    // Convert x and y to decimal and then times by width/height
    const actualX = (percentage.x / 100) * containerSize.width;
    const actualY = (percentage.y / 100) * containerSize.height;
    return { x: actualX, y: actualY };
  };

  const handleImageClick = (e) => {
    if (!isStarted) return;

    setIsDropdownOpen(!isDropdownOpen);
    const rect = e.target.getBoundingClientRect();
    setCoordsClicked({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const inRange = (start, end, value) => value >= start && value <= end;

  const dispatch = (message, time) => {
    // If notification is already showing
    if (isNotificationShowing) return;
    setNotificationText(message);
    setIsNotificationShowing(true);

    setTimeout(() => {
      setIsNotificationShowing(false);
    }, time);
  };

  const handleCharacterClick = (event) => {
    event.preventDefault();

    setIsDropdownOpen(false);
    const { submitter } = event.nativeEvent;
    const submitterId = +submitter.dataset.id;
    const character = level.characters.find((char) => char.id === submitterId);
    const { x, y } = character.coords;
    const { x: startX, y: startY } = getActualCoords(x.start, y.start);
    const { x: endX, y: endY } = getActualCoords(x.end, y.end);

    if (
      inRange(startX, endX, coordsClicked.x) &&
      inRange(startY, endY, coordsClicked.y)
    ) {
      dispatch(`You found ${character.name}`, 5000);
    } else dispatch("Try again.", 5000);

    setIsNotificationShowing(true);
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

          <Notification
            message={notificationText}
            isShowing={isNotificationShowing}
            position={{ x: "50%", y: "25" }}
          />
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
            <form action="" onSubmit={handleCharacterClick}>
              <Dropdown
                x={coordsClicked.x}
                y={coordsClicked.y}
                containerSize={containerSize}
              >
                {level.characters.map((character) => (
                  <li key={character.id} className="character-list-item">
                    <button
                      type="submit"
                      className="character-button-submit"
                      data-id={character.id}
                    >
                      <img src={character.photo} alt="" />
                      <span className="character-name">{character.name}</span>
                    </button>
                  </li>
                ))}
              </Dropdown>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default GameLevel;
