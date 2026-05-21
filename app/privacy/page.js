'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">Legal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-4">Privacy Policy</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Last updated: January 2026</p>
        </motion.div>

        <div className="product-card p-8 md:p-10 space-y-8">
          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us, including your name, email address, phone number, and delivery address when you place an order or contact us via WhatsApp, email, or our contact forms.</p>
            <p>We automatically collect certain information when you visit our website, including your IP address, browser type, device information, and browsing behavior through cookies and similar technologies.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/40">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and inquiries</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </Section>

          <Section title="3. Information Sharing">
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.</p>
          </Section>

          <Section title="4. Data Security">
            <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </Section>

          <Section title="5. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/40">
              <li>Access your personal data held by us</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Lodge a complaint with relevant authorities</li>
            </ul>
          </Section>

          <Section title="6. Cookies">
            <p>Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain functionality of our website.</p>
          </Section>

          <Section title="7. Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <p className="text-white/60">WhatsApp: +263 780 579 633<br />Email: Via our contact form at premiumtec.vercel.app/contact<br />Visit: Sirus Mall, 1st Floor, Harare, Zimbabwe</p>
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
