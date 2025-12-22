'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Mail, Phone, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useChat } from '@/hooks/useChat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, loading, sendMessage, updateVisitorDetails, session } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for admin typing via Appwrite realtime
  useEffect(() => {
    if (!session) return;

    const { client } = require('@/lib/appwrite');
    
    const unsubscribe = client.subscribe(
      `typing-${session.$id}`,
      (response: any) => {
        if (response.payload?.isAdmin && response.payload?.isTyping !== undefined) {
          setIsAdminTyping(response.payload.isTyping);
          if (response.payload.isTyping) {
            setTimeout(() => setIsAdminTyping(false), 3000);
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [session]);

  // Broadcast visitor typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    
    if (session && e.target.value) {
      const { client } = require('@/lib/appwrite');
      
      // Broadcast typing status
      client.subscribe(
        `typing-${session.$id}`,
        () => {} // Just for publishing
      );

      // Send typing event via custom channel
      try {
        const event = {
          sessionId: session.$id,
          isTyping: true,
          userName: session.visitorName || 'Visitor',
          isAdmin: false,
          timestamp: Date.now()
        };
        
        // Broadcast via localStorage for same-domain communication
        localStorage.setItem(`typing-${session.$id}`, JSON.stringify(event));
        window.dispatchEvent(new Event('storage'));
      } catch (err) {
        console.log('Typing broadcast:', err);
      }

      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        try {
          const stopEvent = {
            sessionId: session.$id,
            isTyping: false,
            userName: session.visitorName,
            isAdmin: false,
            timestamp: Date.now()
          };
          localStorage.setItem(`typing-${session.$id}`, JSON.stringify(stopEvent));
          window.dispatchEvent(new Event('storage'));
        } catch (err) {
          console.log('Stop typing broadcast:', err);
        }
      }, 1000);
      setTypingTimeout(timeout);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const name = session?.visitorName || visitorName || 'Visitor';
    await sendMessage(inputMessage, name, session?.visitorEmail, session?.visitorPhone);
    setInputMessage('');
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName && visitorEmail) {
      await updateVisitorDetails({
        visitorName,
        visitorEmail,
        visitorPhone,
      });
      setShowForm(false);
      await sendMessage(
        `Hi, I'm ${visitorName}. Email: ${visitorEmail}, Phone: ${visitorPhone}`,
        visitorName,
        visitorEmail,
        visitorPhone
      );
    }
  };

  const quickReplies = [
    'I want to study in UK',
    'I want to study in USA', 
    'I want to study in Canada',
    'Tell me about IELTS preparation',
    'Book a consultation',
  ];

  const handleQuickReply = (reply: string) => {
    const name = session?.visitorName || 'Visitor';
    sendMessage(reply, name);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/9851352807"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-shadow"
      >
        <FaWhatsapp className="w-8 h-8 text-white" />
      </motion.a>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-shadow"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-orange rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-purple to-primary-purple-light p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Bravo Team</h3>
                    <div className="flex items-center space-x-1 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Online - Real-time chat</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-primary-purple animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Start a conversation with us!</p>
                  <p className="text-sm mt-2">We're here to help with your study abroad journey.</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.$id || `msg-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 flex ${message.isFromAdmin ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.isFromAdmin
                            ? 'bg-white text-gray-800 rounded-bl-none shadow-md'
                            : 'bg-primary-purple text-white rounded-br-none'
                        }`}
                      >
                        {message.isFromAdmin && (
                          <p className="text-xs font-semibold text-primary-purple mb-1">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
                        <p className={`text-xs mt-1 ${message.isFromAdmin ? 'text-gray-500' : 'text-white/70'}`}>
                          {new Date(message.timestamp).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isAdminTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 flex justify-start"
                    >
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-md rounded-bl-none">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-primary-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-xs text-gray-600">Bravo Team is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}

              {/* Quick Replies - Show only if no messages yet */}
              {!loading && messages.length === 0 && !showForm && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-500 mb-2">Quick options:</p>
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block w-full text-left px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm text-gray-700 border border-gray-200"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Contact Form */}
              {showForm && (
                <motion.form
                  onSubmit={handleSubmitDetails}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-xl shadow-md mt-4"
                >
                  <h4 className="font-bold text-gray-800 mb-3">Share Your Details</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Your Name *"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple text-black placeholder:text-gray-500"
                    />
                    <input
                      type="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="Email Address *"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple text-black placeholder:text-gray-500"
                    />
                    <input
                      type="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple text-black placeholder:text-gray-500"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Start Chatting
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={session?.visitorName ? "Type your message..." : "Click here to start..."}
                  onFocus={() => {
                    if (!session?.visitorName) {
                      setShowForm(true);
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple text-black placeholder:text-gray-500"
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!session?.visitorName || !inputMessage.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-full flex items-center justify-center text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {session?.visitorName ? `Chatting as ${session.visitorName}` : 'Share your details to start chatting'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
