'use client';

import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, GraduationCap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function GalleryPage() {
  // Student success images (you can add more images as they upload them)
  const successStories = [
    {
      id: 1,
      image: '/student1_review.jpg',
      name: 'Aisha Sharma',
      achievement: 'IELTS Band 8.0',
      university: 'University of Toronto',
      country: 'Canada',
      score: '8.0',
    },
    {
      id: 2,
      image: '/student2.jpeg',
      name: 'Rajesh Kumar',
      achievement: 'PTE Score 79',
      university: 'University of Melbourne',
      country: 'Australia',
      score: '79',
    },
    // Placeholder cards for future students
    {
      id: 3,
      name: 'Priya Patel',
      achievement: 'TOEFL 110',
      university: 'MIT',
      country: 'USA',
      score: '110',
      placeholder: true,
    },
    {
      id: 4,
      name: 'Sanjay Thapa',
      achievement: 'IELTS Band 7.5',
      university: 'University of Oxford',
      country: 'UK',
      score: '7.5',
      placeholder: true,
    },
    {
      id: 5,
      name: 'Neha Rai',
      achievement: 'GRE 325',
      university: 'Stanford University',
      country: 'USA',
      score: '325',
      placeholder: true,
    },
    {
      id: 6,
      name: 'Bikash Gurung',
      achievement: 'PTE Score 85',
      university: 'University of British Columbia',
      country: 'Canada',
      score: '85',
      placeholder: true,
    },
  ];

  const stats = [
    { icon: GraduationCap, label: 'Students Placed', value: '500+' },
    { icon: Award, label: 'Success Rate', value: '98%' },
    { icon: Star, label: 'Average IELTS', value: '7.5' },
    { icon: TrendingUp, label: 'Visa Success', value: '95%' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-purple to-primary-purple-light text-white py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Success Gallery
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Celebrating the achievements of our students who made their dreams come true.
                See their incredible test scores and university acceptances!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md text-center"
                  >
                    <Icon className="w-10 h-10 text-accent-orange mx-auto mb-3" />
                    <div className="text-3xl font-bold text-primary-purple mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-light">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Our Success Stories
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Image or Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-primary-purple/10 to-accent-orange/10">
                    {student.placeholder ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <GraduationCap className="w-20 h-20 text-primary-purple/30 mx-auto mb-3" />
                          <p className="text-text-light text-sm">Image Coming Soon</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Score Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-orange to-yellow-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      {student.score}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-dark mb-2">
                      {student.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <Award className="w-5 h-5 text-accent-orange" />
                      <span className="text-primary-purple font-semibold">
                        {student.achievement}
                      </span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-light">University:</span>
                        <span className="font-semibold text-text-dark">
                          {student.university}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-light">Country:</span>
                        <span className="font-semibold text-text-dark">
                          {student.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-purple to-primary-purple-light text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us help you achieve your study abroad dreams with expert guidance and test preparation
            </p>
            <motion.a
              href="/#consultation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-accent-orange to-yellow-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Book Your Free Consultation
            </motion.a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
