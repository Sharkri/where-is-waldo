import React from "react";
import PhotoLevel from "./PhotoLevel";
import retro from "../images/retro.png";

function Home() {
  return (
    <div className="home">
      <PhotoLevel photo={retro} name="teststts" />
    </div>
  );
}

export default Home;
