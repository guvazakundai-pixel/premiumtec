'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, ShoppingBag, Check,
  Cpu, HardDrive, Monitor, Package, Shield, Clock,
  Smartphone, Gamepad2, ChevronRight
} from 'lucide-react';
import { getProductBySlug, getBrand, getUsageType, getProductsByCategory } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';
import ProductModal from '@/app/components/ProductModal';

const ease = [0.16, 1, 0.3, 1];

export default function ProductDetail({ params }) {
  const [slug, setSlug] = useState(null);
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCart();

  useState(() => {
    params.then(p => {
      setSlug(p.slug);
      setProduct(getProductBySlug(p.slug));
    });
  }, [params]);

  if (slug && !product) notFound();
  if (!product) return <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center"><div className="text-[#6B7080]">Loading...</div></div>;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = `Hi Core Tech Systems, I'd like to buy:\n\nProduct: ${product.name}\nPrice: $${product.price.toLocaleString()}\n\nPlease confirm availability and payment options.`;
    window.open(`https://wa.me/263780579633?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const brand = getBrand(product);
  const usageType = getUsageType(product);
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image ? [product.image] : [];

  const specIcon = (label) => {
    const icons = {
      'Processor': Cpu, 'Storage': HardDrive, 'Display': Monitor,
      'Condition': Package, 'Warranty': Shield, 'Battery': Clock,
      'GPU': Cpu, 'RAM': HardDrive,
    };
    const Icon = icons[label] || Monitor;
    return <Icon size={14} className="text-[#94A3B8] shrink-0" />;
  };

  const specs = [
    { label: 'Processor', value: product.processor },
    { label: 'Storage', value: product.storage },
    { label: 'Display', value: product.display },
    { label: 'RAM', value: product.features?.find(f => f.toLowerCase().includes('gb ram')) || product.features?.find(f => f.toLowerCase().includes('ram')) || '—' },
    { label: 'Condition', value: product.badge === 'NEW' ? 'Brand New' : product.badge === 'DEAL' ? 'Excellent' : 'Good' },
    { label: 'Warranty', value: '1 Year Included' },
    { label: 'Availability', value: product.inStock ? 'In Stock' : 'Low Stock', color: 'text-green-600' },
  ];

  const categoryIcon = product.category === 'Gaming' ? Gamepad2
    : product.category === 'Phones' ? Smartphone
    : product.category === 'PCs' ? Monitor
    : product.category === 'Accessories' ? Package
    : Monitor;

  return (
    <main className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link href={`/${product.category.toLowerCase()}`}
          className="inline-flex items-center gap-2 text-xs text-[#6B7080] hover:text-[#0071E3] transition-colors mb-8">
          <ArrowLeft size={14} /> Back to {product.category}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}>
            <div className="card p-6 lg:p-8 flex items-center justify-center min-h-[350px] lg:min-h-[450px] relative overflow-hidden">
              {allImages.length > 0 ? (
                <img src={allImages[activeImage]} alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110 rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 text-[#94A3B8]">
                  <Monitor size={48} />
                  <span className="text-xs text-center px-4">{product.name}</span>
                </div>
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 badge-premium text-[9px]">{product.badge}</span>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 mt-4">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      activeImage === i ? 'border-[#0071E3]' : 'border-[#E2E8F0] hover:border-[#0071E3]/50'
                    }`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {product.badge && <span className="badge-premium text-[9px]">{product.badge}</span>}
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#6B7080] flex items-center gap-1.5 shadow-sm">
                {categoryIcon({ size: 11 })} {product.category}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#6B7080] shadow-sm">
                {brand}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#6B7080] shadow-sm">
                {usageType}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F] mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-[#FF9F0A] fill-[#FF9F0A]' : 'text-[#E2E8F0]'} />
              ))}
              <span className="text-xs text-[#94A3B8]">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#1D1D1F]">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#94A3B8] line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-sm text-[#6B7080] leading-relaxed mb-8">{product.description}</p>

            <div className="card p-5 mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-4 flex items-center gap-2">
                <Monitor size={12} /> Specifications
              </h3>
              <div className="divide-y divide-[#E2E8F0]">
                {specs.map(spec => (
                  <div key={spec.label} className="flex items-center gap-3 py-3">
                    {specIcon(spec.label)}
                    <span className="text-xs text-[#94A3B8] w-24 shrink-0">{spec.label}</span>
                    <span className={`text-xs font-medium ${spec.color || 'text-[#1D1D1F]'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[#6B7080]">
                  <Check size={12} className="text-[#0071E3] shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAdd} disabled={!product.inStock}
                className="flex-1 py-4 text-xs font-semibold tracking-[0.15em] uppercase rounded-full bg-[#0071E3] text-white hover:bg-[#1D4ED8] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <ShoppingBag size={16} /> {added ? 'Added!' : 'Add to Cart'}
              </button>
              <button onClick={handleWhatsApp}
                className="py-4 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border border-[#E2E8F0] text-[#6B7080] hover:text-[#0071E3] hover:border-[#0071E3]/30 transition-all duration-500 flex items-center justify-center gap-2 bg-white">
                Buy via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Related Products</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <div key={p.id} onClick={() => setSelectedProduct(p)} className="group cursor-pointer">
                  <div className="card p-4 h-full flex flex-col">
                    <div className="h-36 flex items-center justify-center mb-3 bg-gradient-to-b from-[#F8FAFC] to-white rounded-xl overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                      ) : (
                        <Monitor size={28} className="text-[#94A3B8]" />
                      )}
                    </div>
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#94A3B8]">{p.category}</span>
                    <h4 className="text-xs font-medium text-[#1D1D1F] mt-1 leading-snug group-hover:text-[#0071E3] transition-colors">{p.name}</h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E2E8F0]">
                      <span className="text-sm font-semibold text-[#1D1D1F]">${p.price.toLocaleString()}</span>
                      <ChevronRight size={12} className="text-[#94A3B8] group-hover:text-[#0071E3] transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
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
