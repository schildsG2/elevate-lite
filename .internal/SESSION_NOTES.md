# Session Notes — Navigation Components (April 30, 2026)

## Key Decisions

- **Source of truth**: Production UE source code, NOT DESIGN.md. Known discrepancies: DESIGN.md says nav height 92px/logo 56px, actual SCSS is 72px/52px.
- **MyG2 collapsed logo**: Same `myg2_logo.svg` SVG, CSS-cropped via `overflow: hidden` container (width: 30px, image right-aligned). NOT a separate icon — it's the full wordmark with only the rightmost G2 mark visible.
- **Vendor admin sidenav**: Navy bg is `#062846`. Collapsed 72px, expanded 240px. Transition: `0.5s cubic-bezier(0.86, 0, 0.07, 1)`. Category row height 48px. Highlight: `rgba(255,255,255,0.15)`.
- **Sub-section headers** in sidenav use: `color: #62788b`, `font-size: 11px`, `font-weight: 600`, `text-transform: uppercase`, border-bottom `1px solid #62788b`. Border starts at text indent (margin-left: 72px), not full width.

## Project Structure

- **Repos with elevate-lite**: `g2-activate-prototype` (submodule), `chicago-labs-explorations` (submodule). Testing repos were deleted.
- **Navigation templates live at**: `components/templates/navigation/`
- **Navigation icons copied from UE**: `icons/` (home-new, profile, chat-box, line-chart, marketing, layers, analytics-chart, puzzle, bar-chart-head, user, new-tab, chevron-thin)
- **Logos**: `assets/logos/myg2-logo-white.svg` (white wordmark for navy bg), `assets/logos/g2-icon-brand.svg` (rorange circle mark), `assets/logos/example-product-logo.svg` (green hex demo logo)

## Navigation Source Locations in UE

| Component | UE Source |
|---|---|
| G2 topbar | `engines/web_style/app/views/web_style/header/_topbar.html.slim` |
| Topbar SCSS | `webpack/assets/stylesheets/components/_topnav.scss` |
| Mobile nav | `engines/web_style/app/views/web_style/header/_mobile_nav.html.slim` |
| Vendor admin headnav | `app/components/vendor_admin/headnav/headnav_component.html.slim` |
| Headnav SCSS | `webpack/assets/stylesheets/components/_headnav.scss` |
| Vendor admin sidenav | `app/views/vendor_admin/header/_sidenav.html.slim` |
| Sidenav SCSS | `webpack/assets/stylesheets/components/_sidenav.scss` |
| Nav categories | `app/view_models/vendor_admin/navigation/features/categories/*.rb` |
| Nav features | `app/view_models/vendor_admin/navigation/features/*.rb` |
| Nav titles (i18n) | `config/locales/vendor_admin.en.yml` → `vendor_admin.navigation.*` |
| Buyer profile tabs | `app/domain/users/profile/sidebar_tabs.rb` + `generate_tabs.rb` |
| Teams portal nav | `engines/teams/app/components/teams/navigation/sidenav_component.rb` |

## Vendor Admin Nav Tree (Production-Accurate)

1. Home (no children)
2. Product Profile → Product Information, Packages & Pricing, Features, Discussions, AI Sales Agent, Expertise, G2 Deals, Downloads, Interactive Demo, Integrations, **[Media Gallery]** Screenshots, Videos
3. Reviews → **[Review Performance]** Review Activity, Review Campaigns | **[Get Reviews]** Generate Reviews from your Site, Review Campaigns, In-App Reviews, Multi-Product Campaigns, AI Assisted Review Collection | **[Review Tools]** Respond to Reviewers, References from Reviews, Add Custom Questions
4. Buyer Activity → Track Your Prospects, Profile Visitors, **[Buyer Intent]** Your Signals, Notifications | **[Leads]** Leads Activity, Lead Form, Lead Emails, CTA Settings
5. G2 Advertising → Manage Ads, PPC Analytics
6. Marketing Content → Report Library, Content Studio, G2 Badges, Grant Permission, Documents, Reference Pages, Crowd Quotes, **[Widgets]** Grid® Widget, Star Rating Widget, Testimonials, Review Snapshot Widget
7. Analytics → G2 Profile Activity, Competitors, Insight Reports, AI Search Visibility
8. Integrations → Integration Hub, Performance Analytics, API Tokens & Apps
9. Market Intelligence → Category Overview, Traffic Analytics, Satisfaction, Win Loss, Pricing and Contracting
10. ROI → Performance Analytics
11. Account → Subscription & Packages, Admin Users, Single Sign On, Payments, Documentation
12. View product on G2.com (external link, bottom)

## Remaining Work (Tier 2-3)

- **dropdown_menu** component (Phase 3.3) — gates: profile dropdown, mega menus, vendor dropdown, product switcher panels
- G2 topbar logged-in buyer/seller states (needs dropdown_menu)
- Vendor admin headnav dropdown panels (product switcher, support, user menu)
- Mobile nav refinement
- Mega menu (Software/Services category browser)

## Quirks & Gotchas

- G2 topbar pin button: Elevate `IconButton` `primary_inverted` `sm` — white bg, 1px #cacace border, 24px radius, hover gets box-shadow
- Mobile off-canvas: opens from RIGHT side, "Close Menu" text at bottom is transparent until hovered
- Headnav height is 60px (not 72px like the topbar)
- Headnav transforms by sidenav width: `translateX(72px)` collapsed, `translateX(240px)` expanded
- The `bar-chart-head` icon SVG uses `stroke="#FFF"` hardcoded (not currentColor) — works on navy but won't adapt to other backgrounds
