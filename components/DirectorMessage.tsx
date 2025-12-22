'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function DirectorMessage() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
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

          {/* Director Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-5 gap-8">
              {/* Director Photo */}
              <div className="md:col-span-2 relative">
                <div className="h-full min-h-[400px] bg-gradient-to-br from-primary-purple to-primary-purple-light flex items-center justify-center overflow-hidden">
                  <img
                    src="/Director.png"
                    alt="Director of Bravo International"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                    <h3 className="text-2xl font-bold">Director</h3>
                    <p className="text-white/90 mt-2">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <Quote className="w-12 h-12 text-accent-orange mb-6" />
                
                <blockquote className="space-y-6">
                  <p className="text-lg text-text-dark leading-relaxed">
                    "At Bravo International, we don't just guide students; we transform dreams 
                    into reality. Our commitment is unwavering - to ensure that every student who 
                    walks through our doors walks out with confidence and a clear path to their future."
                  </p>
                  
                  <p className="text-lg text-text-dark leading-relaxed">
                    "With over 15 years of experience in educational consultancy, we have mastered 
                    the art of personalized guidance. Our mission is simple yet profound: 
                    <span className="font-bold text-primary-purple"> striving for 100% success</span> in 
                    every student journey we undertake."
                  </p>
                  
                  <p className="text-lg text-text-dark leading-relaxed">
                    "We understand that studying abroad is not just about academics; it's about 
                    personal growth, cultural experiences, and building a global perspective. 
                    That's why we provide end-to-end support - from choosing the right university 
                    to settling in your new home."
                  </p>
                </blockquote>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary-purple">100%</div>
                      <div className="text-sm text-text-light">Success Target</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent-orange">500+</div>
                      <div className="text-sm text-text-light">Students Guided</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-purple">15+</div>
                      <div className="text-sm text-text-light">Years of Excellence</div>
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
