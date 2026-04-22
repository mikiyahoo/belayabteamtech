// src/app/newsroom/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  Share2,
  Download,
  Mail,
  Play,
  Video,
  Mic,
  Users,
  Award,
  Globe,
  Zap,
  Sun,
  ChevronRight,
  ChevronLeft,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Bookmark,
  Printer,
  Rss
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "BelayAb Team Technologies Recognized as Platinum Taxpayer for 2025/26",
    excerpt: "Our commitment to national transparency and economic contribution remains a cornerstone of our operational philosophy.",
    content: "Full article content about our Platinum Taxpayer recognition...",
    category: "Corporate",
    date: "2024-03-15",
    readTime: 5,
    tags: ["Awards", "Finance", "Recognition"],
    shares: 42,
    image: "/assets/images/newsroom/platinum-taxpayer.webp",
    featured: true
  },
  {
    id: 2,
    title: "Strategic Partnership with Oracle to Accelerate Government Cloud Sovereignty",
    excerpt: "New collaboration brings enterprise cloud solutions tailored for Ethiopian government agencies.",
    content: "Full article content about Oracle partnership...",
    category: "Partnerships",
    date: "2024-03-10",
    readTime: 7,
    tags: ["Cloud", "Partnership", "Government"],
    shares: 38,
    image: "/assets/images/newsroom/oracle-partnership.webp",
    featured: true
  },
  {
    id: 3,
    title: "The Future of Tier III Data Centers in East Africa: Resilience vs. Cost",
    excerpt: "Balancing high-availability infrastructure with economic sustainability in emerging markets.",
    content: "Full technical analysis of data center strategies...",
    category: "Technical Insights",
    date: "2024-03-05",
    readTime: 10,
    tags: ["Data Center", "Infrastructure", "Technology"],
    shares: 56,
    image: "/assets/images/newsroom/data-center.webp"
  },
  {
    id: 4,
    title: "Bridging the Digital Divide: How AI-Driven ERPs Transform Public Service",
    excerpt: "Case study on implementing intelligent enterprise systems in government agencies.",
    content: "Full case study on digital transformation...",
    category: "Digital Transformation",
    date: "2024-02-28",
    readTime: 8,
    tags: ["AI", "ERP", "Government"],
    shares: 29,
    image: "/assets/images/newsroom/digital-transformation.webp"
  },
  {
    id: 5,
    title: "Solar Power in ICT: Moving Toward Carbon-Neutral Digital Infrastructure",
    excerpt: "Exploring renewable energy solutions for sustainable technology operations.",
    content: "Full article on green technology initiatives...",
    category: "Sustainability",
    date: "2024-02-20",
    readTime: 6,
    tags: ["Green Tech", "Solar", "Sustainability"],
    shares: 35,
    image: "/assets/images/newsroom/solar-power.webp"
  },
  {
    id: 6,
    title: "Engineering the Future: Training 100 Young Ethiopian Engineers",
    excerpt: "Our CSR initiative provides hands-on training and internship opportunities.",
    content: "Full report on training program...",
    category: "CSR",
    date: "2024-02-15",
    readTime: 4,
    tags: ["Training", "Education", "CSR"],
    shares: 47,
    image: "/assets/images/newsroom/training-program.webp"
  }
];

// Categories for filtering
const categories = [
  "All",
  "Corporate",
  "Partnerships",
  "Technical Insights",
  "Digital Transformation",
  "Sustainability",
  "CSR",
  "Events"
];

// Timeline milestones
const milestones = [
  { year: "2023", event: "Founded as part of BelayAb Group" },
  { year: "2024 Q1", event: "Achieved Platinum Taxpayer Status" },
  { year: "2024 Q2", event: "Partnered with 20+ global tech leaders" },
  { year: "2024 Q3", event: "Launched Engineering the Future Program" },
  { year: "2024 Q4", event: "Expanded to 50+ certified engineers" }
];

