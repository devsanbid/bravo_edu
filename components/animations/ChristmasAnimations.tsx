'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 15,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-xl opacity-40"
          style={{ color: '#93c5fd' }}
          initial={{ top: -20, left: `${flake.left}%` }}
          animate={{
            top: '100vh',
            left: `${flake.left + (Math.random() - 0.5) * 5}%`,
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  );
}

export function SantaAnimation() {
  return (
    <motion.div
      className="fixed pointer-events-none z-10 text-4xl opacity-70"
      initial={{ left: '15%', top: '-100px' }}
      animate={{
        top: '100vh',
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      🎅
    </motion.div>
  );
}

export function ChristmasGifts() {
  const gifts = [
    { emoji: '🎁', left: 30, delay: 0 },
    { emoji: '🎄', left: 70, delay: 8 },
  ];

  return (
    <>
      {gifts.map((gift, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-5 text-3xl opacity-60"
          initial={{ top: '-100px', left: `${gift.left}%` }}
          animate={{
            top: '100vh',
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: gift.delay,
            ease: 'linear',
          }}
        >
          {gift.emoji}
        </motion.div>
      ))}
    </>
  );
}
