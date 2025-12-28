'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, FileText, DollarSign, Briefcase, MapPin, Award, Trees, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function NewZealandPage() {
  const topUniversities = [
    'University of Auckland',
    'University of Otago',
    'Victoria University of Wellington',
    'University of Canterbury',
    'Massey University',
    'Lincoln University',
    'University of Waikato',
    'Auckland University of Technology',
  ];

  const requirements = [
    {
      title: 'Academic Requirements',
      icon: GraduationCap,
      items: [
        'Undergraduate: Year 12 completion or equivalent',
        'Postgraduate: Bachelor degree with good grades',
        'Foundation programs available',
        'Academic transcripts required',
      ],
    },
    {
      title: 'English Proficiency',
      icon: FileText,
      items: [
        'IELTS: Overall 6.0-6.5 (no band less than 5.5-6.0)',
        'TOEFL iBT: 80-90',
        'PTE Academic: 50-58',
        'Cambridge English accepted',
      ],
    },
    {
      title: 'Financial Requirements',
      icon: DollarSign,
      items: [
        'Tuition: NZD $22,000-$32,000 per year',
        'Living costs: NZD $15,000-$18,000 per year',
        'Proof of funds for visa',
        '20 hours/week work rights while studying',
      ],
    },
  ];

  const benefits = [
    { icon: Trees, title: 'Beautiful Nature', description: 'Stunning landscapes with high quality of life' },
    { icon: Briefcase, title: '3-Year PSW', description: 'Post-study PSW for up to 3 years' },
    { icon: Award, title: 'Quality Education', description: 'All 8 universities in top 3% globally' },
    { icon: MapPin, title: 'Safe & Peaceful', description: 'One of the safest countries in the world' },
  ];

  const visaProcess = [
    'Receive offer of place from NZ institution',
    'Pay tuition fees and get enrollment confirmation',
    'Apply for student visa online',
    'Provide proof of funds (NZD $15,000 + fees)',
    'Medical examination and chest X-ray',
    'Receive visa decision (4-6 weeks)',
  ];

  const popularCourses = [
    'Business Management',
    'Information Technology',
    'Engineering',
    'Agriculture & Forestry',
    'Tourism & Hospitality',
    'Environmental Science',
    'Nursing',
    'Film & Creative Arts',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32">
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1600&q=80')"}}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link href="/#destinations" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="text-6xl mb-6">🇳🇿</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Study in New Zealand</h1>
              <p className="text-xl text-white/90 mb-8">
                Experience world-class education in one of the most beautiful countries on Earth. New Zealand offers 
                excellent quality of life, stunning nature, and generous post-study work opportunities.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">40+</div>
                  <div className="text-white/80 text-sm">Institutions</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">1-3</div>
                  <div className="text-white/80 text-sm">Years Duration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">3 Years</div>
                  <div className="text-white/80 text-sm">PSW</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">Top 3%</div>
                  <div className="text-white/80 text-sm">Universities</div>
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
                <motion.div key={uni} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <GraduationCap className="w-8 h-8 text-teal-600 mb-3" />
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
                  <motion.div key={req.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6">
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
            <h2 className="text-4xl font-bold mb-12 text-center">Why Study in New Zealand?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
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
                <motion.div key={course} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg text-center font-semibold text-text-dark hover:shadow-md transition-shadow">
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
                Student Visa Process
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              {visaProcess.map((step, index) => (
                <motion.div key={step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your New Zealand Journey?</h2>
            <p className="text-text-light mb-8 max-w-2xl mx-auto">
              Our expert counselors are here to guide you through every step of the application process
            </p>
            <Link href="/#consultation">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
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
