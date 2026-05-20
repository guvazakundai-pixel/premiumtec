'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, X, ArrowRight, ChevronDown, SlidersHorizontal } from 'lucide-react';

/*
 * =============================================================================
 * CUSTOM EASING — The "Premium Curve"
 * =============================================================================
 * cubic-bezier(0.16, 1, 0.3, 1) is the single easing function used for ALL
 * motion in this system. It creates a physics-based feel:
 *   - 0.16: Quick start (minimal hesitation)
 *   - 1:    Amplified mid-phase (the "snap" — feels responsive)
 *   - 0.3:  Gradual deceleration (weighty, premium settling)
 *   - 1:    Full stop (no bounce)
 *
 * This replaces all bouncy, elastic easings. The result is motion that feels
 * deliberate, expensive, and physically-grounded — like a precision-engineered
 * product opening its hinge.
 */
const easePremium = [0.16, 1, 0.3, 1];

const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: easePremium }
  }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.06 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: easePremium }
  }
};

/*
 * =============================================================================
 * PRODUCT DATA — Flagship Phones & Premium Laptops
 * =============================================================================
 * Curated selection of elite mobile and laptop hardware.
 * Images use minimal SVG line-art silhouettes that evoke the clean,
 * hardware-focused aesthetic — no emojis, no cartoonish elements.
 */

const products = [
  {
    id: 1, name: 'iPhone 16 Pro Max', category: 'Phones',
    processor: 'A18 Pro', storage: '256GB / 512GB / 1TB',
    display: '6.9" OLED 120Hz', price: 1599, originalPrice: null,
    badge: 'FLAGSHIP',
    Image: () => (
      <svg viewBox="0 0 120 200" className="w-16 h-28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="8" y="2" width="104" height="196" rx="16" stroke="rgba(255,255,255,0.25)" />
        <rect x="12" y="8" width="96" height="170" rx="10" stroke="rgba(255,255,255,0.08)" />
        <circle cx="60" cy="182" r="4" stroke="rgba(255,255,255,0.15)" />
        <rect x="48" y="4" width="24" height="6" rx="3" stroke="rgba(255,255,255,0.1)" />
      </svg>
    )
  },
  {
    id: 2, name: 'Samsung Galaxy S25 Ultra', category: 'Phones',
    processor: 'Snapdragon 8 Gen 4', storage: '256GB / 512GB / 1TB',
    display: '6.9" Dynamic AMOLED 120Hz', price: 1499, originalPrice: null,
    badge: 'FLAGSHIP',
    Image: () => (
      <svg viewBox="0 0 110 200" className="w-14 h-28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="2" y="2" width="106" height="196" rx="8" stroke="rgba(255,255,255,0.25)" />
        <rect x="6" y="8" width="98" height="170" rx="4" stroke="rgba(255,255,255,0.08)" />
        <circle cx="55" cy="182" r="3" stroke="rgba(255,255,255,0.15)" />
        <rect x="42" y="186" width="26" height="8" rx="2" stroke="rgba(255,255,255,0.1)" />
      </svg>
    )
  },
  {
    id: 3, name: 'Nothing Phone (3)', category: 'Phones',
    processor: 'Snapdragon 8s Gen 3', storage: '256GB / 512GB',
    display: '6.7" OLED 120Hz', price: 799, originalPrice: null,
    badge: 'ICONIC',
    Image: () => (
      <svg viewBox="0 0 100 200" className="w-14 h-28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="4" y="2" width="92" height="196" rx="12" stroke="rgba(255,255,255,0.25)" />
        <rect x="8" y="8" width="84" height="170" rx="8" stroke="rgba(255,255,255,0.08)" />
        <circle cx="50" cy="182" r="3.5" stroke="rgba(255,255,255,0.15)" />
        <line x1="20" y1="30" x2="80" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: 4, name: 'MacBook Pro 16" M4 Max', category: 'Laptops',
    processor: 'Apple M4 Max', storage: '1TB / 2TB / 4TB SSD',
    display: '16.2" Liquid Retina XDR', price: 3499, originalPrice: 3999,
    badge: 'NEW',
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-28 h-18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="4" y="4" width="192" height="110" rx="6" stroke="rgba(255,255,255,0.25)" />
        <rect x="10" y="10" width="180" height="98" rx="3" stroke="rgba(255,255,255,0.06)" />
        <rect x="70" y="114" width="60" height="12" rx="1" stroke="rgba(255,255,255,0.15)" />
        <rect x="80" y="116" width="40" height="8" rx="1" stroke="rgba(255,255,255,0.06)" />
      </svg>
    )
  },
  {
    id: 5, name: 'Dell XPS 16', category: 'Laptops',
    processor: 'Intel Core Ultra 9', storage: '1TB / 2TB SSD',
    display: '16.3" OLED 4K+', price: 2499, originalPrice: null,
    badge: null,
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-28 h-18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="2" y="2" width="196" height="112" rx="4" stroke="rgba(255,255,255,0.25)" />
        <rect x="8" y="8" width="184" height="100" rx="2" stroke="rgba(255,255,255,0.06)" />
        <rect x="65" y="114" width="70" height="14" rx="1" stroke="rgba(255,255,255,0.15)" />
        <line x1="40" y1="20" x2="60" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: 6, name: 'ASUS ROG Zephyrus G16', category: 'Laptops',
    processor: 'AMD Ryzen AI 9', storage: '1TB / 2TB SSD',
    display: '16" OLED 240Hz', price: 2199, originalPrice: null,
    badge: null,
    Image: () => (
      <svg viewBox="0 0 200 130" className="w-28 h-18" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
        <rect x="2" y="2" width="196" height="112" rx="4" stroke="rgba(255,255,255,0.25)" />
        <rect x="8" y="8" width="184" height="100" rx="2" stroke="rgba(255,255,255,0.06)" />
        <rect x="60" y="114" width="80" height="14" rx="1" stroke="rgba(255,255,255,0.15)" />
        <rect x="160" y="18" width="26" height="8" rx="2" stroke="rgba(255,255,255,0.08)" />
      </svg>
    )
  },
];

