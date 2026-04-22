// src/app/solutions/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Zap, 
  Landmark, 
  Building2, 
  HeartPulse, 
  Sprout,
  ArrowRight,
  FileText,
  BookOpen,
  Network,
  Server,
  Eye,
  Sun,
  Lightbulb
} from 'lucide-react';
import Image from 'next/image';
import CTASection from '@/components/CTASection/CTASection';
import WhatsAppFloating from '@/components/WhatsAppFloating/WhatsAppFloating';
import TelegramFloating from '@/components/TelegramFloating/TelegramFloating';
import ScheduleConsultation from '@/components/ScheduleConsultation/ScheduleConsultation';

export default function SolutionsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleConsultationOpen = () => {
    setIsConsultationOpen(true);
  };

  const handleConsultationClose = () => {
    setIsConsultationOpen(false);
  };

  return (
    <>
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero/solutions-hero.webp"
            alt="Scaled Technology Solutions"
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
                TURNKEY TECHNOLOGY
              </span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-[#e65225]">
                END-TO-END DELIVERY
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              Scaled for National Challenges.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              We provide high-performance ICT solutions that enable Government, Finance, and Industrial sectors to modernize their operations. From foundational infrastructure to advanced AI-driven software, our solutions are architected for security, reliability, and growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative flex items-center text-lg tracking-wide">
                  Explore Our Solutions
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={22} />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConsultationOpen}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative flex items-center text-lg tracking-wide">
                  Request Consultation
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={22} />
                </span>
                <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Section 2: Core Capability Pillars */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Digital Transformation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-4">
                  <Cpu size={28} className="text-[#e65225]" />
                </div>
                
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                  Digital Transformation & Software
                </h2>
                
                <p className="font-body text-lg text-gray-600 mb-8">
                  We empower government efficiency through custom software ecosystems and automated workflows.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      Enterprise Resource Planning (ERP)
                    </h4>
                    <p className="font-body text-gray-600">
                      Customized ERP systems for streamlined operations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      Custom Government Portals
                    </h4>
                    <p className="font-body text-gray-600">
                      Secure digital platforms for citizen services
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      AI & Data Analytics Platforms
                    </h4>
                    <p className="font-body text-gray-600">
                      Intelligent insights for data-driven decision making
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Infrastructure & Security */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-4">
                  <Shield size={28} className="text-[#e65225]" />
                </div>
                
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                  Infrastructure & Security
                </h2>
                
                <p className="font-body text-lg text-gray-600 mb-8">
                  Protecting national data sovereignty with tier-compliant facilities and proactive defense.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      Tier III Data Center Design
                    </h4>
                    <p className="font-body text-gray-600">
                      High-availability infrastructure for mission-critical operations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      Cybersecurity & Threat Intelligence
                    </h4>
                    <p className="font-body text-gray-600">
                      Proactive defense against evolving cyber threats
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#e65225]/10 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#e65225]" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900 mb-1">
                      High-Speed Optical Networking
                    </h4>
                    <p className="font-body text-gray-600">
                      Scalable connectivity for digital transformation
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Specialized Smart Systems */}
      <section className="section-padding bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Innovation for a Greener Growth.
            </h2>
            <div className="h-1.5 w-24 bg-[#e65225] mx-auto rounded-full mb-8" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-lg text-slate-300 leading-relaxed mb-8">
                BelayAb Tech integrates hardware and software to create intelligent physical environments. Our smart systems are designed to reduce operational costs while enhancing public safety and energy efficiency.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Lightbulb size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      Smart Grid Solutions
                    </h3>
                    <p className="font-body text-slate-300">
                      Intelligent public lighting and IoT-enabled utility management.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Sun size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      Renewable Energy
                    </h3>
                    <p className="font-body text-slate-300">
                      Industrial-scale solar power solutions for mission-critical facilities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Eye size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">
                      Security Systems
                    </h3>
                    <p className="font-body text-slate-300">
                      AI-enhanced surveillance and building management systems (BMS).
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
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/hero/smart-systems.webp"
                alt="Smart Systems Integration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="font-heading text-2xl font-bold mb-2">
                    IoT-Enabled Solutions
                  </h3>
                  <p className="font-body text-white/80">
                    Connecting physical infrastructure with digital intelligence
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Industries We Serve */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              Tailored Technology for Every Sector.
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized solutions designed to meet the unique challenges of each industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Banking & Finance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-6">
                <Landmark size={28} className="text-[#e65225]" />
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Banking & Finance
              </h3>
              
              <p className="font-body text-gray-600 mb-6">
                High-performance core banking infrastructure with advanced security protocols.
              </p>
              
              <div className="text-sm font-medium text-[#e65225] flex items-center gap-2">
                Learn more
                <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Public Sector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-6">
                <Building2 size={28} className="text-[#e65225]" />
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Public Sector
              </h3>
              
              <p className="font-body text-gray-600 mb-6">
                Digital government platforms and national security tools for public institutions.
              </p>
              
              <div className="text-sm font-medium text-[#e65225] flex items-center gap-2">
                Learn more
                <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Healthcare */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-6">
                <HeartPulse size={28} className="text-[#e65225]" />
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Healthcare
              </h3>
              
              <p className="font-body text-gray-600 mb-6">
                Integrated health management systems and telemedicine platforms.
              </p>
              
              <div className="text-sm font-medium text-[#e65225] flex items-center gap-2">
                Learn more
                <ArrowRight size={16} />
              </div>
            </motion.div>

            {/* Agriculture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[#e65225]/10 flex items-center justify-center mb-6">
                <Sprout size={28} className="text-[#e65225]" />
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                Agriculture
              </h3>
              
              <p className="font-body text-gray-600 mb-6">
                IoT-driven AgriTech solutions for national food security and smart farming.
              </p>
              
              <div className="text-sm font-medium text-[#e65225] flex items-center gap-2">
                Learn more
                <ArrowRight size={16} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="section-padding bg-gradient-to-r from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Modernize?
            </h2>
            
            <p className="font-body text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Let&apos;s architect a solution that meets your organization&apos;s specific demands.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultationOpen}
                className="group px-8 py-4 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="mr-3" size={20} />
                <span>Request a Solution Blueprint</span>
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                <BookOpen className="mr-3" size={20} /> {/* Changed from CaseStudy to BookOpen */}
                <span>View Case Studies</span>
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
      
      {/* Schedule Consultation Popup */}
      <ScheduleConsultation 
        isOpen={isConsultationOpen}
        onClose={handleConsultationClose}
      />
    </>
  );
}