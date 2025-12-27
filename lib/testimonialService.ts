import { databases, storage, ID } from './appwrite';
import { Models, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
const COLLECTION_ID = 'testimonials';
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '69493301002498decf98';

export interface Testimonial extends Models.Document {
  name: string;
  college?: string;
  location?: string;
  program?: string;
  year?: string;
  rating: number;
  quote?: string;
  imageFileId?: string;
  imageFileName?: string;
  videoFileId?: string;
  videoFileName?: string;
  order?: number;
}

export const testimonialService = {
  // Get all testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );
      return response.documents as unknown as Testimonial[];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  // Create testimonial
  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const testimonial = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        data
      );
      return testimonial as unknown as Testimonial;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },

  // Update testimonial
  async updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const testimonial = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        data
      );
      return testimonial as unknown as Testimonial;
    } catch (error) {
      console.error('Error updating testimonial:', error);
      throw error;
    }
  },

  // Delete testimonial
  async deleteTestimonial(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      throw error;
    }
  },

  // Upload image
  async uploadImage(file: File): Promise<{ fileId: string; fileName: string }> {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return { fileId: response.$id, fileName: response.$id };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Upload video
  async uploadVideo(file: File): Promise<{ fileId: string; fileName: string }> {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return { fileId: response.$id, fileName: response.$id };
    } catch (error) {
      console.error('Error uploading video:', error);
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
    return storage.getFileView(STORAGE_BUCKET_ID, fileId).toString();
  },

  // Get video URL
  getVideoUrl(fileId: string): string {
    return storage.getFileView(STORAGE_BUCKET_ID, fileId).toString();
  },
};
