'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">Legal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-4">Terms of Service</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Last updated: January 2026</p>
        </motion.div>

        <div className="product-card p-8 md:p-10 space-y-8">
          <Section title="1. Acceptance of Terms">
            <p>By accessing and using PremiumTec (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>
          </Section>

          <Section title="2. Products and Pricing">
            <p>All product descriptions, images, and pricing are subject to change without notice. We reserve the right to modify or discontinue products at any time. Prices are listed in US Dollars and may be converted to local currency at prevailing rates.</p>
            <p>While we strive for accuracy, we do not warrant that product descriptions or pricing is error-free. In the event of a pricing error, we reserve the right to cancel or adjust the order.</p>
          </Section>

          <Section title="3. Orders and Payment">
            <p>By placing an order, you agree to provide accurate and complete information. Orders are confirmed via WhatsApp communication. Full payment is required before dispatch.</p>
            <p>We accept EcoCash, Innbucks, Visa, Mastercard, and ZIPIT payments. All transactions are processed securely.</p>
          </Section>

          <Section title="4. Shipping and Delivery">
            <p>Shipping costs and delivery times vary based on location. Same-day delivery is available within Harare for orders placed before 14:00. Nationwide delivery typically takes 1-3 business days.</p>
            <p>Risk of loss passes to you upon delivery. Please inspect goods upon receipt.</p>
          </Section>

          <Section title="5. Returns and Refunds">
            <p>Our return policy allows returns within 7 days of delivery for unopened items in original packaging. Refunds are processed after inspection. See our full Returns policy for details.</p>
          </Section>

          <Section title="6. Warranty">
            <p>All devices come with the manufacturer&apos;s warranty. Warranty claims are handled directly with the manufacturer or through our support team. Extended warranty options are available on select products.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>PremiumTec shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability is limited to the amount paid for the product in question.</p>
          </Section>

          <Section title="8. Contact">
            <p>For questions about these terms, contact us via WhatsApp at +263 775 685 616 or visit our showroom at Sirus Mall, 1st Floor, Harare.</p>
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
