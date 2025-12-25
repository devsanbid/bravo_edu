'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ColorPowderEffect() {
  const [powders, setPowders] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#eab308', '#ef4444'];
    const powderArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 6,
    }));
    setPowders(powderArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {powders.map((powder) => (
        <motion.div
          key={powder.id}
          className="absolute w-6 h-6 rounded-full opacity-40"
          style={{ backgroundColor: powder.color }}
          initial={{ top: -50, left: `${powder.left}%` }}
          animate={{
            top: '100vh',
            left: `${powder.left + (Math.random() - 0.5) * 20}%`,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: powder.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

export function WaterBalloonAnimation() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-5xl"
          initial={{ 
            left: `${20 + i * 30}%`, 
            top: '-100px',
          }}
          animate={{
            top: '100vh',
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeIn',
          }}
        >
          💧
        </motion.div>
      ))}
    </>
  );
}

export function ColorSplashEffect() {
  const splashes = [
    { emoji: '🎨', delay: 0, left: 20 },
    { emoji: '🌈', delay: 1.5, left: 50 },
    { emoji: '🎨', delay: 3, left: 80 },
  ];

  return (
    <>
      {splashes.map((splash, i) => (
        <motion.div
          key={i}
          className="fixed top-1/3 pointer-events-none z-5 text-6xl"
          style={{ left: `${splash.left}%` }}
          animate={{
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: splash.delay,
          }}
        >
          {splash.emoji}
        </motion.div>
      ))}
    </>
  );
}
