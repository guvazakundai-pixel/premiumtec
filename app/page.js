'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, MapPin, Clock, Truck, MessageCircle,
  ChevronDown, SlidersHorizontal, ArrowRight, Shield, Zap, Star
} from 'lucide-react';

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
    badge: 'Sale'
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
    badge: 'Sale'
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
    badge: 'Sale'
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
    badge: 'Sale'
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
    badge: 'Sale'
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
    badge: 'Sale'
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
    badge: 'Sale'
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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.04 }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function PremiumTecStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState('Product Categories');

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
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* ── Ambient Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="ambient-orb-1 absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.035]"
          style={{ background: 'radial-gradient(circle, #9D4EDD 0%, transparent 70%)' }}
        />
        <div
          className="ambient-orb-2 absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #71717a 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.35] grid-bg"
        />
      </div>

      <div className="relative z-10">
        {/* ── Liquid Glass Navigation Bar ── */}
        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/60 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-0.5"
            >
              <span className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900">PREMIUM</span>
              <span className="text-xl md:text-2xl font-black tracking-tighter text-[#9D4EDD]">TEC</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={10} className="text-[#9D4EDD]" />
                <span>Harare, ZW</span>
              </div>
              <span className="w-px h-3 bg-zinc-200" />
              <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-zinc-400" />
                <span>Mon\u2013Sat 08:30\u201317:00</span>
              </div>
            </div>

            <a
              href="https://wa.me/263780579633"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-[#9D4EDD] text-white text-[10px] font-bold tracking-widest uppercase transition-colors duration-200"
            >
              <MessageCircle size={12} />
              Chat
            </a>
          </div>
        </nav>

        {/* ── CMF-Inspired Hero Masterpiece ── */}
        <section className="relative px-4 md:px-6 pt-20 md:pt-28 pb-0">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 border border-zinc-200 rounded-full px-4 py-1.5 mb-8 glass-panel">
                <MapPin size={12} className="text-[#9D4EDD]" />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">Curated in Harare, Zimbabwe</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] mb-6 text-zinc-900">
                Premium Hardware.
                <br />
                <span className="text-[#9D4EDD]">Zero Compromise.</span>
              </h1>

              <p className="text-sm md:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10">
                Zimbabwe&apos;s most premium digital hardware showroom. Curated elite technology for creators, professionals, gamers, and power users.
              </p>

              <div className="flex items-center justify-center gap-6 md:gap-8 mb-12">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#9D4EDD]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500">Verified</span>
                </div>
                <span className="w-px h-4 bg-zinc-200" />
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-[#9D4EDD]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500">Same-Day</span>
                </div>
                <span className="w-px h-4 bg-zinc-200" />
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#9D4EDD]" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500">Top Rated</span>
                </div>
              </div>
            </motion.div>

            {/* ── Hard-Edged Search Block ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel !rounded-none !border-zinc-200"
            >
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#9D4EDD] transition-colors duration-200" size={18} />
                <input
                  type="text"
                  placeholder="Search processors, memory, storage, or console..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 md:py-5 bg-transparent text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-[#9D4EDD] border border-transparent transition-colors duration-200 text-sm md:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </motion.div>

            <div className="dot-matrix-border mt-0" />
          </div>
        </section>

        {/* ── Main Catalog Section ── */}
        <section className="relative px-4 md:px-6 py-10 md:py-14">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between border border-[#9D4EDD]/20 bg-[#9D4EDD]/[0.04] px-4 py-3">
                    <span className="text-xs text-zinc-500">
                      <span className="text-[#9D4EDD] font-semibold">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                    </span>
                    <button
                      onClick={clearAllFilters}
                      className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 border border-zinc-200 hover:border-[#9D4EDD] hover:bg-[#9D4EDD]/[0.06] text-zinc-500 hover:text-[#9D4EDD] transition-colors duration-200"
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
                  <div className="glass-panel !rounded-none p-5">
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal size={14} className="text-zinc-400" />
                        <h3 className="text-[11px] font-bold text-zinc-900 tracking-widest uppercase">Filters</h3>
                      </div>
                      {activeFilterCount > 0 && (
                        <span className="text-[10px] font-bold text-[#9D4EDD] tracking-wider">{activeFilterCount}</span>
                      )}
                    </div>

                    <div className="space-y-0">
                      {Object.entries(filterOptions).map(([filterName, values]) => {
                        const isOpen = expandedFilter === filterName;
                        const selectedInCategory = selectedFilters[filterName]?.length || 0;
                        return (
                          <div key={filterName} className="border-b border-dashed border-zinc-100 last:border-b-0">
                            <button
                              onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                              className="w-full flex items-center justify-between py-3.5 text-[11px] font-semibold tracking-wider uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                            >
                              <span>{filterName}</span>
                              <div className="flex items-center gap-2">
                                {selectedInCategory > 0 && (
                                  <span className="text-[10px] font-bold text-[#9D4EDD]">{selectedInCategory}</span>
                                )}
                                <ChevronDown
                                  size={13}
                                  className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                                          />
                                          <span className={`text-[12px] transition-colors duration-150 ${isChecked ? 'text-zinc-900 font-medium' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
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
                      className="w-full mt-3 py-3 bg-zinc-900 text-white text-[11px] font-bold tracking-widest uppercase"
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
                  className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 glass-panel !bg-zinc-900/90 !backdrop-blur-md !border-zinc-700 text-white text-[11px] font-semibold tracking-widest uppercase shadow-lg hover:!bg-zinc-800 transition-colors duration-200"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && <span className="text-[#9D4EDD]">({activeFilterCount})</span>}
                </button>
              )}

              {/* ── Product Grid ── */}
              <div className="lg:col-span-4">
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
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
                          className="group will-change-transform"
                        >
                          <div className="h-full glass-card transition-all duration-200 overflow-hidden flex flex-col rounded-none">
                            <div className="relative h-44 flex items-center justify-center bg-zinc-50 border-b border-zinc-100 overflow-hidden">
                              <div className="text-6xl transition-transform duration-300 ease-out group-hover:scale-105 select-none">
                                {product.image}
                              </div>
                              {product.badge && (
                                <div className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase bg-[#9D4EDD] text-white px-2 py-1">
                                  {product.badge}
                                </div>
                              )}
                              {product.condition === 'Brand New Boxed' && !product.badge && (
                                <div className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase bg-zinc-900 text-white px-2 py-1">
                                  New
                                </div>
                              )}
                            </div>

                            <div className="flex-1 flex flex-col p-5 space-y-3">
                              <div>
                                <h3 className="text-[15px] font-bold leading-snug text-zinc-900 group-hover:text-[#9D4EDD] transition-colors duration-200">
                                  {product.name}
                                </h3>
                                <p className="text-[11px] tracking-widest uppercase text-zinc-400 mt-1 font-medium">
                                  {product.condition}
                                </p>
                              </div>

                              <div className="text-[11px] text-zinc-400 tracking-wider font-mono leading-relaxed border-t border-dashed border-zinc-100 pt-3">
                                {product.specs}
                              </div>

                              <div className="flex items-baseline gap-2 mt-auto pt-2">
                                <span className="text-2xl font-black tracking-tight text-zinc-900">
                                  ${product.price.toFixed(2)}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-xs text-zinc-400 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => handleWhatsAppSecure(product)}
                                className="w-full py-3 mt-2 bg-zinc-900 hover:bg-[#9D4EDD] text-white font-bold text-[11px] tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-2 active:scale-[0.98] will-change-transform"
                              >
                                <MessageCircle size={14} />
                                Secure via WhatsApp
                              </button>
                            </div>
                          </div>
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
                          <p className="text-zinc-500 text-sm mb-1">No products match your filters.</p>
                          <p className="text-zinc-400 text-xs mb-4">Try adjusting your search or filter criteria.</p>
                          <button
                            onClick={clearAllFilters}
                            className="text-[11px] font-semibold tracking-wider uppercase text-[#9D4EDD] hover:underline px-4 py-2 border border-[#9D4EDD]/30 hover:border-[#9D4EDD] transition-colors duration-200"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="mt-10 pt-6 border-t border-zinc-100 text-center">
                  <p className="text-xs text-zinc-400 tracking-wider">
                    Showing <span className="text-[#9D4EDD] font-semibold">{filteredProducts.length}</span> of <span className="text-[#9D4EDD] font-semibold">{products.length}</span> products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical Geolocation & Logistics Grid ── */}
        <section className="relative px-4 md:px-6 py-16 md:py-20 border-t border-zinc-100">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900">Your Premium Showroom</h2>
              <div className="h-[2px] w-10 bg-[#9D4EDD] mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-200/60 glass-panel !rounded-none overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-zinc-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-zinc-200 bg-zinc-50 flex-shrink-0">
                    <MapPin size={16} className="text-[#9D4EDD]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-3">Store Location</h3>
                    <p className="text-sm text-zinc-900 font-semibold leading-snug">
                      Corner Speke &amp; Mbuya Nehanda
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed mt-1">
                      Sirus Mall, 1st Floor, Office B10
                    </p>
                    <p className="text-sm font-bold text-[#9D4EDD] mt-2">Harare, Zimbabwe</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-zinc-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-zinc-200 bg-zinc-50 flex-shrink-0">
                    <Clock size={16} className="text-[#9D4EDD]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-3">Operations</h3>
                    <p className="text-sm text-zinc-900 font-semibold">
                      Monday &#8211; Saturday
                    </p>
                    <p className="text-sm text-zinc-900 font-black text-lg mt-1">08:30 &#8211; 17:00</p>
                    <p className="text-xs font-semibold text-[#9D4EDD] mt-2 tracking-wider uppercase">Harare Delivery Available</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-zinc-200 bg-zinc-50 flex-shrink-0">
                    <Truck size={16} className="text-[#9D4EDD]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-3">Shipping</h3>
                    <p className="text-sm text-zinc-900 font-semibold">Same-day delivery within Harare</p>
                    <p className="text-sm text-zinc-500 mt-1">Nationwide shipping across Zimbabwe</p>
                    <p className="text-xs font-semibold text-[#9D4EDD] mt-2 tracking-wider uppercase">Fast &amp; Reliable</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-10 glass-panel !rounded-none p-8 md:p-10 text-center"
            >
              <h3 className="text-lg md:text-xl font-black tracking-tight text-zinc-900">Stay Updated on Latest Arrivals</h3>
              <p className="text-sm text-zinc-500 max-w-lg mx-auto mt-2 leading-relaxed">
                Join our official WhatsApp community channel for daily stock updates and exclusive product arrivals.
              </p>
              <a
                href="https://whatsapp.com/channel/0029Vb6hJE6F1YlVNfnyBk21"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-zinc-900 hover:bg-[#9D4EDD] text-white font-bold text-[11px] tracking-widest uppercase transition-colors duration-200"
              >
                Join WhatsApp Channel
                <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-100 px-4 md:px-6 py-10">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-0.5">
              <span className="text-sm font-black tracking-tighter text-zinc-900">PREMIUM</span>
              <span className="text-sm font-black tracking-tighter text-[#9D4EDD]">TEC</span>
            </div>
            <p className="text-xs text-zinc-400 tracking-wider">
              &copy; {new Date().getFullYear()} PremiumTec Zimbabwe. All rights reserved.
            </p>
            <p className="text-[10px] text-zinc-300 tracking-widest uppercase">
              Zimbabwe&apos;s Most Premium Digital Hardware Showroom
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}