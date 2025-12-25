'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { websiteService } from '@/lib/websiteService';
import { SectionDecorations } from './SectionDecorations';
import { useTheme } from '@/context/ThemeContext';

export default function DirectorMessage() {
  const { settings } = useWebsiteSettings();
  const { currentTheme } = useTheme();

  const getThemeEmojis = () => {
    switch (currentTheme) {
      case 'christmas': return ['🎄', '🎅', '⭐', '🎁', '🔔', '❄️', '🦌'];
      case 'halloween': return ['🎃', '👻', '🦇', '💀', '🕷️', '🍬', '🕸️'];
      case 'dashain': return ['🪁', '🌸', '🌺', '🌼', '🎋', '🏵️', '🌻'];
      case 'tihar': return ['🪔', '✨', '🏮', '⭐', '💫', '🌟', '✨'];
      case 'holi': return ['🎨', '🌈', '💧', '💦', '🎭', '🖌️', '💐'];
      case 'newYear': return ['🎆', '🎉', '🥳', '🍾', '✨', '🎊', '🥂'];
      default: return [];
    }
  };

  const emojis = getThemeEmojis();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
      {/* Festival Decorations */}
      <SectionDecorations />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Director's Message
              </span>
            </motion.h2>
            <p className="text-text-light text-lg">Leading with vision and commitment</p>
          </div>

          {/* Director Card - Redesigned with small avatar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="flex flex-col items-center">
              {/* Small Avatar-style Image */}
              <div className="mb-8 relative">
                {/* Theme Emojis around image */}
                {emojis.length > 0 && (
                  <>
                    <span className="absolute -left-8 top-2 text-2xl opacity-30">{emojis[0]}</span>
                    <span className="absolute -right-8 top-8 text-xl opacity-25">{emojis[1]}</span>
                    <span className="absolute -left-6 bottom-4 text-xl opacity-25">{emojis[2]}</span>
                    <span className="absolute -right-10 bottom-2 text-2xl opacity-30">{emojis[3]}</span>
                    <span className="absolute -left-12 top-12 text-lg opacity-20">{emojis[4]}</span>
                    <span className="absolute -right-6 top-16 text-lg opacity-20">{emojis[5]}</span>
                    {emojis[6] && <span className="absolute left-1/2 -translate-x-1/2 -top-6 text-xl opacity-25">{emojis[6]}</span>}
                  </>
                )}
                
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-purple/20 shadow-xl">
                    {settings?.directorImageFileId ? (
                      <img
                        src={websiteService.getImageUrl(settings.directorImageFileId)}
                        alt={settings.directorName || "Director"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src="/Director.png"
                        alt="Director of Bravo International"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <Quote className="absolute -bottom-2 -right-2 w-10 h-10 text-accent-orange bg-white rounded-full p-2 shadow-lg" />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-900">{settings?.directorName || 'Director'}</h3>
                  <p className="text-gray-600">{settings?.directorTitle || 'Founder & CEO'}</p>
                </div>
              </div>

              {/* Message Content - Now the main focus */}
              <div className="w-full">
                <blockquote className="space-y-6 text-center">
                  <p className="text-lg text-text-dark leading-relaxed">
                    {settings?.directorMessage || `"At Bravo International, we don't just guide students; we transform dreams into reality. Our commitment is unwavering - to ensure that every student who walks through our doors walks out with confidence and a clear path to their future. With over 15 years of experience in educational consultancy, we have mastered the art of personalized guidance."`}
                  </p>
                </blockquote>

                {/* Stats */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-purple">100%</div>
                      <div className="text-sm text-text-light mt-1">Success Target</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-orange">500+</div>
                      <div className="text-sm text-text-light mt-1">Students Guided</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-purple">15+</div>
                      <div className="text-sm text-text-light mt-1">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
