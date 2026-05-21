'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Search, X, ArrowRight, ChevronDown, SlidersHorizontal,
  Shield, Truck, HeadphonesIcon, CreditCard, Star,
  Heart, Check, ShoppingBag, ChevronRight,
  MapPin, Clock, Package, Smartphone, Monitor, Gamepad2
} from 'lucide-react';

const easePremium = [0.16, 1, 0.3, 1];

const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: easePremium }
  }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: easePremium }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: easePremium }
  }
};

const products = [
  {
    id: 1, name: 'iPhone 16 Pro Max', category: 'Phones',
    processor: 'A18 Pro', storage: '256GB / 512GB / 1TB',
    display: '6.9" OLED 120Hz', price: 1599, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9,
    Image: () => (
      <svg viewBox="0 0 120 200" className="w-20 h-32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="8" y="2" width="104" height="196" rx="16" className="stroke-white/30" />
        <rect x="12" y="8" width="96" height="170" rx="10" className="stroke-white/10" />
        <circle cx="60" cy="182" r="4" className="stroke-white/20" />
        <rect x="48" y="4" width="24" height="6" rx="3" className="stroke-white/15" />
      </svg>
    )
  },
  {
    id: 2, name: 'Samsung Galaxy S25 Ultra', category: 'Phones',
    processor: 'Snapdragon 8 Gen 4', storage: '256GB / 512GB / 1TB',
    display: '6.9" Dynamic AMOLED 120Hz', price: 1499, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8,
    Image: () => (
      <svg viewBox="0 0 110 200" className="w-[4.5rem] h-32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="106" height="196" rx="8" className="stroke-white/30" />
        <rect x="6" y="8" width="98" height="170" rx="4" className="stroke-white/10" />
        <circle cx="55" cy="182" r="3" className="stroke-white/20" />
        <rect x="42" y="186" width="26" height="8" rx="2" className="stroke-white/15" />
      </svg>
    )
  },
  {
    id: 3, name: 'Nothing Phone (3)', category: 'Phones',
    processor: 'Snapdragon 8s Gen 3', storage: '256GB / 512GB',
    display: '6.7" OLED 120Hz', price: 799, originalPrice: null,
    badge: 'ICONIC', inStock: true, rating: 4.7,
    Image: () => (
      <svg viewBox="0 0 100 200" className="w-[3.75rem] h-32" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="2" width="92" height="196" rx="12" className="stroke-white/30" />
        <rect x="8" y="8" width="84" height="170" rx="8" className="stroke-white/10" />
        <circle cx="50" cy="182" r="3.5" className="stroke-white/20" />
        <line x1="20" y1="30" x2="80" y2="30" className="stroke-white/[0.06]" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: 4, name: 'MacBook Pro 16" M4 Max', category: 'Laptops',
    processor: 'Apple M4 Max', storage: '1TB / 2TB / 4TB SSD',
    display: '16.2" Liquid Retina XDR', price: 3499, originalPrice: 3999,
    badge: 'NEW', inStock: true, rating: 4.9,
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-full h-24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="4" width="192" height="110" rx="6" className="stroke-white/30" />
        <rect x="10" y="10" width="180" height="98" rx="3" className="stroke-white/[0.06]" />
        <rect x="70" y="114" width="60" height="12" rx="1" className="stroke-white/20" />
        <rect x="80" y="116" width="40" height="8" rx="1" className="stroke-white/[0.06]" />
      </svg>
    )
  },
  {
    id: 5, name: 'Dell XPS 16', category: 'Laptops',
    processor: 'Intel Core Ultra 9', storage: '1TB / 2TB SSD',
    display: '16.3" OLED 4K+', price: 2499, originalPrice: null,
    badge: null, inStock: true, rating: 4.6,
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-full h-24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="196" height="112" rx="4" className="stroke-white/30" />
        <rect x="8" y="8" width="184" height="100" rx="2" className="stroke-white/[0.06]" />
        <rect x="65" y="114" width="70" height="14" rx="1" className="stroke-white/20" />
        <line x1="40" y1="20" x2="60" y2="20" className="stroke-white/[0.06]" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: 6, name: 'ASUS ROG Zephyrus G16', category: 'Laptops',
    processor: 'AMD Ryzen AI 9', storage: '1TB / 2TB SSD',
    display: '16" OLED 240Hz', price: 2199, originalPrice: null,
    badge: null, inStock: false, rating: 4.7,
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-full h-24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="2" width="196" height="112" rx="4" className="stroke-white/30" />
        <rect x="8" y="8" width="184" height="100" rx="2" className="stroke-white/[0.06]" />
        <rect x="60" y="114" width="80" height="14" rx="1" className="stroke-white/20" />
        <rect x="160" y="18" width="26" height="8" rx="2" className="stroke-white/[0.08]" />
      </svg>
    )
  },
  {
    id: 7, name: 'HP 250 G5 Notebook', category: 'Laptops',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '15" HD', price: 200, originalPrice: 230,
    badge: 'DEAL', inStock: true, rating: 4.3,
    Image: () => (
      <img
        src="/images/hp-250-g5.jpg"
        alt="HP 250 G5 Notebook"
        className="w-full h-full object-contain p-4"
      />
    )
  },
];

