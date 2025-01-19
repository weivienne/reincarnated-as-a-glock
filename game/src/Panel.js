import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";

function Panel({ panel, isActive, setIsCompleted }) {
  const dialogue = panel.mc_dialogue.toLowerCase();

  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus(); // Focus input only when active
    }
    setCorrectWrong(Array(dialogue.length).fill(""));

  }, [dialogue, isActive, setIsCompleted]);

  const resetDialogue = () => {
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

      if (charIndex === dialogue.length - 1 && typedChar === dialogue[charIndex]) {
        setIsTyping(false);
        setIsCompleted(true);
        resetDialogue();
      }
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div
      className="panel"
      style={{
        backgroundImage: `url(${panel.background})`,
        height: "720px",
      }}
    >
      {dialogue && (
        <div
          // className={`${dialogue === " " ? "no-dialogue-box" : "dialogue-box"}`}
          className={`${dialogue === " " ? "no-dialogue-box" : "speech-bubble round b"}`}
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
