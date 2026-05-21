'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-[#0A1224]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center mb-4 group">
              <Image
                src="/images/techstore-logo.jpg"
                alt="Tech Store"
                width={140}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/30 font-light leading-relaxed max-w-xs">
              High-performance laptops, gaming setups, repairs, and premium accessories. Your trusted technology partner in Harare.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Shop</h4>
            <div className="space-y-2.5">
              <Link href="/laptops" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Laptops</Link>
              <Link href="/gaming" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Gaming</Link>
              <Link href="/accessories" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Accessories</Link>
              <Link href="/cart" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Cart</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Services</h4>
            <div className="space-y-2.5">
              <Link href="/repairs" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Repairs</Link>
              <Link href="/support" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Support</Link>
              <Link href="/shipping" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Shipping</Link>
              <Link href="/returns" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Returns</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">About</Link>
              <Link href="/contact" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Contact</Link>
              <Link href="/privacy" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Terms</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Contact</h4>
            <div className="space-y-2.5 text-sm text-white/30">
              <p>Sirus Mall, 1st Floor</p>
              <p>Harare, Zimbabwe</p>
              <p className="pt-1">Mon – Sat: 08:30 – 17:00</p>
              <p className="pt-1">
                <a href="tel:+263780579633" className="hover:text-white/60 transition-colors">+263 780 579 633</a>
              </p>
              <p>
                <a href="tel:+263708463628" className="hover:text-white/60 transition-colors">+263 708 463 628</a>
              </p>
              <p className="pt-1">
                <a href="https://wa.me/263780579633" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:text-white transition-colors">
                  WhatsApp Us
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-[10px] text-white/20 uppercase tracking-wider">We accept:</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">EcoCash</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Innbucks</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Visa</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Mastercard</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">ZIPIT</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-white/20">
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-400" /> Authentic</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-400" /> Free Delivery*</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-400" /> Secure</span>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Tech Store. All rights reserved.
          </p>
          <p className="text-[10px] text-white/10 tracking-[0.15em] uppercase">
            Premium Tech &bull; Harare, Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  );
}
