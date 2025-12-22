import { storage, databases, ID } from './appwrite';
import { Models, Query } from 'appwrite';

// Storage and Database IDs
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '69493301002498decf98';
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
export const GALLERY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID || 'gallery_images';

export interface GalleryImage extends Models.Document {
  title?: string;
  description?: string;
  fileId: string;
  fileUrl: string;
  uploadedBy: string;
  uploadDate: string;
}

export const galleryService = {
  // Upload image to storage
  async uploadImage(file: File): Promise<Models.File> {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get file preview URL
  getFilePreview(fileId: string): string {
    return storage.getFilePreview(STORAGE_BUCKET_ID, fileId, 1200, 0, 'center', 80).toString();
  },

  // Get file view URL
  getFileView(fileId: string): string {
    return storage.getFileView(STORAGE_BUCKET_ID, fileId).toString();
  },

  // Create gallery entry in database
  async createGalleryEntry(
    fileId: string,
    fileUrl: string,
    title?: string,
    description?: string,
    uploadedBy?: string
  ): Promise<GalleryImage> {
    try {
      const entry = await databases.createDocument(
        DATABASE_ID,
        GALLERY_COLLECTION_ID,
        ID.unique(),
        {
          title,
          description,
          fileId,
          fileUrl,
          uploadedBy: uploadedBy || 'Admin',
          uploadDate: new Date().toISOString(),
        }
      );
      return entry as unknown as GalleryImage;
    } catch (error) {
      console.error('Error creating gallery entry:', error);
      throw error;
    }
  },

  // Get all gallery images
  async getAllImages(): Promise<GalleryImage[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        GALLERY_COLLECTION_ID,
        [Query.orderDesc('uploadDate'), Query.limit(100)]
      );
      return response.documents as unknown as GalleryImage[];
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(imageId: string, fileId: string): Promise<void> {
    try {
      // Delete from storage
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
      // Delete from database
      await databases.deleteDocument(DATABASE_ID, GALLERY_COLLECTION_ID, imageId);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  // Upload complete (storage + database)
  async uploadComplete(
    file: File,
    title?: string,
    description?: string,
    uploadedBy?: string
  ): Promise<GalleryImage> {
    try {
      // Upload to storage
      const uploadedFile = await this.uploadImage(file);
      
      // Get file URL
      const fileUrl = this.getFilePreview(uploadedFile.$id);
      
      // Create database entry
      const entry = await this.createGalleryEntry(
        uploadedFile.$id,
        fileUrl,
        title,
        description,
        uploadedBy
      );
      
      return entry;
    } catch (error) {
      console.error('Error in complete upload:', error);
      throw error;
    }
  },
};
