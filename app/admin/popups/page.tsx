'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { popupService, Popup } from '@/lib/popupService';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, Upload, X } from 'lucide-react';
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

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Popup Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              {showForm ? <Eye className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {showForm ? 'View Popups' : 'Create Popup'}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingPopup ? 'Edit Popup' : 'Create New Popup'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Enter popup title"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Content *</label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Enter popup content"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Start Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">End Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Upload Image (Optional)</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
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
                      <label className="block text-sm font-medium text-gray-900 mb-2">Button Text (Optional)</label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Learn More"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Button Link (Optional)</label>
                      <input
                        type="text"
                        value={formData.buttonLink}
                        onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {uploading ? 'Uploading...' : editingPopup ? 'Update Popup' : 'Create Popup'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={uploading}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
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
                  <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No popups created yet</p>
                    <p className="text-gray-500 text-sm mt-2">Click "Create Popup" to get started</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {popups.map((popup) => (
                      <div
                        key={popup.$id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{popup.title}</h3>
                              {popup.isEnabled ? (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  Active
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">{popup.content}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(popup.startDate).toLocaleDateString()} - {new Date(popup.endDate).toLocaleDateString()}
                              </span>
                              {popup.buttonText && (
                                <span className="text-blue-600">Button: {popup.buttonText}</span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleToggle(popup.$id, popup.isEnabled)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title={popup.isEnabled ? 'Disable' : 'Enable'}
                            >
                              {popup.isEnabled ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            <button
                              onClick={() => handleEdit(popup)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(popup.$id, popup.imageFileId)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
