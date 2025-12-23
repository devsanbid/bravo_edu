'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, Linkedin } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Santosh Pokherel',
    role: 'Chief Education Consultant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    message: 'With over 15 years of experience in international education, I\'m passionate about helping students find their perfect academic path. Your dreams of studying abroad are valid, and I\'m here to make them a reality.',
    email: 'santosh.pokherel@bravointernational.com',
    phone: '+977 9851352807',
    linkedin: '#'
  },
  {
    name: 'Sagar Kahnel',
    role: 'Visa & Immigration Specialist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    message: 'Navigating visa processes can feel overwhelming, but you don\'t have to do it alone. I\'ve successfully guided over 500 students through their visa applications with a 98% success rate. Let\'s get you there!',
    email: 'sagar.kahnel@bravointernational.com',
    phone: '+977 9801234567',
    linkedin: '#'
  },
  {
    name: 'Priya Sharma',
    role: 'University Placement Advisor',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    message: 'Every student is unique, and so is your educational journey. I work closely with top universities worldwide to match you with programs that align with your goals, interests, and strengths. Your success is my mission.',
    email: 'priya.sharma@bravointernational.com',
    phone: '+977 9812345678',
    linkedin: '#'
  },
  {
    name: 'James Thompson',
    role: 'Career & Scholarship Counselor',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    message: 'Studying abroad is an investment in your future. I specialize in finding scholarship opportunities and ensuring your education leads to meaningful career outcomes. Let me help you maximize your potential.',
    email: 'james.thompson@bravointernational.com',
    phone: '+977 9823456789',
    linkedin: '#'
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Dedicated professionals committed to guiding you toward academic excellence and global opportunities
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Success Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced team brings together expertise in education, immigration, and career counseling 
              to provide you with comprehensive support at every step of your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-48 md:flex-shrink-0">
                    <div className="relative h-64 md:h-full w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold text-lg">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      {member.message}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-2 text-sm">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {member.email}
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {member.phone}
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our team is here to answer your questions and guide you through every step. 
            Book a free consultation today and let&apos;s discuss your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#consultation"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Book Free Consultation
            </a>
            <button
              onClick={() => {
                const event = new CustomEvent('openChat');
                window.dispatchEvent(event);
              }}
              className="inline-block bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-lg"
            >
              Chat With Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
