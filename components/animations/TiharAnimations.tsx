'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function DiyaAnimation() {
  const diyas = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: 10 + i * 18,
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-5 flex justify-around px-4 pb-4">
      {diyas.map((diya, i) => (
        <motion.div
          key={diya.id}
          className="text-3xl opacity-60"
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          🪔
        </motion.div>
      ))}
    </div>
  );
}

export function SkyLanternAnimation() {
  const [lanterns, setLanterns] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const lanternArray = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      left: 20 + i * 30,
      delay: i * 3,
    }));
    setLanterns(lanternArray);
  }, []);

  return (
    <>
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="fixed pointer-events-none z-10 text-3xl opacity-50"
          initial={{ bottom: '-100px', left: `${lantern.left}%` }}
          animate={{
            bottom: '100vh',
            left: `${lantern.left + (Math.random() - 0.5) * 8}%`,
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            delay: lantern.delay,
            ease: 'linear',
          }}
        >
          🏮
        </motion.div>
      ))}
    </>
  );
}

export function TwinklingStars() {
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    const starArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: Math.random() * 4,
    }));
    setStars(starArray);
  }, []);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="fixed pointer-events-none z-5 text-yellow-300 text-lg opacity-40"
          style={{ left: `${star.left}%`, top: `${star.top}%` }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: star.delay,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
}
