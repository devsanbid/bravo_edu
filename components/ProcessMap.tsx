'use client';

import { motion } from 'framer-motion';
import { MessageCircle, FileText, CheckCircle, Plane, ArrowRight, Sparkles } from 'lucide-react';

export default function ProcessMap() {
  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: 'Free Counselling',
      description: 'One-on-one personalized counseling to understand your goals and recommend the perfect universities for your profile',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      duration: '1-2 Days',
      features: ['University Selection', 'Course Guidance', 'Career Mapping'],
    },
    {
      number: 2,
      icon: FileText,
      title: 'Test Preparation',
      description: 'Expert coaching for IELTS, PTE, TOEFL, GRE, and more with proven strategies to achieve your target scores',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      duration: '2-3 Months',
      features: ['Mock Tests', 'Expert Trainers', 'Study Materials'],
    },
    {
      number: 3,
      icon: CheckCircle,
      title: 'Application & Documentation',
      description: 'Complete application support including SOP, LOR, essays, and all required documents crafted by experts',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      duration: '3-4 Weeks',
      features: ['SOP Writing', 'Document Review', 'Application Tracking'],
    },
    {
      number: 4,
      icon: Plane,
      title: 'Visa & Departure',
      description: 'End-to-end visa assistance, mock interviews, and comprehensive pre-departure orientation for a smooth journey',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      duration: '4-8 Weeks',
      features: ['Visa Filing', 'Interview Prep', 'Travel Assistance'],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-purple to-blue-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-orange to-yellow-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-2 shadow-lg mb-6"
          >
            <Sparkles className="w-5 h-5 text-accent-orange" />
            <span className="text-sm font-semibold text-primary-purple">Simple & Effective Process</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-purple via-purple-600 to-accent-orange bg-clip-text text-transparent">
              Your Journey to Success
            </span>
          </h2>
          <p className="text-text-light text-xl max-w-3xl mx-auto leading-relaxed">
            Transform your study abroad dreams into reality with our proven 4-step process. 
            <span className="block mt-2 text-primary-purple font-semibold">We've helped 1000+ students achieve their goals!</span>
          </p>
        </motion.div>

        {/* Desktop View - Enhanced Cards */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Animated Connection Line */}
            <div className="absolute top-32 left-[10%] right-[10%] h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500 opacity-20" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-green-500"
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="relative group"
                  >
                    {/* Enhanced Step Card */}
                    <div className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-white/50 backdrop-blur-sm overflow-hidden h-full`}>
                      {/* Decorative Corner */}
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${step.color} opacity-10 rounded-bl-full`} />
                      
                      {/* Floating Step Number */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-2xl transition-shadow`}
                      >
                        <span className="text-3xl font-black text-white">{step.number}</span>
                        {/* Glow effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                      </motion.div>

                      {/* Icon with Animation */}
                      <motion.div
                        className="flex justify-center mb-5"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-text-dark mb-4 text-center group-hover:text-primary-purple transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-text-light text-sm mb-6 text-center leading-relaxed min-h-[80px]">
                        {step.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="space-y-2 mb-6">
                        {step.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + idx * 0.1 }}
                            className="flex items-center space-x-2 text-xs"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                            <span className="text-text-dark font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Duration Badge */}
                      <div className={`bg-gradient-to-r ${step.color} rounded-2xl px-4 py-3 text-center shadow-md`}>
                        <span className="text-sm font-bold text-white flex items-center justify-center space-x-2">
                          <span>⏱️</span>
                          <span>{step.duration}</span>
                        </span>
                      </div>
                    </div>

                    {/* Animated Arrow Connector */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="absolute top-32 -right-3 z-20 hidden lg:block"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                      >
                        <ArrowRight className={`w-8 h-8 text-gradient-to-r ${step.color} drop-shadow-lg`} />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-white/50`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                        <h3 className="text-xl font-bold text-text-dark">{step.title}</h3>
                      </div>
                      <p className="text-text-light text-sm mb-4">{step.description}</p>
                      <div className={`inline-block bg-gradient-to-r ${step.color} rounded-xl px-4 py-2`}>
                        <span className="text-xs font-bold text-white">⏱️ {step.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile View - Enhanced Vertical */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${step.bgColor} rounded-3xl p-6 shadow-lg border-2 border-white/50`}>
                  <div className="flex items-start space-x-4">
                    {/* Step Number with Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-2 shadow-lg`}>
                        <span className="text-xl font-bold text-white">{step.number}</span>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-dark mb-2">{step.title}</h3>
                      <p className="text-text-light text-sm mb-3">{step.description}</p>
                      <div className="space-y-1.5 mb-3">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${step.color}`} />
                            <span className="text-text-dark font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`inline-block bg-gradient-to-r ${step.color} rounded-xl px-3 py-2`}>
                        <span className="text-xs font-bold text-white">⏱️ {step.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Vertical Connector */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="relative">
                      <div className="w-1 h-12 bg-gradient-to-b from-gray-300 to-transparent rounded-full" />
                      <motion.div
                        className={`absolute bottom-0 left-0 w-1 bg-gradient-to-b ${steps[index + 1].color} rounded-full`}
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-text-light mb-6">Ready to start your journey?</p>
          <motion.a
            href="#consultation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-purple to-primary-purple-light text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span>Book Free Consultation</span>
            <MessageCircle className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
