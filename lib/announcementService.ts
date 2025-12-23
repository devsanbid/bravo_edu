import { databases, ID } from './appwrite';
import { Models, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const ANNOUNCEMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENTS_COLLECTION_ID!;

export interface Announcement extends Models.Document {
  title: string;
  content: string;
  category: 'general' | 'urgent' | 'event' | 'scholarship';
  isActive: boolean;
  publishedDate: string;
  expiryDate?: string;
}

class AnnouncementService {
  async createAnnouncement(data: {
    title: string;
    content: string;
    category: Announcement['category'];
    expiryDate?: string;
  }): Promise<Announcement> {
    try {
      const announcement = await databases.createDocument(
        DATABASE_ID,
        ANNOUNCEMENTS_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          isActive: true,
          publishedDate: new Date().toISOString(),
        }
      );
      return announcement as Announcement;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  }

  async getAllAnnouncements(): Promise<Announcement[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ANNOUNCEMENTS_COLLECTION_ID,
        [Query.orderDesc('publishedDate'), Query.limit(100)]
      );
      return response.documents as Announcement[];
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    try {
      const now = new Date().toISOString();
      const response = await databases.listDocuments(
        DATABASE_ID,
        ANNOUNCEMENTS_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('publishedDate')
        ]
      );
      
      // Filter out expired announcements
      const activeAnnouncements = response.documents.filter((doc: any) => {
        if (!doc.expiryDate) return true;
        return doc.expiryDate > now;
      });

      return activeAnnouncements as Announcement[];
    } catch (error) {
      console.error('Error fetching active announcements:', error);
      throw error;
    }
  }

  async updateAnnouncement(
    id: string,
    data: Partial<Omit<Announcement, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>>
  ): Promise<Announcement> {
    try {
      const announcement = await databases.updateDocument(
        DATABASE_ID,
        ANNOUNCEMENTS_COLLECTION_ID,
        id,
        data
      );
      return announcement as Announcement;
    } catch (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }
  }

  async deleteAnnouncement(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, ANNOUNCEMENTS_COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  }

  async toggleAnnouncement(id: string, isActive: boolean): Promise<Announcement> {
    return this.updateAnnouncement(id, { isActive });
  }
}

export const announcementService = new AnnouncementService();
