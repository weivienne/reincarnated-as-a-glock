import React, { useEffect, useRef, useState } from "react";
import death from "../combat/death.webm";
import PlayerStats from "../components/PlayerStats";
import "./EnemyAnimation.css"

function EnemyAnimation({
  src,
  handleOnEnded,
  charIndex,
  dialogue,
  isTyping,
  setIsTyping,
  setCharIndex,
  correctWrong,
  resetDialogue,
  setCurrentVideo,
  inputRef,
  charRefs,
  isActive,
  mistakeCount,
  setMistakeCount,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [fixedScale, setFixedScale] = useState(null); // Fixed scale for death animation

  useEffect(() => {
    let timeoutId;
  
    if (isPlaying) {
      timeoutId = setTimeout(() => {
        handleOnEnded();
        setIsPlaying(false);
        setIsVisible(false);
        setScale(1);
      }, 5000); // Trigger after 5 seconds
    }
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Cleanup timeout on unmount
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    let scaleInterval;

    if (isPlaying) {
      scaleInterval = setInterval(() => {
        setScale((prevScale) => Math.min(prevScale + 0.02, 2)); // Grow to a maximum of 2x size
      }, 100);

      return () => {
        clearInterval(scaleInterval);
      };
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsVisible(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
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
        console.log("Mistake count in enemy: ", mistakeCount);
        PlayerStats.totalMistakes = PlayerStats.totalMistakes + 1;
        resetDialogue(); // Reset if incorrect
      }

      if (
        charIndex === dialogue.length - 1 &&
        typedChar === dialogue[charIndex]
      ) {
        setCurrentVideo(death);
        setIsTyping(false);
        resetDialogue();
      }
    } else {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    // When transitioning to the death animation, lock the current scale
    if (src.includes("death")) {
      setFixedScale(scale);
    }
  }, [src, scale]);

  return (
    <>
      {src.includes("death") ? (
        // Death animation
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <video
            className="panel-video"
            src={src}
            muted
            autoPlay
            onEnded={handleOnEnded}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${fixedScale || 1})`,
              transformOrigin: "center",
              width: "500px", // Base width for scaling
              height: "auto", // Maintain aspect ratio
            }}
          />
        </div>
      ) : (
        // Walking animation
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {isVisible && (
            <>
              <video
                className="panel-video"
                ref={videoRef}
                src={src}
                loop // Keep looping for other videos
                muted
                autoPlay
                onPlay={handlePlay}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transformOrigin: "center",
                  width: "500px", // Base width for scaling
                  height: "auto", // Maintain aspect ratio
                }}
              />
              {/* Text that follows the enemy */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${scale})`, // Same scale as the video
                  transformOrigin: "center",
                  color: "white", // Text color
                  fontSize: "20px", // Adjust text size
                  fontWeight: "bold", // Make the text bold
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional shadow for better visibility
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
                    className={`char ${index === charIndex ? "enemy-active" : ""} ${
                      correctWrong[index]
                    }`}
                    ref={(e) => (charRefs.current[index] = e)}
                    key={index}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default EnemyAnimation;
