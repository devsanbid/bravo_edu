'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GhostAnimation() {
  const ghosts = [
    { delay: 0, left: 20 },
    { delay: 6, left: 70 },
  ];

  return (
    <>
      {ghosts.map((ghost, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-4xl opacity-50"
          initial={{ top: '-100px', left: `${ghost.left}%` }}
          animate={{
            top: '100vh',
            x: [0, -20, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            delay: ghost.delay,
            ease: 'linear',
          }}
        >
          👻
        </motion.div>
      ))}
    </>
  );
}

export function BatAnimation() {
  const [bats, setBats] = useState<Array<{ id: number; delay: number; left: number }>>([]);

  useEffect(() => {
    const batArray = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i * 4,
      left: 20 + i * 30,
    }));
    setBats(batArray);
  }, []);

  return (
    <>
      {bats.map((bat) => (
        <motion.div
          key={bat.id}
          className="fixed pointer-events-none z-10 text-2xl opacity-60"
          initial={{ top: '-100px', left: `${bat.left}%` }}
          animate={{
            top: '100vh',
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: bat.delay,
            ease: 'linear',
          }}
        >
          🦇
        </motion.div>
      ))}
    </>
  );
}

export function PumpkinAnimation() {
  const pumpkins = [
    { left: 40, delay: 2 },
    { left: 60, delay: 8 },
  ];
  
  return (
    <>
      {pumpkins.map((pumpkin, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-5 text-4xl opacity-60"
          initial={{ top: '-100px', left: `${pumpkin.left}%` }}
          animate={{
            top: '100vh',
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            delay: pumpkin.delay,
            ease: 'linear',
          }}
        >
          🎃
        </motion.div>
      ))}
    </>
  );
}
