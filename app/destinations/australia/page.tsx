'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, FileText, DollarSign, Briefcase, MapPin, Clock, CheckCircle, Award, Users } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function AustraliaPage() {
  const topUniversities = [
    'University of Melbourne',
    'University of Sydney',
    'Australian National University',
    'University of Queensland',
    'Monash University',
    'University of New South Wales',
    'University of Western Australia',
    'University of Adelaide',
  ];

  const requirements = [
    {
      title: 'Academic Requirements',
      icon: GraduationCap,
      items: [
        'Undergraduate: Year 12 or equivalent with good grades',
        'Postgraduate: Bachelor\'s degree (65%+)',
        'Foundation programs available',
        'Diploma pathway options',
      ],
    },
    {
      title: 'English Proficiency',
      icon: FileText,
      items: [
        'IELTS: Overall 6.5 (no band less than 6.0)',
        'TOEFL iBT: 79-93',
        'PTE Academic: 58-64',
        'Some universities accept lower scores with conditions',
      ],
    },
    {
      title: 'Financial Requirements',
      icon: DollarSign,
      items: [
        'Tuition: AUD $25,000-$50,000 per year',
        'Living costs: AUD $21,041 per year',
        'OSHC (health insurance) mandatory',
        'Proof of funds for visa',
      ],
    },
  ];

  const benefits = [
    { icon: Briefcase, title: '40 Hours/Week Work', description: 'International students can work unrestricted hours' },
    { icon: Clock, title: 'Post-Study Work', description: '2-4 years work rights after graduation' },
    { icon: Award, title: 'World-Class Education', description: 'Home to 7 of the top 100 universities globally' },
    { icon: Users, title: 'Multicultural', description: 'Welcoming international community with high quality of life' },
  ];

  const visaProcess = [
    'Receive Confirmation of Enrollment (CoE)',
    'Arrange Overseas Student Health Cover',
    'Complete online visa application (subclass 500)',
    'Submit financial and academic documents',
    'Health examination and biometrics',
    'Receive visa decision (typically 4-6 weeks)',
  ];

  const popularCourses = [
    'Business & Management',
    'Engineering',
    'IT & Computer Science',
    'Healthcare & Nursing',
    'Hospitality & Tourism',
    'Architecture',
    'Accounting',
    'Environmental Science',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="relative text-white py-20 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1600&q=80')"}}>
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
              <div className="text-6xl mb-6">🇦🇺</div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Study in Australia</h1>
              <p className="text-xl text-white/90 mb-8">
                Experience exceptional education in the land Down Under. Australia offers world-class universities, 
                stunning landscapes, vibrant cities, and generous work rights for international students.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">43</div>
                  <div className="text-white/80 text-sm">Universities</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">40 hrs</div>
                  <div className="text-white/80 text-sm">Work/Week</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">2-4 yrs</div>
                  <div className="text-white/80 text-sm">Post-Study Work</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">Top 100</div>
                  <div className="text-white/80 text-sm">Universities</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Top Universities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Group of Eight & Top Universities
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
                  <GraduationCap className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-text-dark">{uni}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Entry Requirements */}
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
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
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

        {/* Benefits */}
        <section className="py-16 bg-gradient-to-br from-primary-purple to-primary-purple-light text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Study in Australia?</h2>
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

        {/* Popular Courses */}
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
                  className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-lg text-center font-semibold text-text-dark hover:shadow-md transition-shadow"
                >
                  {course}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visa Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Student Visa Process (Subclass 500)
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
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
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

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Australia Journey?</h2>
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
