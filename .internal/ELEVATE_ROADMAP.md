# Elevate Light Component Library — Roadmap

**Goal**: Build a lightweight, production-quality HTML component library using the UE Elevate design system for rapid, high-fidelity prototyping within Chicago Labs explorations.

**Status**: Foundation complete, scaling component coverage

---

## Phase 1: Foundation ✅ COMPLETE

**Objective**: Establish design tokens, documentation structure, and initial patterns

- [x] Port design tokens from UE Elevate (`elevate.css`)
- [x] Set up CSS symlink to UE production for auto-updates
- [x] Create component documentation (`ELEVATE_COMPONENTS.md`)
- [x] Build demo page showcasing patterns (`elevate-demo.html`)
- [x] Document typography, buttons, layouts, alerts, forms
- [x] Establish `[elv]` scoping pattern
- [x] Define utility class conventions (`elv-` prefix)

**Deliverables**: ✅
- `/shared/tokens/elevate.css` — 300+ design tokens
- `/shared/components/ELEVATE_COMPONENTS.md` — Component reference
- `/shared/components/elevate-demo.html` — Working examples

---

## Phase 2: Icon System ✅ COMPLETE

**Objective**: Port icon library from UE Elevate for use in static prototypes

### Current State
- ✅ Icon CSS utilities created (`icons.css`)
- ✅ Icon documentation (`shared/icons/README.md`)
- ✅ **130 icons ported** from UE Elevate (COMPLETE)
- ✅ Organized by category (UI, Functional)
- ✅ G2 logo added (`shared/assets/logos/g2-logo-rorange.svg`)

### Remaining Work

#### 2.1 Complete Icon Port ✅ COMPLETE
- [x] Port all UI icons from UE Elevate
- [x] Organize by category
- [x] Update README with complete icon inventory
- [x] Port functional UI icons (navigation, actions, utility)

**Status**: 293 icons total (178 from UE Elevate + 115 extended) — COMPLETE library ready for use

#### 2.2 Icon Tooling ✅ COMPLETE
**Completed** (April 22, 2026):
- [x] Create icon gallery page (`shared/icons/index.html`)
- [x] Add search/filter functionality for icon discovery
- [x] Interactive grid with 293 icons
- [x] Click-to-copy filename functionality
- [x] Category filters and live search

**Status**: Interactive icon gallery ready for team use

#### 2.3 Logos & Brand Assets ✅ CORE COMPLETE
**Objective**: Port complete set of logos and brand assets from UE Elevate

**Completed** (April 22, 2026):
- [x] **G2 Logos** — Core color variants
  - [x] Rorange (primary) ✅ g2-logo-rorange.svg
  - [x] White (inverted) ✅ g2-logo-white.svg
  - [x] Black (monochrome) ✅ g2-logo-black.svg
  - [x] Icon variant ✅ g2-icon-dark-outline.svg (20×20px)

**Optional Additions**:
- [ ] **G2 Logos** — Additional variants
  - [ ] Full-color (multi-color version, if exists)
  - [ ] Wordmark only (rorange, white, black)
- [ ] **Logo Size Variants**
  - [ ] Standard (56×56px as per DESIGN.md)
  - [ ] Large (for headers)
  - [ ] Small (for footers/favicons)
- [ ] **Partner/Platform Logos** (if applicable)
  - [ ] Technology partner badges
  - [ ] Social media icons
  - [ ] Certification badges
- [ ] **Brand Marks & Symbols**
  - [ ] Trust & Security badge
  - [ ] Award badges
  - [ ] Product category icons

**Source Location**: `/Users/schilds/projects/ue/engines/elevate/app/assets/images/` or UE brand asset repository

**Deliverables**:
- Complete logo library in `shared/assets/logos/`
- Documentation in `shared/assets/logos/README.md`
- Usage guidelines (sizes, contexts, do's/don'ts)
- Integration with Claude Design asset package

**Priority**: CORE COMPLETE — All essential logo variants available (rorange, white, black, icon)

#### 2.4 Icon Audit ✅ COMPLETE
**Objective**: Comprehensive audit of all icons used across explorations to identify missing icons from Elevate library

