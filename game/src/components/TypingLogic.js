import React, { useRef, useState, useEffect } from "react";
import './TypingLogic.css'

function TypingLogic({ dialogue, isActive, setIsCompleted }) {
  const [charIndex, setCharIndex] = useState(0);
  const [correctWrong, setCorrectWrong] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus(); // Focus input only when active
    }
    setCorrectWrong(Array(dialogue.length).fill("")); // Reset the correctness array
  }, [dialogue, isActive]);

  const resetDialogue = () => {
    setCharIndex(0);
    setCorrectWrong(Array(dialogue.length).fill("")); // Reset the correctness array
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

      const newCorrectWrong = [...correctWrong]; // Make a copy of the correctness array
      if (typedChar === dialogue[charIndex]) {
        newCorrectWrong[charIndex] = " correct ";
        setCorrectWrong(newCorrectWrong);
        setCharIndex(charIndex + 1);
      } else {
        resetDialogue(); // Reset if incorrect
      }

      if (charIndex === dialogue.length - 1 && typedChar === dialogue[charIndex]) {
        setIsTyping(false);
        setIsCompleted(true); // Mark as completed
        resetDialogue();
      }
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div className="dialogue">
      {/* <input
        className="input-field"
        id="panel1-input"
        type="text"
        onChange={handleInputChange}
        ref={inputRef}
        autoComplete="off"
        disabled={!isActive} // Disable input if panel is not active
      /> */}
      {/* {dialogue.split("").map((char, index) => (
        <span
          className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`}
          ref={(e) => (charRefs.current[index] = e)}
          key={index}
        >
          {char}
        </span>
      ))} */}
      {dialogue}
    </div>
  );
}

export default TypingLogic;
