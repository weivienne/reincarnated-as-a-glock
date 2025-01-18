import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">Reincarnated as a Glock</header> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
