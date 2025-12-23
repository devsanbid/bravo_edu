'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ConsultationWidget() {
  const pathname = usePathname();
  
  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <Link href="/#consultation">
        <motion.div
          className="fixed bottom-[10.5rem] right-6 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <button
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Calendar className="w-6 h-6" />
          </button>
        </motion.div>
      </Link>
    </>
  );
}
