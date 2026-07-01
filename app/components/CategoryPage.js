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
  const [allProductsList, setAllProductsList] = useState(allProducts);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAllProductsList(data);
        }
      })
      .catch(err => console.error('Failed to fetch dynamic products:', err));
  }, []);

  useEffect(() => {
    window.__openProductModal = setSelectedProduct;
    return () => { delete window.__openProductModal; };
  }, []);

  const products = useMemo(() => {
    return allProductsList
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
    <main className="min-h-screen bg-[#F0F7FF] pt-28 pb-20">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white bg-[#1E293B] shadow-lg"
        >
          {notify}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/" className="text-xs text-[#6B7080] hover:text-[#0071E3] transition-colors">Home</Link>
          <span className="text-[#9CA3AF]">/</span>
          <span className="text-xs text-[#1D1D1F]">{pageTitle}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-2">{pageTitle}</h1>
        <p className="text-sm text-[#6B7080] mb-8 max-w-lg">{pageDesc}</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="input-premium flex-1 max-w-md flex items-center">
            <Search className="ml-4 text-[#9CA3AF] shrink-0" size={16} />
            <input type="text" placeholder="Search devices..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-3 bg-transparent text-[#1D1D1F] text-sm placeholder:text-[#9CA3AF] focus:outline-none" />
            {search && <button onClick={() => setSearch('')} className="mr-3 text-[#9CA3AF] hover:text-[#1D1D1F]"><X size={14} /></button>}
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
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 border border-[#E2E8F0] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-[#0071E3]/30 shadow-sm">
                  <Heart size={14} className={`transition-colors ${wishlist.has(product.id) ? 'text-[#E11D48] fill-[#E11D48]' : 'text-[#94A3B8]'}`} />
                </button>

                <div onClick={() => setSelectedProduct(product)} className="h-48 relative overflow-hidden cursor-pointer bg-white">
                  {product.image ? (
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#94A3B8] text-xs bg-[#F8FAFC]">
                      {product.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                  )}
                  {product.badge && <span className="absolute top-3 left-3 badge-premium text-[9px]">{product.badge}</span>}
                </div>

                <div className="flex-1 flex flex-col p-5 space-y-2.5">
                  <div>
                    <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#94A3B8]">{product.category}</span>
                    <div onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                      <h3 className="text-sm font-medium text-[#1D1D1F] mt-1 leading-snug group-hover:text-[#0071E3] transition-colors duration-300">{product.name}</h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {getKeySpecs(product).slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-[#E2E8F0] text-[#6B7080] font-light bg-[#F8FAFC]">{spec}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-[#FF9F0A] fill-[#FF9F0A]' : 'text-[#E2E8F0]'} />
                    ))}
                    <span className="text-[10px] text-[#94A3B8] ml-1">{product.rating}</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-2.5 border-t border-[#E2E8F0]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-semibold text-[#1D1D1F] tracking-tight">${product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-xs text-[#94A3B8] line-through">${product.originalPrice.toLocaleString()}</span>}
                      {getSavings(product) > 10 && <span className="text-[9px] text-[#10B981] font-medium">Save ${getSavings(product)}</span>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                      <span className={`text-[10px] ${product.inStock ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                        {product.inStock ? 'In Stock' : 'Low Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button onClick={() => handleAdd(product)}
                      disabled={!product.inStock}
                      className="flex-1 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full bg-[#0071E3] text-white hover:bg-[#1D4ED8] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed">
                      Add to Cart
                    </button>
                    <button onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2.5 text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full border border-[#E2E8F0] text-[#6B7080] hover:text-[#0071E3] hover:border-[#0071E3]/30 transition-all duration-500 bg-white">
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
            <p className="text-[#6B7080] text-sm">No devices found matching your criteria.</p>
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
