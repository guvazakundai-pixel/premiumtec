'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronDown, Monitor, Smartphone, Gamepad2, Package, Wrench, Laptop, Gamepad, Cpu, HardDrive } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const navItems = [
  { href: '/', label: 'Home' },
  {
    label: 'Laptops', href: '/laptops',
    dropdown: [
      { label: 'All Laptops', href: '/laptops', icon: Laptop },
      { label: 'HP Laptops', href: '/laptops', icon: Monitor },
      { label: 'Dell Laptops', href: '/laptops', icon: Monitor },
      { label: 'ASUS Laptops', href: '/laptops', icon: Monitor },
      { label: 'Apple MacBook', href: '/laptops', icon: Monitor },
    ],
  },
  {
    label: 'Phones', href: '/phones',
    dropdown: [
      { label: 'All Phones', href: '/phones', icon: Smartphone },
      { label: 'iPhone', href: '/phones', icon: Smartphone },
      { label: 'Samsung', href: '/phones', icon: Smartphone },
      { label: 'Google Pixel', href: '/phones', icon: Smartphone },
      { label: 'Xiaomi', href: '/phones', icon: Smartphone },
      { label: 'Nothing', href: '/phones', icon: Smartphone },
    ],
  },
  {
    label: 'Gaming', href: '/gaming',
    dropdown: [
      { label: 'All Gaming', href: '/gaming', icon: Gamepad2 },
      { label: 'Gaming Desktops', href: '/gaming', icon: Cpu },
      { label: 'Consoles', href: '/gaming', icon: Gamepad },
      { label: 'Monitors & Gear', href: '/gaming', icon: Monitor },
    ],
  },
  {
    label: 'PCs', href: '/pcs',
    dropdown: [
      { label: 'All PCs', href: '/pcs', icon: Monitor },
      { label: 'Gaming PCs', href: '/pcs', icon: Cpu },
      { label: 'Office PCs', href: '/pcs', icon: Monitor },
      { label: 'Workstations', href: '/pcs', icon: HardDrive },
      { label: 'Custom Build', href: '/pcs', icon: Wrench },
    ],
  },
  { href: '/repairs', label: 'Repairs' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));

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
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between" ref={dropdownRef}>
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Core Tech Systems"
            width={320}
            height={152}
            className="h-10 w-auto object-contain"
            priority
            quality={100}
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.dropdown) {
              const isOpen = openDropdown === item.label;
              return (
                <div key={item.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 rounded-xl ${
                      isActive(item.href) ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={10} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-56 p-2 rounded-2xl border border-white/[0.06] bg-[#0A1224]/95 backdrop-blur-xl shadow-2xl"
                      >
                        {item.dropdown.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                            >
                              <SubIcon size={14} className="text-white/30 shrink-0" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 rounded-xl ${
                  isActive(item.href) ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/cart" className="relative p-2 ml-2 text-white/40 hover:text-white/70 transition-colors">
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
            <div className="p-4 space-y-1 rounded-2xl border border-white/[0.06] bg-[#0A1224]/95 backdrop-blur-xl shadow-2xl max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                          isActive(item.href)
                            ? 'text-white bg-[#2563EB]/10 border border-[#2563EB]/15'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        {item.label}
                      </Link>
                      <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l border-white/[0.06] pl-3">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/40 hover:text-white hover:bg-white/[0.04] transition-all"
                          >
                            <sub.icon size={13} className="text-white/20" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${
                      isActive(item.href)
                        ? 'text-white bg-[#2563EB]/10 border border-[#2563EB]/15'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.label}
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
