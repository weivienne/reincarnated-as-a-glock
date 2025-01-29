import React, { useEffect } from "react";
import PlayerStats from "./PlayerStats";
import "./EndGame.css";

function EndGame() {
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const accuracy = (
    ((PlayerStats.totalKeysPressed - PlayerStats.totalMistakes) /
      PlayerStats.totalKeysPressed) *
    100
  ).toFixed(2);

  return (
    <div className="end-game-container">
      <div className="end-game">To be continued...</div>
      <div className="credits">Thank you for playing!</div>
      <div id="container">
        <div id="menu">
          <h1>Player Stats</h1>
          <hr className="rule" />
          <div id="stats">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>Total mistakes</th>
                  <td>{PlayerStats.totalMistakes}</td>
                </tr>
                <tr>
                  <th>Longest streak</th>
                  <td>{PlayerStats.longestStreak}</td>
                </tr>
                <tr>
                  <th>Accuracy</th>
                  <td>{accuracy}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Press space to play again...</p>
        </div>
      </div>
      <div className="credits">
      <div id="credits">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>Game Design, Art, Programming</th>
              <td>Vivienne Ooi</td>
            </tr>
            <tr>
              <th>Game Engine</th>
              <td>React</td>
            </tr>
            <tr>
              <th>Art Tool</th>
              <td>Procreate</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div className="special-thanks">Special thanks to Pirate Software organizers and participants for the inspiration and support.</div>
    </div>
  );
}

export default EndGame;
