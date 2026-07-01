'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '263780579633';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith('/admin')) return null;

  const handleChat = (msg) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-72">
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl bg-white">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle size={16} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1D1D1F]">WhatsApp</p>
                  <p className="text-[10px] text-[#94A3B8]">Typically replies within 1 hour</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-[#94A3B8] hover:text-[#1D1D1F] transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <button onClick={() => handleChat("Hi Core Tech Systems, I'd like to inquire about your latest laptops.")}
                className="w-full text-left text-xs text-[#6B7080] hover:text-[#1D1D1F] hover:bg-[#F8FAFC] py-2.5 px-3 transition-colors rounded-xl">
                💻 Inquire about laptops
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I'd like to inquire about gaming setups.")}
                className="w-full text-left text-xs text-[#6B7080] hover:text-[#1D1D1F] hover:bg-[#F8FAFC] py-2.5 px-3 transition-colors rounded-xl">
                🎮 Gaming setups
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I need a repair/service for my device.")}
                className="w-full text-left text-xs text-[#6B7080] hover:text-[#1D1D1F] hover:bg-[#F8FAFC] py-2.5 px-3 transition-colors rounded-xl">
                🔧 Repairs & service
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I have a general question.")}
                className="w-full text-left text-xs text-[#6B7080] hover:text-[#1D1D1F] hover:bg-[#F8FAFC] py-2.5 px-3 transition-colors rounded-xl">
                ❓ General inquiry
              </button>
            </div>
            <div className="px-4 pb-4">
              <p className="text-[10px] text-[#94A3B8] text-center border-t border-[#E2E8F0] pt-3">
                Mon — Sat: 08:30 – 17:00
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_24px_rgba(37,211,102,0.35)] flex items-center justify-center hover:bg-[#20BD5A] transition-all duration-500 active:scale-95 hover:scale-110"
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
