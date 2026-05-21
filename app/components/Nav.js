'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/gaming', label: 'Gaming' },
  { href: '/repairs', label: 'Repairs' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A1224]/80 backdrop-blur-xl border-b border-white/[0.04] h-14' : 'bg-transparent h-16'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center shadow-lg shadow-[#2563EB]/20 group-hover:shadow-[#2563EB]/40 transition-all duration-500">
            <span className="text-xs font-black text-white">T</span>
          </div>
          <span className={`font-bold tracking-tight text-white select-none transition-all duration-500 ${
            scrolled ? 'text-sm' : 'text-base'
          }`}>
            TECH STORE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
          <Link href="/cart" className="relative p-2 text-white/40 hover:text-white/70 transition-colors">
            <ShoppingBag size={17} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2563EB] text-[9px] font-bold text-white flex items-center justify-center shadow-lg shadow-[#2563EB]/30">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart" className="relative p-2 text-white/60 hover:text-white transition-colors">
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2563EB] text-[9px] font-bold text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-4 mt-1"
          >
            <div className="p-4 space-y-1 rounded-2xl border border-white/[0.06] bg-[#0A1224]/95 backdrop-blur-xl shadow-2xl">
              {links.map((l) => {
                const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                      isActive
                        ? 'text-white bg-[#2563EB]/10 border border-[#2563EB]/15'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
