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
      <div id="container">
        <div id="menu">
          <h1>Thank you for playing!</h1>
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
      <div className="credits-vertical">
        <div className="credits-title">Game Design, Art, Music, Programming</div>
        <div className="credits-name">Vivienne Ooi</div>
        <div id="credits-menu">
        <div className="credits">
        <div id="credits">
          <table>
            <tbody>
              <tr>
                <th>Game Engine</th>
                <td>React</td>
              </tr>
              <tr>
                <th>Art</th>
                <td>Procreate</td>
              </tr>
              <tr>
                <th>Music</th>
                <td>Ableton Live 11</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      </div>
      <div className="special-thanks">Special thanks to Pirate Software organizers and participants for the inspiration and support.</div>
    </div>
  );
}

export default EndGame;
