'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Linkedin, ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function SocialMediaPage() {
  // Social media post previews
  const socialPosts = [
    {
      id: 1,
      platform: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      image: '/student1_review.jpg',
      caption: '🎉 Another success story! Aisha scored 8.0 in IELTS and got accepted to University of Toronto! 🇨🇦',
      likes: 245,
      comments: 32,
      date: '2 days ago',
      link: '#',
    },
    {
      id: 2,
      platform: 'Facebook',
      icon: Facebook,
      color: 'from-blue-500 to-blue-700',
      image: '/student2.jpeg',
      caption: 'Congratulations Rajesh! PTE Score 79 and heading to Melbourne! 🇦🇺 Your hard work paid off! 🎓',
      likes: 189,
      comments: 28,
      date: '5 days ago',
      link: '#',
    },
    {
      id: 3,
      platform: 'Instagram',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      image: '/banner1.jpg',
      caption: '📚 IELTS Preparation Classes starting next week! Limited seats available. Register now! 🎯',
      likes: 312,
      comments: 45,
      date: '1 week ago',
      link: '#',
    },
    {
      id: 4,
      platform: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-800',
      image: '/Director.jpg',
      caption: 'Study abroad tips from our director: "Success is where preparation meets opportunity" 💼',
      likes: 156,
      comments: 19,
      date: '1 week ago',
      link: '#',
    },
    {
      id: 5,
      platform: 'YouTube',
      icon: Youtube,
      color: 'from-red-500 to-red-700',
      thumbnail: 'VIDEO',
      caption: 'Complete Guide to Student Visa Application Process | Step by Step Tutorial 🎬',
      likes: 428,
      comments: 67,
      date: '2 weeks ago',
      link: '#',
    },
    {
      id: 6,
      platform: 'Facebook',
      icon: Facebook,
      color: 'from-blue-500 to-blue-700',
      image: '/banner1.jpg',
      caption: '🌟 Free Consultation Week! Book your appointment and get expert guidance on studying abroad 🌍',
      likes: 267,
      comments: 41,
      date: '2 weeks ago',
      link: '#',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', followers: '5.2K', link: '#' },
    { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700', followers: '8.1K', link: '#' },
    { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700', followers: '3.4K', link: '#' },
    { name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800', followers: '2.8K', link: '#' },
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
                Connect With Us
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Stay updated with success stories, study abroad tips, and educational opportunities.
                Follow us on social media for daily inspiration!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-text-dark mb-1">{social.name}</h3>
                    <p className="text-sm text-text-light">{social.followers} Followers</p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-primary-purple to-accent-orange bg-clip-text text-transparent">
                Latest Posts
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {socialPosts.map((post, index) => {
                const Icon = post.icon;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Platform Header */}
                    <div className={`bg-gradient-to-r ${post.color} p-4 flex items-center justify-between`}>
                      <div className="flex items-center space-x-2 text-white">
                        <Icon className="w-5 h-5" />
                        <span className="font-semibold">{post.platform}</span>
                      </div>
                      <span className="text-white/80 text-sm">{post.date}</span>
                    </div>

                    {/* Post Image/Thumbnail */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                      {post.thumbnail ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Youtube className="w-20 h-20 text-red-500 mx-auto mb-3" />
                            <p className="text-text-dark font-semibold">Video Content</p>
                          </div>
                        </div>
                      ) : post.image ? (
                        <Image
                          src={post.image}
                          alt={`${post.platform} post`}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <p className="text-text-dark mb-4 line-clamp-3">
                        {post.caption}
                      </p>
                      
                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b">
                        <div className="flex items-center space-x-4 text-sm text-text-light">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <Share2 className="w-5 h-5 text-text-light hover:text-primary-purple cursor-pointer transition-colors" />
                      </div>

                      {/* View Post Link */}
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 text-primary-purple font-semibold hover:text-accent-orange transition-colors"
                      >
                        <span>View Post</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-purple to-primary-purple-light text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Follow us on social media for daily updates, success stories, and study abroad tips
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gradient-to-r ${social.color} p-4 rounded-full shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
