'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from 'react';
import { SectionDecorations } from './SectionDecorations';
import { useTheme } from '@/context/ThemeContext';

export default function DestinationHub() {
  const { currentTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flicker

  const getThemeEmojis = () => {
    switch (currentTheme) {
      case 'christmas': return ['🎄', '⭐', '🎁'];
      case 'halloween': return ['🎃', '👻', '🦇'];
      case 'dashain': return ['🪁', '🌸', '🌺'];
      case 'tihar': return ['🪔', '✨', '⭐'];
      case 'holi': return ['🎨', '🌈', '💧'];
      case 'newYear': return ['🎆', '🎉', '🥳'];
      default: return [];
    }
  };

  const emojis = getThemeEmojis();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
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

  const destinations = [
    {
      country: 'United Kingdom',
      slug: 'uk',
      flag: '🇬🇧',
      description: 'World-class education with rich history and diverse culture',
      features: ['Top Universities', 'Post-Study PSW', 'Cultural Heritage'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '150+', duration: '1-3 Years', workVisa: '2 Years' },
    },
    {
      country: 'United States',
      slug: 'usa',
      flag: '🇺🇸',
      description: 'Innovation hub with cutting-edge research and global opportunities',
      features: ['Ivy League', 'OPT/CPT Options', 'Research Excellence'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '200+', duration: '2-4 Years', workVisa: '3 Years' },
    },
    {
      country: 'Canada',
      slug: 'canada',
      flag: '🇨🇦',
      description: 'Quality education with immigration pathways and affordable living',
      features: ['PR Pathway', 'Co-op Programs', 'Safe & Welcoming'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '100+', duration: '1-4 Years', workVisa: '3 Years' },
    },
    {
      country: 'Australia',
      slug: 'australia',
      flag: '🇦🇺',
      description: 'World-renowned universities with excellent quality of life',
      features: ['Work While Study', 'Post-Study Work Rights', 'High Quality Education'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '120+', duration: '1-4 Years', workVisa: '2-4 Years' },
    },
    {
      country: 'Ireland',
      slug: 'ireland',
      flag: '🇮🇪',
      description: 'Friendly culture with strong tech industry and post-study opportunities',
      features: ['Tech Hub', '2-Year Stay Back', 'English Speaking'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '30+', duration: '1-4 Years', workVisa: '2 Years' },
    },
    {
      country: 'New Zealand',
      slug: 'new-zealand',
      flag: '🇳🇿',
      description: 'Beautiful country with high-quality education and work opportunities',
      features: ['Work Rights', 'Safe Environment', 'Quality of Life'],
      color: 'from-purple-400 to-orange-400',
      stats: { universities: '40+', duration: '1-3 Years', workVisa: '3 Years' },
    },
  ];

  return (
    <section id="destinations" className="py-20 bg-white relative">
      {/* Festival Decorations */}
      <SectionDecorations />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={isMobile ? {} : { opacity: 0, y: 30 }}
          whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {emojis.length > 0 && <span className="mr-3 inline-block">{emojis[0]}</span>}
            <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
              Choose Your Destination
            </span>
            {emojis.length > 0 && <span className="ml-3 inline-block">{emojis[1] || emojis[0]}</span>}
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Explore world-class education opportunities in top study destinations
          </p>
        </motion.div>

        <div className="relative">
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
              {destinations.map((dest, index) => (
                <div key={dest.country} className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_31%] min-w-0">
                  <motion.div
                    initial={isMobile ? {} : { opacity: 0, y: 30 }}
                    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? {} : { delay: index * 0.1 }}
                    whileHover={isMobile ? {} : { y: -10 }}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full"
                  >
                    <div className={`bg-gradient-to-r ${dest.color} p-6 text-gray-800 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-8 -mt-4">
                        {dest.flag}
                      </div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4">{dest.flag}</div>
                        <h3 className="text-2xl font-bold mb-2">{dest.country}</h3>
                        <p className="text-gray-700 text-sm">{dest.description}</p>
                      </div>
                    </div>

                    <div className="p-6 relative">
                      {/* Theme Emojis */}
                      {emojis.length > 0 && index < 3 && (
                        <span className="absolute top-2 right-2 text-xl">{emojis[index % emojis.length]}</span>
                      )}
                      
                      <div className="space-y-3 mb-6">
                        {dest.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent-orange rounded-full"></div>
                            <span className="text-text-dark text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary-purple">{dest.stats.universities}</div>
                          <div className="text-xs text-text-light">Universities</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary-purple">{dest.stats.duration}</div>
                          <div className="text-xs text-text-light">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary-purple">{dest.stats.workVisa}</div>
                          <div className="text-xs text-text-light">PSW</div>
                        </div>
                      </div>

                      <Link href={`/destinations/${dest.slug}`}>
                        <motion.div
                          whileHover={isMobile ? {} : { scale: 1.02 }}
                          whileTap={isMobile ? {} : { scale: 0.98 }}
                          className="group/btn flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={isMobile ? {} : { opacity: 0, y: 30 }}
          whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-text-light mb-6">Not sure which destination is right for you?</p>
          <motion.a
            href="#consultation"
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? {} : { scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-orange to-accent-gold text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Get Free Counseling</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
