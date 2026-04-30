# My G2 Navigation Audit

## Overview

"My G2" is not a single navigation system in production. It is a family of three distinct nav patterns that serve different user types, different route spaces, and different product surfaces:

1. **Buyer Profile Navigation** — the user-profile sidebar/tab system used on `g2.com/users/:id`
2. **Vendor Admin Navigation** — the seller dashboard nav used on `my.g2.com/:product_id/`
3. **Teams Portal / Organization Navigation** — the org-admin nav used on `my.g2.com/organizations/:id/`

For Elevate Lite, these must be treated as **three separate static HTML targets**, not one reusable shell with light copy swaps. Their layouts, information architecture, responsive behavior, and gating logic are materially different.

This audit follows the same high-level structure as existing component audits and is organized to support recreation as static HTML + CSS without guessing from design docs.

### User Type → Navigation Mapping Table

| User Type | Where They See This | Primary Nav | Secondary Nav |
|---|---|---|---|
| Logged-in Buyer (viewing own profile, no vendor products required) | `g2.com/users/:id` | Buyer Profile Sidebar | Tab content / parent-tab pill navbar |
| Logged-in Seller / product admin (`vendor_id` / scoped role) | `my.g2.com/:product_id/` | Vendor Admin Sidebar + Headnav | Feature pages / flyouts / panel nav |
| Organization Admin / org member using teams portal | `my.g2.com/organizations/:id/` | Teams Portal Sidenav + Headnav | Settings / panel content |
| Viewing another user's profile | `g2.com/users/:id` | Limited Buyer Profile Sidebar | Public tabs only |
| Observer / internal observer in seller tools | `my.g2.com/:product_id/` | Vendor Admin Sidebar + Headnav | Observer-only utilities / Sales Call Brief when enabled |
| Multi-product org dashboard user | `my.g2.com/organizations/:id/executive_summary` | Organization Admin nav rendered through vendor-admin shell | Executive Summary pages |

### Route → Navigation Variant Mapping

Production routing does **not** put all three under the same route file.

| Route Space | Route File | Navigation Variant | Notes |
|---|---|---|---|
| `g2.com/users/:id` | `/Users/schilds/projects/ue/config/routes/www.rb` | Buyer Profile Navigation | Public/main-site profile route, not actually under `my.g2.com` |
| `my.g2.com/:product_id/...` | `/Users/schilds/projects/ue/config/routes/my.rb` | Vendor Admin Navigation | Product-scoped seller dashboard |
| `my.g2.com/organizations/:id/...` (teams portal endpoints like api_tokens, product_mappings, analytics) | `/Users/schilds/projects/ue/config/routes/my.rb` with `module: :teams_portal` | Teams Portal Navigation | Org/team management surface |
| `my.g2.com/organizations/:id/executive_summary` and `quarterly_summary` | `/Users/schilds/projects/ue/config/routes/my.rb` with `module: :multi_product` | Organization Admin Navigation inside vendor-admin shell | Reuses vendor-admin layout shell but with org-admin nav list |

### Production Source Files Reviewed

#### Format references
- `/Users/schilds/projects/elevate-lite/.internal/MODAL_AUDIT.md`
- `/Users/schilds/projects/elevate-lite/.internal/SLIDE_OUT_PANEL_AUDIT.md`

#### Buyer Profile Navigation
- `/Users/schilds/projects/ue/app/domain/users/profile/sidebar_tabs.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/generate_tabs.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/base.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/activity_center.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/profile_details.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/my_reviews.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/products_used.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/community_qa.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/my_lists.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/achievements.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/my_rewards.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/notifications.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/privacy_settings.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/account.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/vendor_admin.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/my_answers.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/saved_reviews.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/saved_compares.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/tabs/my_drafts.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/parent_tabs/base.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/parent_tabs/reviews.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/parent_tabs/products.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/parent_tabs/qa.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/parent_tabs/settings.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/allowed_tabs/base.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/allowed_tabs/my_lists.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/allowed_tabs/my_rewards.rb`
- `/Users/schilds/projects/ue/app/domain/users/profile/allowed_tabs/products_used.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/sidenav_component.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/sidenav_component.html.slim`
- `/Users/schilds/projects/ue/app/components/users/profile/tab_factory_component.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/tab_factory_component.html.slim`
- `/Users/schilds/projects/ue/app/components/users/profile/tab_base_component.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/tab_base_component.html.slim`
- `/Users/schilds/projects/ue/app/components/users/profile/parent_tab_component.rb`
- `/Users/schilds/projects/ue/app/views/users/tabs/_sidebar_list.html.slim`
- `/Users/schilds/projects/ue/app/views/users/_mobile_nav.html.slim`
- `/Users/schilds/projects/ue/app/views/users/_mobile_nav_link.html.slim`
- `/Users/schilds/projects/ue/app/views/users/tabs/_tab_navbar.html.slim`
- `/Users/schilds/projects/ue/app/views/layouts/users/profile.html.slim`
- `/Users/schilds/projects/ue/app/domain/users/profile_access.rb`
- `/Users/schilds/projects/ue/app/domain/user_settings.rb`
- `/Users/schilds/projects/ue/app/controllers/users_controller.rb`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_mobile_nav.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_tab_navbar.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/extensions/_sidebar_menu.scss`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/activatable.js`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/mobile_nav.js`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/mobile_nav.widget.js`

#### Vendor Admin Navigation
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/sidenav/view.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/starter_list.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/list.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/panel_list.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/features/base.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/features/category_base.rb`
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/features/categories/*.rb` (reviewed through exploration)
- `/Users/schilds/projects/ue/app/view_models/vendor_admin/navigation/features/*.rb` (reviewed through exploration)
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/headnav_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/headnav_component.rb`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/menu_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/menu_component.rb`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/dropdown_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/user_menu_container_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/user_menu_container_component.rb`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/notifications_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/notifications_component.rb`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/support_menu_container_component.html.slim`
- `/Users/schilds/projects/ue/app/components/vendor_admin/headnav/support_menu_container_component.rb`
- `/Users/schilds/projects/ue/app/views/vendor_admin/header/_sidenav.html.slim`
- `/Users/schilds/projects/ue/app/views/vendor_admin/header/_sidenav_myg2.html.slim`
- `/Users/schilds/projects/ue/app/views/vendor_admin/header/_nav_feature.html.slim`
- `/Users/schilds/projects/ue/app/views/vendor_admin/header/_myg2_nav_feature.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_sidenav.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_sidenav-myg2.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_headnav.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/vendor_admin_assets.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/utilities/_vendor_admin_overrides.scss`

#### Teams Portal / Organization Navigation
- `/Users/schilds/projects/ue/app/components/teams_portal/navigation/sidenav_component.rb`
- `/Users/schilds/projects/ue/app/components/teams_portal/navigation/sidenav_component.html.slim`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/sidenav_component.rb`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/sidenav_component.html.slim`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/headnav_component.rb`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/headnav_component.html.slim`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/sidenav_pane_component.rb`
- `/Users/schilds/projects/ue/engines/teams/app/components/teams/navigation/sidenav_pane_component.html.slim`
- `/Users/schilds/projects/ue/app/view_models/organization_admin/navigation/list.rb`
- `/Users/schilds/projects/ue/app/view_models/organization_admin/navigation/features/executive_summary.rb`
- `/Users/schilds/projects/ue/app/views/layouts/vendor_admin/skeleton.html.slim`
- `/Users/schilds/projects/ue/engines/teams/app/views/layouts/teams/elevate.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_topnav.scss`
- Relevant shared vendor-admin shell styles from `_sidenav-myg2.scss` and `_headnav.scss`

### Shared Production Token Values Referenced in This Audit

From `/Users/schilds/projects/ue/webpack/assets/stylesheets/_branding.scss` and `/Users/schilds/projects/ue/webpack/assets/stylesheets/_variables.scss`:

