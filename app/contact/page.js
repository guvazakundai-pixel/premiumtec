'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const body = `Hi Core Tech Systems, I'd like to get in touch:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-[#0071E3]/40 to-[#0071E3]/10" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#0071E3]">Contact</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#1D1D1F] mb-4">Get in Touch</h1>
          <p className="text-sm text-[#6B7080] font-light max-w-lg mb-12">We&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="card p-8">
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                  className="input-premium w-full" required />
                <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-premium w-full" required />
                <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} rows={4}
                  className="input-premium w-full resize-none" />
                <button type="submit" className="btn-primary w-full justify-center text-xs">
                  <Send size={14} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="card p-8 space-y-6">
              <h2 className="text-lg font-semibold text-[#1D1D1F]">Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#0071E3] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-[#1D1D1F]">Sirus Mall, 1st Floor</p><p className="text-xs text-[#6B7080]">Corner Speke & Mbuya Nehanda, Harare</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#0071E3] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-[#1D1D1F]">Monday — Saturday</p><p className="text-xs text-[#6B7080]">08:30 – 17:00</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-[#0071E3] mt-0.5 shrink-0" />
                  <div><p className="text-sm text-[#1D1D1F]">+263 780 579 633</p><p className="text-xs text-[#6B7080]">+263 71 071 3518</p></div>
                </div>
              </div>
            </div>

            <div className="card p-8 mt-4">
              <h3 className="text-sm font-semibold text-[#1D1D1F] mb-3">Follow Us</h3>
              <a href="https://threads.net/@coretechsystems_zw" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#6B7080] hover:text-[#0071E3] transition-colors">
                @coretechsystems_zw on Threads
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
