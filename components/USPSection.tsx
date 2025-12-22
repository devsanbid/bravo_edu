'use client';

import { motion } from 'framer-motion';
import { Users, Trophy, FileSearch, FileCheck, Sparkles } from 'lucide-react';

export default function USPSection() {
  const usps = [
    {
      icon: Users,
      title: 'Service First',
      description: 'Because your career is our top-most priority, we leave no stones unturned for your great learning experience in the chosen field. We are sincerely committed and utterly driven to work in your best interest.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileSearch,
      title: 'Personalized Counselling',
      description: 'Our team of experts closely examines your case, paying exclusive attention to practically applicable details, before offering you reputable and ingenious solutions. Each learner is worthy of a chance!',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Trophy,
      title: 'Resourceful & Elegant Test Preparation',
      description: 'Your overseas educational approach begins at a desk in a classroom. Given that the accredited team is directed by a professional with more than 15 years of expertise, you are free to inquire with your instructors at any time.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FileCheck,
      title: 'Best Institutions',
      description: 'We do not rest until we find the best possible institutions that align with your profile perfectly. At the same time, we highly encourage your engagement in the research on your courses, campuses, and study destinations.',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-purple/10 to-accent-orange/10 rounded-full px-6 py-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-accent-orange" />
            <span className="text-sm font-semibold text-primary-purple">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
              What Separates Us Among All?
            </span>
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Our unique approach and commitment to excellence make us the preferred choice for students
          </p>
        </motion.div>

        {/* USP Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${usp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary-purple transition-colors">
                    {usp.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {usp.description}
                  </p>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${usp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              More Reasons to Choose Bravo International
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h4 className="text-xl font-semibold mb-2">100% Success Goal</h4>
                <p className="text-white/90">We strive for perfection in every student journey</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">🌐</div>
                <h4 className="text-xl font-semibold mb-2">Global Network</h4>
                <p className="text-white/90">Strong partnerships with 50+ universities worldwide</p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">💼</div>
                <h4 className="text-xl font-semibold mb-2">Post-Arrival Support</h4>
                <p className="text-white/90">Assistance even after you reach your destination</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-center text-text-light mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-4xl mb-2">🇬🇧</div>
              <p className="text-sm text-text-light">British Council</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-4xl mb-2">🎓</div>
              <p className="text-sm text-text-light">ICEF Certified</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-sm text-text-light">Award Winning</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-sm text-text-light">Top Rated</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
