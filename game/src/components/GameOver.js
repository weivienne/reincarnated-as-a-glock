import React from "react";
import PlayerStats from "./PlayerStats";
import "./GameOver.css";

function GameOver() {
  return (
    <div className="game-over-container">
      <div className="game-over">
        Game Over
      </div>
      <div id="container">
        <div id="menu">
          <h1>Player Stats</h1>
          <hr class="rule" />
          <div id="stats">
            <table>
              <tr>
                <th>Total mistakes</th>
                <td>{PlayerStats.totalMistakes}</td>
              </tr>
              <tr>
                <th>Average WPM</th>
                <td>134</td>
              </tr>
              <tr>
                <th>Accuracy</th>
                <td>78%</td>
              </tr>
            </table>
          </div>
          <p>press space to play again...</p>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
