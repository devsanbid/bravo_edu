'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { announcementService, Announcement } from '@/lib/announcementService';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Megaphone, AlertCircle, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'all' | 'active' | 'expired' | 'general' | 'urgent' | 'event' | 'scholarship';

export default function AdminAnnouncementsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AnnouncementsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function AnnouncementsContent() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general' as 'general' | 'urgent' | 'event' | 'scholarship',
    expiryDate: '',
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState<{ title?: string; content?: string; category?: string }>({});

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to load announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: { title?: string; content?: string; category?: string } = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const data = {
        ...formData,
        expiryDate: formData.expiryDate || undefined,
      };

      if (editingId) {
        await announcementService.updateAnnouncement(editingId, data);
      } else {
        await announcementService.createAnnouncement(data);
      }

      resetForm();
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to save announcement:', error);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.$id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      expiryDate: announcement.expiryDate || '',
      isActive: announcement.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      await announcementService.deleteAnnouncement(id);
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to delete announcement:', error);
    }
  };

  const toggleActive = async (announcement: Announcement) => {
    try {
      await announcementService.updateAnnouncement(announcement.$id, {
        isActive: !announcement.isActive,
      });
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to toggle announcement status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general',
      expiryDate: '',
      isActive: true,
    });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const now = new Date();
    const isExpired = announcement.expiryDate && new Date(announcement.expiryDate) < now;

    if (filter === 'all') return true;
    if (filter === 'active') return announcement.isActive && !isExpired;
    if (filter === 'expired') return isExpired;
    return announcement.category === filter;
  });

  const stats = {
    total: announcements.length,
    active: announcements.filter(a => {
      const isExpired = a.expiryDate && new Date(a.expiryDate) < new Date();
      return a.isActive && !isExpired;
    }).length,
    expired: announcements.filter(a => a.expiryDate && new Date(a.expiryDate) < new Date()).length,
    urgent: announcements.filter(a => a.category === 'urgent').length,
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800 border-blue-300',
      urgent: 'bg-red-100 text-red-800 border-red-300',
      event: 'bg-purple-100 text-purple-800 border-purple-300',
      scholarship: 'bg-green-100 text-green-800 border-green-300',
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      general: Megaphone,
      urgent: AlertCircle,
      event: Calendar,
      scholarship: Trophy,
    };
    const Icon = icons[category as keyof typeof icons] || Megaphone;
    return <Icon className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements Management</h1>
        <p className="text-gray-600">Create and manage website announcements</p>
      </div>

      {/* Toggle Button */}
      <div className="mb-6">
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          {showForm ? 'View Announcements' : 'Create Announcement'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Create/Edit Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                      formErrors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter announcement title"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                      formErrors.content ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter announcement content"
                  />
                  {formErrors.content && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                      formErrors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Event</option>
                    <option value="scholarship">Scholarship</option>
                  </select>
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                {/* Is Active */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm font-medium text-gray-700">
                    Publish this announcement
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
                  >
                    {editingId ? 'Update Announcement' : 'Create Announcement'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Announcements</p>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                  </div>
                  <Megaphone className="w-12 h-12 text-blue-200" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Active</p>
                    <p className="text-3xl font-bold mt-2">{stats.active}</p>
                  </div>
                  <Eye className="w-12 h-12 text-green-200" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-100 text-sm font-medium">Expired</p>
                    <p className="text-3xl font-bold mt-2">{stats.expired}</p>
                  </div>
                  <Calendar className="w-12 h-12 text-gray-200" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Urgent</p>
                    <p className="text-3xl font-bold mt-2">{stats.urgent}</p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-red-200" />
                </div>
              </motion.div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'active'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('expired')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'expired'
                    ? 'bg-gray-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expired
              </button>
              <button
                onClick={() => setFilter('general')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'general'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setFilter('urgent')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'urgent'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Urgent
              </button>
              <button
                onClick={() => setFilter('event')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'event'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Event
              </button>
              <button
                onClick={() => setFilter('scholarship')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'scholarship'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Scholarship
              </button>
            </div>

            {/* Announcements List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredAnnouncements.map((announcement) => {
                  const isExpired = announcement.expiryDate && new Date(announcement.expiryDate) < new Date();
                  
                  return (
                    <motion.div
                      key={announcement.$id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900 flex-1">{announcement.title}</h3>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => toggleActive(announcement)}
                              className={`p-2 rounded-lg transition-colors duration-200 ${
                                announcement.isActive
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                              title={announcement.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {announcement.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleEdit(announcement)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(announcement.$id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(announcement.category)}`}>
                            {getCategoryIcon(announcement.category)}
                            {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            announcement.isActive && !isExpired
                              ? 'bg-green-100 text-green-800 border border-green-300'
                              : 'bg-gray-100 text-gray-800 border border-gray-300'
                          }`}>
                            {announcement.isActive && !isExpired ? 'Active' : 'Inactive'}
                          </span>
                          {isExpired && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                              Expired
                            </span>
                          )}
                        </div>

                        {/* Content Preview */}
                        <p className="text-gray-600 mb-4 line-clamp-2">{announcement.content}</p>

                        {/* Dates */}
                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Published: {new Date(announcement.publishedDate).toLocaleDateString()}</span>
                          </div>
                          {announcement.expiryDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                                Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No announcements found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
