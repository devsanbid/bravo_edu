'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! 👋 Welcome to Bravo International. How can we help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const quickReplies = [
    'I want to study in UK',
    'I want to study in USA',
    'I want to study in Canada',
    'Tell me about your services',
    'Book a consultation',
  ];

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
    
    // Bot responses based on quick reply
    setTimeout(() => {
      let botResponse = '';
      if (reply.includes('UK')) {
        botResponse = "Great choice! 🇬🇧 The UK offers world-class education with over 150+ universities. We have 15+ years of experience helping students get into top UK universities. Would you like to book a free consultation?";
      } else if (reply.includes('USA')) {
        botResponse = "Excellent! 🇺🇸 The USA is home to many prestigious universities including the Ivy League. We provide complete guidance for US admissions. Shall we schedule a consultation to discuss your options?";
      } else if (reply.includes('Canada')) {
        botResponse = "Perfect! 🇨🇦 Canada offers quality education with PR pathways. We have helped 500+ students successfully. Would you like to speak with one of our counselors?";
      } else if (reply.includes('services')) {
        botResponse = "Our services include:\n✅ Free counseling\n✅ University selection\n✅ Test preparation (IELTS, PTE, etc.)\n✅ Documentation support\n✅ Visa assistance\n✅ Post-arrival support\n\nWhich service are you most interested in?";
      } else if (reply.includes('consultation')) {
        botResponse = "I'd love to connect you with our expert counselors! Please share your contact details and we'll get back to you within 24 hours.";
        setShowForm(true);
      }
      
      addBotMessage(botResponse);
    }, 1000);
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage.trim();
    if (!messageText) return;

    const newMessage = {
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const addBotMessage = (text: string) => {
    const botMessage = {
      sender: 'bot',
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">Bravo Assistant</h3>
                  <div className="flex items-center space-x-1 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online - We reply instantly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary-purple text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Quick Replies */}
              {messages.length === 1 && (
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-xl shadow-md mt-4"
                >
                  <h4 className="font-bold text-gray-800 mb-3">Share Your Details</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-3 py-2  text-black border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
                    />
                    <button className="w-full bg-gradient-to-r from-primary-purple to-primary-purple-light text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                      Submit
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple text-back"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-r from-primary-purple to-primary-purple-light rounded-full flex items-center justify-center text-white"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Our office: Putalisadak Chowk, Kathmandu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
