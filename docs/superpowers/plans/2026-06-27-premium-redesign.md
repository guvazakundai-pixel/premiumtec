# Core Tech Systems Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire Core Tech Systems website (coretech.co.zw) with a consistent dark navy blue premium theme, fix mobile responsiveness, and make it look like a premium electronics brand (Apple/Samsung/NVIDIA-inspired).

**Architecture:** Update the existing Next.js 16 + Tailwind CSS 4 + Framer Motion codebase. Replace the current color palette (#121316/#00D2FF) with the new premium navy palette (#050B18/#2563EB/#38BDF8). Fix all theme inconsistencies (Cart, ProductModal, Footer use light theme). Redesign hero, cards, navigation, and all sections. Add testimonials, trusted brands, and improve animations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12, Swiper 12, Lucide React

---

## Task 1: Update Design System (globals.css)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace CSS custom properties with new color palette**

Update `:root` variables in `app/globals.css`:

```css
:root {
  --bg-deep: #050B18;
  --bg-slate: #0A1325;
  --bg-mist: #101C33;
  --bg-card: #101C33;
  --accent-blue: #2563EB;
  --accent-blue-light: #3B82F6;
  --accent-cyan: #38BDF8;
  --text-primary: #FFFFFF;
  --text-secondary: #A8B3CF;
  --text-muted: #6B7A99;
  --glass-bg: rgba(16, 28, 51, 0.4);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.15);
  --glass-shadow: rgba(0, 0, 0, 0.5);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.14);
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 2: Update Tailwind @theme inline block**

```css
@theme inline {
  --color-background: var(--bg-deep);
  --color-foreground: var(--text-primary);
  --color-accent: #2563EB;
  --color-accent-light: #3B82F6;
  --color-accent-cyan: #38BDF8;
  --color-muted: var(--text-muted);
  --color-surface: var(--bg-slate);
  --color-card: var(--bg-card);
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "Inter", monospace;
}
```

- [ ] **Step 3: Update all component classes to use new palette**

Replace hardcoded colors in `.btn-primary`, `.btn-outline`, `.glass-card`, `.card`, `.card-gray`, `.badge`, `.badge-premium`, `.glass-pill`, `.btn-premium*`, `.hero-glow`, `.gradient-text`, `.ambient-orb*`, `.swiper-*` overrides. Key changes:
- `#00D2FF` → `#2563EB` (primary accent)
- `#00E5FF` → `#3B82F6` (hover state)
- `#121316` → `#050B18` (deep background)
- `rgba(30, 35, 45, 0.4)` → `rgba(16, 28, 51, 0.4)` (glass backgrounds)
- `rgba(0, 210, 255, *)` → `rgba(37, 99, 235, *)` (glow/hover effects)

- [ ] **Step 4: Update hero-glow gradient**

```css
.hero-glow {
  background: radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
}
```

- [ ] **Step 5: Update gradient-text**

```css
.gradient-text {
  background: linear-gradient(135deg, #38BDF8, #2563EB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 6: Add new utility classes**

```css
/* Premium button with blue gradient */
.btn-premium-gradient {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 2rem; font-size: 0.875rem; font-weight: 600;
  border-radius: 100px; cursor: pointer; line-height: 1;
  background: linear-gradient(135deg, #2563EB, #3B82F6);
  color: #FFFFFF; border: none;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
  transition: all 0.35s var(--ease-premium);
}
.btn-premium-gradient:hover {
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  box-shadow: 0 6px 30px rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
}

/* Glass card with blue border on hover */
.glass-card-premium {
  background: rgba(16, 28, 51, 0.3);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.4s var(--ease-premium);
}
.glass-card-premium:hover {
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(37, 99, 235, 0.08);
  transform: translateY(-4px);
}

/* Section spacing system */
.section-spacing {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
@media (min-width: 768px) {
  .section-spacing {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }
}
```

- [ ] **Step 7: Update scrollbar colors**

```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #050B18; }
::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 100px; }
::-webkit-scrollbar-thumb:hover { background: #2563EB; }
```

- [ ] **Step 8: Update nav-scrolled**

```css
.nav-scrolled {
  background: rgba(5, 11, 24, 0.9);
  backdrop-filter: blur(30px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

- [ ] **Step 9: Run dev server to verify**

Run: `npm run dev`
Expected: Site loads with new dark navy blue palette, no CSS errors

---

## Task 2: Fix Cart Page (Light → Dark Theme)

**Files:**
- Modify: `app/cart/page.js`

- [ ] **Step 1: Replace all light-theme colors with dark theme**

Change the following in `app/cart/page.js`:
- `bg-white` → `bg-[#050B18]`
- `text-black` → `text-white`
- `text-[#86868B]` → `text-[#A8B3CF]`
- `text-[#6E6E73]` → `text-[#6B7A99]`
- `text-[#A1A1A6]` → `text-[#6B7A99]`
- `bg-[#F5F5F7]` → `bg-[#101C33]`
- `border-[#D2D2D7]` → `border-white/10`
- `hover:text-black` → `hover:text-white`
- `hover:text-red-500` → `hover:text-red-400`
- `text-[#E5E5E5]` → `text-[#6B7A99]`

- [ ] **Step 2: Update card styling**

Replace `card-gray` classes with the new dark card styling:
```jsx
className="bg-[#101C33] border border-white/8 rounded-2xl p-4 sm:p-6 flex items-center gap-4"
```

- [ ] **Step 3: Update quantity controls**

Replace light border colors:
```jsx
className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1"
```

- [ ] **Step 4: Update payment methods section**

Replace `bg-[#2C2C2E]` with `bg-white/5`, update text colors.

- [ ] **Step 5: Verify cart page renders correctly**

Run: `npm run dev` and navigate to `/cart`
Expected: Dark themed cart page matching the rest of the site

---

## Task 3: Fix ProductModal (Light → Dark Theme)

**Files:**
- Modify: `app/components/ProductModal.js`

- [ ] **Step 1: Replace all light-theme colors**

Change the following:
- `bg-white` (modal bg) → `bg-[#0A1325]`
- `text-black` → `text-white`
- `text-[#86868B]` → `text-[#A8B3CF]`
- `text-[#6E6E73]` → `text-[#6B7A99]`
- `text-[#A1A1A6]` → `text-[#6B7A99]`
- `bg-[#F5F5F5]` → `bg-[#101C33]`
- `bg-[#F5F5F7]` → `bg-[#101C33]`
- `border-[#D2D2D7]` → `border-white/10`
- `bg-[#E5E5E5]` → `bg-white/10`
- `hover:bg-[#E5E5E5]` → `hover:bg-white/10`
- `text-[#555555]` → `text-[#A8B3CF]`
- `bg-black text-white` (badge) → `bg-[#2563EB] text-white`
- `bg-emerald-600` → `bg-emerald-500/90`

- [ ] **Step 2: Update modal container**

```jsx
className="relative w-full max-w-lg max-h-[95vh] bg-[#0A1325] rounded-t-3xl overflow-hidden flex flex-col border border-white/10"
```

- [ ] **Step 3: Update close button**

```jsx
<button onClick={onClose} className="ml-auto p-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors z-10">
  <X size={16} className="text-[#A8B3CF]" />
</button>
```

- [ ] **Step 4: Update spec rows**

```jsx
<div className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? 'bg-[#101C33]' : 'bg-[#0A1325]'}`}>
```

- [ ] **Step 5: Update related products section**

Replace `border-[#D2D2D7]` with `border-white/10`, update text colors.

- [ ] **Step 6: Verify modal renders correctly**

Run: `npm run dev` and click on any product
Expected: Dark themed modal matching the site

---

## Task 4: Fix Footer (Hardcoded Colors → Design System)

**Files:**
- Modify: `app/components/Footer.js`

- [ ] **Step 1: Replace all hardcoded Apple-style colors**

Change:
- `bg-[#1C1E24]` → `bg-[#0A1325]`
- `text-[#86868B]` → `text-[#A8B3CF]`
- `text-[#6E6E73]` → `text-[#6B7A99]`
- `text-[#A1A1A6]` → `text-[#6B7A99]`
- `bg-[#2C2C2E]` → `bg-white/5`
- `border-[#424245]/50` → `border-white/8`
- `bg-[#424245]` (dots) → `bg-white/20`

- [ ] **Step 2: Update footer background**

```jsx
<footer className="bg-[#050B18] border-t border-white/5">
```

- [ ] **Step 3: Update payment method badges**

```jsx
<span key={p} className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#A8B3CF] border border-white/8">
  {p}
</span>
```

- [ ] **Step 4: Verify footer renders correctly**

Run: `npm run dev` and scroll to footer
Expected: Dark themed footer matching the site

---

## Task 5: Update Navigation Bar

**Files:**
- Modify: `app/components/Nav.js`

- [ ] **Step 1: Update cart button colors**

Replace `bg-[#00D2FF] text-[#121316]` with `bg-[#2563EB] text-white` in both desktop and mobile cart buttons.

- [ ] **Step 2: Update mobile cart badge**

Replace `bg-[#00D2FF] text-[#121316]` with `bg-[#2563EB] text-white`.

- [ ] **Step 3: Update dropdown background**

Replace `bg-[#1C1E24]` with `bg-[#0A1325] border border-white/10`.

- [ ] **Step 4: Add backdrop blur to mobile menu**

Replace `bg-black` with `bg-[#050B18]/95 backdrop-blur-xl`.

- [ ] **Step 5: Update active category tab colors in Hero**

Replace `bg-[#00D2FF] text-[#121316]` with `bg-[#2563EB] text-white`.

- [ ] **Step 6: Verify navigation works**

Run: `npm run dev` and test nav, dropdowns, mobile menu
Expected: All nav elements use new blue accent

---

## Task 6: Redesign Hero Section

**Files:**
- Modify: `app/page.js` (Hero function)

- [ ] **Step 1: Update hero background and glow**

Replace `bg-[#121316]` with `bg-[#050B18]`. Update hero-glow to use blue accent.

- [ ] **Step 2: Update hero typography**

Make headline bolder with better hierarchy:
```jsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
  Next-Level Tech<br />
  <span className="gradient-text">Starts Here.</span>
</h1>
```

- [ ] **Step 3: Update hero CTA buttons**

Replace `btn-primary` with `btn-premium-gradient` for main CTA. Keep `btn-outline` for secondary.

- [ ] **Step 4: Update trust badges in hero**

Replace `border-white/10` with `border-white/8`, update icon colors to use `text-[#38BDF8]`.

- [ ] **Step 5: Update category tabs**

Replace `bg-[#00D2FF] text-[#121316]` with `bg-[#2563EB] text-white`.

- [ ] **Step 6: Update product carousel cards**

Replace `bg-[#00D2FF] text-[#121316]` in "View Product" button with `bg-[#2563EB] text-white`.

- [ ] **Step 7: Add subtle blue glow orbs**

```jsx
<div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#2563EB]/5 blur-[120px] pointer-events-none" />
<div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#38BDF8]/5 blur-[100px] pointer-events-none" />
```

- [ ] **Step 8: Verify hero section**

Run: `npm run dev`
Expected: Premium hero with blue accents, gradient text, smooth carousel

---

## Task 7: Redesign Category Cards (Shop by Category)

**Files:**
- Modify: `app/page.js` (CategoryGateway function)

- [ ] **Step 1: Update category card styling**

Replace `card-gray` with premium glass cards:
```jsx
<div className="bg-[#101C33]/50 backdrop-blur-sm border border-white/8 rounded-2xl p-6 flex flex-col items-start gap-4 hover:border-[#2563EB]/30 hover:bg-[#101C33]/70 transition-all duration-500 group">
```

- [ ] **Step 2: Update icons**

Change icon size from 28 to 32, add blue tint on hover:
```jsx
<Icon size={32} className="text-[#A8B3CF] group-hover:text-[#38BDF8] group-hover:scale-110 transition-all duration-300" />
```

- [ ] **Step 3: Update "Browse" text**

```jsx
<span className="text-sm text-[#6B7A99] mt-1 inline-flex items-center gap-1 group-hover:text-[#38BDF8] group-hover:gap-2 transition-all duration-300">
  Browse <ArrowRight size={12} />
</span>
```

- [ ] **Step 4: Update section heading**

Replace `text-neutral-400` with `text-[#6B7A99]`, ensure consistent spacing.

- [ ] **Step 5: Verify category section**

Run: `npm run dev`
Expected: Premium glass category cards with blue hover effects

---

## Task 8: Redesign Product Cards (Laptops, Phones, Gaming, PC, Deals)

**Files:**
- Modify: `app/page.js` (LaptopsSection, PhonesSection, GamingShowcase, PCShowcase, FeaturedDeals)

- [ ] **Step 1: Update all product card backgrounds**

Replace `bg-[#121316]` section backgrounds with `bg-[#050B18]`. Replace `section-gray` / `section-light` with consistent dark backgrounds.

- [ ] **Step 2: Update card hover effects**

Ensure all cards use:
```css
border-color: rgba(37, 99, 235, 0.3);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(37, 99, 235, 0.08);
transform: translateY(-4px);
```

- [ ] **Step 3: Update "Add to Cart" buttons**

Replace all `bg-[#00D2FF] text-[#121316]` with `bg-[#2563EB] text-white`.

- [ ] **Step 4: Update price tier badges**

Replace `bg-white/5 text-neutral-400 border-white/10` with `bg-[#2563EB]/10 text-[#38BDF8] border-[#2563EB]/20`.

- [ ] **Step 5: Update section headings**

Ensure all section headings use consistent styling:
```jsx
<span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#38BDF8]">Category</span>
<h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Title</h2>
```

- [ ] **Step 6: Update gaming section backgrounds**

Replace `bg-[#121316]` with `bg-[#050B18]`, update glow effects to use blue.

- [ ] **Step 7: Verify all product sections**

Run: `npm run dev` and scroll through homepage
Expected: All product cards use consistent dark theme with blue accents

---

## Task 9: Add Trusted Brands Section

**Files:**
- Modify: `app/page.js` (add new TrustedBrands function)

- [ ] **Step 1: Create TrustedBrands component**

Add after CategoryGateway in page.js:

```jsx
function TrustedBrands() {
  const brands = [
    { name: 'Apple', logo: '/brands/apple.svg' },
    { name: 'Samsung', logo: '/brands/samsung.svg' },
    { name: 'Dell', logo: '/brands/dell.svg' },
    { name: 'HP', logo: '/brands/hp.svg' },
    { name: 'ASUS', logo: '/brands/asus.svg' },
    { name: 'Lenovo', logo: '/brands/lenovo.svg' },
    { name: 'Sony', logo: '/brands/sony.svg' },
    { name: 'Microsoft', logo: '/brands/microsoft.svg' },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-[#050B18]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7A99] mb-3">Trusted Partners</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Official Brand Dealer</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand, i) => (
            <motion.div key={brand.name} variants={fadeUp} transition={{ delay: i * 0.05 }}
              className="px-6 py-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#2563EB]/20 hover:bg-white/[0.04] transition-all duration-300 grayscale hover:grayscale-0">
              <span className="text-lg font-semibold text-[#6B7A99] hover:text-white transition-colors">{brand.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add TrustedBrands to page layout**

In the homepage `return` statement, add `<TrustedBrands />` after `<CategoryGateway />`.

- [ ] **Step 3: Verify trusted brands section**

Run: `npm run dev`
Expected: Clean brand logos section with hover effects

---

## Task 10: Redesign Trust Signals / Accordion Section

**Files:**
- Modify: `app/page.js` (add or update trust signals section)

- [ ] **Step 1: Create premium trust signals section**

Replace the existing accordion/trust section with glass cards:

```jsx
function TrustSignals() {
  const signals = [
    { icon: Shield, title: '100% Authentic', desc: 'Every product is verified and comes with official warranty.' },
    { icon: Truck, title: 'Same-day Delivery', desc: 'Free delivery within Harare. Nationwide shipping available.' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy on all unopened products.' },
    { icon: HeadphonesIcon, title: 'Expert Support', desc: 'Technical support via WhatsApp, call, or in-store.' },
  ];

  return (
    <section className="px-6 py-24 md:py-28 bg-[#050B18]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7A99] mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Built for Trust</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {signals.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-[#101C33]/30 backdrop-blur-sm border border-white/8 rounded-2xl p-6 text-center hover:border-[#2563EB]/30 hover:bg-[#101C33]/50 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2563EB]/20 transition-all duration-300">
                  <Icon size={24} className="text-[#38BDF8]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B7A99] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add TrustSignals to page layout**

Add `<TrustSignals />` before the footer in the homepage.

- [ ] **Step 3: Verify trust signals section**

Run: `npm run dev`
Expected: Four glass cards with blue icons, hover effects

---

## Task 11: Add Testimonials Section

**Files:**
- Modify: `app/page.js` (add new Testimonials function)

- [ ] **Step 1: Create Testimonials component**

```jsx
function Testimonials() {
  const testimonials = [
    { name: 'Tendai M.', role: 'Business Owner', rating: 5, text: 'Got a refurbished ThinkPad for my business. Works like new and saved hundreds. Core Tech is my go-to store.', avatar: 'TM' },
    { name: 'Rutendo K.', role: 'University Student', rating: 5, text: 'Best prices in Harare for laptops. The team helped me pick the perfect one for my studies. Highly recommend!', avatar: 'RK' },
    { name: 'Tafara N.', role: 'Gamer', rating: 5, text: 'Bought a gaming setup here — PS5 and monitor. Amazing quality and fast delivery. Will buy again.', avatar: 'TN' },
  ];

  return (
    <section className="px-6 py-24 md:py-28 bg-[#0A1325]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B7A99] mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">What Our Customers Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="bg-[#101C33]/30 backdrop-blur-sm border border-white/8 rounded-2xl p-6 hover:border-[#2563EB]/20 transition-all duration-500">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#A8B3CF] leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#38BDF8]">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#6B7A99]">{t.role}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Testimonials to page layout**

Add `<Testimonials />` after `<TrustSignals />` in the homepage.

- [ ] **Step 3: Verify testimonials section**

Run: `npm run dev`
Expected: Three testimonial cards with star ratings, avatars, verified badges

---

## Task 12: Add CTA Section Before Footer

**Files:**
- Modify: `app/page.js` (add new CTA function)

- [ ] **Step 1: Create CTA component**

```jsx
function CTASection() {
  return (
    <section className="px-6 py-24 md:py-28 bg-[#050B18] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB]/5 blur-[150px]" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-base text-[#A8B3CF] mb-8 max-w-lg mx-auto">
            Browse our collection of premium laptops, phones, gaming gear, and more. Free delivery in Harare.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/laptops" className="btn-premium-gradient text-sm px-8 py-3.5">
              Shop Now <ArrowRight size={16} />
            </a>
            <a href="https://wa.me/263780579633" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-white text-sm font-medium hover:border-[#2563EB]/30 hover:bg-white/5 transition-all duration-300">
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add CTASection to page layout**

Add `<CTASection />` after `<Testimonials />` and before `<Footer />`.

- [ ] **Step 3: Verify CTA section**

Run: `npm run dev`
Expected: Centered CTA with blue glow background, two buttons

---

## Task 13: Fix Mobile Responsiveness

**Files:**
- Modify: `app/page.js`
- Modify: `app/components/Nav.js`
- Modify: `app/globals.css`

- [ ] **Step 1: Add overflow-hidden to body**

In `globals.css`:
```css
body {
  overflow-x: hidden;
}
```

- [ ] **Step 2: Fix hero section mobile padding**

Ensure hero uses `px-4 sm:px-6` and `pt-24 pb-12` on mobile.

- [ ] **Step 3: Fix carousel mobile sizing**

Ensure Swiper uses `slidesPerView={1}` on mobile with proper spacing.

- [ ] **Step 4: Fix category grid mobile**

Ensure `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` with `gap-3` on mobile.

- [ ] **Step 5: Fix product card grid mobile**

Ensure all product grids use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with appropriate gaps.

- [ ] **Step 6: Fix WhatsApp button positioning**

In `WhatsAppButton.js`, ensure the floating button doesn't overlap content:
```jsx
className="fixed bottom-6 right-6 z-50 ..."
```

- [ ] **Step 7: Fix mobile nav menu**

Ensure mobile menu has proper padding and items don't overflow.

- [ ] **Step 8: Test at all breakpoints**

Run: `npm run dev` and test at 320px, 360px, 375px, 390px, 412px, 430px widths
Expected: No horizontal scrolling, all content fits

---

## Task 14: Improve Animations

**Files:**
- Modify: `app/page.js`
- Modify: `app/globals.css`

- [ ] **Step 1: Add scroll-triggered fade-up animations**

Ensure all sections use `whileInView="visible"` with `viewport={{ once: true, margin: '-80px' }}`.

- [ ] **Step 2: Add card lift animation on hover**

In `globals.css`, ensure all cards have:
```css
transition: all 0.4s var(--ease-premium);
```
And hover state:
```css
transform: translateY(-4px);
border-color: rgba(37, 99, 235, 0.3);
```

- [ ] **Step 3: Add button glow on hover**

Ensure buttons have:
```css
transition: all 0.35s var(--ease-premium);
```
And hover:
```css
box-shadow: 0 6px 30px rgba(37, 99, 235, 0.4);
transform: translateY(-2px);
```

- [ ] **Step 4: Add smooth image transitions**

Ensure all product images have:
```css
transition: transform 0.7s var(--ease-premium);
```
And hover:
```css
transform: scale(1.05);
```

- [ ] **Step 5: Verify animations**

Run: `npm run dev` and interact with the site
Expected: Smooth fade-ups, card lifts, button glows, image zooms

---

## Task 15: Final Verification and Cleanup

**Files:**
- All modified files

- [ ] **Step 1: Run dev server and test all pages**

Run: `npm run dev`
Test: `/`, `/laptops`, `/phones`, `/gaming`, `/pcs`, `/cart`, `/about`, `/contact`, `/products/[slug]`

- [ ] **Step 2: Check for any remaining light-theme colors**

Search codebase for:
- `#86868B`
- `#6E6E73`
- `#D2D2D7`
- `#E5E5E5`
- `#F5F5F7`
- `#A1A1A6`
- `bg-white`
- `text-black`

Expected: None found (except in product images/data)

- [ ] **Step 3: Check for hardcoded #00D2FF**

Search for `#00D2FF` and replace with `#2563EB`.

- [ ] **Step 4: Check for hardcoded #121316**

Search for `#121316` and replace with `#050B18`.

- [ ] **Step 5: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 6: Commit all changes**

```bash
git add .
git commit -m "feat: premium redesign - dark navy blue theme, fixed responsiveness, new sections"
```

- [ ] **Step 7: Push to GitHub and deploy to Vercel**

```bash
git push origin main
```
Expected: Vercel auto-deploys the updated site

---

## Summary of Changes

| Area | Before | After |
|------|--------|-------|
| Background | #121316 (dark grey) | #050B18 (dark navy) |
| Cards | #1C1E24 (grey) | #101C33 (navy blue) |
| Accent | #00D2FF (cyan) | #2563EB (blue) |
| Secondary | #0066FF | #38BDF8 (sky blue) |
| Text Secondary | #A0A5B5 | #A8B3CF |
| Cart Page | White/Light | Dark Navy |
| ProductModal | White/Light | Dark Navy |
| Footer | Hardcoded Apple colors | CSS variables |
| Trust Signals | Missing/Basic | Glass cards with blue icons |
| Testimonials | Missing | New section with avatars |
| CTA | Missing | New section with blue glow |
| Trusted Brands | Missing | New section |
| Mobile | Broken overflow | Fixed, tested at 320-430px |
| Animations | Basic | Premium fade-ups, lifts, glows |
