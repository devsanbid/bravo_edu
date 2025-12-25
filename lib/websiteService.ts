import { databases, storage, ID } from './appwrite';
import { Models, Query } from 'appwrite';

// Database and Collection IDs
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
const SETTINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WEBSITE_SETTINGS_COLLECTION_ID || 'website_settings';
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '69493301002498decf98';

export interface WebsiteSettings extends Models.Document {
  // Logo
  logoFileId?: string;
  logoFileName?: string;
  
  // SEO
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  ogImage?: string;
  
  // Header/Navbar
  headerPhone: string;
  headerPhone2?: string;
  headerEmail: string;
  headerEmail2?: string;
  headerAddress: string;
  headerWorkingHours?: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription?: string;
  heroImageFileId?: string;
  heroImageFileName?: string;
  heroImageSize: 'small' | 'medium' | 'large' | 'full';
  
  // About Section
  aboutTitle: string;
  aboutDescription: string;
  aboutImageFileId?: string;
  aboutImageFileName?: string;
  aboutImageSize: 'small' | 'medium' | 'large' | 'full';
  
  // Director Section
  directorName?: string;
  directorTitle?: string;
  directorMessage?: string;
  directorImageFileId?: string;
  directorImageFileName?: string;
  
  // Footer
  footerDescription: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  footerCopyright: string;
  
  updatedAt: string;
}

export const websiteService = {
  // Get website settings (there should only be one document)
  async getSettings(): Promise<WebsiteSettings | null> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        SETTINGS_COLLECTION_ID,
        [Query.limit(1)]
      );
      
      if (response.documents.length > 0) {
        return response.documents[0] as unknown as WebsiteSettings;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching website settings:', error);
      throw error;
    }
  },

  // Create initial settings
  async createSettings(data: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
    try {
      const settings = await databases.createDocument(
        DATABASE_ID,
        SETTINGS_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );
      return settings as unknown as WebsiteSettings;
    } catch (error) {
      console.error('Error creating settings:', error);
      throw error;
    }
  },

  // Update settings
  async updateSettings(
    settingsId: string,
    data: Partial<WebsiteSettings>
  ): Promise<WebsiteSettings> {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        SETTINGS_COLLECTION_ID,
        settingsId,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        }
      );
      return updated as unknown as WebsiteSettings;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Upload image (logo, hero, about, etc.)
  async uploadImage(file: File): Promise<{ fileId: string; fileName: string }> {
    try {
      const uploadedFile = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );

      return {
        fileId: uploadedFile.$id,
        fileName: file.name,
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl(fileId: string): string {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  },

  // Get or create settings
  async getOrCreateSettings(): Promise<WebsiteSettings> {
    const existing = await this.getSettings();
    
    if (existing) {
      return existing;
    }

    // Create default settings
    return await this.createSettings({
      siteTitle: 'Bravo Educational Consultancy',
      siteDescription: 'Your trusted partner for studying abroad',
      siteKeywords: 'study abroad, education consultancy, student visa',
      headerPhone: '+977 9851352807',
      headerPhone2: '01-5908733',
      headerEmail: 'info@bravo.edu.np',
      headerEmail2: 'contact@bravo.edu.np',
      headerAddress: 'Putalisadak, Kathmandu',
      headerWorkingHours: 'Sun - Fri, 8am - 5pm',
      heroTitle: 'Your Journey to Global Education Starts Here',
      heroSubtitle: 'Expert guidance for studying abroad in top destinations',
      heroDescription: 'Your trusted partner for studying in UK, USA, and Canada. We turn your dreams of international education into reality with expert guidance and personalized support.',
      heroImageSize: 'large',
      aboutTitle: 'About Bravo Educational Consultancy',
      aboutDescription: 'We are committed to helping students achieve their dreams of studying abroad.',
      aboutImageSize: 'medium',
      directorName: 'Director Name',
      directorTitle: 'Founder & CEO',
      directorMessage: 'At Bravo International, we don\'t just guide students; we transform dreams into reality. Our commitment is unwavering - to ensure that every student who walks through our doors walks out with confidence and a clear path to their future.',
      footerDescription: 'Bravo Educational Consultancy - Your trusted partner for international education.',
      footerPhone: '+977 9851352807',
      footerEmail: 'info@bravo.edu.np',
      footerAddress: 'Putalisadak, Kathmandu, Nepal',
      footerCopyright: '© 2025 Bravo Educational Consultancy. All rights reserved.',
    });
  },
};
