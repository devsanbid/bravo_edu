import { databases, storage, ID } from './appwrite';
import { Models, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const POPUP_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_POPUP_COLLECTION_ID!;
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

export interface Popup extends Models.Document {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isEnabled: boolean;
  imageFileId?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  createdAt: string;
}

class PopupService {
  async uploadImage(file: File): Promise<{ fileId: string; url: string }> {
    try {
      const uploadedFile = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      const url = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      return { fileId: uploadedFile.$id, url };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deleteImage(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  async createPopup(data: {
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    isEnabled: boolean;
    imageFileId?: string;
    imageUrl?: string;
    buttonText?: string;
    buttonLink?: string;
  }): Promise<Popup> {
    try {
      const popup = await databases.createDocument(
        DATABASE_ID,
        POPUP_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          createdAt: new Date().toISOString(),
        }
      );
      return popup as Popup;
    } catch (error) {
      console.error('Error creating popup:', error);
      throw error;
    }
  }

  async getAllPopups(): Promise<Popup[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        POPUP_COLLECTION_ID,
        [Query.orderDesc('createdAt'), Query.limit(100)]
      );
      return response.documents as Popup[];
    } catch (error) {
      console.error('Error fetching popups:', error);
      throw error;
    }
  }

  async getActivePopup(): Promise<Popup | null> {
    try {
      const now = new Date().toISOString();
      const response = await databases.listDocuments(
        DATABASE_ID,
        POPUP_COLLECTION_ID,
        [
          Query.equal('isEnabled', true),
          Query.lessThanEqual('startDate', now),
          Query.greaterThanEqual('endDate', now),
          Query.limit(1)
        ]
      );
      return response.documents.length > 0 ? (response.documents[0] as Popup) : null;
    } catch (error: any) {
      // Silently return null if collection doesn't exist or permission denied
      if (error?.code === 404 || error?.code === 401) {
        return null;
      }
      console.error('Error fetching active popup:', error);
      return null;
    }
  }

  async updatePopup(
    id: string,
    data: Partial<Omit<Popup, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>>
  ): Promise<Popup> {
    try {
      const popup = await databases.updateDocument(
        DATABASE_ID,
        POPUP_COLLECTION_ID,
        id,
        data
      );
      return popup as Popup;
    } catch (error) {
      console.error('Error updating popup:', error);
      throw error;
    }
  }

  async deletePopup(id: string, imageFileId?: string): Promise<void> {
    try {
      // Delete image if exists
      if (imageFileId) {
        await this.deleteImage(imageFileId);
      }
      await databases.deleteDocument(DATABASE_ID, POPUP_COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting popup:', error);
      throw error;
    }
  }

  async togglePopup(id: string, isEnabled: boolean): Promise<Popup> {
    return this.updatePopup(id, { isEnabled });
  }
}

export const popupService = new PopupService();
