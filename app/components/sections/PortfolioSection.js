'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'ZimFC Pro',
    desc: 'Competitive gaming ecosystem with 9 competition types, live matches, and automated ranking systems.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.IO'],
    result: '50+ active teams, 200+ matches played',
    accent: '#F4C430',
  },
  {
    title: 'PremiumTec',
    desc: 'Flagship e-commerce experience for premium technology in Zimbabwe with WhatsApp integration.',
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    result: 'Zero-email checkout, same-day delivery',
    accent: '#00A86B',
  },
  {
    title: 'Liquid Glass UI',
    desc: 'Design system and component library with glassmorphism, ambient effects, and motion primitives.',
    tags: ['React', 'Framer Motion', 'CSS', 'Storybook'],
    result: 'Reusable system across 3+ projects',
    accent: '#E63946',
  },
  {
    title: 'Auto-Pilot Systems',
    desc: 'Automation engine for tournament management, pairings, scoring, and real-time notifications.',
    tags: ['Node.js', 'WebSocket', 'Redis', 'PostgreSQL'],
    result: '90% reduction in manual operations',
    accent: '#F4C430',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function PortfolioSection() {
  return (
    <section id="work" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={cardVariants}
          className="mb-14"
        >
          <p className="section-label mb-3">Our Work</p>
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="section-subtitle">
            Real projects that deliver real results. Each one crafted with precision and purpose.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={cardVariants} className="group relative">
              <div
                className="card-premium p-8 h-full flex flex-col"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${p.accent}25`;
                  e.currentTarget.style.boxShadow = `0 12px 48px rgba(0,0,0,0.4), 0 0 30px ${p.accent}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Preview area */}
                <div className="h-44 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="text-center">
                    <div className="text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight" style={{ color: `${p.accent}30` }}>
                      {p.title.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div className="w-16 h-[2px] mx-auto mt-3 rounded-full" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: `${p.accent}08`, backdropFilter: 'blur(4px)' }}>
                    <span className="flex items-center gap-2 text-sm font-medium text-white bg-black/50 px-4 py-2 rounded-xl border border-white/10">
                      View Case Study <ExternalLink size={14} />
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white/90 mb-2 font-[family-name:var(--font-display)]">{p.title}</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed mb-5 flex-1">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/40">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Result */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: p.accent }}>{p.result}</span>
                  <span className="text-xs text-white/20">Live →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
