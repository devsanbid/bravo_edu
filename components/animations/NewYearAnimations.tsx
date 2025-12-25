'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FireworkEffect() {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; delay: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['#eab308', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'];
    const fireworkArray = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 40,
      delay: i * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFireworks(fireworkArray);
  }, []);

  return (
    <>
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          className="fixed pointer-events-none z-10"
          style={{ 
            left: `${firework.x}%`, 
            top: `${firework.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: firework.delay,
          }}
        >
          <div className="text-5xl">🎆</div>
        </motion.div>
      ))}
    </>
  );
}

export function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const confettiArray = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 5,
    }));
    setConfetti(confettiArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-xl opacity-60"
          initial={{ top: -20, left: `${piece.left}%` }}
          animate={{
            top: '100vh',
            rotate: 360,
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: 'linear',
          }}
        >
          🎊
        </motion.div>
      ))}
    </div>
  );
}

export function BalloonAnimation() {
  const balloons = ['🎈', '🎈', '🎈', '🎈'];

  return (
    <>
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-5xl"
          initial={{ bottom: '-100px', left: `${20 + i * 20}%` }}
          animate={{
            bottom: '100vh',
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'easeOut',
          }}
        >
          {balloon}
        </motion.div>
      ))}
    </>
  );
}
