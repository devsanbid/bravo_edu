'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Loader2 } from 'lucide-react';
import { testimonialService, Testimonial } from '@/lib/testimonialService';

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultTestimonials = [
    {
      name: 'Prajita Adhikari',
      college: 'Niagara College',
      location: 'Toronto, Canada',
      image: '/student1_review.jpg',
      rating: 5,
      quote: "Bravo International made my dream of studying in Canada a reality.",
      program: 'Business Management',
      year: '2023',
    },
  ];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await testimonialService.getTestimonials();
      if (data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(defaultTestimonials as any);
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error);
      setTestimonials(defaultTestimonials as any);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our students who have successfully achieved their dreams
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left Side - Purple Panel with Video and Student Info */}
                  <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 md:p-10 text-white relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-32 -translate-y-32"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full translate-x-24 translate-y-24"></div>
                    
                    <div className="relative z-10">
                      {/* Video Player */}
                      {testimonials[currentIndex].videoFileName && (
                        <div className="mb-6 md:mb-8">
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-purple-900/30">
                            <video
                              src={testimonialService.getVideoUrl(testimonials[currentIndex].videoFileName!)}
                              controls
                              className="w-full h-full object-cover"
                              poster={testimonials[currentIndex].imageFileName ? testimonialService.getImageUrl(testimonials[currentIndex].imageFileName!) : undefined}
                            />
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white flex items-center justify-center">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all">
                            Watch Video
                          </button>
                        </div>
                      )}

                      {/* Student Photo */}
                      <div className="flex justify-center mb-4 md:mb-6">
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                          {testimonials[currentIndex].imageFileName ? (
                            <img
                              src={testimonialService.getImageUrl(testimonials[currentIndex].imageFileName!)}
                              alt={testimonials[currentIndex].name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-5xl md:text-6xl">
                              👨‍🎓
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Student Info */}
                      <div className="text-center mb-4 md:mb-6">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                          {testimonials[currentIndex].name}
                        </h3>
                        {testimonials[currentIndex].program && (
                          <p className="text-base md:text-lg text-purple-100 mb-1">
                            {testimonials[currentIndex].program}
                          </p>
                        )}
                        {testimonials[currentIndex].college && (
                          <p className="text-sm md:text-base text-purple-200 mb-2">
                            {testimonials[currentIndex].college}
                          </p>
                        )}
                        {testimonials[currentIndex].location && (
                          <div className="flex items-center justify-center gap-2 text-purple-200 text-sm md:text-base">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {testimonials[currentIndex].location}
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 md:w-6 md:h-6 ${
                              i < testimonials[currentIndex].rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-purple-300/50 fill-purple-300/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - White Panel with Quote */}
                  <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between bg-white">
                    <div>
                      {/* Large Quote Icon */}
                      <div className="mb-4 md:mb-6">
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-orange-500" fill="currentColor" viewBox="0 0 100 100">
                          <text x="0" y="80" fontSize="100" fontFamily="Georgia, serif" fontWeight="bold">"</text>
                        </svg>
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed font-medium mb-6 md:mb-8">
                        {testimonials[currentIndex].quote || "An amazing experience that transformed my educational journey."}
                      </blockquote>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 border-t border-gray-200">
                      {testimonials[currentIndex].year && (
                        <div>
                          <p className="text-xs md:text-sm text-gray-500 mb-1">Batch of</p>
                          <p className="text-2xl md:text-3xl font-bold text-purple-600">
                            {testimonials[currentIndex].year}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-orange-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-sm md:text-base">Verified Student</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-blue-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-blue-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
