'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Study Abroad', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Test Preparation', href: '#test-prep' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Post', href: '/social-media' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="bg-gray-100 py-2 hidden md:block">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-4 gap-4 text-sm">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <img src="/logo1.png" alt="Bravo International" className="h-16 w-auto object-contain" />
              </Link>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary-purple" />
              <div>
                <div className="font-semibold text-text-dark">Email</div>
                <div className="text-text-light text-xs">info@bravointernational.edu.np</div>
                <div className="text-text-light text-xs">contact@bravointernational.edu.np</div>
              </div>
            </div>

            {/* Call */}
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary-purple" />
              <div>
                <div className="font-semibold text-text-dark">Call</div>
                <div className="text-text-light text-xs">01-5908733</div>
                <div className="text-text-light text-xs">+977 9851352807</div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-purple" />
              <div>
                <div className="font-semibold text-text-dark">Working Hours</div>
                <div className="text-text-light text-xs">Sun - Fri, 8am - 5pm</div>
                <div className="text-text-light text-xs">28 Putalisadak, Kathmandu 44600</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'} bg-primary-purple`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden">
              <img src="/logo1.png" alt="Bravo International" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-6 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-accent-orange transition-colors duration-200 font-medium text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg"
            >
              <nav className="flex flex-col space-y-3 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-text-dark hover:text-primary-purple transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                {/* Mobile Contact Info */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-text-light">
                    <Phone className="w-4 h-4" />
                    <div>
                      <div>015908733</div>
                      <div>9851352807</div>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
