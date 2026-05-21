'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, X, SlidersHorizontal, Star, ArrowRight, Heart, ChevronDown, ShoppingBag } from 'lucide-react';
import { products as allProducts } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';

const easePrem = [0.16, 1, 0.3, 1];

export default function CategoryPage({ category }) {
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [notify, setNotify] = useState(null);
  const { addItem } = useCart();

  const products = useMemo(() => {
    return allProducts
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .filter(p => {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) ||
          p.processor.toLowerCase().includes(q) ||
          p.storage.toLowerCase().includes(q);
      })
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
  }, [category, search, priceRange]);

  const toggleWish = useCallback((id) => {
    setWishlist(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  const handleAdd = useCallback((product) => {
    addItem(product);
    setNotify(`${product.name} added to cart`);
    setTimeout(() => setNotify(null), 2000);
  }, [addItem]);

  return (
    <main className="min-h-screen bg-[#0B0F14] pt-24 pb-20">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-[14px] text-sm font-medium"
          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.2)', backdropFilter: 'blur(12px)' }}
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/" className="text-[11px] text-white/30 hover:text-white/60 transition-colors">Home</Link>
          <span className="text-white/10">/</span>
          <span className="text-[11px] text-white/60">{category}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#F5F7FA] mb-2">
          {category === 'phones' ? 'Flagship Phones' : category === 'laptops' ? 'Premium Laptops' : category}
        </h1>
        <p className="text-sm text-white/30 font-light mb-8 max-w-lg">
          {category === 'phones' ? 'The most advanced mobile devices, meticulously selected for exceptional performance and design.' : 'Professional-grade laptops engineered for creativity, productivity, and performance.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="glass-input flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input type="text" placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"><X size={14} /></button>}
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="btn-premium btn-premium--ghost text-[10px] self-start">
            <SlidersHorizontal size={13} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: easePrem }}
            >
              <div className="product-card h-full flex flex-col group relative">
                <button onClick={() => toggleWish(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#0B0F14]/60 backdrop-blur-sm border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:border-[#3B82F6]/30">
                  <Heart size={14} className={`transition-colors ${wishlist.has(product.id) ? 'text-red-400 fill-red-400' : 'text-white/40'}`} />
                </button>

                <Link href={`/products/${product.slug}`} className="h-48 flex items-center justify-center bg-gradient-to-b from-white/[0.02] to-transparent border-b border-white/[0.03] relative overflow-hidden">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: easePrem }}
                    className="transition-all duration-700 group-hover:scale-110 w-full h-full flex items-center justify-center p-4">
                    {product.id === 7 ? (
                      <img src="/images/hp-250-g5.jpg" alt={product.name}
                        className="w-full h-full object-contain rounded-xl"
                        style={{ maxWidth: '180px', maxHeight: '160px' }} />
                    ) : (
                      <div className="w-24 h-32 rounded-2xl border border-white/20 flex items-center justify-center text-white/40 text-xs bg-white/[0.02]">
                        {product.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    )}
                  </motion.div>
                  {product.badge && <span className="absolute top-3 left-3 badge-premium text-[9px]">{product.badge}</span>}
                </Link>

                <div className="flex-1 flex flex-col p-6 space-y-3">
                  <div>
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/30">{product.category}</span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-sm font-medium text-white/80 mt-1.5 leading-snug group-hover:text-white transition-colors duration-500">{product.name}</h3>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[product.processor.split(' ').slice(0, 2).join(' '), product.storage.split('/')[0].trim(), product.display.split(' ')[0]].map((spec, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/40 font-light">{spec}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-amber-400/80 fill-amber-400/80' : 'text-white/10'} />
                    ))}
                    <span className="text-[10px] text-white/30 ml-1">{product.rating}</span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2 pt-3 border-t border-white/[0.04]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-medium text-[#F5F7FA] tracking-tight">${product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-xs text-white/20 line-through">${product.originalPrice.toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-amber-400'}`} />
                      <span className={`text-[10px] ${product.inStock ? 'text-green-400/70' : 'text-amber-400/70'}`}>
                        {product.inStock ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-1">
                    <button onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="flex-1 py-3 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[100px] bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed">
                      Add to Cart
                    </button>
                    <Link href={`/products/${product.slug}`}
                      className="px-4 py-3 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-[100px] border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-500">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm">No devices found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}
