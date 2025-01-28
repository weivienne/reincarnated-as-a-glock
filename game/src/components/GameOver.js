import React, { useEffect } from "react";
import PlayerStats from "./PlayerStats";
import "./GameOver.css";

function GameOver() {
  // const handleKeyDown = (event) => {
  //   if (event.key !== " ") {
  //     // window.location.reload();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup the event listener on unmount
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  return (
    <div className="game-over-container">
      <div className="game-over">Game Over</div>
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
                  <td>78%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Press space to play again...</p>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
