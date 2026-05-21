'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/#process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav shadow-[0_1px_0_rgba(255,255,255,0.04)]' : 'bg-transparent'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F4C430] shadow-[0_0_12px_rgba(244,196,48,0.4)] group-hover:shadow-[0_0_20px_rgba(244,196,48,0.6)] transition-all duration-500" />
          <span className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
            Premium<span className="text-[#F4C430]">Tec</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div layoutId="nav-active" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#F4C430] rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="btn-premium btn-primary text-sm px-5 py-2.5"
          >
            Start a Project
            <ArrowRight size={14} />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mx-4 mb-4 p-5 space-y-1"
            style={{
              background: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(60px)',
              borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === l.href ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-white/[0.06]">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 btn-premium btn-primary text-sm py-3"
              >
                Start a Project
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
