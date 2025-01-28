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
  const [mistakeCount, setMistakeCount] = useState(0);

  const dialogue =
    typeof panel.mc_dialogue?.[dialogueIndex] === "string"
      ? panel.mc_dialogue[dialogueIndex]
      : "";

  const inputRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    if (isActive && !isTransitioning && inputRef.current) {
      const focusTimeout = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(focusTimeout);
    }
    setCorrectWrong(Array(dialogue.length).fill(""));
  }, [dialogue, isActive, isTransitioning]);

  const resetDialogue = () => {
    setMistakeCount(0);
    setCharIndex(0);
    setCorrectWrong(Array(dialogue.length).fill(""));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const typedChar = e.target.value.toLowerCase().slice(-1);

    if (panel.combat) {
      if (charIndex < dialogue.length) {
        if (typedChar === dialogue[charIndex]) {
          setCharIndex(charIndex + 1);
          correctWrong[charIndex] = " correct ";
        } else {
          setMistakeCount(mistakeCount + 1);
          console.log("Mistake count in enemy: ", mistakeCount);
          PlayerStats.totalMistakes = PlayerStats.totalMistakes + 1;
          PlayerStats.longestStreak =
            PlayerStats.currentStreak > PlayerStats.longestStreak
              ? PlayerStats.currentStreak
              : PlayerStats.longestStreak;
          PlayerStats.currentStreak = 0; // Reset streak
          resetDialogue(); // Reset if incorrect
        }

        // Last character was typed correctly
        if (
          charIndex === dialogue.length - 1 &&
          typedChar === dialogue[charIndex]
        ) {
          PlayerStats.currentStreak += 1;
          PlayerStats.longestStreak =
            PlayerStats.currentStreak > PlayerStats.longestStreak
              ? PlayerStats.currentStreak
              : PlayerStats.longestStreak;
          setCurrentVideo(death);
          resetDialogue();
        }
      }
    } else {
      if (charIndex < dialogue.length) {
        const updatedCorrectWrong = [...correctWrong];
        if (typedChar === dialogue[charIndex]) {
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
        setCharIndex((prev) => prev + 1);
        setCorrectWrong(updatedCorrectWrong);

        if (charIndex === dialogue.length - 1) {
          if (mistakeCount === 0) {
            PlayerStats.currentStreak += 1;
          }
          if (dialogueIndex < panel.mc_dialogue.length - 1) {
            setDialogueIndex((prev) => prev + 1);
            resetDialogue();
          } else {
            panel.combat ? setCurrentVideo(death) : setIsCompleted(true);
          }
        }
      }
    }
  };

  const handleOnEnded = () => {
    if (currentVideo === death) {
      setIsCompleted(true);
    } else {
      setCurrentBg(gameOver);
      setIsGameOver(true);
    }
  };

  return (
    <div
      className="panel"
      style={{
        backgroundImage: `url(${currentBg})`,
      }}
    >
      {isGameOver && <GameOver />}
      {panel.combat && isActive && (
        <EnemyAnimation
          src={currentVideo}
          dialogue={dialogue}
          correctWrong={correctWrong}
          handleInputChange={handleInputChange}
          handleOnEnded={handleOnEnded}
          inputRef={inputRef}
          charRefs={charRefs}
          isActive={isActive}
          isTransitioning={isTransitioning}
        />
      )}

      <Panel13
        panel={panel}
        isActive={isActive}
        dialogueIndex={dialogueIndex}
      />

      {!panel.combat && isActive && (
        <div
          className="dialogue-position"
          style={{
            position: "relative",
            transform: `translateY(${panel.mc_dialogue_y}) translateX(${panel.mc_dialogue_x}) rotate(${panel.rotate})`,
          }}
        >
          <div
            className="dialogue"
            style={{
              // position: "absolute",
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
