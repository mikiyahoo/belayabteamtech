"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Landmark, Building2, Cpu, Truck } from 'lucide-react';

const industries = [
  {
    title: "Financial & Governance",
    icon: Landmark,
    description: "Secure digital solutions for financial institutions and government agencies",
  },
  {
    title: "Essential Services",
    icon: Building2,
    description: "Infrastructure and systems for critical service providers",
  },
  {
    title: "Commerce & Logistics",
    icon: Truck,
    description: "Optimized solutions for trade, retail, and supply chain",
  },
  {
    title: "Emerging Sectors",
    icon: Cpu,
    description: "Innovative technology for growth industries",
  }
];

export default function IndustriesGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white relative overflow-hidden">
      {/* Subtle background glow for extra glass depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e65225]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">
            Powering Digital Transformation <span className="text-[#e65225]">Across Sectors</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#e65225] mx-auto rounded-full mb-8" />
          <p className="font-body text-lg text-slate-300 leading-relaxed">
            Tailored technology solutions designed to meet the unique challenges and regulatory requirements of each industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                // THE WHITE GLASS EFFECT: Removed colored gradients for unified frosted white
                className="group relative rounded-[2.5rem] p-10 border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-2xl shadow-black/50"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      {/* Icon Container with Primary Orange Accent */}
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e65225]/20 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-white group-hover:text-[#e65225] transition-colors" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#e65225] transition-colors">
                        {industry.title}
                      </h3>
                    </div>
                    
                    {/* Action Arrow using Primary Color */}
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-[#e65225] flex items-center justify-center shadow-lg shadow-[#e65225]/20"
                    >
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <p className="font-body text-slate-300 mb-8 leading-relaxed text-lg">
                    {industry.description}
                  </p>

                  {/* REMOVED the grid mapping code since items array doesn't exist anymore */}
                  {/* You can add content here if needed, or remove the entire grid div */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}