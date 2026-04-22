// src/app/partners/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Award, 
  Shield,
  Server,
  Network,
  Cloud,
  FileText,
  ArrowRight,
  CheckCircle,
  Zap,
  Building2,
  Cpu
} from 'lucide-react';
import Image from 'next/image';
import CTASection from '@/components/CTASection/CTASection';
import WhatsAppFloating from '@/components/WhatsAppFloating/WhatsAppFloating';
import TelegramFloating from '@/components/TelegramFloating/TelegramFloating';
import ScheduleConsultation from '@/components/ScheduleConsultation/ScheduleConsultation';
import PartnerPopup from '@/components/PartnerPopup/PartnerPopup';

// Partner logos data - Updated with correct paths
const partnerLogos = [
  // Network & Infrastructure
  { id: 4, name: 'Dell', logo: '/assets/images/logos/Partners Logo/Dell_EMC_logo.svg.png' },
  { id: 5, name: 'Lenovo', logo: '/assets/images/logos/Partners Logo/Lenovo_Global_Corporate_Logo.png' },
  { id: 9, name: 'Schneider (APC)', logo: '/assets/images/logos/Partners Logo/APC-logo.svg.png' },
  
  // Cybersecurity
  { id: 11, name: 'Fortinet', logo: '/assets/images/logos/Partners Logo/Fortinet_logo.svg.png' },
  { id: 12, name: 'Check Point', logo: '/assets/images/logos/Partners Logo/Check_Point_logo_2022.svg.png' },
  
  // Software & Cloud
  { id: 20, name: 'Veeam', logo: '/assets/images/logos/Partners Logo/Veeam_Logo_Bounce_Oct23.png' },
  
  // Surveillance & Access Control
  { id: 24, name: 'Hikvision', logo: '/assets/images/logos/Partners Logo/Hikvision_logo.svg.png' },
  
  // Telecommunications
  { id: 27, name: 'Huawei', logo: '/assets/images/logos/Partners Logo/Logo-huawei-vector-transparent-PNG (1).png' },
];

// Specialized tier partners
const tierPartners = [
  {
    category: 'Core Infrastructure',
    icon: Server,
    partners: 'Dell, Lenovo, Schneider (APC)',
    description: 'Robust, tier-compliant data centers'
  },
  {
    category: 'Networking & Cloud',
    icon: Network,
    partners: 'Huawei, Veeam, Check Point',
    description: 'Secure, high-speed connectivity solutions'
  },
  {
    category: 'Security & Software',
    icon: Shield,
    partners: 'Fortinet, Check Point, Hikvision',
    description: 'National-scale data protection and management'
  }
];

