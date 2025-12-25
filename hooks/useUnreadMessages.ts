"use client"

import { useEffect, useState } from 'react';
import { chatService } from '@/lib/chatService';

export function useUnreadMessages() {
  const [totalUnread, setTotalUnread] = useState(0);

  useEffect(() => {
    // Load initial unread count
    const loadUnreadCount = async () => {
      try {
        const sessions = await chatService.getAllSessions('active');
        let count = 0;
        
        for (const session of sessions) {
          const messages = await chatService.getMessages(session.$id);
          const unreadMessages = messages.filter(msg => !msg.isFromAdmin);
          
          // Check if admin has read these messages (using localStorage)
          const lastReadKey = `admin_last_read_${session.$id}`;
          const lastReadTime = localStorage.getItem(lastReadKey);
          
          if (!lastReadTime) {
            count += unreadMessages.length;
          } else {
            const unreadAfterLastRead = unreadMessages.filter(
              msg => new Date(msg.timestamp).getTime() > parseInt(lastReadTime)
            );
            count += unreadAfterLastRead.length;
          }
        }
        
        setTotalUnread(count);
      } catch (error) {
        console.error('Error loading unread count:', error);
      }
    };

    loadUnreadCount();

    // Subscribe to new messages globally
    const unsubscribe = chatService.subscribeToAllMessages((newMessage) => {
      // Only count visitor messages
      if (!newMessage.isFromAdmin) {
        setTotalUnread(prev => prev + 1);
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const markAllAsRead = () => {
    setTotalUnread(0);
  };

  const markSessionAsRead = (sessionId: string) => {
    // Store the current timestamp as last read time
    localStorage.setItem(`admin_last_read_${sessionId}`, Date.now().toString());
    
    // Recalculate total unread count
    chatService.getAllSessions('active').then(sessions => {
      let count = 0;
      Promise.all(
        sessions.map(async session => {
          const messages = await chatService.getMessages(session.$id);
          const unreadMessages = messages.filter(msg => !msg.isFromAdmin);
          
          const lastReadKey = `admin_last_read_${session.$id}`;
          const lastReadTime = localStorage.getItem(lastReadKey);
          
          if (!lastReadTime) {
            return unreadMessages.length;
          } else {
            const unreadAfterLastRead = unreadMessages.filter(
              msg => new Date(msg.timestamp).getTime() > parseInt(lastReadTime)
            );
            return unreadAfterLastRead.length;
          }
        })
      ).then(counts => {
        const total = counts.reduce((sum, c) => sum + c, 0);
        setTotalUnread(total);
      });
    });
  };

  return {
    totalUnread,
    markAllAsRead,
    markSessionAsRead,
  };
}
