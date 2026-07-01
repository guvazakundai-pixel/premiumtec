'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  ArrowRight, ChevronDown, Check, Star, Quote,
  Mail, MapPin, Phone, MessageCircle,
  Shield, Truck, Clock, Headphones, Package, RefreshCw,
  Smartphone, Monitor, Laptop, Gamepad2,
} from 'lucide-react';
import { products } from './products/data';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const heroSlides = [
  {
    id: 'laptops',
    title: 'Premium Laptops',
    subtitle: 'Power & portability redefined',
    desc: 'From ultrabooks to workstations — discover the finest laptops engineered for performance, crafted for excellence.',
    cta: 'Explore Laptops',
    href: '/laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1920&q=80',
    accent: '#0071E3',
  },
  {
    id: 'pcs',
    title: 'Performance PCs',
    subtitle: 'Built for what you do',
    desc: 'From office-ready to high-performance workstations — custom builds and premium desktops for every need.',
    cta: 'Explore PCs',
    href: '/pcs',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1920&q=80',
    accent: '#7C3AED',
  },
  {
    id: 'gaming',
    title: 'Gaming',
    subtitle: 'Level up your play',
    desc: 'Consoles, gaming desktops, monitors, and gear — everything you need for the ultimate gaming setup.',
    cta: 'Explore Gaming',
    href: '/gaming',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1920&q=80',
    accent: '#E11D48',
  },
  {
    id: 'phones',
    title: 'Flagship Smartphones',
    subtitle: 'The future in your hands',
    desc: 'Latest flagships from Apple, Samsung, and more. Cutting-edge cameras, blazing processors, stunning displays.',
    cta: 'View Phones',
    href: '/phones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1920&q=80',
    accent: '#10B981',
  },
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'Connect with confidence',
    desc: 'Enterprise networking equipment — switches, routers, access points, and infrastructure for reliable connectivity.',
    cta: 'Shop Networking',
    href: '/accessories',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80',
    accent: '#FF6B35',
  },
  {
    id: 'displays',
    title: 'Interactive Displays',
    subtitle: 'See the bigger picture',
    desc: 'Enterprise-grade interactive panels and displays for boardrooms, classrooms, and command centers.',
    cta: 'View Displays',
    href: '/displays',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1920&q=80',
    accent: '#2563EB',
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.width = '0%';
    requestAnimationFrame(() => {
      el.style.transition = 'width 5s linear';
      el.style.width = '100%';
    });
  }, [activeIndex]);

  return (
    <section className="relative pt-28 overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
        pagination={{ clickable: true, el: '.swiper-dots', bulletClass: 'carousel-dot', bulletActiveClass: 'active' }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={700}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        loop
        className="w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[70vh] sm:min-h-screen flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-[#121316]">
                <img src={slide.image} alt={slide.title}
                  className="w-full h-full object-cover brightness-[0.75]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 sm:py-20">
                <div className="max-w-2xl">
                  <span
                    className="animate-hero-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                    style={{ color: '#FFFFFF', backgroundColor: `${slide.accent}40`, animationDelay: '0.1s' }}
                  >
                    {slide.subtitle}
                  </span>
                  <h1
                    className="animate-hero-in text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-4 font-sans"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="animate-hero-in text-base sm:text-lg text-white/85 leading-relaxed max-w-md mb-8"
                    style={{ animationDelay: '0.3s' }}
                  >
                    {slide.desc}
                  </p>
                  <div
                    className="animate-hero-in flex flex-col sm:flex-row gap-3"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 text-white"
                      style={{ backgroundColor: slide.accent }}
                    >
                      {slide.cta} <ArrowRight size={15} />
                    </Link>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium border border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300 bg-white/10 backdrop-blur-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-[#E2E8F0]">
        <div ref={progressRef} className="h-full" style={{ width: '100%', backgroundColor: heroSlides[activeIndex]?.accent || '#0071E3' }} />
      </div>

      <button className="swiper-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#E2E8F0] flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hidden md:flex">
        <ChevronDown size={18} className="rotate-90 text-[#6B7080]" />
      </button>
      <button className="swiper-next absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#E2E8F0] flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm hidden md:flex">
        <ChevronDown size={18} className="-rotate-90 text-[#6B7080]" />
      </button>

      <div className="swiper-dots absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" />
    </section>
  );
}

function TrustBar() {
  const logos = [
    'HP', 'Dell', 'Apple', 'Lenovo', 'ASUS',
    'Samsung', 'Xiaomi', 'Google', 'Nothing', 'Canon',
  ];
  return (
    <section className="py-12 border-y border-[#E2E8F0] bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3] text-center mb-8">
          Trusted brands we supply
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-ticker">
            {[...logos, ...logos].map((name, i) => (
              <div key={`${name}-${i}`} className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#0071E3]/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0071E3]">{name[0]}</span>
                </div>
                <span className="text-sm font-medium text-[#6B7080] whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const shopCategories = [
  {
    name: 'Laptops', href: '/laptops', count: '50+ models',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  },
  {
    name: 'PCs', href: '/pcs', count: 'Custom builds',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
  },
  {
    name: 'Gaming', href: '/gaming', count: 'Consoles & PCs',
    image: products.find(p => p.slug === 'playstation-5')?.image || 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
  },
  {
    name: 'Phones', href: '/phones', count: 'Latest flagships',
    image: products.find(p => p.slug === 'iphone-16-pro-max')?.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
  },
  {
    name: 'Accessories', href: '/accessories', count: 'Complete setups',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
  {
    name: 'Displays', href: '/displays', count: 'Interactive panels',
    image: 'https://images.unsplash.com/photo-1617017936090-5f5c0a5d1e90?w=800&q=80',
  },
];

function ShopByCategory() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#F0F7FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3] text-center mb-2">Shop by Category</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1D1D1F] mb-10 font-sans">
            Explore our collection
          </h2>
        </motion.div>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={2}
          slidesPerGroup={4}
          grid={{ rows: 2, fill: 'row' }}
          spaceBetween={16}
          navigation={{ prevEl: '.cat-prev', nextEl: '.cat-next' }}
          pagination={{ clickable: true, el: '.cat-dots', bulletClass: 'carousel-dot', bulletActiveClass: 'active' }}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 4, spaceBetween: 16 },
            1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          }}
          className="w-full !pb-14"
        >
          {shopCategories.map((cat) => (
            <SwiperSlide key={cat.name} className="!h-auto">
              <Link
                href={cat.href}
                className="group relative block w-full aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="relative z-10 h-full flex flex-col justify-end p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-white/80">{cat.count}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="cat-dots flex items-center justify-center gap-2 -mt-2" />
      </div>
    </section>
  );
}

function FeaturedSection({ products = [] }) {
  const featuredSlugs = ['hp-spectre', 'iphone-17-pro-max', 'playstation-5-slim-disc', 'interactive-flat-panel-86'];
  const featuredItems = featuredSlugs.map(slug => products.find(p => p.slug === slug)).filter(Boolean);

  if (featuredItems.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 section-accent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center !text-[#93C5FD]">Featured Products</p>
          <h2 className="section-title text-center mb-4 !text-white">Handpicked for you</h2>
          <p className="text-[#BFDBFE] text-center mx-auto max-w-xl mb-14">
            Curated selections from each category — premium quality, exceptional value.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredItems.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
            >
              <Link href={`/products/${product.slug}`} className="group block overflow-hidden h-full rounded-2xl relative shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-[#1E40AF]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 product-overlay" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white"
                      style={{
                        backgroundColor:
                          product.badge === 'FLAGSHIP' ? '#0071E3' :
                          product.badge === 'DEAL' ? '#E11D48' :
                          product.badge === 'CONSOLE' ? '#7C3AED' :
                          product.badge === 'NEW' ? '#10B981' : '#6E6E73'
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-black/40 text-white backdrop-blur-sm">
                      -${((product.originalPrice - product.price) / product.originalPrice * 100).toFixed(0)}%
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-white/70 mb-2 line-clamp-1">{product.processor} &middot; {product.storage}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-white/60 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-[#FF9F0A] fill-[#FF9F0A]" />
                        <span className="text-xs text-white/80">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} className="text-center mt-10">
          <Link href="/shop" className="btn-white">
            View All Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function InfoSection() {
  const [expanded, setExpanded] = useState(null);
  const infos = [
    {
      icon: Shield,
      title: 'Official Warranty',
      subtitle: '100% Authentic & Covered',
      color: '#0071E3',
      details: [
        'Every device we sell comes with a minimum 90-day warranty covering hardware defects.',
        'Brand new boxed products include full manufacturer warranty (typically 12-24 months).',
        'Warranty covers motherboard, display, storage, RAM, and battery (excluding accidental damage).',
        'Refurbished devices are tested, graded, and certified before listing — Grade A condition guaranteed.',
        'To make a claim, contact us via WhatsApp or email with your invoice number. We typically process claims within 48 hours.',
        'Extended warranty options available on request for an additional fee.',
      ],
    },
    {
      icon: Truck,
      title: 'Fast Deliveries',
      subtitle: 'Same-day in Harare',
      color: '#10B981',
      details: [
        'Free express delivery on all orders over $999 within Harare.',
        'Same-day delivery available for orders placed before 2pm in Harare CBD and surrounding suburbs.',
        'Nationwide delivery via trusted courier partners — typically 1-3 business days.',
        'Real-time order tracking provided via WhatsApp for all deliveries.',
        'International shipping available on request — rates vary by destination.',
        'All packages are securely packed with proper padding and insurance coverage.',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Hassle-Free Returns',
      subtitle: 'No questions asked',
      color: '#E11D48',
      details: [
        'Change of mind? Return within 7 days of delivery for a full refund (item must be in original condition).',
        'Defective items can be returned within the warranty period for repair, replacement, or refund.',
        'Simply WhatsApp us your order number and reason for return — we will arrange collection.',
        'Refunds are processed within 3-5 business days after we receive and inspect the returned item.',
        'Custom-configured PCs and software licenses are non-refundable but covered by warranty.',
        'We believe in fair treatment — if you are not satisfied, we will make it right.',
      ],
    },
    {
      icon: Headphones,
      title: 'Premium Support',
      subtitle: '24/7 expert assistance',
      color: '#7C3AED',
      details: [
        'Our team of certified technicians is available 24/7 to assist with any issue.',
        'Average WhatsApp response time: under 5 minutes during business hours (8am-6pm).',
        'Services include: diagnostics, remote support, OS installation, hardware upgrades, and repairs.',
        'In-person support available at our Sirus Mall location — 1st Floor, Harare.',
        'We offer on-site support for enterprise clients with service level agreements.',
        'Contact us via WhatsApp (+263 780 579 633), email (hello@coretechsystems.co.zw), or visit our shop.',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">Why Shop With Us</p>
          <h2 className="section-title text-center mb-14">
            Built on trust, backed by service
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {infos.map((info, i) => {
            const Icon = info.icon;
            const isOpen = expanded === i;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left card-gray p-6 sm:p-8 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${info.color}0d` }}
                    >
                      <Icon size={22} style={{ color: info.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-[#1D1D1F]">{info.title}</h3>
                          <p className="text-sm text-[#6B7080]">{info.subtitle}</p>
                        </div>
                        <ChevronDown
                          size={18}
                          className="text-[#9CA3AF] shrink-0 transition-transform duration-300"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? '400px' : '0' }}
                      >
                        <ul className="mt-4 space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                          {info.details.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-sm text-[#6B7080]">
                              <Check size={14} className="text-[#0071E3] mt-0.5 shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    { name: 'Tafadzwa M.', role: 'Harare', text: 'Bought a gaming laptop from Core Tech Systems — the price was better than anywhere else and it arrived the same day. Highly recommend.' },
    { name: 'Sarah N.', role: 'Nairobi', text: 'The HP Spectre I ordered was delivered to Nairobi in 2 days. Excellent communication throughout. Will definitely buy again.' },
    { name: 'Dr. Kelvin C.', role: 'Harare', text: 'Upgraded my office with 5 workstations from Core Tech. Professional service, proper warranty, and great after-sales support.' },
    { name: 'Elizabeth T.', role: 'Bulawayo', text: 'My iPhone 16 Pro Max was $200 cheaper than other shops. Genuine product with full warranty. Trustworthy dealer.' },
    { name: 'James R.', role: 'Mutare', text: 'The interactive display we ordered for our boardroom is fantastic. Installation support was top-notch.' },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const t = testimonials[current];
  return (
    <section className="py-16 sm:py-20 bg-[#F0F7FF]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title mb-14">What our customers say</h2>
        </motion.div>
        <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
          >
            <Quote size={32} className="text-[#0071E3]/20 mx-auto mb-6" />
            <p className="text-xl sm:text-2xl text-[#1D1D1F] leading-relaxed mb-8 font-medium max-w-2xl mx-auto">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#FF9F0A] fill-[#FF9F0A]" />
              ))}
            </div>
            <p className="text-sm font-semibold text-[#1D1D1F]">{t.name}</p>
            <p className="text-xs text-[#6B7080]">{t.role}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. You can also order directly via WhatsApp — just send us the product link and we will handle the rest.' },
    { q: 'What payment methods do you accept?', a: 'We accept EcoCash, Visa/Mastercard, bank transfers, and cash on delivery (Harare only). Full payment is required before dispatch for first-time customers.' },
    { q: 'Do you offer delivery outside Harare?', a: 'Yes! We deliver nationwide via trusted courier partners. Delivery takes 1-3 business days depending on location. International shipping available on request.' },
    { q: 'Are your refurbished laptops reliable?', a: 'Absolutely. Every refurbished device is professionally tested, cleaned, and graded. We offer a 90-day warranty on all refurbished laptops. They perform like new at a fraction of the cost.' },
    { q: 'Can I visit your physical store?', a: 'Yes! We are located at Sirus Mall, 1st Floor, Harare, Zimbabwe. Visit us Monday to Saturday, 8am to 5pm. You can see products in person before buying.' },
    { q: 'How do I claim warranty?', a: 'Simply WhatsApp us your order number and describe the issue. We will guide you through the process. Most claims are resolved within 48 hours.' },
  ];
  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#F0F7FF]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">FAQ</p>
          <h2 className="section-title text-center mb-14">Frequently asked questions</h2>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] px-6">
          {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="accordion-item"
            >
              <button onClick={() => setOpen(open === i ? null : i)} className="accordion-trigger">
                {faq.q}
                <ChevronDown size={16} className={`text-[#9CA3AF] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className="accordion-content" style={{ maxHeight: open === i ? '200px' : '0' }}>
                <div className="accordion-panel">{faq.a}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [message, setMessage] = useState('');
  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
            hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
          }}>
            <motion.p variants={fadeUp} className="section-label">Contact Us</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-6">
              We are here to help
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[#6B7080] leading-relaxed mb-10">
              Have a question about a product, order, or need advice? Reach out — we typically respond within minutes.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-5">
              {[
                { icon: MapPin, label: 'Sirus Mall, 1st Floor, Harare, Zimbabwe' },
                { icon: Phone, label: '+263 780 579 633' },
                { icon: MessageCircle, label: 'WhatsApp — replies in 5 min' },
                { icon: Mail, label: 'hello@coretechsystems.co.zw' },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
                      <Icon size={16} className="text-[#0071E3]" />
                    </div>
                    <span className="text-sm text-[#6B7080]">{c.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <form onSubmit={(e) => { e.preventDefault(); }} className="glass rounded-3xl p-8 shadow-xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full name" className="input-premium w-full" />
                <input type="email" placeholder="Email address" className="input-premium w-full" />
              </div>
              <input type="text" placeholder="Phone / WhatsApp" className="input-premium w-full" />
              <select className="input-premium w-full text-[#6B7080]">
                <option value="">Select subject</option>
                <option>Product Inquiry</option>
                <option>Order Support</option>
                <option>Warranty Claim</option>
                <option>Bulk / Corporate Order</option>
                <option>General Inquiry</option>
              </select>
              <textarea
                placeholder="How can we help you?"
                rows={4}
                className="input-premium w-full resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5">
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 section-accent text-white overflow-hidden relative">
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
          hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
        }}>
          <motion.p variants={fadeUp} className="section-label !text-[#93C5FD]">Get in Touch</motion.p>
          <motion.h2 variants={fadeUp} className="section-title !text-white mb-6">
            Ready to find your perfect device?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[#BFDBFE] leading-relaxed mb-10 max-w-xl mx-auto">
            Browse our full catalog or talk to our team for personalized recommendations.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0071E3] text-sm font-medium hover:bg-[#F8FAFC] transition-all shadow-lg">
              Browse Shop <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/263780579633"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        }
      })
      .catch(err => console.error('Failed to load dynamic products:', err));
  }, []);

  return (
    <>
      <Hero />
      <TrustBar />
      <ShopByCategory />
      <FeaturedSection products={productList} />
      <InfoSection />
      <Testimonials />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
