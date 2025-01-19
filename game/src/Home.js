import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import * as Constants from "./constants";
import Panel from "./Panel";

function Home() {
  const panels = Constants.PANELS;

  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const panelRefs = useRef([]);

  useEffect(() => {
    if (isCompleted && currentPanelIndex < panels.length - 1) {
      setCurrentPanelIndex(currentPanelIndex + 1);
      setIsCompleted(false);
    }
  }, [isCompleted, currentPanelIndex, panels.length]);

  useEffect(() => {
    if (panelRefs.current[currentPanelIndex]) {
      panelRefs.current[currentPanelIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPanelIndex]);

  return (
    <div className="comic-gallery">
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          ref={(el) => (panelRefs.current[index] = el)}
          className={`panel-wrapper ${index === currentPanelIndex ? "active" : ""}`}
        >
          <Panel
            panel={panel}
            isActive={index === currentPanelIndex}
            setIsCompleted={setIsCompleted}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
