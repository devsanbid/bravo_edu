'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Clock,
  Send
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { websiteService } from '@/lib/websiteService';
import { SectionDecorations } from './SectionDecorations';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { settings } = useWebsiteSettings();
  const { currentTheme } = useTheme();

  const getThemeEmojis = () => {
    switch (currentTheme) {
      case 'christmas': return ['🎄', '🎅', '⭐', '🎁'];
      case 'halloween': return ['🎃', '👻', '🦇', '💀'];
      case 'dashain': return ['🪁', '🌸', '🌺', '🌼'];
      case 'tihar': return ['🪔', '✨', '🏮', '⭐'];
      case 'holi': return ['🎨', '🌈', '💧', '💦'];
      case 'newYear': return ['🎆', '🎉', '🥳', '🍾'];
      default: return [];
    }
  };

  const emojis = getThemeEmojis();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'UK Education',
    'USA Education',
    'Canada Education',
    'IELTS Preparation',
    'Visa Assistance',
    'Career Counseling',
  ];

  const socialLinks = [
    { icon: Facebook, href: settings?.facebookUrl, color: 'hover:text-blue-600' },
    { icon: Instagram, href: settings?.instagramUrl, color: 'hover:text-pink-600' },
    { icon: Linkedin, href: settings?.linkedinUrl, color: 'hover:text-blue-700' },
    { icon: Youtube, href: settings?.youtubeUrl, color: 'hover:text-red-600' },
  ].filter(link => link.href); // Only show links that have URLs

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-6 relative overflow-hidden">
      {/* Festival Decorations */}
      <SectionDecorations />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Theme Emoji */}
            {emojis.length > 0 && (
              <span className="absolute top-0 right-0 text-2xl opacity-30">{emojis[0]}</span>
            )}
            
            <div className="mb-6">
              {settings?.logoFileId ? (
                <img 
                  src={websiteService.getImageUrl(settings.logoFileId)} 
                  alt={settings.siteTitle || "Bravo International"} 
                  className="h-20 w-auto mb-3 brightness-110" 
                />
              ) : (
                <img src="/logo1.png" alt="Bravo International" className="h-20 w-auto mb-3 brightness-110" />
              )}
              <p className="text-gray-400">International Educational Consultancy</p>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {settings?.footerDescription}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${social.color} transition-colors duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            {/* Theme Emoji */}
            {emojis.length > 0 && (
              <span className="absolute top-0 right-0 text-2xl opacity-30">{emojis[1]}</span>
            )}
            
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-orange transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent-orange group-hover:w-4 transition-all duration-300"></span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Theme Emoji */}
            {emojis.length > 0 && (
              <span className="absolute top-0 right-0 text-2xl opacity-30">{emojis[2]}</span>
            )}
            
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-accent-orange transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent-orange group-hover:w-4 transition-all duration-300"></span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Theme Emoji */}
            {emojis.length > 0 && (
              <span className="absolute top-0 right-0 text-2xl opacity-30">{emojis[3]}</span>
            )}
            
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-orange flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">{settings?.footerAddress || 'Putalisadak Chowk, Kathmandu, Nepal'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-orange flex-shrink-0" />
                <a href={`tel:${settings?.footerPhone}`} className="text-gray-400 hover:text-accent-orange transition-colors">
                  {settings?.footerPhone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-orange flex-shrink-0" />
                <a href={`mailto:${settings?.footerEmail}`} className="text-gray-400 hover:text-accent-orange transition-colors">
                  {settings?.footerEmail}
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent-orange flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400">Sun - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-400">Saturday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1648377961234!2d85.3198711!3d27.7071101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb193563420a8b%3A0x2bb23ea6fd024519!2sBravo%20International%20Education!5e0!3m2!1sen!2snp!4v1734866400000!5m2!1sen!2snp"
            width="100%" 
            height="400" 
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-2xl p-8 mb-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated!</h3>
            <p className="text-white/90 mb-6">
              Subscribe to our newsletter for the latest updates on study abroad opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 text-white py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-orange to-accent-gold text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {settings?.footerCopyright}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-accent-orange transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent-orange transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent-orange transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
