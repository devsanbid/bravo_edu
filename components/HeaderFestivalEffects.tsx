'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function HeaderFestivalEffects() {
  const { currentTheme } = useTheme();

  if (currentTheme === 'normal') return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {currentTheme === 'christmas' && <ChristmasHeaderEffect />}
      {currentTheme === 'halloween' && <HalloweenHeaderEffect />}
      {currentTheme === 'dashain' && <DashainHeaderEffect />}
      {currentTheme === 'tihar' && <TiharHeaderEffect />}
      {currentTheme === 'holi' && <HoliHeaderEffect />}
      {currentTheme === 'newYear' && <NewYearHeaderEffect />}
    </div>
  );
}

function ChristmasHeaderEffect() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-sm opacity-30"
          initial={{ left: `${20 + i * 30}%`, top: -10 }}
          animate={{
            top: '100%',
            left: `${20 + i * 30 + (Math.random() - 0.5) * 5}%`,
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: 'linear',
          }}
          style={{ color: '#93c5fd' }}
        >
          ❄️
        </motion.div>
      ))}
    </>
  );
}

function HalloweenHeaderEffect() {
  return (
    <>
      <motion.div
        className="absolute text-sm opacity-40"
        initial={{ left: '10%', top: '50%' }}
        animate={{
          left: '90%',
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        🦇
      </motion.div>
    </>
  );
}

function DashainHeaderEffect() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute text-sm opacity-35"
          initial={{ left: `${30 + i * 40}%`, top: -10 }}
          animate={{
            top: '100%',
            rotate: 360,
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            delay: i * 3,
            ease: 'linear',
          }}
        >
          🌸
        </motion.div>
      ))}
    </>
  );
}

function TiharHeaderEffect() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute text-sm opacity-40"
          style={{ left: `${25 + i * 50}%`, top: '50%' }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  );
}

function HoliHeaderEffect() {
  return (
    <>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full opacity-30"
          style={{ 
            left: `${30 + i * 40}%`, 
            top: '30%',
            backgroundColor: i === 0 ? '#ec4899' : '#8b5cf6'
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 2,
          }}
        />
      ))}
    </>
  );
}

function NewYearHeaderEffect() {
  return (
    <>
      <motion.div
        className="absolute text-sm opacity-40"
        style={{ left: '50%', top: '30%' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        🎆
      </motion.div>
    </>
  );
}
