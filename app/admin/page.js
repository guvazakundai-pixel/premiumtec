'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Package, Search, AlertCircle, X, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.slug?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0);
  const inStockCount = products.filter(p => p.inStock).length;

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white mb-6 shadow-sm">
        <h1 className="text-xl font-bold mb-1">Control Tower</h1>
        <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
          Welcome back, Administrator. Manage your product catalog — add, edit, or remove items in real-time.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
              <Package size={20} className="text-[#2563EB]" />
            </div>
            <div>
              <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">Total Products</p>
              <p className="text-2xl font-bold text-[#1E293B]">{products.length}</p>
            </div>
          </div>
          <div className="text-xs text-[#6B7080]">
            <span className="text-green-600 font-medium">{inStockCount}</span> in stock · <span className="text-red-500 font-medium">{products.length - inStockCount}</span> low stock
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">Inventory Value</p>
              <p className="text-2xl font-bold text-[#1E293B]">${totalValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-xs text-[#6B7080]">
            Across {products.length} products
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
              <TrendingUp size={20} className="text-[#2563EB]" />
            </div>
            <div>
              <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider">Categories</p>
              <p className="text-2xl font-bold text-[#1E293B]">{new Set(products.map(p => p.category)).size}</p>
            </div>
          </div>
          <div className="text-xs text-[#6B7080]">
            <span className="font-medium">{['Laptops', 'PCs', 'Gaming', 'Phones', 'Accessories'].filter(c => products.some(p => p.category === c)).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 px-4 py-3 rounded-xl flex items-center gap-2 text-sm ${
          notification.type === 'error'
            ? 'bg-red-50 text-red-600 border border-red-100'
            : 'bg-green-50 text-green-600 border border-green-100'
        }`}>
          <AlertCircle size={16} />
          {notification.message}
          <button onClick={() => setNotification(null)} className="ml-auto"><X size={14} /></button>
        </div>
      )}

      {/* Products Section Header */}
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
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center text-[#6B7080] text-sm">
          <Package size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
          {search ? 'No products match your search' : 'No products yet. Add your first product!'}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="text-left px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Stock</th>
                  <th className="text-left px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Badge</th>
                  <th className="text-right px-4 py-3 font-medium text-[#6B7080] text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredProducts.map((product, idx) => (
                  <tr key={product.id} className={`hover:bg-[#F8FAFC] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] overflow-hidden flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#94A3B8]"><Package size={16} /></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-[#1E293B] truncate max-w-[250px]">{product.name}</div>
                          <div className="text-[#94A3B8] text-xs truncate max-w-[200px]">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-[#F1F5F9] text-[#475569] rounded-lg px-2.5 py-1 text-xs font-medium">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1E293B]">${product.price?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                        {product.inStock ? 'In Stock' : 'Low Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {product.badge ? (
                        <span className="bg-[#FEF3C7] text-[#D97706] rounded-lg px-2.5 py-1 text-xs font-medium">{product.badge}</span>
                      ) : (
                        <span className="text-[#CBD5E1]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/products/${product.id}/edit`}
                          className="p-2 rounded-lg hover:bg-[#F1F5F9] text-[#6B7080] hover:text-[#2563EB] transition-colors">
                          <Edit2 size={15} />
                        </Link>
                        <button onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-[#6B7080] hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]"><Package size={20} /></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#1E293B] truncate">{product.name}</div>
                    <div className="text-[#94A3B8] text-xs truncate mt-0.5">{product.slug}</div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="bg-[#F1F5F9] text-[#475569] rounded-lg px-2 py-0.5 text-xs font-medium">{product.category}</span>
                      <span className="text-sm font-semibold text-[#1E293B]">${product.price?.toLocaleString()}</span>
                      <span className={`inline-flex items-center gap-1 text-xs ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                        {product.inStock ? 'In Stock' : 'Low'}
                      </span>
                      {product.badge && (
                        <span className="bg-[#FEF3C7] text-[#D97706] rounded-lg px-2 py-0.5 text-xs font-medium">{product.badge}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link href={`/admin/products/${product.id}/edit`}
                      className="p-2 rounded-lg bg-[#F1F5F9] text-[#6B7080] hover:text-[#2563EB] transition-colors">
                      <Edit2 size={15} />
                    </Link>
                    <button onClick={() => setDeleteConfirm(product.id)}
                      className="p-2 rounded-lg bg-[#F1F5F9] text-[#6B7080] hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
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
          </div>
        </div>
      )}
    </div>
  );
}
