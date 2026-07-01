'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Package, Search, AlertCircle, X, DollarSign, TrendingUp, Eye, ChevronDown } from 'lucide-react';

const stagger = { visible: { transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedCat, setExpandedCat] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setProducts(prev => prev.filter(p => p.id !== id));
      showNotification('Product deleted successfully');
    } catch (err) {
      showNotification('Failed to delete product', 'error');
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const grouped = useMemo(() => {
    const map = {};
    products.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    });
    const order = ['Laptops', 'PCs', 'Gaming', 'Phones', 'Accessories', 'Displays'];
    return Object.entries(map).sort((a, b) => {
      const ia = order.indexOf(a[0]), ib = order.indexOf(b[0]);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }, [products]);

  const filtered = useMemo(() => {
    if (!search) return grouped;
    const q = search.toLowerCase();
    return grouped.map(([cat, items]) => [
      cat,
      items.filter(p => p.name?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q))
    ]).filter(([, items]) => items.length > 0);
  }, [grouped, search]);

  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const inStockCount = products.filter(p => p.inStock).length;

  return (
    <div className="p-4 sm:p-6">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white mb-6 shadow-sm">
        <h1 className="text-xl font-bold mb-1">Control Tower</h1>
        <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
          Welcome back, Administrator. Manage your product catalog — add, edit, or remove items in real-time.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: Package, label: 'Total Products', value: products.length, sub: `${inStockCount} in stock · ${products.length - inStockCount} low stock`, color: 'bg-[#EEF2FF]', iconColor: 'text-[#2563EB]' },
          { icon: DollarSign, label: 'Inventory Value', value: `$${totalValue.toLocaleString()}`, sub: `Across ${products.length} products`, color: 'bg-[#F0FDF4]', iconColor: 'text-green-600' },
          { icon: TrendingUp, label: 'Categories', value: grouped.length, sub: grouped.map(([c]) => c).join(', '), color: 'bg-[#FEF2F2]', iconColor: 'text-[#2563EB]' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.35 }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} className={stat.iconColor} />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1E293B]">{stat.value}</p>
                </div>
              </div>
              <div className="text-xs text-[#6B7080] truncate">{stat.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className={`mb-4 px-4 py-3 rounded-xl flex items-center gap-2 text-sm ${
              notification.type === 'error'
                ? 'bg-red-50 text-red-600 border border-red-100'
                : 'bg-green-50 text-green-600 border border-green-100'
            }`}>
            <AlertCircle size={16} />
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-auto"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-[#1E293B]">Product Catalog</h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
          </div>
          <Link href="/admin/products/new"
            className="bg-[#2563EB] text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm shrink-0">
            <Plus size={16} /> Add
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#6B7080] text-sm">Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#6B7080] text-sm">
          <Package size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
          {search ? 'No products match your search' : 'No products yet. Add your first product!'}
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
          {filtered.map(([category, items]) => {
            const isOpen = expandedCat === category;
            return (
              <motion.div key={category} variants={fadeUp} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
                <button onClick={() => setExpandedCat(isOpen ? null : category)}
                  className="w-full flex items-center justify-between px-5 py-3.5 bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-[#1E293B]">{category}</h3>
                    <span className="text-xs text-[#94A3B8] bg-white rounded-lg px-2 py-0.5 border border-[#E2E8F0]">{items.length} products</span>
                  </div>
                  <ChevronDown size={16} className={`text-[#94A3B8] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {items.map((product) => (
                            <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
                              <div className="group relative bg-white rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all duration-300">
                                <Link href={`/products/${product.slug}`} className="block">
                                  <div className="aspect-[4/3] bg-[#F1F5F9] overflow-hidden">
                                    {product.image ? (
                                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]"><Package size={32} /></div>
                                    )}
                                  </div>
                                  <div className="p-4">
                                    <div className="text-sm font-medium text-[#1E293B] truncate group-hover:text-[#2563EB] transition-colors">{product.name}</div>
                                    <div className="text-xs text-[#94A3B8] truncate mt-0.5">{product.slug}</div>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-base font-bold text-[#1E293B]">${product.price?.toLocaleString()}</span>
                                      {product.badge && (
                                        <span className="bg-[#FEF3C7] text-[#D97706] text-[10px] font-semibold rounded-lg px-2 py-0.5">{product.badge}</span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className={`inline-flex items-center gap-1 text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                                        {product.inStock ? 'In Stock' : 'Low'}
                                      </span>
                                      <span className="bg-[#F1F5F9] text-[#475569] text-[10px] font-medium rounded-lg px-2 py-0.5">{product.category}</span>
                                    </div>
                                  </div>
                                </Link>
                                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <Link href={`/products/${product.slug}`}
                                    className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm text-[#6B7080] hover:text-[#2563EB] hover:bg-white transition-colors">
                                    <Eye size={14} />
                                  </Link>
                                  <Link href={`/admin/products/${product.id}/edit`}
                                    className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm text-[#6B7080] hover:text-[#2563EB] hover:bg-white transition-colors">
                                    <Edit2 size={14} />
                                  </Link>
                                  <button onClick={(e) => { e.preventDefault(); setDeleteConfirm(product.id); }}
                                    className="p-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm text-[#6B7080] hover:text-red-500 hover:bg-white transition-colors">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B] text-center mb-2">Delete Product?</h3>
              <p className="text-sm text-[#6B7080] text-center mb-6">
                This action cannot be undone. The product will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} disabled={deleting}
                  className="flex-1 rounded-xl border border-[#E2E8F0] py-2.5 text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)} disabled={deleting}
                  className="flex-1 rounded-xl bg-red-500 text-white py-2.5 text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50">
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