| Token | Value |
|---|---|
| `branding-color('rorange')` | `#ff492c` |
| `branding-color('midnight')` | `#252530` |
| `branding-color('navy')` | `#062846` |
| `branding-color('purple')` | `#5a39a2` |
| `branding-font` | `Figtree, sans-serif` |
| `$fw-regular` | `400` |
| `$fw-semibold` | `600` |
| `$text-tiny` | `12px` |
| `$text-small` | `14px` |
| `$text-normal` | `16px` |
| `$global-margin` | `12px` |
| `$global-padding` | `24px` |
| `$icon-size-large` | `32px` |
| `$icon-size-medium` | `24px` |
| `$icon-size` | `16px` |

---

## Visual Specifications

### Variant A — Buyer Profile Navigation

#### Core layout shell

The buyer-profile nav sits inside the user profile layout at `/Users/schilds/projects/ue/app/views/layouts/users/profile.html.slim`.

Layout structure:

- Outer page shell: `.page.page--base.mt-2`
- Main grid: `.grid.grid-cols-12.gap-7`
- Left column: `.col-span-12.xl:col-span-3`
- Sidebar card wrapper: `.rounded.p-5.shadow-md.bg-white.mb-6`
- Divider above nav: `.border-t.border-midnight-20.mt-2.mb-2`

Interpretation for static HTML:

- On desktop/xl, the sidebar occupies a 3-column region beside 9-column content.
- On smaller screens, the sidebar and main content stack vertically.
- The nav is visually embedded inside a white card with rounded corners, 20px-ish shadow token styling, and 24px internal padding (`p-5` in this utility system).

#### Desktop sidebar list

Desktop markup comes from:

- `/Users/schilds/projects/ue/app/components/users/profile/sidenav_component.html.slim`
- `/Users/schilds/projects/ue/app/views/users/tabs/_sidebar_list.html.slim`
- `/Users/schilds/projects/ue/app/components/users/profile/tab_base_component.html.slim`

Structure:

- `div ue=:activatable data={ activatable: { class_name: 'active', param: 'tab' } }`
- `.show-for-large`
- `ul.vertical.menu.menu--sidebar.mb-1`
- each tab rendered as `li > a.menu__link--sidebar.menu__link--background-highlight`

Visual treatment of each desktop tab:

| Element | Class / rule | Effect |
|---|---|---|
| nav list | `.menu--sidebar` | sidebar-style text sizing and vertical spacing |
| link | `.menu__link--sidebar` | midnight text, regular font-weight |
| link | `.menu__link--background-highlight` | adds active background treatment |
| active link | `.menu__link--background-highlight.active` | purple-10 background, 24px radius, purple text, semibold |
| icon in active row | `.active .menu__link--icon` | icon turns purple |
| icon default | `.menu__link--icon` | visually muted compared with active state |

Exact active-state rule from `_sidebar_menu.scss`:

- `background-color: branding-color('purple', 10)`
- `border-radius: 24px`
- `color: branding-color('purple')`
- `font-weight: 600`

That means the selected buyer-profile tab is **not** a left-border rail or underline. It is a **rounded purple pill-row background** with purple icon/text.

#### Desktop spacing and typography

From `_sidebar_menu.scss`:

- Sidebar links use `$text-normal` = `16px`
- Vertical padding = `$global-padding / 4` = `6px`
- Top-level highlighted links remove left/right padding inherited from generic menu list via `.menu > li > .menu__link--background-highlight { padding-left: 0; padding-right: 0; }`

From `tab_base_component.html.slim`:

- Actual content row wrapper: `.flex.items-center.px-2`
- Icon spacing: `.mr-1/4`
- Icon class: `medium menu__link--icon`

Interpretation:

- Text and icon are aligned center vertically.
- The colored pill sits around a row with extra horizontal inset.
- The perceived click target is wider than the text label.

#### Buyer tab icons

From `Users::Profile::Tabs::Base::ICONS`:

| Tab | Icon |
|---|---|
| `achievements` | `achievement-medal` |
| `activity_center` | `dashboard` |
| `community_qa` | `qa-chat` |
| `my_lists` | `pin` |
| `profile_details` | `profile-details` |
| `my_rewards` | `cash` |
| `my_reviews` | `review-star` |
| `notifications` | `notification` |
| `privacy_settings` | `gear-thin` |
| all other unmapped tabs | `laptop` fallback |

Important consequence for Elevate Lite:

- Parent tabs such as **Products**, **Settings**, and any tab lacking a direct mapping often resolve to `laptop` unless overridden by parent-tab classes.
- Parent tabs do override icons in parent-tab definitions:
  - Reviews → `review-star`
  - Products → `laptop`
  - Q&A → `qa-chat`
  - Settings → `gear-thin`

#### “New” badge behavior

`TabBaseComponent` defines:

- `NEW_TAB = 'my_lists'`

When the nav row is for `my_lists`, the component renders:

- `.sidebar__new-tag`

From `_sidebar.scss`:

- background-color: `branding-color('purple')` = `#5a39a2`
- border-radius: `12px`
- text color: white
- font-size: `$text-tiny` = `12px`
- absolute position: `left: -40px`, `top: -12px`
- padding: `$global-padding / 4` = `6px`

This is a floating badge that sits above/left of the nav label cluster rather than inline like a chip.

#### Mobile nav presentation

Mobile markup comes from `/Users/schilds/projects/ue/app/views/users/_mobile_nav.html.slim` and `_mobile_nav_link.html.slim`.

Structure:

- `.hide-for-large.mobile-nav`
- `.mobile-nav__icon.js-expand-nav`
- hamburger icon `inline_icon 'hamburger', class: 'medium'`
- `ul.mobile-nav__list`
- each item: `li.mobile-nav__item`

From `_mobile_nav.scss`:

| Class | Computed behavior |
|---|---|
| `.mobile-nav` | bordered container using light gray border |
| `.mobile-nav__list` | list with left margin equal to icon column width |
| `.mobile-nav__icon` | fixed left column matching item height |
| `.mobile-nav__item` | hidden by default: `height: 0`, `overflow: hidden` |
| `.mobile-nav__item.is-active` | visible and highlighted |
| `.mobile-nav--expanded .mobile-nav__item` | all items expanded |

Computed values:

- `$mobile-item-height = $icon-size-large + rem-calc(10)`
- `$icon-size-large = 32px`
- therefore item height is approximately `42px`
- hover/active background = `rgba(#2c98bb, 0.07)`

Mobile item styling:

- link fills full width
- link padding: `$global-padding / 2 $global-padding` = `12px 24px`
- active item text turns black and becomes non-cursor-looking (`cursor: default`)

Interpretation:

- Mobile nav is a compact accordion/dropdown list, not a slide-out drawer.
- Only the active item is visible when collapsed.
- Tapping the hamburger or the active item toggles full expansion.

#### Parent-tab pill navbar

When a parent tab has more than one child (`tab.children_tabs.size > 1`), production renders a second-level pill navbar from `_tab_navbar.html.slim`.

Visible only on desktop:

- `.tab-navbar__wrapper.show-for-large`

From `_tab_navbar.scss`:

| Class | Effect |
|---|---|
| `.tab-navbar__wrapper` | purple-5 background, 24px radius, top margin 12px, bottom margin 24px |
| `.tab-navbar__button__tab` | white background, no border, midnight text, semibold |
| `.tab-navbar__button__tab--unselected` | regular weight, small text |

Computed values:

- wrapper background = `branding-color('purple', 5)`
- border radius = `24px`
- vertical padding = `$global-padding / 3` = `8px`
- button horizontal margins = `$global-margin / 2` = `6px`

Selected sub-tab button classes in template:

- `btn--rounded shadow text-sm px-1 py-1/4 tab-navbar__button__tab pjax`

Unselected sub-tab button classes:

- `btn--rounded btn--hollow bg-purple-5 text-sm px-1 py-1/4 tab-navbar__button__tab pjax`

Interpretation:

