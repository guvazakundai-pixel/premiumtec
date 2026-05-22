'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A1224] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#2563EB] to-[#38BDF8]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">About</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F1F5F9] mb-4">About Core Tech Systems</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Harare&apos;s premier destination for premium technology, repairs, and gaming.</p>
        </motion.div>

        <div className="glass-card p-8 md:p-10 mb-8">
          <h2 className="text-lg font-semibold text-white/85 mb-4">Our Story</h2>
          <p className="text-sm text-white/40 font-light leading-relaxed mb-4">
            Founded in Harare, Core Tech Systems was built with a single mission: to bring Zimbabwe&apos;s most discerning
            technology enthusiasts access to premium devices, expert repairs, and exceptional service.
          </p>
          <p className="text-sm text-white/40 font-light leading-relaxed">
            We believe that great technology should be accessible, authentic, and backed by expert support.
            Every product in our collection is hand-selected and sourced directly from official distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Shield, title: '100% Authentic', desc: 'Every device sourced from official distributors with full manufacturer warranty.' },
            { icon: Award, title: 'Premium Standards', desc: 'Meticulously curated collection of the finest technology available.' },
            { icon: Users, title: 'Zimbabwe-First', desc: 'Proudly based in Harare, serving customers nationwide.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="glass-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/15 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#2563EB]" />
                </div>
                <h3 className="text-sm font-semibold text-white/85 mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="glass-card p-8">
          <div className="flex items-start gap-3 mb-4">
            <MapPin size={16} className="text-[#2563EB] mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-white/85 mb-2">Visit Our Showroom</h3>
              <p className="text-sm text-white/40 font-light">Corner Speke & Mbuya Nehanda<br />Sirus Mall, 1st Floor<br />Harare, Zimbabwe</p>
              <p className="text-sm text-white/40 font-light mt-2">Monday — Saturday: 08:30 – 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
