'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">Policies</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-4">Shipping Information</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Last updated: January 2026</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MapPin, title: 'Harare', desc: 'Same-day delivery for orders placed before 14:00. Next-day delivery for afternoon orders.' },
            { icon: Truck, title: 'Nationwide', desc: '1-3 business days via trusted courier partners. Tracking provided for all shipments.' },
            { icon: Clock, title: 'Order Cutoff', desc: 'Orders placed after 14:00 are processed the next business day. Weekends excluded.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="product-card p-6">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/[0.08] border border-[#3B82F6]/[0.12] flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#3B82F6]" />
                </div>
                <h3 className="text-sm font-semibold text-white/80 mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="product-card p-8 md:p-10 space-y-8">
          <Section title="Delivery Options">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white/40">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-white/30 font-medium">Option</th>
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-white/30 font-medium">Area</th>
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-white/30 font-medium">Cost</th>
                    <th className="text-left py-3 text-[10px] uppercase tracking-wider text-white/30 font-medium">Est. Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-white/60">Express</td>
                    <td className="py-3 pr-4">Harare</td>
                    <td className="py-3 pr-4">Free (orders &gt; $999)</td>
                    <td className="py-3">Same-day</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-white/60">Standard</td>
                    <td className="py-3 pr-4">Harare</td>
                    <td className="py-3 pr-4">$5</td>
                    <td className="py-3">Next-day</td>
                  </tr>
                  <tr className="border-b border-white/[0.04]">
                    <td className="py-3 pr-4 text-white/60">Courier</td>
                    <td className="py-3 pr-4">Nationwide</td>
                    <td className="py-3 pr-4">$10 – $20</td>
                    <td className="py-3">1-3 days</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-white/60">Pickup</td>
                    <td className="py-3 pr-4">Showroom</td>
                    <td className="py-3 pr-4">Free</td>
                    <td className="py-3">Same-day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Free Shipping">
            <p>Complimentary express delivery within Harare on all orders over $999. Use code <span className="text-[#3B82F6] font-medium">PREMIUMFREE</span> at checkout (via WhatsApp).</p>
          </Section>

          <Section title="Tracking">
            <p>All nationwide shipments include tracking. You will receive a tracking number via WhatsApp once your order is dispatched. For Harare express deliveries, tracking is available upon request.</p>
          </Section>

          <Section title="Pickup">
            <p>Prefer to collect? Visit our showroom at Sirus Mall, 1st Floor, Harare. Orders are typically ready within 2 hours of confirmation. Monday — Saturday, 08:30 – 17:00.</p>
          </Section>

          <Section title="International Shipping">
            <p>Currently, we only ship within Zimbabwe. For international inquiries, please contact us to discuss options.</p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white/80 mb-3">{title}</h2>
      <div className="text-sm text-white/40 font-light leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
