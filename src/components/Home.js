import React from "react";
import PhotoLevel from "./PhotoLevel";
import "../css/Home.css";
import levels from "../levels";

function Home() {
  return (
    <div className="home">
      {levels.map((level) => (
        <PhotoLevel level={level} onClick={() => {}} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
