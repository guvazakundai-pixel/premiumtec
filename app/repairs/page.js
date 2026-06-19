'use client';

import Link from 'next/link';
import { Wrench, ArrowRight } from 'lucide-react';

export default function RepairsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Wrench size={28} className="text-neutral-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">Device Repairs & Upgrades</h1>
          <p className="text-neutral-400 max-w-md mx-auto mb-8">
            Professional laptop, phone, and gaming console repairs. Screen replacements, hardware upgrades, and diagnostics.
          </p>
          <Link href="/contact" className="btn-primary">
            Book a Repair <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
