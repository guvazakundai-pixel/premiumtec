'use client';

import Link from 'next/link';
import { Wrench, ArrowRight } from 'lucide-react';

export default function RepairsPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-[#0071E3]/5 flex items-center justify-center mx-auto mb-6">
            <Wrench size={28} className="text-[#0071E3]" />
          </div>
          <p className="section-label text-center">Repair & Upgrade Center</p>
          <h1 className="section-title text-center mb-4">Device Repairs & Upgrades</h1>
          <p className="text-[#6E6E73] max-w-md mx-auto mb-8">
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
