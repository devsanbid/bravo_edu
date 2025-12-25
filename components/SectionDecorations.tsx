'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export function SectionDecorations() {
  const { currentTheme } = useTheme();

  if (currentTheme === 'normal') return null;

  const getDecorations = () => {
    switch (currentTheme) {
      case 'christmas':
        return [
          { emoji: '🎄', left: 5, top: 15 },
          { emoji: '🎅', left: 92, top: 20 },
          { emoji: '🎁', left: 8, top: 75 },
          { emoji: '⭐', left: 88, top: 80 },
          { emoji: '🔔', left: 15, top: 45 },
          { emoji: '❄️', left: 85, top: 50 },
        ];
      case 'halloween':
        return [
          { emoji: '🎃', left: 7, top: 18 },
          { emoji: '👻', left: 90, top: 25 },
          { emoji: '🦇', left: 10, top: 70 },
          { emoji: '🕷️', left: 87, top: 75 },
          { emoji: '💀', left: 12, top: 48 },
          { emoji: '🍬', left: 88, top: 55 },
        ];
      case 'dashain':
        return [
          { emoji: '🪁', left: 6, top: 20 },
          { emoji: '🌸', left: 91, top: 22 },
          { emoji: '🌺', left: 9, top: 72 },
          { emoji: '🎋', left: 89, top: 78 },
          { emoji: '🌼', left: 14, top: 42 },
          { emoji: '🏵️', left: 86, top: 48 },
        ];
      case 'tihar':
        return [
          { emoji: '🪔', left: 8, top: 16 },
          { emoji: '🏮', left: 90, top: 24 },
          { emoji: '✨', left: 11, top: 68 },
          { emoji: '⭐', left: 87, top: 76 },
          { emoji: '💫', left: 13, top: 44 },
          { emoji: '🌟', left: 85, top: 52 },
        ];
      case 'holi':
        return [
          { emoji: '🎨', left: 7, top: 19 },
          { emoji: '🌈', left: 91, top: 21 },
          { emoji: '💧', left: 10, top: 71 },
          { emoji: '💦', left: 88, top: 77 },
          { emoji: '🎭', left: 15, top: 46 },
          { emoji: '🖌️', left: 84, top: 53 },
        ];
      case 'newYear':
        return [
          { emoji: '🎆', left: 6, top: 17 },
          { emoji: '🎉', left: 92, top: 23 },
          { emoji: '🎊', left: 9, top: 73 },
          { emoji: '🥳', left: 89, top: 79 },
          { emoji: '🍾', left: 12, top: 47 },
          { emoji: '✨', left: 86, top: 51 },
        ];
      default:
        return [];
    }
  };

  const decorations = getDecorations();

  return (
    <>
      {decorations.map((decoration, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-3xl opacity-30 hidden md:block"
          style={{ 
            left: `${decoration.left}%`,
            top: `${decoration.top}%`
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {decoration.emoji}
        </motion.div>
      ))}
    </>
  );
}

export function HeaderDecorations() {
  const { currentTheme } = useTheme();

  if (currentTheme === 'normal') return null;

  const getHeaderDecorations = () => {
    switch (currentTheme) {
      case 'christmas':
        return ['🎅', '🎄', '🎁', '⭐', '🔔'];
      case 'halloween':
        return ['🎃', '👻', '🦇', '💀', '🕷️'];
      case 'dashain':
        return ['🪁', '🌸', '🌺', '🎋'];
      case 'tihar':
        return ['🪔', '🏮', '✨', '⭐'];
      case 'holi':
        return ['🎨', '🌈', '💧', '💦'];
      case 'newYear':
        return ['🎆', '🎉', '🎊', '🥳', '🍾'];
      default:
        return [];
    }
  };

  const emojis = getHeaderDecorations();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{ 
            left: `${10 + i * 18}%`, 
            top: '50%',
            transform: 'translateY(-50%)'
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
}