- Parent-tab navigation is visually distinct from the sidebar.
- Sidebar chooses the major section; pill navbar chooses the child within that section.

#### Color summary for Buyer Profile Navigation

| Usage | Source token / value |
|---|---|
| active tab background | `branding-color('purple', 10)` |
| active tab text/icon | `branding-color('purple')` = `#5a39a2` |
| default text | `branding-color('midnight')` = `#252530` |
| card background | white |
| parent-tab bar background | `branding-color('purple', 5)` |
| mobile hover/active wash | `rgba(44, 152, 187, 0.07)` |

#### Responsive summary for Buyer Profile

| Breakpoint / context | Behavior |
|---|---|
| desktop / `show-for-large` | full sidebar list visible; mobile nav hidden |
| mobile / `hide-for-large` | sidebar list hidden; mobile dropdown nav visible |
| xl layout | sidebar in left column, main content in right column |
| smaller widths | stacked layout |

### Variant B — Vendor Admin Navigation

#### Core shell

Vendor Admin is a **compound nav system**, not a simple sidebar:

1. **Fixed top headnav**
2. **Left sidenav**, which exists in two production modes:
   - classic collapsible sidenav (`_sidenav.html.slim` + `_sidenav.scss`)
   - panel / "My G2" sidenav (`_sidenav_myg2.html.slim` + `_sidenav-myg2.scss`)

The top bar remains present regardless of which left-nav style is active.

#### Headnav visual system

From the reviewed vendor-admin headnav components and agent-confirmed template structure:

- fixed top bar
- height: `60px`
- white background
- left section contains product switcher dropdown
- right section contains search, action icons, notifications, support, user menu

From `_headnav.scss` / source-derived measurements:

| Element | Value |
|---|---|
| headnav height | `60px` |
| product dropdown menu width | `428px` |
| support menu width | `177px` |
| user menu width | `160px` |
| notifications menu width | `400px` |
| notifications menu max height | `560px` |
| notifications scrollbox max height | `506px` |
| icon hit area | `40px × 40px` or `52px × 52px` depending on item variant |
| menu radius | `8px` |
| menu shadow | `3px 5px 9px 6px rgba(0, 0, 0, 0.1)` |

Headnav right-side cluster includes:

- quick search
- invite teammate icon (except organization pages)
- report card icon (conditional)
- support menu
- notifications bell
- user avatar menu

Notification badge:

- `14px × 14px`
- red tone `#bc2810`
- white border
- positioned top-left over the bell icon

Headnav hover/active shades use midnight tints:

- hover menu background: `branding-color('midnight', 5)`
- icon hover background: `branding-color('midnight', 10)`
- active/open icon background: `branding-color('midnight', 15)`

#### Classic sidenav visual system

From `_sidenav.scss`:

| Variable | Value |
|---|---|
| `$nav-min-width` | `72px` |
| `$nav-open-width` | `168px` |
| collapsed total visible width | `72px` |
| expanded total width | `240px` |
| `$headnav-height` | `60px` |
| `$category-height` | `48px` |
| transition duration | `0.5s` |
| transition timing | `cubic-bezier(0.86, 0, 0.07, 1)` |

Visual characteristics:

- fixed navy rail on the left (`branding-color('navy')` = `#062846`)
- icon-only collapsed state
- labels revealed in expanded state
- hover flyouts in collapsed state
- scrollable rail with thin custom scrollbar
- translucent white hover/active overlay

Key colors:

- nav background: `branding-color('navy')`
- hover highlight: `rgba(255,255,255,0.15)`
- highlighted border: `1px solid rgba(255,255,255,0.2)`
- active secondary feature background: same translucent highlight or darker `#2e4762` in new-my-g2 secondary state

Key visual sub-elements:

| Class | Purpose |
|---|---|
| `.sidenav-column` | fixed navy strip |
| `.sidenav-container` | scrollable fixed nav wrapper |
| `.sidenav` | translated content block |
| `.sidenav__sidebar` | text/label layer |
| `.sidenav__icons` | always-visible icon layer |
| `.sidenav__cell-wrapper` | item row boundary |
| `.sidenav__cell` | 48px-tall row body |
| `.sidenav__info` | label text that fades/translates in |
| `.sidenav__flyout` | hover submenu container |
| `.sidenav__tag` | small white-on-navy badge |

Expanded-state changes:

- nav width increases to `240px`
- labels fade in and translate to the right
- chevron arrow rotates
- flyouts become inline expandable sections instead of only hover popouts
- content canvas shifts right to account for wider rail

#### Panel / “My G2” sidenav visual system

From `_sidenav-myg2.scss` and source-derived template summary:

| Variable / region | Value |
|---|---|
| primary column width | `260px` |
| secondary pane width | `264px` |
| header height | `60px` |
| category row min-height | `56px` |

Visual characteristics:

- fixed navy primary column
- separate secondary pane that appears beside the primary list
- more modern, app-like information architecture than classic flyout rail
- panel header includes title + description for selected category
- feature rows can include descriptions beneath labels

Key classes:

| Class | Purpose |
|---|---|
| `.sidenav-myg2` | primary fixed column |
| `.sidenav-myg2__primary` | scrollable main column |
| `.sidenav-myg2__category` | top-level category row |
| `.sidenav-myg2__secondary` | hidden secondary pane |
| `.sidenav-myg2__secondary--active` | visible secondary pane |
| `.sidenav-myg2__feature` | feature row in secondary pane |
| `.sidenav-myg2__panel-header` | secondary-pane header |
| `.sidenav-myg2-canvas` | content area shifted right |

Secondary-pane text styling from reviewed summaries:

- panel title around `18px`, bold
- panel description around `14px`, ~75% white
- feature description around `12px`, ~65% white

#### Vendor Admin icon and badge language

Production uses a mix of:

- inline icon names such as `home-new`, `profile`, `chat-box`, `line-chart`, `layers`, `analytics-chart`, `puzzle`
- `ui-icon-*` icons rendered via Elevate-style icon component flows when applicable
- lock icons on gated items
- chevron-thin icons for expandable/flyout affordances
- observer eye icon in headnav/product context

#### Responsive summary for Vendor Admin

| Context | Behavior |
|---|---|
| classic nav, collapsed | icon rail only, labels hidden, hover flyouts do more work |
| classic nav, expanded | full 240px rail, inline expanded content |
| panel nav | fixed 260px primary column + 264px secondary pane |
| headnav | remains fixed at top; width adjusts relative to sidenav shell |
| xlarge+ | overflow rules become less scroll-heavy |

### Variant C — Teams Portal / Organization Navigation

#### Core shell

Teams Portal is simpler than Vendor Admin:

- fixed top bar
- fixed left sidenav
- no complex collapsible rail
- no deep flyout tree inside the standard teams sidebar

The organization-admin multi-product surface partially reuses vendor-admin shelling, but the teams-engine navigation itself is flatter and more admin-like.

#### Teams headnav

From teams-engine navigation summaries:

- fixed top navigation
- height: `72px`
- white background (`.topnav` styling)
- left cluster contains:
  - back arrow icon
  - G2 logo
  - “MyG2” label

Primary purpose:

- act as a return link back to the broader My G2 environment rather than a product switcher

#### Teams sidenav

From `Teams::Navigation::SidenavComponent` and `SidenavPaneComponent` summaries:

- fixed left sidebar width: `240px` (`w-60`)
- full-height layout below the `72px` headnav
- navy token classes (`bg-navy-100`) used throughout
- pane rows are `48px` tall (`h-12`)
- icon size uses Elevate icon `:lg` = roughly `24px`
- icon/text gap = `16px`

Key classes / structure:

| Class | Purpose |
|---|---|
| `.h-full-screen` | full viewport height |
| `.w-60` | 240px sidebar |
| `.position-fixed` | fixed sidenav positioning |
| `.top-[72px]` | align below topnav |
| `.flex.flex-col` | column layout |
| pane wrapper classes | row alignment and hover background |

