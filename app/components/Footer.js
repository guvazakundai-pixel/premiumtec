'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

const sections = [
  {
    title: 'Services',
    links: [
      { href: '/#services', label: 'Web Development' },
      { href: '/#services', label: 'UI/UX Design' },
      { href: '/#services', label: 'Mobile Apps' },
      { href: '/#services', label: 'Cloud Solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/#work', label: 'Work' },
      { href: '/#process', label: 'Process' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/returns', label: 'Returns' },
      { href: '/shipping', label: 'Shipping' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F4C430] shadow-[0_0_12px_rgba(244,196,48,0.4)]" />
              <span className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
                Premium<span className="text-[#F4C430]">Tec</span>
              </span>
            </Link>
            <p className="text-sm text-white/30 font-light leading-relaxed max-w-xs mb-5">
              Premium digital systems built for the future. We design and engineer modern digital experiences that help brands stand out.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/263775685616" target="_blank" rel="noopener noreferrer"
                className="text-xs text-white/30 hover:text-[#F4C430] transition-colors">
                WhatsApp
              </a>
              <span className="text-white/10">|</span>
              <a href="https://threads.net/@premiumtec_inv" target="_blank" rel="noopener noreferrer"
                className="text-xs text-white/30 hover:text-[#F4C430] transition-colors">
                Threads
              </a>
              <span className="text-white/10">|</span>
              <a href="mailto:hello@premiumtec.co.zw"
                className="text-xs text-white/30 hover:text-[#F4C430] transition-colors">
                Email
              </a>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40 mb-4">{s.title}</h4>
              <div className="space-y-2.5">
                {s.links.map((l) => (
                  <Link key={l.label} href={l.href}
                    className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} PremiumTec. All rights reserved.
          </p>
          <p className="text-[10px] text-white/10 tracking-[0.08em] uppercase">
            Built in Zimbabwe &bull; Engineered for the world
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-white/20 hover:text-[#F4C430] transition-colors group"
          >
            Back to top
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
