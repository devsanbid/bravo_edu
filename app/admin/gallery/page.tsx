"use client"

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Upload, X, Image as ImageIcon, Loader2, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryService } from '@/lib/galleryService';
import ProtectedRoute from '@/components/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';

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
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/chat"
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gallery Upload</h1>
                  <p className="text-sm text-gray-500">Manage gallery images</p>
                </div>
              </div>
            </div>
            <Link
              href="/gallery"
              target="_blank"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-blue-400'
          }`}
        >
          <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isDragging ? 'Drop images here' : 'Upload Images'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop images or click to browse
          </p>
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
            <Upload className="w-5 h-5" />
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
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Selected Images ({images.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={clearSuccessful}
                  disabled={!images.some(img => img.status === 'success')}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Uploaded
                </button>
                <button
                  onClick={uploadAll}
                  disabled={!images.some(img => img.status === 'pending')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}

export default function AdminGallery() {
  return (
    <ProtectedRoute>
      <AdminGalleryContent />
    </ProtectedRoute>
  );
}
