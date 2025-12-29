'use client';

import { useState, useEffect } from 'react';

// Disable caching for this page
export const dynamic = 'force-dynamic';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { popupService, Popup } from '@/lib/popupService';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Upload, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    isEnabled: true,
    imageFileId: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
  });

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const data = await popupService.getAllPopups();
      setPopups(data);
    } catch (error) {
      console.error('Error fetching popups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageFileId = formData.imageFileId;
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const { fileId, url } = await popupService.uploadImage(imageFile);
        imageFileId = fileId;
        imageUrl = url;

        // Delete old image if editing
        if (editingPopup?.imageFileId) {
          await popupService.deleteImage(editingPopup.imageFileId);
        }
      }

      const popupData = {
        ...formData,
        imageFileId,
        imageUrl,
      };

      if (editingPopup) {
        await popupService.updatePopup(editingPopup.$id, popupData);
      } else {
        await popupService.createPopup(popupData);
      }
      fetchPopups();
      resetForm();
    } catch (error) {
      console.error('Error saving popup:', error);
      alert('Failed to save popup');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageFileId?: string) => {
    if (!confirm('Are you sure you want to delete this popup?')) return;
    try {
      await popupService.deletePopup(id, imageFileId);
      fetchPopups();
    } catch (error) {
      console.error('Error deleting popup:', error);
      alert('Failed to delete popup');
    }
  };

  const handleToggle = async (id: string, isEnabled: boolean) => {
    try {
      await popupService.togglePopup(id, !isEnabled);
      fetchPopups();
    } catch (error) {
      console.error('Error toggling popup:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      isEnabled: true,
      imageFileId: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
    });
    setImageFile(null);
    setEditingPopup(null);
    setShowForm(false);
  };

  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      content: popup.content,
      startDate: popup.startDate.split('T')[0],
      endDate: popup.endDate.split('T')[0],
      isEnabled: popup.isEnabled,
      imageFileId: popup.imageFileId || '',
      imageUrl: popup.imageUrl || '',
      buttonText: popup.buttonText || '',
      buttonLink: popup.buttonLink || '',
    });
    setImageFile(null);
    setShowForm(true);
  };

  // Show loading state while fetching initial data
  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading popups...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
          {/* Centered Container */}
          <div className="max-w-6xl mx-auto">
          {/* Modern Header with Gradient */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Popup Management
                </h1>
                <p className="text-gray-600 text-sm md:text-base">Create and manage engaging popups for your visitors</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-sm md:text-base font-semibold"
              >
                {showForm ? <Eye className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {showForm ? 'View Popups' : 'Create Popup'}
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8 mb-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    {editingPopup ? <Edit2 className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{editingPopup ? 'Edit Popup' : 'Create New Popup'}</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                        placeholder="Enter popup title"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={5}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                        placeholder="Enter popup content"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image (Optional)</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 bg-gradient-to-br from-gray-50 to-blue-50/30">
                            {imageFile || formData.imageUrl ? (
                              <div className="space-y-2">
                                {imageFile ? (
                                  <div className="flex items-center justify-center gap-2 text-blue-600">
                                    <Upload className="w-5 h-5" />
                                    <span className="font-medium">{imageFile.name}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-2 text-green-600">
                                    <Upload className="w-5 h-5" />
                                    <span className="font-medium">Current image uploaded</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Click to upload image</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setImageFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                        {(imageFile || formData.imageUrl) && (
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setFormData({ ...formData, imageUrl: '', imageFileId: '' });
                            }}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text (Optional)</label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                        placeholder="Learn More"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link (Optional)</label>
                      <input
                        type="text"
                        value={formData.buttonLink}
                        onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                        className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200 hover:border-gray-300 bg-white/50 backdrop-blur"
                        placeholder="/#consultation"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.isEnabled}
                          onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-900">Enable this popup</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 font-semibold"
                    >
                      {uploading ? 'Uploading...' : editingPopup ? 'Update Popup' : 'Create Popup'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={resetForm}
                      disabled={uploading}
                      className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl transition-all duration-300 disabled:opacity-50 font-semibold border-2 border-gray-200 hover:border-gray-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : popups.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-12 h-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No popups created yet</h3>
                    <p className="text-gray-600 mb-6">Click "Create Popup" to engage your visitors</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Create Your First Popup
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="grid gap-6">
                    {popups.map((popup, index) => (
                      <motion.div
                        key={popup.$id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 group"
                      >
                        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{popup.title}</h3>
                              {popup.isEnabled ? (
                                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-green-500/30 flex items-center gap-1">
                                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                  Active
                                </span>
                              ) : (
                                <span className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-bold">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">{popup.content}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">{new Date(popup.startDate).toLocaleDateString()} - {new Date(popup.endDate).toLocaleDateString()}</span>
                              </span>
                              {popup.buttonText && (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium">Button: {popup.buttonText}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex lg:flex-col gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleToggle(popup.$id, popup.isEnabled)}
                              className="p-3 text-gray-600 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-gray-300"
                              title={popup.isEnabled ? 'Disable' : 'Enable'}
                            >
                              {popup.isEnabled ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(popup)}
                              className="p-3 text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-blue-300"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(popup.$id, popup.imageFileId)}
                              className="p-3 text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-red-300"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          {/* End Centered Container */}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
