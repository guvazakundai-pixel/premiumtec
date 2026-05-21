'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const links = [
  { href: '/phones', label: 'Phones' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/gaming', label: 'Gaming' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav h-16"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-base font-bold tracking-tight text-white select-none">PREMIUMTEC</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href={pathname === '/' ? '#products' : '/#products'}
            className="btn-premium btn-premium--primary text-[10px] px-5 py-2.5"
          >
            Shop Now
            <ArrowRight size={12} />
          </Link>
          <Link href="/cart" className="relative p-2 text-white/40 hover:text-white/70 transition-colors">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#3B82F6] text-[9px] font-bold text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Link href="/cart" className="relative p-2 text-white/60 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#3B82F6] text-[9px] font-bold text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-2 p-4 space-y-3"
          style={{ background: 'rgba(22,27,34,0.6)', backdropFilter: 'blur(60px)', borderRadius: '24px', border: '1px solid rgba(245,247,250,0.08)' }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm py-2 transition-colors ${
                pathname === l.href ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="w-full btn-premium btn-premium--primary text-[10px] justify-center"
          >
            Shop Now
            <ArrowRight size={12} />
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
