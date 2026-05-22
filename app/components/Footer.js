'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  Services: [
    { label: 'Cybersecurity', href: '/#services' },
    { label: 'Cloud Infrastructure', href: '/#services' },
    { label: 'AI & Machine Learning', href: '/#services' },
    { label: 'Software Development', href: '/#services' },
    { label: 'Repairs', href: '/repairs' },
  ],
  Shop: [
    { label: 'Laptops', href: '/laptops' },
    { label: 'Phones', href: '/phones' },
    { label: 'Gaming', href: '/gaming' },
    { label: 'PCs', href: '/pcs' },
    { label: 'Accessories', href: '/accessories' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Support', href: '/support' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/images/coretechsystems-logo.png"
                alt="Core Tech Systems"
                width={240}
                height={114}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-[#86868B] leading-relaxed max-w-sm mb-6">
              Enterprise technology solutions — cybersecurity, cloud infrastructure, AI, and software development. Premium tech retail in Harare, Zimbabwe.
            </p>
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
