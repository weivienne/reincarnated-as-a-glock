import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";
import monster1 from "./combat/monster1.webm";
import death from "./combat/death.webm";
import gameOver from "./panels/game-over.png";
import EnemyAnimation from "./combat/EnemyAnimation";
import PlayerStats from "./components/PlayerStats";
import GameOver from "./components/GameOver";
import Panel13 from "./specialPanels/Panel13";

function Panel({
  panel,
  isActive,
  setIsCompleted,
  setIsGameOver,
  isGameOver,
  isTransitioning,
}) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(monster1);
  const [currentBg, setCurrentBg] = useState(panel.background);
  const [mistakeCount, setMistakeCount] = useState(0); // Track for user

  const dialogue =
    typeof panel.mc_dialogue?.[dialogueIndex] === "string"
      ? panel.mc_dialogue[dialogueIndex]
      : "";

  const inputRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    if (isActive && !isTransitioning && inputRef.current) {
      const focusTimeout = setTimeout(() => {
        inputRef.current.focus(); // Focus input after a slight delay to ensure rendering is complete
      }, 100); // Adjust timeout duration if needed
      return () => clearTimeout(focusTimeout); // Cleanup timeout
    }
    setCorrectWrong(Array(dialogue.length).fill(""));
  }, [dialogue, isActive, setIsCompleted, isTransitioning]);

  const resetDialogue = () => {
    setMistakeCount(0);
    setCurrentBg(panel.background);
    setCharIndex(0);
    setCorrectWrong(Array(dialogue.length).fill(""));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const typedChar = e.target.value.toLowerCase().slice(-1);

    if (charIndex < dialogue.length) {
      const updatedCorrectWrong = [...correctWrong];
      if (typedChar === dialogue[charIndex]) {
        // setCharIndex(charIndex + 1);
        // correctWrong[charIndex] = " correct ";
        updatedCorrectWrong[charIndex] = {
          color: panel.color_after,
        };
      } else {
        setMistakeCount(1);
        PlayerStats.totalMistakes = PlayerStats.totalMistakes + 1;
        PlayerStats.longestStreak =
          PlayerStats.currentStreak > PlayerStats.longestStreak
            ? PlayerStats.currentStreak
            : PlayerStats.longestStreak;
        PlayerStats.currentStreak = 0; // Reset streak
        updatedCorrectWrong[charIndex] = {
          color: "#e70303",
        };
      }
      setCharIndex(charIndex + 1);
      setCorrectWrong(updatedCorrectWrong);

      // Last character was typed
      if (charIndex === dialogue.length - 1) {
        if (mistakeCount === 0) {
          PlayerStats.currentStreak = PlayerStats.currentStreak + 1;
        }
        if (dialogueIndex < panel.mc_dialogue.length - 1) {
          // Move to the next dialogue in the list
          setDialogueIndex(dialogueIndex + 1);
          resetDialogue();
        } else {
          // All dialogues completed
          panel.combat ? setCurrentVideo(death) : setIsCompleted(true);
        }
      }
    }
  };

  const handleOnEnded = (e) => {
    // console.log("currentVideo=", currentVideo)
    if (currentVideo === death) {
      console.log("success");
      setIsCompleted(true);
    } else {
      // TODO: handle game over
      console.log("game over");
      setCurrentBg(gameOver);
      setIsGameOver(true);
    }
  };

  return (
    <div
      className="panel"
      style={{
        backgroundImage: `url(${currentBg})`,
        height: "720px",
      }}
    >
      {isGameOver && <GameOver />}

      {panel.id === 0 && isActive && (
        <EnemyAnimation
          src={currentVideo}
          handleOnEnded={handleOnEnded}
          charIndex={charIndex}
          dialogue={dialogue}
          isTransitioning={isTransitioning}
          setCharIndex={setCharIndex}
          correctWrong={correctWrong}
          resetDialogue={resetDialogue}
          setCurrentVideo={setCurrentVideo}
          inputRef={inputRef}
          charRefs={charRefs}
          isActive={isActive}
          mistakeCount={mistakeCount}
          setMistakeCount={setMistakeCount}
          setIsGameOver={setIsGameOver}
        />
      )}

      <Panel13
        panel={panel}
        isActive={isActive}
        dialogueIndex={dialogueIndex}
      />

      {!panel.combat && dialogue && (
        <div className="no-dialogue-box">
          <div
            className="dialogue"
            style={{
              transform: `translateY(${panel.mc_dialogue_y}) translateX(${panel.mc_dialogue_x}) rotate(${panel.rotate})`,
              fontSize: `${panel.size}`,
              color: `${panel.color_before}`,
            }}
          >
            <input
              className="input-field"
              id="panel1-input"
              type="text"
              onChange={handleInputChange}
              ref={inputRef}
              autoComplete="off"
              disabled={!isActive || isTransitioning} // Disable input if panel is not active
            />
            {dialogue.split("").map((char, index) => (
              <span
                className={`char ${index === charIndex ? "active" : ""}`}
                style={{
                  color: correctWrong[index]?.color || panel.color_before,
                }}
                ref={(e) => (charRefs.current[index] = e)}
                key={index}
                onClick={() => {
                  resetDialogue();
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Panel;
