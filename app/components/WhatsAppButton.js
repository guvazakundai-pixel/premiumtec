'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '263780579633';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const handleChat = (msg) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-72">
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl"
            style={{ background: 'rgba(10,18,36,0.96)', backdropFilter: 'blur(60px)' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">WhatsApp</p>
                  <p className="text-[10px] text-white/40">Typically replies within 1 hour</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-white/30 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <button onClick={() => handleChat("Hi Core Tech Systems, I'd like to inquire about your latest laptops.")}
                className="w-full text-left text-xs text-white/70 hover:text-white py-2.5 px-3 transition-colors rounded-xl hover:bg-white/[0.04]">
                💻 Inquire about laptops
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I'd like to inquire about gaming setups.")}
                className="w-full text-left text-xs text-white/70 hover:text-white py-2.5 px-3 transition-colors rounded-xl hover:bg-white/[0.04]">
                🎮 Gaming setups
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I need a repair/service for my device.")}
                className="w-full text-left text-xs text-white/70 hover:text-white py-2.5 px-3 transition-colors rounded-xl hover:bg-white/[0.04]">
                🔧 Repairs & service
              </button>
              <button onClick={() => handleChat("Hi Core Tech Systems, I have a general question.")}
                className="w-full text-left text-xs text-white/70 hover:text-white py-2.5 px-3 transition-colors rounded-xl hover:bg-white/[0.04]">
                ❓ General inquiry
              </button>
            </div>
            <div className="px-4 pb-4">
              <p className="text-[10px] text-white/20 text-center border-t border-white/[0.04] pt-3">
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
