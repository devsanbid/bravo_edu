'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function WhatsAppWidget() {
  const pathname = usePathname();
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <motion.a
      href="https://wa.me/9851352807"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-20 md:bottom-24 right-3 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-shadow"
    >
      <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </motion.a>
  );
}
