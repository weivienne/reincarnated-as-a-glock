import React, { useEffect, useRef, useState } from "react";

function LoopVideo({ src, handleOnEnded }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;

    if (isPlaying) {
      timer = setTimeout(() => {
        handleOnEnded();
        setIsPlaying(false);
        setIsVisible(false);
      }, 3000); // Trigger after 3 seconds
    }

    return () => {
      clearTimeout(timer); // Clear timeout on cleanup
    };
  }, [isPlaying, handleOnEnded]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsVisible(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div>
      {isVisible && (<video
        className="panel-video"
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay
        onPlay={handlePlay}
        style={{
          position: "relative",
          top: "5rem",
          left: "0rem",
          width: "30rem",
          // height: "10rem",
          // objectFit: "cover",
          // zIndex: -1,
        }}
      />)}
    </div>
  );
}

export default LoopVideo;
