// src/components/TelegramFloating/TelegramFloating.tsx
"use client";
import React, { useState } from 'react';
import { Send, X, User, Mail, Phone, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TelegramFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendToTelegram = async () => {
    if (!message.trim()) {
      alert('Please enter your message');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to your API route
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: 'website_floating_button',
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Telegram message sent successfully:', data.messageId);
        setSubmitStatus('success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
          resetForm();
          setIsOpen(false);
        }, 2000);
      } else {
        console.error('❌ Telegram API error:', data);
        setSubmitStatus('error');
        alert('Failed to send message. Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setSubmitStatus('error');
      alert('Network error. Please try again or use WhatsApp instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitStatus('idle');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendToTelegram();
    }
  };

  return (
    <>
      {/* Floating Telegram Button - Above WhatsApp */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-[#0088cc] text-white p-4 rounded-full shadow-2xl hover:bg-[#0077b3] transition-all duration-300 hover:scale-110 active:scale-95 group animate-pulse-slow"
        aria-label="Send message via Telegram"
      >
        <Send size={28} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
        
        {/* Tooltip */}
        <div className="absolute right-16 bottom-1/2 translate-y-1/2 bg-gray-900 text-white text-sm font-montserrat py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Send Message via Telegram
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
        </div>
      </button>

      {/* Telegram Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-4 md:items-center md:justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0088cc] to-[#006699] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Send size={28} />
                    <div>
                      <h3 className="font-bold text-xl">Telegram Message</h3>
                      <p className="text-sm opacity-90">Send message directly to our team</p>
                    </div>
                  </div>
                  <button
                    onClick={() => !isSubmitting && setIsOpen(false)}
                    disabled={isSubmitting}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition disabled:opacity-50"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Send className="text-green-500" size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-green-700 font-medium">
                        Message sent successfully!
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        Our team will respond soon. Closing automatically...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <X className="text-red-500" size={20} />
                    </div>
                    <div className="ml-3">
                      <p className="text-red-700 font-medium">
                        Failed to send message
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        Please try again or use WhatsApp instead.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              {submitStatus !== 'success' && (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="text-[#0088cc]" />
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc]/50 focus:border-[#0088cc] outline-none transition font-montserrat disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="text-[#0088cc]" />
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc]/50 focus:border-[#0088cc] outline-none transition font-montserrat disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="text-[#0088cc]" />
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+251 97 081 9403"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc]/50 focus:border-[#0088cc] outline-none transition font-montserrat disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Hello BelayAb Team! I'm interested in your services..."
                        rows={4}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0088cc]/50 focus:border-[#0088cc] outline-none transition font-montserrat resize-none disabled:opacity-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded border">Enter</kbd> to send
                      </p>
                    </div>
                  </div>
                  {/* Action Button */}
                  <div className="p-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={sendToTelegram}
                      disabled={isSubmitting || !message.trim()}
                      className="w-full bg-[#0088cc] hover:bg-[#0077b3] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message via Telegram
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}