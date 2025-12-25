'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FlowerPetalsEffect() {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const petalArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 10,
    }));
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
  const kites = ['🪁', '🪁'];

  return (
    <>
      {kites.map((kite, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-4xl opacity-60"
          initial={{ left: `${25 + i * 35}%`, top: '10%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
        >
          {kite}
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
