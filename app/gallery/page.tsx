"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Calendar, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { galleryService } from '@/lib/galleryService';
import type { GalleryImage } from '@/lib/galleryService';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const fetchedImages = await galleryService.getAllImages();
      setImages(fetchedImages);
      setError(null);
    } catch (err: any) {
      console.error('Error loading images:', err);
      setError(err.message || 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Gallery</h1>
              <p className="text-lg text-white/90">Our journey in pictures</p>
            </motion.div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`break-inside-avoid bg-gray-200 rounded-sm animate-pulse ${
                    i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No images yet</p>
              <p className="text-gray-400 text-sm mt-2">Images will appear here once uploaded</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 space-y-2 sm:space-y-3"
            >
              {images.map((image, index) => (
                <motion.div
                  key={image.$id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`relative bg-gray-100 ${
                    index % 5 === 0 ? 'aspect-[3/4]' : 
                    index % 5 === 1 ? 'aspect-square' : 
                    index % 5 === 2 ? 'aspect-[4/3]' : 
                    index % 5 === 3 ? 'aspect-[3/2]' : 
                    'aspect-[2/3]'
                  }`}>
                    <Image
                      src={image.fileUrl}
                      alt={image.title || 'Gallery image'}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      unoptimized
                    />
                    {/* Minimal Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Fullscreen Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSelectedImage(null)}
                className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setSelectedImage(null)}
                className="fixed top-3 left-3 sm:top-6 sm:left-6 z-50 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2 text-white transition backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-sm">Back</span>
              </motion.button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
                  <Image
                    src={selectedImage.fileUrl}
                    alt={selectedImage.title || 'Gallery image'}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
