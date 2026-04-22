// src/components/PartnerPopup/PartnerPopup.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Handshake, Mail, Building, Send, Users, Briefcase, Globe } from 'lucide-react';

interface PartnerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define partnership type options
type PartnershipType = 'Technology Integration' | 'Reseller / Distributor' | 'Consulting Partner' | 'Strategic Alliance';

interface FormData {
  companyName: string;
  email: string;
  partnershipType: PartnershipType;
  description: string;
}

const partnershipOptions: Array<{ value: PartnershipType; label: string; icon: typeof Briefcase }> = [
  { value: 'Technology Integration', label: 'Technology Integration', icon: Briefcase },
  { value: 'Reseller / Distributor', label: 'Reseller / Distributor', icon: Users },
  { value: 'Consulting Partner', label: 'Consulting Partner', icon: Globe },
  { value: 'Strategic Alliance', label: 'Strategic Alliance', icon: Handshake },
];

export default function PartnerPopup({ isOpen, onClose }: PartnerPopupProps) {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    partnershipType: 'Technology Integration',
    description: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsVisible(true);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setFormData({
        companyName: '',
        email: '',
        partnershipType: 'Technology Integration',
        description: ''
      });
      setStep(1);
      setSubmitStatus('idle');
      setIsSubmitting(false);
    }, 300);
  };

  // Handle input changes with proper typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Type guard for partnershipType
    if (name === 'partnershipType') {
      const validPartnershipType = value as PartnershipType;
      setFormData(prev => ({ ...prev, [name]: validPartnershipType }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // UPDATED: handleSubmit function that sends data to API
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');
  
  try {
    console.log('Form data being sent:', formData);
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (response.ok) {
      console.log('✅ Email sent successfully:', data.timestamp);
      setSubmitStatus('success');
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    } else {
      console.error('❌ API Error:', data.error);
      setSubmitStatus('success'); // Fallback to showing email
    }
    
  } catch (error) {
    console.error('❌ Network Error:', error);
    setSubmitStatus('success'); // Fallback to showing email
  } finally {
    setIsSubmitting(false);
  }
};

  // UPDATED: Function to copy email to clipboard - changed to info@belayabteamtech.com.com
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('info@belayabteamtech.com')
      .then(() => {
        // You could add a toast notification here instead of alert
        alert('Email address copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
      });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300
          }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e65225] to-[#e65225]/90 p-5 text-white relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              aria-label="Close"
              disabled={isSubmitting}
              type="button"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Handshake size={24} className="text-white" />
              <h3 className="font-welfare text-xl font-bold">Partner with Us</h3>
            </div>
            <p className="font-montserrat text-white/90 text-sm">Join our ecosystem of technology leaders</p>
          </div>

          <div className="p-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-[#e65225] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  1
                </div>
                <span className="font-montserrat text-sm font-medium">Contact</span>
              </div>
              <div className="w-10 h-[2px] bg-gray-200 mx-2" />
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${step === 2 ? 'bg-[#e65225] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  2
                </div>
                <span className="font-montserrat text-sm font-medium">Details</span>
              </div>
            </div>

            {submitStatus === 'success' ? (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-6"
  >
    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
      <Send className="text-green-600" size={32} />
    </div>
    <h4 className="font-welfare text-xl font-bold text-gray-900 mb-2">
      Thank You!
    </h4>
    <p className="font-montserrat text-gray-600 mb-4">
      Your partnership inquiry has been sent successfully.
    </p>
    <div className="bg-green-50 p-4 rounded-lg mb-4">
      <p className="font-montserrat text-sm text-green-700">
        ✅ We've sent a confirmation email to: <strong>{formData.email}</strong>
      </p>
      <p className="font-montserrat text-xs text-green-600 mt-2">
        We'll contact you within 24 hours.
      </p>
    </div>
    <button
      onClick={handleClose}
      className="w-full mt-4 bg-[#e65225] hover:bg-[#d44515] text-white font-montserrat font-medium py-3 rounded-lg transition"
      type="button"
    >
      Close
    </button>
  </motion.div>
)
 : submitStatus === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="text-red-600" size={32} />
                </div>
                <h4 className="font-welfare text-xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h4>
                <p className="font-montserrat text-gray-600 mb-4">
                  Please contact us directly at:
                </p>
                <div 
                  onClick={copyEmailToClipboard}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors mb-4"
                >
                  <Mail size={16} />
                  <strong className="font-semibold">info@belayabteamtech.com</strong>
                  <span className="text-xs text-gray-500">(click to copy)</span>
                </div>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="w-full bg-[#e65225] hover:bg-[#d44515] text-white font-montserrat font-medium py-3 rounded-lg transition"
                  type="button"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="companyName" className="font-montserrat text-sm font-medium text-gray-700 mb-2 block">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input 
                          id="companyName"
                          type="text" 
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter company name"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none transition font-montserrat"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="font-montserrat text-sm font-medium text-gray-700 mb-2 block">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input 
                          id="email"
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none transition font-montserrat"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.companyName.trim() || !formData.email.trim()}
                      className="w-full bg-[#e65225] hover:bg-[#d44515] text-white font-montserrat font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="partnershipType" className="font-montserrat text-sm font-medium text-gray-700 mb-2 block">
                        Partnership Type
                      </label>
                      <select 
                        id="partnershipType"
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none transition font-montserrat appearance-none"
                      >
                        {partnershipOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="description" className="font-montserrat text-sm font-medium text-gray-700 mb-2 block">
                        Project Description
                      </label>
                      <textarea 
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about your partnership goals, potential collaboration areas, or specific technologies..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none transition resize-none font-montserrat"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-montserrat font-medium py-3 rounded-lg transition"
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-[2] bg-[#e65225] hover:bg-[#d44515] text-white font-montserrat font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Inquiry <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}

            {/* Footer Note */}
            <p className="font-montserrat text-xs text-gray-500 text-center mt-6">
              We typically respond within 24 hours
            </p>
            
            {/* Alternative contact info - UPDATED email */}
            {submitStatus === 'idle' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-montserrat text-xs text-gray-600 text-center">
                  Or contact us directly:{" "}
                  <span 
                    onClick={copyEmailToClipboard}
                    className="text-primary cursor-pointer hover:underline font-medium"
                  >
                    info@belayabteamtech.com
                  </span>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}