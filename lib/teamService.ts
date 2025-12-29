import { databases, storage, ID } from './appwrite';
import { Models, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
const COLLECTION_ID = 'team_members';
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '69493301002498decf98';

export interface TeamMember extends Models.Document {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  message?: string;
  imageFileId?: string;
  imageFileName?: string;
  order?: number;
}

export const teamService = {
  // Get all team members
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderAsc('order')]
      );
      return response.documents as unknown as TeamMember[];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },

  // Create team member
  async createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
    try {
      const member = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        data
      );
      return member as unknown as TeamMember;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },

  // Update team member
  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    try {
      const member = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        data
      );
      return member as unknown as TeamMember;
    } catch (error) {
      console.error('Error updating team member:', error);
      throw error;
    }
  },

  // Delete team member
  async deleteTeamMember(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting team member:', error);
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
};