**Completed Tasks** (April 22, 2026):
- [x] **Exploration Audit** — Scanned all epics for custom SVG icons and emoji fallbacks
- [x] **Compare with UE Source** — Cross-referenced against complete UE Elevate icon set
- [x] **Document Missing Icons** — Identified 119 missing icons from UE Elevate
- [x] **Port Missing Icons** — Ported all 119 missing icons (178 total from UE)
- [x] **Update Icon Inventory** — Updated README.md with complete 293-icon catalog

**Final State**:
- ✅ All 178 UE Elevate UI icons ported (100% coverage)
- ✅ 115 additional icons from other sources (pictograms, functional, custom)
- ✅ Total: 293 SVG icons
- ✅ Identified 4 custom SVGs in explorations (can be replaced with library icons)
- ✅ Identified emoji fallbacks (🔍, ✓, ▾) to replace with proper icons

**Priority**: COMPLETE — No icon gaps remain

---

## Phase 3: Component HTML Templates 📋 NEXT

**Objective**: Create ready-to-use HTML templates for all 34 documented Elevate components

### 3.1 Low-Hanging Fruit (Simple, No Interactivity)
**Timeline**: 1 week

Static components that only need HTML + CSS:

- [ ] **avatar** — User/product avatars
- [ ] **chip** — Tags and badges
- [ ] **notification_badge** — Notification badges
- [ ] **product_avatar** — Product-specific avatars
- [ ] **product_chip** — Product tags
- [ ] **progress_bar** — Progress indicators
- [ ] **rating_distribution_bar** — Rating visualizations
- [ ] **spin_loader** — Loading spinners
- [ ] **star_rating** — Star ratings
- [ ] **status_badge** — Status indicators
- [ ] **link** — Styled links
- [ ] **breadcrumbs** — Navigation breadcrumbs

**Deliverables**:
- Create `/shared/components/templates/` directory
- One `.html` file per component showing all variants
- Add to documentation with usage examples

### 3.2 Moderate Complexity (Minimal Interactivity)
**Timeline**: 2 weeks

Components needing basic show/hide or state toggling:

- [ ] **accordion** — Collapsible content sections
- [ ] **button_group** — Button groupings (mostly CSS)
- [ ] **content_card** — Content card layouts
- [ ] **control_button** — Icon-based controls
- [ ] **icon_button** — Icon-only buttons
- [ ] **index_nav** — Index/tab navigation
- [ ] **inset_card** — Inset card variants
- [ ] **pagination** — Pagination controls
- [ ] **tab** — Tab navigation
- [ ] **tooltip** — Tooltips

**Deliverables**:
- HTML templates with data-attributes for state
- Optional: Vanilla JS helpers for interactivity
- Document both static and interactive usage

### 3.3 Complex Components (Rich Interactivity)
**Timeline**: 3-4 weeks

Components requiring JavaScript for full functionality:

- [x] **combobox** — Searchable select/autocomplete input ✅ Complete (April 22, 2026)
- [ ] **dropdown_menu** — Dropdown menus
- [ ] **form** — Form components (inputs, textareas, selects, validation)
- [ ] **media_carousel** — Media carousels
- [ ] **modal** — Modal dialogs
- [ ] **notification** / **toast** — Toast notifications
- [ ] **popover** — Popover overlays
- [ ] **slide_out_panel** — Side panels
- [ ] **table** — Table components (sorting, filtering)

**Approach Options**:

1. **Vanilla JS**: Lightweight, no dependencies
2. **Alpine.js**: Minimal framework for interactivity (~15KB)
3. **Hybrid**: Static HTML + optional JS enhancement

**Recommendation**: Start with Vanilla JS helpers, evaluate Alpine.js if patterns become repetitive.

**Deliverables**:
- HTML templates
- JavaScript component modules (`elevate-components.js`)
- Accessibility (ARIA) compliance
- Documentation with initialization code

---

### 3.4 Page-Level Navigation Components 📋 NEXT
**Timeline**: 3-4 weeks
**Status**: Audit phase

Page-level compositions that combine multiple primitives (buttons, icons, dropdowns, links) into full navigation systems matching G2 production. Unlike design system primitives (Phase 3.1-3.3), these are **page-level structures** specific to G2.com.

