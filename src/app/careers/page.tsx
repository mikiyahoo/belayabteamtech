// src/app/careers/page.tsx
"use client";
import {
  // ... all your existing imports
  Upload,  // Add this
  // ... rest of your imports
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Share2,
  Bookmark,
  Award,
  TrendingUp,
  Users,
  Flag,
  Briefcase,
  MapPin,
  Clock,
  GraduationCap,
  Video,
  Trophy,
  Heart,
  Zap,
  Globe,
  Shield,
  Cpu,
  Cloud,
  Brain,
  Wrench,
  MessageSquare,
  Calendar,
  DollarSign,
  Home,
  Smartphone,
  Mail,
  Linkedin,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Star,
  Target,
  Coffee,
  BookOpen,
  Lightbulb,
  GitBranch,
  BarChart,
  Users as UsersIcon,
  Film,
  Mic,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Job data
const jobs = [
  {
    id: 1,
    title: "Senior Cloud Solutions Architect",
    department: "Cloud Architecture",
    location: "Addis Ababa HQ",
    experience: "5+ years",
    type: "Full-time",
    urgent: true,
    techStack: ["AWS", "Kubernetes", "Terraform", "Python", "Docker"],
    description: "Lead national-scale cloud migration projects for government and enterprise clients.",
    salary: "$60,000 - $90,000",
    posted: "2 days ago",
    applications: 24
  },
  {
    id: 2,
    title: "Cybersecurity Lead",
    department: "Cybersecurity",
    location: "Addis Ababa HQ",
    experience: "7+ years",
    type: "Full-time",
    urgent: false,
    techStack: ["Fortinet", "Palo Alto", "SIEM", "SOC", "Threat Intelligence"],
    description: "Build and lead Ethiopia's first Security Operations Center (SOC).",
    salary: "$55,000 - $85,000",
    posted: "1 week ago",
    applications: 18
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    department: "AI/ML",
    location: "Hybrid",
    experience: "3+ years",
    type: "Full-time",
    urgent: true,
    techStack: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
    description: "Develop AI solutions for public sector efficiency and service delivery.",
    salary: "$50,000 - $75,000",
    posted: "3 days ago",
    applications: 32
  },
  {
    id: 4,
    title: "Network Infrastructure Engineer",
    department: "Engineering",
    location: "Client Sites",
    experience: "4+ years",
    type: "Full-time",
    urgent: false,
    techStack: ["Cisco", "Juniper", "BGP", "MPLS", "SD-WAN"],
    description: "Design and implement nationwide network infrastructure.",
    salary: "$45,000 - $70,000",
    posted: "2 weeks ago",
    applications: 15
  },
  {
    id: 5,
    title: "Digital Ethiopia Graduate Program",
    department: "Graduate Program",
    location: "Addis Ababa HQ",
    experience: "Entry Level",
    type: "Internship",
    urgent: false,
    techStack: ["Rotation", "Training", "Mentorship"],
    description: "12-month rotational program across multiple technology domains.",
    salary: "$30,000 - $40,000",
    posted: "1 month ago",
    applications: 156
  },
  {
    id: 6,
    title: "Project Manager - Government Projects",
    department: "Project Management",
    location: "Addis Ababa HQ",
    experience: "5+ years",
    type: "Full-time",
    urgent: true,
    techStack: ["PMP", "Agile", "Risk Management", "Stakeholder Management"],
    description: "Lead mission-critical digital transformation projects.",
    salary: "$50,000 - $80,000",
    posted: "5 days ago",
    applications: 22
  }
];

// Filters
const departments = ['All', 'Engineering', 'Cybersecurity', 'Cloud Architecture', 'AI/ML', 'Project Management', 'Sales', 'Graduate Program'];
const experienceLevels = ['All', 'Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior (5+ years)', 'Lead'];
const locations = ['All', 'Addis Ababa HQ', 'Remote', 'Hybrid', 'Client Sites'];
const jobTypes = ['All', 'Full-time', 'Internship', 'Contract', 'Graduate Program'];

// Graduate programs
const graduatePrograms = [
  {
    title: "Digital Ethiopia Graduate Program",
    duration: "12-month rotational program",
    structure: "4 rotations across Engineering, Cloud, Cybersecurity, and Project Management",
    benefits: "Mentorship, certification sponsorship, guaranteed placement",
    eligibility: "Recent computer science/engineering graduates"
  },
  {
    title: "Summer Internship Program",
    duration: "3 months (June-August)",
    structure: "Real client projects under senior mentorship",
    benefits: "Full-time offer for top performers, stipend provided",
    eligibility: "Penultimate year students"
  },
  {
    title: "Technical Apprenticeship",
    duration: "6 months training + 6 months project work",
    structure: "Paid training for non-traditional candidates",
    benefits: "Junior Engineer position upon completion",
    eligibility: "Career changers, bootcamp graduates"
  }
];

// Interview process timeline
const interviewSteps = [
  { step: 1, title: "Application Review", time: "48 hours", process: "AI + Human review" },
  { step: 2, title: "Technical Assessment", time: "3 hours", process: "Take-home challenge" },
  { step: 3, title: "Technical Interview", time: "60 mins", process: "Senior Engineer + Hiring Manager" },
  { step: 4, title: "Culture Interview", time: "45 mins", process: "Team members" },
  { step: 5, title: "Offer", time: "5 business days", process: "Comprehensive package" }
];

// Employee testimonials
const testimonials = [
  {
    name: "Selam T.",
    role: "Senior Cloud Engineer",
    quote: "I came back from Silicon Valley to work here because nowhere else offers this scale of impact.",
    project: "National cloud migration project",
    years: "3 years"
  },
  {
    name: "Michael K.",
    role: "Cybersecurity Lead",
    quote: "We're building Ethiopia's first SOC. Every day, we're making history.",
    project: "Fortinet partnership implementation",
    years: "2 years"
  },
  {
    name: "Liya A.",
    role: "Junior AI Engineer",
    quote: "The rotational program gave me exposure to technologies I only read about in textbooks.",
    project: "AI-driven government portal",
    years: "1 year"
  }
];

// FAQ items
const faqs = [
  {
    question: "Do you sponsor work permits for international candidates?",
    answer: "Yes, we sponsor work permits for senior roles with specialized expertise that's not readily available locally."
  },
  {
    question: "What's the remote work policy?",
    answer: "We offer a hybrid model - 3 days in office, 2 days remote for most roles. Some positions may be fully remote or require on-site work."
  },
  {
    question: "How quickly do you make hiring decisions?",
    answer: "Our goal is 2 weeks from application to offer for most positions. We value your time and move quickly with qualified candidates."
  },
  {
    question: "Do you hire self-taught engineers?",
    answer: "Absolutely! We value practical skills and portfolio over formal education. Show us what you've built!"
  }
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesExp = selectedExperience === "All" || job.experience === selectedExperience;
    const matchesLoc = selectedLocation === "All" || job.location === selectedLocation;
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDept && matchesExp && matchesLoc && matchesType && matchesSearch;
  });

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleQuickApply = (jobId: number) => {
    // In a real app, this would open an application modal
    console.log(`Quick applying to job ${jobId}`);
    alert(`Application started for job ${jobId}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/careers/hero-careers.webp"
            alt="Careers at BelayAb Team Technologies"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#e65225]/30 to-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 mb-6"
            >
              <span className="text-sm font-semibold tracking-wider text-white/80">
                BUILD ETHIOPIA'S DIGITAL FUTURE
              </span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-[#e65225]">
                GREAT PLACE TO WORK CERTIFIED
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight"
            >
              Engineer the Next Chapter of <span className="text-[#e65225]">Digital Ethiopia.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-xl text-white/90 mb-12 max-w-3xl leading-relaxed"
            >
              At BelayAb Team Technologies, you won&apos;t just build solutions—you&apos;ll architect national transformation. 
              We&apos;re looking for passionate engineers, strategists, and innovators who want their work to matter at a national scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link
                href="#open-positions"
                className="group px-10 py-5 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-2xl shadow-[#e65225]/30 hover:shadow-[#e65225]/50 transition-all duration-300"
              >
                <Briefcase size={24} />
                View Open Positions
                <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </Link>
              
              <button className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 border-2 border-white/20 hover:border-white/40 transition-all duration-300">
                <Play size={24} />
                Watch Our Story
              </button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex items-center gap-8 text-white"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#e65225]">156</div>
                <div className="text-sm text-white/80">Engineers joined in 2025</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#e65225]">40+</div>
                <div className="text-sm text-white/80">Global Technology Partners</div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#e65225]">35%</div>
                <div className="text-sm text-white/80">Female Engineers (Industry: 15%)</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join BelayAb? - 3D Value Proposition Cards */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Join <span className="text-[#e65225]">BelayAb</span>?
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job—we offer a mission with national impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Flag,
                title: "Impact at Scale",
                description: "Every line of code you write powers national infrastructure. Your work directly contributes to Ethiopia's digital sovereignty."
              },
              {
                icon: Award,
                title: "Work with Global Leaders",
                description: "Access to cutting-edge technologies from our 40+ global partners. Continuous training on Cisco, AWS, Microsoft, and Oracle platforms."
              },
              {
                icon: TrendingUp,
                title: "Accelerated Career Growth",
                description: "Structured mentorship programs. Fast-track promotion opportunities. Technical certification sponsorship."
              },
              {
                icon: Users,
                title: "Build Local Expertise",
                description: "Be part of developing Ethiopia's first generation of world-class digital architects. Train the next wave of engineers."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, rotateX: 5 }}
                className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#e65225]/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#e65225] to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="font-body text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at BelayAb - Interactive Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Life at <span className="text-[#e65225]">BelayAb</span>
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our unique culture, development opportunities, and comprehensive benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                image: "/assets/images/careers/culture-1.webp",
                title: "Collaborative Engineering Culture",
                description: "Cross-functional teams working on national-scale projects. Weekly tech talks and innovation sprints."
              },
              {
                image: "/assets/images/careers/training-1.webp",
                title: "Continuous Learning",
                description: "Monthly training sessions with partner engineers. Access to Udemy Business, Pluralsight, and certification programs."
              },
              {
                image: "/assets/images/careers/office-1.webp",
                title: "State-of-the-Art Facilities",
                description: "Tier III data center access. Advanced labs for R&D. Flexible work arrangements."
              },
              {
                image: "/assets/images/careers/benefits-1.webp",
                title: "Comprehensive Benefits",
                description: "Health insurance, pension, performance bonuses, stock options, family support programs."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                  <p className="font-body text-white/90 text-sm line-clamp-3">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities - Advanced Filter System */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Current <span className="text-[#e65225]">Opportunities</span>
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect role in Ethiopia&apos;s digital transformation journey.
            </p>
          </div>

          {/* Advanced Filter System */}
          <div className="mb-12 p-6 bg-gray-50 rounded-2xl shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by role, skill, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
                  />
                </div>
              </div>

             {/* Filter Controls */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <select
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
  >
    {departments.map(dept => (
      <option key={dept} value={dept}>{dept}</option>
    ))}
  </select>

  <select
    value={selectedExperience}
    onChange={(e) => setSelectedExperience(e.target.value)}
    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
  >
    {experienceLevels.map(exp => (
      <option key={exp} value={exp}>{exp}</option>
    ))}
  </select>

  <select
    value={selectedLocation}
    onChange={(e) => setSelectedLocation(e.target.value)}
    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
  >
    {locations.map(loc => (
      <option key={loc} value={loc}>{loc}</option>
    ))}
  </select>

  <select
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
  >
    {jobTypes.map(type => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedDepartment !== "All" && (
                <span className="px-3 py-1 bg-[#e65225]/10 text-[#e65225] rounded-full text-sm">
                  {selectedDepartment} <button onClick={() => setSelectedDepartment("All")} className="ml-1">×</button>
                </span>
              )}
              {selectedExperience !== "All" && (
                <span className="px-3 py-1 bg-[#e65225]/10 text-[#e65225] rounded-full text-sm">
                  {selectedExperience} <button onClick={() => setSelectedExperience("All")} className="ml-1">×</button>
                </span>
              )}
              {selectedLocation !== "All" && (
                <span className="px-3 py-1 bg-[#e65225]/10 text-[#e65225] rounded-full text-sm">
                  {selectedLocation} <button onClick={() => setSelectedLocation("All")} className="ml-1">×</button>
                </span>
              )}
              {selectedType !== "All" && (
                <span className="px-3 py-1 bg-[#e65225]/10 text-[#e65225] rounded-full text-sm">
                  {selectedType} <button onClick={() => setSelectedType("All")} className="ml-1">×</button>
                </span>
              )}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {job.urgent && (
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-2">
                        🔥 Urgent Hiring
                      </span>
                    )}
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-2 text-gray-400 hover:text-[#e65225]"
                    aria-label={savedJobs.includes(job.id) ? "Unsave job" : "Save job"}
                  >
                    <Bookmark size={20} className={savedJobs.includes(job.id) ? "fill-[#e65225] text-[#e65225]" : ""} />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={16} />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp size={16} />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{job.type} • {job.posted}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">{job.description}</p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.techStack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{job.applications} applicants</span>
                    <button className="text-[#e65225] hover:text-orange-600 flex items-center gap-1">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleQuickApply(job.id)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Quick Apply (2 mins)
                  </button>
                  <Link
                    href={`/careers/apply/${job.id}`}
                    className="px-6 py-3 border-2 border-[#e65225] text-[#e65225] font-semibold rounded-xl hover:bg-[#e65225] hover:text-white transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">No matching positions found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSelectedDepartment("All");
                  setSelectedExperience("All");
                  setSelectedLocation("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-[#e65225] text-white font-semibold rounded-xl hover:bg-orange-600"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Graduate & Internship Programs */}
      <section className="py-20 bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap size={48} className="text-[#e65225]" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Graduate & <span className="text-[#e65225]">Internship Programs</span>
              </h2>
            </div>
            <p className="font-body text-lg text-slate-300 max-w-2xl mx-auto">
              Launch your career with structured programs designed for Ethiopia&apos;s future tech leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {graduatePrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#e65225]/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#e65225] text-white text-xs font-bold rounded-full">
                    {program.duration.split(' ')[0]}
                  </span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-white mb-6">{program.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-[#e65225] mb-1">
                      <Clock size={16} />
                      <span className="font-semibold">Duration</span>
                    </div>
                    <p className="text-slate-300">{program.duration}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-[#e65225] mb-1">
                      <Target size={16} />
                      <span className="font-semibold">Structure</span>
                    </div>
                    <p className="text-slate-300">{program.structure}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-[#e65225] mb-1">
                      <Award size={16} />
                      <span className="font-semibold">Benefits</span>
                    </div>
                    <p className="text-slate-300">{program.benefits}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-[#e65225] mb-1">
                      <CheckCircle size={16} />
                      <span className="font-semibold">Eligibility</span>
                    </div>
                    <p className="text-slate-300">{program.eligibility}</p>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-[#e65225] text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Interview <span className="text-[#e65225]">Process</span>
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent, efficient, and designed to showcase your skills.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200" />
              
              {interviewSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#e65225] border-4 border-white shadow-lg" />
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="ml-12 md:ml-0">
                      <div className="mb-4">
                        <span className="inline-block px-4 py-1 bg-[#e65225]/10 text-[#e65225] rounded-full text-sm font-bold mb-2">
                          Step {step.step}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{step.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{step.process}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Employee <span className="text-[#e65225]">Spotlight</span>
            </h2>
            <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our team about their journey and impact at BelayAb.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e65225] to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role} • {testimonial.years} years</p>
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <div className="text-6xl text-[#e65225]/20 absolute -top-4 -left-2">"</div>
                  <blockquote className="font-body text-gray-700 italic pl-8">
                    {testimonial.quote}
                  </blockquote>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Target size={16} />
                    <span className="font-medium">Project:</span>
                  </div>
                  <p className="text-gray-600">{testimonial.project}</p>
                </div>
                
                <button className="mt-6 w-full py-3 border-2 border-[#e65225] text-[#e65225] font-semibold rounded-xl hover:bg-[#e65225] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  <Play size={18} />
                  Watch Video Story
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked <span className="text-[#e65225]">Questions</span>
              </h2>
              <p className="font-body text-lg text-gray-600">
                Get answers to common questions about working at BelayAb.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-heading text-lg font-bold text-gray-900">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp size={20} className="text-[#e65225]" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
              Ready to Build Ethiopia&apos;s Digital Future?
            </h2>
            <p className="font-body text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
              Join 156 engineers who chose to make an impact at national scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="#open-positions"
                className="group px-10 py-5 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-2xl shadow-[#e65225]/30 hover:shadow-[#e65225]/50 transition-all duration-300"
              >
                <Briefcase size={24} />
                View All Open Positions
                <ExternalLink size={20} />
              </Link>
              
              <button className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl flex items-center justify-center gap-3 border-2 border-white/20 hover:border-white/40 transition-all duration-300">
                <Upload size={24} />
                Upload Resume for Future Roles
              </button>
            </div>
            {/* Secondary CTAs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
  {[
    { icon: Users, label: 'Join Talent Community', action: '#' },
    { icon: Share2, label: 'Refer a Candidate', action: '#', badge: '$2,000' },
    { icon: GraduationCap, label: 'Campus Visit', action: '#' },
    { icon: Download, label: 'Careers Brochure', action: '#', download: true }
  ].map((item) => (  // This line should have a closing parenthesis
    <button
      key={item.label}
      className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#e65225] hover:bg-[#e65225]/10 transition-all duration-300"
    >
      <div className="flex flex-col items-center gap-2">
        <item.icon size={24} className="text-[#e65225] group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">{item.label}</span>
        {item.badge && (
          <span className="px-2 py-1 bg-[#e65225] text-white text-xs rounded-full">
            {item.badge}
          </span>
        )}
      </div>
    </button>
  ))}  // This is the missing closing parenthesis
</div>
          </div>
        </div>
      </section>
    </>
  );
}