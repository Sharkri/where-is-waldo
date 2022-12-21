import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getLevelById from "../helper/getLevelById";
import "../css/GameLevel.css";
import GameInstructions from "./GameInstructions";
import LoadingScreen from "./LoadingScreen";
import Notification from "./Notification";
import GameLevelHeader from "./GameLevelHeader";
import CharactersDropdown from "./CharactersDropdown";

function GameLevel() {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationShowing, setIsNotificationShowing] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationSuccess, setNotificationSuccess] = useState(false);
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
    setCurrentTime(Date.now());
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

  const dispatch = (message, isSuccessful, time) => {
    // If notification is already showing and same message
    if (isNotificationShowing && notificationText === message) return;
    setNotificationText(message);
    setNotificationSuccess(isSuccessful);
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
      character.found = true;
      dispatch(`You found ${character.name}`, true, 5000);
    } else dispatch("Try again.", false, 5000);
  };

  // Stop scroll if game not started
  document.body.style.overflow = isStarted ? "unset" : "hidden";

  if (level == null) return <LoadingScreen />;

  return (
    <div className="game-level">
      {!isStarted && <GameInstructions onStart={onStart} level={level} />}

      <GameLevelHeader
        startTime={startTime}
        currentTime={currentTime}
        characters={level.characters}
      />

      <div className="game-image-container">
        <Notification
          message={notificationText}
          isShowing={isNotificationShowing}
          success={notificationSuccess}
        />

        <input
          type="image"
          src={level.photo}
          alt={level.name}
          onClick={handleImageClick}
          draggable={false}
          ref={imageRef}
        />

        {isDropdownOpen && (
          <CharactersDropdown
            containerSize={containerSize}
            onCharacterClick={handleCharacterClick}
            coordinates={coordsClicked}
            characters={level.characters}
          />
        )}
      </div>
    </div>
  );
}

export default GameLevel;
