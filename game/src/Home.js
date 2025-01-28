import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import * as Constants from "./constants";
import Panel from "./Panel";
import PlayerStats from "./components/PlayerStats";

function Home() {
  const panels = Constants.PANELS;

  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const panelRefs = useRef([]);

  useEffect(() => {
    if (isGameOver) {
      console.log("User Stats: ", PlayerStats);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isCompleted && currentPanelIndex < panels.length - 1) {
      setIsTransitioning(true);
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

    // Allow typing again after the transition
    const timeout = setTimeout(() => setIsTransitioning(false), 500); // Adjust timeout to match transition duration
    return () => clearTimeout(timeout);
  }, [currentPanelIndex]);

  return (
    <div className="comic-gallery">
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          ref={(el) => (panelRefs.current[index] = el)}
          className={`panel-wrapper ${
            index === currentPanelIndex ? "active" : ""
          }`}
        >
          <Panel
            panel={panel}
            isActive={index === currentPanelIndex}
            setIsCompleted={setIsCompleted}
            setIsGameOver={setIsGameOver}
            isGameOver={isGameOver}
            isTransitioning={isTransitioning}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