**Source of truth**: UE production source code (not DESIGN.md — discrepancies documented in audits)

#### G2.com Navigation (Topbar)
**Audit**: [G2_NAVIGATION_AUDIT.md](./G2_NAVIGATION_AUDIT.md)
**Source**: `engines/web_style/app/views/web_style/header/` + `webpack/assets/stylesheets/components/_topnav.scss`

The global navigation bar appearing on every g2.com page. Requires templates for three distinct user states and multiple sub-components:

**Core Structure**:
- [ ] **topbar-logged-out** — G2 logo, search, nav links, mega menu triggers, "For Vendors" dropdown, wishlist pin, "Join or Sign In" CTA
- [ ] **topbar-logged-in-buyer** — Same as above but replaces sign-in CTA with: Write Review CTA, profile avatar dropdown
- [ ] **topbar-logged-in-seller** — Same as buyer but with conditional admin CTA replacing Write Review when user has vendor_id

**Sub-components** (shared across states):
- [ ] **mega-menu** — Software/Services category browser (2-column: parent categories left, subcategories right, Turbo-frame-style lazy loaded)
- [ ] **vendor-dropdown** — "For Vendors" hover menu (Vendor, Sales, Services, Invest, Developers with sub-headings)
- [ ] **profile-dropdown** — Logged-in user menu (avatar, name, industry/company, member since, 8 nav items with pictogram icons, vendor admin conditional, sign out)
- [ ] **mobile-nav** — Off-canvas hamburger menu (drilldown pattern: Home, Write Review, Browse categories, My Profile section with user-state-aware items)
- [ ] **search-bar** — Rounded search input (hidden mobile, visible medium+)

**Key specs** (from production SCSS):
- Height: 72px, Logo: 52px, Nav links: 15px/semibold
- Background: white, border-bottom: midnight-40
- Hover: blue-10 background, midnight text
- Breakpoints: xlarge (desktop nav visible), xxlarge (services + vendor + deals visible)
- z-index: 99

**Dependencies**: dropdown_menu (Phase 3.3), icon_button (✅ complete), search_input (✅ complete), avatar (✅ complete), chip (✅ complete)

#### My G2 Navigation
**Audit**: [MY_G2_NAVIGATION_AUDIT.md](./MY_G2_NAVIGATION_AUDIT.md)
**Source**: Multiple — `app/components/users/profile/`, `app/view_models/vendor_admin/`, `engines/teams/app/components/`

"My G2" is actually three distinct navigation systems for different user types on the `my.g2.com` subdomain:

**Variant A: Buyer Profile Sidebar** (`g2.com/users/:id`)
- [ ] **buyer-profile-sidenav** — Vertical sidebar tab navigation
  - Tabs: Activity Center, Profile Details, Reviews, Products, Q&A, My Lists, Achievements, My Rewards, Notifications, Settings
  - Sub-tabs expand per section (e.g., Settings → Privacy Settings, Account)
  - Different defaults: own profile (Activity Center) vs viewing others (Profile Details)
  - Tab visibility gated by `Users::Profile::GenerateTabs` permission logic
  - Mobile: horizontal tab bar variant
- [ ] **buyer-profile-mobile-nav** — Mobile-responsive version of the sidebar

**Variant B: Vendor Admin Dashboard** (`my.g2.com/:product_id/`)
- [ ] **vendor-admin-headnav** — Top header bar with product switcher dropdown, search, invite teammate, report card, support menu, notifications bell, user avatar menu
- [ ] **vendor-admin-sidenav** — Collapsible left sidebar (expanded/collapsed states)
  - Top-level sections: Home, Profile, Review Management, Buyer Activity, Advertising, Marketing Content, Analytics, Integrations, Market Intelligence, ROI, Account, Sales Call Brief
  - Each section has nested sub-items gated by subscription level and feature flags
  - Collapsed state shows icons only; expanded shows icon + label
- [ ] **vendor-admin-product-switcher** — Dropdown to switch between managed products

