import React, { useEffect, useState } from "react";
import "./Home.css";
import * as Constants from "./constants";
import Panel from "./Panel";

function Home() {
  const panels = Constants.PANELS;

  const [ isCompleted, setIsCompleted ] = useState(false);
  const [ currentPanel, setCurrentPanel ] = useState(panels[0]);
  console.log("currentPanel= ", currentPanel.id);

  useEffect(() => {
    if (isCompleted) {
      setCurrentPanel(panels[currentPanel.next_id]);
      setIsCompleted(false);
    }
  }, [isCompleted, currentPanel]);

  return (
    <div className="comic-gallery">
        <Panel
          panel={{
            ...currentPanel,
            mc_dialogue: currentPanel.mc_dialogue,
            other_dialogues: currentPanel.other_dialogues(),
          }}
          setIsCompleted={setIsCompleted}
        />
    </div>
    );
}

export default Home;
