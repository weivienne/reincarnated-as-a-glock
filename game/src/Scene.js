import React, { useState, useEffect } from "react";
import "./Scene.css";

function Scene({scene, gun_dialogues, other_dialogues}) {
  return (
    <div
      className="scene"
      style={{
        backgroundImage: `url(${scene.background})`,
        height: "720px",
      }}
    >
    </div>
  )
}

export default Scene;