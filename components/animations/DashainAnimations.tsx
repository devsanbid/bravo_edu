'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FlowerPetalsEffect() {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const petalArray = Array.from({ length: 20 }, (_, i) => {
      // 85% on right side (60-95%), 15% on left side (5-30%)
      const left = i < 3 ? 5 + Math.random() * 25 : 60 + Math.random() * 35;
      return {
        id: i,
        left,
        delay: Math.random() * 8,
        duration: 15 + Math.random() * 10,
      };
    });
    setPetals(petalArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-xl opacity-40"
          initial={{ top: -20, left: `${petal.left}%` }}
          animate={{
            top: '100vh',
            left: `${petal.left + (Math.random() - 0.5) * 15}%`,
            rotate: 360,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

export function KiteAnimation() {
  const items = [
    { emoji: '🪁', left: 10, delay: 0 },
    { emoji: '🌺', left: 70, delay: 4 },
    { emoji: '🪁', left: 85, delay: 8 },
    { emoji: '🌸', left: 92, delay: 12 },
  ];

  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-4xl opacity-60"
          initial={{ top: '-100px', left: `${item.left}%` }}
          animate={{
            top: '100vh',
            rotate: 360,
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </>
  );
}

export function TikaAnimation() {
  return (
    <div className="fixed top-10 left-0 right-0 pointer-events-none z-5 flex justify-center gap-20">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="text-6xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 1,
          }}
        >
          🔴
        </motion.div>
      ))}
    </div>
  );
}
