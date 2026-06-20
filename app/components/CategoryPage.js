'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, X, SlidersHorizontal, Star, ArrowRight, Heart, ChevronDown, ShoppingBag } from 'lucide-react';
import { products as allProducts } from '@/app/products/data';
import { useCart } from '@/app/context/CartContext';
import ProductModal from '@/app/components/ProductModal';

const ease = [0.16, 1, 0.3, 1];

function getKeySpecs(product) {
  const specs = [];
  if (product.processor && product.processor !== 'N/A') specs.push(product.processor);
  if (product.storage && product.storage !== 'N/A') specs.push(product.storage);
  if (product.display && product.display !== 'N/A') specs.push(product.display);
  const ramFeature = product.features?.find(f => f.toLowerCase().includes('gb ram') || f.toLowerCase().includes('gb ddr'));
  if (ramFeature && !specs.some(s => s.toLowerCase().includes('gb ram') || s.toLowerCase().includes('gb ddr'))) specs.push(ramFeature);
  return specs.slice(0, 4);
}

function getSavings(product) {
  if (!product.originalPrice || product.originalPrice <= product.price) return 0;
  return product.originalPrice - product.price;
}

export default function CategoryPage({ category, title, description }) {
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [notify, setNotify] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    window.__openProductModal = setSelectedProduct;
    return () => { delete window.__openProductModal; };
  }, []);

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

  const pageTitle = title || (category === 'phones' ? 'Phones' : category === 'laptops' ? 'Laptops' : category === 'gaming' ? 'Gaming' : 'Accessories');
  const pageDesc = description || (category === 'phones' ? 'Flagship mobile technology — iPhone, Samsung, and Nothing.' :
    category === 'laptops' ? 'Premium & budget laptops — MacBook, Dell, HP, and more.' :
    category === 'gaming' ? 'Consoles, desktops, monitors, and gaming gear.' :
    'Printers, chargers, keyboards, and repair services.');

  return (
    <main className="min-h-screen bg-[#121316] pt-24 pb-20">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#1C1E24] border border-white/10 shadow-lg"
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/" className="text-xs text-neutral-400 hover:text-white transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-xs text-white/80">{pageTitle}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">{pageTitle}</h1>
        <p className="text-sm text-neutral-400 mb-8 max-w-lg">{pageDesc}</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="glass-input flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input type="text" placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-transparent text-white text-sm placeholder:text-neutral-500 focus:outline-none" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"><X size={14} /></button>}
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="btn-outline text-xs self-start">
            <SlidersHorizontal size={13} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease }}
            >
              <div className="card h-full flex flex-col group relative">
                <button onClick={() => toggleWish(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/30">
                  <Heart size={14} className={`transition-colors ${wishlist.has(product.id) ? 'text-neutral-400 fill-neutral-400' : 'text-neutral-500'}`} />
                </button>

                <div onClick={() => setSelectedProduct(product)} className="h-48 flex items-center justify-center bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden cursor-pointer">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, ease }}
                    className="transition-all duration-700 group-hover:scale-110 w-full h-full flex items-center justify-center p-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-contain rounded-xl"
                        style={{ maxWidth: '170px', maxHeight: '150px' }} />
                    ) : (
                      <div className="w-24 h-32 rounded-xl border border-white/10 flex items-center justify-center text-neutral-500 text-xs bg-white/[0.02]">
                        {product.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    )}
                  </motion.div>
                  {product.badge && <span className="absolute top-3 left-3 badge-premium text-[9px]">{product.badge}</span>}
                </div>

                <div className="flex-1 flex flex-col p-5 space-y-2.5">
                  <div>
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-neutral-500">{product.category}</span>
                    <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                      <h3 className="text-sm font-medium text-white/80 mt-1 leading-snug group-hover:text-white transition-colors duration-300">{product.name}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getKeySpecs(product).slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-white/[0.06] text-neutral-400 font-light">{spec}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-neutral-500 fill-neutral-500' : 'text-white/10'} />
                    ))}
                    <span className="text-[10px] text-neutral-500 ml-1">{product.rating}</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2.5 border-t border-white/10">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-semibold text-white tracking-tight">${product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-xs text-neutral-500 line-through">${product.originalPrice.toLocaleString()}</span>}
                      {getSavings(product) > 10 && <span className="text-[9px] text-neutral-400 font-medium">Save ${getSavings(product)}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-neutral-400' : 'bg-neutral-500'}`} />
                      <span className={`text-[10px] ${product.inStock ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {product.inStock ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="flex-1 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full bg-[#00D2FF] text-[#121316] hover:bg-[#00E5FF] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed">
                      Add to Cart
                    </button>
                    <button onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-500">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-sm">No devices found matching your criteria.</p>
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
