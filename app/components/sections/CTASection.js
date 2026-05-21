'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(22,22,22,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Background glow */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#F4C430]/[0.04] blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#00A86B]/[0.03] blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <p className="section-label mb-4">Let&apos;s Build Something</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white mb-5">
              Ready to Create Something
              <br />
              <span className="text-gradient">Extraordinary?</span>
            </h2>
            <p className="text-sm md:text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-8">
              Whether you have a clear vision or need help shaping one, we&apos;d love to hear from you.
              Let&apos;s discuss how we can bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-premium btn-primary text-sm px-8 py-3.5"
              >
                Start a Project
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://wa.me/263775685616"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-secondary text-sm px-8 py-3.5"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.04]">
              <p className="text-xs text-white/20">
                Or email us at <span className="text-white/40">hello@premiumtec.co.zw</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
