import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import GameScene from "./components/GameScene";
import TypingUI from "./components/TypingUI";
import "./App.css";

function App() {
  const [word, setWord] = useState("attack");
  const [typedText, setTypedText] = useState("");
  
  // return (
  //   <Router>
  //     <div className="App">
  //       {/* <header className="App-header">Reincarnated as a Glock</header> */}
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/combat" element={<GameScene />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // );
  return (
    <div style={{ position: "relative" }}>
      <GameScene />
      <TypingUI word={word} typedText={typedText} />
    </div>
  );
}

export default App;
