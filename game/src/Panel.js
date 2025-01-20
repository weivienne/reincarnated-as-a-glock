import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";
import monster1 from "./combat/monster1.webm";
import death from "./combat/death.webm";
import gameOver from "./panels/game-over.png"

function Panel({ panel, isActive, setIsCompleted }) {
  const dialogue = panel.mc_dialogue.toLowerCase();

  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(monster1);
  const [currentBg, setCurrentBg] = useState(panel.background);
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
        resetDialogue(); // Reset if incorrect
      }

      if (
        charIndex === dialogue.length - 1 &&
        typedChar === dialogue[charIndex]
      ) {
        setIsTyping(false);
        setCurrentVideo(death);
        // setIsCompleted(true);
        resetDialogue();
      }
    } else {
      setIsTyping(false);
    }
  };

  const handleOnEnded = (e) => {
    if (currentVideo === death) {
      setIsCompleted(true);
    }
    else {
      // TODO: handle game over
      console.log("game over");
      setCurrentBg(gameOver);
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
      {/* Video for panel2 */}
      {console.log("panel.id=", panel.id)}
      {console.log("isActive", isActive)}
      {panel.id === 0 && isActive && (
        <video
          className="panel-video"
          src={currentVideo}
          autoPlay
          muted
          onEnded={handleOnEnded}
          style={{
            position: "relative",
            top: "20rem",
            left: "10rem",
            width: "10rem",
            // height: "10rem",
            // objectFit: "cover",
            // zIndex: -1,
          }}
        />
      )}

      {dialogue && (
        <div
          // className={`${dialogue === " " ? "no-dialogue-box" : "dialogue-box"}`}
          className={`${
            dialogue === " " ? "no-dialogue-box" : "speech-bubble round b"
          }`}
          style={{
            transform: `translateY(${panel.mc_dialogue_y}) translateX(${panel.mc_dialogue_x})`,
            width: "70%",
          }}
        >
          <div className="dialogue">
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
      <div className="reset-button">
        <button onClick={resetDialogue}>Reset</button>
      </div>
    </div>
  );
}

export default Panel;
