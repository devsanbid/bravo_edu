'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { popupService, Popup } from '@/lib/popupService';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PopupModal() {
  const [popup, setPopup] = useState<Popup | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkPopup = async () => {
      try {
        // Only show popup on home page
        if (pathname !== '/') {
          return;
        }

        console.log('Fetching active popup...');
        const activePopup = await popupService.getActivePopup();
        console.log('Active popup:', activePopup);
        
        if (activePopup) {
          setPopup(activePopup);
          // Small delay before showing
          setTimeout(() => setIsVisible(true), 1000);
        } else {
          console.log('No active popup found');
        }
      } catch (error) {
        console.error('Error loading popup:', error);
      }
    };

    checkPopup();
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!popup) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              {popup.imageUrl && (
                <div className="relative h-64 w-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <Image
                    src={popup.imageUrl}
                    alt={popup.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="p-8">
                {/* Title with Gradient */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {popup.title}
                </h2>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {popup.content}
                  </p>
                </div>

                {/* Action Button */}
                {popup.buttonText && popup.buttonLink && (
                  <Link
                    href={popup.buttonLink}
                    onClick={handleClose}
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {popup.buttonText}
                  </Link>
                )}

                {/* Close Text Link */}
                <button
                  onClick={handleClose}
                  className="block mt-4 text-gray-500 hover:text-gray-700 text-sm"
                >
                  Close and continue browsing
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
