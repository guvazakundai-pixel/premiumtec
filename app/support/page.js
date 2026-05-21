'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'How do I place an order?', a: 'Browse our collection, add items to your cart, and proceed to checkout via WhatsApp. Our team will confirm availability and arrange payment.' },
  { q: 'What payment methods do you accept?', a: 'We accept EcoCash, Innbucks, Visa, Mastercard, and ZIPIT. Full payment is required before dispatch.' },
  { q: 'Do you deliver nationwide?', a: 'Yes, we deliver across Zimbabwe. Same-day delivery is available within Harare for orders placed before 14:00. Nationwide delivery takes 1-3 business days.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day return policy for unopened items in original packaging. Full details on our Returns page.' },
  { q: 'Are your products authentic?', a: 'Absolutely. Every device is sourced directly from official distributors and comes with full manufacturer warranty.' },
  { q: 'How long does delivery take?', a: 'Harare: same-day or next-day. Nationwide: 1-3 business days via courier.' },
  { q: 'Do you offer warranties?', a: 'All devices come with manufacturer warranty. Extended warranty options available on select products.' },
  { q: 'Can I trade in my old device?', a: 'Yes, we offer trade-in options on select premium devices. Contact us for a quote.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const body = `Hi PremiumTec, I have a support question:\n\nEmail: ${email}\nMessage: ${msg}\n\nPlease get back to me.`;
    window.open(`https://wa.me/263775685616?text=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-[#3B82F6]" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">Support</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-4">How Can We Help?</h1>
          <p className="text-sm text-white/30 font-light max-w-lg mb-12">Find answers to common questions or reach out directly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-semibold text-white/80 mb-6">FAQ</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="product-card overflow-hidden rounded-[16px]">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-5 py-4 text-left text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center justify-between gap-2">
                    {faq.q}
                    <ChevronDown size={14} className={`text-white/20 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-white/40 font-light leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="product-card p-8 sticky top-24">
              <h2 className="text-lg font-semibold text-white/80 mb-2">Contact Us</h2>
              <p className="text-sm text-white/30 font-light mb-6">Reach out via WhatsApp for fastest response.</p>
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div className="glass-input">
                  <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none" required />
                </div>
                <div className="glass-input">
                  <textarea placeholder="How can we help?" value={msg} onChange={e => setMsg(e.target.value)} rows={4}
                    className="w-full px-4 py-3 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none resize-none" />
                </div>
                <button type="submit" className="w-full btn-premium btn-premium--primary text-[10px] justify-center">Send via WhatsApp →</button>
              </form>
              <div className="border-t border-white/[0.04] pt-4 space-y-2 text-xs text-white/50">
                <p><span className="text-[#3B82F6]">Call:</span> +263 775 685 616</p>
                <p><span className="text-[#3B82F6]">WhatsApp:</span> +263 775 685 616</p>
                <p><span className="text-[#3B82F6]">Visit:</span> Sirus Mall, 1st Floor, Harare</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
