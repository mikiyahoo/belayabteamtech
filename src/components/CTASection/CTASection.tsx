// src/components/CTASection/CTASection.tsx - Update to accept props
'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Calendar, ArrowRight, Download, Flame } from 'lucide-react';
import Image from 'next/image';

// ADD PROPS INTERFACE
interface CTASectionProps {
  onConsultationClick?: () => void;
}

export default function CTASection({ onConsultationClick }: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const fireGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${springX}px ${springY}px, 
      rgba(230, 82, 37, 0.2), 
      transparent 80%
    )
  `;

  // ADD DEFAULT HANDLER IF NO PROP PROVIDED
  const handleConsultationClick = () => {
    if (onConsultationClick) {
      onConsultationClick();
    } else {
      console.log('Consultation button clicked - no handler provided');
      // Optionally open a link or show a message
      // window.location.href = '/contact';
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-24 relative overflow-hidden group/cta"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/hero-ethiopia-digital-transformation.webp"
          alt="Ethiopia"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
        <motion.div 
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700"
          style={{ background: fireGlow }}
        />
      </div>
      
      {/* Container Logic for Balanced Left/Right Padding */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-20">
        <div className="w-full max-w-6xl mx-auto"> 
          <div className="rounded-[2.5rem] p-12 md:p-20 backdrop-blur-2xl border border-white/20 relative overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Inner Glow Logic */}
            <motion.div 
              className="pointer-events-none absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
              style={{ 
                background: useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(230, 82, 37, 0.15), transparent 80%)` 
              }} 
            />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#e65225]/10 border border-[#e65225]/20 mb-8"
              >
                <Flame className="w-10 h-10 text-[#e65225] animate-pulse" />
              </motion.div>
              
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">
                Ignite Your <span className="text-[#e65225]">Digital Transformation</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join Ethiopia&apos;s leading organizations powering their future with cutting-edge technology solutions from BelayAb Team Technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* UPDATED: Schedule Consultation Button */}
                <motion.button
                  onClick={handleConsultationClick} // UPDATED
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center px-10 py-5 bg-[#e65225] text-white font-bold rounded-xl shadow-xl shadow-[#e65225]/30 transition-all cursor-pointer"
                >
                  <Calendar className="mr-3" size={24} />
                  <span>Schedule Consultation</span>
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <motion.a
                  href="https://drive.google.com/file/d/13ymFOQXYBJWoAeebtNP4SO3SyAW2tZQ4/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center px-10 py-5 bg-white/10 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  <Download className="mr-3" size={24} />
                  <span>Download Brochure</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}