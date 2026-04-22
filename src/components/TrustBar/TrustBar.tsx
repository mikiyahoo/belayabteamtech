// src/components/TrustBar/TrustBar.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const partners = [
  { name: 'Cisco', logo: '/assets/images/logos/logo-cisco-partner.svg' },
  { name: 'Huawei', logo: '/assets/images/logos/logo-huawei-partner.svg' },
  { name: 'Dell', logo: '/assets/images/logos/logo-dell-partner.svg' },
  { name: 'Oracle', logo: '/assets/images/logos/logo-oracle-partner.svg' },
  { name: 'Microsoft', logo: '/assets/images/logos/logo-microsoft-partner.svg' },
  { name: 'Fortinet', logo: '/assets/images/logos/logo-fortinet-partner.svg' },
  { name: 'SAP', logo: '/assets/images/logos/logo-sap-partner.svg' },
  { name: 'Schneider Electric', logo: '/assets/images/logos/logo-schneider-electric.svg' },
  { name: 'AWS', logo: '/assets/images/logos/logo-aws-partner.svg' },
  { name: 'VMware', logo: '/assets/images/logos/logo-vmware-partner.svg' },
];

// Duplicate partners for seamless loop
const duplicatedPartners = [...partners, ...partners];

export default function TrustBar() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-dark to-light border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          >
            Empowered by Global Tech Leaders
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-body text-gray-600 max-w-2xl mx-auto"
          >
            Partnering with industry leaders to deliver world-class solutions
          </motion.p>
        </div>

        {/* Logo Slider Container */}
        <div 
          className="relative overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Infinite Logo Marquee */}
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: [0, -1440], // Adjust based on total width
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:border-primary/20"
              >
                {/* Logo Placeholder - Replace with actual logos */}
                <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary" />
                    </div>
                  </div>
                  <span className="font-body text-xs md:text-sm font-semibold text-gray-700">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 md:gap-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">40+</div>
              <div className="text-sm md:text-base text-gray-600">Global Partners</div>
            </div>
            <div className="h-10 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm md:text-base text-gray-600">Certified Engineers</div>
            </div>
            <div className="h-10 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm md:text-base text-gray-600">Local Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}