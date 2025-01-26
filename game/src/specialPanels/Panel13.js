import "./Panel13.css";
function Panel13({ panel, isActive, dialogueIndex }) {
  return (
    <>
      {panel.id === 13 &&
        isActive &&
        dialogueIndex === 3 && (
          <div
            style={{
              position: "relative",
              transform: "translateY(8rem) translateX(5rem) rotate(20deg)",
              color: "white",
              fontSize: "80px",
            }}
          >
            <div className="screech-disappear">{panel.other_dialogues[0]}</div>
          </div>
        )}

      {panel.id === 13 && isActive && dialogueIndex === 4 && (
        <div
          style={{
            position: "relative",
            transform: "translateY(15rem) translateX(0rem) rotate(-15deg)",
            color: "white",
            fontSize: "60px",
          }}
        >
          <div className="ratatat">{panel.other_dialogues[1]}</div>
        </div>
      )}

      {panel.id === 13 &&
        isActive &&
        dialogueIndex === 5 && (
          <div
            style={{
              position: "relative",
              transform: "translateY(15rem) translateX(-5rem) rotate(-15deg)",
              color: "white",
              fontSize: "50px",
            }}
          >
            <div className="click">{panel.other_dialogues[2]}</div>
          </div>
        )}

      {panel.id === 13 && isActive && dialogueIndex === 6 && (
        <div
          style={{
            position: "relative",
            transform: "translateY(30rem) translateX(5rem) rotate(0deg)",
            color: "white",
            fontSize: "35px",
          }}
        >
          {panel.other_dialogues[3]}
        </div>
      )}

      {panel.id === 13 && isActive && dialogueIndex === 7 && (
        <div
          style={{
            position: "relative",
            transform: "translateY(30rem) translateX(0rem) rotate(0deg)",
            color: "white",
            fontSize: "80px",
          }}
        >
          <div className="clang">{panel.other_dialogues[4]}</div>
        </div>
      )}
    </>
  );
}

export default Panel13;
