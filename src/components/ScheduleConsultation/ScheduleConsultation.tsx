// src/components/ScheduleConsultation/ScheduleConsultation.tsx
"use client";
import React, { useState, FormEvent, ChangeEvent, KeyboardEvent } from 'react'; // ADD THESE IMPORTS
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Building, Mail, Phone, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

interface ScheduleConsultationProps {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string; // Optional: Pre-select a service
}

type ConsultationType = 'Technical Consultation' | 'Solution Blueprint' | 'Project Discovery' | 'Partnership Meeting';

const consultationTypes: ConsultationType[] = [
  'Technical Consultation',
  'Solution Blueprint', 
  'Project Discovery',
  'Partnership Meeting'
];

const availableTimes = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const availableDates = [
  'Monday, March 10',
  'Tuesday, March 11', 
  'Wednesday, March 12',
  'Thursday, March 13',
  'Friday, March 14',
  'Monday, March 17'
];

// Define the form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  consultationType: ConsultationType;
  date: string;
  time: string;
  projectDescription: string;
  challenges: string;
  budgetRange: string;
  timeline: string;
}

export default function ScheduleConsultation({ isOpen, onClose, presetService }: ScheduleConsultationProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    consultationType: (presetService as ConsultationType) || 'Technical Consultation',
    date: availableDates[0],
    time: availableTimes[0],
    projectDescription: '',
    challenges: '',
    budgetRange: '',
    timeline: ''
  });

  // FIXED: Properly typed event handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  // FIXED: Properly typed form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to your API
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setStep(1);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            consultationType: 'Technical Consultation',
            date: availableDates[0],
            time: availableTimes[0],
            projectDescription: '',
            challenges: '',
            budgetRange: '',
            timeline: ''
          });
        }, 3000);
      } else {
        console.error('Submission failed');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isSubmitted) {
      onClose();
    }
  };

  // FIXED: Properly typed key press handler
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Only submit if we're on the last step
      if (step === 3 && formData.projectDescription.trim()) {
        const form = e.currentTarget.closest('form');
        if (form) {
          // Create a submit event
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          form.dispatchEvent(submitEvent);
        }
      }
    }
  };

  // Helper function to handle step button clicks
  const handleStepButtonClick = (type: ConsultationType) => {
    setFormData(prev => ({ ...prev, consultationType: type }));
  };

  // Helper function to handle date selection
  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
  };

  // Helper function to handle time selection
  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#e65225] to-[#d44515] p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Calendar size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">Schedule Technical Consultation</h2>
                    <p className="text-white/90">Get expert guidance for your digital transformation</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
                  disabled={isSubmitting}
                  type="button"
                  aria-label="Close modal" // ADD THIS // FIXED: Added type="button"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center flex-1">
                    <div className={`flex flex-col items-center ${step >= stepNumber ? 'text-white' : 'text-white/40'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= stepNumber ? 'border-white bg-white/20' : 'border-white/30'}`}>
                        {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
                      </div>
                      <span className="text-xs mt-2">
                        {stepNumber === 1 && 'Details'}
                        {stepNumber === 2 && 'Schedule'}
                        {stepNumber === 3 && 'Project'}
                      </span>
                    </div>
                    {stepNumber < 3 && (
                      <div className={`flex-1 h-0.5 mx-4 ${step > stepNumber ? 'bg-white' : 'bg-white/30'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Consultation Scheduled!</h3>
                  <p className="text-gray-600 mb-6">
                    We've sent a calendar invite to <strong>{formData.email}</strong>
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
                    <p className="font-semibold text-gray-900">Your Consultation Details:</p>
                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                      <p>📅 <strong>Date:</strong> {formData.date}</p>
                      <p>⏰ <strong>Time:</strong> {formData.time}</p>
                      <p>📞 <strong>Type:</strong> {formData.consultationType}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-6">Our technical team will contact you shortly to confirm details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <User size={16} />
                            Full Name *
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Building size={16} />
                            Company/Organization *
                          </label>
                          <input
                            id="company"
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Mail size={16} />
                            Work Email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Phone size={16} />
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Consultation Type *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {consultationTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleStepButtonClick(type)}
                              className={`p-3 rounded-lg border text-sm font-medium transition ${formData.consultationType === type ? 'border-[#e65225] bg-[#e65225]/10 text-[#e65225]' : 'border-gray-300 hover:border-gray-400'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          disabled={!formData.name || !formData.email || !formData.phone || !formData.company}
                          className="bg-[#e65225] hover:bg-[#d44515] text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-gray-900">Select Date & Time</h3>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Note:</strong> All consultations are conducted via Microsoft Teams or Zoom.
                          A calendar invite will be sent to your email.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Calendar className="inline mr-2" size={16} />
                            Preferred Date *
                          </label>
                          <div className="space-y-2">
                            {availableDates.map((date) => (
                              <button
                                key={date}
                                type="button"
                                onClick={() => handleDateSelect(date)}
                                className={`w-full p-3 rounded-lg border text-left ${formData.date === date ? 'border-[#e65225] bg-[#e65225]/10 text-[#e65225]' : 'border-gray-300 hover:border-gray-400'}`}
                              >
                                {date}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            <Clock className="inline mr-2" size={16} />
                            Preferred Time (EAT) *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`p-3 rounded-lg border text-center ${formData.time === time ? 'border-[#e65225] bg-[#e65225]/10 text-[#e65225]' : 'border-gray-300 hover:border-gray-400'}`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="bg-[#e65225] hover:bg-[#d44515] text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2"
                        >
                          Continue
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
                      
                      <div>
                        <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
                          <MessageSquare className="inline mr-2" size={16} />
                          Brief Project Description *
                        </label>
                        <textarea
                          id="projectDescription"
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyPress}
                          rows={3}
                          placeholder="Describe your project goals, challenges, and desired outcomes..."
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-2">
                          Main Challenges / Pain Points
                        </label>
                        <textarea
                          id="challenges"
                          name="challenges"
                          value={formData.challenges}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="What specific problems are you trying to solve?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none resize-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Budget Range
                          </label>
                          <select
                            id="budgetRange"
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          >
                            <option value="">Select range</option>
                            <option value="Under $50,000">Under $50,000</option>
                            <option value="$50,000 - $200,000">$50,000 - $200,000</option>
                            <option value="$200,000 - $500,000">$200,000 - $500,000</option>
                            <option value="$500,000 - $1M">$500,000 - $1M</option>
                            <option value="Over $1M">Over $1M</option>
                            <option value="To be determined">To be determined</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                            Project Timeline
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225]/50 focus:border-[#e65225] outline-none"
                          >
                            <option value="">Select timeline</option>
                            <option value="Immediate (1-3 months)">Immediate (1-3 months)</option>
                            <option value="Short-term (3-6 months)">Short-term (3-6 months)</option>
                            <option value="Medium-term (6-12 months)">Medium-term (6-12 months)</option>
                            <option value="Long-term (12+ months)">Long-term (12+ months)</option>
                            <option value="Exploratory phase">Exploratory phase</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">What to Expect:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>✓ 45-minute consultation with our technical experts</li>
                          <li>✓ Assessment of your requirements</li>
                          <li>✓ Preliminary solution architecture discussion</li>
                          <li>✓ Next steps and proposal timeline</li>
                          <li>✓ No obligation or commitment required</li>
                        </ul>
                      </div>

                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.projectDescription.trim()}
                          className="bg-[#e65225] hover:bg-[#d44515] text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Scheduling...
                            </>
                          ) : (
                            <>
                              <Calendar size={18} />
                              Schedule Consultation
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}