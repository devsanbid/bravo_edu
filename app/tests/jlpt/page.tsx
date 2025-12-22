'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Calendar, BookOpen, Award } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/components/Header';

export default function JLPTPage() {
  const levels = [
    {
      level: 'N5',
      title: 'Basic Level',
      description: 'Beginner Japanese',
      skills: ['Basic kanji (100)', 'Basic vocabulary (800 words)', 'Simple conversations', 'Classroom Japanese'],
    },
    {
      level: 'N4',
      title: 'Elementary Level',
      description: 'Basic conversational Japanese',
      skills: ['Kanji (300)', 'Vocabulary (1,500 words)', 'Daily conversations', 'Basic reading comprehension'],
    },
    {
      level: 'N3',
      title: 'Intermediate Level',
      description: 'Everyday Japanese',
      skills: ['Kanji (650)', 'Vocabulary (3,750 words)', 'Natural conversations', 'Coherent text understanding'],
    },
    {
      level: 'N2',
      title: 'Pre-Advanced Level',
      description: 'Understanding Japanese in various situations',
      skills: ['Kanji (1,000)', 'Vocabulary (6,000 words)', 'Newspaper articles', 'General topics discussion'],
    },
    {
      level: 'N1',
      title: 'Advanced Level',
      description: 'Complex Japanese comprehension',
      skills: ['Kanji (2,000+)', 'Vocabulary (10,000 words)', 'Academic texts', 'Professional discussions'],
    },
  ];

  const courseFeatures = [
    'Native Japanese instructors',
    'Comprehensive textbooks (Minna no Nihongo)',
    'Cultural immersion activities',
    'Speaking practice sessions',
    'Writing practice (Hiragana, Katakana, Kanji)',
    'Listening comprehension drills',
    'Reading practice materials',
    'Grammar exercises',
    'JLPT-focused mock tests',
    'Small batch sizes (max 15 students)',
    'Certificate upon completion',
    'Free demo class',
  ];

  const batchSchedule = [
    { type: 'N5 Course', duration: '3 months', classes: '2 hours/day, 5 days/week', timing: 'Morning & Evening batches' },
    { type: 'N4 Course', duration: '3 months', classes: '2 hours/day, 5 days/week', timing: 'Morning & Evening batches' },
    { type: 'N3 Course', duration: '4 months', classes: '2 hours/day, 5 days/week', timing: 'Morning & Evening batches' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1528164344705-47542687000d?w=1600&q=80')"}}>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-pink-700/90"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link href="/#test-prep" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Test Preparation</span>
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="text-6xl mb-6">🇯🇵</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">JLPT Preparation</h1>
              <p className="text-xl text-white/90 mb-4">
                Japanese Language Proficiency Test
              </p>
              <p className="text-lg text-white/80 mb-8">
                The world's largest-scale Japanese-language test. Essential for studying, working, or living in Japan. Opens doors to amazing opportunities!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">N5-N1</div>
                  <div className="text-white/80 text-sm">5 Levels</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2-3h</div>
                  <div className="text-white/80 text-sm">Test Duration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">3 Sections</div>
                  <div className="text-white/80 text-sm">Test Parts</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2x/Year</div>
                  <div className="text-white/80 text-sm">Exam Dates</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                JLPT Levels
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {levels.map((item, index) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-pink-600 mb-1">{item.level}</h3>
                      <p className="font-bold text-text-dark">{item.title}</p>
                    </div>
                  </div>
                  <p className="text-text-light mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.skills.map((skill) => (
                      <li key={skill} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-light">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Course Features
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {courseFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  <span className="text-text-dark font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Course Schedule
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {batchSchedule.map((batch, index) => (
                <motion.div
                  key={batch.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-primary-purple mb-4">{batch.type}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-text-dark">Duration</p>
                        <p className="text-sm text-text-light">{batch.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <BookOpen className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-text-dark">Classes</p>
                        <p className="text-sm text-text-light">{batch.classes}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-text-dark">Timing</p>
                        <p className="text-sm text-text-light">{batch.timing}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-600 to-pink-800 text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Learn Japanese?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Start your Japanese language journey with native instructors and comprehensive JLPT preparation. こんにちは! (Konnichiwa!)
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Award className="w-6 h-6" />
                <span>Enroll Now</span>
              </motion.button>
              <motion.a
                href="https://wa.me/9779851352807?text=Hi, I'm interested in JLPT/Japanese language course"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>Contact on WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
