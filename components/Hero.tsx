'use client';

import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Globe, TrendingUp } from 'lucide-react';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { websiteService } from '@/lib/websiteService';

export default function Hero() {
  const { settings } = useWebsiteSettings();

  // Get image size class
  const getImageSizeClass = (size?: string) => {
    switch (size) {
      case 'small': return 'max-w-md';
      case 'medium': return 'max-w-lg';
      case 'large': return 'max-w-2xl';
      case 'full': return 'w-full';
      default: return 'max-w-xl';
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-purple via-primary-purple-light to-accent-orange opacity-10" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary-purple-light opacity-10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent-orange opacity-10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-2 shadow-lg mb-6"
            >
              <GraduationCap className="w-5 h-5 text-primary-purple" />
              <span className="text-sm font-semibold text-text-dark">
                8+ Years of Excellence
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-primary-purple to-primary-purple-light bg-clip-text text-transparent">
                {settings?.heroTitle}
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-orange to-accent-gold bg-clip-text text-transparent">
                {settings?.heroSubtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-text-light mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {settings?.heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#consultation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#destinations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-purple border-2 border-primary-purple px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-primary-purple hover:text-white transition-all duration-300"
              >
                Explore Destinations
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-purple">1000+</div>
                <div className="text-sm text-text-light">Visas Approved</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-accent-orange">8+</div>
                <div className="text-sm text-text-light">Years of Excellence</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-purple">98%</div>
                <div className="text-sm text-text-light">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Banner image */}
              <div className={`relative w-full h-[800px] rounded-3xl overflow-hidden shadow-2xl ${settings?.heroImageSize ? getImageSizeClass(settings.heroImageSize) : ''}`}>
                {settings?.heroImageFileId ? (
                  <img
                    src={websiteService.getImageUrl(settings.heroImageFileId)}
                    alt={settings.heroTitle || "Students studying abroad"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src="/banner.jpg"
                    alt="Students studying abroad"
                    className="w-full h-full object-contain"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/30 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-purple/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-purple" />
                  </div>
                  <div>
                    <div className="font-bold text-text-dark">100%</div>
                    <div className="text-xs text-text-light">Success Goal</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