const filterOptions = {
  Category: ['Phones', 'Laptops'],
  Processor: ['A18 Pro', 'Snapdragon 8 Gen 4', 'Snapdragon 8s Gen 3', 'Apple M4 Max', 'Intel Core Ultra 9', 'AMD Ryzen AI 9', 'Core i5 6th Gen'],
  Storage: ['256GB', '512GB', '1TB', '2TB', '4TB', '256GB SSD'],
};

function lcg(seed) {
  return ((seed * 1664525 + 1013904223) & 0x7fffffff) / 0x80000000;
}

function Particles({ count = 15 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const s = i + 1;
      return {
        id: i,
        x: lcg(s * 3 + 1) * 100,
        y: lcg(s * 7 + 2) * 100,
        size: lcg(s * 11 + 3) * 2 + 1,
        duration: lcg(s * 13 + 4) * 12 + 18,
        delay: lcg(s * 17 + 5) * 10,
      };
    }), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient-container" aria-hidden="true">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <div className="ambient-orb ambient-orb--tertiary" />
      <div className="ambient-noise" />
    </div>
  );
}

function Hero({ onShopNow }) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <Particles count={18} />

      <div className="max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: easePremium }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/[0.06] text-[11px] font-medium tracking-[0.15em] uppercase text-[#3B82F6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Free shipping on orders over $999
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: easePremium }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] mb-6 max-w-5xl mx-auto"
        >
          <span className="text-[#F5F7FA]">Next Generation</span>
          <br />
          <span className="text-[#F5F7FA]/40 font-light">Technology.</span>
          <br />
          <span className="text-[#F5F7FA]">Curated For</span>
          <br />
          <span className="text-[#3B82F6]">Modern Living.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: easePremium }}
          className="text-sm md:text-base text-white/40 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          Discover a hand-selected collection of the world&rsquo;s most advanced flagship devices
          and premium laptops. Engineered for those who demand excellence in every detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: easePremium }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={onShopNow} className="btn-premium btn-premium--primary text-xs">
            Shop Collection
            <ArrowRight size={14} />
          </button>
          <button onClick={onShopNow} className="btn-premium btn-premium--secondary text-xs">
            Explore Devices
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 1.2, ease: easePremium }}
          className="mt-16 md:mt-20 flex items-center justify-center"
        >
          <div className="device-frame inline-flex items-center justify-center p-8 md:p-12">
            <svg viewBox="0 0 240 390" className="w-32 md:w-40 h-auto" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="8" y="2" width="224" height="386" rx="24" className="stroke-white/30" />
              <rect x="16" y="12" width="208" height="340" rx="12" className="stroke-white/[0.06]" />
              <circle cx="120" cy="362" r="6" className="stroke-white/20" />
              <rect x="96" y="6" width="48" height="10" rx="5" className="stroke-white/15" />
              <line x1="60" y1="80" x2="180" y2="80" className="stroke-white/[0.04]" strokeWidth="0.5" />
              <line x1="60" y1="100" x2="150" y2="100" className="stroke-white/[0.04]" strokeWidth="0.5" />
              <line x1="60" y1="120" x2="170" y2="120" className="stroke-white/[0.04]" strokeWidth="0.5" />
              <line x1="60" y1="140" x2="130" y2="140" className="stroke-white/[0.04]" strokeWidth="0.5" />
              <rect x="80" y="260" width="80" height="80" rx="8" className="stroke-white/[0.08]" strokeWidth="0.5" />
              <circle cx="120" cy="298" r="20" className="stroke-white/[0.08]" strokeWidth="0.5" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: easePremium }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {[
            { icon: Shield, label: 'Official', sub: 'Warranty' },
            { icon: Truck, label: 'Fast', sub: 'Delivery' },
            { icon: HeadphonesIcon, label: 'Premium', sub: 'Support' },
            { icon: CreditCard, label: 'Secure', sub: 'Payments' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="floating-card justify-center">
                <Icon size={16} className="text-[#3B82F6]" />
                <div className="text-left">
                  <p className="text-[11px] font-medium text-white/80 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-white/40 leading-tight">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ProductShowcase({
  searchQuery, setSearchQuery, filteredProducts, handleWhatsApp,
  filterOptions, selectedFilters, toggleFilter, activeFilterCount, clearAllFilters
}) {
  const [expandedFilter, setExpandedFilter] = useState('Category');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <section className="relative z-10 px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollReveal}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
              The Collection
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA]">
            Flagship Devices
          </h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg font-light">
            Carefully selected premium devices, each chosen for their exceptional build quality and performance.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollReveal}
          className="mb-10"
        >
          <div className="glass-input max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search by device, processor, storage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block fixed inset-0 z-40 bg-[#0B0F14]/95 p-6 pt-24 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="glass-panel--sharp p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={13} className="text-white/30" />
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Filters</h3>
                  </div>
                  {activeFilterCount > 0 && (
                    <span className="text-[10px] font-bold text-[#3B82F6]">{activeFilterCount}</span>
                  )}
                </div>

                <div className="space-y-1">
                  {Object.entries(filterOptions).map(([filterName, values]) => {
                    const isOpen = expandedFilter === filterName;
                    const selectedInCategory = selectedFilters[filterName]?.length || 0;
                    return (
                      <div key={filterName} className="border-b border-white/[0.04] last:border-b-0">
                        <button
                          onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                          className="w-full flex items-center justify-between py-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors duration-150"
                        >
                          <span>{filterName}</span>
                          <div className="flex items-center gap-2">
                            {selectedInCategory > 0 && (
                              <span className="text-[10px] font-bold text-[#3B82F6]">{selectedInCategory}</span>
                            )}
                            <ChevronDown size={12} className={`text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="pb-4 space-y-2.5">
                            {values.map((value) => {
                              const isChecked = selectedFilters[filterName]?.includes(value) || false;
                              return (
                                <label key={value} className="flex items-center gap-3 cursor-pointer group py-0.5">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => toggleFilter(filterName, value)}
                                    className="appearance-none w-4 h-4 rounded-md border border-white/20 bg-transparent checked:bg-[#3B82F6] checked:border-[#3B82F6] transition-all duration-300"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                  />
                                  <span className={`text-xs transition-colors duration-150 ${isChecked ? 'text-[#3B82F6]' : 'text-white/30 group-hover:text-white/50'}`}>
                                    {value}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {mobileFiltersOpen && (
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-4 py-3 bg-white/10 text-white text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[100px] border border-white/10 hover:bg-white/20 transition-all duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  Close Filters
                </button>
              )}
            </div>
          </div>

          {!mobileFiltersOpen && (
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-3 glass-pill text-white text-[10px] font-semibold tracking-[0.15em] uppercase shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && <span className="text-[#3B82F6]">({activeFilterCount})</span>}
            </button>
          )}

          <div className="lg:col-span-4">
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: easePremium }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] px-5 py-3 bg-[#161B22]">
                  <span className="text-xs text-white/40">
                    <span className="text-white font-medium">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-[#3B82F6] transition-all duration-300"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    Clear All
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <div className="product-card h-full flex flex-col group relative">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0B0F14]/60 backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:border-[#3B82F6]/30"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                      >
                        <Heart
                          size={14}
                          className={`transition-colors duration-300 ${wishlist.has(product.id) ? 'text-red-400 fill-red-400' : 'text-white/40'}`}
                        />
                      </button>

                      <div className="h-52 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent border-b border-white/[0.03] relative overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: easePremium }}
                          className="transition-all duration-700 group-hover:scale-110"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                          <product.Image />
                        </motion.div>

                        {product.badge && (
                          <span className="absolute top-3 left-3 badge-premium text-[9px]">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col p-6 space-y-3">
                        <div>
                          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/30">
                            {product.category}
                          </span>
                          <h3 className="text-sm font-medium text-white/80 mt-1.5 leading-snug group-hover:text-white transition-colors duration-500"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            {product.name}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {[product.processor.split(' ').slice(0, 2).join(' '), product.storage.split('/')[0].trim(), product.display.split(' ')[0]].map((spec, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/40 font-light">
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />
                          ))}
                          <span className="text-[10px] text-white/30 ml-1">{product.rating}</span>
                        </div>

                        <div className="flex items-baseline justify-between mt-2 pt-3 border-t border-white/[0.04]">
                          <div className="flex items-baseline gap-3">
                            <span className="text-xl font-medium text-[#F5F7FA] tracking-tight">
                              ${product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-white/20 line-through">
                                ${product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-amber-400'}`} />
                            <span className={`text-[10px] ${product.inStock ? 'text-green-400/70' : 'text-amber-400/70'}`}>
                              {product.inStock ? 'In Stock' : 'Low Stock'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleWhatsApp(product)}
                          className="w-full py-3 mt-1 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[100px] border border-white/10 text-white/70 hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all duration-500"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            Inquire
                            <ArrowRight size={12} />
                          </span>
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
                  <div className="text-center py-20 rounded-3xl border border-white/[0.04] bg-[#161B22]">
                    <p className="text-white/40 text-sm mb-1">No products match your filters.</p>
                    <p className="text-white/20 text-xs mb-4">Try adjusting your search or filter criteria.</p>
                    <button
                      onClick={clearAllFilters}
                      className="btn-premium btn-premium--ghost text-[10px]"
                    >
                      Clear all filters
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 pt-6 border-t border-white/[0.04] text-center"
            >
              <p className="text-xs text-white/20 tracking-wider">
                Showing <span className="text-white font-medium">{filteredProducts.length}</span> of{' '}
                <span className="text-white font-medium">{products.length}</span> devices
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  const categories = [
    { icon: Smartphone, title: 'Flagship Phones', desc: 'Premium mobile technology', highlight: '6 Devices' },
    { icon: Monitor, title: 'Premium Laptops', desc: 'Professional computing power', highlight: '12 Devices' },
    { icon: Gamepad2, title: 'Gaming Setup', desc: 'High-performance rigs', highlight: '8 Devices' },
  ];

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollReveal}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
              Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA]">
            Explore Our Range
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                transition={{ delay: i * 0.12 }}
                className="group cursor-pointer"
              >
                <div className="product-card p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/[0.08] border border-[#3B82F6]/[0.12] flex items-center justify-center mb-5 group-hover:bg-[#3B82F6]/[0.12] transition-all duration-500">
                    <Icon size={22} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{cat.title}</h3>
                  <p className="text-sm text-white/40 font-light flex-1">{cat.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-[11px] text-[#3B82F6] font-medium group-hover:gap-3 transition-all duration-500">
                    <span>{cat.highlight}</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyPremiumTec() {
  const features = [
    {
      icon: Shield, title: 'Authorized Products',
      desc: 'Every device is sourced directly from official distributors. 100% authentic with full manufacturer warranty.'
    },
    {
      icon: Truck, title: 'Free Express Delivery',
      desc: 'Complimentary express shipping on all orders over $999. Same-day dispatch for in-stock items within Harare.'
    },
    {
      icon: Star, title: 'Best Price Guarantee',
      desc: 'Found a lower price elsewhere? We will match it. Premium technology should never mean overpaying.'
    },
  ];

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollReveal}
          className="mb-14 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA]">
            Why PremiumTec
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                transition={{ delay: i * 0.12 }}
              >
                <div className="section-premium h-full text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/[0.08] border border-[#3B82F6]/[0.12] flex items-center justify-center mb-5 mx-auto md:mx-0">
                    <Icon size={22} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-3">{f.title}</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CustomerReviews() {
  const reviews = [
    {
      name: 'Sarah M.', role: 'Verified Buyer',
      text: 'Absolutely exceptional service. My MacBook Pro arrived within 24 hours, perfectly packaged. The price was unbeatable for a brand-new device.',
      rating: 5
    },
    {
      name: 'James K.', role: 'Verified Buyer',
      text: 'The attention to detail sets them apart. From the unboxing experience to the post-purchase support — truly a premium experience.',
      rating: 5
    },
    {
      name: 'Tatenda R.', role: 'Verified Buyer',
      text: 'I have bought three devices from PremiumTec now. The authenticity guarantee gives me complete peace of mind. Highly recommend.',
      rating: 5
    },
  ];

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollReveal}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA]">
            What Our Customers Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              transition={{ delay: i * 0.12 }}
            >
              <div className="product-card p-8 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className={s < review.rating ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />
                  ))}
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed flex-1 mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-white/[0.04]">
                  <p className="text-sm font-medium text-white/80">{review.name}</p>
                  <p className="text-[11px] text-white/30">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scaleIn}
          className="section-premium text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/[0.03] to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#3B82F6] mb-4 block">
              Stay Connected
            </span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#F5F7FA] mb-4">
              Stay Ahead of the Curve
            </h3>
            <p className="text-sm text-white/40 font-light mb-8 max-w-md mx-auto">
              Be the first to know about new arrivals, exclusive offers, and limited-edition releases.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="glass-input flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <button
                onClick={() => { if (email) setEmail(''); }}
                className="btn-premium btn-premium--primary text-[10px] whitespace-nowrap w-full sm:w-auto justify-center"
              >
                Subscribe
                <ArrowRight size={12} />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoSection() {
  const infoItems = [
    {
      icon: MapPin, title: 'Location', accent: 'Harare, Zimbabwe',
      lines: ['Corner Speke & Mbuya Nehanda', 'Sirus Mall, 1st Floor'],
    },
    {
      icon: Clock, title: 'Hours', accent: 'Same-Day Delivery',
      lines: ['Monday — Saturday', '08:30 — 17:00'],
    },
    {
      icon: Package, title: 'Shipping', accent: 'Fast & Reliable',
      lines: ['Same-day within Harare', 'Nationwide across Zimbabwe'],
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative z-10 px-6 py-24 border-t border-white/[0.04]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={scrollReveal} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
              Showroom
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA]">
            Visit Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={scrollReveal}
                transition={{ delay: i * 0.1 }}
                className="product-card p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/[0.08] border border-[#3B82F6]/[0.12] flex items-center justify-center">
                    <Icon size={16} className="text-[#3B82F6]" />
                  </div>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">
                    {item.title}
                  </span>
                </div>
                {item.lines.map((line, j) => (
                  <p key={j} className={`${j === 0 ? 'text-sm text-white/70 font-medium' : 'text-sm text-white/40 leading-relaxed mt-1'}`}>
                    {line}
                  </p>
                ))}
                <p className="text-sm font-medium text-[#3B82F6] mt-4">{item.accent}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={scrollReveal} className="mt-6 product-card p-8 md:p-10 text-center">
          <h3 className="text-lg font-bold tracking-tight text-white/80">Stay Updated</h3>
          <p className="text-sm text-white/30 max-w-lg mx-auto mt-2 leading-relaxed font-light">
            Join our WhatsApp channel for daily stock updates and exclusive product arrivals.
          </p>
          <a
            href="https://whatsapp.com/channel/0029Vb6hJE6F1YlVNfnyBk21"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 btn-premium btn-premium--secondary text-[10px]"
          >
            Join Channel
            <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function TechStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const mainRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: mainRef, offset: ['start start', 'end start'] });
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 4]);
  const springBlur = useSpring(heroBlur, { stiffness: 80, damping: 25 });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const q = searchQuery.toLowerCase();
      const searchMatch =
        product.name.toLowerCase().includes(q) ||
        product.processor.toLowerCase().includes(q) ||
        product.storage.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      const filterMatch = Object.entries(selectedFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === 'Category') return values.includes(product.category);
        if (key === 'Processor') return values.some(v => product.processor.includes(v));
        if (key === 'Storage') return values.some(v => product.storage.includes(v));
        return true;
      });

      return searchMatch && filterMatch;
    });
  }, [searchQuery, selectedFilters]);

  const handleWhatsApp = useCallback((product) => {
    const message = `Hi PremiumTec, I'd like to inquire about:\n\nProduct: ${product.name}\nSpecs: ${product.processor} | ${product.storage} | ${product.display}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability.`;
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

  const scrollToProducts = useCallback(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0B0F14] relative overflow-x-hidden">
      <AmbientBackground />

      <div className="relative z-10">
        <motion.div style={{ filter: `blur(${springBlur}px)` }}>
          <Hero onShopNow={scrollToProducts} />
        </motion.div>

        <FeaturedCategories />

        <div id="products">
          <ProductShowcase
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredProducts={filteredProducts}
            handleWhatsApp={handleWhatsApp}
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            activeFilterCount={activeFilterCount}
            clearAllFilters={clearAllFilters}
          />
        </div>

        <WhyPremiumTec />
        <CustomerReviews />
        <NewsletterSection />
        <InfoSection />
      </div>

      {/* Floating mobile cart button */}
      <button
        onClick={scrollToProducts}
        className="fixed bottom-6 right-6 z-40 md:hidden w-14 h-14 rounded-full bg-[#3B82F6] text-white shadow-[0_4px_24px_rgba(59,130,246,0.35)] flex items-center justify-center hover:bg-[#2563EB] transition-all duration-500 active:scale-95"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <ShoppingBag size={20} />
      </button>
    </div>
  );
}
