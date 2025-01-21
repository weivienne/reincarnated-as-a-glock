import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Enemy from "./Enemy";
import { MathUtils } from "three";

function Camera() {
  const { camera } = useThree();
  camera.rotation.set(0, MathUtils.degToRad(180), 0);
  camera.position.set(0,0,2.5);
}

function Player({ position }) {
  const playerRef = useRef();
  return (
    <mesh ref={playerRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function GameScene() {
  const initialEnemies = [
    { id: 1, position: [5, 0, 20] },
    { id: 2, position: [5, 0, 25] },
  ];

  const player = [0, 0, 3];

  const [enemyPositions, setEnemyPositions] = useState(initialEnemies);
  const [playerPosition, setPlayerPosition] = useState(player);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = () => {
    setIsGameOver(false);
    setEnemyPositions(initialEnemies);  // Reset enemy positions
    setPlayerPosition(player);  // Reset player position
  };

  const handleCollision = (enemyId) => {
    console.log(`Collision detected with enemy ${enemyId}!`);
    setIsGameOver(true);
  };

  return (
    <div>
      {/* Reset Button */}
      {isGameOver && (
        <div className="reset-game">
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
      <Canvas style={{ height: "100vh" }}>
        <Camera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>

        <Player position={playerPosition} />
        {enemyPositions.map((enemy) => (
          <Enemy
            id={enemy.id}
            enemyPosition={enemy.position}
            p={player}
            onCollision={() => handleCollision(enemy.id)}
            isGameOver={isGameOver}  // Pass game over state to enemy
          />
        ))}

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

export default GameScene;
