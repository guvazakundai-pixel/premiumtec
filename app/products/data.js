export const products = [
  {
    id: 7, name: 'HP 250 G5 Notebook', category: 'Laptops',
    slug: 'hp-250-g5',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '15" HD', price: 200, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.3, reviews: 3,
    image: '/images/hp-250-g5.jpg',
    description: 'Reliable HP 250 G5 notebook powered by Intel Core i5 6th generation. Perfect for everyday productivity with 8GB RAM and a fast 256GB SSD. Battery tested, Grade A condition, 90-day warranty included.',
    features: ['Core i5 6th Generation', '8GB RAM', '256GB SSD', 'Windows 11 Pro', '15" HD Display', 'Lightweight design', '90-Day Warranty', 'Grade A'],
  },

  // ─── GAMING DESKTOPS ───
  {
    id: 8, name: 'Gaming Desktop', category: 'Gaming',
    slug: 'gaming-desktop',
    processor: 'Core i7 10th Gen', storage: '512GB SSD + 16GB RAM',
    display: 'N/A', price: 1250, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.7, reviews: 6,
    image: '/images/gaming-desktop.jpg',
    description: 'High-performance gaming desktop with Core i7 10th Gen, 16GB RAM, 512GB SSD, and a dedicated AMD Radeon RX 5 8GB graphics card. Features 4 RGB cooling fans and USB-C port.',
    features: ['Core i7 10th Generation', '16GB RAM', '512GB SSD', '8GB Dedicated GPU (AMD Radeon RX 5)', '4 RGB Cooling Fans', 'USB-C Port', 'Windows 11 Pro'],
  },
  {
    id: 19, name: 'Gaming Desktop Core i9', category: 'Gaming',
    slug: 'gaming-desktop-i9',
    processor: 'Core i9 11900K', storage: '1TB NVMe SSD',
    display: 'N/A', price: 1000, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.8, reviews: 4,
    image: '/images/gaming-desktop-i9.jpg',
    description: 'Ultimate gaming desktop powered by Intel Core i9 11900K, NVIDIA RTX 4070 12GB, 32GB DDR4 RAM, and 1TB NVMe SSD. Liquid cooling and 750W PSU. Blazing performance for the most demanding games.',
    features: ['Core i9 11900K', '32GB DDR4 RAM', '1TB NVMe SSD', 'NVIDIA RTX 4070 12GB', 'Liquid Cooling', '750W PSU', 'Windows 11 Pro'],
  },

  // ─── GAMING CONSOLES ───
  {
    id: 20, name: 'PlayStation 5 & Slim', category: 'Gaming',
    slug: 'playstation-5',
    processor: 'Custom AMD Zen 2', storage: '825GB / 1TB SSD',
    display: '4K / 120Hz', price: 550, originalPrice: null,
    badge: 'CONSOLE', inStock: true, rating: 4.9, reviews: 15,
    image: '/images/playstation-5.jpg',
    description: 'PlayStation 5 ordinary $550. PlayStation 5 Slim $630. Next-gen gaming with lightning-fast loading, haptic feedback, and stunning 4K graphics.',
    features: ['PS5 Standard $550', 'PS5 Slim $630', 'Custom SSD storage', '4K / 120Hz output', 'DualSense controller', 'Ray tracing support'],
  },
  {
    id: 21, name: 'Xbox Series X', category: 'Gaming',
    slug: 'xbox-series-x',
    processor: 'Custom AMD Zen 2', storage: '1TB SSD',
    display: '4K / 120Hz', price: 650, originalPrice: null,
    badge: 'CONSOLE', inStock: true, rating: 4.8, reviews: 10,
    image: '/images/xbox-series-x.jpg',
    description: 'The fastest, most powerful Xbox ever. Enjoy thousands of games across four generations with 12 teraflops of raw graphic processing power.',
    features: ['Custom AMD Zen 2 processor', '1TB Custom SSD', '12 Teraflops GPU', '4K / 120Hz support', 'Quick Resume', 'Backward compatible'],
  },

  // ─── MONITORS ───
  {
    id: 22, name: 'Sceptre 24" Monitor', category: 'Gaming',
    slug: 'sceptre-24-monitor',
    processor: 'N/A', storage: 'N/A',
    display: '24" FHD 75Hz', price: 155, originalPrice: 170,
    badge: 'NEW', inStock: true, rating: 4.4, reviews: 8,
    image: '/images/sceptre-24-monitor.jpg',
    description: 'Brand new 24 inch Sceptre monitor with 1920x1080 FHD resolution and 75Hz refresh rate. Crisp visuals, slim bezel design, VESA compatible. Perfect for work and play.',
    features: ['24" FHD 1920x1080', '75Hz Refresh Rate', 'Brand New', 'Slim Bezel Design', 'VESA Mount Compatible'],
  },

  // ─── GAMING LAPTOPS ───
  {
    id: 56, name: 'Victus by HP Gaming Laptop 15-FA2082', category: 'Gaming',
    slug: 'victus-hp-15-fa2082',
    processor: 'Core i5 13th Gen', storage: '512GB SSD',
    display: '15.6" FHD', price: 850, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.6, reviews: 0,
    image: '/images/victus-hp-15-fa2082.jpg',
    description: 'Victus by HP 15-FA2082 gaming laptop with Intel Core i5 13th Gen, 16GB DDR4 RAM, 512GB SSD, and NVIDIA GeForce RTX 3050 6GB graphics. 15.6" FHD display, backlit keyboard, and premium thermal design. Ready for esports and modern gaming.',
    features: ['Core i5 13th Generation', '16GB DDR4 RAM', '512GB SSD', 'NVIDIA GeForce RTX 3050 6GB', '15.6" FHD Display', 'Backlit Keyboard', 'Windows 11', 'Premium Thermal Design'],
  },
  {
    id: 57, name: 'Victus by HP Gaming Laptop 15-FA2093', category: 'Gaming',
    slug: 'victus-hp-15-fa2093',
    processor: 'Core i7 13th Gen', storage: '1TB SSD',
    display: '15.6" FHD', price: 1450, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.7, reviews: 0,
    image: '/images/victus-hp-15-fa2093.jpg',
    description: 'Victus by HP 15-FA2093 gaming laptop with Intel Core i7 13th Gen, 16GB DDR4 RAM, 1TB SSD, and NVIDIA GeForce RTX 3050 6GB graphics. 15.6" FHD display, backlit keyboard, and advanced cooling system. High-performance gaming machine.',
    features: ['Core i7 13th Generation', '16GB DDR4 RAM', '1TB SSD', 'NVIDIA GeForce RTX 3050 6GB', '15.6" FHD Display', 'Backlit Keyboard', 'Windows 11', 'Advanced Cooling System'],
  },
  {
    id: 58, name: 'OMEN Gaming Laptop 16-AM0015NIA', category: 'Gaming',
    slug: 'omen-16-am0015nia',
    processor: 'Core Ultra 7 255H', storage: '1TB SSD',
    display: '16" FHD', price: 1550, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.8, reviews: 0,
    image: '/images/omen-16-am0015nia.jpg',
    description: 'HP OMEN 16-AM0015NIA gaming laptop with Intel Core Ultra 7 255H Series 2 processor, 16GB DDR5 RAM, 1TB SSD, and NVIDIA GeForce RTX 5060 8GB graphics. 16" FHD display with advanced thermal management. Next-gen gaming performance with cutting-edge AI acceleration.',
    features: ['Core Ultra 7 255H Series 2', '16GB DDR5 RAM', '1TB SSD', 'NVIDIA GeForce RTX 5060 8GB', '16" FHD Display', 'Advanced Thermal Management', 'AI Acceleration', 'Windows 11', 'Backlit Keyboard'],
  },
  {
    id: 59, name: 'OMEN Gaming Laptop 16-AN0075', category: 'Gaming',
    slug: 'omen-16-an0075',
    processor: 'Core Ultra 9', storage: '1TB SSD',
    display: '16" FHD', price: 2000, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.9, reviews: 0,
    image: '/images/omen-16-an0075.jpg',
    description: 'HP OMEN 16-AN0075 flagship gaming laptop with Intel Core Ultra 9 processor, 32GB DDR5 RAM, 1TB SSD, and NVIDIA GeForce RTX 5070 8GB graphics. 16" FHD display with advanced vapor chamber cooling. Ultimate gaming performance with AI-powered optimization.',
    features: ['Core Ultra 9', '32GB DDR5 RAM', '1TB SSD', 'NVIDIA GeForce RTX 5070 8GB', '16" FHD Display', 'Vapor Chamber Cooling', 'AI-Powered Optimization', 'Windows 11', 'Backlit Keyboard'],
  },
  {
    id: 60, name: 'Lenovo Legion 5 16IAX10 Gaming Laptop', category: 'Gaming',
    slug: 'lenovo-legion-5-16iax10',
    processor: 'Core Ultra 9 275HX', storage: '1TB SSD',
    display: '16" FHD', price: 1850, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.8, reviews: 0,
    image: '/images/lenovo-legion-5-16iax10.jpg',
    description: 'Lenovo Legion 5 16IAX10 gaming laptop with Intel Core Ultra 9 275HX Series 2 Hyper X processor, 32GB DDR5 RAM, 1TB SSD, and NVIDIA GeForce RTX 5060 8GB GDDR7 graphics. 16" FHD display with Legion ColdFront thermal system. Premium build with Hyper X AI engine.',
    features: ['Core Ultra 9 275HX Series 2 Hyper X', '32GB DDR5 RAM', '1TB SSD', 'NVIDIA GeForce RTX 5060 8GB GDDR7', '16" FHD Display', 'Legion ColdFront Thermal', 'Hyper X AI Engine', 'Windows 11', 'Backlit Keyboard'],
  },

  // ─── VALUE LAPTOPS ───
  {
    id: 9, name: 'HP 820 Elitebook G3', category: 'Laptops',
    slug: 'hp-820-elitebook-g3',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '12.5" HD 1366x768', price: 180, originalPrice: 190,
    badge: 'DEAL', inStock: true, rating: 4.2, reviews: 5,
    image: '/images/hp-820-elitebook-g3.jpg',
    description: 'Compact and powerful HP Elitebook 820 G3 with Core i5 6th Gen, 8GB RAM, and 256GB SSD. Perfect for professionals on the go. Battery tested, Grade A condition, 90-day warranty included.',
    features: ['Core i5 6th Generation', '8GB RAM', '256GB SSD', '12.5" HD Display', 'Windows 11 Pro', 'Lightweight design', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 10, name: 'HP Pavilion Gaming Laptop', category: 'Laptops',
    slug: 'hp-pavilion-gaming',
    processor: 'AMD Ryzen 5 4600', storage: '512GB SSD',
    display: '15.6" HD 60Hz', price: 590, originalPrice: 650,
    badge: 'GAMING', inStock: true, rating: 4.5, reviews: 7,
    image: '/images/hp-pavilion-gaming.jpg',
    description: 'HP Pavilion Gaming laptop with AMD Ryzen 5 4600, dedicated NVIDIA GTX 1060 4GB graphics, 16GB RAM, and 512GB SSD. Gaming keyboard, backlit, battery tested. Grade A condition with 90-day warranty.',
    features: ['AMD Ryzen 5 4600', '16GB RAM', '512GB SSD', 'NVIDIA GTX 1060 4GB', '15.6" HD 60Hz Display', 'Backlit Keyboard', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 11, name: 'Dell Latitude E5470', category: 'Laptops',
    slug: 'dell-latitude-e5470',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '14" HD', price: 200, originalPrice: 220,
    badge: 'DEAL', inStock: true, rating: 4.3, reviews: 6,
    image: '/images/dell-latitude-e5470.jpg',
    description: 'Reliable Dell Latitude E5470 with Core i5 6th Gen, 8GB RAM, 256GB SSD, backlit keyboard, and excellent battery life. Grade A condition with 90-day warranty.',
    features: ['Core i5 6th Generation', '8GB RAM', '256GB SSD', '14" HD Display', 'Backlit Keyboard', 'Excellent Battery', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 12, name: 'HP Elitebook 840 G3', category: 'Laptops',
    slug: 'hp-elitebook-840-g3',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '14" HD', price: 200, originalPrice: 240,
    badge: 'DEAL', inStock: true, rating: 4.3, reviews: 8,
    image: '/images/hp-elitebook-840-g3.jpg',
    description: 'Premium HP Elitebook 840 G3 with Core i5 6th Gen, 8GB RAM, 256GB SSD, and backlit keyboard. Battery tested, Grade A condition, 90-day warranty included.',
    features: ['Core i5 6th Generation', '8GB RAM', '256GB SSD', '14" HD Display', 'Backlit Keyboard', 'Windows 11 Pro', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 13, name: 'HP 840 Elitebook G6 Core i7', category: 'Laptops',
    slug: 'hp-840-elitebook-g6',
    processor: 'Core i7 8665U 8th Gen', storage: '256GB SSD',
    display: '14" FHD', price: 330, originalPrice: 380,
    badge: 'DEAL', inStock: true, rating: 4.4, reviews: 4,
    image: '/images/hp-840-elitebook-g6.jpg',
    description: 'High-performance HP Elitebook 840 G6 with Intel Core i7 8665U 8th Gen, 256GB SSD, 8GB RAM, and 14" FHD display. Premium business ultrabook with backlit keyboard. Grade A condition, 90-day warranty included.',
    features: ['Core i7 8665U 8th Generation', '8GB RAM', '256GB SSD', '14" FHD Display', 'Backlit Keyboard', 'Windows 11 Pro', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 14, name: 'Dell Latitude 5450', category: 'Laptops',
    slug: 'dell-latitude-5450',
    processor: 'Core i5 5th Gen', storage: '500GB HDD',
    display: '14" HD', price: 160, originalPrice: 180,
    badge: 'DEAL', inStock: true, rating: 4.1, reviews: 5,
    image: '/images/dell-latitude-5450.jpg',
    description: 'Budget-friendly Dell Latitude 5450 with Core i5 5th Gen, 8GB RAM, 500GB HDD, backlit keyboard, and excellent battery life. Grade A condition, 90-day warranty included.',
    features: ['Core i5 5th Generation', '8GB RAM', '500GB HDD', '14" HD Display', 'Backlit Keyboard', 'Excellent Battery', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 15, name: 'Dell Latitude 5470', category: 'Laptops',
    slug: 'dell-latitude-5470',
    processor: 'Core i5 6th Gen', storage: '256GB SSD',
    display: '14" HD', price: 190, originalPrice: 220,
    badge: 'DEAL', inStock: true, rating: 4.3, reviews: 6,
    image: '/images/dell-latitude-5470.jpg',
    description: 'Dell Latitude 5470 with Core i5 6th Gen, 8GB RAM, 256GB SSD, 14" HD display, backlit keyboard, and excellent battery life. Grade A condition, 90-day warranty included.',
    features: ['Core i5 6th Generation', '8GB RAM', '256GB SSD', '14" HD Display', 'Backlit Keyboard', 'Excellent Battery', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 16, name: 'HP Elitebook 840 G5', category: 'Laptops',
    slug: 'hp-elitebook-840-g5',
    processor: 'Core i5 8th Gen', storage: '256GB SSD',
    display: '14" HD', price: 280, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.4, reviews: 5,
    image: '/images/hp-elitebook-840-g5.jpg',
    description: 'HP Elitebook 840 G5 with Core i5 8th Gen, 8GB RAM, and 256GB SSD. Premium business laptop with backlit keyboard. Battery tested, Grade A condition, 90-day warranty included.',
    features: ['Core i5 8th Generation', '8GB RAM', '256GB SSD', '14" HD Display', 'Backlit Keyboard', 'Windows 11 Pro', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 17, name: 'HP Elitebook 1030 G2 x360', category: 'Laptops',
    slug: 'hp-elitebook-1030-g2',
    processor: 'Core i5 7300U 7th Gen', storage: '256GB SSD',
    display: '13.3" FHD Touch', price: 350, originalPrice: 390,
    badge: 'DEAL', inStock: true, rating: 4.5, reviews: 4,
    image: '/images/hp-elitebook-1030-g2.jpg',
    description: 'HP EliteBook 1030 G2 x360 convertible. Core i5 7300U, 8GB DDR4, 256GB M.2 SSD, 13.3" FHD touch screen, 360° hinge, backlit keyboard, fingerprint reader, Windows 10 Pro with Office.',
    features: ['Core i5 7300U 2.6GHz 7th Gen', '8GB DDR4 RAM (Customizable)', '256GB M.2 SSD (Customizable)', '13.3" LED FHD Touch Display', '360° Convertible', 'Backlit Keyboard', 'Fingerprint Reader', 'Windows 10 Pro + Office'],
  },
  {
    id: 18, name: 'Dell Latitude 5420', category: 'Laptops',
    slug: 'dell-latitude-5420',
    processor: 'Core i5 10th Gen', storage: '256GB SSD',
    display: '14" HD', price: 320, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.5, reviews: 3,
    image: '/images/dell-latitude-5420.jpg',
    description: 'Dell Latitude 5420 with Core i5 10th Gen, 8GB RAM, and 256GB SSD. Business-ready laptop with excellent performance. Grade A condition, battery tested, 90-day warranty.',
    features: ['Core i5 10th Generation', '8GB RAM', '256GB SSD', '14" HD Display', 'Windows 11 Pro', 'Business-grade build', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 23, name: 'MacBook Pro 13"', category: 'Laptops',
    slug: 'macbook-pro-13',
    processor: 'Core i5 8th Gen', storage: '256GB SSD',
    display: '13.3" Retina 2560x1600', price: 500, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.4, reviews: 6,
    image: '/images/macbook.jpg',
    description: 'Apple MacBook Pro 13" with Core i5 8th Gen, 8GB RAM, 256GB SSD, and stunning Retina display. Premium aluminum body, Touch Bar. Grade A condition, battery tested, 90-day warranty.',
    features: ['Core i5 8th Generation', '8GB RAM', '256GB SSD', '13.3" Retina 2560x1600', 'Touch Bar', 'macOS', 'Premium aluminum', '90-Day Warranty', 'Grade A'],
  },
  {
    id: 24, name: 'Proline Notebook', category: 'Laptops',
    slug: 'proline',
    processor: 'DualCore', storage: '500GB HDD',
    display: '14" HD', price: 110, originalPrice: null,
    badge: 'BUDGET', inStock: true, rating: 4.0, reviews: 4,
    image: '/images/proline.jpg',
    description: 'Affordable Proline notebook with DualCore processor, 4GB RAM, 500GB HDD, and 14" screen. Excellent battery life. Budget-friendly computing with 90-day warranty.',
    features: ['DualCore Processor', '4GB RAM', '500GB HDD', '14" HD Screen', 'Excellent Battery Life', 'Budget-friendly', '90-Day Warranty'],
  },
  {
    id: 25, name: 'HP Spectre 13.5', category: 'Laptops',
    slug: 'hp-spectre',
    processor: 'Core i7 13th Gen', storage: '512GB SSD',
    display: '13.5" OLED', price: 1800, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8, reviews: 2,
    image: '/images/hp-spectre.jpg',
    description: 'Brand new boxed HP Spectre 13.5 with Core i7 13th Gen, 512GB SSD, and 16GB RAM. Premium ultrabook with stunning OLED display.',
    features: ['Core i7 13th Generation', '16GB RAM', '512GB SSD', '13.5" OLED Display', 'Brand New Boxed', 'Premium Design'],
  },

  // ─── ACCESSORIES ───
  {
    id: 26, name: 'HP Printer 2320', category: 'Accessories',
    slug: 'hp-printer-2320',
    processor: 'N/A', storage: 'N/A',
    display: 'N/A', price: 55, originalPrice: 70,
    badge: 'DEAL', inStock: true, rating: 4.2, reviews: 5,
    image: '/images/hp-printer-2320.jpg',
    description: 'HP Printer 2320. Reliable printing for home or office use. Available now.',
    features: ['Print, Scan, Copy', 'Wireless connectivity', 'HP quality', 'Affordable printing', 'Available now'],
  },
  {
    id: 27, name: 'Laptop Keyboard Replacement', category: 'Accessories',
    slug: 'laptop-keyboard',
    processor: 'N/A', storage: 'N/A',
    display: 'N/A', price: 20, originalPrice: null,
    badge: 'SERVICE', inStock: true, rating: 4.3, reviews: 10,
    image: '/images/laptop-keyboard.jpg',
    description: 'Laptop keyboard replacement service. From $20. Covers most laptop models.',
    features: ['All major laptop models', 'Quality replacement keys', 'Professional installation', 'Quick turnaround', 'From $20'],
  },
  {
    id: 28, name: 'Laptop Chargers All Types', category: 'Accessories',
    slug: 'laptop-chargers',
    processor: 'N/A', storage: 'N/A',
    display: 'N/A', price: 15, originalPrice: 20,
    badge: 'SERVICE', inStock: true, rating: 4.4, reviews: 15,
    image: '/images/laptop-chargers.jpg',
    description: 'Laptop chargers for all types. Power pack $10, Complete charger $15. All major brands supported.',
    features: ['All laptop brands supported', 'Power pack from $10', 'Complete charger $15', 'Original quality', 'Tested before sale'],
  },

  // ─── BRANDNEW BOXED HP LAPTOPS ───
  {
    id: 29, name: 'HP 250 G9 DualCore', category: 'Laptops',
    slug: 'hp-250-g9',
    processor: 'DualCore', storage: '256GB SSD',
    display: '15.6" HD', price: 290, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.3, reviews: 4,
    description: 'Brand new boxed HP 250 G9. DualCore processor, 256GB storage, 4GB RAM. Full warranty included. Delivery available.',
    features: ['Brand New Boxed', 'DualCore Processor', '256GB Storage', '4GB RAM', '15.6" HD Display', 'Full Warranty', 'Delivery Available'],
  },
  {
    id: 30, name: 'HP 15s Core i5 12th Gen', category: 'Laptops',
    slug: 'hp-15s-core-i5-12th',
    processor: 'Core i5 12th Gen', storage: '512GB SSD',
    display: '15.6" HD', price: 560, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.6, reviews: 3,
    description: 'Brand new boxed HP 15s with Core i5 12th Gen, 512GB SSD, and 8GB RAM. Full warranty and delivery available.',
    features: ['Brand New Boxed', 'Core i5 12th Generation', '512GB SSD', '8GB RAM', '15.6" HD Display', 'Full Warranty'],
  },
  {
    id: 31, name: 'HP Pavilion 15 Core i5 12th Gen', category: 'Laptops',
    slug: 'hp-pavilion-15-i5-12th',
    processor: 'Core i5 12th Gen', storage: '512GB SSD',
    display: '15.6" HD', price: 875, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.7, reviews: 2,
    description: 'Brand new HP Pavilion 15 with Core i5 12th Gen, 512GB SSD, and 8GB RAM. Premium entertainment laptop.',
    features: ['Brand New Boxed', 'Core i5 12th Generation', '512GB SSD', '8GB RAM', '15.6" HD Display', 'Full Warranty'],
  },

  // ─── HP OMNIBOOKS ───
  {
    id: 32, name: 'HP Omnibook 5 Flip 14-FP0023DX', category: 'Laptops',
    slug: 'hp-omnibook-5-flip-14-fp0023dx',
    processor: 'Core 7 150U', storage: '512GB SSD',
    display: '14" Touchscreen', price: 1000, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.5, reviews: 0,
    description: 'HP Omnibook 5 Flip with Core 7 150U, 16GB RAM, 512GB SSD, and 14" touchscreen display. Versatile flip design for work and play.',
    features: ['Core 7 150U', '16GB RAM', '512GB SSD', '14" Touchscreen', 'Flip Design', 'Windows 11'],
  },
  {
    id: 33, name: 'HP Omnibook X Flip 14-FM0023DX', category: 'Laptops',
    slug: 'hp-omnibook-x-flip-14-fm0023dx',
    processor: 'Core Ultra 7 256V Series 2', storage: '1TB SSD',
    display: '14" Touchscreen', price: 1250, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.6, reviews: 0,
    image: '/images/omnibook-x-flip-14-fm0023dx-1.jpg',
    images: [
      '/images/omnibook-x-flip-14-fm0023dx-1.jpg',
      '/images/omnibook-x-flip-14-fm0023dx-2.jpg',
      '/images/omnibook-x-flip-14-fm0023dx-3.jpg',
      '/images/omnibook-x-flip-14-fm0023dx-4.jpg',
    ],
    description: 'HP Omnibook X Flip powered by Intel Core Ultra 7 Series 2, 16GB RAM, 1TB SSD, and 14" touchscreen. Premium ultrabook performance.',
    features: ['Core Ultra 7 256V Series 2', '16GB RAM', '1TB SSD', '14" Touchscreen', 'Flip Design', 'Windows 11'],
  },
  {
    id: 34, name: 'HP Omnibook X Flip 16-AS0033DX', category: 'Laptops',
    slug: 'hp-omnibook-x-flip-16-as0033dx',
    processor: 'Core Ultra 7 256V Series 2', storage: '2TB SSD',
    display: '16" Touchscreen', price: 1450, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.7, reviews: 0,
    description: 'Large-screen HP Omnibook X Flip with Core Ultra 7 Series 2, 32GB RAM, 2TB SSD, and 16" touchscreen display.',
    features: ['Core Ultra 7 256V Series 2', '32GB RAM', '2TB SSD', '16" Touchscreen', 'Flip Design', 'Windows 11'],
  },
  {
    id: 35, name: 'HP Omnibook X 16-AW0033DX', category: 'Laptops',
    slug: 'hp-omnibook-x-16-aw0033dx',
    processor: 'Core Ultra 7 255H', storage: '2TB SSD',
    display: '16" Touchscreen', price: 1700, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.8, reviews: 0,
    description: 'HP Omnibook X with Core Ultra 7 255H, 32GB RAM, 2TB SSD, 16" touchscreen, and NVIDIA GeForce RTX 4050 6GB graphics. Powerhouse for creators and gamers.',
    features: ['Core Ultra 7 255H', '32GB RAM', '2TB SSD', '16" Touchscreen', 'NVIDIA RTX 4050 6GB', 'Windows 11'],
  },
  {
    id: 36, name: 'HP Omnibook 7 Flip 16-AU0019ST', category: 'Laptops',
    slug: 'hp-omnibook-7-flip-16-au0019st',
    processor: 'Core Ultra 9 288V Series 2', storage: '1TB SSD',
    display: '16" Touchscreen', price: 1570, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8, reviews: 0,
    description: 'HP Omnibook 7 Flip with top-tier Core Ultra 9 288V Series 2, 32GB RAM, 1TB SSD, and 16" touchscreen. Flagship performance.',
    features: ['Core Ultra 9 288V Series 2', '32GB RAM', '1TB SSD', '16" Touchscreen', 'Flip Design', 'Windows 11'],
  },
  {
    id: 37, name: 'HP Omnibook X Flip 16-AS0043DX', category: 'Laptops',
    slug: 'hp-omnibook-x-flip-16-as0043dx',
    processor: 'Core Ultra 9 288V Series 2', storage: '2TB SSD',
    display: '16" Touchscreen', price: 1650, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9, reviews: 0,
    description: 'HP Omnibook X Flip 16 with Core Ultra 9 288V Series 2, 32GB RAM, 2TB SSD, and 16" touchscreen. Maximum storage and speed.',
    features: ['Core Ultra 9 288V Series 2', '32GB RAM', '2TB SSD', '16" Touchscreen', 'Flip Design', 'Windows 11'],
  },
  {
    id: 38, name: 'HP Omnibook Ultra Flip 14-FH0013NIA', category: 'Laptops',
    slug: 'hp-omnibook-ultra-flip-14-fh0013nia',
    processor: 'Core Ultra 7 256V Series 2', storage: '1TB SSD',
    display: '14" Touchscreen', price: 1450, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.6, reviews: 0,
    description: 'HP Omnibook Ultra Flip with Core Ultra 7 256V Series 2, 16GB RAM, 1TB SSD, 14" touchscreen, and fingerprint reader.',
    features: ['Core Ultra 7 256V Series 2', '16GB RAM', '1TB SSD', '14" Touchscreen', 'Fingerprint Reader', 'Windows 11'],
  },
  {
    id: 39, name: 'HP Omnibook Ultra Flip 14-FH000', category: 'Laptops',
    slug: 'hp-omnibook-ultra-flip-14-fh000',
    processor: 'Core Ultra 7 258V Series 2', storage: '1TB SSD',
    display: '14" Touchscreen', price: 1800, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.7, reviews: 0,
    description: 'HP Omnibook Ultra Flip with Core Ultra 7 258V Series 2, 32GB RAM, 1TB SSD, 14" touchscreen, fingerprint reader, and HP Pen included.',
    features: ['Core Ultra 7 258V Series 2', '32GB RAM', '1TB SSD', '14" Touchscreen', 'Fingerprint Reader', 'HP Pen Included', 'Windows 11'],
  },
  {
    id: 40, name: 'HP Omnibook Ultra Flip 14-FH0033DX', category: 'Laptops',
    slug: 'hp-omnibook-ultra-flip-14-fh0033dx',
    processor: 'Core Ultra 9 258V Series 2', storage: '2TB SSD',
    display: '14" Touchscreen', price: 2000, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9, reviews: 0,
    description: 'Ultimate HP Omnibook Ultra Flip with Core Ultra 9 258V Series 2, 32GB RAM, 2TB SSD, 14" touchscreen, and fingerprint reader. The pinnacle of the Omnibook line.',
    features: ['Core Ultra 9 258V Series 2', '32GB RAM', '2TB SSD', '14" Touchscreen', 'Fingerprint Reader', 'Windows 11'],
  },
  {
    id: 41, name: 'MacBook Air M3', category: 'Laptops',
    slug: 'macbook-air-m3',
    processor: 'Apple M3', storage: '256GB SSD',
    display: '13.6" Liquid Retina', price: 1000, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.7, reviews: 0,
    image: '/images/macbook.jpg',
    description: 'Brand new MacBook Air M3 with 8GB RAM, 256GB SSD, and stunning 13.6" Liquid Retina display. Apple M3 chip delivers incredible performance and all-day battery life. Lightweight and fanless design.',
    features: ['Apple M3 Chip', '8GB RAM', '256GB SSD', '13.6" Liquid Retina Display', 'macOS Sonoma', 'All-day battery', 'Fanless design'],
  },
  {
    id: 42, name: 'Apple iPad M5', category: 'Laptops',
    slug: 'apple-ipad-m5',
    processor: 'Apple M5', storage: '256GB',
    display: '13" Liquid Retina XDR', price: 1300, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8, reviews: 0,
    image: '/images/ipad-m5-1.jpg',
    images: ['/images/ipad-m5-1.jpg', '/images/ipad-m5-2.jpg'],
    description: 'Apple iPad M5 with 8GB RAM and 256GB storage. The ultimate creative and productivity tablet with M5 chip performance.',
    features: ['Apple M5 Chip', '8GB RAM', '256GB Storage', '13" Liquid Retina XDR Display', 'USB-C', 'iPadOS'],
  },
  {
    id: 43, name: 'ASUS Vivobook X1404V', category: 'Laptops',
    slug: 'asus-vivobook-x1404v-i5',
    processor: 'Core i5-1334U 13th Gen', storage: '256GB SSD',
    display: '14" FHD', price: 550, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.5, reviews: 0,
    image: '/images/asus-vivobook-x1404v-i5.jpg',
    description: 'ASUS Vivobook X1404V with Core i5-1334U 13th Gen, 12GB RAM, 256GB SSD, and 14" FHD display. Reliable everyday performance.',
    features: ['Core i5-1334U 13th Gen', '12GB RAM', '256GB SSD', '14" FHD Display', 'Windows 11', 'Slim Design'],
  },
  {
    id: 44, name: 'ASUS Vivobook X1404V Core i7', category: 'Laptops',
    slug: 'asus-vivobook-x1404v-i7',
    processor: 'Core i7-1354U 13th Gen', storage: '512GB SSD',
    display: '14" FHD', price: 750, originalPrice: null,
    badge: 'DEAL', inStock: true, rating: 4.6, reviews: 0,
    image: '/images/asus-vivobook-x1404v-i7.jpg',
    description: 'ASUS Vivobook X1404V with Core i7-1354U 13th Gen, 12GB RAM, 512GB SSD, 14" FHD display, and Windows 11.',
    features: ['Core i7-1354U 13th Gen', '12GB RAM', '512GB SSD', '14" FHD Display', 'Windows 11', 'Slim Design'],
  },
  {
    id: 45, name: 'ASUS Zenbook UX3405C', category: 'Laptops',
    slug: 'asus-zenbook-ux3405c',
    processor: 'Core Ultra 9 285H Series 2', storage: '1TB SSD',
    display: '14" Touchscreen', price: 1450, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.7, reviews: 0,
    image: '/images/asus-zenbook-ux3405c.jpg',
    description: 'ASUS Zenbook UX3405C in Jasper Gray with Core Ultra 9 285H Series 2, 32GB RAM, 1TB SSD, and 14" touchscreen. Premium ultrabook.',
    features: ['Core Ultra 9 285H Series 2', '32GB RAM', '1TB SSD', '14" Touchscreen', 'Jasper Gray', 'Windows 11'],
  },

  // ─── SMARTPHONES ───
  {
    id: 46, name: 'iPhone 16 Pro Max', category: 'Phones',
    slug: 'iphone-16-pro-max',
    processor: 'A18 Pro', storage: '256GB',
    display: '6.9" OLED 120Hz', price: 1499, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9, reviews: 3,
    description: 'Latest iPhone 16 Pro Max with A18 Pro chip, 256GB storage, 6.9" OLED display with 120Hz ProMotion, and titanium design.',
    features: ['A18 Pro Chip', '256GB Storage', '6.9" OLED 120Hz', 'Titanium Design', '48MP Camera', 'iOS 19'],
  },
  {
    id: 47, name: 'Samsung Galaxy S25 Ultra', category: 'Phones',
    slug: 'samsung-galaxy-s25-ultra',
    processor: 'Snapdragon 8 Gen 4', storage: '256GB',
    display: '6.9" AMOLED 120Hz', price: 1399, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.9, reviews: 2,
    description: 'Samsung Galaxy S25 Ultra with Snapdragon 8 Gen 4, 256GB storage, 6.9" AMOLED display, and S Pen support.',
    features: ['Snapdragon 8 Gen 4', '256GB Storage', '6.9" AMOLED 120Hz', 'S Pen', '200MP Camera', 'Android 15'],
  },
  {
    id: 48, name: 'Samsung Galaxy A16', category: 'Phones',
    slug: 'samsung-galaxy-a16',
    processor: 'Exynos 1330', storage: '128GB',
    display: '6.5" Super AMOLED', price: 280, originalPrice: 320,
    badge: 'DEAL', inStock: true, rating: 4.3, reviews: 5,
    description: 'Affordable Samsung Galaxy A16 with Exynos 1330 processor, 128GB storage, and 6.5" Super AMOLED display.',
    features: ['Exynos 1330', '128GB Storage', '6.5" Super AMOLED', '50MP Camera', '5000mAh Battery', 'Android 14'],
  },
  {
    id: 49, name: 'Nothing Phone 3', category: 'Phones',
    slug: 'nothing-phone-3',
    processor: 'Snapdragon 8s Gen 3', storage: '256GB',
    display: '6.7" OLED 120Hz', price: 599, originalPrice: null,
    badge: 'NEW', inStock: true, rating: 4.6, reviews: 4,
    description: 'Nothing Phone 3 with Snapdragon 8s Gen 3, 256GB storage, 6.7" OLED display, and iconic Glyph Interface lighting.',
    features: ['Snapdragon 8s Gen 3', '256GB Storage', '6.7" OLED 120Hz', 'Glyph Interface', '50MP Dual Camera', 'Nothing OS'],
  },
  {
    id: 50, name: 'Google Pixel 10 Pro', category: 'Phones',
    slug: 'google-pixel-10-pro',
    processor: 'Tensor G5', storage: '256GB',
    display: '6.7" OLED 120Hz', price: 899, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.7, reviews: 2,
    description: 'Google Pixel 10 Pro with Tensor G5 chip, 256GB storage, 6.7" OLED display, and the best camera on any smartphone.',
    features: ['Tensor G5', '256GB Storage', '6.7" OLED 120Hz', 'Best Camera', 'AI Features', 'Android 15'],
  },
  {
    id: 51, name: 'Xiaomi 14T Pro', category: 'Phones',
    slug: 'xiaomi-14t-pro',
    processor: 'Dimensity 9300+', storage: '512GB',
    display: '6.67" AMOLED 144Hz', price: 499, originalPrice: 599,
    badge: 'DEAL', inStock: true, rating: 4.5, reviews: 6,
    description: 'Xiaomi 14T Pro with Dimensity 9300+, 512GB storage, 6.67" AMOLED 144Hz display, and Leica co-engineered camera.',
    features: ['Dimensity 9300+', '512GB Storage', '6.67" AMOLED 144Hz', 'Leica Camera', '120W Charging', 'MIUI'],
  },

  // ─── PCS & WORKSTATIONS ───
  {
    id: 52, name: 'Gaming PC Ryzen 7', category: 'PCs',
    slug: 'gaming-pc-ryzen-7',
    processor: 'AMD Ryzen 7 5700X', storage: '1TB SSD',
    display: 'N/A', price: 850, originalPrice: null,
    badge: 'GAMING', inStock: true, rating: 4.6, reviews: 3,
    image: '/images/gaming-desktop.jpg',
    description: 'Gaming PC with AMD Ryzen 7 5700X, 16GB RAM, 1TB SSD, and NVIDIA RTX 3060 12GB. Perfect for 1440p gaming.',
    features: ['AMD Ryzen 7 5700X', '16GB RAM', '1TB SSD', 'NVIDIA RTX 3060 12GB', 'RGB Cooling', 'Windows 11 Pro'],
  },
  {
    id: 53, name: 'Office PC Core i5', category: 'PCs',
    slug: 'office-pc-core-i5',
    processor: 'Core i5 12th Gen', storage: '512GB SSD',
    display: 'N/A', price: 450, originalPrice: null,
    badge: null, inStock: true, rating: 4.3, reviews: 4,
    description: 'Reliable office PC with Core i5 12th Gen, 16GB RAM, 512GB SSD. Ideal for productivity, accounting, and day-to-day office work.',
    features: ['Core i5 12th Gen', '16GB RAM', '512GB SSD', 'Integrated Graphics', 'WiFi/Bluetooth', 'Windows 11 Pro'],
  },
  {
    id: 54, name: 'Workstation Core i9', category: 'PCs',
    slug: 'workstation-core-i9',
    processor: 'Core i9 13th Gen', storage: '2TB SSD',
    display: 'N/A', price: 1500, originalPrice: null,
    badge: 'FLAGSHIP', inStock: true, rating: 4.8, reviews: 2,
    description: 'Professional workstation with Core i9 13th Gen, 32GB RAM, 2TB SSD, and NVIDIA RTX 4070. Built for creators and engineers.',
    features: ['Core i9 13th Gen', '32GB RAM', '2TB SSD', 'NVIDIA RTX 4070', 'Liquid Cooling', 'Windows 11 Pro'],
  },
  {
    id: 55, name: 'Custom Build Service', category: 'PCs',
    slug: 'custom-build-service',
    processor: 'Custom Configurable', storage: 'Custom',
    display: 'N/A', price: 200, originalPrice: null,
    badge: 'SERVICE', inStock: true, rating: 4.9, reviews: 8,
    description: 'Custom PC build service. We design and assemble the perfect PC for your needs and budget. From $200 build fee + parts.',
    features: ['Custom Configuration', 'Professional Assembly', 'Cable Management', 'Thermal Optimization', 'Stress Tested', 'Warranty Included'],
  },
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getBrand(product) {
  const name = product.name.toLowerCase();
  if (name.includes('hp ') || name.includes('victus') || name.includes('omen')) return 'HP';
  if (name.includes('legion') || name.includes('lenovo')) return 'Lenovo';
  if (name.includes('dell')) return 'Dell';
  if (name.includes('asus')) return 'ASUS';
  if (name.includes('apple') || name.includes('macbook')) return 'Apple';
  if (name.includes('ipad')) return 'Apple';
  if (name.includes('proline')) return 'Proline';
  if (name.includes('playstation') || name.includes('xbox')) return 'Sony/Microsoft';
  if (name.includes('sceptre')) return 'Sceptre';
  return 'Other';
}

export function getUsageType(product) {
  const name = product.name.toLowerCase();
  if (name.includes('gaming') || product.badge === 'GAMING') return 'Gaming';
  if (name.includes('omnibook') || name.includes('zenbook') || name.includes('spectre') || name.includes('elitebook')) return 'Premium';
  if (product.price < 200) return 'Budget';
  if (product.price < 500) return 'Value';
  return 'Performance';
}

export function getSubcategory(product) {
  const name = product.name.toLowerCase();
  if (name.includes('elitebook')) return 'EliteBook';
  if (name.includes('pavilion')) return 'Pavilion';
  if (name.includes('omnibook')) return 'OmniBook';
  if (name.includes('spectre')) return 'Spectre';
  if (name.includes('latitude')) return 'Latitude';
  if (name.includes('vivobook')) return 'VivoBook';
  if (name.includes('zenbook')) return 'ZenBook';
  if (name.includes('macbook')) return 'MacBook';
  if (name.includes('ipad')) return 'iPad';
  if (name.includes('proline')) return 'Proline';
  if (name.includes('playstation')) return 'PlayStation';
  if (name.includes('xbox')) return 'Xbox';
  if (name.includes('desktop')) return 'Desktop';
  return null;
}

export function getAspectRatio(product) {
  const cat = product.category?.toLowerCase() || '';
  if (cat === 'phones') return '3/4';
  if (cat === 'gaming') {
    const n = product.name?.toLowerCase() || '';
    if (n.includes('playstation') || n.includes('xbox')) return '1/1';
    if (n.includes('monitor') || n.includes('sceptre')) return '16/9';
    return '4/3';
  }
  if (cat === 'accessories') return '1/1';
  if (cat === 'pcs') return '4/3';
  // Laptops and everything else
  return '4/3';
}

export const categories = [
  { slug: 'laptops', name: 'Laptops', icon: 'Monitor', count: 32, desc: 'Professional computing power' },
  { slug: 'gaming', name: 'Gaming', icon: 'Gamepad2', count: 9, desc: 'Consoles, desktops & gaming laptops' },
  { slug: 'accessories', name: 'Accessories', icon: 'Package', count: 3, desc: 'Printers, chargers & repairs' },
  { slug: 'phones', name: 'Phones', icon: 'Smartphone', count: 8, desc: 'Latest smartphones & deals' },
  { slug: 'pcs', name: 'PCs', icon: 'Monitor', count: 4, desc: 'Desktops & workstations' },
];
