'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, MessageCircle, ChevronRight, Cpu, HardDrive, Monitor, Package, Shield, Clock, Smartphone, Gamepad2, Zap } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { getBrand, getUsageType, getProductsByCategory, getAspectRatio } from '@/app/products/data';

const ease = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '263780579633';

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!product) return null;

  const brand = getBrand(product);
  const usageType = getUsageType(product);
  const aspectRatio = getAspectRatio(product);
  const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [];

  const specs = [
    { label: 'Processor', value: product.processor },
    { label: 'Storage', value: product.storage },
    { label: 'Display', value: product.display },
    { label: 'RAM', value: product.features?.find(f => f.toLowerCase().includes('gb ram')) || product.features?.find(f => f.toLowerCase().includes('ram')) || '' },
    { label: 'Graphics', value: product.features?.find(f => f.toLowerCase().includes('gpu') || f.toLowerCase().includes('rtx') || f.toLowerCase().includes('graphics') || f.toLowerCase().includes('radeon')) || '' },
    { label: 'Condition', value: product.badge === 'NEW' ? 'Brand New' : product.badge === 'DEAL' ? 'Excellent' : product.badge === 'GAMING' ? 'Good' : 'Refurbished' },
    { label: 'Warranty', value: '1 Year Included' },
  ].filter(s => s.value && s.value !== 'N/A' && s.value !== '—' && s.value !== '');

  const performanceTags = [];
  if (usageType === 'Gaming') performanceTags.push('Gaming');
  if (product.category === 'Laptops') performanceTags.push('Portable', 'Productivity');
  if (product.category === 'Gaming') performanceTags.push('High Performance');
  if (product.category === 'Phones') performanceTags.push('Smartphone', 'Mobile');
  if (product.category === 'PCs') performanceTags.push('Desktop');
  if (product.price > 1000) performanceTags.push('Premium');
  if (product.price < 300) performanceTags.push('Budget-Friendly');
  if (product.features?.some(f => f.toLowerCase().includes('touch'))) performanceTags.push('Touchscreen');
  if (product.features?.some(f => f.toLowerCase().includes('business') || f.toLowerCase().includes('professional'))) performanceTags.push('Business');

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = `Hi Core Tech Systems, I'd like to buy:\n\nProduct: ${product.name}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, ease }}
        className="relative w-full max-w-lg max-h-[95vh] bg-white rounded-t-3xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#E5E5E5] mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <button onClick={onClose} className="ml-auto p-2 rounded-full bg-[#F5F5F5] hover:bg-[#E5E5E5] transition-colors z-10">
            <X size={16} className="text-[#86868B]" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-6 space-y-5">
          <div className="relative w-full overflow-hidden rounded-xl bg-[#F5F5F5]"
            style={{ aspectRatio: aspectRatio }}
          >
            {allImages.length > 0 ? (
              <img src={allImages[activeImage]} alt={product.name}
                className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#86868B]">
                <Monitor size={48} />
              </div>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase rounded-full bg-black text-white shadow-lg">
                {product.badge}
              </span>
            )}
            {product.originalPrice && (product.originalPrice - product.price) > 10 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-semibold tracking-wider uppercase rounded-full bg-emerald-600 text-white shadow-lg flex items-center gap-1">
                <Zap size={10} /> Save ${(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 justify-center -mt-2">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === i ? 'bg-black w-4' : 'bg-[#E5E5E5]'
                  }`} />
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#555555] font-medium border border-[#D2D2D7]">
                {product.category}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-black text-white font-medium">
                {brand}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[#555555] font-medium">
                {usageType}
              </span>
            </div>
            <h2 className="text-xl font-bold text-black leading-tight">{product.name}</h2>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-black">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-[#A1A1A6] line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className={`flex items-center gap-1.5 text-xs ${product.inStock ? 'text-green-600' : 'text-amber-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-amber-500'}`} />
              {product.inStock ? 'In Stock' : 'Low Stock'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-[#E5E5E5]'} />
            ))}
            <span className="text-xs text-[#86868B] ml-1">{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[product.processor, product.storage, product.display].filter(s => s && s !== 'N/A').map((spec, i) => (
              <span key={i} className="spec-pill whitespace-nowrap shrink-0">{spec}</span>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black flex items-center gap-2 mb-3">
              <Cpu size={14} className="text-black" /> Specifications
            </h3>
            <div className="rounded-xl overflow-hidden border border-[#D2D2D7]">
              {specs.map((spec, i) => (
                <div key={spec.label} className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? 'bg-[#F5F5F7]' : 'bg-white'}`}>
                  <span className="text-xs text-[#86868B]">{spec.label}</span>
                  <span className="text-xs text-black font-medium text-right max-w-[60%]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-black">About This Device</h3>
            <p className="text-xs text-[#86868B] leading-relaxed">{product.description}</p>
          </div>

          {performanceTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {performanceTags.map((tag, i) => (
                <span key={i} className="badge-light text-[9px]">{tag}</span>
              ))}
            </div>
          )}

          <div className="space-y-2.5 pt-1">
            <button onClick={handleAdd}
              disabled={!product.inStock}
              className="btn-primary w-full py-3.5 text-xs font-semibold tracking-wider justify-center disabled:opacity-30 disabled:cursor-not-allowed">
              <ShoppingBag size={15} /> {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button onClick={handleWhatsApp}
              className="btn-whatsapp w-full py-3.5 text-xs font-semibold tracking-wider justify-center">
              <MessageCircle size={15} /> Inquire on WhatsApp
            </button>
            <button onClick={onClose}
              className="btn-outline w-full py-3 text-xs font-semibold tracking-wider justify-center">
              Close
            </button>
          </div>

          {related.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#D2D2D7]">
              <h3 className="text-sm font-semibold text-black">You Might Also Like</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {related.map(p => (
                  <button key={p.id} onClick={() => { onClose(); setTimeout(() => window.__openProductModal?.(p), 100); }}
                    className="w-32 flex-shrink-0 group text-left">
                    <div className="aspect-[4/3] rounded-lg bg-[#F5F5F5] overflow-hidden mb-2">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#86868B]">
                          <Monitor size={20} />
                        </div>
                      )}
                    </div>
                    <h4 className="text-[11px] text-[#6E6E73] font-medium leading-snug line-clamp-2">{p.name}</h4>
                    <span className="text-xs text-black font-semibold">${p.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