**Variant C: Teams Portal** (`my.g2.com/organizations/:id/`)
- [ ] **teams-portal-sidenav** — Icon-based sidebar navigation
  - Items: Users, Groups, Products, SSO, OAuth Apps, Resources
  - Each item has icon + label
- [ ] **teams-portal-headnav** — Organization-level header

**User Type Mapping**:
| User Type | Navigation Variant | Location |
|---|---|---|
| Buyer (own profile) | Buyer Profile Sidebar (full tabs) | g2.com/users/~ |
| Buyer (viewing other) | Buyer Profile Sidebar (limited tabs) | g2.com/users/:id |
| Seller/Vendor Admin | Vendor Admin Headnav + Sidenav | my.g2.com/:product_id/ |
| Organization Admin | Teams Portal Headnav + Sidenav | my.g2.com/organizations/:id/ |

**Dependencies**: icon_button (✅), avatar (✅), tab (✅), accordion (✅), tooltip (✅), dropdown_menu (Phase 3.3), breadcrumbs (✅), link (✅)

**Approach**: Build each variant as independent HTML template sets. Use data attributes for state toggling (expanded/collapsed, active tab). Include both desktop and mobile-responsive versions.

**Deliverables**:
- Audit documents (detailed source-code-level analysis) — 📋 In Progress
- HTML templates in `/components/templates/navigation/`
- CSS for navigation-specific styling (not covered by elevate.css)
- Vanilla JS for interactions (mega menu, mobile nav, sidebar collapse)
- Documentation with user-type-to-navigation mapping
- Demo page sections showing each variant

---

## Phase 4: Integration & Polish 🎯 FUTURE

**Objective**: Make the library production-ready and easy to adopt

### 4.1 Developer Experience
- [ ] Create component starter templates
- [ ] Build live component sandbox (like Elevate Lookbook)
- [ ] Add copy-paste code snippets to all docs
- [ ] Create project scaffolding script for new epics
- [ ] **Standardize component template pages** — Add consistent navigation back to component library (elevate-demo.html) from all template pages (e.g., `/templates/complex/slide-out-panel.html`). Apply consistent page styling and navigation pattern across all template documentation pages.

### 4.2 Quality & Compliance
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing
- [ ] Performance optimization (CSS minification, icon sprite sheet)

### 4.3 Documentation
- [ ] Video walkthroughs for complex components
- [ ] Migration guide from Tailwind or other frameworks
- [ ] Pattern library showing common UI patterns (dashboards, forms, etc.)
- [ ] Troubleshooting guide

**Timeline**: 2-3 weeks

---

## Phase 5: Advanced Features ⏭️ OPTIONAL

**Objective**: Extend beyond UE Elevate for Chicago Labs-specific needs

### Potential Additions
- [ ] **Charts & Data Visualization** — D3.js or Chart.js integration
- [ ] **Animation utilities** — CSS transitions and entrance effects
- [ ] **Layout templates** — Dashboard, landing page, form flows
- [ ] **Dark mode support** — Token overrides for dark theme
- [ ] **Responsive utilities** — Breakpoint helpers beyond Elevate defaults

**Decision Point**: Evaluate based on actual exploration needs after Phase 3-4

---

## Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Foundation | Complete | ✅ |
| Phase 2: Icon System | Complete | ✅ |
| Phase 3.1: Simple Components | Complete | ✅ |
| Phase 3.2: Moderate Components | Complete | ✅ |
| Phase 3.3: Complex Components | 3-4 weeks | 🔄 |
| Phase 3.4: Navigation Components | 3-4 weeks | 📋 Audit |
| Phase 4: Integration & Polish | 2-3 weeks | 🎯 |
| Phase 5: Advanced Features | TBD | ⏭️ |

**Total Estimated Timeline**: 10-13 weeks for full library (Phases 1-4)

---

## Success Metrics

**Adoption**:
- All new explorations use Elevate components (not custom CSS)
- Reduction in time-to-prototype for new epics

**Quality**:
- 1:1 visual fidelity with UE production designs
- Zero accessibility violations in automated tests
- Components work across all modern browsers

**Velocity**:
- Designers can build functional prototypes without engineering help
- Component reuse rate >80% across explorations

---

## Decision Log

