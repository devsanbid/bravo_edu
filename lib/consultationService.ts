import { databases, ID } from './appwrite';
import { Models, Query } from 'appwrite';

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
export const CONSULTATION_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONSULTATION_COLLECTION_ID || 'consultations';

export interface Consultation extends Models.Document {
  name: string;
  email: string;
  phone: string;
  destination: string;
  education: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  submittedAt: string;
}

export const consultationService = {
  // Create a new consultation booking
  async createConsultation(data: {
    name: string;
    email: string;
    phone: string;
    destination: string;
    education: string;
    message: string;
  }): Promise<Consultation> {
    try {
      const consultation = await databases.createDocument(
        DATABASE_ID,
        CONSULTATION_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        }
      );
      return consultation as unknown as Consultation;
    } catch (error) {
      console.error('Error creating consultation:', error);
      throw error;
    }
  },

  // Get all consultations (for admin)
  async getAllConsultations(): Promise<Consultation[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        CONSULTATION_COLLECTION_ID,
        [
          Query.orderDesc('submittedAt'),
          Query.limit(100),
        ]
      );
      return response.documents as unknown as Consultation[];
    } catch (error) {
      console.error('Error fetching consultations:', error);
      throw error;
    }
  },

  // Update consultation status
  async updateStatus(consultationId: string, status: 'pending' | 'contacted' | 'completed'): Promise<Consultation> {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        CONSULTATION_COLLECTION_ID,
        consultationId,
        { status }
      );
      return updated as unknown as Consultation;
    } catch (error) {
      console.error('Error updating consultation status:', error);
      throw error;
    }
  },

  // Delete consultation
  async deleteConsultation(consultationId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        CONSULTATION_COLLECTION_ID,
        consultationId
      );
    } catch (error) {
      console.error('Error deleting consultation:', error);
      throw error;
    }
  },
};
