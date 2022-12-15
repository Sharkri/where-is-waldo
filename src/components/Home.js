import React from "react";
import PhotoLevel from "./PhotoLevel";
import "../css/Home.css";
import levels from "../levels";

function Home() {
  return (
    <div className="home">
      {levels.map((level) => (
        <PhotoLevel name={level.name} photo={level.photo} key={level.id} />
      ))}
    </div>
  );
}

export default Home;
