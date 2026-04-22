# Elevate Logos & Brand Assets

Official G2 brand assets for use in prototypes and explorations.

---

## Current Assets

### G2 Logo Variants
- ✅ **g2-logo-rorange.svg**
  - Primary brand color (#ff492c rorange)
  - Usage: Main navigation, headers, primary brand contexts on light backgrounds
  - Specification: DESIGN.md requires SVG at 56×56px

- ✅ **g2-logo-black.svg** (NEW - April 22, 2026)
  - Monochrome/black variant
  - Usage: Print, grayscale contexts, monochrome interfaces

- ✅ **g2-logo-white.svg** (NEW - April 22, 2026)
  - White variant (#FFF fill)
  - Usage: Dark backgrounds, inverted color schemes, footers

- ✅ **g2-icon-dark-outline.svg** (NEW - April 22, 2026)
  - Small icon-only variant (20×20px) with dark outline
  - Usage: Compact layouts, favicons, small UI elements

---

## Additional Assets (Optional Roadmap)

### Logo Variants
- [x] **g2-logo-white.svg** — Inverted/dark background usage ✅
- [x] **g2-logo-black.svg** — Monochrome variant ✅
- [x] **g2-icon-dark-outline.svg** — Small icon variant ✅
- [ ] **g2-logo-full-color.svg** — Multi-color version (if exists)
- [ ] **g2-wordmark-rorange.svg** — Wordmark only (no icon)
- [ ] **g2-wordmark-white.svg** — White wordmark
- [ ] **g2-wordmark-black.svg** — Black wordmark

### Size Variants
- [ ] **Large** (e.g., 112×112px) — Hero sections, landing pages
- [ ] **Small** (e.g., 32×32px) — Footers, compact layouts
- [ ] **Favicon** (16×16px, 32×32px, .ico) — Browser icons

### Brand Marks
- [ ] **Trust & Security badge** — G2's trust certification mark
- [ ] **Award badges** — "Best Software 2026", "Leader", etc.
- [ ] **Scoring badges** — G2 Score indicators
- [ ] **Verification badges** — Verified review, verified user

### Partner Logos (if applicable)
- [ ] Technology partner logos
- [ ] Social media icons (LinkedIn, Twitter/X, Facebook)
- [ ] Platform integration badges

---

## Usage Guidelines

### Size Specifications

Per DESIGN.md:
- **Navigation**: 56×56px (standard)
- **Hero sections**: 112×112px+ (large)
- **Footer**: 32-40px (small)
- **Favicon**: 16×16px, 32×32px

### Color Usage

- **Rorange (#ff492c)**: Primary brand contexts, light backgrounds
- **White (#ffffff)**: Dark backgrounds, inverted color schemes
- **Black (#000000)**: Monochrome contexts, print

### Do's and Don'ts

**DO:**
- ✅ Use SVG format for scalability
- ✅ Maintain aspect ratio
- ✅ Provide adequate whitespace around logo (minimum 8px padding)
- ✅ Use rorange variant on light backgrounds
- ✅ Use white variant on dark backgrounds

**DON'T:**
- ❌ Render logo as plain text (per DESIGN.md)
- ❌ Distort or stretch logo
- ❌ Change logo colors arbitrarily
- ❌ Add effects (shadows, gradients, borders) to logo
- ❌ Use logo on busy background patterns

---

## Integration Points

### HTML Usage

```html
<!-- Navigation header -->
<img src="/shared/assets/logos/g2-logo-rorange.svg" 
     width="56" 
     height="56" 
     alt="G2">

<!-- Dark background -->
<img src="/shared/assets/logos/g2-logo-white.svg" 
     width="56" 
     height="56" 
     alt="G2">
```

### CSS Background

```css
.logo {
  background-image: url('/shared/assets/logos/g2-logo-rorange.svg');
  background-size: 56px 56px;
  background-repeat: no-repeat;
  width: 56px;
  height: 56px;
}
```

### Claude Design Package

Logo is automatically included in `claude-design-assets/assets/logos/` when running:
```bash
./create-claude-design-package.sh
```

---

## Sourcing Additional Assets

### From UE Elevate
```bash
# Logo directory (likely location)
/Users/schilds/projects/ue/engines/elevate/app/assets/images/logos/
/Users/schilds/projects/ue/app/assets/images/g2/

# Brand assets
/Users/schilds/projects/ue/app/assets/images/badges/
/Users/schilds/projects/ue/app/assets/images/icons/
```

### From G2.com
- Visit G2.com → DevTools → Inspect header logo
- Download SVG or copy SVG code
- Extract from footer, badge sections

### From Brand Team
- Request official brand asset package
- Ask for logo style guide
- Get approval for usage contexts

---

## Related Documentation

- **Design System**: `/shared/design-system/DESIGN.md` (logo usage requirements)
- **Icons**: `/shared/icons/README.md` (UI icon library)
- **Roadmap**: `/shared/.internal/ELEVATE_ROADMAP.md` (Phase 2.3 — Logos & Brand Assets)

---

**Last Updated**: April 21, 2026  
**Status**: Minimal set (G2 rorange logo), comprehensive library on roadmap
