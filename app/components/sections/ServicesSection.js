'use client';

import { motion } from 'framer-motion';
import { Globe, Palette, Smartphone, PenTool, Bot, Cloud } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Fast, scalable websites and web applications built with modern frameworks and best practices.', accent: '#F4C430' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed to delight users and drive engagement.', accent: '#00A86B' },
  { icon: Smartphone, title: 'Mobile Applications', desc: 'Native-feeling cross-platform apps that perform flawlessly on every device.', accent: '#E63946' },
  { icon: PenTool, title: 'Branding', desc: 'Strategic brand identities that communicate your values and resonate with your audience.', accent: '#F4C430' },
  { icon: Bot, title: 'Automation Systems', desc: 'Custom automation solutions that streamline workflows and eliminate repetitive tasks.', accent: '#00A86B' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure designed for performance, reliability, and growth.', accent: '#E63946' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={cardVariants}
          className="mb-14"
        >
          <p className="section-label mb-3">What We Do</p>
          <h2 className="section-title mb-4">Services</h2>
          <p className="section-subtitle">
            From concept to launch, we deliver end-to-end digital solutions that elevate your brand.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={cardVariants} className="group relative">
                <div
                  className="card-premium p-7 h-full flex flex-col relative z-10"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${s.accent}30`;
                    e.currentTarget.style.boxShadow = `0 12px 48px rgba(0,0,0,0.4), 0 0 30px ${s.accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}20` }}
                  >
                    <Icon size={20} style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 mb-2.5 font-[family-name:var(--font-display)]">{s.title}</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-5 pt-4 border-t border-white/[0.04]">
                    <span className="text-xs font-medium" style={{ color: s.accent }}>
                      Learn more →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
