# CoreTech Systems — Light Blue Theme Redesign

**Date:** 2026-07-01  
**Project:** premiumtec → coretech.co.zw  
**Objective:** Full frontend redesign from dark navy theme to light blue theme

---

## 1. Color System

### 1.1 Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-white` | `#FFFFFF` | Hero top, nav initial state |
| `--bg-light-blue` | `#F0F7FF` | All content sections (TrustBar, Shop, Info, Testimonials, FAQ, Contact, CTA) |
| `--bg-rich-blue` | `#2563EB` | Featured Products section |
| `--bg-footer` | `#1E293B` | Footer background |
| `--text-dark` | `#1D1D1F` | Primary text on light backgrounds |
| `--text-muted` | `#6B7080` | Secondary text on light backgrounds |
| `--text-white` | `#FFFFFF` | Text on rich blue / dark surfaces |
| `--accent-blue` | `#0071E3` | Buttons, links, accent elements |

### 1.2 Background Transition

- Page starts with `#FFFFFF` at the very top (hero/nav area)
- Seamless vertical gradient from `#FFFFFF` → `#F0F7FF` starting below the hero slider
- All subsequent sections use `#F0F7FF` as their background
- Featured Products section breaks the pattern with `#2563EB` (rich blue contrast section)

### 1.3 Removals

- Remove all `bg-[#121316]` (deep dark)
- Remove all `bg-[#1C1E24]` (slate dark)
- Remove all `bg-black` and solid black blocks from content sections
- Remove the `noise-overlay` pattern (dotted mesh)
- Remove all dark gradient overlays from hero (replace with white/light)

---

## 2. Nav Component

### 2.1 Changes
- Initial state: transparent with dark text (`text-[#1D1D1F]`)
- Scrolled state: white background (`bg-white/90` backdrop-blur), dark text
- Logo: `brightness-0 invert` removed (logo is dark, shows naturally on white)
- Nav height: keep `h-28` to accommodate the larger logo
- Cart button: adjust from cyan-on-dark to blue-on-light (`#0071E3` background, white text)

---

## 3. Hero Section

### 3.1 Changes
- Keep existing Unsplash background images
- Replace dark gradient overlay with lighter overlay:
  - `bg-gradient-to-r from-white/80 via-white/40 to-transparent` (left-to-right)
  - This ensures hero text is readable while keeping the light theme
- Hero text changes to dark (`#1D1D1F`) for titles, `#6B7080` for descriptions
- CTA buttons: `#0071E3` background, white text
- "Learn More" button: dark border, dark text
- Category badges: keep colored but with adjusted opacity
- Progress bar: adjust color to accent blue
- Navigation arrows: dark backgrounds instead of white

---

## 4. TrustBar Section

### 4.1 Changes
- Background: `#F0F7FF` (was `bg-white`)
- Border: use light blue border colors
- Brand text: `#6B7080` (was `#86868B`)
- Keep the ticker animation intact

---

## 5. Shop by Category ("Explore Our Collection")

### 5.1 Layout
- 2×2 grid visible at a time (4 cards on screen)
- Horizontal swipe/carousel via Swiper to reveal remaining 2+ cards
- **Not** an infinite horizontal scroll — it's a paginated 2×2 Swiper

### 5.2 Card Design
- Each card has a background image (mix of Unsplash category photos + product close-ups)
- Image covers the entire card with `object-cover`
- Semi-transparent dark overlay (`bg-black/40`) over the image
- Category name and count overlaid on top in white text
- Cards are square aspect ratio on mobile, slightly rectangular on desktop
- Hover: subtle scale-up with the overlay lightening

### 5.3 Card Image Sources
- Laptops: Unsplash laptop workspace photo
- PCs: Unsplash desktop setup photo
- Gaming: product photo (PlayStation or gaming setup)
- Phones: product photo (iPhone or smartphone close-up)
- Accessories: product photo (headphones/keyboard)
- Displays: Unsplash monitor/display photo

---

## 6. Featured Products Section

### 6.1 Background
- Rich blue: `#2563EB`
- Full-width section with generous padding

