// src/components/PartnersSection/PartnersSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Categorized partner logos
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

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const logosPerView = 12; // Show 12 logos at a time
  const autoSlideInterval = 3000; // 3 seconds

  // Auto slide effect
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex >= partnerLogos.length) {
          return 0;
        }
        return nextIndex;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? partnerLogos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === partnerLogos.length - 1 ? 0 : prev + 1
    );
  };

  // Get current visible logos
  const getVisibleLogos = () => {
    const visibleLogos = [];
    
    for (let i = 0; i < logosPerView; i++) {
      const actualIndex = (currentIndex + i) % partnerLogos.length;
      visibleLogos.push(partnerLogos[actualIndex]);
    }
    
    return visibleLogos;
  };

  const visibleLogos = getVisibleLogos();

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl mb-4">
              Our Partners
            </h2>
            <p className="font-body text-lg text-gray-600 mb-4">
              Trusted by leading global technology partners
            </p>
            <p className="font-body text-gray-700 mb-8">
              Our strategic partnerships with the world&apos;s leading technology innovators enable us to deliver end-to-end solutions across networking, cybersecurity, infrastructure, and enterprise software. These collaborations ensure our clients have access to the most reliable, secure, and cutting-edge technology solutions available today.
            </p>
            
            <div className="bg-primary/5 border-l-4 border-primary pl-4 py-3">
              <p className="font-body font-semibold text-gray-900">
                Certified partnerships backed by global engineering standards and localized support.
              </p>
            </div>
          </div>

          {/* Right Column - Carousel */}
          <div>
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-xl">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                  {visibleLogos.map((partner, index) => (
                    <motion.div
                      key={`${partner.id}-${currentIndex}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-3 border border-gray-200 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} Logo`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100px, 120px"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Simple Navigation Controls */}
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Previous logos"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="text-center">
                  <div className="flex justify-center space-x-1 mb-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i === 0 ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-body text-sm text-gray-600">
                    {currentIndex + 1} of {partnerLogos.length}
                  </span>
                </div>
                
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Next logos"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}