const filterOptions = {
  Category: ['Phones', 'Laptops'],
  Processor: ['A18 Pro', 'Snapdragon 8 Gen 4', 'Snapdragon 8s Gen 3', 'Apple M4 Max', 'Intel Core Ultra 9', 'AMD Ryzen AI 9'],
  Storage: ['256GB', '512GB', '1TB', '2TB', '4TB'],
};

/*
 * =============================================================================
 * AMBIENT BACKGROUND
 * =============================================================================
 *
 * Three independently animated radial gradient orbs that slowly morph through
 * a purple → cyan → slate grey color cycle. Each orb runs at a different
 * speed (35s / 45s / 55s) with staggered start times so the combined
 * light field never repeats.
 *
 * The .ambient-noise pseudo-element applies an SVG feTurbulence grain overlay
 * that gives the light a tactile, atmospheric quality.
 */
function AmbientBackground() {
  return (
    <div className="ambient-container" aria-hidden="true">
      <div className="ambient-orb ambient-orb--purple" />
      <div className="ambient-orb ambient-orb--cyan" />
      <div className="ambient-orb ambient-orb--slate" />
      <div className="ambient-noise" />
    </div>
  );
}

/*
 * =============================================================================
 * NAVIGATION
 * =============================================================================
 * Transparent sticky nav with glassmorphism. Pure black background with
 * 60px backdrop-blur. Sharp edges, minimal, high contrast.
 */
function Navigation({ onShopNow }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: easePremium }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav h-16"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <span className="text-lg font-bold tracking-tighter text-white select-none">
          TECHSTORE
        </span>

        <div className="hidden md:flex items-center gap-8">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/40">
            Phones
          </span>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/40">
            Laptops
          </span>
          <button
            onClick={onShopNow}
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white border border-white/20 px-5 py-2 hover:bg-white hover:text-black transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Shop Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

/*
 * =============================================================================
 * HERO SECTION
 * =============================================================================
 * High-impact hero with the ambient background bleeding through the glass
 * UI. Features a flagship device silhouette and stark typography.
 */
