'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative z-10 border-t border-white/[0.04]">
      {/* Newsletter */}
      <div className="px-6 py-16 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#3B82F6] mb-3 block">
            Stay Connected
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-[#F5F7FA] mb-3">
            Never Miss a Drop
          </h3>
          <p className="text-sm text-white/30 font-light mb-6 max-w-md mx-auto">
            New arrivals, exclusive offers, and limited editions — straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="w-full" style={{ background: 'rgba(22,27,34,0.5)', backdropFilter: 'blur(40px)', border: '1px solid rgba(245,247,250,0.08)', borderRadius: '16px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none"
              />
            </div>
            <button
              onClick={() => { if (email) { setEmail(''); } }}
              className="btn-premium btn-premium--primary text-[10px] whitespace-nowrap w-full sm:w-auto justify-center"
            >
              Subscribe
              <ArrowRight size={12} />
            </button>
          </div>
          <p className="text-[10px] text-white/20 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-base font-bold tracking-tight text-white">PREMIUMTEC</span>
            </Link>
            <p className="text-sm text-white/30 font-light leading-relaxed">
              Premium technology curated for those who demand the best. Flagship devices, exceptional service.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Shop</h4>
            <div className="space-y-2.5">
              <Link href="/phones" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Phones</Link>
              <Link href="/laptops" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Laptops</Link>
              <Link href="/cart" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Cart</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">About</Link>
              <Link href="/contact" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Contact</Link>
              <Link href="/support" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Support</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Legal</h4>
            <div className="space-y-2.5">
              <Link href="/privacy" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Terms of Service</Link>
              <Link href="/returns" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Returns</Link>
              <Link href="/shipping" className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">Shipping</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">Contact</h4>
            <div className="space-y-2.5 text-sm text-white/30">
              <p>Corner Speke & Mbuya Nehanda</p>
              <p>Sirus Mall, 1st Floor, Harare</p>
              <p className="pt-1">Mon – Sat: 08:30 – 17:00</p>
              <p className="pt-1">
                <a href="tel:+263775685616" className="hover:text-white/60 transition-colors">+263 775 685 616</a>
              </p>
              <p>
                <a href="tel:+263708463628" className="hover:text-white/60 transition-colors">+263 708 463 628</a>
              </p>
              <p className="pt-1">
                <a href="https://wa.me/263775685616" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-white transition-colors">
                  WhatsApp Us
                </a>
              </p>
              <p>
                <a href="https://threads.net/@premiumtec_inv" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-white transition-colors">
                  @premiumtec_inv
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/[0.04] pt-8 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <span className="text-[10px] text-white/20 uppercase tracking-wider">We accept:</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">EcoCash</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Innbucks</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Visa</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">Mastercard</span>
            <span className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-white/30 bg-white/[0.02]">ZIPIT</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-[10px] text-white/20">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400" /> Authorized Distributor
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400" /> 100% Authentic
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400" /> Free Delivery Harare*
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400" /> Secure Payments
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} PremiumTec. All rights reserved.
          </p>
          <p className="text-[10px] text-white/10 tracking-[0.15em] uppercase">
            Flagship Phones &bull; Premium Laptops &bull; Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  );
}
