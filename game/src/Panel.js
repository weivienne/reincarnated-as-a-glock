import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";
import monster1 from "./combat/monster1.webm";
import death from "./combat/death.webm";
import gameOver from "./panels/game-over.png";
import EnemyAnimation from "./combat/EnemyAnimation";
import PlayerStats from "./components/PlayerStats";
import GameOver from "./components/GameOver";
import Panel13 from "./specialPanels/Panel13";
import EndGame from "./components/EndGame";
import useSound from 'use-sound';
import correctKey from "./sound/correct-key.mp3";
import wrongKey from "./sound/wrong-key.mp3";
import correctWord from "./sound/correct-word.mp3";
import oneDing from "./sound/one-ding.mp3";
import twoDings from "./sound/two-dings.mp3";
import threeDings from "./sound/three-dings.mp3";

function Panel({
  panel,
  isActive,
  setIsCompleted,
  setIsGameOver,
  isGameOver,
  isTransitioning,
  isEndGame,
}) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(monster1);
  const [currentBg, setCurrentBg] = useState(panel.background);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Sound effects
  const [playCorrectKey] = useSound(correctKey);
  const [playWrongKey] = useSound(wrongKey);
  const [playCorrectWord] = useSound(correctWord);
  const [playOneDing] = useSound(oneDing);
  const [playTwoDings] = useSound(twoDings);
  const [playThreeDings] = useSound(threeDings);

  console.log("stats=", PlayerStats)

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

  useEffect(() => {
    if (isGameOver) {
      setCurrentBg(gameOver);
      setIsVisible(false);
    } else {
      setCurrentBg(panel.background);
      setIsVisible(true);
      setDialogueIndex(0);
      resetDialogue();
    }
  }, [isGameOver]);

  useEffect(() => {
    let soundTimeout;
    if (isActive && panel.id === 1) {
      setTimeout(() => {
        playOneDing();
      }, 500);
      return () => clearTimeout(soundTimeout);
    }
    if (isActive && panel.id === 4) {
      setTimeout(() => {
        playTwoDings();
      }, 1000);
      return () => clearTimeout(soundTimeout);
    }
    if (isActive && panel.id === 6) {
      setTimeout(() => {
        playThreeDings();
      }, 200);
      return () => clearTimeout(soundTimeout);
    }
  }, [isActive, panel.id]);
  

  const handleKeyDown = (event) => {
    if (isGameOver) {
      if (event.key === " ") {
        setIsGameOver(false);
        setDialogueIndex(0);
        resetDialogue();
        setCurrentBg(panel.background);
        setCurrentVideo(monster1);
        setIsVisible(true);
      }
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panel, dialogue.length, isGameOver]);

  const resetDialogue = () => {
    setMistakeCount(0);
    setCharIndex(0);
    setCorrectWrong(Array(dialogue.length).fill(""));
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    if (!isGameOver) {
      const typedChar = e.target.value.toLowerCase().slice(-1);
      PlayerStats.totalKeysPressed += 1;
      if (panel.combat) {
        if (charIndex < dialogue.length) {
          if (typedChar === dialogue[charIndex]) {
            playCorrectKey();
            setCharIndex(charIndex + 1);
            correctWrong[charIndex] = " correct ";
          } else {
            playWrongKey();
            setMistakeCount(mistakeCount + 1);
            PlayerStats.totalMistakes += 1;
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
            playCorrectWord();
            PlayerStats.currentStreak += 1;
            PlayerStats.longestStreak =
              PlayerStats.currentStreak > PlayerStats.longestStreak
                ? PlayerStats.currentStreak
                : PlayerStats.longestStreak;

            if (dialogueIndex < panel.mc_dialogue.length - 1) {
              setDialogueIndex((prev) => prev + 1);
            } else {
              setCurrentVideo(death);
            }
            resetDialogue();
          }
        }
      } else {
        if (charIndex < dialogue.length) {
          const updatedCorrectWrong = [...correctWrong];
          if (typedChar === dialogue[charIndex]) {
            playCorrectKey();
            updatedCorrectWrong[charIndex] = {
              color: panel.color_after,
            };
          } else {
            playWrongKey();
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
              playCorrectWord();
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
    }
  };

  const handleOnEnded = () => {
    if (currentVideo === death) {
      setIsCompleted(true);
    } else {
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
      {isEndGame && <EndGame />}
      {panel.combat && isActive && (
        <EnemyAnimation
          src={currentVideo}
          panel={panel}
          dialogue={dialogue}
          correctWrong={correctWrong}
          handleInputChange={handleInputChange}
          handleOnEnded={handleOnEnded}
          inputRef={inputRef}
          charRefs={charRefs}
          isActive={isActive}
          isTransitioning={isTransitioning}
          isVisible={isVisible}
          isGameOver={isGameOver}
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
