'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, ChevronDown, SlidersHorizontal,
  Shield, Truck, HeadphonesIcon, CreditCard, Star,
  Heart, Check, ShoppingBag, ChevronRight,
  Phone, MessageCircle, MapPin, Clock, Package, Smartphone, Monitor, Gamepad2,
  Wrench, Cpu, HardDrive, MonitorSmartphone, Zap,
  RefreshCw, Users, Award, Clock3, Gamepad,
  Tablet, Laptop, Tv, Speaker, Watch, Camera
} from 'lucide-react';
import { products as allProducts, getBrand, getSubcategory, getUsageType, getAspectRatio, categories } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';
import ProductModal from '@/app/components/ProductModal';

const ease = [0.16, 1, 0.3, 1];

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeUpHero = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.07 } }
};

const products = allProducts;

const filterOptions = {
  Brand: [...new Set(products.map(p => getBrand(p)))],
  Category: [...new Set(products.map(p => p.category))],
  Processor: [...new Set(products.filter(p => p.processor !== 'N/A').map(p => p.processor))],
  Storage: [...new Set(products.filter(p => p.storage !== 'N/A').map(p => p.storage))],
};

function getKeySpecs(product) {
  const specs = [];
  if (product.processor && product.processor !== 'N/A') specs.push(product.processor);
  if (product.storage && product.storage !== 'N/A') specs.push(product.storage);
  if (product.display && product.display !== 'N/A') specs.push(product.display);
  const ramFeature = product.features?.find(f => f.toLowerCase().includes('gb ram') || f.toLowerCase().includes('gb ddr'));
  if (ramFeature && !specs.some(s => s.toLowerCase().includes('gb ram') || s.toLowerCase().includes('gb ddr'))) specs.push(ramFeature);
  return specs.slice(0, 4);
}

function getSavings(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return product.originalPrice - product.price;
}

function getPriceTier(price) {
  if (price < 200) return { label: 'Budget', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
  if (price < 500) return { label: 'Mid-Range', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
  return { label: 'Premium', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' };
}

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
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden bg-[#0A0A0A]">
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat', backgroundSize: '256px 256px',
      }} />

      <div className="max-w-5xl mx-auto w-full text-center relative">
        <motion.div
          initial="hidden" animate="visible" variants={fadeUpHero}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
            Harare&apos;s Premium Tech Store
          </span>
        </motion.div>

        <motion.h1
          initial="hidden" animate="visible" variants={fadeUpHero}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0] mb-6 text-white"
        >
          Next-Level Tech<br />Starts Here.
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" variants={fadeUpHero}
          className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10"
        >
          High-performance laptops, gaming setups, repairs, and premium accessories — curated for those who demand the best.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" variants={fadeUpHero}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={onShop} className="btn-primary text-sm px-8 py-3.5">
            Browse Devices
            <ArrowRight size={16} />
          </button>
          <button onClick={onRepairs} className="btn-outline text-sm px-8 py-3.5 text-white border-white/20 hover:border-white hover:text-white">
            Book Repairs
            <Wrench size={16} />
          </button>
        </motion.div>

        <motion.div
          initial="hidden" animate="visible" variants={fadeUpHero}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {[
            { icon: Shield, label: 'Official Warranty', sub: '100% Authentic' },
            { icon: Truck, label: 'Fast Delivery', sub: 'Same-day in Harare' },
            { icon: HeadphonesIcon, label: 'Premium Support', sub: 'Expert assistance' },
            { icon: CreditCard, label: 'Secure Payments', sub: 'EcoCash, Visa & more' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/10">
                <Icon size={14} className="text-neutral-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[11px] font-medium text-white/80 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-neutral-500 leading-tight">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="animate-scroll">
            <ChevronDown size={20} className="text-neutral-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryGateway() {
  const cats = [
    { icon: Gamepad2, name: 'Gaming Consoles', href: '/gaming' },
    { icon: Smartphone, name: 'Smartphones', href: '/phones' },
    { icon: Laptop, name: 'Laptops', href: '/laptops' },
    { icon: Monitor, name: 'PCs & Desktops', href: '/pcs' },
    { icon: Tv, name: 'Displays', href: '/displays' },
    { icon: Package, name: 'Accessories', href: '/accessories' },
    { icon: Wrench, name: 'Repairs', href: '/repairs' },
    { icon: Award, name: 'Deals', href: '/laptops?deals=true' },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Categories</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.name}
                href={cat.href}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.05 }}
                className="group block"
              >
                <div className="card-gray p-6 flex flex-col items-start gap-3">
                  <Icon size={28} className="text-black group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <h3 className="text-base font-semibold text-black">{cat.name}</h3>
                    <span className="text-sm text-[#888888] mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Browse &rarr;
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
      <div className="separator mt-20 md:mt-28" />
    </section>
  );
}

