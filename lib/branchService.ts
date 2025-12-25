import { databases, ID } from './appwrite';
import { Models, Query } from 'appwrite';

// Database and Collection IDs
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
const BRANCHES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BRANCHES_COLLECTION_ID || 'branches';

export interface Branch extends Models.Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  isActive: boolean;
  createdAt: string;
}

export const branchService = {
  // Create a new branch
  async createBranch(branchData: {
    name: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    isActive?: boolean;
  }): Promise<Branch> {
    try {
      const branch = await databases.createDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        ID.unique(),
        {
          ...branchData,
          isActive: branchData.isActive !== undefined ? branchData.isActive : true,
          createdAt: new Date().toISOString(),
        }
      );
      return branch as unknown as Branch;
    } catch (error) {
      console.error('Error creating branch:', error);
      throw error;
    }
  },

  // Get all branches
  async getAllBranches(): Promise<Branch[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        [Query.orderDesc('createdAt')]
      );
      return response.documents as unknown as Branch[];
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  },

  // Get active branches only
  async getActiveBranches(): Promise<Branch[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        [
          Query.equal('isActive', true),
          Query.orderDesc('createdAt')
        ]
      );
      return response.documents as unknown as Branch[];
    } catch (error) {
      console.error('Error fetching active branches:', error);
      throw error;
    }
  },

  // Get branch by ID
  async getBranchById(branchId: string): Promise<Branch> {
    try {
      const branch = await databases.getDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        branchId
      );
      return branch as unknown as Branch;
    } catch (error) {
      console.error('Error fetching branch:', error);
      throw error;
    }
  },

  // Update branch
  async updateBranch(
    branchId: string,
    branchData: {
      name?: string;
      address?: string;
      phone?: string;
      email?: string;
      city?: string;
      isActive?: boolean;
    }
  ): Promise<Branch> {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        branchId,
        branchData
      );
      return updated as unknown as Branch;
    } catch (error) {
      console.error('Error updating branch:', error);
      throw error;
    }
  },

  // Delete branch
  async deleteBranch(branchId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        branchId
      );
    } catch (error) {
      console.error('Error deleting branch:', error);
      throw error;
    }
  },

  // Toggle branch active status
  async toggleBranchStatus(branchId: string, isActive: boolean): Promise<Branch> {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        branchId,
        { isActive }
      );
      return updated as unknown as Branch;
    } catch (error) {
      console.error('Error toggling branch status:', error);
      throw error;
    }
  },
};
