import React, { useEffect, useRef, useState } from "react";
import "./EnemyAnimation.css";
import gun from "./gun.webm";

function EnemyAnimation({
  src,
  panel,
  dialogue,
  charIndex,
  correctWrong,
  handleInputChange,
  handleOnEnded,
  inputRef,
  charRefs,
  isActive,
  isTransitioning,
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(0.1);
  const MAX_SCALE = 1.5;

  useEffect(() => {
    let scaleInterval;

    if (isPlaying) {
      scaleInterval = setInterval(() => {
        setScale((prevScale) => Math.min(prevScale + 0.01, MAX_SCALE));
      }, 75);

      return () => clearInterval(scaleInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (scale === 1.5) {
      setIsVisible(false);
      handleOnEnded();
    }
  }, [scale, handleOnEnded]);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div>
      {src.includes("death") ? (
        <video
          className="panel-video"
          src={src}
          muted
          autoPlay
          onEnded={handleOnEnded}
        />
      ) : (
        <div>
          {/* Gun UI */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <video
              className="panel-video"
              ref={videoRef}
              src={gun}
              loop
              muted
              autoPlay
              onPlay={handlePlay}
              style={{}}
            />
          </div>

          {/* Monster UI */}
          {isVisible && (
            <div
              style={{ position: "relative", zIndex: 0, marginTop: "-20rem" }}
            >
              <video
                className="panel-video"
                ref={videoRef}
                src={src}
                loop
                muted
                autoPlay
                onPlay={handlePlay}
                style={{
                  transform: `translate(0rem, -25rem) scale(${scale})`,
                  transformOrigin: "center",
                }}
              />
              <div
                className="prompt"
                style={{
                  position: "absolute",
                  top: `${panel.mc_dialogue_x}`, // Adjust as needed
                  left: `${panel.mc_dialogue_y}`,
                  fontSize: `${panel.size}`,
                }}
              >
                <input
                  className="input-field"
                  type="text"
                  onChange={handleInputChange}
                  ref={inputRef}
                  autoComplete="off"
                  disabled={!isActive || isTransitioning}
                />
                {dialogue.split("").map((char, index) => (
                  <span
                    className={`char ${
                      index === charIndex ? "enemy-active" : ""
                    } ${correctWrong[index]}`}
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
      )}
    </div>
  );
}

export default EnemyAnimation;
