import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";
import monster1 from "./combat/monster1.webm";
import death from "./combat/death.webm";
import gameOver from "./panels/game-over.png";
import EnemyAnimation from "./combat/EnemyAnimation";
import PlayerStats from "./components/PlayerStats";
import GameOver from "./components/GameOver";

function Panel({ panel, isActive, setIsCompleted, setIsGameOver, isGameOver }) {
  const dialogue = panel.mc_dialogue.toLowerCase();

  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(monster1);
  const [currentBg, setCurrentBg] = useState(panel.background);
  const [mistakeCount, setMistakeCount] = useState(1); // Track for user

  const inputRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus(); // Focus input only when active
    }
    setCorrectWrong(Array(dialogue.length).fill(""));
  }, [dialogue, isActive, setIsCompleted]);

  const resetDialogue = () => {
    setCurrentBg(panel.background);
    setCharIndex(0);
    setCorrectWrong(Array(dialogue.length).fill(""));
    setIsTyping(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const typedChar = e.target.value.toLowerCase().slice(-1);

    if (charIndex < dialogue.length) {
      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === dialogue[charIndex]) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = " correct ";
      } else {
        setMistakeCount(mistakeCount + 1);
        console.log("# of Mistakes: ", mistakeCount);
        PlayerStats.totalMistakes = PlayerStats.totalMistakes + 1;
        resetDialogue(); // Reset if incorrect
      }

      if (
        charIndex === dialogue.length - 1 &&
        typedChar === dialogue[charIndex]
      ) {
        panel.combat ? setCurrentVideo(death) : setIsCompleted(true);
        setIsTyping(false);
        resetDialogue();
      }
    } else {
      setIsTyping(false);
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
      {!isGameOver && (<div className="reset-button">
        <button onClick={resetDialogue}>Reset</button>
      </div>)}

      {isGameOver && (
        <GameOver />
      )}

      {panel.id === 1 && isActive && (
        <EnemyAnimation
          src={currentVideo}
          handleOnEnded={handleOnEnded}
          charIndex={charIndex}
          dialogue={dialogue}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
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

      {panel.id === 3 && isActive && (
        <EnemyAnimation
          src={currentVideo}
          handleOnEnded={handleOnEnded}
          charIndex={charIndex}
          dialogue={dialogue}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
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

      {!panel.combat && dialogue && (
        <div
          // className={`${"no-dialogue-box"
            // dialogue === " " ? "no-dialogue-box" : "speech-bubble round b"
          // }`}
          className="no-dialogue-box"
          style={{
            transform: `translateY(${panel.mc_dialogue_y}) translateX(${panel.mc_dialogue_x})`,
            width: "70%",
          }}
        >
          <div className="dialogue"
            style={{
              transform: `rotate(${panel.rotate})`,
              fontSize: `${panel.size}`,
            }}
          >
            <input
              className="input-field"
              id="panel1-input"
              type="text"
              onChange={handleInputChange}
              ref={inputRef}
              autoComplete="off"
              disabled={!isActive} // Disable input if panel is not active
            />
            {dialogue.split("").map((char, index) => (
              <span
                className={`char ${index === charIndex ? "active" : ""} ${
                  correctWrong[index]
                }`}
                ref={(e) => (charRefs.current[index] = e)}
                key={index}
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