Active state is much simpler than Vendor Admin:

- handled by Stimulus-like highlight logic (`highlight-selected`)
- active background uses `bg-navy-90`
- default background uses `bg-navy-100`
- hover uses the same or near-same highlight tone

This means the visual hierarchy is closer to a traditional admin console sidebar than a marketing-heavy seller workspace.

#### Organization Admin shell crossover

Organization-admin multi-product pages under `my.g2.com/organizations/:id/executive_summary` do **not** simply render the teams-engine flat sidebar.

Instead:

- `vendor_admin/skeleton` detects `organization_id`
- creates `OrganizationAdmin::Navigation::List`
- swaps that list into the vendor-admin sidenav rendering system

Current org-admin nav list is narrow in scope:

- Executive Summary is the primary implemented navigation item
- the nav inherits from vendor-admin nav object structure rather than teams-engine flat panes

Practical implication for Elevate Lite:

- “Teams portal nav” and “organization admin nav” are related, but they are not literally the same component.
- The teams-engine sidebar should be reproduced as the main fixed org/team admin sidebar.
- The multi-product executive-summary shell should be documented as a vendor-admin-derived org nav variant.

---

## Behavioral Specifications

### Variant A — Buyer Profile Navigation

#### Top-level tab generation

`Users::Profile::GenerateTabs` defines the canonical top-level list:

```ruby
TOP_LEVEL_TABS = %w(activity_center profile_details reviews products qa my_lists achievements my_rewards
                    notifications settings).freeze
```

These ten items are the **major navigation groups** to reproduce in Elevate Lite.

#### Allowed tab param whitelist

`Users::Profile::SidebarTabs::ALLOWED_TABS` is broader than `TOP_LEVEL_TABS` because URL params may point directly at child tabs:

```ruby
%w(
  privacy_settings account vendor_admin activity_center community_qa my_answers profile_details
  notifications achievements my_rewards my_lists products_used my_reviews saved_reviews
  saved_compares my_drafts
)
```

This is important because:

- the sidebar visually shows parent tabs like `reviews`, `products`, `qa`, `settings`
- but the active URL often points to a **child** such as `my_reviews`, `products_used`, or `privacy_settings`
- the activatable JS highlights a parent item if the active child is listed in `data-activatable-children`

#### Default-tab rules

From `SidebarTabs#default_tab`:

- own profile (`current_user == profile`) → default tab = `activity_center`
- another user’s profile → default tab = `profile_details`

This is one of the most important user-type differences in the buyer nav.

#### Own-profile vs public-profile behavior

`Tabs::Base` drives both `allowed?` and `render?`.

Key rules:

1. If the viewer can update or observe the profile, tabs are broadly available.
2. Otherwise the tab must:
   - pass the `AllowedTabs` class check (`show`)
   - and be visible in user settings via `visible?(false)` for allowed?
   - and `visible?` for render? according to public/user visibility

`visible?` checks `profile_user.user_settings.visible_to(...)`.

Visibility options:

- anonymous public viewer → `:public`
- logged-in non-owner viewer → `:public, :users`
- owner / updater / observer → can bypass with update/observe privileges

#### Access object behavior

`Users::ProfileAccess` governs who can see/edit profile surfaces.

Important methods:

- `any_viewable?`
- `can_view_basic?`
- `can_be_updated?`
- `can_be_observed?`
- `can_be_updated_or_observed?`

Consequences for nav:

- owner/updater/observer can see private/profile-maintenance tabs
- public viewers only see tabs permitted both by settings visibility and tab-specific allowed rules

#### Parent-tab behavior

Parent-tab definitions:

| Parent tab | Children |
|---|---|
| `reviews` | `my_reviews`, `saved_reviews`, `my_drafts` |
| `products` | `products_used`, `saved_compares` |
| `qa` | `community_qa`, `my_answers` |
| `settings` | `privacy_settings`, `account`, `vendor_admin` |

Parent-tab rules:

- parent is `allowed?` only if at least one child tab is allowed
- parent is `active?` if any child is active
- parent links route to first allowed child tab

This is why the sidebar can show **Reviews** while the actual page param is `my_reviews`.

#### Tab-specific gating inventory

| Tab / group | Gating rule |
|---|---|
| `activity_center` | default-true allowed tab; still subject to visibility / ownership rules |
| `profile_details` | default-true; owner sees private data, others see public data only |
| `my_reviews` | default-true; owners/observers see submitted responses, others see only public/full responses |
| `saved_reviews` | default-true |
| `my_drafts` | available only if update/observe or visible conditions permit; child of Reviews |
| `products_used` | custom `AllowedTabs::ProductsUsed`; only shown if user has a `use` stack with products |
| `saved_compares` | child of Products, no custom allowed-tabs class found, so inherits base default false unless allowed by visibility/privilege path via parent composition |
| `community_qa` | default-true |
| `my_answers` | default-true |
| `my_lists` | custom `AllowedTabs::MyLists`; only shown if follow stack has products |
| `achievements` | only if `FeatureToggles::AchievementTab.enabled?` and normal access passes |
| `my_rewards` | custom `AllowedTabs::MyRewards`; only shown if visible review incentives exist |
| `notifications` | default-true |
| `privacy_settings` | child of Settings; update/observe/private context-driven |
| `account` | child of Settings; update/observe/private context-driven |
| `vendor_admin` | child of Settings; routes to claimed products / product admin links if present |

#### AllowedTabs custom rules

Custom allowed tab objects discovered:

| Class | Rule |
|---|---|
| `AllowedTabs::MyLists` | `stack?('follow')` |
| `AllowedTabs::MyRewards` | `profile_user.review_incentives.visible_to_users.present?` |
| `AllowedTabs::ProductsUsed` | `stack?('use')` |
| `AllowedTabs::Base` | only returns true for default set: `profile_details`, `activity_center`, `achievements`, `notifications`, `saved_reviews`, `my_reviews`, `saved_compares`, `community_qa`, `my_answers` |

#### JavaScript interactions

Buyer profile navigation relies on two small widgets:

1. **Activatable** (`activatable.js`)
2. **Mobile nav toggle** (`mobile_nav.js`)

Activatable behavior:

- reads URL query param `tab`
- finds `[data-activatable-item]`
- applies configured class (`active` on desktop, `is-active` on mobile)
- if no direct match, checks `data-activatable-children`
- if still no match, falls back to `[data-activatable-default='true']`

Mobile nav behavior:

- click `.js-expand-nav` or `li.is-active a`
- prevent default
- toggle `.mobile-nav--expanded`

Meaning:

- The currently active mobile item doubles as the expansion handle.
- The buyer nav is intentionally lightweight and client-side-enhanced, not server-rebuilt for every PJAX state.

#### User-type outcomes

| User context | Expected default | Expected nav richness |
|---|---|---|
| own profile | `activity_center` | full personal management set |
| logged-in viewer on another user | `profile_details` | public + `users`-visible subset |
| anonymous viewer | `profile_details` | public-only subset |
| observer/updater | usually broad/private access | near-owner visibility |

### Variant B — Vendor Admin Navigation

#### High-level behavior

Vendor Admin navigation is generated from navigation view-model objects, not hardcoded templates.

Important layers:

- `VendorAdmin::Navigation::List` — broad/full category tree
- `VendorAdmin::Navigation::StarterList` — starter-plan-optimized top-level ordering with advertising toggle behavior
- `VendorAdmin::Navigation::PanelList` — alternate grouped nav for panel mode
- `Features::Base` and `CategoryBase` — per-item path, icon, title, active, locked, and gating logic

#### Core gating model

Based on explored source summary:

1. **Role/component gating**
   - each feature declares components or defaults to its own component name
   - item may render but show as locked if role lacks access

2. **Feature toggles**
   - `UnifiedAds`
   - `AiVisibilityDashboard`
   - `SalesCallBrief`
   - other category/item-specific toggles

