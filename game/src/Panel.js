import React, { useRef, useState, useEffect } from "react";
import "./Panel.css";

function Panel({ panel, setIsCompleted }) {
  const dialogue = panel.mc_dialogue
    ? panel.mc_dialogue.toLowerCase()
    : "";

  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  let inputRef = useRef(null);
  let charRefs = useRef([]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    setCorrectWrong(Array(charRefs.current.length).fill(""));

    const handleSpacebar = (e) => {
      if (e.code === "Space" && !dialogue) {
        e.preventDefault();
        setIsCompleted(true);
      }
    };

    window.addEventListener("keydown", handleSpacebar);

    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };

  }, [dialogue, setIsCompleted]);

  const resetDialogue = () => {
    setCharIndex(0);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    setIsTyping(false);
    if (inputRef) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const characters = charRefs.current;
    let typedChar = e.target.value.toLowerCase().slice(-1);

    if (charIndex < characters.length) {
      if (!isTyping) {
        setIsTyping(true);
      }

      setCharIndex(charIndex + 1);
      if (typedChar === dialogue[charIndex]) {
        correctWrong[charIndex] = " correct ";
      } else {
        // Reset to beginning if incorrect
        resetDialogue();
      }

      // Typing is completed
      if (charIndex === characters.length - 1) {
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
          className="dialogue-box"
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
            />
            {dialogue.split("").map((char, index) => (
              <span
                className={`char ${index === charIndex ? "active" : ""} ${
                  correctWrong[index]
                }`}
                ref={(e) => (charRefs.current[index] = e)}
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
