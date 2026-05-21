'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import ProductModal from '@/app/components/ProductModal';

export default function CartPage() {
  const { items, updateQty, removeItem, totalItems, totalPrice, clearCart } = useCart();
  const [cleared, setCleared] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCheckout = () => {
    const msg = items.map(i => `${i.name} x${i.qty} — $${(i.price * i.qty).toLocaleString()}`).join('\n');
    const total = `\n\nTotal: $${totalPrice.toLocaleString()}\n\nHi Tech Store, I'd like to order the items above. Please confirm availability and payment options.`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(msg + total)}`, '_blank');
  };

  const handleClear = () => {
    clearCart();
    setCleared(true);
  };

  return (
    <main className="min-h-screen bg-[#0A1224] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-[11px] text-white/40 hover:text-white/70 transition-colors mb-3">
              <ArrowLeft size={14} /> Back to Store
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#F1F5F9]">Shopping Cart</h1>
          </div>
          {items.length > 0 && (
            <button onClick={handleClear} className="text-[10px] text-white/30 hover:text-red-400 transition-colors uppercase tracking-wider">
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/40 text-sm mb-1">{cleared ? 'Cart cleared' : 'Your cart is empty'}</p>
            <p className="text-white/20 text-xs mb-6">Add some premium devices to get started.</p>
            <Link href="/" className="btn-premium btn-premium--primary text-[10px] inline-flex">Continue Shopping</Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 sm:p-6 flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center text-white/20 text-[9px] bg-white/[0.02] shrink-0">
                  {item.name.split(' ').slice(0, 2).join(' ')}
                </div>

                <div className="flex-1 min-w-0">
                  <div onClick={() => setSelectedProduct(item)} className="cursor-pointer">
                    <h3 className="text-sm font-medium text-white/80 hover:text-white transition-colors truncate">{item.name}</h3>
                  </div>
                  <p className="text-[11px] text-white/30 mt-0.5">${item.price.toLocaleString()} each</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-0.5 text-white/30 hover:text-white transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-medium text-white w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-0.5 text-white/30 hover:text-white transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-white w-20 text-right">${(item.price * item.qty).toLocaleString()}</p>
                  <button onClick={() => removeItem(item.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 sm:p-8 mt-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Total</p>
                  <p className="text-3xl font-bold text-[#F1F5F9]">${totalPrice.toLocaleString()}</p>
                  <p className="text-xs text-white/30 mt-1">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={handleCheckout}
                  className="w-full sm:w-auto btn-premium btn-premium--primary text-xs py-4 px-8">
                  Checkout via WhatsApp <ArrowRight size={14} />
                </button>
              </div>

              <div className="border-t border-white/[0.04] pt-4">
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/20">
                  <span>We accept:</span>
                  <span className="px-2 py-1 rounded border border-white/10 text-white/30">EcoCash</span>
                  <span className="px-2 py-1 rounded border border-white/10 text-white/30">Innbucks</span>
                  <span className="px-2 py-1 rounded border border-white/10 text-white/30">Visa</span>
                  <span className="px-2 py-1 rounded border border-white/10 text-white/30">Mastercard</span>
                  <span className="px-2 py-1 rounded border border-white/10 text-white/30">ZIPIT</span>
                </div>
                <p className="text-[10px] text-white/10 mt-3">Free delivery within Harare. Nationwide shipping across Zimbabwe.</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