3. **Plan / subscription gating**
   - starter plan checks
   - free-plan starter offering checks
   - product component access checks

4. **Observer gating**
   - some features/categories are observer-only or observer-enhanced

5. **Product-type gating**
   - software-only
   - provider-only
   - suite-only / non-suite-only

#### StarterList top-level categories

StarterList exposes these top-level sections in order:

1. Home
2. Profile
3. Review Management
4. Buyer Activity
5. Advertisements **or** Unified Ads
6. Marketing Content
7. Analytics
8. Integrations
9. Market Intelligence
10. ROI
11. Account
12. Sales Call Brief

#### Full List-only extra categories

The broader `List` adds extra categories beyond StarterList:

- AI Custom Research
- Competitive Pulse
- Selfservice Campaigns (in explored enumeration)

#### PanelList regrouping

PanelList does **not** simply mirror StarterList one-for-one.

It regroups features into broader buckets:

1. Home
2. Manage Profile
3. Reviews & Reputation
4. Demand Generation
5. Gather Social Proof
6. Insights
7. Account
8. Sales Call Brief

For Elevate Lite this means panel-nav HTML should **not** be a visual restyle of the classic hierarchy. The information architecture changes.

#### Comprehensive Vendor Admin navigation tree

##### Home

| Item | Icon | Path / destination | Gating |
|---|---|---|---|
| Home | `home-new` / panel `ui-icon-home` | product home/dashboard URL | none noted |

##### Profile category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Profile | `profile` | `vendor_admin_product_profile_index` root | category-level component gating |
| Product Information | inherits feature icon behavior | `vendor_admin_product_product_information_index` | component `:product_info` |
| Pricings | — | pricing route | component-based |
| Product Features | — | product-features route | component-based |
| Discussions | — | discussions route | component-based |
| Product Chat Configs | — | chat config route | component-based |
| Expertise | — | `vendor_admin_product_expertise_index` | **provider-only** |
| Buyers Club Offers | — | buyers-club route | component-based |
| Downloads | — | downloads route | component-based |
| Interactive Demo | — | interactive-demo route | component-based |
| Product Integrations | — | `vendor_admin_product_product_integrations` | **software or product-suite only** |
| Media Gallery (nested) | category-style child | panel/flyout grouping | nested category |
| Screenshots | under Media Gallery | screenshots route | component-based |
| Videos | under Media Gallery | videos route | component-based |

##### Review Management category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Review Management | `chat-box`, tagged `NEW` | `vendor_admin_product_review_levers` | category-level component gating |
| Review Performance | feature-category container | `#` / container item | shows child set |
| Review Activity | — | `vendor_admin_product_review_activity_index` | component-based; nudges present |
| Review Campaign Dashboard / Review Dashboard | conditional branch | dashboard route | implementation-dependent conditional |
| Get Reviews | feature-category container | `#` / container item | shows child set |
| Review Collection Widgets | — | widgets route | component-based |
| Review Campaign | — | `new_vendor_admin_product_review_campaign` | requires review campaign access |
| Selfservice Campaign Start | tagged / campaign entry | selfservice route | plan / component gating |
| Review Collection Page | — | collection-page route | component-based |
| Review Update Campaigns | — | update-campaign route | component-based |
| Self Service Review Update Campaigns | — | selfservice update route | component-based / plan |
| In App Reviews | — | in-app reviews route | component-based |
| Self Service In App Campaigns | — | selfservice in-app route | plan / component |
| Multi Product Reviews | — | multi-product review route | component-based |
| Selfservice Multi Product Campaigns | — | selfservice multi-product route | plan / component |
| AI Assisted Review Collection | — | ai-assisted route | feature / component gated |
| Review Tools | feature-category container | `#` / container item | shows child set |
| Review Responder | — | responder route | component-based |
| Customer References | — | customer references route | component-based |
| Custom Questions | — | custom questions route | component-based |

##### Buyer Activity category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Buyer Activity | `line-chart` | buyer-activity index | category-level component gating |
| Attribution Tracking | — | `edit_vendor_admin_product_attribution_tracking` | component-based; nudge-gated behavior referenced |
| Profile Signals | — | profile-signals route | component `:profile_signals` |
| Buyer Intent (nested) | nested category | buyer-intent grouping | **non-suite-only** |
| Your Signals | — | buyer-intent sub-route | component-based |
| Buyer Intent Queries | — | query route | component-based |
| Intent Driven Leads | — | leads route | component-based |
| Leads (nested) | nested category | leads grouping | component-based |
| Leads Activity | — | leads activity route | component-based |
| Lead Form | — | lead form route | component-based |
| Lead Emails | — | lead emails route | component-based |
| Web Hooks | — | webhooks route | component-based |
| Call To Actions | — | CTA route | component-based |
| Lead Pricings | — | pricing route | component-based |

##### Advertising / ads category

Exactly one of these major top-level categories appears in StarterList:

| Category | Icon | Destination | Gating |
|---|---|---|---|
| Advertisements (legacy) | `marketing` | `advertisements_manage` | shown when Unified Ads toggle path is not used |
| Unified Ads | `marketing` | `vendor_admin_product_unified_ads_plans` | **starter-plan only** and feature-toggle path |

Legacy Advertisements children:

| Item | Destination | Gating |
|---|---|---|
| Advertisements Manage | manage route | component-based |
| Advertisements Analytics | analytics route | component-based |

Unified Ads children:

| Item | Destination | Gating |
|---|---|---|
| Unified Ads Plans | plans route | starter-plan only |
| Unified Ads Buyout Metrics | metrics route | starter-plan / product-access based |
| Unified Ads Clicks Metrics | clicks metrics route | starter-plan / product-access based |

##### Marketing Content category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Marketing Content | `layers` | marketing-content index | category-level component gating |
| Content Library | — | content-library route | component-based |
| Social Assets | — | social-assets route | component-based |
| Medals | — | medals route | component-based |
| Grant Permission | — | grant-permission route | component-based |
| Documents | — | documents route | component-based |
| Product Reference Pages | — | reference-pages route | component-based |
| Crowd Quotes | — | crowd-quotes route | component-based |
| Widgets (nested) | nested category | widgets grouping | component-based |
| Grid Widget | — | widget route | component-based |
| Star Rating Widget | — | widget route | component-based |
| Testimonials | — | widget route | component-based |
| Review Snapshots | — | widget route | component-based |
| Review Widget | — | widget route | component-based |

##### Analytics category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Analytics | `analytics-chart` | derived from first available feature | category-level component gating |
| Traffic | — | `vendor_admin_product_traffic_analytics` | component-based |
| Competitors | — | `vendor_admin_product_competitors` | component `:competitor_dashboard`; custom show logic |
| Insight Reports | — | insight-reports route | component-based |
| AI Visibility Dashboard | optional child | ai-visibility route | observer or cheat flag or `product.access_to_component?(:ai_visibility)` |

##### Integrations category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Integrations | `puzzle` | derived from first available child | category-level component gating |
| Integration Hub | — | `vendor_admin_product_integrations` | component-based; nudges/integration updates |
| Performance Analytics | — | `vendor_admin_product_performance_analytics` | components `:performance_analytics_portal`, `:starter_offering` |
| API Tokens | — | api-token route | component-based |
| Review Partnerships | — | review-partnership route | component-based |

##### Market Intelligence category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Market Intelligence | `bar-chart-head` | MI dashboard | explicit component `:market_intelligence` |
| Category Overview | — | MI child route | market-intelligence access |
| Comparison | — | comparison route | market-intelligence access |
| Product Perception Momentum | — | PPM route | market-intelligence access |
| Win Loss | — | win-loss route | market-intelligence access |
| Contracting & Implementation | — | route by feature file | market-intelligence access |

##### ROI category

| Item | Icon | Destination | Gating |
|---|---|---|---|
| ROI | `ui-icon-target` | performance analytics | component-based |
| Performance Analytics | — | performance analytics route | component-based |

