'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const CATEGORIES = ['Laptops', 'PCs', 'Gaming', 'Phones', 'Accessories', 'Displays'];

export default function NewProduct() {
  const [authChecked, setAuthChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState({
    name: '', slug: '', category: 'Laptops', processor: '', storage: '', display: '',
    price: '', originalPrice: '', badge: '', inStock: true, rating: '', reviews: '',
    image: '', description: '', features: [''],
  });

  useEffect(() => {
    fetch('/api/admin/check').then(res => {
      if (!res.ok) router.push('/admin/login');
      else setAuthChecked(true);
    }).catch(() => router.push('/admin/login'));
  }, [router]);

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateFeature = (idx, value) => {
    setForm(prev => {
      const features = [...prev.features];
      features[idx] = value;
      return { ...prev, features };
    });
  };

  const addFeature = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (idx) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      category: form.category,
      processor: form.processor.trim(),
      storage: form.storage.trim(),
      display: form.display.trim(),
      price: parseFloat(form.price) || 0,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      badge: form.badge.trim() || null,
      inStock: form.inStock,
      rating: parseFloat(form.rating) || 0,
      reviews: parseInt(form.reviews) || 0,
      image: form.image.trim(),
      description: form.description.trim(),
      features: form.features.map(f => f.trim()).filter(Boolean),
    };

    if (!payload.name) { setError('Product name is required'); setSaving(false); return; }
    if (payload.price <= 0) { setError('Valid price is required'); setSaving(false); return; }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create product');
      }
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [form, router]);

  if (!authChecked) {
    return <main className="min-h-screen bg-[#F0F7FF] flex items-center justify-center"><div className="text-[#6B7080] text-sm">Checking...</div></main>;
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-8">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-[#6B7080] hover:text-[#2563EB] transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-semibold text-[#1E293B] mb-8">New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 border border-red-100">{error}</div>
          )}

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5">
            <h2 className="text-sm font-semibold text-[#1E293B] uppercase tracking-wider">Basic Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#475569] mb-1">Product Name *</label>
                <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Slug (URL)</label>
                <input type="text" value={form.slug} onChange={e => updateField('slug', e.target.value)}
                  placeholder="auto-generated from name if blank"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Category</label>
                <select value={form.category} onChange={e => updateField('category', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Badge</label>
                <input type="text" value={form.badge} onChange={e => updateField('badge', e.target.value)}
                  placeholder="e.g. NEW, DEAL, GAMING"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Price (USD) *</label>
                <input type="number" step="0.01" min="0" value={form.price} onChange={e => updateField('price', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Original Price (optional)</label>
                <input type="number" step="0.01" min="0" value={form.originalPrice} onChange={e => updateField('originalPrice', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#475569] mb-1">Image URL</label>
                <input type="text" value={form.image} onChange={e => updateField('image', e.target.value)}
                  placeholder="/images/product.jpg or https://..."
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5">
            <h2 className="text-sm font-semibold text-[#1E293B] uppercase tracking-wider">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Processor</label>
                <input type="text" value={form.processor} onChange={e => updateField('processor', e.target.value)}
                  placeholder="e.g. Core i5 13th Gen"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Storage</label>
                <input type="text" value={form.storage} onChange={e => updateField('storage', e.target.value)}
                  placeholder="e.g. 512GB SSD"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Display</label>
                <input type="text" value={form.display} onChange={e => updateField('display', e.target.value)}
                  placeholder="e.g. 15.6 FHD"
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5">
            <h2 className="text-sm font-semibold text-[#1E293B] uppercase tracking-wider">Description</h2>
            <textarea value={form.description} onChange={e => updateField('description', e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none" />
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#1E293B] uppercase tracking-wider">Features</h2>
              <button type="button" onClick={addFeature}
                className="text-xs text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 font-medium">
                <Plus size={14} /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {form.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={feature} onChange={e => updateFeature(idx, e.target.value)}
                    placeholder={`Feature ${idx + 1}`}
                    className="flex-1 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(idx)}
                      className="p-2 rounded-lg hover:bg-red-50 text-[#94A3B8] hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stock & Rating */}
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5">
            <h2 className="text-sm font-semibold text-[#1E293B] uppercase tracking-wider">Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">In Stock</label>
                <select value={form.inStock} onChange={e => updateField('inStock', e.target.value === 'true')}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white">
                  <option value="true">Yes</option>
                  <option value="false">No (Low Stock)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Rating (0-5)</label>
                <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => updateField('rating', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Review Count</label>
                <input type="number" min="0" value={form.reviews} onChange={e => updateField('reviews', e.target.value)}
                  className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={saving}
              className="bg-[#2563EB] text-white rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 flex items-center gap-2">
              <Save size={16} /> {saving ? 'Saving...' : 'Save Product'}
            </button>
            <Link href="/admin" className="text-sm text-[#6B7080] hover:text-[#1E293B] transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
