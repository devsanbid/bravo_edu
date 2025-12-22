'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, FileText, DollarSign, Briefcase, MapPin, Award, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function IrelandPage() {
  const topUniversities = [
    'Trinity College Dublin',
    'University College Dublin',
    'University College Cork',
    'National University of Ireland Galway',
    'Dublin City University',
    'University of Limerick',
    'Maynooth University',
    'Technological University Dublin',
  ];

  const requirements = [
    {
      title: 'Academic Requirements',
      icon: GraduationCap,
      items: [
        'Undergraduate: Completion of secondary education',
        'Postgraduate: Bachelor\'s degree with good grades',
        'GPA requirements vary by university',
        'Portfolio required for some programs',
      ],
    },
    {
      title: 'English Proficiency',
      icon: FileText,
      items: [
        'IELTS: Overall 6.5 (minimum 6.0 each band)',
        'TOEFL iBT: 90+',
        'PTE Academic: 63+',
        'Some universities accept Duolingo',
      ],
    },
    {
      title: 'Financial Requirements',
      icon: DollarSign,
      items: [
        'Tuition: €10,000-€25,000 per year',
        'Living costs: €7,000-€12,000 per year',
        'Proof of funds required for visa',
        'Part-time work allowed (20 hrs/week)',
      ],
    },
  ];

  const benefits = [
    { icon: Briefcase, title: 'Tech Hub of Europe', description: 'Home to Google, Facebook, Apple European HQ' },
    { icon: Users, title: '2-Year Stay Back', description: 'Post-study work visa for all graduates' },
    { icon: Award, title: 'Quality Education', description: 'World-class universities with international recognition' },
    { icon: MapPin, title: 'Gateway to Europe', description: 'Easy travel access to all European countries' },
  ];

  const visaProcess = [
    'Receive offer letter from Irish university',
    'Pay tuition fees and get enrollment confirmation',
    'Prepare financial documents (€7,000 + fees)',
    'Apply for study visa online',
    'Attend visa interview (if required)',
    'Receive visa decision within 8 weeks',
  ];

  const popularCourses = [
    'Computer Science',
    'Data Analytics',
    'Business Management',
    'Biotechnology',
    'Finance & Accounting',
    'Engineering',
    'Digital Marketing',
    'Pharmaceuticals',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32">
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1600&q=80')"}}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link href="/#destinations" className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Destinations</span>
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <div className="text-6xl mb-6">🇮🇪</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Study in Ireland</h1>
              <p className="text-xl text-white/90 mb-8">
                Experience friendly Irish culture and world-class education in Europe's tech hub. Ireland offers excellent 
                post-study work opportunities with 2-year stay back visa for all graduates.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">30+</div>
                  <div className="text-white/80 text-sm">Universities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">1-4</div>
                  <div className="text-white/80 text-sm">Years Duration</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2 Years</div>
                  <div className="text-white/80 text-sm">Stay Back</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">Tech Hub</div>
                  <div className="text-white/80 text-sm">European HQ</div>
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
                  <GraduationCap className="w-8 h-8 text-green-600 mb-3" />
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
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6">
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
            <h2 className="text-4xl font-bold mb-12 text-center">Why Study in Ireland?</h2>
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
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg text-center font-semibold text-text-dark hover:shadow-md transition-shadow">
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
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Ireland Journey?</h2>
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
