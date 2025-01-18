import React, { useState } from "react";
import "./Home.css";
import panel1 from "./panels/panel1.png";
import panel2 from "./panels/panel2.png";
import Scene from "./Scene";

function Home() {
  const panels = [
    {
      id: 1,
      background: panel1,
      gun_dialogues: () => [`Type to start`],
      other_dialogues: () => [`This is a typing game.`],
    },
    {
      id: 2,
      background: panel2,
      gun_dialogues: () => [`This is another test.`],
      other_dialogues: () => [],
    },
  ];

  return (
    <div className="comic-gallery">
      {panels[0] && (
        <Scene
          scene={{
            ...panels[0],
            gun_dialogues: panels[0].gun_dialogues(),
            other_dialogues: panels[0].other_dialogues(),
          }}
        />
      )}
    </div>
    );
}

export default Home;
