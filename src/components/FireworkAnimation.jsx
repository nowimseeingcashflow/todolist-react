import React, { useState, useEffect } from 'react';

const Firework = ({ x, y, color, size }) => {
  const [particles, setParticles] = useState([]);
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    if (!isExploded) {
      const timer = setTimeout(() => {
        setIsExploded(true);
        const newParticles = [];
        for (let i = 0; i < 50; i++) {
          newParticles.push({
            x: x,
            y: y,
            dx: Math.random() * 10 - 5,
            dy: Math.random() * 10 - 5,
            color: color,
            size: size / 2,
          });
        }
        setParticles(newParticles);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [x, y, color, size, isExploded]);

  return (
    <>
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            transform: `translate(${particle.dx}px, ${particle.dy}px)`,
            transition: 'transform 1s ease-out',
          }}
        />
      ))}
    </>
  );
};

const FireworkAnimation = ({ x, y, color, size = 50 }) => {
  return <Firework x={x} y={y} color={color} size={size} />;
};

export default FireworkAnimation;