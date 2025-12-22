'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, FileText, DollarSign, Home, Briefcase, MapPin, Clock, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function USAPage() {
  const topUniversities = [
    'Harvard University',
    'Stanford University',
    'MIT',
    'Princeton University',
    'Yale University',
    'Columbia University',
    'UC Berkeley',
    'University of Chicago',
  ];

  const requirements = [
    {
      title: 'Academic Requirements',
      icon: GraduationCap,
      items: [
        'Undergraduate: SAT/ACT scores + High school transcript',
        'Graduate: GRE/GMAT scores + Bachelor\'s degree',
        'Strong academic record (3.0+ GPA preferred)',
      ],
    },
    {
      title: 'English Proficiency',
      icon: FileText,
      items: [
        'TOEFL iBT: 80-100 minimum',
        'IELTS: Overall 6.5-7.5',
        'PTE Academic: 58-68',
        'Duolingo: 105-120',
      ],
    },
    {
      title: 'Financial Requirements',
      icon: DollarSign,
      items: [
        'Tuition: $20,000-$75,000 per year',
        'Living costs: $15,000-$25,000 per year',
        'Bank statements showing sufficient funds',
        'Scholarships and assistantships available',
      ],
    },
  ];

  const benefits = [
    { icon: Award, title: 'World Rankings', description: 'Home to most top-ranked universities globally' },
    { icon: Briefcase, title: 'OPT/CPT', description: '3 years work permit for STEM graduates' },
    { icon: MapPin, title: 'Diverse Culture', description: 'Multicultural environment with global opportunities' },
    { icon: Clock, title: 'Flexible Education', description: 'Choice of majors and interdisciplinary programs' },
  ];

  const visaProcess = [
    'Receive I-20 form from university',
    'Pay SEVIS fee ($350)',
    'Complete DS-160 form online',
    'Schedule visa interview appointment',
    'Attend visa interview at US Embassy',
    'Receive visa decision (3-5 days)',
  ];

  const popularCourses = [
    'Computer Science & IT',
    'Business Administration (MBA)',
    'Engineering',
    'Data Science & AI',
    'Medicine & Healthcare',
    'Finance & Economics',
    'Law',
    'Psychology',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1600&q=80')"}}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link href="/#destinations" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="text-6xl mb-6">🇺🇸</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Study in the United States</h1>
              <p className="text-xl text-white/90 mb-8">
                Pursue your education in the land of innovation and opportunity. The USA offers cutting-edge research, 
                diverse academic programs, and unparalleled career opportunities in a dynamic environment.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">200+</div>
                  <div className="text-white/80 text-sm">Universities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2-4</div>
                  <div className="text-white/80 text-sm">Years Duration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">3 Years</div>
                  <div className="text-white/80 text-sm">OPT for STEM</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">#1</div>
                  <div className="text-white/80 text-sm">Education System</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Top Universities
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topUniversities.map((uni, index) => (
                <motion.div
                  key={uni}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <GraduationCap className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-text-dark">{uni}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Entry Requirements
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {requirements.map((req, index) => {
                const Icon = req.icon;
                return (
                  <motion.div
                    key={req.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-text-dark">{req.title}</h3>
                    <ul className="space-y-3">
                      {req.items.map((item) => (
                        <li key={item} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-text-light text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary-purple to-primary-purple-light text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Study in the USA?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-white/90">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Popular Courses
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg text-center font-semibold text-text-dark hover:shadow-md transition-shadow"
                >
                  {course}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Student Visa Process (F-1 Visa)
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              {visaProcess.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 mb-6"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                    <p className="text-text-dark">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your USA Journey?</h2>
            <p className="text-text-light mb-8 max-w-2xl mx-auto">
              Our expert counselors are here to guide you through every step of the application process
            </p>
            <Link href="/#consultation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book Free Consultation
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
