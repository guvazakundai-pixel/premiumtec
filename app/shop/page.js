'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const categories = [
  {
    name: 'Laptops', href: '/laptops', emoji: '💻',
    badge: '50+ Models', color: '#0071E3',
    desc: 'Premium notebooks, ultrabooks, and business workstations',
    tags: ['Budget', 'Mid-Range', 'Premium'],
  },
  {
    name: 'Smartphones', href: '/phones', emoji: '📱',
    badge: 'Latest 2025', color: '#10B981',
    desc: 'Flagship phones from Apple, Samsung, and more',
    tags: ['iPhone', 'Samsung', 'Android'],
  },
  {
    name: 'Gaming', href: '/gaming', emoji: '🎮',
    badge: 'PS5 In Stock', color: '#7C3AED',
    desc: 'Consoles, gaming desktops, and high-performance rigs',
    tags: ['Consoles', 'Gaming PCs', 'Gear'],
  },
  {
    name: 'Desktop PCs', href: '/pcs', emoji: '🖥️',
    badge: 'Custom Builds', color: '#F59E0B',
    desc: 'Office PCs, workstations, and custom configurations',
    tags: ['Office', 'Workstation', 'Custom'],
  },
  {
    name: 'Accessories', href: '/accessories', emoji: '🎧',
    badge: 'Complete Your Setup', color: '#06B6D4',
    desc: 'Keyboards, mice, audio, printers, and more',
    tags: ['Audio', 'Input', 'Printers'],
  },
  {
    name: 'Repairs', href: '/repairs', emoji: '🔧',
    badge: 'Same Day', color: '#6B7280',
    desc: 'Expert repairs for laptops, phones, and consoles',
    tags: ['Screen Repair', 'Upgrades', 'Diagnostics'],
  },
];

const pills = [
  { label: 'Laptops', href: '/laptops' },
  { label: 'Smartphones', href: '/phones' },
  { label: 'Gaming', href: '/gaming' },
  { label: 'Desktop PCs', href: '/pcs' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Repairs', href: '/repairs' },
  { label: 'Deals', href: '/laptops' },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex items-center gap-2 text-sm text-[#86868B] mb-8"
        >
          <Link href="/" className="hover:text-[#0071E3] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-[#D2D2D7]" />
          <span className="text-[#1D1D1F] font-medium">Shop</span>
        </motion.nav>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F] font-sans mb-3">
            Shop All Categories
          </h1>
          <p className="text-[#6E6E73] text-base sm:text-lg max-w-xl">
            Choose a category to explore our full range of devices and services.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 mb-10"
        >
          {pills.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-[#D2D2D7] text-[#6E6E73] hover:border-[#0071E3] hover:text-[#0071E3] hover:bg-[#0071E3]/5 transition-all duration-200 whitespace-nowrap"
            >
              {pill.label}
            </Link>
          ))}
        </motion.div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            const isDeal = cat.name === 'Deals';
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.06 }}
              >
                <Link
                  href={cat.href}
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl border-l-[4px] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                    cat.name === 'Repairs' ? 'sm:col-span-1' : ''
                  }`}
                  style={{
                    borderLeftColor: cat.color,
                    borderTop: '1px solid #D2D2D7',
                    borderRight: '1px solid #D2D2D7',
                    borderBottom: '1px solid #D2D2D7',
                    backgroundColor: cat.name === 'Desktop PCs' ? '#FFFBEB' : 'white',
                  }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl sm:text-3xl shrink-0">{cat.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F]">{cat.name}</h2>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: `${cat.color}12`, color: cat.color }}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6E6E73] truncate">{cat.desc}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F5F5F7] text-[#86868B]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[#D2D2D7] shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0071E3]" />
                </Link>
              </motion.div>
            );
          })}

          {/* Deals card - full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.08 + categories.length * 0.06 }}
            className="sm:col-span-2"
          >
            <Link
              href="/laptops"
              className="group relative flex items-center gap-4 p-5 rounded-2xl border-l-[4px] bg-[#FEF2F2] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{
                borderLeftColor: '#EF4444',
                borderTop: '1px solid #FEE2E2',
                borderRight: '1px solid #FEE2E2',
                borderBottom: '1px solid #FEE2E2',
              }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-2xl sm:text-3xl shrink-0">🔥</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F]">Deals</h2>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EF4444] text-white">Hot</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6E6E73] truncate">Exclusive discounts on laptops, phones, and accessories — limited stock</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {['Clearance', 'Bundle Deals', 'Flash Sale'].map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#EF4444]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowRight size={18} className="text-[#FCA5A5] shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#EF4444]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
