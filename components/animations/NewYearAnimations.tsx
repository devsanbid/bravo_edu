'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  angle: number;
  distance: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  type: 'burst' | 'fountain' | 'ring' | 'willow' | 'star';
  particles: Particle[];
}

export function FireworkEffect() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [bigFireworks, setBigFireworks] = useState<Firework[]>([]);
  const idCounterRef = useRef(0);
  const bigIdCounterRef = useRef(10000);

  useEffect(() => {
    const colors = [
      '#FFD700', // Gold
      '#FF1493', // Deep Pink
      '#00CED1', // Dark Turquoise
      '#FF6347', // Tomato Red
      '#9370DB', // Medium Purple
      '#00FF00', // Lime
      '#FF69B4', // Hot Pink
      '#1E90FF', // Dodger Blue
    ];

    const types: ('burst' | 'fountain' | 'ring' | 'willow' | 'star')[] = ['burst', 'fountain', 'ring', 'willow', 'star'];

    const createFirework = (): Firework => {
      const type = types[Math.floor(Math.random() * types.length)];
      const particleCount = type === 'burst' ? 25 : type === 'fountain' ? 20 : type === 'ring' ? 25 : type === 'willow' ? 30 : 20;
      
      const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        angle: (360 / particleCount) * i + (Math.random() - 0.5) * 15,
        distance: 40 + Math.random() * 60,
      }));

      idCounterRef.current += 1;
      
      return {
        id: idCounterRef.current,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        particles,
      };
    };

    const createBigFirework = (): Firework => {
      const type = types[Math.floor(Math.random() * types.length)];
      const particleCount = 50; // Medium particle count
      
      const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        angle: (360 / particleCount) * i + (Math.random() - 0.5) * 12,
        distance: 80 + Math.random() * 100, // Medium spread
      }));

      bigIdCounterRef.current += 1;
      
      return {
        id: bigIdCounterRef.current,
        x: 50, // Center
        y: 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        particles,
      };
    };

    // Initial burst - 1 firework only
    setTimeout(() => {
      const fw1 = createFirework();
      setFireworks((prev) => [...prev, fw1]);
      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== fw1.id));
      }, 2500);
    }, 500);

    // Regular fireworks at intervals - slower pace
    const interval = setInterval(() => {
      const newFirework = createFirework();
      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 2500);
    }, 4000); // Launch every 4 seconds (much slower)

    // BIG FIREWORK every 25 seconds
    const bigInterval = setInterval(() => {
      const bigFirework = createBigFirework();
      setBigFireworks((prev) => [...prev, bigFirework]);

      setTimeout(() => {
        setBigFireworks((prev) => prev.filter((fw) => fw.id !== bigFirework.id));
      }, 4000); // Medium firework - 4 seconds
    }, 25000); // Every 25 seconds

    // First big firework after 5 seconds
    setTimeout(() => {
      const firstBig = createBigFirework();
      setBigFireworks((prev) => [...prev, firstBig]);
      setTimeout(() => {
        setBigFireworks((prev) => prev.filter((fw) => fw.id !== firstBig.id));
      }, 4000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(bigInterval);
    };
  }, []); // Empty dependency array

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* Regular Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Launch Trail */}
          <motion.div
            className="absolute w-1 h-6 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${firework.color}, transparent)`,
              left: '-2px',
            }}
            initial={{ opacity: 1, scaleY: 0, y: 80 }}
            animate={{ opacity: 0, scaleY: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Explosion Particles */}
          {firework.particles.map((particle) => {
            const radians = (particle.angle * Math.PI) / 180;
            const x = Math.cos(radians) * particle.distance;
            const y = Math.sin(radians) * particle.distance;

            return (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: firework.color,
                  boxShadow: `0 0 8px ${firework.color}, 0 0 15px ${firework.color}`,
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0, 
                  scale: 0 
                }}
                animate={{
                  x: firework.type === 'willow' ? x * 0.8 : x,
                  y: firework.type === 'fountain' ? y * 1.3 + 40 : firework.type === 'willow' ? y + 60 : y,
                  opacity: [0, 1, 1, 0],
                  scale: firework.type === 'star' ? [0, 2, 1.5, 0] : [0, 1.5, 1, 0],
                }}
                transition={{
                  duration: firework.type === 'willow' ? 2 : firework.type === 'fountain' ? 1.8 : 1.5,
                  delay: 0.4,
                  ease: firework.type === 'willow' ? 'easeIn' : 'easeOut',
                }}
              />
            );
          })}

          {/* Center Burst Flash */}
          <motion.div
            className="absolute w-3 h-3 rounded-full -left-1.5 -top-1.5"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 20px ${firework.color}, 0 0 40px ${firework.color}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 6, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: 'easeOut',
            }}
          />

          {/* Secondary Sparkles (reduced for performance) */}
          {(firework.type === 'burst' || firework.type === 'star') &&
            Array.from({ length: 8 }).map((_, i) => {
              const angle = Math.random() * 360;
              const distance = 25 + Math.random() * 30;
              const radians = (angle * Math.PI) / 180;
              const x = Math.cos(radians) * distance;
              const y = Math.sin(radians) * distance;

              return (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-0.5 h-0.5 rounded-full"
                  style={{
                    backgroundColor: '#FFF',
                    boxShadow: '0 0 4px #FFF',
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x,
                    y,
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.6 + Math.random() * 0.2,
                  }}
                />
              );
            })}
        </div>
      ))}
      {/* BIG FIREWORKS - Every 25 seconds */}
      {bigFireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Big Launch Trail */}
          <motion.div
            className="absolute w-1.5 h-12 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${firework.color}, transparent)`,
              left: '-3px',
            }}
            initial={{ opacity: 1, scaleY: 0, y: 100 }}
            animate={{ opacity: 0, scaleY: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Big Explosion Particles */}
          {firework.particles.map((particle) => {
            const radians = (particle.angle * Math.PI) / 180;
            const x = Math.cos(radians) * particle.distance;
            const y = Math.sin(radians) * particle.distance;

            return (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: firework.color,
                  boxShadow: `0 0 12px ${firework.color}, 0 0 24px ${firework.color}`,
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0, 
                  scale: 0 
                }}
                animate={{
                  x: firework.type === 'willow' ? x * 0.9 : x,
                  y: firework.type === 'fountain' ? y * 1.2 + 80 : firework.type === 'willow' ? y + 100 : y,
                  opacity: [0, 0.3, 1, 1, 0.8, 0.6, 0],
                  scale: [0, 1, 2.5, 2.2, 2, 1.5, 0],
                }}
                transition={{
                  duration: 3.5,
                  delay: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            );
          })}

          {/* Big Center Burst Flash */}
          <motion.div
            className="absolute w-8 h-8 rounded-full -left-4 -top-4"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 40px ${firework.color}, 0 0 80px ${firework.color}, 0 0 120px ${firework.color}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 5, 12, 10, 8, 5, 0],
              opacity: [0, 0.5, 1, 0.95, 0.85, 0.6, 0],
            }}
            transition={{
              duration: 3,
              delay: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />

          {/* Big Secondary Sparkles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 60 + Math.random() * 80;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * distance;
            const y = Math.sin(radians) * distance;

            return (
              <motion.div
                key={`big-sparkle-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: '#FFF',
                  boxShadow: '0 0 8px #FFF, 0 0 16px #FFF',
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x,
                  y,
                  opacity: [0, 0.4, 1, 1, 0.7, 0],
                  scale: [0, 1.5, 2.5, 2, 1.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 1.2 + Math.random() * 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            );
          })}

          {/* Crackling effect particles */}
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 70 + Math.random() * 60;
            const radians = (angle * Math.PI) / 180;
            const x = Math.cos(radians) * distance;
            const y = Math.sin(radians) * distance;

            return (
              <motion.div
                key={`crackle-${i}`}
                className="absolute w-0.5 h-0.5 rounded-full bg-yellow-200"
                style={{
                  boxShadow: '0 0 4px #FFF, 0 0 8px #FFD700',
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: [0, x * 0.3, x * 0.6, x],
                  y: [0, y * 0.3, y * 0.6, y],
                  opacity: [0, 0.6, 1, 0.8, 0, 1, 0.7, 0],
                  scale: [0, 1, 1.5, 1, 0, 2, 1.5, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 1.4 + Math.random() * 0.8,
                  times: [0, 0.2, 0.4, 0.55, 0.65, 0.75, 0.9, 1],
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            );
          })}
        </div>
      ))}    </div>
  );
}

