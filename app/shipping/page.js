'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0071E3] to-[#2997FF]" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#86868B]">Policies</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1D1D1F] mb-4">Shipping Information</h1>
          <p className="text-sm text-[#6E6E73] font-light max-w-lg mb-12">Last updated: January 2026</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: MapPin, title: 'Harare', desc: 'Same-day delivery for orders placed before 14:00. Next-day delivery for afternoon orders.' },
            { icon: Truck, title: 'Nationwide', desc: '1-3 business days via trusted courier partners. Tracking provided for all shipments.' },
            { icon: Clock, title: 'Order Cutoff', desc: 'Orders placed after 14:00 are processed the next business day. Weekends excluded.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="card-gray p-6">
                <div className="w-10 h-10 rounded-xl bg-[#0071E3]/5 border border-[#0071E3]/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#0071E3]" />
                </div>
                <h3 className="text-sm font-semibold text-[#1D1D1F] mb-2">{item.title}</h3>
                <p className="text-xs text-[#6E6E73] font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="card-gray p-8 md:p-10 space-y-8">
          <Section title="Delivery Options">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#6E6E73]">
                <thead>
                  <tr className="border-b border-[#D2D2D7]">
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-[#86868B] font-medium">Option</th>
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-[#86868B] font-medium">Area</th>
                    <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-[#86868B] font-medium">Cost</th>
                    <th className="text-left py-3 text-[10px] uppercase tracking-wider text-[#86868B] font-medium">Est. Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#D2D2D7]">
                    <td className="py-3 pr-4 text-[#1D1D1F]">Express</td>
                    <td className="py-3 pr-4">Harare</td>
                    <td className="py-3 pr-4">Free (orders &gt; $999)</td>
                    <td className="py-3">Same-day</td>
                  </tr>
                  <tr className="border-b border-[#D2D2D7]">
                    <td className="py-3 pr-4 text-[#1D1D1F]">Standard</td>
                    <td className="py-3 pr-4">Harare</td>
                    <td className="py-3 pr-4">$5</td>
                    <td className="py-3">Next-day</td>
                  </tr>
                  <tr className="border-b border-[#D2D2D7]">
                    <td className="py-3 pr-4 text-[#1D1D1F]">Courier</td>
                    <td className="py-3 pr-4">Nationwide</td>
                    <td className="py-3 pr-4">$10 – $20</td>
                    <td className="py-3">1-3 days</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-[#1D1D1F]">Pickup</td>
                    <td className="py-3 pr-4">Showroom</td>
                    <td className="py-3 pr-4">Free</td>
                    <td className="py-3">Same-day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Free Shipping">
            <p>Complimentary express delivery within Harare on all orders over $999. Use code <span className="text-[#2997FF] font-medium">TECHFREE</span> at checkout (via WhatsApp).</p>
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
      <h2 className="text-lg font-semibold text-[#1D1D1F] mb-3">{title}</h2>
      <div className="text-sm text-[#6E6E73] font-light leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