##### Account category

| Item | Icon / notes | Destination | Gating |
|---|---|---|---|
| Account | `user` | derived from first visible child | category-level component gating |
| Pricing Plans | — | plans route | component-based / subscription context |
| Organization Invites | — | invites route | component-based |
| SAML Providers | — | SSO/SAML route | component-based |
| Payments & Invoices | — | payments route | component-based |
| Documentation | — | docs route | component-based |

##### Sales Call Brief category

| Item | Icon | Destination | Gating |
|---|---|---|---|
| Sales Call Brief | `ui-icon-phone-call` | sales call brief route | **observer-only** and `SalesCallBrief` toggle/cheat-enabled |

##### Full-list extras

| Item | Icon | Destination | Gating |
|---|---|---|---|
| AI Custom Research | `ui-icon-data-search` | new AI custom research route | component-based; tagged `NEW` |
| AI Custom Research Request | child | request route | same area access |
| Competitive Pulse | `ui-icon-knowledge-learn` | competitive pulse route | component-based; tagged `BETA` |
| Selfservice Campaigns | `reviews` | selfservice dashboard area | component `:selfservice_campaigns`; tagged `BETA` |

#### Headnav interactions and gating

| Headnav element | What it does | Gating / condition |
|---|---|---|
| product dropdown | switches active product/org context | shown as core headnav element |
| observer eye icon | indicates observer mode | `current_role.active_observer?` |
| search | quick nav/search dataset | seller dashboard context |
| invite teammate | opens teammate/admin invitation action | hidden on organization page according to explored summary |
| report card icon | report/help style utility | conditional |
| support menu | shows G2 University / Contact Support / Documentation | product subscription context can affect entries |
| notifications bell | in-app notifications | hidden on organization page; unread badge conditional |
| user avatar menu | notification settings / cookie settings / sign out | notification settings gated by `role.access_to_component?(:vendor_notifications)` + subscription state |

#### Classic sidenav interactions

| Interaction | Result |
|---|---|
| click expand/collapse toggle | rail widens from 72px to 240px or back |
| hover a category while collapsed | primary flyout appears |
| active feature with nested children | secondary flyout section expands |
| open nav in expanded mode | labels fade/slide in |

#### Panel sidenav interactions

| Interaction | Result |
|---|---|
| click category | activates matching secondary pane |
| click feature | navigates to feature |
| logo action | can clear active states / return home |

### Variant C — Teams Portal / Organization Navigation

#### Teams-engine sidenav inventory

The teams-engine sidebar is a flat list of panes built from `data_for_panes`.

##### Teams section

| Item | Icon | Route / destination | Controller name | Intended audience |
|---|---|---|---|---|
| Users | `ui-icon-account-circle` | `developer_users_path` | `users` | org admins / team managers |
| Groups | `ui-icon-group` | `developer_groups_path` | `groups` | org admins / team managers |
| Products | `ui-icon-sell` | `developer_path` | `organizations` | org-level product mapping/admin users |
| SSO | `ui-icon-key` | `edit_organization_saml_providers_path` | `saml_providers` | org admins/security admins |

##### Developers section

| Item | Icon | Route / destination | Controller name | Intended audience |
|---|---|---|---|---|
| OAuth Apps | `ui-icon-apps` | `developer_oauth_apps_path` | `oauth_apps` | developer/admin users |
| Resources | `ui-icon-file` | `developer_resources_path` | `resources` | developer/admin users |

#### Teams active-state behavior

The teams pane component derives active state from the current controller name and highlight-selected behavior.

Important behavior:

- active item background becomes `bg-navy-90`
- inactive items stay at `bg-navy-100`
- hover state matches the active visual family
- pane links use Turbo Frame targeting (`panel_content`) and Turbo history advance

#### Teams headnav behavior

| Element | Behavior |
|---|---|
| back arrow + G2 logo + “MyG2” | returns user to broader My G2/dashboard area |
| tracking wrapper | tracks navigation click event |
| fixed position | remains visible while sidebar/content scroll |

#### Organization-admin navigation behavior

Organization-admin multi-product routing exists under `my.rb` and is distinct from the teams-engine panes.

Routes:

- `resources :organizations, module: :teams_portal` for teams portal endpoints
- `resources :organizations, module: :multi_product` for executive summary / quarterly summary

Current `OrganizationAdmin::Navigation::List` behavior:

- inherits vendor-admin navigation conventions
- currently contains **Executive Summary** as the main implemented item
- is injected through `vendor_admin/skeleton` when `organization_id` is present

`ExecutiveSummary` feature:

| Item | Icon | Destination | Gating |
|---|---|---|---|
| Executive Summary | `newsletter` | `organization_executive_summary_index_url(organization)` | user must be active observer or have any product with `:multi_product_dashboard` component |

#### Teams vs Organization Admin vs Vendor Admin

| Aspect | Teams Portal | Organization Admin | Vendor Admin |
|---|---|---|---|
| information architecture | flat admin list | vendor-admin-style org list | deep seller dashboard tree |
| top header purpose | back to MyG2 | inherited shell context | product switcher + seller controls |
| sidebar complexity | low | medium | high |
| collapse behavior | none in standard teams sidebar | depends on vendor shell usage | yes in classic mode |
| secondary nav | Turbo-loaded panel content | executive-summary pages / org shell | flyouts or panel secondary rail |

---

## Accessibility

### Variant A — Buyer Profile Navigation

Accessibility hooks directly present in reviewed files:

- layout includes skip links to `#tab` and `#main`
- mobile hamburger icon includes `aria_label: t('aria.icons.expand_collapse', item: '')`
- links remain semantic anchor tags
- active state is not only structural; it is visually obvious through background + color changes

Potential Elevate Lite requirements:

- preserve skip-link landmarks
- ensure mobile trigger is keyboard-activatable
- mark current tab with `aria-current="page"` in static HTML even though production uses JS classing
- ensure icon-only meanings are backed by text labels on all nav variants

### Variant B — Vendor Admin Navigation

Accessibility signals observed / inferred from reviewed vendor-admin sources:

- headnav uses actual buttons/anchors for menus and links
- notifications area contains grouped headers and dismiss actions
- icon hit areas are large enough for pointer use
- open/close menu states should be surfaced with `aria-expanded` in Elevate Lite even if production uses JS/menu helpers
- locked features should remain readable and not rely on icon-only indication

Elevate Lite implementation notes:

- support keyboard traversal for top bar menus
- support arrow/escape behavior if interactive demo page is later added
- expose lock state textually (`Locked`, `Requires plan`, etc.)
- preserve visible text for categories even when recreating collapsed rail mockups in static form

### Variant C — Teams Portal / Organization Navigation

Accessibility notes:

- flatter pane list makes semantic nav markup straightforward
- top back link should have explicit text, not icon-only presentation
- active pane should use `aria-current="page"`
- Turbo-targeted links in production should still map to normal anchors in static HTML

---

## Component Architecture

### Variant A — Buyer Profile Navigation

#### High-level architecture

```text
UsersController
├── Users::ProfileAccess
├── Users::Profile::SidebarTabs
│   ├── default_tab
│   ├── active_tab
│   └── tabs -> Users::Profile::GenerateTabs
│       ├── top-level tab objects
│       ├── Users::Profile::Tabs::*
│       └── Users::Profile::ParentTabs::*
└── Users::Profile::SidenavComponent
    ├── users/tabs/_sidebar_list
    │   └── Users::Profile::TabFactoryComponent
    │       ├── Users::Profile::TabBaseComponent
    │       └── Users::Profile::ParentTabComponent
    └── users/_mobile_nav
```

#### Buyer navigation groups to reproduce

