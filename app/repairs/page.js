'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wrench, CheckCircle2, Smartphone, Laptop, Gamepad2,
  ArrowRight, Clock, ShieldCheck, Cpu, ClipboardList
} from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const popularServices = [
  {
    icon: Laptop,
    category: 'Laptops',
    services: [
      { name: 'Screen Replacement', price: 'From $60', time: '1-3 hours' },
      { name: 'SSD Speed Upgrade (256GB/512GB/1TB)', price: 'From $35', time: '1 hour' },
      { name: 'Keyboard / Trackpad Swap', price: 'From $25', time: '2-4 hours' },
      { name: 'RAM Memory Expansion', price: 'From $20', time: '30 mins' },
      { name: 'Motherboard Component Repair', price: 'From $80', time: '1-2 days' },
    ],
  },
  {
    icon: Smartphone,
    category: 'Phones',
    services: [
      { name: 'Flagship Screen Replacement', price: 'From $45', time: '1-2 hours' },
      { name: 'Battery Replacement', price: 'From $20', time: '1 hour' },
      { name: 'Charging Port Repair', price: 'From $15', time: '1 hour' },
      { name: 'Camera Lens / Glass Repair', price: 'From $25', time: '1-2 hours' },
    ],
  },
  {
    icon: Gamepad2,
    category: 'Consoles',
    services: [
      { name: 'HDMI Port Replacement', price: 'From $45', time: '2-3 hours' },
      { name: 'Deep Cleaning & Thermal Paste', price: 'From $30', time: '2 hours' },
      { name: 'Disc Drive Repairs', price: 'From $40', time: '1 day' },
      { name: 'Power Supply Repair', price: 'From $50', time: '2-4 hours' },
    ],
  },
];

const guarantees = [
  { icon: ShieldCheck, title: '90-Day Warranty', desc: 'All replacement parts and repair services are backed by a full 90-day warranty.' },
  { icon: Clock, title: 'Same-Day Service', desc: 'Most screen swaps, batteries, and upgrades are completed within 2 hours.' },
  { icon: Cpu, title: 'Premium Parts Only', desc: 'We only source certified, high-grade replacement components for ultimate reliability.' },
];

export default function RepairsPage() {
  const [formData, setFormData] = useState({
    name: '',
    deviceType: 'Laptop',
    model: '',
    issue: '',
    urgency: 'Standard (1-2 Days)',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    const { name, deviceType, model, issue, urgency } = formData;

    const formattedMessage = `Hi Core Tech Systems, I'd like to book a repair appointment:

🔧 Repair Details:
• Client Name: ${name || 'Valued Customer'}
• Device Type: ${deviceType}
• Brand & Model: ${model || 'Not Specified'}
• Issue Description: ${issue || 'Requesting general diagnostics'}
• Urgency Level: ${urgency}

Please let me know your availability and estimated diagnostics/parts quote.`;

    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(formattedMessage)}`, '_blank');
  };

  const triggerQuickBooking = (category, service) => {
    const msg = `Hi Core Tech Systems, I'd like to book a repair:
• Category: ${category}
• Service: ${service}

Please let me know when I can bring my device to Sirus Mall.`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#F0F7FF] pt-28 pb-20 text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-xs text-neutral-500 hover:text-black transition-colors">Home</Link>
          <span className="text-neutral-300">/</span>
          <span className="text-xs font-semibold text-neutral-800">Repairs</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="w-14 h-14 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center mx-auto mb-6"
          >
            <Wrench size={26} className="text-[#0071E3]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-4"
          >
            Device Repairs & Upgrades
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="text-sm sm:text-base text-[#6B7080] leading-relaxed"
          >
            Harare's premier repair service for laptops, smartphones, and gaming consoles. Complete the quick form below to book an instant WhatsApp appointment.
          </motion.p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card p-6 bg-white flex gap-4 items-start border border-[#E2E8F0] shadow-sm">
                <div className="p-3 rounded-xl bg-[#0071E3]/5 text-[#0071E3] shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#1D1D1F] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#6B7080] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Layout & Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Menu Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-[#0071E3]" /> Popular Service Catalog
            </h2>
            
            <div className="space-y-6">
              {popularServices.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-4 border-b border-[#F1F5F9] pb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0071E3]/5 text-[#0071E3] flex items-center justify-center">
                        <CatIcon size={16} />
                      </div>
                      <h3 className="font-bold text-sm text-[#1D1D1F]">{cat.category} Repairs</h3>
                    </div>
                    
                    <div className="divide-y divide-[#F1F5F9] space-y-3">
                      {cat.services.map((service, sIdx) => (
                        <div key={sIdx} className="flex items-center justify-between pt-3 first:pt-0 group">
                          <div>
                            <p className="text-xs font-semibold text-[#1D1D1F]">{service.name}</p>
                            <p className="text-[10px] text-[#94A3B8] mt-0.5">Average time: {service.time}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#0071E3]">{service.price}</span>
                            <button
                              onClick={() => triggerQuickBooking(cat.category, service.name)}
                              className="text-[9px] font-semibold tracking-wider uppercase border border-[#E2E8F0] rounded-full px-3 py-1 hover:bg-[#0071E3] hover:text-white hover:border-[#0071E3] transition-all duration-300"
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Booking Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-md">
            <h2 className="text-lg font-bold text-[#1D1D1F] mb-1">Book Repair Appointment</h2>
            <p className="text-xs text-[#6B7080] mb-6">Enter your details and send directly to our WhatsApp support line.</p>
            
            <form onSubmit={handleBookNow} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#6B7080] mb-1.5">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full input-premium bg-[#F8FAFC]"
                  required
                />
              </div>

              <div>
                <label htmlFor="deviceType" className="block text-xs font-semibold text-[#6B7080] mb-1.5">Device Category</label>
                <select
                  id="deviceType"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleInputChange}
                  className="w-full input-premium bg-[#F8FAFC] text-sm"
                >
                  <option>Laptop</option>
                  <option>Smartphone</option>
                  <option>Gaming Console</option>
                  <option>Other / Accessory</option>
                </select>
              </div>

              <div>
                <label htmlFor="model" className="block text-xs font-semibold text-[#6B7080] mb-1.5">Device Brand & Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g. HP Spectre x360 14, iPhone 15 Pro"
                  className="w-full input-premium bg-[#F8FAFC]"
                  required
                />
              </div>

              <div>
                <label htmlFor="urgency" className="block text-xs font-semibold text-[#6B7080] mb-1.5">Service Urgency</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full input-premium bg-[#F8FAFC] text-sm"
                >
                  <option>Same Day (Express)</option>
                  <option>Standard (1-2 Days)</option>
                  <option>Flexible / Budget</option>
                </select>
              </div>

              <div>
                <label htmlFor="issue" className="block text-xs font-semibold text-[#6B7080] mb-1.5">Issue Description</label>
                <textarea
                  id="issue"
                  name="issue"
                  rows={3}
                  value={formData.issue}
                  onChange={handleInputChange}
                  placeholder="e.g. Cracked screen, laptop won't turn on, liquid damage..."
                  className="w-full input-premium bg-[#F8FAFC] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary justify-center text-xs py-3.5 mt-2 font-semibold tracking-wider uppercase bg-[#25D366] hover:bg-[#20BD5A]"
              >
                Send Booking via WhatsApp <ArrowRight size={14} />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </main>
  );
}
