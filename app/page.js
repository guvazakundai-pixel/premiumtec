'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, ChevronDown, SlidersHorizontal,
  Shield, Truck, HeadphonesIcon, CreditCard, Star,
  Heart, Check, ShoppingBag, ChevronRight,
  MapPin, Clock, Package, Smartphone, Monitor, Gamepad2,
  Wrench, Cpu, HardDrive, MonitorSmartphone, Zap,
  RefreshCw, Users, Award, Clock3, Gamepad
} from 'lucide-react';
import { products as allProducts } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } }
};

const products = allProducts;

const filterOptions = {
  Category: [...new Set(products.map(p => p.category))],
  Processor: [...new Set(products.filter(p => p.processor !== 'N/A').map(p => p.processor))],
  Storage: [...new Set(products.filter(p => p.storage !== 'N/A').map(p => p.storage))],
};

function lcg(seed) {
  return ((seed * 1664525 + 1013904223) & 0x7fffffff) / 0x80000000;
}

function Particles({ count = 20 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const s = i + 1;
      return {
        id: i, x: lcg(s * 3 + 1) * 100, y: lcg(s * 7 + 2) * 100,
        size: lcg(s * 11 + 3) * 2 + 1.5,
        duration: lcg(s * 13 + 4) * 14 + 20,
        delay: lcg(s * 17 + 5) * 12,
      };
    }), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            background: p.id % 3 === 0 ? 'rgba(37, 99, 235, 0.3)' : p.id % 3 === 1 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.15)',
          }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function Hero({ onShop, onRepairs }) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
      <Particles count={24} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/[0.03] via-transparent to-[#0A1224] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/[0.06] text-[11px] font-medium tracking-[0.12em] uppercase text-[#38BDF8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            Premium Tech Store — Harare, Zimbabwe
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-5"
        >
          <span className="text-[#F1F5F9]">Next-Level</span>
          <br />
          <span className="gradient-text">Tech Starts Here</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease }}
          className="text-sm md:text-base text-white/40 max-w-xl mx-auto leading-relaxed mb-10 font-light"
        >
          High-performance laptops, gaming setups, repairs, and premium accessories — curated for those who demand the best.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={onShop} className="btn-premium btn-premium--primary text-xs px-8 py-3.5">
            Browse Devices
            <ArrowRight size={14} />
          </button>
          <button onClick={onRepairs} className="btn-premium btn-premium--secondary text-xs px-8 py-3.5">
            Book Repairs
            <Wrench size={14} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7, ease }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {[
            { icon: Shield, label: 'Official', sub: 'Warranty' },
            { icon: Truck, label: 'Fast', sub: 'Delivery' },
            { icon: HeadphonesIcon, label: 'Premium', sub: 'Support' },
            { icon: CreditCard, label: 'Secure', sub: 'Payments' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.04] bg-white/[0.015]">
                <Icon size={15} className="text-[#2563EB]" />
                <div className="text-left">
                  <p className="text-[11px] font-medium text-white/80 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-white/35 leading-tight">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  const cats = [
    { icon: Monitor, title: 'Laptops', desc: 'Premium & budget computing', count: 18, slug: '/laptops', color: '#2563EB' },
    { icon: Gamepad2, title: 'Gaming', desc: 'Consoles, desktops & monitors', count: 5, slug: '/gaming', color: '#7C3AED' },
    { icon: Wrench, title: 'Repairs', desc: 'Diagnostics, upgrades & fixes', count: null, slug: '/repairs', color: '#059669' },
    { icon: Package, title: 'Accessories', desc: 'Printers, chargers & more', count: 3, slug: '/accessories', color: '#D97706' },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Categories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Explore Our Range</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.title}
                href={cat.slug}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.1 }}
                className="group block"
              >
                <div className="glass-card p-7 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03] pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${cat.color}, transparent)`, transform: 'translate(30%, -30%)' }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}20` }}>
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-1.5">{cat.title}</h3>
                  <p className="text-sm text-white/35 font-light flex-1">{cat.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-medium transition-all duration-500 group-hover:gap-2.5"
                    style={{ color: cat.color }}>
                    <span>Explore</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
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
  const { addItem } = useCart();
  const [notify, setNotify] = useState(null);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleAdd = useCallback((product) => {
    addItem(product);
    setNotify(`${product.name} added to cart`);
    setTimeout(() => setNotify(null), 2000);
  }, [addItem]);

  return (
    <section id="products" className="relative z-10 px-6 py-24 md:py-32">
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-orb ambient-orb--primary" />
        <div className="ambient-orb ambient-orb--secondary" />
      </div>

      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium border border-[#2563EB]/20"
          style={{ background: 'rgba(37, 99, 235, 0.12)', backdropFilter: 'blur(12px)' }}
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Collection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Premium Devices</h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg font-light">
            Carefully selected devices, each chosen for exceptional build quality and performance.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mb-10"
        >
          <div className="glass-input max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input
                type="text"
                placeholder="Search devices, processors, storage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters sidebar */}
          <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block fixed inset-0 z-40 bg-[#0A1224]/95 p-6 pt-24 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={13} className="text-white/30" />
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">Filters</h3>
                  </div>
                  {activeFilterCount > 0 && <span className="text-[10px] font-bold text-[#2563EB]">{activeFilterCount}</span>}
                </div>
                <div className="space-y-1">
                  {Object.entries(filterOptions).map(([filterName, values]) => {
                    const isOpen = expandedFilter === filterName;
                    const selectedInCategory = selectedFilters[filterName]?.length || 0;
                    return (
                      <div key={filterName} className="border-b border-white/[0.04] last:border-b-0">
                        <button onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                          className="w-full flex items-center justify-between py-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 hover:text-white/60 transition-colors">
                          <span>{filterName}</span>
                          <div className="flex items-center gap-2">
                            {selectedInCategory > 0 && <span className="text-[10px] font-bold text-[#2563EB]">{selectedInCategory}</span>}
                            <ChevronDown size={12} className={`text-white/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="pb-4 space-y-2.5">
                            {values.map((value) => {
                              const isChecked = selectedFilters[filterName]?.includes(value) || false;
                              return (
                                <label key={value} className="flex items-center gap-3 cursor-pointer group py-0.5">
                                  <input type="checkbox" checked={isChecked} onChange={() => toggleFilter(filterName, value)}
                                    className="appearance-none w-4 h-4 rounded-md border border-white/20 bg-transparent checked:bg-[#2563EB] checked:border-[#2563EB] transition-all duration-300"
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} />
                                  <span className={`text-xs transition-colors ${isChecked ? 'text-[#38BDF8]' : 'text-white/30 group-hover:text-white/50'}`}>{value}</span>
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
                <button onClick={() => setMobileFiltersOpen(false)}
                  className="w-full mt-4 py-3 bg-white/10 text-white text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border border-white/10 hover:bg-white/20 transition-all duration-500">
                  Close Filters
                </button>
              )}
            </div>
          </div>

          {!mobileFiltersOpen && (
            <button onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-3 glass-pill text-white text-[10px] font-semibold tracking-[0.15em] uppercase shadow-xl">
              <SlidersHorizontal size={13} /> Filters{activeFilterCount > 0 && <span className="text-[#2563EB]">({activeFilterCount})</span>}
            </button>
          )}

          {/* Products grid */}
          <div className="lg:col-span-4">
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, ease }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] px-5 py-3 bg-[#0F1A2E]">
                  <span className="text-xs text-white/40">
                    <span className="text-white font-medium">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                  </span>
                  <button onClick={clearAllFilters} className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-[#2563EB] transition-all duration-300">
                    Clear All
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={fadeUp}>
                    <div className="product-card h-full flex flex-col group relative">
                      <button onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0A1224]/70 backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:border-[#2563EB]/30">
                        <Heart size={14} className={`transition-colors duration-300 ${wishlist.has(product.id) ? 'text-red-400 fill-red-400' : 'text-white/40'}`} />
                      </button>

                      <a href={`/products/${product.slug}`} className="h-48 flex items-center justify-center bg-gradient-to-b from-white/[0.015] to-transparent border-b border-white/[0.03] relative overflow-hidden">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease }}
                          className="transition-all duration-700 group-hover:scale-110 w-full h-full flex items-center justify-center p-4"
                        >
                          {product.image ? (
                            <img src={product.image} alt={product.name}
                              className="w-full h-full object-contain rounded-xl"
                              style={{ maxWidth: '170px', maxHeight: '150px' }} />
                          ) : (
                            <div className="w-24 h-32 rounded-xl border border-white/10 flex items-center justify-center text-white/20 text-xs bg-white/[0.02]">
                              {product.name.split(' ').slice(0, 2).join(' ')}
                            </div>
                          )}
                        </motion.div>
                        {product.badge && (
                          <span className="absolute top-3 left-3 badge-premium text-[9px]">{product.badge}</span>
                        )}
                      </a>

                      <div className="flex-1 flex flex-col p-5 space-y-2.5">
                        <div>
                          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/30">{product.category}</span>
                          <a href={`/products/${product.slug}`}>
                            <h3 className="text-sm font-medium text-white/80 mt-1 leading-snug group-hover:text-white transition-colors duration-500">{product.name}</h3>
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {[product.processor.split(' ').slice(0, 2).join(' '), product.storage.split('/')[0].trim(), product.display.split(' ')[0]].map((spec, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/40 font-light">{spec}</span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />
                          ))}
                          <span className="text-[10px] text-white/30 ml-1">{product.rating}</span>
                        </div>

                        <div className="flex items-baseline justify-between pt-2.5 border-t border-white/[0.04]">
                          <div className="flex items-baseline gap-3">
                            <span className="text-lg font-semibold text-[#F1F5F9] tracking-tight">${product.price.toLocaleString()}</span>
                            {product.originalPrice && <span className="text-xs text-white/20 line-through">${product.originalPrice.toLocaleString()}</span>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-amber-400'}`} />
                            <span className={`text-[10px] ${product.inStock ? 'text-green-400/70' : 'text-amber-400/70'}`}>{product.inStock ? 'In Stock' : 'Low Stock'}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button onClick={() => handleAdd(product)}
                            disabled={!product.inStock}
                            className="flex-1 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:shadow-[0_4px_20px_rgba(37,99,235,0.25)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed">
                            Add to Cart
                          </button>
                          <button onClick={() => handleWhatsApp(product)}
                            className="px-4 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-500">
                            Inquire
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full">
                  <div className="text-center py-20 rounded-2xl border border-white/[0.04] bg-[#0F1A2E]">
                    <p className="text-white/40 text-sm mb-1">No products match your filters.</p>
                    <p className="text-white/20 text-xs mb-4">Try adjusting your search or filter criteria.</p>
                    <button onClick={clearAllFilters} className="btn-premium btn-premium--ghost text-[10px]">Clear all filters</button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
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

function WhyChooseUs() {
  const features = [
    { icon: Shield, title: '100% Authentic', desc: 'Every device sourced from official distributors. Full manufacturer warranty included.' },
    { icon: Truck, title: 'Free Express Delivery', desc: 'Complimentary express shipping on orders over $999. Same-day within Harare.' },
    { icon: Star, title: 'Best Price Guarantee', desc: 'Found a lower price? We will match it. Premium tech should never mean overpaying.' },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Why Tech Store</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <div className="glass-card p-7 h-full text-center md:text-left">
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/15 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Icon size={20} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2">{f.title}</h3>
                  <p className="text-sm text-white/35 font-light leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GamingShowcase() {
  const items = [
    { title: 'Gaming Desktops', desc: 'Core i7 & i9 rigs with dedicated GPUs and RGB cooling', price: 'From $1,000', color: '#7C3AED' },
    { title: 'Consoles', desc: 'PlayStation 5 & Xbox Series X — 4K gaming', price: 'From $550', color: '#2563EB' },
    { title: 'Gaming Laptops', desc: 'HP Pavilion, ASUS ROG — high-refresh rate displays', price: 'From $590', color: '#059669' },
    { title: 'Monitors & Gear', desc: '24" displays, mechanical keyboards, and accessories', price: 'From $155', color: '#D97706' },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#A855F7]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Gaming</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Gaming Setup</h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg font-light">
            Consoles, desktops, monitors, and gear for every level of play.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={scaleIn} transition={{ delay: i * 0.1 }}>
              <div className="glass-card p-7 h-full flex flex-col relative overflow-hidden group cursor-pointer">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle, ${item.color}, transparent)` }} />
                <div className="flex items-center gap-3 mb-3">
                  <Gamepad size={18} style={{ color: item.color }} />
                  <h3 className="text-base font-semibold text-white/90">{item.title}</h3>
                </div>
                <p className="text-sm text-white/35 font-light flex-1">{item.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
                  <span className="text-sm font-medium" style={{ color: item.color }}>{item.price}</span>
                  <span className="text-xs text-white/25 group-hover:text-white/50 transition-colors flex items-center gap-1">
                    View <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RepairServices() {
  const services = [
    { icon: MonitorSmartphone, title: 'Diagnostics', desc: 'Comprehensive hardware and software diagnostics.', time: '30 min', badge: 'Quick' },
    { icon: Cpu, title: 'Hardware Upgrades', desc: 'RAM, SSD storage, and processor upgrades.', time: '1-2 hrs', badge: 'Popular' },
    { icon: HardDrive, title: 'Screen Repairs', desc: 'Cracked screen replacement for laptops and phones.', time: '2-4 hrs', badge: null },
    { icon: Zap, title: 'Virus Removal', desc: 'Malware removal and system optimization.', time: '1 hr', badge: 'Fast' },
    { icon: RefreshCw, title: 'OS Installation', desc: 'Windows, macOS reinstallation and setup.', time: '1-2 hrs', badge: null },
    { icon: Wrench, title: 'General Service', desc: 'Battery replacement, keyboard fixes, and more.', time: 'Varies', badge: null },
  ];

  return (
    <section id="repairs" className="relative z-10 px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#059669] to-[#10B981]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Services</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Repair & Upgrade Center</h2>
          <p className="text-sm text-white/30 mt-3 max-w-lg font-light">
            Professional repairs, upgrades, and maintenance for all your devices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.07 }}>
                <div className="glass-card p-6 h-full flex flex-col group hover:border-[#059669]/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#059669]/10 border border-[#059669]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon size={18} className="text-[#059669]" />
                    </div>
                    {svc.badge && (
                      <span className="text-[9px] px-2.5 py-1 rounded-full bg-[#059669]/10 text-[#059669] font-medium border border-[#059669]/15">
                        {svc.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white/85 mb-1.5">{svc.title}</h3>
                  <p className="text-xs text-white/35 font-light flex-1">{svc.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/[0.04]">
                    <Clock3 size={11} className="text-white/25" />
                    <span className="text-[10px] text-white/30">{svc.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 text-center">
          <a href="https://wa.me/263780579633?text=Hi%20Tech%20Store%2C%20I%20need%20a%20repair%20or%20upgrade%20service."
            target="_blank" rel="noopener noreferrer"
            className="btn-premium btn-premium--secondary text-xs">
            Book a Repair <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStats() {
  const stats = [
    { icon: Clock3, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: Award, value: '100%', label: 'Authentic Products' },
    { icon: Shield, value: '1yr', label: 'Warranty Included' },
  ];

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} transition={{ delay: i * 0.12 }}
                  className="text-center">
                  <Icon size={22} className="text-[#2563EB] mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-[#F1F5F9] tracking-tight">{stat.value}</p>
                  <p className="text-xs text-white/35 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: 'Sarah M.', role: 'Verified Buyer', text: 'Absolutely exceptional service. My MacBook Pro arrived within 24 hours, perfectly packaged. The price was unbeatable for a brand-new device.', rating: 5 },
    { name: 'James K.', role: 'Verified Buyer', text: 'The attention to detail sets them apart. From the unboxing experience to the post-purchase support — truly a premium experience.', rating: 5 },
    { name: 'Tatenda R.', role: 'Verified Buyer', text: 'I have bought three devices from Tech Store now. The authenticity guarantee gives me complete peace of mind. Highly recommend.', rating: 5 },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={scaleIn} transition={{ delay: i * 0.1 }}>
              <div className="glass-card p-7 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className={s < review.rating ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />
                  ))}
                </div>
                <p className="text-sm text-white/55 font-light leading-relaxed flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/[0.04]">
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

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse our collection, add items to your cart, and checkout via WhatsApp. Our team confirms availability and arranges payment.' },
    { q: 'What payment methods do you accept?', a: 'EcoCash, Innbucks, Visa, Mastercard, and ZIPIT. Full payment is required before dispatch.' },
    { q: 'Do you deliver nationwide?', a: 'Yes. Same-day within Harare (orders before 14:00). Nationwide takes 1-3 business days via courier.' },
    { q: 'Are your products authentic?', a: 'Absolutely. Every device is sourced from official distributors with full manufacturer warranty.' },
    { q: 'What repairs do you offer?', a: 'Screen repairs, hardware upgrades, virus removal, OS installation, battery replacement, and more.' },
  ];

  return (
    <section className="relative z-10 px-6 py-24 md:py-28">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#F1F5F9]">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center justify-between gap-2">
                {faq.q}
                <ChevronDown size={14} className={`text-white/20 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-sm text-white/40 font-light leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={scaleIn}
          className="glass-card text-center relative overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/[0.03] to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#38BDF8] mb-4 block">Stay Connected</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#F1F5F9] mb-3">Stay Ahead of the Curve</h3>
            <p className="text-sm text-white/35 font-light mb-8 max-w-md mx-auto">
              New arrivals, exclusive offers, and limited editions — straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="glass-input flex-1 w-full">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none" />
              </div>
              <button onClick={() => { if (email) setEmail(''); }}
                className="btn-premium btn-premium--primary text-[10px] whitespace-nowrap w-full sm:w-auto justify-center">
                Subscribe <ArrowRight size={12} />
              </button>
            </div>
            <p className="text-[10px] text-white/20 mt-4">No spam. Unsubscribe at any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoSection() {
  const infoItems = [
    { icon: MapPin, title: 'Location', accent: 'Harare, Zimbabwe', lines: ['Corner Speke & Mbuya Nehanda', 'Sirus Mall, 1st Floor'] },
    { icon: Clock, title: 'Hours', accent: 'Same-Day Delivery', lines: ['Monday — Saturday', '08:30 — 17:00'] },
    { icon: Package, title: 'Shipping', accent: 'Fast & Reliable', lines: ['Same-day within Harare', 'Nationwide across Zimbabwe'] },
  ];

  return (
    <section className="relative z-10 px-6 py-24 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Showroom</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9]">Visit Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {infoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="glass-card p-6 md:p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/15 flex items-center justify-center">
                    <Icon size={16} className="text-[#2563EB]" />
                  </div>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">{item.title}</span>
                </div>
                {item.lines.map((line, j) => (
                  <p key={j} className={`${j === 0 ? 'text-sm text-white/70 font-medium' : 'text-sm text-white/40 leading-relaxed mt-1'}`}>{line}</p>
                ))}
                <p className="text-sm font-medium text-[#38BDF8] mt-4">{item.accent}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="mt-6 glass-card p-8 text-center">
          <h3 className="text-lg font-bold tracking-tight text-white/80">Stay Updated</h3>
          <p className="text-sm text-white/30 max-w-lg mx-auto mt-2 leading-relaxed font-light">
            Join our WhatsApp channel for daily stock updates and exclusive product arrivals.
          </p>
          <a href="https://whatsapp.com/channel/0029Vb6hJE6F1YlVNfnyBk21" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 btn-premium btn-premium--secondary text-[10px]">
            Join Channel <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function TechStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const mainRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: mainRef, offset: ['start start', 'end start'] });
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 3]);
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
    const message = `Hi Tech Store, I'd like to inquire about:\n\nProduct: ${product.name}\nSpecs: ${product.processor} | ${product.storage} | ${product.display}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability.`;
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

  const scrollToRepairs = useCallback(() => {
    const el = document.getElementById('repairs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0A1224] relative overflow-x-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10">
        <motion.div style={{ filter: `blur(${springBlur}px)` }}>
          <Hero onShop={scrollToProducts} onRepairs={scrollToRepairs} />
        </motion.div>

        <CategoryGrid />
        <WhyChooseUs />

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

        <GamingShowcase />

        <div id="repairs">
          <RepairServices />
        </div>

        <TrustStats />
        <Testimonials />
        <FAQ />
        <NewsletterSection />
        <InfoSection />
      </div>

      <button
        onClick={scrollToProducts}
        className="fixed bottom-6 left-6 z-40 md:hidden w-12 h-12 rounded-full bg-[#2563EB] text-white shadow-[0_4px_24px_rgba(37,99,235,0.35)] flex items-center justify-center hover:bg-[#1D4ED8] transition-all duration-500 active:scale-95"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <ShoppingBag size={18} />
      </button>
    </div>
  );
}