### Why not just use the UE Elevate Lookbook directly?
The Lookbook is Rails ViewComponents requiring a running UE instance. This library provides:
- Static HTML for fast iteration
- No server/build step required
- Easy to host on Vercel/Netlify
- Portable across projects

### Why vanilla HTML instead of React/Vue components?
- Faster to prototype (no build tooling)
- Lower barrier for designers
- Easy to view source and copy patterns
- Can be lifted into React/Vue later if needed

### Why not use a CSS framework like Tailwind?
We are! Elevate already uses Tailwind under the hood, and we're reusing those utilities (`elv-flex`, `elv-p-4`, etc.). This library is essentially "Elevate-flavored Tailwind + component templates."

---

## Component Development Workflow

When adding a new component to the library, follow this process:

### 1. Research Phase
- [ ] Read DESIGN.md section for component specifications
- [ ] Check Elevate Lookbook for visual reference
- [ ] Identify all variants and states needed
- [ ] Note any accessibility requirements

### 2. Build Phase
- [ ] Create template file in `/shared/components/templates/[category]/`
- [ ] Follow naming convention: `component-name.html`
- [ ] Use search-input.html as structural template
- [ ] Include all variants and states
- [ ] Add code snippets for each pattern
- [ ] Link to DESIGN.md and Lookbook

### 3. Demo Page Integration ⚡️ **REQUIRED**
- [ ] Update `/shared/components/elevate-demo.html`
- [ ] Add component section with representative examples
- [ ] Show key states (default, focus, error, disabled)
- [ ] Add CSS for component (inline in demo or external)
- [ ] Add JavaScript if component has interactions
- [ ] Link to full component template for details

**Why demo page matters:**
- Human-readable preview for design team
- Quick visual reference without opening individual templates
- Validates components work together
- Central testing ground for consistency

### 4. Documentation Phase
- [ ] Update COMPONENT_PROGRESS.md with completion status
- [ ] Add component to ELEVATE_COMPONENTS.md (if applicable)
- [ ] Include specs table in component template
- [ ] Document accessibility requirements

### 5. Commit & Ship
- [ ] Git add component files
- [ ] Write descriptive commit message
- [ ] Push to GitHub
- [ ] Update Next Actions if needed

### Template Structure Standard

Every component template should include:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Component Name</title>
  <link rel="stylesheet" href="../../../tokens/elevate.css">
  <link rel="stylesheet" href="../../elevate.css">
  <!-- Add Material Symbols if needed -->
  <style>
    /* Component-specific CSS */
  </style>
</head>
<body>
  <!-- Header with links to Lookbook & DESIGN.md -->
  
  <!-- Section 1: Default variant -->
  <!-- Section 2: Size variants -->
  <!-- Section 3: State variants (focus, error, disabled) -->
  <!-- Section 4: Accessibility notes -->
  <!-- Section 5: Specs table -->
  
  <script>
    /* Minimal JavaScript if needed */
  </script>
</body>
</html>
```

### Time Estimates by Component Type

| Type | Estimate | Example |
|------|----------|---------|
| Simple (no JS) | 30-60 mins | status_badge, chip |
| Moderate (minimal JS) | 1-2 hrs | text_input, accordion |
| Complex (rich JS) | 2-4 hrs | select, modal, table |

**Include demo page update in these estimates** — add 15-20 mins per component.

---

## Next Actions

1. ✅ **Continue icon port** — Let the agent complete the icon library
2. ✅ **Phase 3.1-3.2** — All simple and moderate components complete
3. 🔄 **Phase 3.3** — Complete remaining complex components (dropdown_menu, popover, notification/toast)
4. 📋 **Phase 3.4 Audits** — G2.com Navigation and My G2 Navigation audits in progress
5. 📋 **Phase 3.4 Build** — Build navigation templates after audits complete (depends on dropdown_menu from 3.3)

---

## Questions & Open Items

- **Q**: Should we version this library or just track with UE Elevate versions?
- **Q**: Do we need a build step (CSS minification, icon sprites) or keep it fully static?
- **Q**: Should complex components have a Progressive Enhancement strategy (work without JS)?
- **Q**: What's the process for contributing new components not in UE Elevate?

