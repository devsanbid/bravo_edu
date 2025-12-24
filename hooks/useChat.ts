import { useState, useEffect, useCallback } from 'react';
import { chatService, ChatMessage, ChatSession } from '@/lib/chatService';

// Generate a unique visitor ID (stored in localStorage)
const getVisitorId = () => {
  if (typeof window === 'undefined') return '';
  
  let visitorId = localStorage.getItem('bravo_visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('bravo_visitor_id', visitorId);
  }
  return visitorId;
};

export const useChat = () => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize chat session only when explicitly called
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const checkExistingSession = async () => {
      try {
        const visitorId = getVisitorId();
        
        // Only check for existing session, don't create new one
        const sessions = await chatService.getExistingSession(visitorId);
        
        if (sessions) {
          setSession(sessions);
          
          // Load existing messages
          const existingMessages = await chatService.getMessages(sessions.$id);
          setMessages(existingMessages);

          // Subscribe to new messages
          unsubscribe = chatService.subscribeToMessages(
            sessions.$id,
            (newMessage) => {
              setMessages((prev) => {
                // Avoid duplicates
                if (prev.some(msg => msg.$id === newMessage.$id)) {
                  return prev;
                }
                return [...prev, newMessage];
              });
            }
          );
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error checking session:', err);
        setLoading(false);
      }
    };

    checkExistingSession();
    
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  // Initialize session when user submits form
  const initializeSession = useCallback(async (visitorDetails?: { visitorName?: string; visitorEmail?: string; visitorPhone?: string }) => {
    try {
      const visitorId = getVisitorId();
      const chatSession = await chatService.getOrCreateSession(visitorId, visitorDetails);
      setSession(chatSession);

      // Load existing messages
      const existingMessages = await chatService.getMessages(chatSession.$id);
      setMessages(existingMessages);

      // Subscribe to new messages
      chatService.subscribeToMessages(
        chatSession.$id,
        (newMessage) => {
          setMessages((prev) => {
            if (prev.some(msg => msg.$id === newMessage.$id)) {
              return prev;
            }
            return [...prev, newMessage];
          });
        }
      );

      return chatSession;
    } catch (err) {
      console.error('Error initializing session:', err);
      throw err;
    }
  }, []);

  // Send message
  const sendMessage = useCallback(
    async (message: string, senderName: string = 'Visitor', senderEmail?: string, senderPhone?: string) => {
      if (!session || !message.trim()) return;

      try {
        await chatService.sendMessage(
          session.$id,
          message,
          senderName,
          false,
          senderEmail,
          senderPhone
        );
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message');
      }
    },
    [session]
  );

  // Update visitor details
  const updateVisitorDetails = useCallback(
    async (details: { visitorName?: string; visitorEmail?: string; visitorPhone?: string }) => {
      if (!session) return;

      try {
        const updatedSession = await chatService.updateSessionDetails(session.$id, details);
        setSession(updatedSession);
      } catch (err) {
        console.error('Error updating visitor details:', err);
      }
    },
    [session]
  );

  return {
    session,
    messages,
    loading,
    error,
    sendMessage,
    updateVisitorDetails,
    initializeSession,
  };
};
