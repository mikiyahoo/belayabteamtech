// src/components/HeroSection/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/hero-ethiopia-digital-transformation.webp"
          alt="Transforming Ethiopia's Digital Landscape"
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
              PART OF BELAYAB GROUP
            </span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span className="text-sm font-semibold tracking-wider text-primary">
              PLATINUM TAXPAYER
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
          >
            Transforming Ethiopia&apos;s Digital Landscape.
          </motion.h1>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
          >
            We deliver mission-critical ICT infrastructure and turnkey solutions for Government and Large Enterprises, bridging the gap between national ambition and global innovation.
          </motion.p>

          {/* Modern Gradient Buttons */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="flex flex-col sm:flex-row gap-4 mt-10"
>
  {/* Primary Button with Gradient */}
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="group relative px-8 py-4 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
  >
    {/* Shine effect */}
    <span className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    
    <span className="relative flex items-center text-lg tracking-wide">
      Explore Solutions
      <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={22} />
    </span>
  </motion.button>
  
  {/* Secondary Glass Morphism Button */}
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    <span className="relative flex items-center text-lg tracking-wide">
      Partner with Us
      <ChevronRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={22} />
    </span>
    
    {/* Hover glow */}
    <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
  </motion.button>
</motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Bottom */}
<div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent z-10 pointer-events-none" />    </section>
  );
}