export function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; duration: number; rotation: number; color: string; shape: string }>>([]);

  useEffect(() => {
    const colors = ['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD', '#FF006E'];
    const shapes = ['🎊', '🎉', '⭐', '✨'];
    
    const confettiArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 4,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setConfetti(confettiArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute text-xl"
          style={{ color: piece.color }}
          initial={{ 
            top: -50, 
            left: `${piece.left}%`,
            rotate: piece.rotation,
            opacity: 0.8,
          }}
          animate={{
            top: '110vh',
            rotate: piece.rotation + 720,
            opacity: [0.8, 1, 0.7, 0.5],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: 'linear',
          }}
        >
          {piece.shape}
        </motion.div>
      ))}
    </div>
  );
}

export function BalloonAnimation() {
  const balloons = [
    { emoji: '🎈', left: 10, delay: 0, color: '#FF6B9D' },
    { emoji: '🎈', left: 30, delay: 2, color: '#FFD93D' },
    { emoji: '🎉', left: 50, delay: 4, color: '#6BCB77' },
    { emoji: '🎈', left: 70, delay: 1, color: '#4D96FF' },
    { emoji: '🥳', left: 90, delay: 3, color: '#9D4EDD' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {balloons.map((balloon, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-60"
          style={{ color: balloon.color }}
          initial={{ 
            bottom: '-100px', 
            left: `${balloon.left}%`,
            rotate: 0,
          }}
          animate={{
            bottom: '110vh',
            rotate: [0, 8, -8, 5, -5, 0],
            x: [0, 15, -15, 10, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: balloon.delay,
            ease: 'linear',
          }}
        >
          {balloon.emoji}
        </motion.div>
      ))}
    </div>
  );
}
