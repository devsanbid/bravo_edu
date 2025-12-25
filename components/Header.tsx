'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail, Clock, MapPin, Copy } from 'lucide-react';
import Link from 'next/link';
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings';
import { websiteService } from '@/lib/websiteService';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Study Abroad', href: '/#destinations' },
    { name: 'Services', href: '/#services' },
    { name: 'Test Preparation', href: '/#test-prep' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Announcements', href: '/announcements' },
    { name: 'Testimonials', href: '/#testimonials' },
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
                {settings?.logoFileId ? (
                  <img 
                    src={websiteService.getImageUrl(settings.logoFileId)} 
                    alt={settings.siteTitle || "Bravo International"} 
                    className="h-16 w-auto object-contain" 
                  />
                ) : (
                  <img src="/logo1.png" alt="Bravo International" className="h-16 w-auto object-contain" />
                )}
              </Link>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary-purple" />
              <div className="flex-1">
                <div className="font-semibold text-text-dark">Email</div>
                <div className="space-y-0.5">
                  <div 
                    className="text-text-light text-xs flex items-center gap-1 cursor-pointer hover:text-primary-purple transition-colors group"
                    onClick={() => copyToClipboard(settings?.headerEmail || 'info@bravointernational.edu.np')}
                  >
                    <a href={`mailto:${settings?.headerEmail || 'info@bravointernational.edu.np'}`} className="hover:underline">
                      {settings?.headerEmail || 'info@bravointernational.edu.np'}
                    </a>
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {copiedText === (settings?.headerEmail || 'info@bravointernational.edu.np') && (
                      <span className="text-green-600 text-[10px]">✓</span>
                    )}
                  </div>
                  {settings?.headerEmail2 && (
                    <div 
                      className="text-text-light text-xs flex items-center gap-1 cursor-pointer hover:text-primary-purple transition-colors group"
                      onClick={() => copyToClipboard(settings.headerEmail2)}
                    >
                      <a href={`mailto:${settings.headerEmail2}`} className="hover:underline">
                        {settings.headerEmail2}
                      </a>
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {copiedText === settings.headerEmail2 && (
                        <span className="text-green-600 text-[10px]">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Call */}
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary-purple" />
              <div className="flex-1">
                <div className="font-semibold text-text-dark">Call</div>
                <div className="space-y-0.5">
                  <div 
                    className="text-text-light text-xs flex items-center gap-1 cursor-pointer hover:text-primary-purple transition-colors group"
                    onClick={() => copyToClipboard(settings?.headerPhone || '01-5908733')}
                  >
                    <a href={`tel:${settings?.headerPhone || '01-5908733'}`} className="hover:underline">
                      {settings?.headerPhone || '01-5908733'}
                    </a>
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {copiedText === (settings?.headerPhone || '01-5908733') && (
                      <span className="text-green-600 text-[10px]">✓</span>
                    )}
                  </div>
                  {settings?.headerPhone2 && (
                    <div 
                      className="text-text-light text-xs flex items-center gap-1 cursor-pointer hover:text-primary-purple transition-colors group"
                      onClick={() => copyToClipboard(settings.headerPhone2)}
                    >
                      <a href={`tel:${settings.headerPhone2}`} className="hover:underline">
                        {settings.headerPhone2}
                      </a>
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {copiedText === settings.headerPhone2 && (
                        <span className="text-green-600 text-[10px]">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Working Hours / Address */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary-purple" />
              <div className="flex-1">
                <div className="font-semibold text-text-dark">Location</div>
                <div className="space-y-0.5">
                  <div className="text-text-light text-xs">{settings?.headerAddress || '28 Putalisadak, Kathmandu 44600'}</div>
                  <div className="text-text-light text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {settings?.headerWorkingHours || 'Sun - Fri, 8am - 5pm'}
                  </div>
                </div>
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
