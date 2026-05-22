'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/coretechsystems-logo.png"
                alt="Core Tech Systems"
                width={280}
                height={133}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              High-performance laptops, gaming setups, repairs, and premium accessories. Your trusted technology partner in Harare.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Shop</h4>
            <div className="space-y-2.5">
              {['Laptops', 'Gaming', 'Phones', 'PCs', 'Accessories'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="block text-sm text-neutral-400 hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Services</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Repairs', href: '/repairs' },
                { label: 'Support', href: '/support' },
                { label: 'Shipping', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-neutral-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">Company</h4>
            <div className="space-y-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-neutral-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1F1F1F]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs text-neutral-500 mr-1">We accept:</span>
            {['EcoCash', 'Innbucks', 'Visa', 'Mastercard', 'ZIPIT'].map((p) => (
              <span key={p} className="text-xs px-3 py-1 rounded-full bg-[#111] text-neutral-400 border border-[#1F1F1F]">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>Authentic</span>
            <span>Free Delivery*</span>
            <span>Secure</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-[#1F1F1F]">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Core Tech Systems. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            Premium Tech &bull; Harare, Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  );
}
