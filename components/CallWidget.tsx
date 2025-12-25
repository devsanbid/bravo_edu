'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CallWidget() {
  const { settings } = useWebsiteSettings();
  const pathname = usePathname();
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleCall = () => {
    if (settings?.phone) {
      window.location.href = `tel:${settings.phone}`;
    }
  };

  return (
    <div className="fixed bottom-44 right-6 z-50">
      {/* Call us now bubble - always visible */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className="absolute bottom-20 right-0 mb-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl whitespace-nowrap"
      >
        <div className="relative">
          <span className="font-semibold text-sm">📞 Call us now!</span>
          {/* Triangle pointer */}
          <div className="absolute -bottom-8 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-orange-500" />
        </div>
      </motion.div>

      {/* Call button */}
      <motion.button
        onClick={handleCall}
        className="group relative w-16 h-16 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 10px 30px rgba(236, 72, 153, 0.4)',
            '0 10px 40px rgba(251, 146, 60, 0.5)',
            '0 10px 30px rgba(236, 72, 153, 0.4)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.4,
          }}
        />

        {/* Phone icon with animation */}
        <motion.div
          animate={{
            rotate: [0, -20, 20, -20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="relative z-10"
        >
          <Phone className="w-7 h-7 text-white" />
        </motion.div>

        {/* Notification dot */}
        <motion.div
          className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.button>
    </div>
  );
}
