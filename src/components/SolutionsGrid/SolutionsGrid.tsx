// src/components/SolutionsGrid/SolutionsGrid.tsx
'use client';

import { motion } from 'framer-motion';
import { Cpu, Network, Zap } from 'lucide-react';

const solutions = [
  {
    title: 'Digital Transformation',
    description: 'Enterprise Resource Planning (ERP), Custom Software, and AI-driven automation for government efficiency.',
    icon: Cpu,
    features: ['Custom ERPs', 'AI & Data Analytics'],
  },
  {
    title: 'Core Infrastructure',
    description: 'Tier-compliant Data Center design, Cloud storage, and High-Performance Secure Networking.',
    icon: Network,
    features: ['Data Center Design', 'Cybersecurity'],
  },
  {
    title: 'Smart Systems',
    description: 'IoT-enabled smart cities, intelligent public lighting, and solar energy solutions for green growth.',
    icon: Zap,
    features: ['Smart Lighting', 'Solar Power'],
  },
];

export default function SolutionsGrid() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            Enterprise Solutions
          </h2>
          <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
            Scaled for national challenges, designed for future resilience.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              // Using white glass effect with your color palette
              className="group relative rounded-2xl p-8 border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6">
                {/* Icon with your primary color */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon size={28} className="text-primary" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                
                <p className="font-body text-gray-600 mb-6">
                  {solution.description}
                </p>
              </div>
              
              {/* Features List - Using your secondary color */}
              <div className="space-y-2">
                {solution.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-secondary mr-3" />
                    <span className="font-body font-medium text-gray-800">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300"
          >
            Explore All Solutions
          </motion.button>
        </div>
      </div>
    </section>
  );
}