// Multimedia content
const multimedia = [
  { type: "video", title: "Digital Transformation Journey", duration: "15:30", thumbnail: "/assets/images/newsroom/video-thumb-1.webp" },
  { type: "podcast", title: "Tech Leadership in Africa", duration: "45:20", thumbnail: "/assets/images/newsroom/podcast-thumb-1.webp" },
  { type: "webinar", title: "Cybersecurity Best Practices", duration: "60:15", thumbnail: "/assets/images/newsroom/webinar-thumb-1.webp" },
  { type: "video", title: "Behind Our Data Centers", duration: "12:45", thumbnail: "/assets/images/newsroom/video-thumb-2.webp" }
];

// CSR gallery images
const csrImages = [
  { id: 1, src: "/assets/images/csr/training-1.webp", alt: "Engineering workshop" },
  { id: 2, src: "/assets/images/csr/training-2.webp", alt: "Team collaboration" },
  { id: 3, src: "/assets/images/csr/community-1.webp", alt: "Community outreach" },
  { id: 4, src: "/assets/images/csr/training-3.webp", alt: "Technical training" },
  { id: 5, src: "/assets/images/csr/community-2.webp", alt: "Graduation ceremony" },
  { id: 6, src: "/assets/images/csr/training-4.webp", alt: "Hands-on practice" }
];

