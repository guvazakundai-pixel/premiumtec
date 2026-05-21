'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Discovery', desc: 'We dive deep into your goals, audience, and vision to build a strategic foundation.', accent: '#F4C430' },
  { num: '02', title: 'Design', desc: 'Beautiful interfaces and seamless experiences crafted through an iterative design process.', accent: '#00A86B' },
  { num: '03', title: 'Development', desc: 'Scalable, performant code engineered with modern tools and best practices.', accent: '#E63946' },
  { num: '04', title: 'Launch', desc: 'Careful deployment, optimization, and ongoing support to ensure long-term success.', accent: '#F4C430' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="mb-14"
        >
          <p className="section-label mb-3">How We Work</p>
          <h2 className="section-title mb-4">Our Process</h2>
          <p className="section-subtitle">
            A proven methodology that takes your project from idea to launch with clarity and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 } },
              }}
              className="relative"
            >
              <div className="card-premium p-7 h-full flex flex-col relative z-10">
                {/* Number */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight"
                    style={{ color: `${step.accent}30` }}
                  >
                    {step.num}
                  </span>
                  {/* Connector line (hidden on last) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block w-8 h-[2px] rounded-full opacity-30"
                      style={{ background: `linear-gradient(90deg, ${step.accent}, ${steps[i+1].accent})` }} />
                  )}
                </div>

                <div
                  className="w-10 h-[3px] rounded-full mb-5"
                  style={{ background: step.accent, boxShadow: `0 0 12px ${step.accent}50` }}
                />

                <h3 className="text-lg font-semibold text-white/90 mb-2.5 font-[family-name:var(--font-display)]">{step.title}</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed">{step.desc}</p>
              </div>

              {/* Step number glow */}
              <div
                className="absolute -top-2 -right-2 w-20 h-20 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: step.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
