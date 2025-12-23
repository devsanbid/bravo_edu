'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { announcementService, Announcement } from '@/lib/announcementService';
import { Megaphone, Calendar, AlertCircle, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIcons = {
  general: Megaphone,
  urgent: AlertCircle,
  event: Calendar,
  scholarship: Trophy,
};

const categoryColors = {
  general: 'bg-blue-100 text-blue-700 border-blue-200',
  urgent: 'bg-red-100 text-red-700 border-red-200',
  event: 'bg-purple-100 text-purple-700 border-purple-200',
  scholarship: 'bg-green-100 text-green-700 border-green-200',
};

const categoryBadgeColors = {
  general: 'bg-blue-500',
  urgent: 'bg-red-500',
  event: 'bg-purple-500',
  scholarship: 'bg-green-500',
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementService.getActiveAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnnouncements = selectedCategory === 'all'
    ? announcements
    : announcements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Announcements
              </h1>
              <Sparkles className="w-10 h-10" />
            </div>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Stay updated with the latest news, events, and opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 md:py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 text-sm md:text-base ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span className="sm:hidden">{category.charAt(0).toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md">
              <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No announcements available</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for updates</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAnnouncements.map((announcement, index) => {
                const Icon = categoryIcons[announcement.category];
                return (
                  <motion.div
                    key={announcement.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 overflow-hidden ${
                      announcement.category === 'urgent' ? 'border-l-red-500' :
                      announcement.category === 'scholarship' ? 'border-l-green-500' :
                      announcement.category === 'event' ? 'border-l-purple-500' :
                      'border-l-blue-500'
                    }`}
                  >
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                          <div className={`p-3 rounded-xl ${categoryColors[announcement.category]}`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                                {announcement.title}
                              </h2>
                              <span className={`${categoryBadgeColors[announcement.category]} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase inline-block w-fit`}>
                                {announcement.category}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="hidden sm:inline">
                                  {new Date(announcement.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                                <span className="sm:hidden">
                                  {new Date(announcement.publishedDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </span>
                              {announcement.expiryDate && (
                                <span className="text-orange-600 font-medium text-xs md:text-sm">
                                  Valid until: {new Date(announcement.expiryDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="prose prose-sm md:prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base lg:text-lg">
                          {announcement.content}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className={`h-2 ${
                      announcement.category === 'urgent' ? 'bg-gradient-to-r from-red-400 to-red-600' :
                      announcement.category === 'scholarship' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      announcement.category === 'event' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                      'bg-gradient-to-r from-blue-400 to-blue-600'
                    }`} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {!loading && filteredAnnouncements.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Have Questions?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Our team is here to help you with any announcements or opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#consultation"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Book Consultation
              </a>
              <button
                onClick={() => {
                  const event = new CustomEvent('openChat');
                  window.dispatchEvent(event);
                }}
                className="inline-block bg-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 transition-all border-2 border-white/30"
              >
                Chat With Us
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
