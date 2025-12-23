"use client"

import { useAdminChat } from '@/hooks/useAdminChat';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Mail, Phone, Clock, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';

function AdminChatDashboardContent() {
  const {
    sessions,
    selectedSession,
    messages,
    loading,
    error,
    selectSession,
    sendMessage,
    closeSession,
    deleteSession,
    refreshSessions,
    unreadCounts,
    lastMessages,
  } = useAdminChat();

  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState('');
  const [adminName, setAdminName] = useState('Bravo Team');
  const [isVisitorTyping, setIsVisitorTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [onlineStatus, setOnlineStatus] = useState<Record<string, boolean>>({});

  // Calculate total unread count
  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

  // Set admin name from authenticated user
  useEffect(() => {
    if (user) {
      setAdminName(user.name || user.email?.split('@')[0] || 'Bravo Team');
    }
  }, [user]);

  // Monitor online status for all sessions
  useEffect(() => {
    const checkOnlineStatus = () => {
      const statusMap: Record<string, boolean> = {};
      sessions.forEach(session => {
        try {
          const presenceData = localStorage.getItem(`presence-${session.$id}`);
          if (presenceData) {
            const presence = JSON.parse(presenceData);
            // Consider online if heartbeat within last 10 seconds
            const isRecent = Date.now() - presence.lastSeen < 10000;
            statusMap[session.$id] = presence.isOnline && isRecent;
          } else {
            statusMap[session.$id] = false;
          }
        } catch (err) {
          statusMap[session.$id] = false;
        }
      });
      setOnlineStatus(statusMap);
    };

    // Check immediately
    checkOnlineStatus();

    // Check every 3 seconds
    const interval = setInterval(checkOnlineStatus, 3000);

    // Listen for storage events (cross-tab)
    const handleStorage = () => checkOnlineStatus();
    window.addEventListener('storage', handleStorage);

    // Listen for custom presence-update events (same-tab)
    const handlePresenceUpdate = () => checkOnlineStatus();
    window.addEventListener('presence-update', handlePresenceUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('presence-update', handlePresenceUpdate);
    };
  }, [sessions]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for visitor typing via localStorage
  useEffect(() => {
    if (!selectedSession) return;

    const handleStorageChange = () => {
      try {
        const typingData = localStorage.getItem(`typing-${selectedSession.$id}`);
        if (typingData) {
          const parsed = JSON.parse(typingData);
          if (!parsed.isAdmin && parsed.sessionId === selectedSession.$id) {
            setIsVisitorTyping(parsed.isTyping);
            if (parsed.isTyping) {
              setTimeout(() => setIsVisitorTyping(false), 3000);
            }
          }
        }
      } catch (err) {
        console.log('Error reading typing status:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check current value
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [selectedSession]);

  // Broadcast admin typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    
    if (selectedSession && e.target.value) {
      try {
        const event = {
          sessionId: selectedSession.$id,
          isTyping: true,
          userName: adminName,
          isAdmin: true,
          timestamp: Date.now()
        };
        
        // Broadcast via localStorage
        localStorage.setItem(`typing-${selectedSession.$id}`, JSON.stringify(event));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.log('Typing broadcast:', err);
      }

      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        try {
          const stopEvent = {
            sessionId: selectedSession.$id,
            isTyping: false,
            userName: adminName,
            isAdmin: true,
            timestamp: Date.now()
          };
          localStorage.setItem(`typing-${selectedSession.$id}`, JSON.stringify(stopEvent));
          window.dispatchEvent(new Event('storage'));
        } catch (err) {
          console.log('Stop typing broadcast:', err);
        }
      }, 1000);
      setTypingTimeout(timeout);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    await sendMessage(messageInput, adminName);
    setMessageInput('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const truncateMessage = (message: string, wordLimit: number = 6) => {
    const words = message.split(' ');
    if (words.length <= wordLimit) {
      return message;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  if (loading && sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                {totalUnread > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center"
                  >
                    {totalUnread > 99 ? '99+' : totalUnread}
                  </motion.div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Chat Dashboard</h1>
                <p className="text-sm text-gray-500">
                  {user?.email && `Logged in as ${user.email}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{adminName}</span>
              </div>
              <button
                onClick={refreshSessions}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-6 h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)]">
          {/* Sessions List */}
          <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${
            selectedSession ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <h2 className="text-lg font-semibold text-white">
                Active Chats ({sessions.length})
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sessions.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>No active chat sessions</p>
                  <p className="text-sm mt-2">New chats will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {sessions.map((session) => (
                    <motion.button
                      key={session.$id}
                      onClick={() => selectSession(session)}
                      className={`w-full p-4 text-left hover:bg-blue-50 transition ${
                        selectedSession?.$id === session.$id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {session.visitorName ? session.visitorName[0].toUpperCase() : 'V'}
                            </div>
                            {unreadCounts[session.$id] > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                              >
                                {unreadCounts[session.$id] > 9 ? '9+' : unreadCounts[session.$id]}
                              </motion.div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {session.visitorName || 'Anonymous Visitor'}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {formatDate(session.lastMessageAt)} • {formatTime(session.lastMessageAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span 
                            className={`w-3 h-3 rounded-full ${
                              onlineStatus[session.$id] ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            title={onlineStatus[session.$id] ? 'Online' : 'Offline'}
                          ></span>
                        </div>
                      </div>
                      {lastMessages[session.$id] && (
                        <p className="text-sm text-gray-600 ml-12 mb-1">
                          {truncateMessage(lastMessages[session.$id])}
                        </p>
                      )}
                      {session.visitorEmail && (
                        <p className="text-xs text-gray-500 ml-12 truncate flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {session.visitorEmail}
                        </p>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className={`lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${
            selectedSession ? 'flex' : 'hidden lg:flex'
          }`}>
            {selectedSession ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => selectSession(null as any)}
                        className="lg:hidden p-2 hover:bg-white/20 rounded-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                        {selectedSession.visitorName ? selectedSession.visitorName[0].toUpperCase() : 'V'}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {selectedSession.visitorName || 'Anonymous Visitor'}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          {selectedSession.visitorEmail && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {selectedSession.visitorEmail}
                            </span>
                          )}
                          {selectedSession.visitorPhone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {selectedSession.visitorPhone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to permanently delete this chat and all messages?')) {
                            deleteSession(selectedSession.$id);
                          }
                        }}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition"
                        title="Delete Chat Permanently"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to close this chat?')) {
                            closeSession(selectedSession.$id);
                          }
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition"
                        title="Close Chat"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.$id || `message-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isFromAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 break-words ${
                            message.isFromAdmin
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-white text-gray-900 shadow-md'
                          }`}
                        >
                          <p className="break-words whitespace-pre-wrap">{message.message}</p>
                          <p className={`text-xs mt-2 ${message.isFromAdmin ? 'text-white/70' : 'text-gray-500'}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Typing Indicator */}
                  {isVisitorTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start"
                    >
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-sm text-gray-600">Visitor is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2 items-end">
                    <textarea
                      value={messageInput}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Type your message... (Shift+Enter for new line)"
                      rows={1}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none max-h-32 overflow-y-auto"
                      style={{ minHeight: '48px' }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-24 h-24 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">Select a chat to start messaging</p>
                  <p className="text-sm mt-2">Choose a conversation from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminChatDashboard() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AdminChatDashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
