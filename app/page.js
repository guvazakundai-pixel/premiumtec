'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Search, X, MapPin, Clock, Truck, MessageCircle,
  ChevronDown, SlidersHorizontal, ArrowRight, Shield, Zap, Star
} from 'lucide-react';
import RainEffect from '../components/RainEffect';

const products = [
  {
    id: 1,
    name: 'HP EliteBook 840 G3',
    category: 'Laptops',
    processor: 'Intel Core i7',
    ram: '16GB RAM',
    storage: '512GB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 240.00,
    price: 200.00,
    image: '\uD83D\uDCBB',
    specs: 'Core i7 \u2022 16GB RAM \u2022 512GB SSD',
    badge: 'SALE'
  },
  {
    id: 2,
    name: 'HP ZBook FireFly G9',
    category: 'Laptops',
    processor: 'Intel Core i7',
    ram: '32GB RAM',
    storage: '1TB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 1050.00,
    price: 1050.00,
    image: '\uD83D\uDDA5\uFE0F',
    specs: 'Core i7 \u2022 32GB RAM \u2022 1TB SSD',
    badge: null
  },
  {
    id: 3,
    name: 'HP EliteBook 840 G5',
    category: 'Laptops',
    processor: 'Intel Core i7',
    ram: '16GB RAM',
    storage: '512GB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 280.00,
    price: 240.00,
    image: '\uD83D\uDCBB',
    specs: 'Core i7 \u2022 16GB RAM \u2022 512GB SSD',
    badge: 'SALE'
  },
  {
    id: 4,
    name: 'PlayStation 5 Slim',
    category: 'Gaming Consoles',
    processor: 'Next-Gen Console',
    ram: '16GB RAM',
    storage: '1TB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 550.00,
    price: 550.00,
    image: '\uD83C\uDFAE',
    specs: 'Next-Gen \u2022 1TB Storage \u2022 4K Gaming',
    badge: null
  },
  {
    id: 5,
    name: 'Xbox Series X',
    category: 'Gaming Consoles',
    processor: 'Next-Gen Console',
    ram: '16GB RAM',
    storage: '1TB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 650.00,
    price: 650.00,
    image: '\uD83C\uDFAF',
    specs: 'Next-Gen \u2022 1TB Storage \u2022 4K Gaming',
    badge: null
  },
  {
    id: 6,
    name: 'Laptop Chargers & Power Packs',
    category: 'Laptop Accessories',
    processor: 'Universal',
    ram: '\u2014',
    storage: '\u2014',
    condition: 'New',
    originalPrice: 20.00,
    price: 15.00,
    image: '\uD83D\uDD0C',
    specs: 'Universal Compatibility \u2022 Fast Charging',
    badge: 'SALE'
  },
  {
    id: 7,
    name: 'RAM, SSD & Harddrives Bundle',
    category: 'Internal Components',
    processor: 'Various',
    ram: '8\u201364GB',
    storage: '256GB\u20134TB',
    condition: 'New',
    originalPrice: 150.00,
    price: 120.00,
    image: '\u2699\uFE0F',
    specs: 'DDR4/DDR5 \u2022 NVMe \u2022 Storage Solutions',
    badge: 'SALE'
  },
  {
    id: 8,
    name: 'Laptop Keyboard Replacements',
    category: 'Laptop Accessories',
    processor: 'Universal',
    ram: '\u2014',
    storage: '\u2014',
    condition: 'New',
    originalPrice: 50.00,
    price: 20.00,
    image: '\u2328\uFE0F',
    specs: 'Mechanical \u2022 RGB Optional \u2022 Multi-Device',
    badge: 'SALE'
  },
  {
    id: 9,
    name: 'MacBook Pro M3',
    category: 'Laptops',
    processor: 'Apple Silicon',
    ram: '8\u201316GB',
    storage: '512GB SSD',
    condition: 'Brand New Boxed',
    originalPrice: 1999.00,
    price: 1799.00,
    image: '\uD83C\uDF4E',
    specs: 'M3 \u2022 8\u201316GB \u2022 512GB SSD',
    badge: 'SALE'
  },
  {
    id: 10,
    name: 'Premium Gaming Headphones',
    category: 'Audio Gear',
    processor: 'Wireless',
    ram: '\u2014',
    storage: '\u2014',
    condition: 'New',
    originalPrice: 120.00,
    price: 85.00,
    image: '\uD83C\uDFA7',
    specs: '7.1 Surround \u2022 RGB \u2022 Wireless',
    badge: 'SALE'
  }
];

