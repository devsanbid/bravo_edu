"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2, ExternalLink, Instagram, Facebook, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { socialMediaService, SocialMediaPost, SocialMediaPlatform } from '@/lib/socialMediaService';

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Youtube, // Using Youtube icon as placeholder for TikTok
  website: Globe,
};

const platformColors = {
  instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  twitter: 'bg-sky-500',
  linkedin: 'bg-blue-700',
  youtube: 'bg-red-600',
  tiktok: 'bg-black',
  website: 'bg-gradient-to-br from-green-500 to-teal-500',
};

function AdminSocialMediaPanel() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [platform, setPlatform] = useState<SocialMediaPlatform>('instagram');
  const [postUrl, setPostUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await socialMediaService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err: any) {
      console.error('Error loading posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postUrl.trim()) {
      setError('Please enter a post URL');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await socialMediaService.createPost(
        platform,
        postUrl.trim(),
        caption.trim() || undefined,
        user?.email || 'Admin'
      );

      // Reset form
      setPostUrl('');
      setCaption('');
      setPlatform('instagram');
      
      // Reload posts
      await loadPosts();
    } catch (err: any) {
      console.error('Error adding post:', err);
      setError(err.message || 'Failed to add post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await socialMediaService.deletePost(postId);
      await loadPosts();
    } catch (err: any) {
      console.error('Error deleting post:', err);
      setError(err.message || 'Failed to delete post');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 md:p-6 lg:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                Social Media Posts
              </h1>
              <p className="text-sm md:text-base text-gray-600">Add and manage your social media content</p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs md:text-sm text-gray-500">Logged in as</p>
              <p className="text-sm md:text-base font-semibold text-gray-900 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Add Post Form */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 md:w-6 md:h-6" />
            Add New Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {(['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok', 'website'] as SocialMediaPlatform[]).map((p) => {
                  const Icon = platformIcons[p];
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        platform === p
                          ? `${platformColors[p]} text-white border-transparent`
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs font-medium capitalize">{p}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post URL *
              </label>
              <input
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="https://..."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption (optional)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption for this post..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Post...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Post
                </>
              )}
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Manage Posts</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading posts...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <Instagram className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No posts added yet</p>
              <p className="text-gray-400 text-sm mt-2">Add your first social media post above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const Icon = platformIcons[post.platform];
                return (
                  <motion.div
                    key={post.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      {/* Platform Icon */}
                      <div className={`${platformColors[post.platform]} p-3 rounded-lg flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Post Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 capitalize">{post.platform}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.addedDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <a
                          href={post.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mb-2 truncate"
                        >
                          {post.postUrl}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>

                        {post.caption && (
                          <p className="text-gray-600 text-sm">{post.caption}</p>
                        )}

                        <p className="text-xs text-gray-400 mt-2">Added by: {post.addedBy}</p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(post.$id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        title="Delete post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminSocialMediaPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminSocialMediaPanel />
      </AdminLayout>
    </ProtectedRoute>
  );
}
