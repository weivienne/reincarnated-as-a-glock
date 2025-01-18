import React, { useRef, useState, useEffect } from "react";
import "./Scene.css";

function Scene({ scene }) {
  const dialogue1 = scene.gun_dialogues[0].toLowerCase(); // Hardcoded, to change

  const [charIndex, setCharIndex] = useState(0);
  const [dialogueInput, setDialogueInput] = useState(dialogue1);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  let inputRef = useRef(null);
  let charRefs = useRef([]);

  useEffect(() => {
    inputRef.current.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(""));
  }, []);

  const resetDialogue = () => {
    setCharIndex(0);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    setIsTyping(false);
    inputRef.current.focus();
  }


  const handleInputChange = (e) => {
    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.toLowerCase().slice(-1);

    if (charIndex < characters.length) {
      if (!isTyping) {
        setIsTyping(true);
      }

      console.log("characters", characters);
      console.log("currentChar", currentChar);
      console.log("typedChar", typedChar);
      console.log("dialogue text", dialogue1[charIndex]);

      setCharIndex(charIndex + 1);
      if (typedChar === dialogue1[charIndex]) {
        correctWrong[charIndex] = " correct ";
      } else {
        // Reset to beginning if incorrect
        resetDialogue();
      }

      if (charIndex === characters.length - 1) {
        setIsTyping(false);
        console.log("end");
      }
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div
      className="scene"
      style={{
        backgroundImage: `url(${scene.background})`,
        height: "720px",
      }}
    >
      <div
        className="dialogue-box"
        style={{
          transform: "translateY(10rem) translateX(2.7rem)",
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
          />
          {dialogueInput.split("").map((char, index) => (
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
    </div>
  );
}

export default Scene;
