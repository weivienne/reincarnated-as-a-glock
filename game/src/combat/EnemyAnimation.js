import React, { useEffect, useRef, useState } from "react";

function EnemyAnimation({ src, handleOnEnded }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);
  const [fixedScale, setFixedScale] = useState(null); // Fixed scale for death animation

  useEffect(() => {
    let timer;
    let scaleInterval;

    if (isPlaying) {
      scaleInterval = setInterval(() => {
        setScale((prevScale) => Math.min(prevScale + 0.02, 2)); // Grow to a maximum of 2x size
      }, 100);

      timer = setTimeout(() => {
        handleOnEnded();
        setIsPlaying(false);
        setIsVisible(false);
        clearInterval(scaleInterval);
        setScale(1);
      }, 3000); // Trigger after 3 seconds
    }

    return () => {
      clearTimeout(timer); // Clear timeout on cleanup
      clearInterval(scaleInterval);
    };
  }, [isPlaying, handleOnEnded]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsVisible(true);
    if (videoRef.current) {
      videoRef.current.play();
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
          )}
        </div>
      )}
    </>
  );
}

export default EnemyAnimation;
