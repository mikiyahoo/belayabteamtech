// src/app/our-story/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target,
  Zap,
  Users,
  Shield,
  Award,
  Download,
  UserCheck,
  Building2,
  Globe,
  Clock,
  GraduationCap,
  Trophy,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import CTASection from '@/components/CTASection/CTASection';
import WhatsAppFloating from '@/components/WhatsAppFloating/WhatsAppFloating';
import TelegramFloating from '@/components/TelegramFloating/TelegramFloating';
import ScheduleConsultation from '@/components/ScheduleConsultation/ScheduleConsultation';

export default function OurStoryPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleConsultationOpen = () => {
    setIsConsultationOpen(true);
  };

  const handleConsultationClose = () => {
    setIsConsultationOpen(false);
  };

  const handleDownloadProfile = () => {
    // Handle PDF download
    window.open('/assets/documents/BelayAb-Team-Tech-Profile.pdf', '_blank');
  };

  return (
    <>
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/our-story/hero-story.webp"
            alt="BelayAb Team Technologies Story"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
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
                BEYOND A SERVICE PROVIDER
              </span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-[#e65225]">
                A STRATEGIC NATIONAL PARTNER
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
            >
              Bridging the Gap Between Ambition and Innovation.
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              BelayAb Team Technologies was founded on a simple but powerful premise: that Ethiopia&apos;s journey toward a digital future requires a partner with the institutional trust of a national leader and the technical mastery of a global innovator. As part of the prestigious BelayAb Group, we don&apos;t just deploy technology—we build the foundations for national growth.
            </motion.p>
          </div>
        </div>

        {/* Gradient Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Section 2: Strategic Framework (Vision & Mission) */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Vision & Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center">
                    <Target size={24} className="text-[#e65225]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
                <p className="font-body text-lg text-gray-700 leading-relaxed pl-4 border-l-4 border-[#e65225]">
                  To be the leading and most trusted technology partner in East Africa, driving transformative growth through technical excellence.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center">
                    <Zap size={24} className="text-[#e65225]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="font-body text-lg text-gray-700 leading-relaxed pl-4 border-l-4 border-[#e65225]">
                  To inspire and empower organizations by delivering secure, scalable, and innovative ICT solutions that solve complex challenges.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Core Values <span className="text-[#e65225]">(Our DNA)</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center flex-shrink-0">
                    <Shield size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Innovation
                    </h3>
                    <p className="font-body text-gray-600">
                      We stay at the forefront of the technological curve to bring the world&apos;s best tools to Ethiopia.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Professionalism
                    </h3>
                    <p className="font-body text-gray-600">
                      Our approach is defined by precision, transparency, and international engineering standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Team Spirit
                    </h3>
                    <p className="font-body text-gray-600">
                      We believe in the power of collaborative growth—both within our team and with our clients.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e65225]/10 flex items-center justify-center flex-shrink-0">
                    <Trophy size={24} className="text-[#e65225]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
                      Commitment to Delivery
                    </h3>
                    <p className="font-body text-gray-600">
                      We don&apos;t just sign contracts; we deliver results that are tested, secure, and operational.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: The BelayAb Group Heritage */}
      <section className="section-padding bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              A Legacy of Excellence. <span className="text-[#e65225]">A Future of Innovation.</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#e65225] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-lg text-slate-300 leading-relaxed mb-6">
                Being a member of the BelayAb Group provides us with an unmatched foundation of reliability. As a Platinum Taxpayer, the Group is a pillar of the Ethiopian economy, known for its extensive logistical networks and deep-rooted institutional trust.
              </p>
              
              <p className="font-body text-lg text-slate-300 leading-relaxed mb-8">
                This heritage allows BelayAb Team Technologies to handle large-scale, mission-critical projects that require significant capital, rigorous compliance, and long-term stability. When you partner with us, you are backed by the strength of one of the nation&apos;s most respected corporate entities.
              </p>
              
              {/* Platinum Taxpayer Badge */}
              <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[#e65225]/20 flex items-center justify-center">
                  <Award size={24} className="text-[#e65225]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-white">Platinum Taxpayer Status</div>
                  <div className="font-body text-sm text-slate-300">A Commitment to National Transparency</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/our-story/belayab-group.webp"
                alt="BelayAb Group Headquarters"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay with logo */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e65225] to-orange-500 rounded-full blur-3xl opacity-30" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {/* Lion inside Fire logo placeholder */}
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#e65225] to-orange-500 flex items-center justify-center">
                        <Building2 size={48} className="text-white" />
                      </div>
                      <span className="font-heading font-bold text-white text-xl tracking-wider">
                        BelayAb Group
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: The Technical Edge (Our People) */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Local Mastery. <span className="text-[#e65225]">Global Standards.</span>
            </h2>
            <p className="font-body text-lg text-gray-600">
              Our greatest asset is our team. Comprised of highly certified Ethiopian engineers, we bridge the gap between complex global technologies and the unique operational realities of the local market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-[#e65225]/10 flex items-center justify-center">
                <Clock size={32} className="text-[#e65225]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                24/7 Support
              </h3>
              <p className="font-body text-gray-600">
                We are on the ground when it matters most.
              </p>
            </motion.div>

            {/* Certified Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-[#e65225]/10 flex items-center justify-center">
                <GraduationCap size={32} className="text-[#e65225]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                Certified Excellence
              </h3>
              <p className="font-body text-gray-600">
                Expertise across Cisco, Huawei, Dell, and Oracle ecosystems.
              </p>
            </motion.div>

            {/* Knowledge Transfer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-8 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-[#e65225]/10 flex items-center justify-center">
                <UserCheck size={32} className="text-[#e65225]" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                Knowledge Transfer
              </h3>
              <p className="font-body text-gray-600">
                We don&apos;t just build systems; we train your people to master them.
              </p>
            </motion.div>
          </div>

          {/* Team Stats */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#e65225] mb-2">50+</div>
                <div className="font-body text-gray-600">Certified Engineers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#e65225] mb-2">40+</div>
                <div className="font-body text-gray-600">Global Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#e65225] mb-2">100%</div>
                <div className="font-body text-gray-600">Ethiopian Talent</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#e65225] mb-2">24/7</div>
                <div className="font-body text-gray-600">Support Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Call to Action */}
      <section className="section-padding bg-gradient-to-r from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Partner with a Leader
            </h2>
            
            <p className="font-body text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Discover how our heritage and expertise can accelerate your digital roadmap.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadProfile}
                className="group px-8 py-4 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="mr-3" size={20} />
                <span>Download Company Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConsultationOpen}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Users className="mr-3" size={20} />
                <span>Meet Our Experts</span>
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