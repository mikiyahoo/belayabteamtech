'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PartnerPopup from '../PartnerPopup/PartnerPopup';

const navigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Partners', href: '/partners' },
  { name: 'Newsroom', href: '/newsroom' },
  { name: 'Careers', href: '/careers' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePartnerClick = () => {
    setShowPartnerPopup(true);
    setIsOpen(false);
  };

  const handleClosePopup = () => {
    setShowPartnerPopup(false);
  };

  return (
    <>
      <header className="fixed w-full z-50 pt-4 md:pt-6 transition-all duration-500">
        <div className="container mx-auto px-4">
          <nav 
            className={`mx-auto flex items-center justify-between px-6 transition-all duration-500 rounded-2xl border ${
              scrolled 
                // THE WHITE GLASS EFFECT: High-opacity white + heavy blur
                ? 'max-w-6xl h-16 bg-white/70 backdrop-blur-2xl border-white/40 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]' 
                : 'max-w-7xl h-20 bg-transparent border-transparent'
            }`}
          >
            {/* Logo - Stays visible on white glass */}
            <Link href="/" className="flex items-center shrink-0">
              <div className="relative w-32 h-10 md:w-40 md:h-12">
                <Image
                  src="/assets/images/logos/BelayAbTeam Tech Logo.svg"
                  alt="BelayAb Team Technologies"
                  fill
                  // Remove the "invert" so the logo stays its natural dark/color on white glass
                  className={`object-contain transition-all duration-300 ${scrolled ? 'brightness-100' : 'brightness-0 invert'}`}
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Darker text for white background */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-semibold transition-colors text-xs uppercase tracking-widest ${
                    scrolled ? 'text-slate-900/70 hover:text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button 
                type="button"
                title="Search"
                className={`hidden sm:flex p-2 transition-colors ${
                  scrolled ? 'text-slate-900/50 hover:text-primary' : 'text-white/50 hover:text-white'
                }`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              
              {/* Orange "Partner with Us" Button with enhanced styling */}
              <motion.button
                type="button"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(230, 82, 37, 0.3)' 
                }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all duration-300"
                onClick={handlePartnerClick}
              >
                Partner with Us
              </motion.button>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}
                title="Toggle Menu"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation - White Glass Style */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="md:hidden mt-4 bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/40 shadow-2xl overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-slate-900/80 hover:text-primary font-semibold text-sm uppercase tracking-widest rounded-lg transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Search Button */}
                  <button 
                    type="button"
                    className="w-full py-3 flex items-center justify-center gap-2 text-slate-900/70 hover:text-primary border border-slate-900/20 rounded-lg transition-colors mb-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <Search size={16} />
                    Search
                  </button>
                  
                  {/* Orange "Partner with Us" Mobile Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-colors"
                    onClick={handlePartnerClick}
                  >
                    Partner with Us
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Partner Popup */}
      <PartnerPopup 
        isOpen={showPartnerPopup} 
        onClose={handleClosePopup} 
      />
    </>
  );
}