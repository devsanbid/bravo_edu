"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Instagram, Facebook, Twitter, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { socialMediaService, SocialMediaPost, SocialMediaPlatform } from '@/lib/socialMediaService';

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: Youtube,
};

const platformColors = {
  instagram: 'from-purple-500 to-pink-500',
  facebook: 'from-blue-600 to-blue-700',
  twitter: 'from-sky-400 to-sky-600',
  linkedin: 'from-blue-700 to-blue-800',
  youtube: 'from-red-600 to-red-700',
  tiktok: 'from-gray-900 to-black',
};

export default function SocialMediaPage() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform | 'all'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await socialMediaService.getAllPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err: any) {
      console.error('Error loading posts:', err);
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform);

  const platformCounts = posts.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative max-w-7xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Follow Our Journey
              </h1>
              <p className="text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                Stay connected with us across social media platforms
              </p>
            </motion.div>
          </div>
        </section>

        {/* Platform Filter */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedPlatform === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Posts ({posts.length})
              </button>
              
              {(['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok'] as SocialMediaPlatform[]).map((platform) => {
                const Icon = platformIcons[platform];
                const count = platformCounts[platform] || 0;
                
                if (count === 0) return null;
                
                return (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      selectedPlatform === platform
                        ? `bg-gradient-to-r ${platformColors[platform]} text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="capitalize">{platform}</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading posts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={loadPosts}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <Instagram className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {selectedPlatform === 'all' ? 'No posts yet' : `No ${selectedPlatform} posts yet`}
            </h3>
            <p className="text-gray-500">Check back soon for updates!</p>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => {
                const Icon = platformIcons[post.platform];
                const embedUrl = socialMediaService.getEmbedUrl(post.platform, post.postUrl);
                
                return (
                  <motion.div
                    key={post.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Platform Header */}
                    <div className={`bg-gradient-to-r ${platformColors[post.platform]} p-4 flex items-center gap-3`}>
                      <Icon className="w-6 h-6 text-white" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white capitalize">{post.platform}</h3>
                        <p className="text-sm text-white/80">
                          {new Date(post.addedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      {post.caption && (
                        <p className="text-gray-700 mb-4">{post.caption}</p>
                      )}

                      {/* Embed Preview or Card */}
                      {post.platform === 'facebook' || post.platform === 'linkedin' ? (
                        // Facebook and LinkedIn: Show card with link (embeds often fail)
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 text-center border-2 border-gray-200">
                          <Icon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                          <p className="text-gray-600 mb-4">Click below to view this post</p>
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-gradient-to-r ${platformColors[post.platform]} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all`}
                          >
                            View on {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ) : (
                        // Other platforms: Try to embed
                        <>
                          <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '100%' }}>
                            <iframe
                              src={embedUrl}
                              className="absolute inset-0 w-full h-full"
                              frameBorder="0"
                              scrolling="no"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 w-full bg-gradient-to-r ${platformColors[post.platform]} text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                          >
                            View on {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
