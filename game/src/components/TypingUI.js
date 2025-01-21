function TypingUI({ word, typedText }) {
  return (
    <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", color: "white" }}>
      <h1>{word}</h1>
      <input
        type="text"
        value={typedText}
        style={{
          fontSize: "1.5rem",
          padding: "0.5rem",
          border: "none",
          borderRadius: "5px",
          outline: "none",
        }}
      />
    </div>
  );
}

export default TypingUI;