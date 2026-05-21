export const products = [
  {
    id: 1, name: 'iPhone 16 Pro Max', category: 'Phones',
    slug: 'iphone-16-pro-max',
    processor: 'A18 Pro', storage: '256GB / 512GB / 1TB',
    display: '6.9" OLED 120Hz', price: 1599, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9, reviews: 24,
    description: 'The most advanced iPhone ever. Built for Apple Intelligence with A18 Pro chip, a massive 6.9" OLED display with ProMotion, and a pro-grade camera system.',
    features: ['A18 Pro chip', '6.9" Super Retina XDR OLED', '48MP Main | 12MP Ultra Wide | 12MP Telephoto', 'Titanium design', 'USB-C with USB 3', 'Up to 33 hours video playback'],
  },
  {
    id: 2, name: 'Samsung Galaxy S25 Ultra', category: 'Phones',
    slug: 'galaxy-s25-ultra',
    processor: 'Snapdragon 8 Gen 4', storage: '256GB / 512GB / 1TB',
    display: '6.9" Dynamic AMOLED 120Hz', price: 1499, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8, reviews: 19,
    description: 'The ultimate Galaxy experience with Snapdragon 8 Gen 4, built-in S Pen, and a 200MP camera system.',
    features: ['Snapdragon 8 Gen 4', '6.9" Dynamic AMOLED 2X 120Hz', '200MP Main | 50MP Ultra Wide | 50MP Telephoto', 'Built-in S Pen', '5000mAh battery', 'Corning Gorilla Armor'],
  },
  {
    id: 3, name: 'Nothing Phone (3)', category: 'Phones',
    slug: 'nothing-phone-3',
    processor: 'Snapdragon 8s Gen 3', storage: '256GB / 512GB',
    display: '6.7" OLED 120Hz', price: 799, originalPrice: null,
    badge: 'ICONIC', inStock: true, rating: 4.7, reviews: 15,
    description: 'Iconic design meets flagship performance. The Nothing Phone (3) features a stunning transparent design with Glyph Interface.',
    features: ['Snapdragon 8s Gen 3', '6.7" LTPO OLED 120Hz', '50MP Dual Camera', 'Glyph Interface LED array', 'Transparent design', '45W fast charging'],
  },
  {
    id: 4, name: 'MacBook Pro 16" M4 Max', category: 'Laptops',
    slug: 'macbook-pro-16-m4-max',
    processor: 'Apple M4 Max', storage: '1TB / 2TB / 4TB SSD',
    display: '16.2" Liquid Retina XDR', price: 3499, originalPrice: 3999,
    badge: 'NEW', inStock: true, rating: 4.9, reviews: 31,
    description: 'Uncompromising power for the pro user. The MacBook Pro with M4 Max delivers extraordinary performance with up to 16-core CPU and 40-core GPU.',
    features: ['Apple M4 Max (16-core CPU, 40-core GPU)', '16.2" Liquid Retina XDR display', 'Up to 4TB SSD storage', '36GB unified memory', '22-hour battery life', 'Thunderbolt 5 ports'],
  },
  {
    id: 5, name: 'Dell XPS 16', category: 'Laptops',
    slug: 'dell-xps-16',
    processor: 'Intel Core Ultra 9', storage: '1TB / 2TB SSD',
    display: '16.3" OLED 4K+', price: 2499, originalPrice: null,
    badge: null, inStock: true, rating: 4.6, reviews: 12,
    description: 'The flagship XPS with Intel Core Ultra 9, stunning OLED 4K+ display, and precision-crafted aluminum chassis.',
    features: ['Intel Core Ultra 9', '16.3" OLED 4K+ touch display', '32GB LPDDR5x RAM', '1TB / 2TB SSD', 'CNC machined aluminum', 'Intel Arc graphics'],
  },
  {
    id: 6, name: 'ASUS ROG Zephyrus G16', category: 'Laptops',
    slug: 'asus-rog-zephyrus-g16',
    processor: 'AMD Ryzen AI 9', storage: '1TB / 2TB SSD',
    display: '16" OLED 240Hz', price: 2199, originalPrice: null,
    badge: null, inStock: false, rating: 4.7, reviews: 8,
    description: 'Ultra-slim gaming powerhouse with AMD Ryzen AI 9, NVIDIA GeForce RTX 40 series, and a blazing-fast 240Hz OLED display.',
    features: ['AMD Ryzen AI 9 HX 370', '16" 2.5K OLED 240Hz', 'NVIDIA GeForce RTX 4070', '1TB / 2TB SSD', '16GB DDR5 RAM', 'RGB keyboard'],
  },
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export const categories = [
  { slug: 'phones', name: 'Phones', icon: 'Smartphone', count: 3, desc: 'Premium flagship mobile technology' },
  { slug: 'laptops', name: 'Laptops', icon: 'Monitor', count: 3, desc: 'Professional computing power' },
];