| Top-level group | Icon | Children | Shows for |
|---|---|---|---|
| Activity Center | `dashboard` | none | own profile default; allowed viewers if visible |
| Profile Details | `profile-details` | none | all viewable contexts; public default for others |
| Reviews | `review-star` | My Reviews, Saved Reviews, My Drafts | if at least one child allowed |
| Products | `laptop` | Products I Use, Compared Products | if at least one child allowed |
| Q&A | `qa-chat` | Community Q&A, My Answers | if at least one child allowed |
| My Lists | `pin` | none | if follow stack has products |
| Achievements | `achievement-medal` | none | if achievement feature toggle enabled |
| My Rewards | `cash` | none | if visible review incentives exist |
| Notifications | `notification` | none | standard allowed tab |
| Settings | `gear-thin` | Privacy, Account, Product Admin | if at least one child allowed |

#### Buyer child-tab details

| Child tab | Parent | Destination behavior | Notes |
|---|---|---|---|
| `my_reviews` | Reviews | profile page with `?tab=my_reviews#main` | primary authored reviews view |
| `saved_reviews` | Reviews | `?tab=saved_reviews#main` | saved review collection |
| `my_drafts` | Reviews | `?tab=my_drafts#main` | draft reviews |
| `products_used` | Products | `?tab=products_used#main` | gated by use stack |
| `saved_compares` | Products | `?tab=saved_compares#main` | compared-product history |
| `community_qa` | Q&A | `?tab=community_qa#main` | Q&A feed |
| `my_answers` | Q&A | `?tab=my_answers#main` | authored answers |
| `privacy_settings` | Settings | `?tab=privacy_settings#main` | email/privacy controls |
| `account` | Settings | `?tab=account#main` | email/linkedin/account details |
| `vendor_admin` | Settings | `?tab=vendor_admin#main` | claimed-product / seller-admin entry point |

### Variant B — Vendor Admin Navigation

#### High-level architecture

```text
VendorAdmin Layout
├── HeadnavComponent
│   ├── product dropdown
│   ├── search
│   ├── support menu
│   ├── notifications menu
│   └── user menu
└── Sidenav renderer
    ├── classic rail (_sidenav)
    │   └── _nav_feature recursion
    └── panel nav (_sidenav_myg2)
        └── _myg2_nav_feature recursion

Navigation object sources
├── VendorAdmin::Navigation::List
├── VendorAdmin::Navigation::StarterList
├── VendorAdmin::Navigation::PanelList
└── Features::* and Categories::*
```

#### Vendor Admin category architecture

| Category source | Role |
|---|---|
| `CategoryBase` | top-level container behavior |
| `Features::Base` | path, title, icon, active, locked, components |
| `StarterList` | starter-plan optimized top-level nav set |
| `List` | broader seller tree |
| `PanelList` | regrouped panel-mode nav tree |

#### Vendor Admin top-level categories by list type

| Category | StarterList | Full List | PanelList equivalent |
|---|---|---|---|
| Home | yes | yes | Home |
| Profile | yes | yes | Manage Profile |
| Review Management | yes | yes | Reviews & Reputation |
| Buyer Activity | yes | yes | Demand Generation / Insights split |
| Advertisements | conditional | conditional | Demand Generation |
| Unified Ads | conditional | conditional | Demand Generation |
| Marketing Content | yes | yes | Gather Social Proof |
| Analytics | yes | yes | Insights |
| Integrations | yes | yes | Insights / Account split |
| Market Intelligence | yes | yes | Insights |
| ROI | yes | yes | Insights |
| Account | yes | yes | Account |
| Sales Call Brief | yes | yes | Sales Call Brief |
| AI Custom Research | no | yes | not explicit in panel summary |
| Competitive Pulse | no | yes | not explicit in panel summary |
| Selfservice Campaigns | no | list-only extra | not explicit in panel summary |

### Variant C — Teams Portal / Organization Navigation

#### High-level architecture

```text
Teams layout
├── Teams::Navigation::HeadnavComponent
└── Teams::Navigation::SidenavComponent
    └── Teams::Navigation::SidenavPaneComponent (collection)

Alternative app-level wrapper
└── TeamsPortal::Navigation::SidenavComponent

Org-admin crossover
└── OrganizationAdmin::Navigation::List
    └── OrganizationAdmin::Navigation::Features::ExecutiveSummary
        rendered through vendor_admin/skeleton
```

#### Teams sidebar information architecture

| Section | Items |
|---|---|
| Teams | Users, Groups, Products, SSO |
| Developers | OAuth Apps, Resources |

#### Org-admin information architecture

| Section | Items |
|---|---|
| Organization Admin (current implementation) | Executive Summary |

---

## Code Snippets

### Variant A — Buyer Profile Navigation

#### Canonical top-level tabs

```ruby
TOP_LEVEL_TABS = %w(activity_center profile_details reviews products qa my_lists achievements my_rewards
                    notifications settings).freeze
```

#### Canonical allowed URL params

```ruby
ALLOWED_TABS = %w(privacy_settings account vendor_admin activity_center community_qa my_answers profile_details
                  notifications achievements my_rewards my_lists products_used my_reviews saved_reviews
                  saved_compares my_drafts).freeze
```

#### Default tab logic

```ruby
def default_tab
  current_user == profile ? ACTIVITY_CENTER : PROFILE_DETAILS
end
```

#### Parent-tab definitions

```ruby
# Reviews
CHILDREN_TABS = %i(my_reviews saved_reviews my_drafts).freeze

# Products
CHILDREN_TABS = %i(products_used saved_compares).freeze

# Qa
CHILDREN_TABS = %i(community_qa my_answers).freeze

# Settings
CHILDREN_TABS = %i(privacy_settings account vendor_admin).freeze
```

#### Sidebar rendering

```slim
div ue=:activatable data={ activatable: { class_name: 'active', param: 'tab' } }
  .show-for-large
    ul.vertical.menu.menu--sidebar.mb-1
      - tabs.each do |tab|
        = render Users::Profile::TabFactoryComponent.new(tab:, active_tab_name: active, default:, current_user:, profile:)
```

#### Mobile rendering

```slim
.hide-for-large.mobile-nav(ue='activatable mobile-nav' data={ activatable: { class_name: 'is-active', param: 'tab' } })
  .mobile-nav__icon.js-expand-nav
    = inline_icon 'hamburger', class: 'medium', aria_label: t('aria.icons.expand_collapse', item: '')
  ul.mobile-nav__list
```

#### Desktop tab row rendering

```slim
li
  = link_to generate_user_url,
            class: classes,
            id: appcue_id,
            data: { activatable_item:, activatable_default: default_option?, activatable_children: } do

    .flex.items-center.px-2
      .mr-1/4 = inline_icon(icon, class: 'medium menu__link--icon', decorative: true)
      = t("users.tabs.#{name}.tab_name")
```

#### Activatable JS fallback behavior

```javascript
if ($active.length !== 1) {
  $active = $els.filter("[data-activatable-default='true']");
}
```

#### Mobile-nav toggle behavior

```javascript
return this.on('click', '.js-expand-nav, li.is-active a', function (e) {
  e.preventDefault();
  expanded = !expanded;
  return render();
});
```

### Variant B — Vendor Admin Navigation

#### Route anchors from `my.rb`

```ruby
resources :organizations, only: [], module: :teams_portal do
  resources :api_tokens, only: %i(index show create destroy)
  resources :product_mappings, only: %i(index create update destroy)
  resources :analytics, only: %i(index) do
    get :match_scores, on: :collection
  end
end
```

For Vendor Admin specifically, the detailed product routes live earlier in `my.rb`; the explored source confirms the nav resolves seller dashboard links through named vendor-admin route helpers and per-feature objects.

#### Source-derived vendor nav hierarchy sketch

```text
StarterList
├── Home
├── Profile
├── Review Management
├── Buyer Activity
├── Advertisements or Unified Ads
├── Marketing Content
├── Analytics
├── Integrations
├── Market Intelligence
├── ROI
├── Account
└── Sales Call Brief
```

#### Source-derived panel hierarchy sketch

