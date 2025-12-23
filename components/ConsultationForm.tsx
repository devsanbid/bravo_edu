'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, GraduationCap, Globe, X } from 'lucide-react';
import { consultationService } from '@/lib/consultationService';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    education: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const destinations = ['UK', 'USA', 'Canada', 'Australia', 'New Zealand', 'Ireland', 'Not Sure'];
  const educationLevels = ['Undergraduate', 'Postgraduate', 'PhD', 'Diploma'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await consultationService.createConsultation(formData);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          destination: '',
          education: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      console.error('Error submitting consultation:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-primary-purple/5 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Book Your Free Consultation
              </span>
            </h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">
              Take the first step towards your dream education abroad. Our expert counselors are ready to guide you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* Left Side - Info */}
              <div className="bg-gradient-to-br from-primary-purple to-primary-purple-light p-8 md:p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">Why Choose Bravo?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">100% Free Consultation</h4>
                      <p className="text-white/90 text-sm">No hidden charges, completely free guidance</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Expert Counselors</h4>
                      <p className="text-white/90 text-sm">15+ years of experience in international education</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Guidance</h4>
                      <p className="text-white/90 text-sm">Tailored advice based on your profile and goals</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">End-to-End Support</h4>
                      <p className="text-white/90 text-sm">From university selection to visa approval</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/80 mb-4">What to expect in your consultation:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                      <span>Profile evaluation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                      <span>University recommendations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                      <span>Cost estimation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-accent-gold rounded-full"></div>
                      <span>Application timeline</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all text-black placeholder:text-gray-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all text-black placeholder:text-gray-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all text-black placeholder:text-gray-500"
                          placeholder="+977 98XXXXXXXX"
                        />
                      </div>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Preferred Destination *
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all appearance-none bg-white text-black"
                        >
                          <option value="">Select Destination</option>
                          {destinations.map((dest) => (
                            <option key={dest} value={dest}>
                              {dest}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Education Level */}
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">
                        Education Level *
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                        <select
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all appearance-none bg-white text-black"
                        >
                          <option value="">Select Level</option>
                          {educationLevels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple transition-all resize-none text-black placeholder:text-gray-500"
                        placeholder="Tell us about your goals..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Free Consultation</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      We'll respond within 24 hours. Your information is kept confidential.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark mb-3">
                      Thank You! 🎉
                    </h3>
                    <p className="text-text-light mb-6">
                      Your consultation request has been received. Our team will contact you within 24 hours.
                    </p>
                    <div className="bg-primary-purple/5 rounded-lg p-6">
                      <p className="text-sm text-text-dark mb-2">
                        <strong>What's Next?</strong>
                      </p>
                      <ul className="text-sm text-text-light space-y-2 text-left max-w-sm mx-auto">
      
                        <li>✓ Prepare your academic documents</li>
                        <li>✓ Note down your questions</li>
                        <li>✓ Our counselor will call you soon</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Successfully Submitted! 🎉
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest! Our team will review your request and contact you soon.
                </p>
                
                <div className="bg-gradient-to-r from-primary-purple/10 to-accent-orange/10 rounded-lg p-6 mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    What happens next?
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Our counselor will review your details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Expect a call within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Check your email for confirmation</span>
                    </li>
                  </ul>
                </div>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
