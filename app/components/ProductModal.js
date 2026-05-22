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
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, ease }}
        className="relative w-full max-w-lg max-h-[95vh] bg-zinc-900 rounded-t-3xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-600 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <button onClick={onClose} className="ml-auto p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors z-10">
            <X size={16} className="text-zinc-400" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 pb-6 space-y-5">
          {/* Image - object-contain so full product visible */}
          <div className="relative w-full overflow-hidden rounded-xl bg-zinc-800"
            style={{ aspectRatio: aspectRatio }}
          >
            {allImages.length > 0 ? (
              <img src={allImages[activeImage]} alt={product.name}
                className="w-full h-full object-contain p-4" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <Monitor size={48} />
              </div>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] uppercase rounded-full bg-blue-600 text-white shadow-lg">
                {product.badge}
              </span>
            )}
            {product.originalPrice && (product.originalPrice - product.price) > 10 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-semibold tracking-[0.15em] uppercase rounded-full bg-emerald-600 text-white shadow-lg flex items-center gap-1">
                <Zap size={10} /> Save ${(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Gallery dots */}
          {allImages.length > 1 && (
            <div className="flex gap-2 justify-center -mt-2">
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeImage === i ? 'bg-blue-500 w-4' : 'bg-zinc-600'
                  }`} />
              ))}
            </div>
          )}

          {/* Product name + badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-medium border border-zinc-700">
                {product.category}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 font-medium">
                {brand}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 font-medium">
                {usageType}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">{product.name}</h2>
          </div>

          {/* Price + Stock */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-zinc-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <span className={`flex items-center gap-1.5 text-xs ${product.inStock ? 'text-emerald-400' : 'text-amber-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {product.inStock ? 'In Stock' : 'Low Stock'}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'} />
            ))}
            <span className="text-xs text-zinc-400 ml-1">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Spec chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {[product.processor, product.storage, product.display].filter(s => s && s !== 'N/A').map((spec, i) => (
              <span key={i} className="whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 font-medium border border-zinc-700 shrink-0">
                {spec}
              </span>
            ))}
          </div>

          {/* Full Specs Grid - flat alternating rows like a table */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2 mb-3">
              <Cpu size={14} className="text-blue-400" /> Specifications
            </h3>
            <div className="rounded-xl overflow-hidden border border-zinc-700">
              {specs.map((spec, i) => (
                <div key={spec.label} className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-900'}`}>
                  <span className="text-xs text-zinc-400">{spec.label}</span>
                  <span className="text-xs text-zinc-200 font-medium text-right max-w-[60%]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-zinc-300">About This Device</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">{product.description}</p>
          </div>

          {/* Performance Tags */}
          {performanceTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {performanceTags.map((tag, i) => (
                <span key={i} className="text-[9px] px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-medium border border-zinc-700">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button onClick={handleAdd}
              disabled={!product.inStock}
              className="w-full py-3.5 text-xs font-semibold tracking-[0.15em] uppercase rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <ShoppingBag size={15} /> {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button onClick={handleWhatsApp}
              className="w-full py-3.5 text-xs font-semibold tracking-[0.15em] uppercase rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-300 flex items-center justify-center gap-2">
              <MessageCircle size={15} /> Inquire on WhatsApp
            </button>
            <button onClick={onClose}
              className="w-full py-3 text-xs font-semibold tracking-[0.15em] uppercase rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300">
              Close
            </button>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-300">You Might Also Like</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {related.map(p => (
                  <button key={p.id} onClick={() => { onClose(); setTimeout(() => window.__openProductModal?.(p), 100); }}
                    className="w-32 flex-shrink-0 group text-left">
                    <div className="aspect-[4/3] rounded-lg bg-zinc-800 overflow-hidden mb-2">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <Monitor size={20} />
                        </div>
                      )}
                    </div>
                    <h4 className="text-[11px] text-zinc-300 font-medium leading-snug line-clamp-2">{p.name}</h4>
                    <span className="text-xs text-white font-semibold">${p.price.toLocaleString()}</span>
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
