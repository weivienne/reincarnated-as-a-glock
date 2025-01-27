import React, { useEffect, useRef, useState } from "react";
import "./EnemyAnimation.css";
import gun from "./gun.webm";

function EnemyAnimation({
  src,
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
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    let scaleInterval;

    if (isPlaying) {
      scaleInterval = setInterval(() => {
        setScale((prevScale) => Math.min(prevScale + 0.02, 2));
      }, 100);

      return () => clearInterval(scaleInterval);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="enemy-animation-container">
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
          <div>
            <video
              className="panel-video"
              ref={videoRef}
              src={src}
              loop
              muted
              autoPlay
              onPlay={handlePlay}
              style={{
                position: "relative",
                transform: `translate(-15rem, 50rem) scale(${scale})`,
                transformOrigin: "center",
              }}
            />
          </div>
          <>
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
            <div
              className="prompt"
              style={{
                position: "relative",
                transform: `translate(0rem, -20rem) scale(${scale})`,
                transformOrigin: "center",
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
          </>
        </div>
      )}
    </div>
  );
}

export default EnemyAnimation;
