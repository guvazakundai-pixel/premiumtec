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
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="flex items-center gap-2 text-sm text-neutral-400 mb-8"
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} className="text-white/20" />
          <span className="text-white font-medium">Shop</span>
        </motion.nav>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans mb-3">
            Shop All Categories
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-xl">
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
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium border border-white/10 text-neutral-400 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
            >
              {pill.label}
            </Link>
          ))}
        </motion.div>

        {/* Category cards grid */}
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
                  className="group relative flex items-center gap-4 p-5 rounded-2xl border-l-[4px] bg-[#161616] border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    borderLeftColor: cat.color,
                  }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-2xl sm:text-3xl shrink-0">{cat.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-base sm:text-lg font-bold text-white">{cat.name}</h2>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                        >
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 truncate">{cat.desc}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-white/20 shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
