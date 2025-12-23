import { databases, ID, client } from './appwrite';
import { Models, Query } from 'appwrite';

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'bravo_chat_db';
export const MESSAGES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CHAT_MESSAGES_COLLECTION_ID || 'chat_messages';
export const SESSIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CHAT_SESSIONS_COLLECTION_ID || 'chat_sessions';

export interface ChatMessage extends Models.Document {
  sessionId: string;
  message: string;
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  isFromAdmin: boolean;
  timestamp: string;
}

export interface ChatSession extends Models.Document {
  visitorId: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  status: 'active' | 'closed';
  lastMessageAt: string;
  createdAt: string;
}

// Chat Service
export const chatService = {
  // Create a new chat session
  async createSession(visitorId: string): Promise<ChatSession> {
    try {
      const session = await databases.createDocument(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        ID.unique(),
        {
          visitorId,
          status: 'active',
          lastMessageAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
      );
      return session as unknown as ChatSession;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  // Get existing session without creating a new one
  async getExistingSession(visitorId: string): Promise<ChatSession | null> {
    try {
      // Try to find existing active session
      const sessions = await databases.listDocuments(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        [
          Query.equal('visitorId', visitorId),
          Query.equal('status', 'active'),
        ]
      );

      if (sessions.documents.length > 0) {
        return sessions.documents[0] as unknown as ChatSession;
      }

      return null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  },

  // Get or create session for a visitor
  async getOrCreateSession(visitorId: string): Promise<ChatSession> {
    try {
      // Try to find existing active session
      const sessions = await databases.listDocuments(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        [
          Query.equal('visitorId', visitorId),
          Query.equal('status', 'active'),
        ]
      );

      if (sessions.documents.length > 0) {
        return sessions.documents[0] as unknown as ChatSession;
      }

      // Create new session if none exists
      return await this.createSession(visitorId);
    } catch (error) {
      console.error('Error getting/creating session:', error);
      throw error;
    }
  },

  // Update session with visitor details
  async updateSessionDetails(
    sessionId: string,
    details: { visitorName?: string; visitorEmail?: string; visitorPhone?: string }
  ): Promise<ChatSession> {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        sessionId,
        details
      );
      return updated as unknown as ChatSession;
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },

  // Send a message
  async sendMessage(
    sessionId: string,
    message: string,
    senderName: string,
    isFromAdmin: boolean = false,
    senderEmail?: string,
    senderPhone?: string
  ): Promise<ChatMessage> {
    try {
      const newMessage = await databases.createDocument(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        ID.unique(),
        {
          sessionId,
          message,
          senderName,
          senderEmail,
          senderPhone,
          isFromAdmin,
          timestamp: new Date().toISOString(),
        }
      );

      // Update session last message time
      await databases.updateDocument(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        sessionId,
        {
          lastMessageAt: new Date().toISOString(),
        }
      );

      return newMessage as unknown as ChatMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get messages for a session
  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    try {
      const messages = await databases.listDocuments(
        DATABASE_ID,
        MESSAGES_COLLECTION_ID,
        [
          Query.equal('sessionId', sessionId),
        ]
      );
      return messages.documents as unknown as ChatMessage[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Subscribe to real-time messages
  subscribeToMessages(sessionId: string, callback: (message: ChatMessage) => void) {
    return client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      (response: any) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          const message = response.payload as ChatMessage;
          if (message.sessionId === sessionId) {
            callback(message);
          }
        }
      }
    );
  },

  // Close session
  async closeSession(sessionId: string): Promise<void> {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        sessionId,
        {
          status: 'closed',
        }
      );
    } catch (error) {
      console.error('Error closing session:', error);
      throw error;
    }
  },

  // Delete session and all its messages
  async deleteSession(sessionId: string): Promise<void> {
    try {
      // First, delete all messages in the session
      const messages = await this.getMessages(sessionId);
      await Promise.all(
        messages.map(message => 
          databases.deleteDocument(DATABASE_ID, MESSAGES_COLLECTION_ID, message.$id)
        )
      );

      // Then delete the session
      await databases.deleteDocument(DATABASE_ID, SESSIONS_COLLECTION_ID, sessionId);
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  },

  // Admin Functions
  
  // Get all sessions (for admin dashboard)
  async getAllSessions(status?: 'active' | 'closed'): Promise<ChatSession[]> {
    try {
      const queries = status ? [Query.equal('status', status)] : [];
      queries.push(Query.orderDesc('lastMessageAt'));
      
      const sessions = await databases.listDocuments(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        queries
      );
      return sessions.documents as unknown as ChatSession[];
    } catch (error) {
      console.error('Error fetching all sessions:', error);
      throw error;
    }
  },

  // Get session by ID
  async getSessionById(sessionId: string): Promise<ChatSession> {
    try {
      const session = await databases.getDocument(
        DATABASE_ID,
        SESSIONS_COLLECTION_ID,
        sessionId
      );
      return session as unknown as ChatSession;
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  },

  // Send admin message
  async sendAdminMessage(
    sessionId: string,
    message: string,
    adminName: string = 'Bravo Team'
  ): Promise<ChatMessage> {
    return this.sendMessage(sessionId, message, adminName, true);
  },

  // Subscribe to all sessions (for admin dashboard)
  subscribeToSessions(callback: (session: ChatSession) => void) {
    return client.subscribe(
      `databases.${DATABASE_ID}.collections.${SESSIONS_COLLECTION_ID}.documents`,
      (response: any) => {
        if (
          response.events.includes('databases.*.collections.*.documents.*.create') ||
          response.events.includes('databases.*.collections.*.documents.*.update')
        ) {
          callback(response.payload as ChatSession);
        }
      }
    );
  },

  // Subscribe to all messages (for unread count tracking)
  subscribeToAllMessages(callback: (message: ChatMessage) => void) {
    return client.subscribe(
      `databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`,
      (response: any) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          callback(response.payload as ChatMessage);
        }
      }
    );
  },

  // Broadcast typing indicator (using temporary document approach)
  async broadcastTyping(sessionId: string, isTyping: boolean, userName: string, isAdmin: boolean) {
    // We'll use a simple approach: create a typing indicator message that expires
    // In production, you might want a separate collection or use Appwrite's realtime channels
    try {
      if (isTyping) {
        // Broadcast via session update with a typing field (if you add this to schema)
        // For now, we'll handle this client-side with localStorage/events
        const event = new CustomEvent('chat-typing', {
          detail: { sessionId, isTyping, userName, isAdmin }
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error('Error broadcasting typing:', error);
    }
  },
};
