'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Shop: [
    { label: 'Laptops', href: '/laptops' },
    { label: 'Phones', href: '/phones' },
    { label: 'Gaming', href: '/gaming' },
    { label: 'PCs & Desktops', href: '/pcs' },
    { label: 'Displays', href: '/displays' },
    { label: 'Accessories', href: '/accessories' },
  ],
  Services: [
    { label: 'Repairs & Upgrades', href: '/repairs' },
    { label: 'Custom PC Builds', href: '/pcs' },
    { label: 'OS Installation', href: '/repairs' },
    { label: 'Data Recovery', href: '/repairs' },
    { label: 'Diagnostics', href: '/repairs' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Request Quote', href: '/contact' },
    { label: 'FAQ', href: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1C1E24]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo.png"
                alt="Core Tech Systems"
                width={640}
                height={427}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-[#86868B] leading-relaxed max-w-sm mb-6">
              Premium laptops, gaming consoles, smartphones, PC builds, and accessories in Harare, Zimbabwe. Expert repairs and tech support.
            </p>
            <div className="space-y-2 text-sm text-[#86868B] mb-6">
              <p className="flex items-center gap-2">
                <span className="text-[#6E6E73] font-medium">Call / WhatsApp:</span>
                <a href="https://wa.me/263780579633" className="hover:text-white transition-colors">+263 780 579 633</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#6E6E73] font-medium">Call:</span>
                <a href="tel:+263710713518" className="hover:text-white transition-colors">+263 71 071 3518</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#6E6E73] font-medium">Email:</span>
                <a href="mailto:kuzivakwashegoko@gmail.com" className="hover:text-white transition-colors">kuzivakwashegoko@gmail.com</a>
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#86868B]">
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="w-1 h-1 rounded-full bg-[#424245]" />
              <span>Core Tech Systems</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#86868B] mb-5">{title}</h4>
              <div className="space-y-3">
                {links.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-sm text-[#6E6E73] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#424245]/50">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs text-[#6E6E73] mr-1">We accept:</span>
            {['EcoCash', 'Innbucks', 'Visa', 'Mastercard', 'ZIPIT'].map((p) => (
              <span key={p} className="text-xs px-3 py-1 rounded-full bg-[#2C2C2E] text-[#A1A1A6]">
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs text-[#6E6E73]">
            <span>Authentic Products</span>
            <span className="w-1 h-1 rounded-full bg-[#424245]" />
            <span>Free Delivery*</span>
            <span className="w-1 h-1 rounded-full bg-[#424245]" />
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
