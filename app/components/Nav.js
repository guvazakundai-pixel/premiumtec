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

  if (pathname?.startsWith('/admin')) return null;

  const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-28 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'nav-base'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between" ref={dropdownRef}>
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Core Tech Systems"
              width={640}
              height={427}
              className="w-32 md:w-44 h-auto object-contain"
              priority
              quality={100}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isOpen = openDropdown === item.label;
                return (
                  <div key={item.label} className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                        scrolled ? 'text-[#6B7080] hover:text-[#1D1D1F]' : 'text-[#6B7080] hover:text-[#1D1D1F]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 rounded-xl bg-white shadow-xl border border-[#E2E8F0]"
                        >
                          {item.dropdown.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6B7080] hover:text-[#1D1D1F] hover:bg-[#F8FAFC] transition-all duration-200"
                              >
                                <SubIcon size={14} className="text-[#9CA3AF] shrink-0" />
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
                  className={`text-sm font-medium transition-colors duration-200 ${
                    scrolled ? 'text-[#6B7080] hover:text-[#1D1D1F]' : 'text-[#6B7080] hover:text-[#1D1D1F]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/cart"
              className="relative bg-[#0071E3] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1D4ED8] transition-colors flex items-center gap-2"
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
            <Link href="/cart" className={`relative p-2 transition-colors text-[#1D1D1F]`}>
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0071E3] text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors text-[#1D1D1F]`}
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
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-[#6B7080] hover:text-[#1D1D1F] transition-colors"
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
                    className="text-2xl font-medium text-[#6B7080] hover:text-[#1D1D1F] transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={staggerItem} className="mt-4">
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-[#6B7080] hover:text-[#1D1D1F] transition-colors"
                >
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