const filterOptions = {
  'Product Categories': [
    'Laptops',
    'Gaming Consoles',
    'Smartphones',
    'Laptop Accessories',
    'Internal Components',
    'Audio Gear',
    'Gaming Equipment'
  ],
  'Processor Family': [
    'Intel Core i5',
    'Intel Core i7',
    'Ryzen 5',
    'Ryzen 7',
    'Apple Silicon',
    'Next-Gen Console'
  ],
  'RAM': ['8GB RAM', '16GB RAM', '32GB RAM', '64GB RAM'],
  'Storage': ['256GB SSD', '512GB SSD', '1TB SSD', 'NVMe SSD'],
  'Product Status': ['Brand New Boxed', 'Certified Pre-Owned', 'Refurbished', 'Sealed Stock']
};

const introVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const wipeReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const scrollReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.92, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.05 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function GlowCursor({ containerRef }) {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [containerRef]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(0, 210, 255, 0.04), transparent 40%)`,
      }}
    />
  );
}

function LiquidGlassCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [glow, setGlow] = useState({ x: '50%', y: '50%', opacity: 0 });

  const handleMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((e.clientY - rect.top) / rect.height) * 100}%`,
      opacity: 1
    });
  }, []);

  const handleLeave = useCallback(() => {
    setGlow(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(400px circle at ${glow.x} ${glow.y}, rgba(0, 210, 255, 0.08), transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function PremiumTecStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState('Product Categories');
  const [introDone, setIntroDone] = useState(false);
  const mainRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: mainRef, offset: ['start start', 'end start'] });
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 6]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const springBlur = useSpring(heroBlur, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const q = searchQuery.toLowerCase();
      const searchMatch =
        product.name.toLowerCase().includes(q) ||
        product.processor.toLowerCase().includes(q) ||
        product.ram.toLowerCase().includes(q) ||
        product.storage.toLowerCase().includes(q) ||
        product.specs.toLowerCase().includes(q);

      const filterMatch = Object.entries(selectedFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === 'Product Categories') return values.includes(product.category);
        if (key === 'Processor Family') return values.some(v => product.processor.includes(v.split(' ')[0]));
        if (key === 'RAM') return values.some(v => product.ram.includes(v.split('G')[0]));
        if (key === 'Storage') return values.some(v => product.storage.includes(v.split('G')[0]));
        if (key === 'Product Status') return values.includes(product.condition);
        return true;
      });

      return searchMatch && filterMatch;
    });
  }, [searchQuery, selectedFilters]);

  const handleWhatsAppSecure = useCallback((product) => {
    const message = `Hi PremiumTec, I'd like to secure the following item:

\u{1F4CD} Product: ${product.name}
\uD83D\uDCBB Specifications: ${product.specs}
\uD83D\uDCB0 Listed Price: $${product.price.toFixed(2)}

Please confirm availability for pickup or same-day Harare delivery.`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(message)}`, '_blank');
  }, []);

  const toggleFilter = useCallback((filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName]?.includes(value)
        ? prev[filterName].filter(v => v !== value)
        : [...(prev[filterName] || []), value]
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchQuery('');
  }, []);

  const activeFilterCount = Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#121316] relative overflow-x-hidden">
      <RainEffect />

      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="ambient-orb-1 absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #00D2FF 0%, transparent 70%)' }} />
        <div className="ambient-orb-2 absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #0066FF 0%, transparent 70%)' }} />
      </div>

      {/* ── Intro Condensation Overlay ── */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            initial={{ opacity: 1, filter: 'blur(20px)' }}
            exit={{ opacity: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[100] bg-[#121316] flex items-center justify-center"
          >
            <motion.div
              variants={introVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <motion.div variants={childVariants} className="mb-6">
                <div className="inline-flex items-center gap-2 liquid-glass-pill px-5 py-2">
                  <MapPin size={12} className="text-[#00D2FF]" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-white/70">Curated in Harare, Zimbabwe</span>
                </div>
              </motion.div>
              <motion.h1
                variants={wipeReveal}
                className="text-5xl md:text-7xl font-black tracking-tighter"
              >
                <span className="gradient-text">Premium Hardware.</span>
              </motion.h1>
              <motion.div
                variants={wipeReveal}
                className="overflow-hidden mt-2"
              >
                <span className="text-5xl md:text-7xl font-black tracking-tighter text-white/90">Zero Compromise.</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {/* ── Liquid Glass Navigation ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-50 glass-nav"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white">PREMIUM</span>
              <span className="text-xl md:text-2xl font-black tracking-tighter gradient-text">TEC</span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-[11px] font-medium tracking-widest uppercase text-white/40">
              <div className="flex items-center gap-1.5">
                <MapPin size={10} className="text-[#00D2FF]" />
                <span>Harare, ZW</span>
              </div>
              <span className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-white/40" />
                <span>Mon\u2013Sat 08:30\u201317:00</span>
              </div>
            </div>

            <a
              href="https://wa.me/263780579633"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-[#00D2FF]/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/10 transition-all duration-300"
            >
              <MessageCircle size={12} />
              Chat
            </a>
          </div>
        </motion.nav>

        {/* ── Hero Section ── */}
        <motion.section
          ref={heroRef}
          style={{ filter: `blur(${springBlur}px)`, opacity: springOpacity, scale: heroScale }}
          className="relative px-4 md:px-6 pt-20 md:pt-28 pb-0"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 liquid-glass-pill px-5 py-2 mb-8"
              >
                <MapPin size={12} className="text-[#00D2FF]" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-white/70">Curated in Harare, Zimbabwe</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] mb-6">
                <span className="gradient-text text-refraction">Premium Hardware.</span>
                <br />
                <span className="text-white/90">Zero Compromise.</span>
              </h1>

              <p className="text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
                Zimbabwe&apos;s most premium digital hardware showroom. Curated elite technology for creators, professionals, gamers, and power users.
              </p>

              <div className="flex items-center justify-center gap-6 md:gap-8 mb-12">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#00D2FF]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">Verified</span>
                </div>
                <span className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-[#00D2FF]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">Same-Day</span>
                </div>
                <span className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#00D2FF]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50">Top Rated</span>
                </div>
              </div>
            </motion.div>

            {/* ── Liquid Glass Search ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-input rounded-[50px] overflow-hidden"
            >
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00D2FF] transition-colors duration-300" size={18} />
                <input
                  type="text"
                  placeholder="Search processors, memory, storage, or console..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 md:py-5 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Main Catalog Section ── */}
        <section className="relative px-4 md:px-6 py-10 md:py-14">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between liquid-glass-pill px-4 py-3 !rounded-xl">
                    <span className="text-xs text-white/50">
                      <span className="text-[#00D2FF] font-semibold">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                    </span>
                    <button
                      onClick={clearAllFilters}
                      className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 border border-white/10 hover:border-[#00D2FF]/30 hover:bg-[#00D2FF]/10 text-white/50 hover:text-[#00D2FF] rounded-full transition-all duration-300"
                    >
                      Clear All
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* ── Filter Sidebar ── */}
              <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="sticky top-24">
                  <div className="liquid-glass-card !rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal size={14} className="text-white/40" />
                        <h3 className="text-[11px] font-bold text-white/80 tracking-widest uppercase">Filters</h3>
                      </div>
                      {activeFilterCount > 0 && (
                        <span className="text-[10px] font-bold text-[#00D2FF] tracking-wider">{activeFilterCount}</span>
                      )}
                    </div>

                    <div className="space-y-0">
                      {Object.entries(filterOptions).map(([filterName, values]) => {
                        const isOpen = expandedFilter === filterName;
                        const selectedInCategory = selectedFilters[filterName]?.length || 0;
                        return (
                          <div key={filterName} className="border-b border-white/5 last:border-b-0">
                            <button
                              onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                              className="w-full flex items-center justify-between py-3.5 text-[11px] font-semibold tracking-wider uppercase text-white/40 hover:text-white/80 transition-colors duration-150"
                            >
                              <span>{filterName}</span>
                              <div className="flex items-center gap-2">
                                {selectedInCategory > 0 && (
                                  <span className="text-[10px] font-bold text-[#00D2FF]">{selectedInCategory}</span>
                                )}
                                <ChevronDown
                                  size={13}
                                  className={`text-white/30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-4 space-y-2.5">
                                    {values.map((value) => {
                                      const isChecked = selectedFilters[filterName]?.includes(value) || false;
                                      return (
                                        <label key={value} className="flex items-center gap-3 cursor-pointer group py-0.5">
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleFilter(filterName, value)}
                                            className="accent-[#00D2FF]"
                                          />
                                          <span className={`text-[12px] transition-colors duration-150 ${isChecked ? 'text-white font-medium' : 'text-white/40 group-hover:text-white/60'}`}>
                                            {value}
                                          </span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {mobileFiltersOpen && (
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold tracking-widest uppercase rounded-full border border-white/10 transition-all duration-300"
                    >
                      Close Filters
                    </button>
                  )}
                </div>
              </div>

              {/* ── Mobile filter toggle ── */}
              {!mobileFiltersOpen && (
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 liquid-glass-pill text-white text-[11px] font-semibold tracking-widest uppercase shadow-lg hover:border-[#00D2FF]/30 transition-all duration-300"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && <span className="text-[#00D2FF]">({activeFilterCount})</span>}
                </button>
              )}

              {/* ── Product Grid ── */}
              <div className="lg:col-span-4">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          variants={staggerItem}
                          layout
                          layoutId={`product-${product.id}`}
                        >
                          <LiquidGlassCard className="liquid-glass-card !rounded-2xl h-full flex flex-col overflow-hidden group will-change-transform">
                            <div className="relative h-44 flex items-center justify-center bg-white/[0.02] border-b border-white/5 overflow-hidden">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="text-6xl transition-all duration-500 ease-out group-hover:scale-110 select-none"
                              >
                                {product.image}
                              </motion.div>
                              {product.badge && (
                                <div className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#00D2FF] to-[#0066FF] text-white px-2 py-1 rounded-full">
                                  {product.badge}
                                </div>
                              )}
                              {product.condition === 'Brand New Boxed' && !product.badge && (
                                <div className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase bg-white/10 text-white/70 px-2 py-1 rounded-full border border-white/10">
                                  NEW
                                </div>
                              )}
                            </div>

                            <div className="flex-1 flex flex-col p-5 space-y-3">
                              <div>
                                <h3 className="text-[15px] font-bold leading-snug text-white/90 group-hover:text-[#00D2FF] transition-colors duration-300">
                                  {product.name}
                                </h3>
                                <p className="text-[11px] tracking-widest uppercase text-white/30 mt-1 font-medium">
                                  {product.condition}
                                </p>
                              </div>

                              <div className="text-[11px] text-white/30 tracking-wider font-mono leading-relaxed border-t border-white/5 pt-3">
                                {product.specs}
                              </div>

                              <div className="flex items-baseline gap-2 mt-auto pt-2">
                                <span className="text-2xl font-black tracking-tight text-white">
                                  ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-xs text-white/30 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleWhatsAppSecure(product)}
                                className="w-full py-3 mt-2 bg-white/10 hover:bg-gradient-to-r hover:from-[#00D2FF] hover:to-[#0066FF] text-white font-bold text-[11px] tracking-wider uppercase rounded-full border border-white/10 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] will-change-transform"
                              >
                                <MessageCircle size={14} />
                                Secure via WhatsApp
                              </button>
                            </div>
                          </LiquidGlassCard>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full"
                      >
                        <div className="text-center py-20">
                          <div className="text-6xl mb-4">\uD83D\uDD0D</div>
                          <p className="text-white/50 text-sm mb-1">No products match your filters.</p>
                          <p className="text-white/30 text-xs mb-4">Try adjusting your search or filter criteria.</p>
                          <button
                            onClick={clearAllFilters}
                            className="text-[11px] font-semibold tracking-wider uppercase text-[#00D2FF] hover:underline px-4 py-2 border border-[#00D2FF]/30 hover:border-[#00D2FF] rounded-full transition-all duration-300"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-10 pt-6 border-t border-white/5 text-center"
                >
                  <p className="text-xs text-white/30 tracking-wider">
                    Showing <span className="text-[#00D2FF] font-semibold">{filteredProducts.length}</span> of <span className="text-[#00D2FF] font-semibold">{products.length}</span> products
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Showroom Info Section ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative px-4 md:px-6 py-16 md:py-20 border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div variants={scrollReveal} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white/90">Your Premium Showroom</h2>
              <div className="h-[2px] w-10 bg-gradient-to-r from-[#00D2FF] to-[#0066FF] mt-3 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: MapPin,
                  title: 'Store Location',
                  lines: ['Corner Speke & Mbuya Nehanda', 'Sirus Mall, 1st Floor, Office B10'],
                  accent: 'Harare, Zimbabwe'
                },
                {
                  icon: Clock,
                  title: 'Operations',
                  lines: ['Monday \u2013 Saturday', '08:30 \u2013 17:00'],
                  accent: 'Harare Delivery Available'
                },
                {
                  icon: Truck,
                  title: 'Shipping',
                  lines: ['Same-day delivery within Harare', 'Nationwide shipping across Zimbabwe'],
                  accent: 'Fast & Reliable'
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={scrollReveal}
                  transition={{ delay: i * 0.1 }}
                  className="liquid-glass-card !rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                      <item.icon size={16} className="text-[#00D2FF]" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-3">{item.title}</h3>
                      {item.lines.map((line, j) => (
                        <p key={j} className={`${j === 0 ? 'text-sm text-white/80 font-semibold' : 'text-sm text-white/50 leading-relaxed mt-1'}`}>
                          {line}
                        </p>
                      ))}
                      <p className="text-sm font-bold text-[#00D2FF] mt-2">{item.accent}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div variants={scrollReveal} className="mt-10 liquid-glass-card !rounded-2xl p-8 md:p-10 text-center">
              <h3 className="text-lg md:text-xl font-black tracking-tight text-white/90">Stay Updated on Latest Arrivals</h3>
              <p className="text-sm text-white/50 max-w-lg mx-auto mt-2 leading-relaxed">
                Join our official WhatsApp community channel for daily stock updates and exclusive product arrivals.
              </p>
              <a
                href="https://whatsapp.com/channel/0029Vb6hJE6F1YlVNfnyBk21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-white/10 hover:bg-gradient-to-r hover:from-[#00D2FF] hover:to-[#0066FF] text-white font-bold text-[11px] tracking-widest uppercase rounded-full border border-white/10 hover:border-transparent transition-all duration-300"
              >
                Join WhatsApp Channel
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/5 px-4 md:px-6 py-10">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-0.5">
              <span className="text-sm font-black tracking-tighter text-white">PREMIUM</span>
              <span className="text-sm font-black tracking-tighter gradient-text">TEC</span>
            </div>
            <p className="text-xs text-white/30 tracking-wider">
              &copy; {new Date().getFullYear()} PremiumTec Zimbabwe. All rights reserved.
            </p>
            <p className="text-[10px] text-white/20 tracking-widest uppercase">
              Zimbabwe&apos;s Most Premium Digital Hardware Showroom
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
