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
    <main className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex items-center gap-2 text-sm text-[#6B7080] mb-8"
        >
          <Link href="/" className="hover:text-[#0071E3] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-[#9CA3AF]" />
          <span className="text-[#1D1D1F] font-medium">Shop</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F] font-sans mb-3">
            Shop All Categories
          </h1>
          <p className="text-[#6B7080] text-base sm:text-lg max-w-xl">
            Choose a category to explore our full range of devices and services.
          </p>
        </motion.div>

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
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-[#E2E8F0] text-[#6B7080] hover:border-[#0071E3] hover:text-[#0071E3] hover:bg-white transition-all duration-200 whitespace-nowrap bg-white"
            >
              {pill.label}
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => {
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.06 }}
              >
                <Link
                  href={cat.href}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border-l-[4px] bg-white border border-[#E2E8F0] hover:border-[#0071E3]/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{
                    borderLeftColor: cat.color,
                  }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl sm:text-3xl shrink-0">{cat.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-base sm:text-lg font-bold text-[#1D1D1F]">{cat.name}</h2>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6B7080] truncate">{cat.desc}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[#94A3B8]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-[#94A3B8] shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0071E3]" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
