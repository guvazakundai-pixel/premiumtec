'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Cloud, Brain, Code, ArrowRight, ChevronDown, Check, Star, Quote,
  Mail, MapPin, Phone, MessageCircle, Menu, X, ExternalLink,
  Server, Lock, Users, BarChart3, RefreshCw, Zap, Layers, Globe,
  Cpu, Database, Network, Fingerprint, Smartphone, Monitor,
  ShoppingBag, HardDrive, Wifi, AlertTriangle, TrendingUp, Bot,
  LineChart, Settings, Palette, BookOpen, Target, Eye,
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};

// ─── HERO ───
function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="infra-lines">
        <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 450 Q 360 300, 720 450 T 1440 450" stroke="#0071E3" strokeWidth="0.5" opacity="0.15" />
          <path d="M0 550 Q 360 700, 720 550 T 1440 550" stroke="#2997FF" strokeWidth="0.5" opacity="0.1" />
          <path d="M200 0 L 200 900 M 500 0 L 500 900 M 900 0 L 900 900 M 1200 0 L 1200 900" stroke="#0071E3" strokeWidth="0.3" opacity="0.08" strokeDasharray="4 8" />
          <circle cx="720" cy="450" r="200" stroke="#2997FF" strokeWidth="0.3" opacity="0.1" fill="none" strokeDasharray="2 6" />
          <circle cx="720" cy="450" r="300" stroke="#0071E3" strokeWidth="0.3" opacity="0.08" fill="none" strokeDasharray="2 8" />
          <circle cx="350" cy="250" r="30" fill="#2997FF" opacity="0.1" />
          <circle cx="1100" cy="650" r="20" fill="#0071E3" opacity="0.08" />
          <circle cx="250" cy="700" r="15" fill="#2997FF" opacity="0.06" />
        </svg>
      </div>
      <div className="hero-orb" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-32">
          <motion.div initial="hidden" animate="visible" variants={{
            hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
          }}>
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0071E3]/5 text-[#0071E3] text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
                Enterprise Technology Partner
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1D1D1F] leading-[1.05] mb-6 font-sans">
              Secure, Scale,
              <span className="block gradient-text mt-1">Innovate.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-[#6E6E73] leading-relaxed max-w-lg mb-10">
              Enterprise cybersecurity, cloud infrastructure, AI solutions, and custom software — engineered for African businesses ready to compete globally.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="/#services" className="btn-primary text-sm px-8 py-3.5">
                Explore Services <ArrowRight size={16} />
              </Link>
              <Link href="/laptops" className="btn-outline text-sm px-8 py-3.5 border-[#D2D2D7] text-[#1D1D1F]">
                Visit Shop
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-6 mt-12 text-sm text-[#86868B]">
              <span className="flex items-center gap-2"><Check size={14} className="text-[#0071E3]" /> 99.9% Uptime</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[#0071E3]" /> SOC 2 Compliant</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[#0071E3]" /> 24/7 Support</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="hidden lg:flex flex-col items-end gap-4"
          >
            <div className="relative w-full max-w-md">
              <div className="glass rounded-3xl p-6 shadow-xl animate-float">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-[#0071E3]" />
                    <span className="text-sm font-semibold text-[#1D1D1F]">Threat Detection</span>
                  </div>
                  <span className="text-xs font-medium text-[#0071E3] bg-[#0071E3]/5 px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="h-20 flex items-end gap-2 mb-3">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div
                      key={i} initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.08 }}
                      className="flex-1 rounded-lg bg-gradient-to-t from-[#0071E3] to-[#2997FF] opacity-70"
                    />
                  ))}
                </div>
                <p className="text-xs text-[#86868B]">Real-time threat analysis — 2,847 events monitored</p>
              </div>

              <div className="glass rounded-3xl p-5 shadow-xl animate-float-delayed mt-4 ml-12" style={{ animationDelay: '-3s' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Cloud size={18} className="text-[#0071E3]" />
                    <span className="text-sm font-semibold text-[#1D1D1F]">Cloud Infra</span>
                  </div>
                  <span className="text-[10px] text-[#86868B]">99.9% uptime</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[85, 92, 78, 96].map((v, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-[#1D1D1F]">{v}%</div>
                      <div className="text-[10px] text-[#86868B]">Node {i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST BAR ───
function TrustBar() {
  const logos = [
    'TechCorp', 'DataFlow', 'CloudSync', 'SecureNet', 'AILabs',
    'CyberGuard', 'InfraPro', 'StackBlitz', 'TechCorp', 'DataFlow',
    'CloudSync', 'SecureNet', 'AILabs', 'CyberGuard', 'InfraPro', 'StackBlitz',
  ];
  return (
    <section className="py-12 border-y border-[#D2D2D7]/30 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#86868B] text-center mb-8">
          Trusted by leading organizations across Africa
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-ticker">
            {logos.map((name, i) => (
              <div key={`${name}-${i}`} className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0071E3]/10 to-[#2997FF]/5 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#0071E3]">{name[0]}</span>
                </div>
                <span className="text-sm font-medium text-[#86868B] whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MISSION ───
function Mission() {
  const stats = [
    { value: '99.9%', label: 'Uptime Guaranteed' },
    { value: '150+', label: 'Enterprise Clients' },
    { value: '24/7', label: 'Support Available' },
    { value: '50+', label: 'Certified Engineers' },
  ];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
            hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
          }}>
            <motion.p variants={fadeUp} className="section-label">Our Mission</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-6">
              Engineering the future of African enterprise technology
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#6E6E73] text-lg leading-relaxed mb-8">
              We bridge the gap between global enterprise standards and African business needs. From cybersecurity
              to cloud infrastructure, AI to custom software, we deliver world-class technology solutions that
              empower organizations to compete on the global stage.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#6E6E73] text-lg leading-relaxed mb-10">
              Our team of certified engineers brings decades of combined experience from global technology leaders,
              now focused on transforming African enterprises.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] font-sans">{s.value}</div>
                  <div className="text-xs text-[#86868B] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Security First', desc: 'Every solution built on zero-trust architecture' },
                  { icon: Zap, title: 'Performance', desc: 'Optimized for speed, reliability, and scale' },
                  { icon: Users, title: 'Local Expertise', desc: 'Deep understanding of African business context' },
                  { icon: Globe, title: 'Global Standards', desc: 'SOC 2, ISO 27001, and GDPR compliant' },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="p-4 rounded-2xl bg-[#F5F5F7]">
                      <Icon size={20} className="text-[#0071E3] mb-2" />
                      <h4 className="text-sm font-semibold text-[#1D1D1F] mb-1">{f.title}</h4>
                      <p className="text-xs text-[#86868B]">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ───
const serviceTabs = [
  { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'cloud', label: 'Cloud Infrastructure', icon: Cloud },
  { id: 'ai', label: 'AI & Machine Learning', icon: Brain },
  { id: 'software', label: 'Software Development', icon: Code },
];

const serviceData = {
  cybersecurity: {
    title: 'Enterprise Cybersecurity',
    desc: 'Protect your organization with military-grade security solutions designed for modern threats.',
    items: [
      { title: 'Threat Detection & Response', desc: '24/7 SOC monitoring with real-time threat intelligence', features: ['SIEM integration', 'Incident response', 'Threat hunting'] },
      { title: 'Network Security', desc: 'Zero-trust architecture and advanced firewall protection', features: ['Zero-trust implementation', 'Firewall management', 'Network segmentation'] },
      { title: 'Endpoint Protection', desc: 'Comprehensive device security across your organization', features: ['EDR/XDR solutions', 'Mobile device management', 'Patch automation'] },
      { title: 'Cloud Security', desc: 'Secure your cloud infrastructure across all providers', features: ['CSPM', 'Cloud IAM', 'Compliance monitoring'] },
      { title: 'Identity & Access', desc: 'Robust identity management and access control systems', features: ['SSO/MFA', 'Privileged access', 'Identity governance'] },
      { title: 'Compliance & Audit', desc: 'Stay compliant with regulatory requirements and standards', features: ['ISO 27001', 'POPIA compliance', 'Audit readiness'] },
    ],
  },
  cloud: {
    title: 'Cloud Infrastructure',
    desc: 'Scalable, resilient cloud solutions engineered for growth and reliability.',
    items: [
      { title: 'Cloud Migration', desc: 'Seamless migration of workloads to any cloud provider', features: ['Assessment & planning', 'Phased migration', 'Post-migration optimization'] },
      { title: 'Infrastructure as Code', desc: 'Automated, repeatable infrastructure deployment', features: ['Terraform/AWS CDK', 'CI/CD pipelines', 'Configuration management'] },
      { title: 'Kubernetes & Containers', desc: 'Container orchestration at enterprise scale', features: ['K8s cluster management', 'Service mesh', 'Auto-scaling'] },
      { title: 'DevOps & SRE', desc: 'Reliable operations with modern DevOps practices', features: ['Monitoring & alerting', 'Incident management', 'SLO tracking'] },
      { title: 'Hybrid & Multi-Cloud', desc: 'Unified management across any cloud environment', features: ['AWS/Azure/GCP', 'Cross-cloud networking', 'Cost optimization'] },
      { title: 'Disaster Recovery', desc: 'Business continuity with automated failover solutions', features: ['Backup automation', 'DR testing', 'RTO/RPO optimization'] },
    ],
  },
  ai: {
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation and data-driven insights to transform your business.',
    items: [
      { title: 'Custom ML Models', desc: 'Tailored machine learning models for your use cases', features: ['Model development', 'Training & tuning', 'Deployment & MLOps'] },
      { title: 'Natural Language Processing', desc: 'Text analysis, chatbots, and language understanding', features: ['Conversational AI', 'Sentiment analysis', 'Document processing'] },
      { title: 'Computer Vision', desc: 'Visual recognition and analysis solutions', features: ['Object detection', 'Image classification', 'Video analytics'] },
      { title: 'Predictive Analytics', desc: 'Forecast trends and make data-driven decisions', features: ['Demand forecasting', 'Anomaly detection', 'Risk prediction'] },
      { title: 'Data Engineering', desc: 'Robust data pipelines and infrastructure', features: ['Data lakes/warehouses', 'ETL pipelines', 'Data governance'] },
      { title: 'AI Consulting', desc: 'Strategic guidance for AI adoption and integration', features: ['Use case identification', 'ROI analysis', 'Implementation roadmap'] },
    ],
  },
  software: {
    title: 'Software Development',
    desc: 'Custom software solutions built with modern architectures and best practices.',
    items: [
      { title: 'Web Applications', desc: 'Responsive, high-performance web applications', features: ['React/Next.js', 'API development', 'Progressive web apps'] },
      { title: 'Mobile Applications', desc: 'Native and cross-platform mobile experiences', features: ['iOS/Android', 'React Native/Flutter', 'App store deployment'] },
      { title: 'Microservices', desc: 'Scalable, decoupled service architectures', features: ['Service decomposition', 'Event-driven design', 'API gateways'] },
      { title: 'Enterprise Platforms', desc: 'Large-scale platforms for complex business needs', features: ['ERP/CRM systems', 'Workflow automation', 'Integration platforms'] },
      { title: 'Legacy Modernization', desc: 'Transform legacy systems into modern solutions', features: ['Code refactoring', 'Platform migration', 'Technical debt reduction'] },
      { title: 'Quality Engineering', desc: 'Comprehensive testing and quality assurance', features: ['Automated testing', 'Performance testing', 'Security testing'] },
    ],
  },
};

function Services() {
  const [activeTab, setActiveTab] = useState('cybersecurity');
  const current = serviceData[activeTab];
  const ActiveIcon = serviceTabs.find(t => t.id === activeTab)?.icon;

  return (
    <section id="services" className="py-24 md:py-32 section-accent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
          hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
        }}>
          <motion.p variants={fadeUp} className="section-label text-center">Our Services</motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-center mb-4">
            Enterprise-grade technology solutions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6E6E73] text-center mx-auto max-w-2xl mb-12">
            From security to software, we deliver end-to-end technology solutions that protect, scale, and transform your business.
          </motion.p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {serviceTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive ? 'tab-active' : 'tab-inactive'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] font-sans mb-3">{current.title}</h3>
              <p className="text-[#6E6E73] max-w-xl mx-auto">{current.desc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {current.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                >
                  <div className="service-card h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#0071E3]/5 flex items-center justify-center mb-4">
                      <ActiveIcon size={20} className="text-[#0071E3]" />
                    </div>
                    <h4 className="text-base font-semibold text-[#1D1D1F] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#6E6E73] mb-4 flex-1">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#86868B]">
                          <Check size={12} className="text-[#0071E3] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-5 text-xs font-semibold text-[#0071E3] flex items-center gap-1 hover:gap-2 transition-all">
                      Learn more <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── TECH STACK ───
function TechStack() {
  const stacks = [
    { category: 'Cloud & Infra', items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker'] },
    { category: 'Security', items: ['CrowdStrike', 'Palo Alto', 'Cloudflare', 'Splunk', 'Wazuh', 'Okta'] },
    { category: 'AI & Data', items: ['TensorFlow', 'PyTorch', 'LangChain', 'Spark', 'Kafka', 'Snowflake'] },
    { category: 'Development', items: ['React', 'Next.js', 'Node.js', 'Go', 'Python', 'Rust'] },
  ];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">Technology Stack</p>
          <h2 className="section-title text-center mb-4">Built on world-class technology</h2>
          <p className="text-[#6E6E73] text-center mx-auto max-w-xl mb-14">
            We partner with industry-leading platforms to deliver enterprise-grade solutions you can trust.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stacks.map((stack) => (
            <motion.div key={stack.category} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="card-gray p-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0071E3] mb-4">{stack.category}</h4>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-lg bg-white border border-[#D2D2D7] text-xs font-medium text-[#6E6E73]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ───
function Features() {
  const features = [
    { icon: Shield, title: 'Zero-Trust Security', desc: 'Every solution built on zero-trust architecture with end-to-end encryption and continuous verification.' },
    { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Complete visibility into your infrastructure with customizable dashboards and intelligent alerts.' },
    { icon: RefreshCw, title: 'Automated Operations', desc: 'CI/CD pipelines, infrastructure as code, and automated incident response reduce manual toil.' },
    { icon: Users, title: 'Dedicated Support', desc: '24/7 access to certified engineers with average response time under 15 minutes.' },
    { icon: Layers, title: 'Scalable Architecture', desc: 'Solutions designed to grow with you — from startup to enterprise, without re-platforming.' },
    { icon: Globe, title: 'Global Compliance', desc: 'SOC 2, ISO 27001, GDPR, and POPIA compliant. Enterprise-grade governance built in.' },
  ];
  return (
    <section className="py-24 md:py-32 section-accent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">Why Core Tech Systems</p>
          <h2 className="section-title text-center mb-14">
            Enterprise engineering, <span className="gradient-text">African built</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="card-gray p-8"
              >
                <Icon size={24} className="text-[#0071E3] mb-4" />
                <h3 className="text-base font-semibold text-[#1D1D1F] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ───
function CaseStudies() {
  const cases = [
    {
      client: 'FinServe Africa',
      tag: 'Cybersecurity',
      title: 'Zero-trust transformation for a financial services leader',
      result: '99.9% threat detection rate, 60% reduction in incident response time',
    },
    {
      client: 'RetailChain ZW',
      tag: 'Cloud Infrastructure',
      title: 'Multi-cloud migration powering 200+ retail locations',
      result: '40% infrastructure cost reduction, 99.99% uptime achieved',
    },
    {
      client: 'HealthAI Labs',
      tag: 'AI & ML',
      title: 'ML-powered diagnostic system for rural healthcare',
      result: '85% faster diagnosis, serving 50,000+ patients monthly',
    },
  ];
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">Case Studies</p>
          <h2 className="section-title text-center mb-4">Real results for real businesses</h2>
          <p className="text-[#6E6E73] text-center mx-auto max-w-xl mb-14">
            See how we&apos;ve helped organizations transform their technology and achieve measurable outcomes.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="service-card h-full flex flex-col"
            >
              <span className="text-xs font-semibold text-[#0071E3] mb-3">{c.tag}</span>
              <span className="text-xs text-[#86868B] mb-2">{c.client}</span>
              <h3 className="text-base font-semibold text-[#1D1D1F] mb-3 flex-1">{c.title}</h3>
              <div className="pt-4 border-t border-[#D2D2D7]/50">
                <p className="text-sm text-[#6E6E73]">{c.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  const testimonials = [
    { name: 'Tafadzwa M.', role: 'CTO, FinServe Africa', text: 'Core Tech Systems transformed our security posture. Their team understood our unique challenges as an African financial institution and delivered a solution that exceeds global standards.' },
    { name: 'Sarah N.', role: 'VP Engineering, RetailChain ZW', text: 'The cloud migration was seamless. Zero downtime, measurable cost savings, and their 24/7 support team is exceptional. Truly a world-class partner.' },
    { name: 'Dr. Kelvin C.', role: 'Founder, HealthAI Labs', text: 'Their AI team built a diagnostic system that is literally saving lives. The expertise and dedication they brought to our project was remarkable.' },
    { name: 'Elizabeth T.', role: 'CIO, EduTech Africa', text: 'From assessment to deployment, every phase was executed with precision. Our infrastructure has never been more reliable or secure.' },
    { name: 'James R.', role: 'Director of IT, GovTech Solutions', text: 'Working with Core Tech Systems was a game-changer. Their compliance expertise ensured we met all regulatory requirements while modernizing our systems.' },
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
    <section className="py-24 md:py-32 section-accent">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title mb-14">Trusted by industry leaders</h2>
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
            <p className="text-xs text-[#86868B]">{t.role}</p>
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

// ─── ABOUT ───
function AboutSection() {
  const team = [
    { name: 'Tendai Gumbo', role: 'CEO & Founder', desc: '15+ years in enterprise technology, former Cloud Architect at AWS' },
    { name: 'Rumbi Chikwanha', role: 'CTO, Cybersecurity', desc: 'Former Security Lead at CrowdStrike, CISSP, CISM certified' },
    { name: 'Tanaka Moyo', role: 'VP, Cloud Engineering', desc: 'Ex-Google SRE, Kubernetes contributor, led migrations for 50+ enterprises' },
  ];
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">About Us</p>
          <h2 className="section-title text-center mb-4">Built by engineers, for enterprises</h2>
          <p className="text-[#6E6E73] text-center mx-auto max-w-2xl mb-16">
            Core Tech Systems was founded by a team of African technology leaders with experience at the world&apos;s
            most innovative companies. We returned home to build world-class technology infrastructure for African businesses.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="card-gray p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0071E3] to-[#2997FF] mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{member.name[0]}</span>
              </div>
              <h4 className="text-sm font-semibold text-[#1D1D1F]">{member.name}</h4>
              <p className="text-xs text-[#0071E3] font-medium mb-3">{member.role}</p>
              <p className="text-sm text-[#6E6E73]">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ───
function Pricing() {
  const plans = [
    {
      name: 'Starter', price: 'Custom', desc: 'For growing businesses taking their first steps with enterprise technology',
      features: ['Security audit & recommendations', 'Basic cloud setup (1 provider)', 'Email support (8am-5pm)', 'Monthly review calls', 'Community access'],
    },
    {
      name: 'Professional', price: 'Custom', desc: 'For established organizations needing comprehensive enterprise solutions',
      features: ['Full security implementation', 'Multi-cloud architecture', '24/7 priority support', 'Dedicated account manager', 'Monthly strategy sessions', 'Advanced analytics', 'CI/CD pipeline setup'],
      popular: true,
    },
    {
      name: 'Enterprise', price: 'Custom', desc: 'Tailored solutions for large organizations with complex requirements',
      features: ['Custom security framework', 'Global infrastructure management', '24/7 white-glove support', 'Dedicated engineering team', 'Quarterly business reviews', 'SLA guarantees', 'Compliance management', 'On-site engineering'],
    },
  ];
  return (
    <section id="pricing" className="py-24 md:py-32 section-accent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">Pricing</p>
          <h2 className="section-title text-center mb-4">Plans for every scale</h2>
          <p className="text-[#6E6E73] text-center mx-auto max-w-xl mb-14">
            Transparent, value-based pricing. Every plan includes a comprehensive assessment and customized quote.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className={`pricing-card ${plan.popular ? 'pricing-featured' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0071E3] text-white text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold text-[#1D1D1F] font-sans mb-2">{plan.price}</div>
              <p className="text-xs text-[#86868B] mb-2">Custom quote after assessment</p>
              <p className="text-sm text-[#6E6E73] mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#6E6E73]">
                    <Check size={14} className="text-[#0071E3] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`block text-center py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-[#0071E3] text-white hover:shadow-lg hover:shadow-[#0071E3]/20'
                    : 'border border-[#D2D2D7] text-[#1D1D1F] hover:border-[#0071E3] hover:text-[#0071E3]'
                }`}
              >
                Get a Quote
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: 'What cybersecurity services do you offer?', a: 'We provide end-to-end cybersecurity including threat detection & response, network security, endpoint protection, cloud security, identity management, and compliance auditing. Every solution is tailored to your organization\'s specific risk profile.' },
    { q: 'How long does a cloud migration typically take?', a: 'Timeline depends on complexity. A standard migration takes 4-8 weeks for assessment and planning, followed by 8-16 weeks for phased execution. We ensure zero downtime throughout the process.' },
    { q: 'Do you work with startups or only enterprises?', a: 'We work with organizations of all sizes. Our Starter plan is designed for growing businesses, while Professional and Enterprise tiers serve established companies and large organizations.' },
    { q: 'What makes Core Tech Systems different?', a: 'We combine global enterprise expertise with deep understanding of the African business context. Our team has held senior roles at AWS, CrowdStrike, and Google — now focused on African enterprise transformation.' },
    { q: 'Do you still sell laptops and consumer tech?', a: 'Yes! Our Shop section features premium laptops, phones, gaming systems, and accessories. We also offer repairs and support for consumer devices.' },
    { q: 'How do I get started?', a: 'Book a free consultation through our contact form or WhatsApp. We\'ll assess your needs, provide recommendations, and deliver a customized proposal within 48 hours.' },
  ];
  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <p className="section-label text-center">FAQ</p>
          <h2 className="section-title text-center mb-14">Frequently asked questions</h2>
        </motion.div>
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
              <ChevronDown size={16} className={`text-[#86868B] shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <div className="accordion-content" style={{ maxHeight: open === i ? '200px' : '0' }}>
              <div className="accordion-panel">{faq.a}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ───
function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <section id="contact" className="py-24 md:py-32 section-accent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
            hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
          }}>
            <motion.p variants={fadeUp} className="section-label">Contact Us</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-6">
              Let&apos;s build something extraordinary
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[#6E6E73] leading-relaxed mb-10">
              Tell us about your project. We&apos;ll respond within 24 hours with a comprehensive assessment and proposal.
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
                    <div className="w-9 h-9 rounded-xl bg-[#0071E3]/5 flex items-center justify-center">
                      <Icon size={16} className="text-[#0071E3]" />
                    </div>
                    <span className="text-sm text-[#6E6E73]">{c.label}</span>
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
              <input type="text" placeholder="Company name" className="input-premium w-full" />
              <select className="input-premium w-full text-[#86868B]">
                <option value="">Select service interest</option>
                <option>Cybersecurity</option>
                <option>Cloud Infrastructure</option>
                <option>AI & Machine Learning</option>
                <option>Software Development</option>
                <option>Consumer Tech / Shop</option>
              </select>
              <textarea
                placeholder="Tell us about your project"
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

// ─── CTA ───
function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#1D1D1F] text-white overflow-hidden relative">
      <div className="hero-orb" style={{ top: '50%', right: '-10%', transform: 'translateY(-50%)', background: 'radial-gradient(circle, rgba(0,113,227,0.15), transparent 60%)' }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={{
          hidden: {}, visible: { transition: { staggerChildren: 0.1 } }
        }}>
          <motion.p variants={fadeUp} className="section-label text-[#2997FF]">Get Started</motion.p>
          <motion.h2 variants={fadeUp} className="section-title text-white mb-6">
            Ready to transform your technology?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[#86868B] leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute consultation with our team. No obligation, just expert advice tailored to your needs.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0071E3] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#0071E3]/20 transition-all">
              Schedule a Call <ArrowRight size={16} />
            </Link>
            <Link href="/laptops" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#424245] text-[#A1A1A6] text-sm font-medium hover:border-white hover:text-white transition-all">
              Browse Shop
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── EXPORT ───
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Mission />
      <Services />
      <TechStack />
      <Features />
      <CaseStudies />
      <Testimonials />
      <AboutSection />
      <Pricing />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}
