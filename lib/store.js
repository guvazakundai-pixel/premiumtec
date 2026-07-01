import fs from 'fs';
import path from 'path';
import { products as seedProducts } from '@/app/products/data';

const DATA_FILE = path.join(process.cwd(), 'lib', 'data', 'products.json');

function ensureDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function load() {
  try {
    ensureDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (e) {
    console.error('Error reading products.json:', e);
  }
  const data = seedProducts.map(p => ({ ...p }));
  saveAll(data);
  return data;
}

function saveAll(data) {
  ensureDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const store = {
  getAll() {
    return load();
  },

  getById(id) {
    return load().find(p => p.id === id) || null;
  },

  getBySlug(slug) {
    return load().find(p => p.slug === slug) || null;
  },

  create(product) {
    const all = load();
    const maxId = all.reduce((max, p) => Math.max(max, p.id || 0), 0);
    const baseSlug = slugify(product.name);
    let slug = baseSlug;
    let counter = 1;
    while (all.find(p => p.slug === slug)) {
      slug = `${baseSlug}-${counter++}`;
    }
    const newProduct = {
      ...product,
      id: maxId + 1,
      slug,
      originalPrice: product.originalPrice || null,
      badge: product.badge || null,
      inStock: product.inStock !== false,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
      features: product.features || [],
      image: product.image || '',
    };
    all.push(newProduct);
    saveAll(all);
    return newProduct;
  },

  update(id, updates) {
    const all = load();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const existing = all[idx];
    if (updates.name && updates.name !== existing.name) {
      const baseSlug = slugify(updates.name);
      let slug = baseSlug;
      let counter = 1;
      while (all.find((p, i) => p.slug === slug && i !== idx)) {
        slug = `${baseSlug}-${counter++}`;
      }
      updates.slug = slug;
    }
    all[idx] = { ...existing, ...updates, id };
    saveAll(all);
    return all[idx];
  },

  delete(id) {
    const all = load();
    const filtered = all.filter(p => p.id !== id);
    if (filtered.length === all.length) return false;
    saveAll(filtered);
    return true;
  },
};
