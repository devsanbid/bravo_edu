import { databases, storage, ID } from './appwrite';
import { Models, Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const JOBS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID!;
const APPLICATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID!;
const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

export interface Job extends Models.Document {
  title: string;
  description: string;
  branch: string;
  type: 'full-time' | 'part-time' | 'contract';
  requirements: string;
  isActive: boolean;
  postedDate: string;
  deadline: string;
}

export interface JobApplication extends Models.Document {
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter: string;
  cvFileId: string;
  cvFileName: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  appliedDate: string;
}

class JobService {
  // Job Postings
  async createJob(data: {
    title: string;
    description: string;
    branch: string;
    type: 'full-time' | 'part-time' | 'contract';
    requirements: string;
    deadline: string;
  }): Promise<Job> {
    try {
      const job = await databases.createDocument(
        DATABASE_ID,
        JOBS_COLLECTION_ID,
        ID.unique(),
        {
          ...data,
          isActive: true,
          postedDate: new Date().toISOString(),
        }
      );
      return job as unknown as Job;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  async getAllJobs(): Promise<Job[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        JOBS_COLLECTION_ID,
        [Query.orderDesc('postedDate'), Query.limit(100)]
      );
      return response.documents as unknown as Job[];
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async getActiveJobs(branch?: string): Promise<Job[]> {
    try {
      const queries = [
        Query.equal('isActive', true),
        Query.greaterThan('deadline', new Date().toISOString()),
        Query.orderDesc('postedDate')
      ];

      if (branch) {
        queries.push(Query.equal('branch', branch));
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        JOBS_COLLECTION_ID,
        queries
      );
      return response.documents as unknown as Job[];
    } catch (error) {
      console.error('Error fetching active jobs:', error);
      throw error;
    }
  }

  async updateJob(id: string, data: Partial<Omit<Job, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$databaseId' | '$collectionId'>>): Promise<Job> {
    try {
      const job = await databases.updateDocument(
        DATABASE_ID,
        JOBS_COLLECTION_ID,
        id,
        data
      );
      return job as unknown as Job;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  async deleteJob(id: string): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, JOBS_COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  // Job Applications
  async applyForJob(
    jobData: {
      jobId: string;
      jobTitle: string;
      applicantName: string;
      applicantEmail: string;
      applicantPhone: string;
      coverLetter: string;
    },
    cvFile: File
  ): Promise<JobApplication> {
    try {
      // Upload CV
      const uploadedFile = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        cvFile
      );

      // Create application
      const application = await databases.createDocument(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        ID.unique(),
        {
          ...jobData,
          cvFileId: uploadedFile.$id,
          cvFileName: cvFile.name,
          status: 'pending',
          appliedDate: new Date().toISOString(),
        }
      );

      return application as unknown as JobApplication;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  }

  async getAllApplications(): Promise<JobApplication[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        [Query.orderDesc('appliedDate'), Query.limit(200)]
      );
      return response.documents as unknown as JobApplication[];
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  async getApplicationsByJob(jobId: string): Promise<JobApplication[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        [Query.equal('jobId', jobId), Query.orderDesc('appliedDate')]
      );
      return response.documents as unknown as JobApplication[];
    } catch (error) {
      console.error('Error fetching job applications:', error);
      throw error;
    }
  }

  async updateApplicationStatus(id: string, status: JobApplication['status']): Promise<JobApplication> {
    try {
      const application = await databases.updateDocument(
        DATABASE_ID,
        APPLICATIONS_COLLECTION_ID,
        id,
        { status }
      );
      return application as unknown as JobApplication;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }

  async deleteApplication(id: string, cvFileId: string): Promise<void> {
    try {
      // Delete CV file
      await storage.deleteFile(STORAGE_BUCKET_ID, cvFileId);
      // Delete application
      await databases.deleteDocument(DATABASE_ID, APPLICATIONS_COLLECTION_ID, id);
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }

  getFileDownloadUrl(fileId: string): string {
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  }
}

export const jobService = new JobService();
