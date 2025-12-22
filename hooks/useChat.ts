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

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
      try {
        const visitorId = getVisitorId();
        const chatSession = await chatService.getOrCreateSession(visitorId);
        setSession(chatSession);

        // Load existing messages
        const existingMessages = await chatService.getMessages(chatSession.$id);
        setMessages(existingMessages);

        // Subscribe to new messages
        const unsubscribe = chatService.subscribeToMessages(
          chatSession.$id,
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

        setLoading(false);

        // Cleanup subscription on unmount
        return () => {
          if (unsubscribe && typeof unsubscribe === 'function') {
            unsubscribe();
          }
        };
      } catch (err) {
        console.error('Error initializing chat:', err);
        setError('Failed to initialize chat');
        setLoading(false);
      }
    };

    initChat();
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
  };
};
