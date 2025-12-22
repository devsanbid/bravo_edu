import { databases, ID } from './appwrite';
import { Models, Query } from 'appwrite';

// Database IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
export const SOCIAL_MEDIA_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SOCIAL_MEDIA_COLLECTION_ID || 'social_media_posts';

export type SocialMediaPlatform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';

export interface SocialMediaPost extends Models.Document {
  platform: SocialMediaPlatform;
  postUrl: string;
  caption?: string;
  addedBy: string;
  addedDate: string;
}

export const socialMediaService = {
  // Create social media post entry
  async createPost(
    platform: SocialMediaPlatform,
    postUrl: string,
    caption?: string,
    addedBy?: string
  ): Promise<SocialMediaPost> {
    try {
      const post = await databases.createDocument(
        DATABASE_ID,
        SOCIAL_MEDIA_COLLECTION_ID,
        ID.unique(),
        {
          platform,
          postUrl,
          caption,
          addedBy: addedBy || 'Admin',
          addedDate: new Date().toISOString(),
        }
      );
      return post as unknown as SocialMediaPost;
    } catch (error) {
      console.error('Error creating social media post:', error);
      throw error;
    }
  },

  // Get all social media posts
  async getAllPosts(): Promise<SocialMediaPost[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SOCIAL_MEDIA_COLLECTION_ID,
        [Query.orderDesc('addedDate'), Query.limit(100)]
      );
      return response.documents as unknown as SocialMediaPost[];
    } catch (error) {
      console.error('Error fetching social media posts:', error);
      throw error;
    }
  },

  // Get posts by platform
  async getPostsByPlatform(platform: SocialMediaPlatform): Promise<SocialMediaPost[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SOCIAL_MEDIA_COLLECTION_ID,
        [Query.equal('platform', platform), Query.orderDesc('addedDate')]
      );
      return response.documents as unknown as SocialMediaPost[];
    } catch (error) {
      console.error('Error fetching posts by platform:', error);
      throw error;
    }
  },

  // Delete post
  async deletePost(postId: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, SOCIAL_MEDIA_COLLECTION_ID, postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Extract embed URL from post URL
  getEmbedUrl(platform: SocialMediaPlatform, postUrl: string): string {
    try {
      switch (platform) {
        case 'instagram': {
          // Instagram embed: https://www.instagram.com/p/POST_ID/embed
          const match = postUrl.match(/instagram\.com\/(p|reel)\/([^/?]+)/);
          if (match) {
            return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
          }
          return postUrl;
        }
        case 'facebook': {
          // Facebook embed plugin
          return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}`;
        }
        case 'twitter': {
          // Twitter/X embed (will use oEmbed API or direct link)
          const match = postUrl.match(/(?:twitter|x)\.com\/\w+\/status\/(\d+)/);
          if (match) {
            return `https://platform.twitter.com/embed/Tweet.html?id=${match[1]}`;
          }
          return postUrl;
        }
        case 'linkedin': {
          return `https://www.linkedin.com/embed/feed/update/${encodeURIComponent(postUrl)}`;
        }
        case 'youtube': {
          // YouTube embed
          const match = postUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
          if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
          }
          return postUrl;
        }
        case 'tiktok': {
          // TikTok embed
          const match = postUrl.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
          if (match) {
            return `https://www.tiktok.com/embed/v2/${match[1]}`;
          }
          return postUrl;
        }
        default:
          return postUrl;
      }
    } catch (error) {
      console.error('Error generating embed URL:', error);
      return postUrl;
    }
  },
};
