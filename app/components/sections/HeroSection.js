'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '96', label: 'Performance Score' },
  { value: '3+', label: 'Years Experience' },
];

const floatingCards = [
  { title: 'Web Dev', desc: 'Next.js, React, Node', color: '#F4C430', x: '75%', y: '25%', delay: 0 },
  { title: 'UI/UX', desc: 'Figma, Framer, Tailwind', color: '#00A86B', x: '80%', y: '55%', delay: 1.5 },
  { title: 'Cloud', desc: 'AWS, Vercel, Docker', color: '#E63946', x: '10%', y: '30%', delay: 0.8 },
  { title: 'Mobile', desc: 'React Native, Flutter', color: '#F4C430', x: '15%', y: '60%', delay: 2 },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,196,48,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,168,107,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(230,57,70,0.02)_0%,transparent_50%)]" />
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(244,196,48,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto w-full text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="tag-premium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430] animate-pulse-soft" />
            Zimbabwe&apos;s Premium Digital Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] mb-6"
        >
          Premium Digital Systems
          <br />
          <span className="text-gradient">Built for the Future.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          We design and engineer modern websites, applications, and digital experiences
          that help brands stand out.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-premium btn-primary text-sm px-8 py-3.5">
            Start a Project
            <ArrowRight size={15} />
          </Link>
          <Link href="/#work" className="btn-premium btn-secondary text-sm px-8 py-3.5">
            View Our Work
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
              className="glass-panel px-5 py-4 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-white/40 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating glass cards */}
      <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
        {floatingCards.map((card) => (
          <motion.div
            key={card.title}
            className="absolute"
            style={{ left: card.x, top: card.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + card.delay, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + card.delay, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
              className="px-4 py-3 rounded-2xl"
              style={{
                background: 'rgba(17,17,17,0.7)',
                backdropFilter: 'blur(40px)',
                border: `1px solid rgba(255,255,255,0.08)`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full" style={{ background: card.color, boxShadow: `0 0 8px ${card.color}40` }} />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{card.title}</p>
                  <p className="text-[10px] text-white/40">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
