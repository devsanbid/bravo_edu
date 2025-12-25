'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ColorPowderEffect() {
  const [powders, setPowders] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#eab308', '#ef4444'];
    const powderArray = Array.from({ length: 12 }, (_, i) => {
      // 85% on right side (60-95%), 15% on left side (5-30%)
      const left = i < 2 ? 5 + Math.random() * 25 : 60 + Math.random() * 35;
      return {
        id: i,
        left,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 6,
      };
    });
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
  const balloons = [
    { emoji: '💧', left: 12, delay: 0 },
    { emoji: '💦', left: 68, delay: 2 },
    { emoji: '💧', left: 78, delay: 4 },
    { emoji: '💦', left: 88, delay: 6 },
    { emoji: '💧', left: 93, delay: 8 },
  ];
  
  return (
    <>
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10 text-4xl opacity-60"
          initial={{ 
            left: `${balloon.left}%`, 
            top: '-100px',
          }}
          animate={{
            top: '100vh',
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: balloon.delay,
            ease: 'linear',
          }}
        >
          {balloon.emoji}
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
