'use client';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/sections/HeroSection';
import ServicesSection from '@/app/components/sections/ServicesSection';
import PortfolioSection from '@/app/components/sections/PortfolioSection';
import ProcessSection from '@/app/components/sections/ProcessSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import CTASection from '@/app/components/sections/CTASection';

export default function Home() {
  return (
    <>
      {/* Ambient background effects */}
      <div className="ambient-container" aria-hidden="true">
        <div className="ambient-orb ambient-orb--gold" />
        <div className="ambient-orb ambient-orb--green" />
        <div className="ambient-orb ambient-orb--red" />
        <div className="ambient-noise" />
        <div className="grid-overlay" />
      </div>

      <HeroSection />
      <div className="section-divider" />
      <ServicesSection />
      <div className="section-divider" />
      <PortfolioSection />
      <div className="section-divider" />
      <ProcessSection />
      <div className="section-divider" />
      <TestimonialsSection />
      <div className="section-divider" />
      <CTASection />
    </>
  );
}
