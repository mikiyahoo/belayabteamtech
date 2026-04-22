// src/app/page.tsx
"use client"; // ADD THIS - makes it a client component

import { useState } from 'react'; // ADD THIS
import HeroSection from '../components/HeroSection/HeroSection';
import TrustBar from '../components/TrustBar/TrustBar';
import IndustriesGrid from '../components/IndustriesGrid/IndustriesGrid';
import SolutionsGrid from '../components/SolutionsGrid/SolutionsGrid';
import CTASection from '../components/CTASection/CTASection';
import PartnersSection from '../components/PartnersSection/PartnersSection';
import WhatsAppFloating from '../components/WhatsAppFloating/WhatsAppFloating';
import TelegramFloating from '@/components/TelegramFloating/TelegramFloating';
import ScheduleConsultation from '../components/ScheduleConsultation/ScheduleConsultation'; // ADD THIS
import PartnerPopup from '../components/PartnerPopup/PartnerPopup'; // ADD THIS if you also want PartnerPopup here

export default function Home() {
  // ADD THESE STATES
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPartnerPopupOpen, setIsPartnerPopupOpen] = useState(false);

  const handleConsultationOpen = () => {
    setIsConsultationOpen(true);
  };

  const handleConsultationClose = () => {
    setIsConsultationOpen(false);
  };

  return (
    <>
      <HeroSection />
      <IndustriesGrid />
      {/* Section 2: Built on Institutional Trust */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl mb-6">
                Built on Institutional Trust.
              </h2>
              <p className="font-body text-lg text-gray-700 mb-8">
                As a key player in the Ethiopian economy, BelayAb Team Technologies combines the logistical might of the BelayAb Group with world-class engineering expertise. We aren&apos;t just a vendor; we are a strategic national partner.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900">
                      Platinum Taxpayer Status
                    </h4>
                    <p className="font-body text-gray-600">
                      A testament to our transparency and commitment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900">
                      Local Expertise
                    </h4>
                    <p className="font-body text-gray-600">
                      Certified Ethiopian engineers with global insights.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900">
                      Turnkey Delivery
                    </h4>
                    <p className="font-body text-gray-600">
                      From civil works to AI-driven insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Placeholder for Visual */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary" />
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  8+ Global Partners
                </h3>
                <p className="font-body text-gray-600">
                  Working with world-leading technology innovators
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SolutionsGrid />
      
      {/* Update CTASection to pass the handler */}
      <CTASection onConsultationClick={handleConsultationOpen} />
      
      <PartnersSection />
      
      {/* Telegram Button (Above WhatsApp) */}
      <TelegramFloating />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloating />
      
      {/* Schedule Consultation Popup */}
      <ScheduleConsultation 
        isOpen={isConsultationOpen}
        onClose={handleConsultationClose}
      />
    </>
  );
}