### 6.2 Product Cards
- Square aspect ratio (`aspect-square`)
- Image fills the entire card with `object-cover`
- Dark overlay (`bg-gradient-to-t from-black/70 via-black/30 to-transparent`) over the image
- Product name, specs, price, rating, and badge overlay on top of the image (not below it)
- White text on the overlay for maximum contrast
- Badge positioned top-left
- Price and rating positioned bottom
- Card has subtle rounded corners and a hover lift effect
- 4 cards in a row on desktop, 2 on mobile

---

## 7. Info Section (Why Shop With Us)

### 7.1 Changes
- Background: `#F0F7FF` (was `bg-white`)
- Card backgrounds: white (`bg-white`) with subtle shadow for elevated look on light blue
- Text: `#1D1D1F` for headings, `#6B7080` for body
- Accordion behavior stays the same
- Icon colors: keep their accent colors but adjust container backgrounds

---

## 8. Testimonials Section

### 8.1 Changes
- Background: `#F0F7FF` (was `section-accent` which was dark)
- Quote text: `#1D1D1F` (was `#1D1D1F` already on white)
- Name/role: updated to match new text colors
- Star ratings: keep `#FF9F0A`
- Carousel dots: adjust to blue accent

---

## 9. FAQ Section

### 9.1 Changes
- Background: `#F0F7FF` (was `bg-white`)
- Accordion items: white background cards with shadow
- Question text: `#1D1D1F` bold
- Answer text: `#6B7080`
- Borders: light blue-gray

---

## 10. Contact Section

### 10.1 Changes
- Background: `#F0F7FF` (was `section-accent` dark)
- Form card: white background with shadow (was glass dark)
- Input fields: white with light border (was dark glass)
- Text: dark on light throughout
- Button: `#0071E3` blue

---

## 11. Final CTA Section

### 11.1 Changes
- Background: `#2563EB` (rich blue, matching featured products — was `#1D1D1F` black)
- OR alternatively a lighter blue section — use the same rich blue for consistency
- Text: white
- Buttons: white background with blue text for primary, white border for secondary
- Remove the hero-orb effect (dark theme artifact)

---

## 12. Footer

### 12.1 Changes
- Background: `#1E293B` (slate dark — slightly lighter than current `#1C1E24`)
- Keep it dark to ground the page, but adjust shade to harmonize with the blue theme
- Logo: needs `brightness-0 invert` to show as white on dark
- Text colors: adjust for better contrast on the new dark background

---

## 13. CSS / Global Changes

- Update CSS custom properties in `globals.css`:
  - `--bg-deep` → `#F0F7FF`
  - `--bg-slate` → `#FFFFFF` (card surfaces on light)
  - `--text-primary` → `#1D1D1F`
  - `--text-secondary` → `#6B7080`
  - `--text-muted` → `#9CA3AF`
  - Remove `--glass-*` or adapt to light theme
- Remove `.noise-overlay::before` (dotted mesh)
- Remove `.nav-scrolled` dark background, replace with white
- Update `.section-accent` to use `--bg-rich-blue` (`#2563EB`)
- Add `.section-light-blue` class for `#F0F7FF` backgrounds
- All `.card`, `.card-gray`, `.btn-*` classes need light-theme variants or overrides

---

## 14. Typography & Contrast

- All section headings: `#1D1D1F` on light backgrounds, `#FFFFFF` on rich blue/dark
- Body text: `#6B7080` minimum on light backgrounds
- Links: `#0071E3` blue with hover darkening
- Ensure minimum 4.5:1 contrast ratio for all text
- Remove any "invisible" or washed-out text (was an issue on the dark theme)

---

## 15. Structural Cleanup

- Remove the FinalCTA section's black background
- Ensure smooth transition from Contact section to Footer (no white gaps)
- All sections flow continuously with their backgrounds touching

---

## 16. Files to Modify

| File | Changes |
|------|---------|
| `app/globals.css` | Overhaul color tokens, remove dark artifacts, add light-blue classes |
| `app/components/Nav.js` | Light theme nav, dark text, adjusted logo |
| `app/page.js` | All sections: Hero, TrustBar, ShopByCategory, FeaturedSection, InfoSection, Testimonials, FAQ, Contact, FinalCTA |
| `app/components/Footer.js` | Adjusted dark footer shading |

No new files needed. All changes are in-place modifications.

---

## 17. Out of Scope

- Product data changes (`data.js`)
- Product detail pages
- Cart functionality
- Backend or API changes
- Logo file replacement (already done)
- Favicon (already done)
