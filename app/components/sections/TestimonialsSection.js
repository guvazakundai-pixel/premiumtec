'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Tatenda R.',
    role: 'Founder, ZimFC Pro',
    text: 'PremiumTec transformed our vision into reality. The platform they built is world-class — our community has grown 3x since launch.',
    rating: 5,
  },
  {
    name: 'Sarah M.',
    role: 'CEO, TechHub ZW',
    text: 'Working with this team was seamless. They understood our needs immediately and delivered beyond expectations. Zimbabwe needs more talent like this.',
    rating: 5,
  },
  {
    name: 'James K.',
    role: 'CTO, Digital Solutions',
    text: 'The attention to detail in both design and engineering is exceptional. Our system has been running flawlessly since deployment.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section">
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
          <p className="section-label mb-3">Testimonials</p>
          <h2 className="section-title mb-4">What Clients Say</h2>
          <p className="section-subtitle">
            Don&apos;t take our word for it. Here&apos;s what our clients have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 } },
              }}
              className="card-premium p-7 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} className={s < t.rating ? 'text-[#F4C430] fill-[#F4C430]' : 'text-white/10'} />
                ))}
              </div>
              <p className="text-sm text-white/60 font-light leading-relaxed flex-1 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="pt-5 border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(244,196,48,0.12)', color: '#F4C430', border: '1px solid rgba(244,196,48,0.2)' }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{t.name}</p>
                    <p className="text-[11px] text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
