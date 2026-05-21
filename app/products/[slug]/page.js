'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Check, Share2 } from 'lucide-react';
import { getProductBySlug, products } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';

export default function ProductDetail({ params }) {
  const [slug, setSlug] = useState(null);
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  // Unwrap params
  useState(() => {
    params.then(p => {
      setSlug(p.slug);
      setProduct(getProductBySlug(p.slug));
    });
  }, [params]);

  if (slug && !product) notFound();
  if (!product) return <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center"><div className="text-white/40">Loading...</div></div>;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = `Hi PremiumTec, I'd like to buy:\n\nProduct: ${product.name}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability and payment options.`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link href={`/${product.category.toLowerCase()}`} className="inline-flex items-center gap-2 text-[11px] text-white/40 hover:text-white/70 transition-colors mb-8">
          <ArrowLeft size={14} /> Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
            className="product-card h-80 lg:h-96 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent p-8">
            {product.image ? (
              <img src={product.image} alt={product.name}
                className="w-full h-full object-contain rounded-2xl"
                style={{ maxWidth: '300px', maxHeight: '300px' }} />
            ) : (
              <div className="w-40 h-52 rounded-2xl border border-white/10 flex items-center justify-center text-white/20 bg-white/[0.02]">
                <span className="text-xs text-center px-4">{product.name}</span>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}>
            {product.badge && <span className="badge-premium text-[9px] mb-4 inline-block">{product.badge}</span>}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[#F5F7FA] mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />))}
              <span className="text-xs text-white/40">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#F5F7FA]">${product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-lg text-white/20 line-through">${product.originalPrice.toLocaleString()}</span>}
            </div>

            <p className="text-sm text-white/40 font-light leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-3 mb-6">
              {[
                { label: 'Processor', value: product.processor },
                { label: 'Storage', value: product.storage },
                { label: 'Display', value: product.display },
                { label: 'Availability', value: product.inStock ? 'In Stock' : 'Low Stock', color: product.inStock ? 'text-green-400' : 'text-amber-400' },
              ].map(spec => (
                <div key={spec.label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                  <span className="text-xs text-white/30">{spec.label}</span>
                  <span className={`text-xs font-medium ${spec.color || 'text-white/70'}`}>{spec.value}</span>
                </div>
              ))}
            </div>

            <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Key Features</h3>
            <ul className="space-y-2 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                  <Check size={12} className="text-[#3B82F6] shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAdd} disabled={!product.inStock}
                className="flex-1 py-4 text-xs font-semibold tracking-[0.15em] uppercase rounded-[100px] bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> {added ? 'Added!' : 'Add to Cart'}
              </button>
              <button onClick={handleWhatsApp}
                className="py-4 text-xs font-semibold tracking-[0.15em] uppercase rounded-[100px] border border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20 transition-all duration-500 flex items-center justify-center gap-2">
                Buy via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
