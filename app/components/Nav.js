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
    label: 'Shop', href: '/shop',
    dropdown: [
      { label: 'Laptops', href: '/laptops', icon: Laptop },
      { label: 'Phones', href: '/phones', icon: Smartphone },
      { label: 'Gaming', href: '/gaming', icon: Gamepad2 },
      { label: 'PCs', href: '/pcs', icon: Monitor },
      { label: 'Accessories', href: '/accessories', icon: Package },
      { label: 'Displays', href: '/displays', icon: Monitor },
    ],
  },
  { href: '/repairs', label: 'Repairs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'nav-base'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between" ref={dropdownRef}>
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Core Tech Systems"
              width={280}
              height={133}
              className="h-9 w-auto object-contain"
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
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-[#F5F5F7]`}
                    >
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 p-2 rounded-2xl bg-white/80 backdrop-blur-2xl shadow-lg border border-[#D2D2D7]/50"
                        >
                          {item.dropdown.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all duration-200"
                              >
                                <SubIcon size= {15} className="text-[#86868B] shrink-0" />
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
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive(item.href) && scrolled
                      ? 'text-[#0071E3] bg-[#0071E3]/5'
                      : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="w-px h-5 bg-[#D2D2D7]/50 mx-2" />
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-[#0071E3] text-white hover:shadow-lg hover:shadow-[#0071E3]/20"
            >
              <ShoppingBag size={15} />
              Cart
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#0071E3] text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/cart" className="relative p-2 text-[#1D1D1F]">
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0071E3] text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#1D1D1F]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col items-center gap-4"
            >
              {navItems.map((item) => (
                <motion.div key={item.label} variants={staggerItem}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={staggerItem} className="mt-4">
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-lg font-medium hover:shadow-lg hover:shadow-[#0071E3]/20 transition-all"
                >
                  <ShoppingBag size={18} />
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
