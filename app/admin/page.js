'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, LogOut, Package, Search, AlertCircle, X } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      if (!res.ok) {
        router.push('/admin/login');
        return;
      }
      setAuthChecked(true);
      loadProducts();
    } catch {
      router.push('/admin/login');
    }
  };

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

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
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

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex items-center justify-center">
        <div className="text-[#6B7080] text-sm">Checking authentication...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#1E293B]">Control Tower</h1>
            <p className="text-sm text-[#6B7080] mt-0.5">Manage your product catalog</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/products/new"
              className="bg-[#2563EB] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[#1D4ED8] transition-colors flex items-center gap-2">
              <Plus size={16} /> Add Product
            </Link>
            <button onClick={handleLogout}
              className="text-[#6B7080] hover:text-[#EF4444] transition-colors p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-[#E2E8F0]">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 px-4 py-3 rounded-xl flex items-center gap-2 text-sm ${
            notification.type === 'error'
              ? 'bg-red-50 text-red-600 border border-red-100'
              : 'bg-green-50 text-green-600 border border-green-100'
          }`}>
            <AlertCircle size={16} />
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-auto"><X size={14} /></button>
          </div>
        )}

        {/* Search & Stats */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
          </div>
          <div className="flex items-center gap-3 text-sm text-[#6B7080]">
            <span className="bg-white rounded-xl px-3.5 py-2 border border-[#E2E8F0]">
              <span className="font-medium text-[#1E293B]">{products.length}</span> total
            </span>
            <span className="bg-white rounded-xl px-3.5 py-2 border border-[#E2E8F0]">
              <span className="font-medium text-[#1E293B]">{filteredProducts.length}</span> shown
            </span>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#6B7080] text-sm">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-[#6B7080] text-sm">
              <Package size={40} className="mx-auto mb-3 text-[#CBD5E1]" />
              {search ? 'No products match your search' : 'No products yet. Add your first product!'}
            </div>
          ) : (
            <div className="overflow-x-auto">
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
          )}
        </div>

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
    </main>
  );
}
