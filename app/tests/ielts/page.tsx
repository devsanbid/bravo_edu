'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Calendar, Users, BookOpen, Target, Award, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/components/Header';

export default function IELTSPage() {
  const modules = [
    {
      title: 'Listening',
      duration: '30 minutes',
      description: 'Four recorded monologues and conversations',
      skills: ['Understanding main ideas', 'Detailed information', 'Speakers\' opinions', 'Following development of ideas'],
    },
    {
      title: 'Reading',
      duration: '60 minutes',
      description: 'Three long reading passages with tasks',
      skills: ['Reading for gist', 'Reading for main ideas', 'Reading for detail', 'Logical argument understanding'],
    },
    {
      title: 'Writing',
      duration: '60 minutes',
      description: 'Two writing tasks',
      skills: ['Task 1: Describe visual information', 'Task 2: Essay writing', 'Academic & formal writing', 'Organize ideas coherently'],
    },
    {
      title: 'Speaking',
      duration: '11-14 minutes',
      description: 'Face-to-face interview with examiner',
      skills: ['Introduction & interview', 'Individual long turn', 'Two-way discussion', 'Fluency and coherence'],
    },
  ];

  const courseFeatures = [
    'Experienced IELTS certified trainers',
    'Comprehensive study materials',
    'Regular mock tests',
    'Individual feedback sessions',
    'Speaking practice with native speakers',
    'Writing task evaluation',
    'Small batch sizes (max 15 students)',
    'Flexible morning & evening batches',
    'Online and offline classes available',
    'Free demo class',
  ];

  const batchSchedule = [
    { type: 'Regular Batch', duration: '6 weeks', classes: '2 hours/day, 5 days/week', timing: 'Morning (6-8 AM) & Evening (5-7 PM)' },
    { type: 'Weekend Batch', duration: '8 weeks', classes: '4 hours/day, Saturday & Sunday', timing: '10 AM - 2 PM' },
    { type: 'Crash Course', duration: '3 weeks', classes: '3 hours/day, 6 days/week', timing: 'Flexible timing' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80')"}}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link href="/#test-prep" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Test Preparation</span>
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="text-6xl mb-6">🇬🇧</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">IELTS Preparation</h1>
              <p className="text-xl text-white/90 mb-4">
                International English Language Testing System
              </p>
              <p className="text-lg text-white/80 mb-8">
                The world's most popular English language test for study, work, and migration. Over 3 million tests taken annually across 140 countries.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">Band 0-9</div>
                  <div className="text-white/80 text-sm">Score Range</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2h 45m</div>
                  <div className="text-white/80 text-sm">Test Duration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">4 Parts</div>
                  <div className="text-white/80 text-sm">Test Modules</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2 Years</div>
                  <div className="text-white/80 text-sm">Score Validity</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Test Format & Modules
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {modules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-text-dark mb-2">{module.title}</h3>
                      <p className="text-text-light">{module.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">{module.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {module.skills.map((skill) => (
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
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
                Batch Schedule
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

        <section className="py-16 bg-gradient-to-br from-primary-purple to-primary-purple-light text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your IELTS Journey?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of successful students who achieved their dream IELTS score with our expert guidance.
              Book your free demo class today!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-purple px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Award className="w-6 h-6" />
                <span>Enroll Now</span>
              </motion.button>
              <motion.a
                href="https://wa.me/9779851352807?text=Hi, I'm interested in IELTS preparation course"
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