export default function NewsroomPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const articlesPerPage = 6;

  // Featured articles (first 2)
  const featuredArticles = articles.filter(article => article.featured);

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  const handleShare = async (article: typeof articles[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `/newsroom/article/${article.id}`,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    }
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  const calculateReadTime = (words: number) => {
    const wordsPerMinute = 200;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/newsroom/hero-newsroom.webp"
            alt="Newsroom Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 mb-4"
            >
              <span className="text-sm font-semibold tracking-wider text-white/80">INSIGHTS</span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-white/80">UPDATES</span>
              <span className="w-1 h-1 bg-[#e65225] rounded-full" />
              <span className="text-sm font-semibold tracking-wider text-white/80">IMPACT</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6"
            >
              Shaping the Narrative of Digital Ethiopia.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-lg text-white/90 mb-8 max-w-2xl"
            >
              Stay updated with the latest technological breakthroughs, strategic partnerships, and corporate milestones from BelayAb Team Technologies.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-md"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Highlights Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-gray-900">Featured Highlights</h2>
            <div className="flex items-center space-x-2">
              {/* FIX 1: Carousel navigation buttons - Added aria-label */}
              <button
                onClick={() => setCarouselIndex(carouselIndex - 1 < 0 ? featuredArticles.length - 1 : carouselIndex - 1)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCarouselIndex((carouselIndex + 1) % featuredArticles.length)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            {featuredArticles.map((article, index) => (
              <AnimatePresence key={article.id}>
                {index === carouselIndex && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-[#e65225] text-white text-sm font-semibold rounded-full">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-white/80">
                          <Calendar size={14} />
                          {new Date(article.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{article.title}</h3>
                      <p className="font-body text-white/90 mb-4 max-w-2xl">{article.excerpt}</p>
                      <Link 
                        href={`/newsroom/article/${article.id}`}
                        className="inline-flex items-center text-[#e65225] font-semibold hover:text-orange-600"
                      >
                        Read full story
                        <ChevronRight size={20} className="ml-2" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}

            {/* FIX 2: Carousel indicator buttons - Added aria-label and aria-current */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === carouselIndex ? 'bg-[#e65225] w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === carouselIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Categories Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Filter size={20} className="text-gray-600" />
                  <h3 className="font-heading text-lg font-bold text-gray-900">Categories</h3>
                </div>
                <div className="space-y-2">
                  {/* FIX 3: Category filter buttons - Added aria-label */}
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#e65225] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label={`Filter by ${category}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} className="text-[#e65225]" />
                  <h3 className="font-heading text-lg font-bold text-gray-900">Stay Updated</h3>
                </div>
                <p className="font-body text-gray-600 mb-4">Get the latest news delivered to your inbox.</p>
                <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e65225] focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#e65225] text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
              </div>

              {/* RSS Feed */}
              <div className="mt-8">
                <a
                  href="/rss/news.xml"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  aria-label="Subscribe to RSS feed"
                >
                  <Rss size={18} />
                  RSS Feed
                </a>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:w-3/4">
              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {currentArticles.map((article) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#e65225] text-white text-sm font-semibold rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(article.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.readTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 size={14} />
                          {article.shares}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="font-body text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/newsroom/article/${article.id}`}
                          className="text-[#e65225] font-semibold hover:text-orange-600 flex items-center"
                        >
                          Read more
                          <ChevronRight size={18} className="ml-1" />
                        </Link>
                        <div className="flex items-center gap-2">
                          {/* FIX 4: Share/Bookmark/Print buttons - Added descriptive aria-label */}
                          <button
                            onClick={() => handleShare(article)}
                            className="p-2 text-gray-500 hover:text-[#e65225]"
                            aria-label={`Share article: ${article.title}`}
                          >
                            <Share2 size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-[#e65225]"
                            aria-label={`Bookmark article: ${article.title}`}
                          >
                            <Bookmark size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-[#e65225]"
                            aria-label={`Print article: ${article.title}`}
                          >
                            <Printer size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  {/* Added aria-label for better accessibility */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#e65225] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Multimedia Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8 text-center">Multimedia</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {multimedia.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {item.type === 'video' && <Play size={48} className="text-white" />}
                    {item.type === 'podcast' && <Mic size={48} className="text-white" />}
                    {item.type === 'webinar' && <Video size={48} className="text-white" />}
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white text-sm rounded">
                    {item.duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === 'video' && <Video size={16} className="text-[#e65225]" />}
                    {item.type === 'podcast' && <Mic size={16} className="text-[#e65225]" />}
                    {item.type === 'webinar' && <Globe size={16} className="text-[#e65225]" />}
                    <span className="text-sm font-medium text-gray-500 capitalize">{item.type}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Gallery */}
      <section className="py-16 bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users size={32} className="text-[#e65225]" />
              <h2 className="font-heading text-3xl font-bold">Beyond Technology: Investing in Local Talent</h2>
            </div>
            <p className="font-body text-lg text-slate-300 max-w-3xl mx-auto">
              Through our &apos;Engineering the Future&apos; initiative, we provide internships and specialized technical training to young Ethiopian engineering graduates.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* FIX 5: CSR Gallery image buttons - Added aria-label with descriptive alt text */}
            {csrImages.map((image) => (
              <motion.button
                key={image.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image.id)}
                className="relative h-48 rounded-xl overflow-hidden"
                aria-label={`View larger image: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* FIX 6: Lightbox close button - Added aria-label */}
            <button
              className="absolute top-4 right-4 p-2 text-white hover:text-[#e65225] z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <div 
              className="relative w-full max-w-4xl h-3/4"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            >
              <Image
                src={csrImages.find(img => img.id === selectedImage)?.src || ''}
                alt="CSR Gallery"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Media Resources</h2>
            <p className="font-body text-lg text-gray-600 mb-10">
              Access our brand assets, executive bios, and official press kits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/assets/media-kit.zip"
                download
                className="group px-8 py-4 bg-gradient-to-r from-[#e65225] to-orange-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Download media kit"
              >
                <Download size={20} />
                Download Media Kit
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:media@belayabteamtech.com"
                className="group px-8 py-4 bg-white text-[#e65225] font-bold rounded-xl flex items-center justify-center gap-3 border-2 border-[#e65225] hover:bg-[#e65225] hover:text-white transition-all duration-300"
                aria-label="Contact media relations via email"
              >
                <Mail size={20} />
                Contact Media Relations
              </motion.a>
            </div>

            {/* Social Media Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">Follow Our Journey</h3>
              <div className="flex justify-center gap-6">
                {[
                  { icon: Facebook, label: 'Facebook', url: '#' },
                  { icon: Twitter, label: 'Twitter', url: '#' },
                  { icon: Linkedin, label: 'LinkedIn', url: '#' },
                  { icon: Instagram, label: 'Instagram', url: '#' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#e65225] hover:text-white transition-colors duration-300"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}