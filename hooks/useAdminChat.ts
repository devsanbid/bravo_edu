"use client"

import { useEffect, useState, useCallback } from 'react';
import { chatService, ChatSession, ChatMessage } from '@/lib/chatService';

export function useAdminChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [lastMessages, setLastMessages] = useState<Record<string, string>>({});

  // Load all sessions
  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const allSessions = await chatService.getAllSessions('active');
      setSessions(allSessions);
      
      // Load last message for each session
      const lastMessagesMap: Record<string, string> = {};
      await Promise.all(allSessions.map(async (session) => {
        try {
          const sessionMessages = await chatService.getMessages(session.$id);
          if (sessionMessages.length > 0) {
            const lastMsg = sessionMessages[sessionMessages.length - 1];
            lastMessagesMap[session.$id] = lastMsg.message;
          }
        } catch (err) {
          console.error(`Error loading last message for session ${session.$id}:`, err);
        }
      }));
      setLastMessages(lastMessagesMap);
      
      setError(null);
    } catch (err) {
      console.error('Error loading sessions:', err);
      setError('Failed to load chat sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load messages for selected session
  const loadMessages = useCallback(async (sessionId: string) => {
    try {
      const sessionMessages = await chatService.getMessages(sessionId);
      setMessages(sessionMessages);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    }
  }, []);

  // Select a session
  const selectSession = useCallback(async (session: ChatSession) => {
    setSelectedSession(session);
    setMessages([]); // Clear previous messages
    // Mark this session as read
    setUnreadCounts(prev => ({ ...prev, [session.$id]: 0 }));
    // Messages will be loaded by the useEffect
  }, []);

  // Send admin message
  const sendMessage = useCallback(async (message: string, adminName: string = 'Bravo Team') => {
    if (!selectedSession) return;

    try {
      const newMessage = await chatService.sendAdminMessage(
        selectedSession.$id,
        message,
        adminName
      );
      // Don't add to state here - let the real-time subscription handle it
      // This prevents duplicates
      setError(null);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  }, [selectedSession]);

  // Close session
  const closeSession = useCallback(async (sessionId: string) => {
    try {
      await chatService.closeSession(sessionId);
      setSessions(prev => prev.filter(s => s.$id !== sessionId));
      if (selectedSession?.$id === sessionId) {
        setSelectedSession(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error closing session:', err);
      setError('Failed to close session');
    }
  }, [selectedSession]);

  // Initialize and subscribe
  useEffect(() => {
    loadSessions();

    // Subscribe to session updates
    const unsubscribeSessions = chatService.subscribeToSessions((updatedSession) => {
      setSessions(prev => {
        const existing = prev.find(s => s.$id === updatedSession.$id);
        if (existing) {
          return prev.map(s => s.$id === updatedSession.$id ? updatedSession : s)
            .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
        } else {
          return [updatedSession, ...prev];
        }
      });

      // Update selected session if it's the one being updated
      if (selectedSession?.$id === updatedSession.$id) {
        setSelectedSession(updatedSession);
      }
    });

    // Subscribe to ALL messages to track unread counts globally
    const unsubscribeAllMessages = chatService.subscribeToAllMessages((newMessage) => {
      // Only increment unread count if it's from visitor and session is not selected
      if (!newMessage.isFromAdmin && selectedSession?.$id !== newMessage.sessionId) {
        setUnreadCounts(prev => ({
          ...prev,
          [newMessage.sessionId]: (prev[newMessage.sessionId] || 0) + 1
        }));
      }
    });

    return () => {
      unsubscribeSessions();
      unsubscribeAllMessages?.();
    };
  }, [loadSessions, selectedSession]);

  // Subscribe to messages for selected session
  useEffect(() => {
    if (!selectedSession) return;

    // Load initial messages and clear any existing subscription messages
    const loadAndSubscribe = async () => {
      try {
        const initialMessages = await chatService.getMessages(selectedSession.$id);
        setMessages(initialMessages);

        // Now subscribe to new messages only
        const unsubscribeMessages = chatService.subscribeToMessages(
          selectedSession.$id,
          (newMessage) => {
            setMessages(prev => {
              // Avoid duplicates by checking if message already exists
              const exists = prev.find(m => m.$id === newMessage.$id);
              if (exists) {
                return prev;
              }
              // Add new message and sort by timestamp
              return [...prev, newMessage].sort((a, b) => 
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
              );
            });

            // Update last message preview
            setLastMessages(prev => ({
              ...prev,
              [newMessage.sessionId]: newMessage.message
            }));

            // Increment unread count for visitor messages if session not selected
            if (!newMessage.isFromAdmin && selectedSession?.$id !== newMessage.sessionId) {
              setUnreadCounts(prev => ({
                ...prev,
                [newMessage.sessionId]: (prev[newMessage.sessionId] || 0) + 1
              }));
            }

            // Show notification for new visitor messages
            if (!newMessage.isFromAdmin && document.hidden && 'Notification' in window && Notification.permission === 'granted') {
              new Notification('New Message from Visitor', {
                body: `${newMessage.senderName}: ${newMessage.message}`,
                icon: '/logo.png',
              });
            }
          }
        );

        // Store unsubscribe function
        return unsubscribeMessages;
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Failed to load messages');
      }
    };

    const unsubscribePromise = loadAndSubscribe();

    return () => {
      unsubscribePromise?.then(unsubscribe => unsubscribe?.());
    };
  }, [selectedSession]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    sessions,
    selectedSession,
    messages,
    loading,
    error,
    selectSession,
    sendMessage,
    closeSession,
    refreshSessions: loadSessions,
    unreadCounts,
    lastMessages,
  };
}
