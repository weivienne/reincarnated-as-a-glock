import React, { useEffect } from "react";
import PlayerStats from "./PlayerStats";
import "./GameOver.css";

function GameOver() {
  const accuracy = (
    ((PlayerStats.totalKeysPressed - PlayerStats.totalMistakes) /
      PlayerStats.totalKeysPressed) *
    100
  ).toFixed(2);

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
                  <td>{accuracy}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Press space to retry...</p>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
