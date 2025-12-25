'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CallWidget() {
  const { settings } = useWebsiteSettings();
  const pathname = usePathname();
  const [showBubble, setShowBubble] = useState(true);
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Toggle bubble: show 3-4s, hide 30s on mobile
  useEffect(() => {
    // Only animate bubble on mobile (width < 768px)
    if (window.innerWidth >= 768) return;

    const toggleBubble = (shouldShow: boolean) => {
      setShowBubble(shouldShow);
      
      if (shouldShow) {
        // Show for 3-4 seconds, then hide
        const showDuration = 3000 + Math.random() * 1000;
        setTimeout(() => toggleBubble(false), showDuration);
      } else {
        // Hide for 18 seconds, then show
        setTimeout(() => toggleBubble(true), 18000);
      }
    };

    // Start by showing after initial 3-4 seconds
    const initialDelay = 3000 + Math.random() * 1000;
    const timer = setTimeout(() => toggleBubble(false), initialDelay);

    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    if (settings?.headerPhone) {
      window.location.href = `tel:${settings.headerPhone}`;
    }
  };

  return (
    <div className="fixed bottom-36 md:bottom-44 right-3 md:right-6 z-50">
      {/* Call us now bubble - visible on mobile for 4 seconds, always on desktop */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-12 md:bottom-20 right-0 mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-xl whitespace-nowrap"
          >
            <div className="relative">
              <span className="font-semibold text-xs md:text-sm">📞 Call us now!</span>
              {/* Triangle pointer */}
              <div className="absolute -bottom-4 md:-bottom-8 right-4 md:right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 md:border-l-8 md:border-r-8 md:border-t-8 border-l-transparent border-r-transparent border-t-orange-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call button */}
      <motion.button
        onClick={handleCall}
        className="group relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all"
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
          <Phone className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </motion.div>

        {/* Notification dot */}
        <motion.div
          className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full border border-white md:border-2"
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
