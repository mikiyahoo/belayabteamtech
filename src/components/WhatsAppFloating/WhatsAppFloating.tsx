// src/components/WhatsAppFloating/WhatsAppFloating.tsx
"use client";
import React, { useState } from 'react';
import { MessageCircle, X, Phone, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your WhatsApp number
  const yourWhatsAppNumber = '251970819403'; // +251970819403 without +

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    
    // Format for Ethiopia: 251 XX XXX XXXX
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `251 ${numbers.slice(3)}`;
    } else if (numbers.length <= 8) {
      return `251 ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
    } else {
      return `251 ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8, 12)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const openWhatsApp = () => {
    if (!phoneNumber.trim()) {
      alert('Please enter your WhatsApp number');
      return;
    }

    setIsSubmitting(true);

    // Clean phone number for WhatsApp
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Format message
    const whatsappMessage = encodeURIComponent(
      `Hello BelayAb Team! 👋\n\n` +
      `*Name:* ${name || 'Not provided'}\n` +
      `*Phone:* ${phoneNumber}\n` +
      `*Message:* ${message || 'I would like to discuss partnership opportunities.'}\n\n` +
      `---\n` +
      `_Sent via BelayAb Team Technologies Website_`
    );

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${yourWhatsAppNumber}?text=${whatsappMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset after a delay
    setTimeout(() => {
      setPhoneNumber('');
      setName('');
      setMessage('');
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      openWhatsApp();
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button - Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1da851] transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce-slow"
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle size={28} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
        
        {/* Tooltip on hover */}
        <div className="absolute right-16 bottom-1/2 translate-y-1/2 bg-gray-900 text-white text-sm font-montserrat py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Send Message on WhatsApp
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900" />
        </div>
      </button>

      {/* WhatsApp Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-4 md:items-center md:justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
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
              <div className="bg-gradient-to-r from-[#25D366] to-[#1da851] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={28} />
                    <div>
                      <h3 className="font-bold text-xl">WhatsApp Chat</h3>
                      <p className="text-sm opacity-90">Chat directly with our team</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="mt-3 bg-white/10 p-3 rounded-lg">
                  <p className="text-sm">
                    📱 Message will be sent to: <strong>+251 970 819 403</strong>
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="text-[#25D366]" />
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366] outline-none transition font-montserrat"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="text-[#25D366]" />
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="251 97 081 9403"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366] outline-none transition font-montserrat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Hello BelayAb Team! I'm interested in your services and would like to discuss partnership opportunities..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366] outline-none transition font-montserrat resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Press <kbd className="px-1 py-0.5 bg-gray-100 rounded border">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-gray-100 rounded border">Shift + Enter</kbd> for new line
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-gray-200">
                <button
                  onClick={openWhatsApp}
                  disabled={isSubmitting || !phoneNumber.trim()}
                  className="w-full bg-[#25D366] hover:bg-[#1da851] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Open WhatsApp Chat
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                  You'll be redirected to WhatsApp to send the message
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}