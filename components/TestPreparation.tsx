'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Award, Target, CheckCircle, ChevronLeft, ChevronRight, Users, TrendingUp } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { SectionDecorations } from './SectionDecorations';
import { useTheme } from '@/context/ThemeContext';

export default function TestPreparation() {
  const { currentTheme } = useTheme();
  
  const getThemeEmojis = () => {
    switch (currentTheme) {
      case 'christmas': return ['🎄', '⭐'];
      case 'halloween': return ['🎃', '👻'];
      case 'dashain': return ['🪁', '🌸'];
      case 'tihar': return ['🪔', '✨'];
      case 'holi': return ['🎨', '🌈'];
      case 'newYear': return ['🎆', '🎉'];
      default: return [];
    }
  };

  const emojis = getThemeEmojis();

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-play every 15 seconds
  useEffect(() => {
    if (!emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [emblaApi]);

  const tests = [
    {
      name: 'IELTS',
      fullName: 'International English Language Testing System',
      icon: '🇬🇧',
      color: 'from-purple-400 to-orange-400',
      features: ['Speaking', 'Writing', 'Reading', 'Listening'],
      score: 'Band 0-9',
    },
    {
      name: 'PTE',
      fullName: 'Pearson Test of English',
      icon: '🎓',
      color: 'from-purple-400 to-orange-400',
      features: ['Computer-based', 'Quick Results', 'Academic & General'],
      score: '10-90 Points',
    },
    {
      name: 'TOEFL',
      fullName: 'Test of English as a Foreign Language',
      icon: '🇺🇸',
      color: 'from-purple-400 to-orange-400',
      features: ['Reading', 'Listening', 'Speaking', 'Writing'],
      score: '0-120 Points',
    },
     {
      name: 'DUOLINGO',
      fullName: 'Duolingo English Test',
      icon: '🦜',
      color: 'from-purple-400 to-orange-400',
      features: ['Online Test', 'Convenient', 'Affordable'],
      score: '10-160 Points',
    },
  
  
  ];

  return (
    <section id="test-prep" className="py-20 bg-white relative">
      {/* Festival Decorations */}
      <SectionDecorations />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-purple/10 to-accent-orange/10 rounded-full px-6 py-2 mb-6"
          >
            <BookOpen className="w-5 h-5 text-accent-orange" />
            <span className="text-sm font-semibold text-primary-purple">Expert Training</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {emojis.length > 0 && <span className="mr-3 inline-block">{emojis[0]}</span>}
            <span className="bg-gradient-to-b from-primary-purple to-accent-orange bg-clip-text text-transparent">
              Test Preparation
            </span>
            {emojis.length > 0 && <span className="ml-3 inline-block">{emojis[1] || emojis[0]}</span>}
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Comprehensive coaching for all major English proficiency and standardized tests
          </p>
        </motion.div>

        <div className="relative mb-16">
          <button
            onClick={scrollPrev}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary-purple" />
          </button>
          
          <button
            onClick={scrollNext}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary-purple" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {tests.map((test, index) => (
                <div key={test.name} className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_31%] min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full"
                  >
                    <div className={`bg-gradient-to-r ${test.color} p-6 text-gray-800`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold">{test.name}</h3>
                        <span className="text-4xl">{test.icon}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{test.fullName}</p>
                    </div>

                    <div className="p-6 relative">
                      {/* Theme Emoji */}
                      {emojis.length > 0 && (
                        <span className="absolute top-2 right-2 text-xl">{emojis[index % emojis.length]}</span>
                      )}
                      
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-4 h-4 text-primary-purple" />
                          <span className="text-sm font-semibold text-text-dark">Score Range:</span>
                        </div>
                        <p className="text-text-light text-sm ml-6">{test.score}</p>
                      </div>

                      <div className="space-y-2 mb-6">
                        {test.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-text-dark">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link href={`/tests/${test.name.toLowerCase()}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                        >
                          Enroll Now
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-3xl p-8 md:p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Why Choose Our Test Preparation?</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Expert Instructors</h4>
              <p className="text-white/90 text-sm">Experienced faculty with proven track record</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Comprehensive Materials</h4>
              <p className="text-white/90 text-sm">Up-to-date study materials and resources</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">Personalized Attention</h4>
              <p className="text-white/90 text-sm">Small batch sizes for individual focus</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h4 className="font-bold mb-2">High Success Rate</h4>
              <p className="text-white/90 text-sm">98% students achieve their target scores</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
