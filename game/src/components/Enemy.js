import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Enemy({ id, enemyPosition, p, onCollision, isGameOver }) {
  console.log("enemy.id=", id)
  const enemyRef = useRef();
  const speed = 0.05;

  useEffect(() => {
    // Reset the enemy position when props change (e.g., after game reset)
    if (enemyRef.current) {
      enemyRef.current.position.set(...enemyPosition);
    }
  }, [enemyPosition]);

  useFrame(() => {
    // If the game is over, stop the enemy's movement
    if (isGameOver) return;

    if (enemyRef.current) {
      const playerPosition = new Vector3(p[0], p[1], p[2]);
      const direction = playerPosition.sub(enemyRef.current.position).normalize();
      console.log("e pos before speed= ", [id, enemyRef.current.position] )
      enemyRef.current.position.add(direction.multiplyScalar(speed));
      console.log("e pos after speed= ", [id, enemyRef.current.position] )

      // Check for collision (if enemy gets too close to the player)
      const distance = enemyRef.current.position.distanceTo(playerPosition);
      console.log("distance: ", distance);
      if (distance < p[2]) {
        onCollision();
      }
    }
  });

  return (
    <mesh ref={enemyRef} position={enemyPosition}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Enemy;
