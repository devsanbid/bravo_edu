'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ThemeBadge() {
  const { currentTheme, themeConfig } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  if (currentTheme === 'normal') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-4 py-2 flex items-center gap-2 hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles 
          className="w-5 h-5" 
          style={{ color: themeConfig.colors.primary }}
        />
        {isExpanded && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            className="text-sm font-semibold whitespace-nowrap"
            style={{ color: themeConfig.colors.primary }}
          >
            {themeConfig.name} Theme Active
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
}
