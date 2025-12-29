'use client';

import { useState, useEffect } from 'react';

// Disable caching for this page
export const dynamic = 'force-dynamic';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { testimonialService, Testimonial } from '@/lib/testimonialService';
import { Save, Upload, X, Trash2, Loader2, Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <TestimonialsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function TestimonialsContent() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to load testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!editingTestimonial || !editingTestimonial.name || !editingTestimonial.quote) {
      alert('Name and quote are required');
      return;
    }

    try {
      setSaving(true);
      let updateData = { ...editingTestimonial };

      // Upload image if changed
      if (imageFile) {
        // Delete old image if exists
        if (editingTestimonial.imageFileId) {
          await testimonialService.deleteImage(editingTestimonial.imageFileId);
        }
        const { fileId, fileName } = await testimonialService.uploadImage(imageFile);
        updateData.imageFileId = fileId;
        updateData.imageFileName = fileName;
      }

      // Upload video if changed
      if (videoFile) {
        // Delete old video if exists
        if (editingTestimonial.videoFileId) {
          await testimonialService.deleteImage(editingTestimonial.videoFileId);
        }
        const { fileId, fileName } = await testimonialService.uploadVideo(videoFile);
        updateData.videoFileId = fileId;
        updateData.videoFileName = fileName;
      }

      if (editingTestimonial.$id) {
        // Update existing
        await testimonialService.updateTestimonial(editingTestimonial.$id, updateData);
      } else {
        // Create new
        await testimonialService.createTestimonial(updateData);
      }

      alert('Testimonial saved successfully!');
      setEditingTestimonial(null);
      setImageFile(null);
      setImagePreview(null);
      setVideoFile(null);
      setVideoPreview(null);
      loadTestimonials();
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      alert('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm(`Delete testimonial from ${testimonial.name}?`)) return;

    try {
      // Delete image if exists
      if (testimonial.imageFileId) {
        await testimonialService.deleteImage(testimonial.imageFileId);
      }
      // Delete video if exists
      if (testimonial.videoFileId) {
        await testimonialService.deleteImage(testimonial.videoFileId);
      }
      await testimonialService.deleteTestimonial(testimonial.$id);
      alert('Testimonial deleted successfully!');
      loadTestimonials();
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setImagePreview(testimonial.imageFileName ? testimonialService.getImageUrl(testimonial.imageFileName) : null);
    setVideoPreview(testimonial.videoFileName ? testimonialService.getVideoUrl(testimonial.videoFileName) : null);
    setImageFile(null);
    setVideoFile(null);
  };

  const handleCancel = () => {
    setEditingTestimonial(null);
    setImageFile(null);
    setImagePreview(null);
    setVideoFile(null);
    setVideoPreview(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Quote className="w-8 h-8 text-blue-600" />
            Testimonials
          </h1>
          <p className="text-gray-600 mt-2">Manage student testimonials</p>
        </div>
        {!editingTestimonial && (
          <button
            onClick={() => setEditingTestimonial({ name: '', quote: '', rating: 5, order: 0 })}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Quote className="w-5 h-5" />
            Add Testimonial
          </button>
        )}
      </div>

      {editingTestimonial ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingTestimonial.$id ? 'Edit Testimonial' : 'Add Testimonial'}
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={editingTestimonial.name || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Student Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <input
                  type="text"
                  value={editingTestimonial.college || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, college: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editingTestimonial.location || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                <input
                  type="text"
                  value={editingTestimonial.program || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, program: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={editingTestimonial.year || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, year: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                    className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= (editingTestimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={editingTestimonial.order || 0}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote *</label>
              <textarea
                value={editingTestimonial.quote || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Their experience and testimonial..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {imagePreview ? 'Change Photo' : 'Upload Photo'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Testimonial</label>
              <div className="flex items-center gap-4">
                {videoPreview && (
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                    <video
                      src={videoPreview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {videoPreview ? 'Change Video' : 'Upload Video'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoChange}
                  />
                </label>
                {videoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreview(null);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? 'Saving...' : 'Save Testimonial'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.$id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {testimonial.imageFileName && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonialService.getImageUrl(testimonial.imageFileName)}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  {testimonial.college && <p className="text-sm text-gray-600">{testimonial.college}</p>}
                  {testimonial.program && <p className="text-sm text-blue-600">{testimonial.program}</p>}
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              {(testimonial.location || testimonial.year) && (
                <p className="text-sm text-gray-500 mb-4">
                  {testimonial.location} {testimonial.year && `• ${testimonial.year}`}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!editingTestimonial && testimonials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Quote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No testimonials yet. Add your first testimonial!</p>
        </div>
      )}
    </div>
  );
}