export default function PartnersPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPartnerPopupOpen, setIsPartnerPopupOpen] = useState(false);

  const handleConsultationOpen = () => {
    setIsConsultationOpen(true);
  };

  const handleConsultationClose = () => {
    setIsConsultationOpen(false);
  };

  const handlePartnerClick = () => {
    setIsPartnerPopupOpen(true);
  };

  const handlePartnerClose = () => {
    setIsPartnerPopupOpen(false);
  };

  return (
    <>
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero/partners-hero.webp"
            alt="Global Technology Partnerships"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 mb-4"
            >
              <span className="text-sm font-semibold tracking-wider text-white/80">
                GLOBAL ECOSYSTEM
              </span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-[#e65225]">
                LOCAL INTEGRATION
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              World-Class Tech, Delivered with Local Expertise.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              We have curated an elite network of global technology vendors to ensure that Ethiopian enterprises have access to the same caliber of innovation as the world&apos;s leading organizations. Our role is to bridge the gap: providing the global tools you need with the local support you deserve.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-8 mt-10"
            >
<div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#e65225]">8+</div>
                  <div className="text-sm md:text-base text-white/80">Global Partners</div>
                </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#e65225]">100%</div>
                <div className="text-sm md:text-base text-white/80">Certified Engineers</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#e65225]">24/7</div>
                <div className="text-sm md:text-base text-white/80">Local Support</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Section 2: The Partnership Advantage */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Strategic Alliances for High-Impact Delivery.
              </h2>
              
              <p className="font-body text-lg text-gray-600 mb-8 leading-relaxed">
                Our partnership ecosystem isn&apos;t just a list of logos; it is a collaborative engineering framework. We work directly with vendor R&D teams to ensure their products are optimized for the Ethiopian regulatory and technical landscape.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Award size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Certified Implementation
                    </h3>
                    <p className="font-body text-gray-600">
                      Our engineers hold top-tier certifications (CCNP, HCIE, etc.) in partner technologies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Zap size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Direct Access
                    </h3>
                    <p className="font-body text-gray-600">
                      Expedited hardware procurement and priority technical support for our clients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Users size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Knowledge Localization
                    </h3>
                    <p className="font-body text-gray-600">
                      We translate global best practices into local operational success.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border border-gray-200 flex items-center justify-center"
            >
              {/* Network Visualization */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Node - BelayAb Tech */}
                <div className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-r from-[#e65225] to-orange-500 flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white p-4">
                    <Building2 size={32} className="mx-auto mb-2" />
                    <span className="font-bold text-sm">BelayAb<br />Team Tech</span>
                  </div>
                </div>
                
                {/* Connecting Lines */}
                <div className="absolute inset-0">
                  {[0, 90, 180, 270].map((angle) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-48 h-1 bg-gray-300 origin-left"
                      style={{
                        transform: `rotate(${angle}deg) translateX(60px)`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Partner Nodes */}
                {[
                  { angle: 45, name: 'Fortinet', color: 'bg-blue-500' },
                  { angle: 135, name: 'Huawei', color: 'bg-red-500' },
                  { angle: 225, name: 'Dell', color: 'bg-blue-600' },
                  { angle: 315, name: 'Hikvision', color: 'bg-red-600' },
                ].map((partner) => (
                  <div
                    key={partner.name}
                    className={`absolute w-20 h-20 rounded-full ${partner.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}
                    style={{
                      top: `calc(50% + ${Math.sin(partner.angle * (Math.PI / 180)) * 200}px)`,
                      left: `calc(50% + ${Math.cos(partner.angle * (Math.PI / 180)) * 200}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {partner.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Specialized Tier Partners */}
      <section className="section-padding bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Specialized Tier Partnerships
            </h2>
            <p className="font-body text-lg text-slate-300 max-w-2xl mx-auto">
              Strategic collaborations across technology domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tierPartners.map((tier, index) => (
              <motion.div
                key={tier.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-6">
                  <tier.icon size={28} className="text-[#e65225]" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  {tier.category}
                </h3>
                
                <p className="font-body text-slate-300 mb-4">
                  <span className="font-semibold text-white">Partners:</span> {tier.partners}
                </p>
                
                <p className="font-body text-slate-300">
                  {tier.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Partner Showcase Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
<h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Industry-Leading Partners
             </h2>
             <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
               Strategic partnerships with global technology leaders that power BelayAb Team Technologies.
             </p>
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {partnerLogos.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-6 border border-gray-200 hover:shadow-xl hover:border-[#e65225]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100px, 150px"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certification Badges */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Certified Excellence
              </h3>
              <p className="font-body text-gray-600 max-w-2xl mx-auto">
                Our team maintains the highest level of certifications across all partner technologies
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {['CCNP', 'HCIE', 'AWS Certified', 'Microsoft Certified', 'VMware VCP', 'Fortinet NSE'].map((cert) => (
                <div
                  key={cert}
                  className="px-6 py-3 bg-gray-50 rounded-full border border-gray-200 flex items-center gap-2"
                >
                  <CheckCircle size={16} className="text-[#e65225]" />
                  <span className="font-medium text-gray-800">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="section-padding bg-gradient-to-r from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Become Part of the Ecosystem
            </h2>
            
            <p className="font-body text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Whether you are an enterprise seeking a solution or a vendor looking for a strategic local partner, we are ready to collaborate.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePartnerClick}
                className="group px-8 py-4 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Users className="mr-3" size={20} />
                <span>Partner with Us</span>
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultationOpen}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FileText className="mr-3" size={20} />
                <span>View Technical Certifications</span>
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Update CTASection to pass the handler */}
      <CTASection onConsultationClick={handleConsultationOpen} />
      
      {/* Floating Buttons */}
      <TelegramFloating />
      <WhatsAppFloating />
      
      {/* Popups */}
      <ScheduleConsultation 
        isOpen={isConsultationOpen}
        onClose={handleConsultationClose}
      />
      
      <PartnerPopup 
        isOpen={isPartnerPopupOpen}
        onClose={handlePartnerClose}
      />
    </>
  );
}