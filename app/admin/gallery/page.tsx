"use client"

import { useState, useCallback, useEffect } from 'react';

// Disable caching for this page
export const dynamic = 'force-dynamic';

import { useAuth } from '@/contexts/AuthContext';
import { Upload, X, Image as ImageIcon, Loader2, Check, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService } from '@/lib/galleryService';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import Image from 'next/image';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  title: string;
  description: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

function AdminGalleryContent() {
  const { user } = useAuth();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [loadingUploaded, setLoadingUploaded] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Load already uploaded images
  useEffect(() => {
    loadUploadedImages();
  }, []);

  const loadUploadedImages = async () => {
    try {
      setLoadingUploaded(true);
      const data = await galleryService.getAllImages();
      setUploadedImages(data);
    } catch (error) {
      console.error('Error loading uploaded images:', error);
    } finally {
      setLoadingUploaded(false);
    }
  };

  const handleDeleteUploaded = async (imageId: string, fileId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await galleryService.deleteImage(imageId, fileId);
      await loadUploadedImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        title: '',
        description: '',
        status: 'pending' as const,
      }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter(img => img.id !== id);
    });
  };

  const updateImage = (id: string, updates: Partial<UploadedImage>) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, ...updates } : img));
  };

  const uploadImage = async (image: UploadedImage) => {
    try {
      updateImage(image.id, { status: 'uploading' });
      
      await galleryService.uploadComplete(
        image.file,
        image.title || undefined,
        image.description || undefined,
        user?.name || user?.email || 'Admin'
      );
      
      updateImage(image.id, { status: 'success' });
      // Reload uploaded images list
      await loadUploadedImages();
    } catch (error: any) {
      console.error('Upload error:', error);
      updateImage(image.id, { 
        status: 'error', 
        error: error.message || 'Upload failed' 
      });
    }
  };

  const uploadAll = async () => {
    const pendingImages = images.filter(img => img.status === 'pending');
    for (const image of pendingImages) {
      await uploadImage(image);
    }
  };

  const clearSuccessful = () => {
    setImages(prev => {
      prev.filter(img => img.status === 'success').forEach(img => URL.revokeObjectURL(img.preview));
      return prev.filter(img => img.status !== 'success');
    });
  };

  // Show loading state while fetching initial data
  if (loadingUploaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-auto">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Gallery Management</h1>
          <p className="text-sm md:text-base text-gray-600">Upload and manage gallery images</p>
        </div>
        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-6 md:p-8 lg:p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-blue-400'
          }`}
        >
          <Upload className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            {isDragging ? 'Drop images here' : 'Upload Images'}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Drag and drop images or click to browse
          </p>
          <label className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm md:text-base">
            <Upload className="w-4 h-4 md:w-5 md:h-5" />
            <span>Select Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </label>
        </div>

        {/* Images List */}
        {images.length > 0 && (
          <div className="mt-6 md:mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Selected Images ({images.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={clearSuccessful}
                  disabled={!images.some(img => img.status === 'success')}
                  className="flex-1 sm:flex-none px-3 py-2 md:px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Uploaded
                </button>
                <button
                  onClick={uploadAll}
                  disabled={!images.some(img => img.status === 'pending')}
                  className="flex-1 sm:flex-none px-4 py-2 md:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              <AnimatePresence>
                {images.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Image Preview */}
                      <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image.preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        {/* Status Overlay */}
                        {image.status !== 'pending' && (
                          <div className={`absolute inset-0 flex items-center justify-center ${
                            image.status === 'uploading' ? 'bg-blue-500/80' :
                            image.status === 'success' ? 'bg-green-500/80' :
                            'bg-red-500/80'
                          }`}>
                            {image.status === 'uploading' && <Loader2 className="w-8 h-8 text-white animate-spin" />}
                            {image.status === 'success' && <Check className="w-8 h-8 text-white" />}
                            {image.status === 'error' && <AlertCircle className="w-8 h-8 text-white" />}
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Image title (optional)"
                          value={image.title}
                          onChange={(e) => updateImage(image.id, { title: e.target.value })}
                          disabled={image.status !== 'pending'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-black"
                        />
                        <textarea
                          placeholder="Description (optional)"
                          value={image.description}
                          onChange={(e) => updateImage(image.id, { description: e.target.value })}
                          disabled={image.status !== 'pending'}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 resize-none text-black"
                        />
                        {image.error && (
                          <p className="text-red-600 text-xs mt-1">{image.error}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {image.status === 'pending' && (
                          <>
                            <button
                              onClick={() => uploadImage(image)}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                              title="Upload"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {image.status === 'success' && (
                          <button
                            onClick={() => removeImage(image.id)}
                            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                            title="Clear"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Uploaded Images Section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Uploaded Images</h2>
          
          {loadingUploaded ? (
            <div className="flex items-center justify-center py-12 bg-white rounded-xl">
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-sm md:text-base text-gray-600">Loading images...</span>
            </div>
          ) : uploadedImages.length === 0 ? (
            <div className="bg-white rounded-xl p-8 md:p-12 text-center">
              <ImageIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-sm md:text-base text-gray-500">No images uploaded yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {uploadedImages.map((img) => (
                <motion.div
                  key={img.$id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={img.fileUrl}
                      alt={img.title || 'Gallery image'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    {img.title && (
                      <h3 className="font-semibold text-gray-900 mb-1">{img.title}</h3>
                    )}
                    {img.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{img.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">
                        {new Date(img.uploadDate).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDeleteUploaded(img.$id, img.fileId)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminGallery() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminGalleryContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