function LaptopsSection({ setSelectedProduct }) {
  const { addItem } = useCart();
  const [notify, setNotify] = useState(null);

  const handleAdd = useCallback((product) => {
    addItem(product);
    setNotify(`${product.name} added to cart`);
    setTimeout(() => setNotify(null), 2000);
  }, [addItem]);

  const laptops = useMemo(() =>
    [...products.filter(p => p.category === 'Laptops')].sort((a, b) => a.price - b.price),
  []);

  const tiers = useMemo(() => [
    { label: 'Budget', range: 'Under $200', min: 0, max: 199, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { label: 'Mid-Range', range: '$200 – $499', min: 200, max: 499, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { label: 'Premium', range: '$500+', min: 500, max: Infinity, color: 'bg-violet-50 text-violet-600 border-violet-200' },
  ].map(t => ({ ...t, items: laptops.filter(p => p.price >= t.min && p.price <= t.max) })).filter(t => t.items.length > 0), [laptops]);

  return (
    <section id="laptops-section" className="px-6 py-24 md:py-28 bg-[#F9F9F9]">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white bg-black shadow-lg"
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Laptops</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Laptops</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">Affordable refurbished laptops for every budget — sorted by price.</p>
        </motion.div>

        {tiers.map(({ label, range, color, items }) => (
          <div key={label} className="mb-12 last:mb-0">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-lg font-semibold text-black">{label}</h3>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${color}`}>{range}</span>
              <span className="text-xs text-[#888888]">({items.length} devices)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(product => {
                const savings = getSavings(product);
                const specs = getKeySpecs(product);
                return (
                  <div key={product.id} className="card-gray h-full flex flex-col group">
                    <div onClick={() => setSelectedProduct(product)} className="relative flex items-center justify-center bg-[#F3F3F3] overflow-hidden cursor-pointer rounded-t-[16px]"
                      style={{ aspectRatio: getAspectRatio(product) }}>
                      {product.image ? (
                        <img src={product.image} alt={product.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                      ) : (
                        <Laptop size={40} className="text-[#888888]" />
                      )}
                      {product.badge && (
                        <span className="absolute top-3 left-3 badge text-[9px]">{product.badge}</span>
                      )}
                      {savings > 10 && (
                        <span className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-semibold">Save ${savings}</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-4 gap-2">
                      <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                        <h4 className="text-sm font-semibold text-[#4B4B4B] leading-snug line-clamp-2 hover:text-black transition-colors">{product.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {specs.map((spec, i) => (
                          <span key={i} className="spec-pill">{spec}</span>
                        ))}
                      </div>
                      <div className="mt-auto pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-black">${product.price.toLocaleString()}</span>
                          {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through ml-2">${product.originalPrice.toLocaleString()}</span>}
                          {savings > 10 && <span className="text-[10px] text-emerald-600 font-medium ml-2">Save ${savings}</span>}
                        </div>
                        <button onClick={() => handleAdd(product)}
                          disabled={!product.inStock}
                          className="btn-primary text-[9px] font-semibold tracking-wider px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed shrink-0">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <motion.div variants={fadeUp} className="text-center mt-8">
          <a href="/laptops" className="text-xs text-[#888888] hover:text-black transition-colors font-semibold tracking-wider uppercase inline-flex items-center gap-2">
            Browse All Laptops <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedDeals({ setSelectedProduct }) {
  const { addItem } = useCart();
  const [notify, setNotify] = useState(null);

  const handleAdd = useCallback((product) => {
    addItem(product);
    setNotify(`${product.name} added to cart`);
    setTimeout(() => setNotify(null), 2000);
  }, [addItem]);

  const deals = useMemo(() =>
    [...products.filter(p => p.badge && (p.badge === 'DEAL' || p.badge === 'NEW' || p.price < 300))]
      .sort((a, b) => (a.originalPrice ? (a.originalPrice - a.price) : 0) - (b.originalPrice ? (b.originalPrice - b.price) : 0))
      .reverse()
      .slice(0, 6),
  []);

  return (
    <section className="px-6 py-24 md:py-28 bg-white">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white bg-black shadow-lg"
        >
          {notify}
        </motion.div>
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Deals</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Featured Deals</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">Best-value products handpicked for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deals.map(product => {
            const savings = getSavings(product);
            const specs = getKeySpecs(product);
            return (
              <div key={product.id}>
                <div className="card-gray h-full flex flex-col group overflow-hidden">
                  <div onClick={() => setSelectedProduct(product)} className="relative flex items-center justify-center bg-[#F3F3F3] overflow-hidden cursor-pointer"
                    style={{ aspectRatio: getAspectRatio(product) }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <Package size={48} className="text-[#888888]" />
                    )}
                    {product.badge && (
                      <span className="absolute top-3 left-3 badge text-[9px]">{product.badge}</span>
                    )}
                    {savings > 10 && (
                      <span className="absolute top-3 right-3 px-2 py-1 text-[9px] font-semibold rounded-full bg-emerald-600 text-white">-${savings}</span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                      <h3 className="text-sm font-semibold text-[#4B4B4B] leading-snug group-hover:text-black transition-colors">{product.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {specs.slice(0, 2).map((spec, i) => (
                        <span key={i} className="spec-pill">{spec}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-black">${product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through ml-2">${product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <button onClick={() => handleAdd(product)}
                        disabled={!product.inStock}
                        className="btn-primary text-[9px] font-semibold tracking-wider px-3 py-2 disabled:opacity-30 disabled:cursor-not-allowed">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhonesSection({ setSelectedProduct }) {
  const [activeTab, setActiveTab] = useState('All');

  const phones = useMemo(() => products.filter(p => p.category === 'Phones'), []);

  const getPhoneBrand = useCallback((product) => {
    const n = product.name.toLowerCase();
    if (n.includes('iphone') || n.includes('apple')) return 'Apple';
    if (n.includes('samsung') || n.includes('galaxy')) return 'Samsung';
    if (n.includes('pixel') || n.includes('google')) return 'Google';
    if (n.includes('xiaomi') || n.includes('redmi') || n.includes('poco')) return 'Xiaomi';
    if (n.includes('nothing')) return 'Nothing';
    return 'Other';
  }, []);

  const tabs = ['All', 'Apple', 'Samsung', 'Google', 'Xiaomi', 'Nothing'];

  const filtered = useMemo(() => {
    if (activeTab === 'All') return phones;
    return phones.filter(p => getPhoneBrand(p) === activeTab);
  }, [activeTab, phones, getPhoneBrand]);

  return (
    <section className="px-6 py-24 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Mobiles</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Smartphones</h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="flex flex-wrap gap-2 mb-10"
        >
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'border border-[#E5E5E5] text-[#888888] hover:text-black hover:border-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map(product => (
            <motion.div key={product.id} variants={fadeUp}>
              <div className="card-gray h-full flex flex-col group p-5">
                <div onClick={() => setSelectedProduct(product)} className="relative flex items-center justify-center bg-[#F3F3F3] rounded-xl overflow-hidden cursor-pointer"
                  style={{ aspectRatio: getAspectRatio(product) }}>
                  {product.image ? (
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <Smartphone size={48} className="text-[#888888]" />
                  )}
                  {product.badge && (
                    <span className="absolute top-3 left-3 badge text-[9px]">{product.badge}</span>
                  )}
                </div>
                <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                  <h3 className="text-sm font-medium text-[#4B4B4B] leading-snug mb-2 hover:text-black transition-colors">{product.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {getKeySpecs(product).map((spec, i) => (
                    <span key={i} className="spec-pill">{spec}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#E5E5E5]'} />
                  ))}
                  <span className="text-[10px] text-[#888888] ml-1">{product.rating}</span>
                </div>
                  <div className="mt-auto pt-3 border-t border-[#E5E5E5] flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-black">${product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through">${product.originalPrice.toLocaleString()}</span>}
                      {getSavings(product) > 10 && <span className="text-[9px] text-emerald-600 font-medium">Save ${getSavings(product)}</span>}
                    </div>
                    <div onClick={() => setSelectedProduct(product)} className="text-[10px] font-semibold tracking-wider uppercase text-black hover:text-[#4B4B4B] transition-colors cursor-pointer">
                      View
                    </div>
                  </div>
                <button
                  onClick={() => {
                    const msg = `Hi Core Tech Systems, I'd like to inquire about:\n\nProduct: ${product.name}\nStorage: ${product.storage}\nDisplay: ${product.display}\nPrice: $${product.price.toLocaleString()}`;
                    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="btn-outline w-full mt-3 py-2.5 text-[9px] font-semibold tracking-wider uppercase"
                >
                  Inquire on WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Smartphone size={40} className="text-[#E5E5E5] mx-auto mb-3" />
            <p className="text-[#888888] text-sm">No phones in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function GamingShowcase({ setSelectedProduct }) {
  const gamingProducts = useMemo(() => products.filter(p => p.category === 'Gaming'), []);
  const gamingDesktop = useMemo(() => gamingProducts.filter(p => p.name.toLowerCase().includes('desktop')), [gamingProducts]);
  const consoles = useMemo(() => gamingProducts.filter(p => p.name.toLowerCase().includes('playstation') || p.name.toLowerCase().includes('xbox')), [gamingProducts]);
  const gear = useMemo(() => gamingProducts.filter(p => !p.name.toLowerCase().includes('desktop') && !p.name.toLowerCase().includes('playstation') && !p.name.toLowerCase().includes('xbox')), [gamingProducts]);

  return (
    <section className="px-6 py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Gaming</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Gaming Zone</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">
            Consoles, desktops, monitors, and gear for every level of play.
          </p>
        </motion.div>

        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold text-black mb-5">Top Gaming Picks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {gamingDesktop.slice(0, 2).map((product, i) => (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} transition={{ delay: i * 0.1 }}>
                  <div onClick={() => setSelectedProduct(product)}
                    className="card-gray h-full p-6 group cursor-pointer">
                    <div className="flex items-start gap-5">
                      <div className="w-36 h-36 rounded-xl bg-[#F3F3F3] flex items-center justify-center overflow-hidden shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <Gamepad2 size={40} className="text-[#888888]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="badge text-[9px]">{product.badge || 'GAMING'}</span>
                        <h4 className="text-base font-semibold text-[#4B4B4B] mt-2 group-hover:text-black transition-colors">{product.name}</h4>
                        <p className="text-xs text-[#888888] mt-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-xl font-bold text-black">${product.price.toLocaleString()}</span>
                          {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through">${product.originalPrice.toLocaleString()}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-5">Best Sellers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {consoles.map((product, i) => (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} transition={{ delay: i * 0.1 }}>
                  <div onClick={() => setSelectedProduct(product)} className="card-gray p-5 h-full flex items-start gap-4 group cursor-pointer">
                    <div className="w-28 h-28 rounded-xl bg-[#F3F3F3] flex items-center justify-center overflow-hidden shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <Gamepad size={36} className="text-[#888888]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="badge text-[9px]">{product.badge || 'CONSOLE'}</span>
                      <h4 className="text-sm font-semibold text-[#4B4B4B] mt-1 group-hover:text-black transition-colors">{product.name}</h4>
                      <p className="text-xs text-[#888888] mt-1">{product.display}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-black">${product.price.toLocaleString()}</span>
                        <span className={`text-[10px] ${product.inStock ? 'text-green-600' : 'text-amber-600'}`}>{product.inStock ? 'In Stock' : 'Low Stock'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-5">Gaming Gear</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gear.slice(0, 2).map((product, i) => (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} transition={{ delay: i * 0.1 }}>
                  <div onClick={() => setSelectedProduct(product)} className="card-gray p-4 h-full flex items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 rounded-xl bg-[#F3F3F3] flex items-center justify-center overflow-hidden shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <Monitor size={24} className="text-[#888888]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#4B4B4B] group-hover:text-black transition-colors">{product.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getKeySpecs(product).slice(0, 2).map((spec, i) => (
                          <span key={i} className="spec-pill">{spec}</span>
                        ))}
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-semibold text-black">${product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="text-[10px] text-[#AAAAAA] line-through">${product.originalPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div variants={fadeUp} className="text-center mt-12">
          <a href="/gaming" className="btn-primary text-xs">
            Explore All Gaming <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PCShowcase({ setSelectedProduct }) {
  const pcs = useMemo(() => products.filter(p => p.category === 'PCs'), []);

  const getPerformanceLabel = useCallback((product) => {
    const n = product.name.toLowerCase();
    if (n.includes('gaming') && n.includes('ryzen')) return 'Mid Range';
    if (n.includes('workstation') || n.includes('core i9')) return 'High Performance';
    if (n.includes('office') || n.includes('core i5')) return 'Entry Level';
    if (n.includes('custom')) return 'Custom Build';
    return 'Standard';
  }, []);

  const getPerformanceColor = (label) => {
    switch (label) {
      case 'Entry Level': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Mid Range': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'High Performance': return 'bg-violet-50 text-violet-600 border-violet-200';
      case 'Custom Build': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-[#F3F3F3] text-[#888888] border-[#E5E5E5]';
    }
  };

  return (
    <section className="px-6 py-24 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Desktops</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Performance PCs</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">
            From office-ready to high-performance workstations — built for what you do.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pcs.map((product, i) => {
            const label = getPerformanceLabel(product);
            const colorClass = getPerformanceColor(label);
            const isCustom = label === 'Custom Build';
            return (
              <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <div className={`card-gray h-full p-6 ${isCustom ? 'border-amber-200' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F3F3F3] flex items-center justify-center">
                        {isCustom ? <Wrench size={18} className="text-[#888888]" /> : <Monitor size={18} className="text-[#888888]" />}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-black">{product.name}</h3>
                        {product.badge && <span className="badge-light text-[9px]">{product.badge}</span>}
                      </div>
                    </div>
                    <span className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${colorClass}`}>
                      {label}
                    </span>
                  </div>

                  {!isCustom && getKeySpecs(product).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getKeySpecs(product).map((spec, i) => (
                        <span key={i} className="spec-pill">{spec}</span>
                      ))}
                    </div>
                  )}

                  {isCustom ? (
                    <div>
                      <p className="text-sm text-[#888888] leading-relaxed mb-4">
                        We design and assemble the perfect PC for your needs and budget. From $200 build fee + parts.
                      </p>
                      <a href="https://wa.me/263780579633?text=Hi%20Tech%20Store%2C%20I%27d%20like%20to%20discuss%20a%20custom%20PC%20build."
                        target="_blank" rel="noopener noreferrer"
                        className="btn-outline text-[10px] font-semibold tracking-wider px-5 py-3 inline-flex">
                        Start Your Build <ArrowRight size={14} />
                      </a>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-black">${product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through">${product.originalPrice.toLocaleString()}</span>}
                        {getSavings(product) > 10 && <span className="text-[10px] text-emerald-600 font-medium">Save ${getSavings(product)}</span>}
                      </div>
                      <button onClick={() => setSelectedProduct(product)}
                        className="text-[10px] font-semibold tracking-wider uppercase text-black hover:text-[#4B4B4B] transition-colors flex items-center gap-1">
                        View Details <ChevronRight size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <a href="/pcs" className="text-xs text-[#888888] hover:text-black transition-colors font-semibold tracking-wider uppercase inline-flex items-center gap-2">
            View All PCs <ArrowRight size={14} />
          </a>
        </motion.div>
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
    <section className="px-6 py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Why Core Tech Systems</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <div className="card-gray p-7 h-full text-center md:text-left">
                  <div className="w-11 h-11 rounded-xl bg-[#F3F3F3] flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Icon size={20} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{f.title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase({
  searchQuery, setSearchQuery, filteredProducts, handleWhatsApp,
  filterOptions, selectedFilters, toggleFilter, activeFilterCount, clearAllFilters,
  setSelectedProduct
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
    <section id="products" className="px-6 py-24 md:py-32 bg-white">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white bg-black shadow-lg"
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Collection</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">All Premium Devices</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">
            Carefully selected devices, each chosen for exceptional build quality and performance.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mb-10"
        >
          <div className="input-premium max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" size={16} />
              <input
                type="text"
                placeholder="Search devices, processors, storage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-transparent text-black text-sm placeholder:text-[#AAAAAA] focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#888888] hover:text-black transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={`lg:col-span-1 ${mobileFiltersOpen ? 'block fixed inset-0 z-40 bg-white p-6 pt-24 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <div className="card-gray p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={13} className="text-[#888888]" />
                    <h3 className="text-[10px] font-semibold tracking-wider uppercase text-[#888888]">Filters</h3>
                  </div>
                  {activeFilterCount > 0 && <span className="text-[10px] font-bold text-black">{activeFilterCount}</span>}
                </div>
                <div className="space-y-1">
                  {Object.entries(filterOptions).map(([filterName, values]) => {
                    const isOpen = expandedFilter === filterName;
                    const selectedInCategory = selectedFilters[filterName]?.length || 0;
                    return (
                      <div key={filterName} className="border-b border-[#E5E5E5] last:border-b-0">
                        <button onClick={() => setExpandedFilter(isOpen ? null : filterName)}
                          className="w-full flex items-center justify-between py-3 text-[10px] font-semibold tracking-wider uppercase text-[#888888] hover:text-black transition-colors">
                          <span>{filterName}</span>
                          <div className="flex items-center gap-2">
                            {selectedInCategory > 0 && <span className="text-[10px] font-bold text-black">{selectedInCategory}</span>}
                            <ChevronDown size={12} className={`text-[#888888] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="pb-4 space-y-2.5">
                            {values.map((value) => {
                              const isChecked = selectedFilters[filterName]?.includes(value) || false;
                              return (
                                <label key={value} className="flex items-center gap-3 cursor-pointer group py-0.5">
                                  <input type="checkbox" checked={isChecked} onChange={() => toggleFilter(filterName, value)}
                                    className="appearance-none w-4 h-4 rounded-md border border-[#E5E5E5] bg-white checked:bg-black checked:border-black transition-all duration-300" />
                                  <span className={`text-xs transition-colors ${isChecked ? 'text-black font-medium' : 'text-[#888888] group-hover:text-black'}`}>{value}</span>
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
                  className="btn-outline w-full mt-4 py-3 text-[10px] font-semibold tracking-wider uppercase">
                  Close Filters
                </button>
              )}
            </div>
          </div>

          {!mobileFiltersOpen && (
            <button onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-3 btn-primary text-[10px] font-semibold tracking-wider uppercase shadow-xl">
              <SlidersHorizontal size={13} /> Filters{activeFilterCount > 0 && <span>({activeFilterCount})</span>}
            </button>
          )}

          <div className="lg:col-span-4">
            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3, ease }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-center justify-between rounded-xl border border-[#E5E5E5] px-5 py-3 bg-[#F9F9F9]">
                  <span className="text-xs text-[#888888]">
                    <span className="text-black font-medium">{activeFilterCount}</span> filter{activeFilterCount !== 1 ? 's' : ''} active
                  </span>
                  <button onClick={clearAllFilters} className="text-[10px] font-semibold tracking-wider uppercase text-[#888888] hover:text-black transition-colors">
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
                    <div className="card-gray h-full flex flex-col group relative">
                      <button onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 border border-[#E5E5E5] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-black/30">
                        <Heart size={14} className={`transition-colors duration-300 ${wishlist.has(product.id) ? 'text-red-400 fill-red-400' : 'text-[#888888]'}`} />
                      </button>

                      <div onClick={() => setSelectedProduct(product)} className="relative flex items-center justify-center bg-[#F3F3F3] overflow-hidden cursor-pointer rounded-t-[16px]"
                        style={{ aspectRatio: getAspectRatio(product) }}>
                        {product.image ? (
                          <img src={product.image} alt={product.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="w-24 h-32 rounded-xl border border-[#E5E5E5] flex items-center justify-center text-[#888888] text-xs bg-white">
                            {product.name.split(' ').slice(0, 2).join(' ')}
                          </div>
                        )}
                        {product.badge && (
                          <span className="absolute top-3 left-3 badge text-[9px]">{product.badge}</span>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col p-5 space-y-2.5">
                        <div>
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#888888]">{product.category}</span>
                          <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                            <h3 className="text-sm font-medium text-[#4B4B4B] mt-1 leading-snug group-hover:text-black transition-colors duration-300">{product.name}</h3>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {getKeySpecs(product).slice(0, 3).map((spec, i) => (
                            <span key={i} className="spec-pill">{spec}</span>
                          ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#E5E5E5]'} />
                          ))}
                          <span className="text-[10px] text-[#888888] ml-1">{product.rating}</span>
                        </div>

                        <div className="flex items-baseline justify-between pt-2.5 border-t border-[#E5E5E5]">
                          <div className="flex items-baseline gap-3">
                            <span className="text-lg font-semibold text-black tracking-tight">${product.price.toLocaleString()}</span>
                            {product.originalPrice && <span className="text-xs text-[#AAAAAA] line-through">${product.originalPrice.toLocaleString()}</span>}
                            {getSavings(product) > 10 && <span className="text-[9px] text-emerald-600 font-medium">Save ${getSavings(product)}</span>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-amber-500'}`} />
                            <span className={`text-[10px] ${product.inStock ? 'text-green-600' : 'text-amber-600'}`}>{product.inStock ? 'In Stock' : 'Low Stock'}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button onClick={() => handleAdd(product)}
                            disabled={!product.inStock}
                            className="btn-primary flex-1 py-2.5 text-[10px] font-semibold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed justify-center">
                            Add to Cart
                          </button>
                          <button onClick={() => handleWhatsApp(product)}
                            className="btn-outline px-4 py-2.5 text-[10px] font-semibold tracking-wider">
                            Inquire
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full">
                  <div className="text-center py-20 rounded-2xl border border-[#E5E5E5] bg-[#F9F9F9]">
                    <p className="text-[#888888] text-sm mb-1">No products match your filters.</p>
                    <p className="text-[#AAAAAA] text-xs mb-4">Try adjusting your search or filter criteria.</p>
                    <button onClick={clearAllFilters} className="btn-outline text-[10px]">Clear all filters</button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-10 pt-6 border-t border-[#E5E5E5] text-center"
            >
              <p className="text-xs text-[#888888] tracking-wider">
                Showing <span className="text-black font-medium">{filteredProducts.length}</span> of{' '}
                <span className="text-black font-medium">{products.length}</span> devices
              </p>
            </motion.div>
          </div>
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
    <section id="repairs" className="px-6 py-24 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Services</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Repair & Upgrade Center</h2>
          <p className="text-sm text-[#888888] mt-3 max-w-lg">
            Professional repairs, upgrades, and maintenance for all your devices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.07 }}>
                <div className="card-gray p-6 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F3F3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon size={18} className="text-black" />
                    </div>
                    {svc.badge && (
                      <span className="badge-light text-[9px]">{svc.badge}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-black mb-1.5">{svc.title}</h3>
                  <p className="text-xs text-[#888888] flex-1">{svc.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#E5E5E5]">
                    <Clock3 size={11} className="text-[#888888]" />
                    <span className="text-[10px] text-[#888888]">{svc.time}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-8 text-center">
          <a href="https://wa.me/263780579633?text=Hi%20Tech%20Store%2C%20I%20need%20a%20repair%20or%20upgrade%20service."
            target="_blank" rel="noopener noreferrer"
            className="btn-outline text-xs">
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
    <section className="px-6 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="card-gray p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={scaleIn} transition={{ delay: i * 0.12 }}
                  className="text-center">
                  <Icon size={22} className="text-black mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-black tracking-tight">{stat.value}</p>
                  <p className="text-xs text-[#888888] mt-1">{stat.label}</p>
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
    { name: 'Tatenda R.', role: 'Verified Buyer', text: 'I have bought three devices from Core Tech Systems now. The authenticity guarantee gives me complete peace of mind. Highly recommend.', rating: 5 },
  ];

  return (
    <section className="px-6 py-24 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={scaleIn} transition={{ delay: i * 0.1 }}>
              <div className="card-gray p-7 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className={s < review.rating ? 'text-amber-400 fill-amber-400' : 'text-[#E5E5E5]'} />
                  ))}
                </div>
                <p className="text-sm text-[#888888] leading-relaxed flex-1 mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#E5E5E5]">
                  <p className="text-sm font-medium text-black">{review.name}</p>
                  <p className="text-[11px] text-[#888888]">{review.role}</p>
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
    <section className="px-6 py-24 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="card-gray overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left text-sm font-medium text-[#4B4B4B] hover:text-black transition-colors flex items-center justify-between gap-2">
                {faq.q}
                <ChevronDown size={14} className={`text-[#888888] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
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
                    <div className="px-6 pb-4 text-sm text-[#888888] leading-relaxed border-t border-[#E5E5E5] pt-3">
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
    <section className="px-6 py-20 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <div className="card-gray text-center p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-4">Stay Connected</p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black mb-4">Join Our Newsletter</h2>
            <p className="text-sm text-[#888888] mb-8 max-w-md mx-auto">Get early access to new arrivals, exclusive deals, and tech tips delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                className="input-premium flex-1 px-5 py-3.5 text-center sm:text-left" />
              <button className="btn-primary text-[10px] whitespace-nowrap w-full sm:w-auto justify-center">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoSection() {
  const items = [
    { icon: MapPin, title: 'Visit Us', desc: 'Sirus Mall, 1st Floor\nHarare, Zimbabwe', accent: 'Mon – Sat: 08:30 – 17:00' },
    { icon: Phone, title: 'Call Us', desc: '+263 780 579 633\n+263 708 463 628', accent: 'Same-day delivery available' },
    { icon: MessageCircle, title: 'WhatsApp', desc: 'Fastest response via WhatsApp', accent: 'Typically replies in 5 min' },
  ];

  return (
    <section className="px-6 py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#888888] mb-3">Connect</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={scaleIn} transition={{ delay: i * 0.1 }}>
                <div className="card-gray p-6 md:p-7">
                  <div className="w-9 h-9 rounded-xl bg-[#F3F3F3] flex items-center justify-center">
                    <Icon size={16} className="text-black" />
                  </div>
                  <h3 className="text-sm font-semibold text-black mt-4 mb-1">{item.title}</h3>
                  <p className="text-sm text-[#888888] whitespace-pre-line leading-relaxed">{item.desc}</p>
                  <p className="text-sm font-medium text-black mt-4">{item.accent}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="card-gray p-8 text-center mt-6">
          <p className="text-sm text-[#888888]">
            Free delivery within Harare. Nationwide shipping across Zimbabwe. All prices in USD.
          </p>
          <a href="https://wa.me/263780579633" target="_blank" rel="noopener noreferrer"
            className="btn-outline text-[10px] mt-6 inline-flex">
            <MessageCircle size={14} /> Chat with Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function CoreTechSystems() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const mainRef = useRef(null);

  useEffect(() => {
    window.__openProductModal = setSelectedProduct;
    return () => { delete window.__openProductModal; };
  }, []);

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
        if (key === 'Brand') return values.some(v => getBrand(product) === v);
        if (key === 'Category') return values.includes(product.category);
        if (key === 'Processor') return values.some(v => product.processor.includes(v));
        if (key === 'Storage') return values.some(v => product.storage.includes(v));
        return true;
      });
      return searchMatch && filterMatch;
    });
  }, [searchQuery, selectedFilters]);

  const handleWhatsApp = useCallback((product) => {
    const message = `Hi Core Tech Systems, I'd like to inquire about:\n\nProduct: ${product.name}\nSpecs: ${product.processor} | ${product.storage} | ${product.display}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability.`;
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
    <>
    <div ref={mainRef} className="min-h-screen bg-[#0A1224] relative overflow-x-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10">
        <motion.div style={{ filter: `blur(${springBlur}px)` }}>
          <Hero onShop={scrollToProducts} onRepairs={scrollToRepairs} />
        </motion.div>

        <CategoryGateway />
        <FeaturedDeals setSelectedProduct={setSelectedProduct} />
        <LaptopsSection setSelectedProduct={setSelectedProduct} />
        <GamingShowcase setSelectedProduct={setSelectedProduct} />
        <PhonesSection setSelectedProduct={setSelectedProduct} />
        <PCShowcase setSelectedProduct={setSelectedProduct} />

        <div id="repairs">
          <RepairServices />
        </div>

        <WhyChooseUs />
        <TrustStats />

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
            setSelectedProduct={setSelectedProduct}
          />
        </div>

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

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
    );
}