function Hero({ onShopNow }) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: easePremium }}
        >
          <span className="inline-block text-[10px] font-medium tracking-[0.25em] uppercase text-white/30 mb-8 border border-white/10 px-4 py-2">
            Flagship Phones &amp; Premium Laptops
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: easePremium }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6"
        >
          <span className="text-white">Technology.</span>
          <br />
          <span className="text-white/40 font-light">Redefined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: easePremium }}
          className="text-sm md:text-base text-white/40 max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          The most advanced flagship phones and premium laptops, curated for those
          who demand the absolute best in design and performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: easePremium }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={onShopNow}
            className="px-8 py-3 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/90 transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Explore Collection
          </button>
          <span className="text-[11px] text-white/30 tracking-[0.15em] uppercase">
            Free shipping on orders over $999
          </span>
        </motion.div>

        {/* Device Silhouette — Hero visual anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1.2, ease: easePremium }}
          className="mt-16 md:mt-20 flex items-center justify-center"
        >
          <div className="device-frame inline-flex items-center justify-center p-8 md:p-12">
            <svg viewBox="0 0 240 390" className="w-32 md:w-40 h-auto" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
              <rect x="8" y="2" width="224" height="386" rx="24" stroke="rgba(255,255,255,0.3)" />
              <rect x="16" y="12" width="208" height="340" rx="12" stroke="rgba(255,255,255,0.06)" />
              <circle cx="120" cy="362" r="6" stroke="rgba(255,255,255,0.15)" />
              <rect x="96" y="6" width="48" height="10" rx="5" stroke="rgba(255,255,255,0.1)" />
              <line x1="60" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="60" y1="100" x2="150" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="60" y1="120" x2="170" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <line x1="60" y1="140" x2="130" y2="140" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
              <rect x="80" y="260" width="80" height="80" rx="8" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <circle cx="120" cy="298" r="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/*
 * =============================================================================
 * PRODUCT SHOWCASE
 * =============================================================================
 * Structured dark-mode product grid. Sharp 1px borders, no rounded corners
 * on structural elements. Each card reveals on scroll with a subtle upward
 * fade-in animation using the premium easing curve.
 */
function ProductShowcase({ searchQuery, setSearchQuery, filteredProducts, handleWhatsApp, filterOptions, selectedFilters, toggleFilter, activeFilterCount, clearAllFilters }) {
  const [expandedFilter, setExpandedFilter] = useState('Category');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <section className="relative z-10 px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollReveal}
          className="mb-14"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/20 block mb-4">
            The Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Flagship Devices
          </h2>
          <div className="w-8 h-px bg-white/20 mt-4" />
        </motion.div>

        {/* Search */}
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
          {/* Filter Sidebar */}
          <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block fixed inset-0 z-40 bg-black/90 p-6 pt-20' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="glass-panel--sharp p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={13} className="text-white/30" />
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Filters</h3>
                  </div>
                  {activeFilterCount > 0 && (
                    <span className="text-[10px] font-bold text-white/60">{activeFilterCount}</span>
                  )}
                </div>

                <div className="space-y-1">
                  {Object.entries(filterOptions).map(([filterName, values]) => {
                    const isOpen = expandedFilter === filterName;
                    const selectedInCategory = selectedFilters[filterName]?.length || 0;
                    return (
                      <div key={filterName} className="border-b border-white/5 last:border-b-0">
                        <button
                          onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                          className="w-full flex items-center justify-between py-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors duration-150"
                        >
                          <span>{filterName}</span>
                          <div className="flex items-center gap-2">
                            {selectedInCategory > 0 && (
                              <span className="text-[10px] font-bold text-white/50">{selectedInCategory}</span>
                            )}
                            <ChevronDown
                              size={12}
                              className={`text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
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
                                    className="appearance-none w-3.5 h-3.5 border border-white/20 bg-transparent checked:bg-white checked:border-white transition-all duration-300"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                                  />
                                  <span className={`text-xs transition-colors duration-150 ${isChecked ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`}>
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
                  className="w-full mt-4 py-3 bg-white/10 text-white text-[10px] font-semibold tracking-[0.15em] uppercase border border-white/10 hover:bg-white/20 transition-all duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  Close Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile filter toggle */}
          {!mobileFiltersOpen && (
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-3 glass-pill text-white text-[10px] font-semibold tracking-[0.15em] uppercase"
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && <span className="text-white/60">({activeFilterCount})</span>}
            </button>
          )}

          {/* Product Grid */}
          <div className="lg:col-span-4">
            {/* Active filter indicator */}
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: easePremium }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-center justify-between border border-white/10 px-4 py-3 bg-[#0A0A0A]">
                  <span className="text-xs text-white/40">
                    <span className="text-white font-medium">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-white transition-all duration-300"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={staggerItem}
                  >
                    <div className="product-card h-full flex flex-col group">
                      {/* Image area */}
                      <div className="h-48 flex items-center justify-center bg-white/[0.01] border-b border-white/[0.03] relative">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: easePremium }}
                          className="transition-all duration-700 group-hover:scale-105"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                          <product.Image />
                        </motion.div>

                        {product.badge && (
                          <span className="absolute top-3 left-3 text-[9px] font-medium tracking-[0.15em] uppercase border border-white/20 text-white/60 px-2.5 py-1">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Info area */}
                      <div className="flex-1 flex flex-col p-6 space-y-3">
                        <div>
                          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/20">
                            {product.category}
                          </span>
                          <h3 className="text-sm font-medium text-white/80 mt-1.5 leading-snug group-hover:text-white transition-colors duration-500"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            {product.name}
                          </h3>
                        </div>

                        <div className="text-[11px] text-white/25 font-light leading-relaxed border-t border-white/5 pt-3 space-y-1">
                          <p>{product.processor}</p>
                          <p>{product.storage}</p>
                          <p>{product.display}</p>
                        </div>

                        <div className="flex items-baseline gap-3 mt-auto pt-3 border-t border-white/5">
                          <span className="text-lg font-medium text-white tracking-tight">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-white/20 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleWhatsApp(product)}
                          className="w-full py-3 mt-1 text-[10px] font-semibold tracking-[0.15em] uppercase text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
                          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                          Inquire
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
                  <div className="text-center py-20 border border-white/5 bg-[#0A0A0A]">
                    <p className="text-white/40 text-sm mb-1">No products match your filters.</p>
                    <p className="text-white/20 text-xs mb-4">Try adjusting your search or filter criteria.</p>
                    <button
                      onClick={clearAllFilters}
                      className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-white border border-white/10 px-4 py-2 transition-all duration-500"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
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
              className="mt-10 pt-6 border-t border-white/5 text-center"
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

/*
 * =============================================================================
 * INFO SECTION — Store details
 * =============================================================================
 */
function InfoSection() {
  const infoItems = [
    {
      title: 'Location', accent: 'Harare, Zimbabwe',
      lines: ['Corner Speke & Mbuya Nehanda', 'Sirus Mall, 1st Floor']
    },
    {
      title: 'Hours', accent: 'Same-Day Delivery',
      lines: ['Monday — Saturday', '08:30 — 17:00']
    },
    {
      title: 'Shipping', accent: 'Fast & Reliable',
      lines: ['Same-day within Harare', 'Nationwide across Zimbabwe']
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="relative z-10 px-6 py-24 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={scrollReveal} className="mb-14">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/20 block mb-4">
            Showroom
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Visit Us
          </h2>
          <div className="w-8 h-px bg-white/20 mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.title}
              variants={scrollReveal}
              transition={{ delay: i * 0.1 }}
              className="product-card p-6 md:p-8"
            >
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/20 block mb-4">
                {item.title}
              </span>
              {item.lines.map((line, j) => (
                <p key={j} className={`${j === 0 ? 'text-sm text-white/70 font-medium' : 'text-sm text-white/40 leading-relaxed mt-1'}`}>
                  {line}
                </p>
              ))}
              <p className="text-sm font-medium text-white/60 mt-3">{item.accent}</p>
            </motion.div>
          ))}
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
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            Join Channel
            <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

/*
 * =============================================================================
 * FOOTER
 * =============================================================================
 */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10">
      <div className="max-w-7xl mx-auto text-center space-y-3">
        <span className="text-sm font-bold tracking-tighter text-white/80">TECHSTORE</span>
        <p className="text-xs text-white/20 tracking-wider">
          &copy; {new Date().getFullYear()} TechStore. All rights reserved.
        </p>
        <p className="text-[10px] text-white/10 tracking-[0.15em] uppercase">
          Flagship Phones &bull; Premium Laptops
        </p>
      </div>
    </footer>
  );
}

/*
 * =============================================================================
 * PAGE — TechStore Landing
 * =============================================================================
 */
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
    const message = `Hi TechStore, I'd like to inquire about:\n\nProduct: ${product.name}\nSpecs: ${product.processor} | ${product.storage} | ${product.display}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability.`;
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
    <div ref={mainRef} className="min-h-screen bg-[#000000] relative overflow-x-hidden">
      <AmbientBackground />

      <div className="relative z-10">
        <Navigation onShopNow={scrollToProducts} />

        <motion.div style={{ filter: `blur(${springBlur}px)` }}>
          <Hero onShopNow={scrollToProducts} />
        </motion.div>

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

        <InfoSection />
        <Footer />
      </div>
    </div>
  );
}