```text
PanelList
├── Home
├── Manage Profile
├── Reviews & Reputation
├── Demand Generation
├── Gather Social Proof
├── Insights
├── Account
└── Sales Call Brief
```

#### Headnav composition sketch

```text
Headnav
├── Product switcher dropdown
├── Search
├── Invite teammate (conditional)
├── Report card (conditional)
├── Support menu
├── Notifications bell
└── User avatar menu
```

### Variant C — Teams Portal / Organization Navigation

#### Organization routes in `my.rb`

```ruby
resources :organizations, only: [], module: :teams_portal do
  resources :api_tokens, only: %i(index show create destroy)
  resources :product_mappings, only: %i(index create update destroy)

  namespace :product_mappings do
    resources :csv_uploads, only: %i(index new show)
  end

  resources :analytics, only: %i(index) do
    get :match_scores, on: :collection
  end
end

resources :organizations, only: [], module: :multi_product do
  post :competitors, to: 'executive_summary#competitors'

  resources :executive_summary, only: %i(index) do
    get :competitive_review_data, on: :collection
    get :bubble_chart_data, on: :collection
    get :rank_changes, on: :collection
    get :new_categories_products, on: :collection
  end

  resources :quarterly_summary, controller: :executive_summary, only: %i(index)
end
```

#### Teams pane inventory sketch

```text
Teams Sidenav
├── Users
├── Groups
├── Products
├── SSO
├── OAuth Apps
└── Resources
```

#### Organization-admin sketch

```text
OrganizationAdmin::Navigation::List
└── Executive Summary
```

---

## Notes for Elevate Lite Implementation

### General implementation strategy

Treat this as **three separate templates**:

1. `my-g2-buyer-profile-nav.html`
2. `my-g2-vendor-admin-shell.html`
3. `my-g2-teams-portal-shell.html`

Do **not** try to collapse them into a single universal nav component.

### Variant A — Buyer Profile Navigation

#### Required static states to capture

At minimum Elevate Lite should include these static screenshots/templates:

1. desktop buyer sidebar, own profile, `activity_center` active
2. desktop buyer sidebar, another user profile, `profile_details` active
3. desktop buyer sidebar with parent tab active and pill subnav visible (`Reviews`, `Products`, `Q&A`, `Settings` cases)
4. mobile collapsed nav (only active row visible)
5. mobile expanded nav (all rows visible)
6. sidebar row with `my_lists` NEW badge

#### Elevate component usage / relationship

Buyer profile nav is mostly **legacy UE patterns**, not heavy Elevate composition.

Observed component style usage:

- `inline_icon` usage throughout
- classic menu/sidebar utility classes
- no explicit `Elevate::Icon::Component` usage in the buyer nav files reviewed

That means Elevate Lite should treat this as a **legacy-compatible shell** using Elevate tokens where practical, not a 1:1 Elevate ViewComponent clone.

#### Fidelity requirements

- preserve rounded active purple row state
- preserve two-level nav model (sidebar + pill subnav)
- preserve own-vs-other default selection difference in documentation/examples
- preserve mobile accordion behavior visually even if static examples are non-interactive

### Variant B — Vendor Admin Navigation

#### Required static states to capture

At minimum create separate static examples for:

1. headnav only, with all right-side controls present
2. classic sidenav collapsed
3. classic sidenav expanded
4. classic sidenav collapsed with hover flyout mocked open
5. classic sidenav expanded with active secondary section
6. panel nav primary-only state
7. panel nav with secondary pane open
8. starter-plan nav showing Unified Ads instead of legacy Advertisements
9. observer-mode nav showing observer icon / Sales Call Brief availability
10. locked-feature examples with lock indicators

#### Elevate component usage / relationship

Vendor Admin uses a mix of legacy UE components and Elevate-style pieces.

Observed / explored usage:

- `Elevate::Icon` style rendering for some `ui-icon-*` icon paths
- avatar/menu/button-like componentized headnav patterns
- lots of custom vendor-admin shell CSS outside core Elevate atoms

Recommendation:

- recreate the **shell layout** with custom static HTML/CSS
- use Elevate Lite icons/buttons/dropdowns where they visually match
- do not force vendor-admin nav into a standard Elevate sidebar component pattern; the production shell is more specialized

#### Fidelity requirements

- preserve dual-nav architecture (headnav + sidenav)
- preserve difference between classic rail and panel nav
- preserve badges/tags (`NEW`, `BETA`, lock, nudge count placeholders)
- preserve the product switcher dropdown footprint
- preserve fixed 60px headnav and fixed left-nav geometry

### Variant C — Teams Portal / Organization Navigation

#### Required static states to capture

At minimum create:

1. teams headnav + flat sidenav default state
2. teams sidenav with Users active
3. teams sidenav with SSO active
4. developer section active (OAuth Apps / Resources)
5. organization-admin executive-summary state inside vendor-admin-like shell

#### Elevate component usage / relationship

Teams navigation is the cleanest fit for Elevate-like reproduction:

- pane rows already use `Elevate::Icon::Component`
- information architecture is flat and admin-oriented
- easier to implement as a reusable static sidebar shell

#### Fidelity requirements

- preserve 72px topnav height
- preserve 240px fixed sidenav width
- preserve pane row height and icon/text spacing
- document that executive-summary org admin is a separate shell path from the flatter teams pane nav

### What not to flatten away

Do not remove these production distinctions in Elevate Lite docs:

- buyer profile parent tabs vs child tabs
- vendor classic nav vs vendor panel nav
- vendor starter-plan ad-category swap (Advertisements vs Unified Ads)
- teams portal flat nav vs organization-admin executive-summary shell
- public/owner/observer visibility differences on buyer profile

---

## Summary

The audited production code shows that **My G2 is a navigation ecosystem, not a component**.

### Final variant summary

| Variant | Primary audience | Layout shape | Nav depth | Key distinction |
|---|---|---|---|---|
| Buyer Profile | buyers / profile owners / viewers | in-card sidebar + optional pill subnav + mobile dropdown | medium | visibility-driven tab system tied to profile privacy |
| Vendor Admin | sellers / product admins / observers | fixed headnav + classic or panel sidenav | high | highly gated feature tree with plan/toggle/role conditions |
| Teams Portal / Org Navigation | org admins / developers / multi-product users | fixed topnav + flat sidenav, plus org-admin vendor-shell crossover | low to medium | admin-console style panes, with executive-summary org shell as separate path |

### Most important implementation conclusions

1. **Buyer Profile** should be documented and built as a sidebar-tab system with parent-tab pills and mobile accordion behavior.
2. **Vendor Admin** requires two separate left-nav representations (classic collapsible rail and panel nav) plus the top headnav.
3. **Teams Portal** should be treated as a simpler fixed admin sidebar, while **Organization Admin Executive Summary** should be documented as a vendor-shell-derived org variant.
4. **Permission and visibility logic are part of the UX**, not only backend concerns. The nav trees differ based on owner/public/observer/plan/subscription/component access.
5. Production source values, classes, and route structures are more authoritative than any generalized design-system spec.

### Recommended Elevate Lite deliverables after this audit

1. Buyer profile desktop sidebar template
2. Buyer profile mobile nav template
3. Buyer profile parent-tab pill navbar template
4. Vendor admin classic collapsed rail template
5. Vendor admin classic expanded rail template
6. Vendor admin panel nav template
7. Vendor admin headnav template
8. Teams portal headnav template
9. Teams portal flat sidenav template
10. Organization admin executive-summary shell template

### Audit completeness notes

This document intentionally separates the three systems and captures:

- user-type mapping
- route mapping
- tab/category/feature inventories
- key icons and destinations
- visual geometry and styling tokens
- mobile vs desktop behavior
- active-state behavior
- major gating rules
- component architecture needed to reproduce static HTML faithfully

That separation is necessary for Elevate Lite fidelity. A single “My G2 nav” template would lose critical production behavior and would not accurately represent what users actually experience across buyer, seller, and organization contexts.
