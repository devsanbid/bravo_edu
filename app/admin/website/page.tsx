'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { websiteService, WebsiteSettings } from '@/lib/websiteService';
import { Image as ImageIcon, Save, Upload, X, Globe, FileText, Mail, Phone, MapPin, Loader2, Settings as SettingsIcon, Facebook, Instagram, Twitter, Linkedin, Youtube, Quote, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WebsiteSettingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <WebsiteSettingsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function WebsiteSettingsContent() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'logo' | 'hero' | 'director' | 'header' | 'footer'>('seo');
  
  const [formData, setFormData] = useState({
    // SEO
    siteTitle: '',
    siteDescription: '',
    siteKeywords: '',
    
    // Header
    headerPhone: '',
    headerPhone2: '',
    headerEmail: '',
    headerEmail2: '',
    headerAddress: '',
    headerWorkingHours: '',
    
    // Hero
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroImageSize: 'large' as 'small' | 'medium' | 'large' | 'full',
    
    // Director
    directorName: '',
    directorTitle: '',
    directorMessage: '',
    
    // Footer
    footerDescription: '',
    footerPhone: '',
    footerEmail: '',
    footerAddress: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    footerCopyright: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [directorImageFile, setDirectorImageFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [directorPreview, setDirectorPreview] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await websiteService.getOrCreateSettings();
      setSettings(data);
      
      setFormData({
        siteTitle: data.siteTitle || '',
        siteDescription: data.siteDescription || '',
        siteKeywords: data.siteKeywords || '',
        headerPhone: data.headerPhone || '',
        headerPhone2: data.headerPhone2 || '',
        headerEmail: data.headerEmail || '',
        headerEmail2: data.headerEmail2 || '',
        headerAddress: data.headerAddress || '',
        headerWorkingHours: data.headerWorkingHours || '',
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        heroDescription: data.heroDescription || '',
        heroImageSize: data.heroImageSize || 'large',
        directorName: data.directorName || '',
        directorTitle: data.directorTitle || '',
        directorMessage: data.directorMessage || '',
        footerDescription: data.footerDescription || '',
        footerPhone: data.footerPhone || '',
        footerEmail: data.footerEmail || '',
        footerAddress: data.footerAddress || '',
        facebookUrl: data.facebookUrl || '',
        instagramUrl: data.instagramUrl || '',
        twitterUrl: data.twitterUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        youtubeUrl: data.youtubeUrl || '',
        footerCopyright: data.footerCopyright || '',
      });

      if (data.logoFileId) {
        setLogoPreview(websiteService.getImageUrl(data.logoFileId));
      }
      if (data.heroImageFileId) {
        setHeroPreview(websiteService.getImageUrl(data.heroImageFileId));
      }
      if (data.directorImageFileId) {
        setDirectorPreview(websiteService.getImageUrl(data.directorImageFileId));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'hero' | 'director') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'logo') {
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
      } else if (type === 'hero') {
        setHeroImageFile(file);
        setHeroPreview(URL.createObjectURL(file));
      } else if (type === 'director') {
        setDirectorImageFile(file);
        setDirectorPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleRemoveImage = (type: 'logo' | 'hero' | 'director') => {
    if (type === 'logo') {
      setLogoFile(null);
      setLogoPreview(null);
    } else if (type === 'hero') {
      setHeroImageFile(null);
      setHeroPreview(null);
    } else if (type === 'director') {
      setDirectorImageFile(null);
      setDirectorPreview(null);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      let updateData: any = { ...formData };

      // Upload new logo if changed
      if (logoFile) {
        if (settings.logoFileId) {
          await websiteService.deleteImage(settings.logoFileId);
        }
        const { fileId, fileName } = await websiteService.uploadImage(logoFile);
        updateData.logoFileId = fileId;
        updateData.logoFileName = fileName;
      }

      // Upload new hero image if changed
      if (heroImageFile) {
        if (settings.heroImageFileId) {
          await websiteService.deleteImage(settings.heroImageFileId);
        }
        const { fileId, fileName } = await websiteService.uploadImage(heroImageFile);
        updateData.heroImageFileId = fileId;
        updateData.heroImageFileName = fileName;
      }

      // Upload new director image if changed
      if (directorImageFile) {
        if (settings.directorImageFileId) {
          await websiteService.deleteImage(settings.directorImageFileId);
        }
        const { fileId, fileName } = await websiteService.uploadImage(directorImageFile);
        updateData.directorImageFileId = fileId;
        updateData.directorImageFileName = fileName;
      }

      await websiteService.updateSettings(settings.$id, updateData);
      alert('Settings saved successfully!');
      loadSettings();
      setLogoFile(null);
      setHeroImageFile(null);
      setDirectorImageFile(null);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'seo', label: 'SEO & Meta', icon: Globe },
    { id: 'logo', label: 'Logo', icon: ImageIcon },
    { id: 'header', label: 'Header', icon: Mail },
    { id: 'hero', label: 'Hero Section', icon: ImageIcon },
    { id: 'director', label: 'Director Message', icon: Quote },
    { id: 'footer', label: 'Footer', icon: MapPin },
  ];

  const imageSizes = [
    { value: 'small', label: 'Small', width: '300px' },
    { value: 'medium', label: 'Medium', width: '500px' },
    { value: 'large', label: 'Large', width: '800px' },
    { value: 'full', label: 'Full Width', width: '100%' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Website Settings
            </h1>
            <p className="text-gray-600">Manage your website content, SEO, and appearance</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SEO & Meta Information</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Site Title *
              </label>
              <input
                type="text"
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Bravo Educational Consultancy"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description *
              </label>
              <textarea
                value={formData.siteDescription}
                onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={3}
                placeholder="Brief description for search engines..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.siteKeywords}
                onChange={(e) => setFormData({ ...formData, siteKeywords: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="study abroad, education, consultancy"
              />
            </div>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Website Logo</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Logo
              </label>
              <div className="flex flex-col items-center gap-4">
                {logoPreview && (
                  <div className="relative">
                    <img src={logoPreview} alt="Logo" className="h-32 object-contain" />
                    <button
                      onClick={() => handleRemoveImage('logo')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'logo')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Header Tab */}
        {activeTab === 'header' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Header / Navbar Contact Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number 1 *
                </label>
                <input
                  type="text"
                  value={formData.headerPhone}
                  onChange={(e) => setFormData({ ...formData, headerPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="+977 9851352807"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number 2
                </label>
                <input
                  type="text"
                  value={formData.headerPhone2}
                  onChange={(e) => setFormData({ ...formData, headerPhone2: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="01-5908733"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address 1 *
                </label>
                <input
                  type="email"
                  value={formData.headerEmail}
                  onChange={(e) => setFormData({ ...formData, headerEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="info@bravo.edu.np"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address 2
                </label>
                <input
                  type="email"
                  value={formData.headerEmail2}
                  onChange={(e) => setFormData({ ...formData, headerEmail2: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="contact@bravo.edu.np"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                value={formData.headerAddress}
                onChange={(e) => setFormData({ ...formData, headerAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Putalisadak, Kathmandu"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Working Hours
              </label>
              <input
                type="text"
                value={formData.headerWorkingHours}
                onChange={(e) => setFormData({ ...formData, headerWorkingHours: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Sun - Fri, 8am - 5pm"
              />
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hero Section</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Title *
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Your Journey to Global Education"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={2}
                placeholder="Expert guidance for studying abroad"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Description
              </label>
              <textarea
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={3}
                placeholder="Your trusted partner for studying in UK, USA, and Canada..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Image
              </label>
              <div className="flex flex-col gap-4">
                {heroPreview && (
                  <div className="relative inline-block">
                    <img src={heroPreview} alt="Hero" className="max-h-64 rounded-lg" />
                    <button
                      onClick={() => handleRemoveImage('hero')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2 w-fit">
                  <Upload className="w-5 h-5" />
                  {heroPreview ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'hero')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image Display Size
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {imageSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setFormData({ ...formData, heroImageSize: size.value as any })}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      formData.heroImageSize === size.value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Director Message Tab */}
        {activeTab === 'director' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Director's Message</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Director Photo (Avatar Style)
              </label>
              <div className="flex flex-col gap-4">
                {directorPreview && (
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/20">
                      <img src={directorPreview} alt="Director" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => handleRemoveImage('director')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2 w-fit">
                  <Upload className="w-5 h-5" />
                  {directorPreview ? 'Change Photo' : 'Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'director')}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500">Recommended: Square image (1:1 ratio) for best circular display</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Director Name *
                </label>
                <input
                  type="text"
                  value={formData.directorName}
                  onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Director Title
                </label>
                <input
                  type="text"
                  value={formData.directorTitle}
                  onChange={(e) => setFormData({ ...formData, directorTitle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Founder & CEO"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Director's Message *
              </label>
              <textarea
                value={formData.directorMessage}
                onChange={(e) => setFormData({ ...formData, directorMessage: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={6}
                placeholder="Write a welcoming message from the director..."
              />
              <p className="text-sm text-gray-500 mt-2">This message will be displayed prominently on the landing page</p>
            </div>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === 'footer' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Footer Content</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Footer Description
              </label>
              <textarea
                value={formData.footerDescription}
                onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={3}
                placeholder="Brief description in footer..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Footer Phone
                </label>
                <input
                  type="text"
                  value={formData.footerPhone}
                  onChange={(e) => setFormData({ ...formData, footerPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="+977 9851352807"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Footer Email
                </label>
                <input
                  type="email"
                  value={formData.footerEmail}
                  onChange={(e) => setFormData({ ...formData, footerEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="info@bravo.edu.np"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Footer Address
              </label>
              <input
                type="text"
                value={formData.footerAddress}
                onChange={(e) => setFormData({ ...formData, footerAddress: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Putalisadak, Kathmandu, Nepal"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Facebook className="w-4 h-4 inline mr-2" />
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Twitter className="w-4 h-4 inline mr-2" />
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    value={formData.twitterUrl}
                    onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Linkedin className="w-4 h-4 inline mr-2" />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="https://linkedin.com/company/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Youtube className="w-4 h-4 inline mr-2" />
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="https://youtube.com/@yourchannel"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={formData.footerCopyright}
                onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="© 2025 Bravo Educational Consultancy. All rights reserved."
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
