'use client';

import { motion } from 'framer-motion';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">Policies</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-4">Returns Policy</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Last updated: January 2026</p>
        </motion.div>

        <div className="product-card p-8 md:p-10 space-y-8">
          <Section title="7-Day Return Window">
            <p>We accept returns within 7 calendar days of delivery. To be eligible, items must be unopened, in their original packaging, and in the same condition as received.</p>
          </Section>

          <Section title="Eligibility Requirements">
            <ul className="list-disc pl-5 space-y-1 text-white/40">
              <li>Item must be unused and unopened</li>
              <li>All original packaging, accessories, and documentation must be included</li>
              <li>Serial numbers must match the original shipment</li>
              <li>Proof of purchase is required</li>
            </ul>
          </Section>

          <Section title="Non-Returnable Items">
            <p>The following items cannot be returned:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/40">
              <li>Opened or used devices</li>
              <li>Products with damaged or missing serial numbers</li>
              <li>Items returned without original packaging</li>
              <li>Software or digital products</li>
            </ul>
          </Section>

          <Section title="Return Process">
            <ol className="list-decimal pl-5 space-y-1 text-white/40">
              <li>Contact us via WhatsApp at +263 780 579 633 within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Our team will provide return instructions and address</li>
              <li>Ship the item back in its original packaging</li>
              <li>Once received and inspected, we will process your refund</li>
            </ol>
          </Section>

          <Section title="Refunds">
            <p>Refunds are processed within 5-7 business days after inspection. Refunds are issued via the original payment method. Shipping costs are non-refundable, and return shipping is the customer&apos;s responsibility unless the return is due to our error.</p>
          </Section>

          <Section title="Damaged or Incorrect Items">
            <p>If you receive a damaged or incorrect item, please contact us within 48 hours of delivery. We will arrange a replacement or full refund, including return shipping costs.</p>
          </Section>

          <Section title="Contact">
            <p>For return inquiries, reach out via:</p>
            <p className="text-white/60">WhatsApp: +263 780 579 633<br />Call: +263 708 463 628<br />Visit: Sirus Mall, 1st Floor, Harare</p>
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
