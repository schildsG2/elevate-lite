# G2 Top Navigation Audit

## Overview

The G2.com top navigation is a **legacy `web_style` header system**, not an Elevate design-system component. It combines:

- a cached Slim topbar shell,
- Foundation breakpoint utilities,
- legacy SCSS tokens and mixins,
- a Turbo-frame lazy-loading mega menu,
- a Turbo-frame lazy-loading profile menu,
- a Turbo-frame lazy-loading seller/admin CTA,
- Foundation off-canvas mobile navigation,
- legacy widget hooks (`ue='simple-menu'`, `ue='off-canvas'`, `ue='saved-notification'`, `ue='login-modal-toggle'`), and
- newer Stimulus controllers for popovers and edge pinning.

For Elevate Lite, this audit treats **production code as the source of truth** and documents everything needed to reproduce the navigation as a **static HTML + CSS component** with optional lightweight JavaScript.

**Primary Use Cases:**
- Global site navigation for G2.com
- Category discovery for software and services
- Search entry point
- Logged-out acquisition CTA (`Join or Log In`)
- Logged-in buyer actions (Research Boards, Leave a Review, profile dropdown)
- Logged-in seller/admin actions (seller product hub / admin CTA)
- Mobile drilldown navigation

**Important Architectural Reality:**
- This component is **not** an Elevate component.
- It uses a mixed stack: classic SCSS, Foundation classes, Tailwind-like utility classes, Turbo frames, ViewComponents, and widget hooks.
- The final rendered navigation differs by **viewport** and **user state**.
- Several visible sections are **lazy loaded after initial paint**.

**Production Source Files Read for This Audit:**

**Core topbar shell:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_topbar.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_topnav.scss`

**Logged-out state:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_signup_links.html.slim`

**Mobile navigation:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_mobile_nav.html.slim`
- `/Users/schilds/projects/ue/engines/web_style/app/views/layouts/web_style/off_canvas.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_mobile_menu.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_offcanvas_menu.scss`
- `/Users/schilds/projects/ue/vendor/assets/stylesheets/foundation/components/_off-canvas.scss`
- `/Users/schilds/projects/ue/vendor/assets/stylesheets/foundation/components/_drilldown.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/extensions/_drilldown.scss`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/off_canvas.js`

**Mega menu trigger + content:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_category_nav_link.html.slim`
- `/Users/schilds/projects/ue/app/views/navigation/_menu.html.slim`
- `/Users/schilds/projects/ue/app/views/navigation/index.html.slim`
- `/Users/schilds/projects/ue/app/views/navigation/show.html.slim`
- `/Users/schilds/projects/ue/app/controllers/navigation_controller.rb`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/controllers/edge_pin_controller.js`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/controllers/edge_pin_controller.widget.js`

**Vendor dropdown:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_vendor_menu.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_simple_menu.scss`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/simple_menu/base.js`

**Primary CTA / seller CTA:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_topnav_control_cta.html.slim`
- `/Users/schilds/projects/ue/engines/web_style/app/helpers/web_style/topnav_cta_helper.rb`
- `/Users/schilds/projects/ue/app/controllers/topnav_ctas_controller.rb`
- `/Users/schilds/projects/ue/app/views/topnav_ctas/show.html.slim`
- `/Users/schilds/projects/ue/app/components/vendors/top_nav/cta_component.rb`
- `/Users/schilds/projects/ue/app/components/vendors/top_nav/cta_component.html.slim`

**Search:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_search.html.slim`
- `/Users/schilds/projects/ue/engines/typeahead/app/views/typeahead/_navbar.html.slim`
- `/Users/schilds/projects/ue/engines/typeahead/app/views/typeahead/_navbar.html+legacy.slim`
- `/Users/schilds/projects/ue/engines/typeahead/app/views/typeahead/_field.html.slim`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_search.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_rounded_search.scss`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/search_field/search_field.js`

**Profile dropdown:**
- `/Users/schilds/projects/ue/app/components/users/profile/dropdown_component.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/dropdown_component.html.slim`
- `/Users/schilds/projects/ue/app/components/users/profile/dropdown/item_component.rb`
- `/Users/schilds/projects/ue/app/components/users/profile/dropdown/item_component.html.slim`
- `/Users/schilds/projects/ue/app/components/users/avatar_component.rb`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_avatars.scss`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/controllers/popover_menu_controller.js`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/controllers/popover_menu_controller.widget.js`
- `/Users/schilds/projects/ue/app/components/linkedin/verify/verification_display_component.rb`
- `/Users/schilds/projects/ue/app/components/linkedin/verify/verification_display_component.html.slim`
- `/Users/schilds/projects/ue/app/components/linkedin/verify/modal_component.rb`
- `/Users/schilds/projects/ue/app/components/linkedin/verify/modal_component.html.slim`

**Saved notification / wishlist pin:**
- `/Users/schilds/projects/ue/engines/web_style/app/views/web_style/header/_saved_entry.html.mustacherb`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/widget_definitions/saved_notification.js`
- `/Users/schilds/projects/ue/webpack/assets/javascripts/saved_notifications/broadcast.js`

**Shared styling + variables + breakpoints:**
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/_branding.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/_foundation_6_settings.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/mixins/_border.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_btn.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/components/_stickable.scss`
- `/Users/schilds/projects/ue/webpack/assets/stylesheets/utilities/_custom_profile.scss`
- `/Users/schilds/projects/ue/webpack/spec/tailwindcss/breakpoints.spec.js`
- `/Users/schilds/projects/ue/gulpfile.js`

**Config / route defaults / text:**
- `/Users/schilds/projects/ue/engines/web_style/lib/web_style/config.rb`
- `/Users/schilds/projects/ue/config/locales/en.yml`
- `/Users/schilds/projects/ue/engines/login_required/app/helpers/login_required/link_to_helper.rb`
- `/Users/schilds/projects/ue/app/helpers/application_helper.rb`
- `/Users/schilds/projects/ue/webpack/loaders/widgetCompiler.js`

**Elevate Lite token source referenced for mapping:**
- `/Users/schilds/projects/elevate-lite/tokens/elevate.css`

### High-Level Render Tree

```text
.topnav
└── nav.topnav__inner.page
    ├── .topnav__item.topnav__item--logo
    │   └── G2 logo link
    ├── .topnav__item.topnav__item--search          (desktop only, unless simple top bar)
    │   └── rounded-search typeahead form
    ├── ul.topnav__item.topnav__nav                 (desktop xlarge+)
    │   ├── hidden monty/login anchor              (xlarge+)
    │   ├── Software mega menu trigger
    │   ├── AI Agents link                         (xlarge+)
    │   ├── Services mega menu trigger             (xxlarge+ only)
    │   ├── G2 for Business dropdown               (xxlarge+ only)
    │   ├── Deals link                             (xxlarge+ only if config present)
    │   ├── Research Boards pin icon
    │   ├── CTA area
    │   │   ├── seller/admin Turbo frame OR
    │   │   └── Leave a Review button
    │   └── auth area
    │       ├── logged-in: saved notifier + profile Turbo frame
    │       └── logged-out: Join or Log In button
    ├── mobile search row                          (small only)
    └── .right-menu-wrapper                        (< xlarge)
        ├── Research Boards pin icon
        └── hamburger trigger

content_for :off_canvas_right
└── mobile drilldown menu
```

### Distinct User States That Must Be Recreated

This audit documents three distinct product states because the navigation is materially different in each.

1. **Logged Out**
   - No profile avatar
   - No saved notification widget
   - CTA area shows `Leave a Review`
   - Auth area shows `Join or Log In`
   - Wishlist pin still renders but is protected by `login-modal-toggle`

2. **Logged In (Buyer)**
   - `Leave a Review` CTA remains inline unless seller admin eligibility exists
   - Wishlist pin visible
   - Saved notification container present
   - Profile dropdown lazy loads and shows buyer menu items
   - No seller/admin CTA Turbo frame

3. **Logged In (Seller/Admin eligible)**
   - CTA area swaps from inline `Leave a Review` button to lazy `topnav-admin-cta` Turbo frame
   - Profile dropdown still present
   - `vendor_admin` link exists in dropdown markup but is visually gated with `ue='hide-unless-admin'`
   - Mobile nav includes `vendor_admin` row, also gated with `ue='hide-unless-admin'`

### Production-vs-Design Discrepancies

The audit intentionally prioritizes code over `DESIGN.md`.

Known discrepancies:

1. **Topbar height**
   - Production SCSS: `72px`
   - Any design artifact suggesting taller nav should be treated as non-authoritative.

2. **Logo size**
   - Production SCSS: `52px`
   - `DESIGN.md` references a 56×56 logo rendering rule.
   - Recreate the production nav with **52×52px** logo footprint.

3. **Color system**
   - Production uses legacy `branding-color(...)` mixing, not raw Elevate tokens.
   - Approximate Elevate token mappings are documented below, but exact pixel fidelity requires honoring the legacy hex output first.

---

## Visual Specifications

### Overall Container

Top-level selector:

```scss
.topnav {
  @include border-bottom(branding-color(midnight, 40));
  background: $white;
  position: relative;
  z-index: $sticky-wrapper-z-index + 1; // 99
}
```

**Exact production values:**
- Background: `$white` from Foundation settings = `#fefefe`
- Border-bottom width: `1px`
- Border-bottom color: `branding-color('midnight', 40)` = `#a7a7ac`
- Positioning: `relative`
- Stacking: `z-index: 99`

**Why z-index matters:**
- `_stickable.scss` defines `$sticky-wrapper-z-index: 98`
- topnav uses `+ 1`, resulting in **99**
- This ensures top-level dropdowns and hover layers sit above sticky page elements.

### Simple Variant

When `simple_top_bar?` is true, the shell gains `.topnav--simple`.

```scss
&--simple {
  background-color: branding-color('rorange', 5);
  border-bottom: 0;
}
```

**Exact values:**
- Background: `branding-color('rorange', 5)` = `#fef5f4`
- Border bottom removed entirely

This audit is primarily concerned with the **full G2.com top navigation**, but static Elevate Lite implementation notes should preserve this variant as an optional modifier.

### Inner Layout

```scss
.topnav__inner {
  display: flex;
  height: $topnav-height;
  justify-content: space-between;
}
```

**Exact values:**
- Height: `$topnav-height: 72px`
- Display: `flex`
- Main axis: horizontal
- Justification: `space-between`

The `nav` element is rendered with classes:

```slim
nav.topnav__inner.page aria-label=t('navbar.mega_menu')
```

The `.page` class comes from the site layout system, constraining the nav content to page width.

### Horizontal Zones

The nav visually breaks into four zones:

1. **Logo** — fixed-width visual anchor on left
2. **Search** — flexible center-left region on desktop
3. **Desktop nav list** — right-aligned actions on xlarge+
4. **Mobile right utilities** — pin + hamburger below xlarge

### Logo Area

Source markup:

```slim
.topnav__item.topnav__item--logo
  = track_link_to config.root_link, Event::Navbar::IconClicked.new, id: 'primary-nav-logo' do
    = inline_icon ::AssetPath::Image::G2Logo::Icon.name,
      class: 'topnav__item__g2 g2-logo',
      aria_label: t('navbar.logo_alt')
```

Source SCSS:

```scss
$topnav-logo-size: 52px;

.topnav__item--logo {
  align-items: center;
  display: flex;
  height: 100%;

  a {
    display: flex;
  }
}

.topnav__item__g2.topnav__item__g2 {
  @include square($topnav-logo-size);
  color: branding-color('rorange');
  fill: currentColor;
  stroke: currentColor;
}
```

**Exact visual values:**
- Logo square: `52px × 52px`
- Brand color: `branding-color('rorange')` = base `#ff492c`
- Fill: currentColor
- Stroke: currentColor
- Vertical centering: full height flex item inside 72px bar

**Spacing around logo:**
- `.topnav__item` uses `@include responsive-padding($x: 1, $y: 0, $xlarge: 12px)`
- That mixin yields horizontal padding:
  - small: `12px`
  - medium+: `18px`
  - xlarge+: `12px`

So the logo cell breathes differently across breakpoints.

### Generic Item Padding

All `.topnav__item` elements get responsive padding.

```scss
.topnav__item {
  @include responsive-padding($x: 1, $y: 0, $xlarge: 12px);
}
```

From `_branding.scss`:

```scss
@mixin responsive-padding($x: 1, $y: 1, $small: 12px, $medium: 18px, $xlarge: 24px)
```

With `$x: 1`, `$y: 0`, `$xlarge: 12px`, actual horizontal padding becomes:

| Breakpoint | Left/Right padding |
|---|---:|
| `<600px` | 12px |
| `>=600px` | 18px |
| `>=1000px` | 12px |

### Breakpoints Used by Navigation

Production breakpoints come from the `appBreakpoints` pipeline and are verified in `webpack/spec/tailwindcss/breakpoints.spec.js`.

**Actual breakpoint values:**

| UE name | px |
|---|---:|
| `small` | `0` |
| `medium` | `600` |
| `large` | `750` |
| `xlarge` | `1000` |
| `xxlarge` | `1270` |
| `xxxlarge` | `1400` |

**Navigation implications:**
- Desktop nav list appears at `xlarge` (`>=1000px`)
- Hamburger disappears at `xlarge`
- `Services` mega-menu trigger is `show-for-xxlarge` (`>=1270px`)
- Vendor dropdown is `show-for-xxlarge`
- Deals link is `show-for-xxlarge`
- Mobile search row is `show-for-small-only`

### Desktop Search Placement

Search shell:

```slim
.topnav__item.topnav__item--search.hide-for-custom-profile.hide-for-print
  = render partial: 'typeahead/navbar',
           object: Typeahead::Nessy::Navbar.new(self),
           locals: { modifier: 'rounded-search--understated rounded-search--compact' }
```

Source SCSS:

```scss
.topnav__item--search {
  display: none;
  flex: 1;
  padding: 17px $global-padding / 2 0;

  @include breakpoint(medium up) {
    display: block;
  }
}
```

With `$global-padding = 24px`, desktop search padding is:
- top: `17px`
- right: `12px`
- bottom: `0`
- left: `12px`

**Behavior by viewport:**
- `<600px`: hidden
- `>=600px`: shown unless `simple_top_bar?`

### Rounded Search Component in Topnav

Rendered navbar field:

```slim
.search-box-wrapper.js-search-field ue='typeahead' id=navbar.id class=navbar.classes data=navbar.typeahead_options
  = form_tag Typeahead.config.search_path, method: :get, role: 'search', class: "rounded-search #{modifier}" do
    .rounded-search__top ue='search-field'
      .rounded-search__label
        = inline_icon 'search', decorative: true
      = button_tag type: 'button', class: 'rounded-search__clear-input-button absolute right-2 z-10' do
        = inline_icon 'close-circled', class: 'small', color: '#6F6D78', decorative: true
      = label_tag navbar.id, navbar.label, class: 'sr-only'
      = text_field_tag navbar.name, navbar.default_value,
        { autocomplete: :off, placeholder: navbar.placeholder, id: navbar.id,
          class: 'ajax-search-field js-query rounded-search__input' }.merge(navbar.input_options)
```

Topnav uses modifiers:
- `rounded-search--understated`
- `rounded-search--compact`

Relevant production SCSS:

```scss
.rounded-search {
  @include border(branding-color('midnight'), $width: 2px);
  background: $white;
  border-radius: 25px;
  display: flex;
  position: relative;
  z-index: 2;
}

.rounded-search--understated {
  @include border(branding-color(midnight, 40));
  border-radius: 18px;
}

.rounded-search__input {
  border: 0;
  height: 40px;
  padding-left: $global-padding * 1.5;
  padding-right: $global-padding * 1.5;
}

.rounded-search__label {
  left: 15px;
  top: 14px;
}

.rounded-search--understated .rounded-search__label {
  top: 11px;
}
```

**Exact topnav search field values:**
- Outer border color: `branding-color('midnight', 40)` = `#a7a7ac`
- Outer border width: `1px` in understated variant
- Outer radius: `18px`
- Height: input itself `40px`
- Background: `#fefefe`
- Placeholder color: `branding-color('midnight')` = `#252530`
- Placeholder font size: `$branding-font-size = 15px`
- Left icon offset: `15px`
- Icon color in understated variant: `branding-color('midnight')` = `#252530`
- Input left/right padding: `36px`

**Expanded/focus behavior on desktop compact variant:**

```scss
.rounded-search--compact:focus-within {
  @include breakpoint(xlarge up) {
    position: absolute;
    width: rem-calc(660);
    z-index: 2;
  }
}
```

At `xlarge+`, a focused compact field can expand to **660px width** and become absolutely positioned.

**Topnav focus styling:**

```scss
.rounded-search--compact,
.rounded-search--homepage {
  &:focus-within {
    box-shadow: 0 0 0 1px white;
    outline: 4px solid #c3bde5;
    outline-offset: 1px;
  }
}
```

So the effective focus ring is:
- inner white ring: `1px`
- outer outline: `4px solid #c3bde5`
- outline offset: `1px`

**Dropdown suggestions in nav search:**
- `.tt-menu` uses white background and `20px` radius in `_search.scss`
- suggestion hover color is `branding-color('blue', 10)` = `#e8f3f9`
- suggestion cursor in `_rounded_search.scss` can become `branding-color(rorange, 40)` = `#feb6aa`
- text highlight stays dark

### Mobile Search Row

When not in `simple_top_bar?`, a second search form is rendered below the bar for `small-only`.

Markup:

```slim
.topnav__item.full-width.pt-half.mt-half.px-0.show-for-small-only
  = form_tag Typeahead.config.search_path, method: :get, role: 'search',
    class: 'rounded-search rounded-search--understated' do
    .rounded-search__top
      .rounded-search__label
        = inline_icon 'search'
      = label_tag search_input_id, search_input_placeholder, class: 'sr-only'
      = text_field_tag :query, nil, class: 'rounded-search__input'
```

Visual implications:
- Search occupies full width below main 72px row
- No compact modifier, so no desktop-expansion logic
- Uses understated rounded field styling
- Appears only on smallest breakpoint range

### Desktop Navigation List Container

Source SCSS:

```scss
.topnav__nav {
  display: none;
  flex-shrink: 0;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0 $global-padding / 2;

  @include breakpoint(xlarge up) {
    align-items: center;
    display: flex;
  }
}
```

**Exact values:**
- Hidden below `1000px`
- At `>=1000px`, display becomes flex
- Right-aligned content
- Vertical centering
- Horizontal padding: `0 12px`
- Height: full `72px`

### Desktop Nav Links

Source SCSS:

```scss
.topnav__nav .topnav__link {
  font-size: rem-calc(15);
  padding: rem-calc(10) rem-calc(12);
  white-space: no-wrap;

  &:hover {
    background-color: $hover-bg-color;
    color: $hover-color;
  }
}
```

**Required exact values from production:**
- Font size: `15px`
- Padding top/bottom: `10px`
- Padding left/right: `12px`
- Hover background: `branding-color('blue', 10)` = `#e8f3f9`
- Hover text color: `branding-color('midnight')` = `#252530`

**Base link color:**
- `.topnav__link { color: $branding-body-color; }`
- `$branding-body-color = branding-color(midnight, 80)` = `#505059`

**Link box behavior:**
- Each link is a `display:flex` full-height child
- Vertical centering is built into the link, not only the parent `li`

### Desktop Nav Items (`li`)

```scss
.topnav__nav__li {
  align-items: center;
  display: flex;
  font-weight: $fw-semibold;
  height: 100%;
  list-style-type: none;
  position: relative;
}
```

**Exact values:**
- Font weight: `600`
- Height: full `72px`
- Position: `relative` so dropdown bodies can anchor to the item
- List markers removed

### Hoverable Desktop Items

Hoverable items apply a different background to the `li` itself:

```scss
.topnav__nav__li--hoverable:hover {
  background-color: $hover-bg-color;
}
```

Used by category triggers. This means hovering the whole list item creates a pale blue band behind the trigger area.

### Desktop Nav Item Inventory by Breakpoint

#### Always in desktop nav at `xlarge+`
- hidden monty/login trigger anchor (invisible span)
- Software trigger
- AI Agents link
- wishlist pin icon
- CTA slot (`Leave a Review` or seller/admin frame)
- auth slot (`Join or Log In` or profile dropdown)

#### Only at `xxlarge+`
- Services trigger
- G2 for Business dropdown
- Deals link

### Hidden Monty Login Trigger

There is an unusual invisible login anchor:

```slim
li.topnav__nav__li.show-for-xlarge role='none'
  = link_to WebStyle.config.signup_link, class: 'js-monty-login', ue: 'login-modal-toggle', ... do
    span
```

This renders no visible label, but provides a click target for Monty chat JS:

```js
api('on', 'user:login:request', () => {
  const anchor = document.querySelector('.js-monty-login');
  anchor.click();
});
```

For a static implementation, this invisible anchor does **not** need to be rendered unless chat-login interoperability is desired.

### Software / Services Mega Menu Triggers

Source markup:

```slim
li class="topnav__nav__li topnav__nav__li--hoverable group #{responsive_class}" role='none'
  = link_to 'javascript:void', role: 'menuitem', aria: { haspopup: true, expanded: false }, class: 'topnav__link js-menu-anchor' do
    = category_type_name
    = render Elevate::Icon::Component.new(file_name: 'ui-icon-chevron-down', size: :sm, class: 'elv-ml-1')
```

**Visual structure:**
- Text label: `Software` or `Services`
- Right-side chevron-down icon, small size
- Trigger uses the same 15px nav text size
- Trigger padding: `10px 12px`
- Hover background: pale blue

**Viewport rules:**
- `Software`: visible at `xlarge+`
- `Services`: only visible at `xxlarge+`

### Mega Menu Overlay Shell

Directly below trigger:

```slim
.p-a.z-50.top-full.d-n.group-hover:flex.jc-c.left-0.right-0.pointer-events-none ue='edge-pin'
  .page-width.pointer-events-auto
    .z-50.w-full.bg-white.shadow-lg.rounded-lg.overflow-hidden class='max-h-2/3-screen'
      = turbo_frame_tag "navigation-#{category_type}-menu", src: localized_path, loading: 'lazy', class: 'max-h-inherit' do
        .loading-container.ajax-loading.ajax-loading--tiny
          .h-96
```

**Visual implications:**
- Absolutely positioned dropdown container pinned to full viewport width
- Top edge flush with bottom edge of topbar (`top-full`)
- Hidden by default, shown on `.group:hover`
- Outer wrapper spans left `0` to right `0`
- Centered content via `.page-width`
- Actual panel has:
  - white background
  - large shadow (`shadow-lg` utility)
  - rounded large corners (`rounded-lg` utility)
  - clipped overflow
  - max-height of two-thirds viewport

**Edge pinning behavior:**
- `ue='edge-pin'` attaches the `EdgePinController`
- When visible/intersecting, JS sets:
  - `left = -rect.left`
  - `width = window.innerWidth`
- This makes the dropdown visually stretch edge-to-edge across the viewport, even though it is nested within a page-width context.

### Mega Menu Panel Content Layout

Actual menu content is delivered by `/app/views/navigation/_menu.html.slim`.

```slim
.grid-x.grid-margin-x.h-full.max-h-inherit.fw-initial
  .cell.small-12.medium-3.overflow-y-auto.max-h-inherit.bg-gray-100
  .cell.small-12.medium-9.overflow-y-auto.max-h-inherit
```

This is a **12-column Foundation grid** split into:

| Region | Grid columns | Purpose |
|---|---:|---|
| Left pane | 3 | parent categories |
| Right pane | 9 | subcategories |

This is the production source for the required **2-column mega menu system**.

### Mega Menu Left Pane (Parent Categories)

Markup excerpt:

```slim
.cell.small-12.medium-3.overflow-y-auto.max-h-inherit.bg-gray-100
  .py-1/2.pl-1/2
    ul.list.list--plain.w-full
      ruby:
        cls = %w(d-f ai-c px-1 font-medium h-9 rounded-l-lg transition)
        active_cls = cls + %w(bg-purple-100 text-white hover:text-white)
        inactive_cls = cls + %w(text-midnight hover:bg-purple-20 hover:text-midnight)
```

**Exact key values:**
- Pane background: `bg-gray-100` (legacy gray utility, not Elevate neutral naming)
- Parent item height: `h-9` = `36px`
- Parent row horizontal padding: `px-1` = `4px` utility scale
- Left corners rounded on rows: `rounded-l-lg`

**Active state required by user prompt:**
- Background: `purple-100`
- Text: `white`
- Hover text remains white

**Inactive state:**
- Text: `midnight`
- Hover background: `purple-20`
- Hover text: `midnight`

**Exact active/inactive class strings:**

```ruby
active_cls = %w(d-f ai-c px-1 font-medium h-9 rounded-l-lg transition bg-purple-100 text-white hover:text-white)
inactive_cls = %w(d-f ai-c px-1 font-medium h-9 rounded-l-lg transition text-midnight hover:bg-purple-20 hover:text-midnight)
```

**Important implementation note:**
- In production, parent categories are server-rendered links, not client-side toggles.
- Clicking a parent triggers a request to `/navigation/:category_type/items/:id` and the whole Turbo frame response re-renders with a different selected parent.

### Mega Menu Right Pane (Subcategories)

Markup excerpt:

```slim
.cell.small-12.medium-9.overflow-y-auto.max-h-inherit
  .my-1
    ul.list.list--plain.columns-2
      - mega_menu.data[selected_parent].each do |subcategory|
        li.d-f.leading-9.ai-c
          = link_to subcategory.name, category_url(subcategory),
            class: 'link ellipsis fw-regular c-midnight-100 hover:c-midnight-100 visited:c-midnight-100'
```

**Visual characteristics:**
- Right pane consumes 9/12 columns on medium+
- Link list is rendered in **2 columns** within that pane (`columns-2`)
- Each row uses `leading-9` suggesting ~`36px` line box
- Link text is regular weight
- Text stays `midnight-100` in default, hover, and visited states
- Overflow is ellipsized

### Mega Menu “All Categories” Row

Bottom row of left pane:

```slim
li.border-top
  = link_to t('navbar.all_categories'), categories_url(q: { category_type_eq: category_type }),
    class: inactive_cls, data: { eventscope: 'All', turbo: false }
```

This is visually styled like an inactive parent row, separated by a top border.

### Vendor Dropdown Trigger

Source markup:

```slim
li.topnav__nav__li.show-for-xxlarge *menu_attrs
  = link_to 'javascript:void(0);', role: 'menuitem', class: 'flex ai-c topnav__link simple-menu__anchor', aria: { haspopup: true, expanded: false } do
    = t('navbar.for_vendors')
    = render Elevate::Icon::Component.new(file_name: 'ui-icon-chevron-down', size: :sm, class: 'elv-ml-1')
  ul.simple-menu__body.simple-menu__body--plain aria-hidden='true'
```

Actual label from locale:
- `navbar.for_vendors: G2 for Business`

**Visual behavior:**
- Only visible at `xxlarge+`
- Same 15px nav typography and 10/12 padding rhythm
- Chevron-down icon appended at right
- Uses simple-menu hover behavior instead of Turbo frame

### Vendor Dropdown Body Styling

From `_simple_menu.scss`:

```scss
.simple-menu__body {
  @include border;
  background: $white;
  border-radius: rem-calc(3);
  bottom: 0;
  box-shadow: 0 2px 4px branding-color(midnight, 30);
  display: none;
  position: absolute;
  transform: translateY(100%);
  z-index: 10;

  &--plain {
    @include border(branding-color('midnight', 40));
    box-shadow: none;
    list-style: none;
  }
}
```

**Exact plain dropdown values:**
- Background: `#fefefe`
- Border radius: `3px`
- Border color: `branding-color('midnight', 40)` = `#a7a7ac`
- Shadow: none (plain variant disables default shadow)
- Absolute positioning below trigger via `translateY(100%)`

### Vendor Dropdown Item Layout

Markup:

```slim
li = track_link_to(link_url, ..., class: 'topnav__link topnav__link--plain') do
  .fd-c.w-40
    div = t("navbar.seller.#{key}.link")
    .text-tiny-no-fw = t("navbar.seller.#{key}.sub_head")
```

**Menu entries in production:**

| Key | Label | Subhead |
|---|---|---|
| `vendor` | `For Marketers` | `Enhance your G2 profile and reach in-market buyers` |
| `sales` | `For Sales` | `Find, engage, and convert in-market buyers` |
| `services` | `For Services` | `Reach companies that need you, when they’re ready to buy` |
| `invest` | `For Investments` | `Gain access to real-time software trends` |
| `developers` | `For Developers` | `Use our Developer Portal to test API data` |

`developers` only renders if `config.developers_enabled.call` returns truthy.

**Width:**
- Inner stack uses `.w-40` = `10rem` = `160px`

### Deals Link

Rendered only if `config.deals_link.present?` and only at `xxlarge+`.

Label from locale:
- `Deals`

No extra icon.

### Wishlist Pin Button

Desktop version:

```slim
li.topnav__nav__li.elv-pl-3 role='none' elv='true'
  = render Elevate::IconButton::Component.new(icon_type: 'ui-icon-pin-filled',
                                              size: :sm,
                                              variant: :primary_inverted,
                                              ...)
```

Mobile utility version:

```slim
= render Elevate::IconButton::Component.new(icon_type: 'ui-icon-pin-filled',
                                            size: :sm,
                                            variant: :tertiary,
                                            ...)
```

**Behavioral/visual distinctions:**
- Same icon: filled pin
- Desktop uses inverted/stronger visual treatment
- Mobile uses tertiary style
- Both navigate to `config.user_wishlists_link + #main`
- Both carry `ue='login-modal-toggle'` so logged-out clicks can trigger auth flow
- ARIA label uses `navbar.my_list` = `Research Boards`

### Primary CTA: Logged-out / Logged-in Buyer

Source partial:

```slim
= track_link_to config.new_review_link.call,
                Event::SurveyResponses::Take::Click.new(placement: 'Navbar'),
                { class: 'btn btn--rounded btn--purple', ue: 'global-review-button', 'data-turbo-frame': '_top' } do
  = t('navbar.write_review')
```

Locale value:
- `navbar.write_review: Leave a Review`

Button styling from `_btn.scss`:
- Font size: `18px`
- Rounded radius with `btn--rounded`: `18px`
- Purple fill from `btn--purple`
- Base button padding: `8px 24px`
- Purple background uses base `branding-color('purple') = #5a39a2`
- Hover fill darkens by 15%

**Important note:**
- This is visually a legacy G2 button, not an Elevate button.
- It is larger than the 15px nav links and acts as the primary high-emphasis anchor in the desktop nav.

### Logged-out Auth Button

Source partial:

```slim
= link_to WebStyle.config.signup_link,
          ue: 'login-modal-toggle',
          class: 'btn btn--rounded btn--hollow btn--purple' do
  = t 'navbar.join_or_sign_in'
```

Locale value:
- `Join or Log In`

**Visual styling:**
- Same button typography family as other legacy buttons
- Font size: `18px`
- Border radius: `18px`
- Hollow purple style:
  - white background
  - purple border
  - purple text
- Hover keeps white background, purple border, purple text, and adds inset shadow

This is the desktop logged-out replacement for the profile menu.

### Saved Notification Toast

Source SCSS:

```scss
.topnav__notifier {
  @include border(branding-color('success'));
  background-color: branding-color('offwhite', 13);
  border-radius: 3px;
  display: none;
  position: fixed;
  right: 6px;
  top: 6px;
  width: rem-calc(250);
  z-index: 1;
}
```

**Exact values:**
- Border: `1px solid #14855f`
- Background: `branding-color('offwhite', 13)` = `#fafafa`
- Border radius: `3px`
- Position: `fixed`
- Top: `6px`
- Right: `6px`
- Width: `250px`
- Initially hidden

Template content:

```html
<div class='d-f p-half fd-c'>
  <div class="d-f ai-c c-success-100">
    <%= inline_icon('checkmark-thick', class: 'tiny mr-half c-success-100', decorative: true) %>
    <div class="fw-semibold">{{ notification_text.saved }}</div>
  </div>
  <div class="paper paper--box d-f ai-c jc-fs p-half my-1 ellipsis">
    <div class="logo-wrap m-0">
      <img class="xsmall-logo" src="{{ favicon_url }}" />
    </div>
    <div class="ml-half">
      <div>{{ name }}</div>
    </div>
  </div>
  <div>
    <%= link_to "{{ notification_text.see_all }}", "{{ notification_link }}", class: 'link' %>
  </div>
</div>
```

**Visual contents:**
- Success check icon + success-colored label
- Follow-up card showing favicon/logo + item name
- Link to see all saved items

### Profile Dropdown Trigger

Profile trigger is lazy loaded via Turbo frame:

```slim
turbo-frame.w-full id='profile-dropdown-menu' src="#{config.user_menu_link.call}" loading='lazy'
  = render Elevate::Icon::Component.new(file_name: 'ui-icon-loading', size: :lg, class: 'elv-w-56 elv-animate-spin elv-fill-purple')
```

Once loaded, the trigger button is:

```slim
= render Elevate::Button::Component.new(variant: :text,
                                        icon_position: :right,
                                        icon: 'ui-icon-chevron-down',
                                        html_options: { class: 'elv-text-neutral',
                                                        data: { action: 'click->popover-menu#toggle' } }) do
  .relative
    = render user_avatar(size: :tiny)
```

**Avatar size:**
- `.avatar--tiny` = `31px × 31px`

**Visual characteristics:**
- Tiny circular avatar image or monogram
- Neutral text-colored chevron-down aligned to the right
- Minimal button chrome because it uses text button variant

### Profile Dropdown Card Container

Source Ruby class string:

```ruby
%w(after:border-t-transparent after:border-x-transparent
   after:border-b-white after:top-[-24px] after:border-[12px] right-0 popover-menu
   absolute rounded-lg shadow-lg bg-white w-72 mt-1 z-20 p-1/2).join(' ')
```

**Exact values implied by utilities:**
- Position: `absolute`
- Right aligned: `right: 0`
- Width: `w-72` = `18rem` = `288px`
- Top spacing: `mt-1` = `4px`
- Background: white
- Radius: `rounded-lg`
- Shadow: `shadow-lg`
- Padding: `p-1/2` = `2px` utility scale in this codebase
- Z-index: `20`
- Pointer triangle:
  - top offset: `-24px`
  - border size: `12px`
  - bottom triangle color: white

### Profile Dropdown Header Block

Markup:

```slim
.rounded-lg.bg-white.flex.flex-col.items-center.gap-1/2.shadow.p-1
  = track_link_to Routes.user_url(id: '~') ... do
    = render user_avatar(size: :large)
    .l2.mb-0 = user.preferred_name
    - if show_industry_and_company?
      span.text-midnight = "%{industry} at %{company}"
    .text-xs.text-gray-400.mt-1.flex.flex-row.items-center.gap-1
      = t('users.member_since')
      span = l user.created_at, format: :day
      = inline_icon('qualify-green', decorative: true)
  = render Linkedin::Verify::VerificationDisplayComponent.new(...)
```

**Visual pieces:**
- Large avatar: `.avatar--large` = `90px × 90px`
- Preferred name as the most prominent text line
- Optional industry/company line only if both values present
- Secondary metadata row:
  - `Member since`
  - formatted date
  - green qualify icon
- Below that: LinkedIn verification display or verification CTA block

### LinkedIn Verification Block

If already verified:

```slim
.bg-gray-100.rounded-lg.font-semibold.border.border-gray-100.w-fit
  .flex.items-center class='m-[8px]'
    = image_tag 'linked-in.svg', class: 'text-linkedin !h-5 !w-5'
    .ml-half
      .elv-text-subtle = t('linkedin_verify.verified')
```

If not verified but allowed:
- Renders a verification button
- Shows FAQ / “we use this data” links beneath

For static recreation, the dropdown should reserve space for a **LinkedIn verification panel** directly below user identity.

### Profile Dropdown Navigation List

Source item definitions:

```ruby
[
  { name: 'my_software', icon: 'pictogram-laptop', translation: 'Products I Use' },
  { name: 'research_boards', icon: 'ui-icon-pin', translation: 'Research Boards' },
  { name: 'my_reviews', icon: 'pictogram-review', translation: 'My Reviews' },
  { name: 'achievements', icon: 'pictogram-medal', translation: 'Achievements' },
  { name: 'rewards', icon: 'pictogram-trophy', translation: 'Rewards' },
  { name: 'notifications', icon: 'pictogram-notification', translation: 'Notifications' },
  { name: 'settings_and_preferences', icon: 'ui-icon-settings', translation: 'Settings & Preferences' },
  { name: 'account_details', icon: 'pictogram-clipboard', translation: 'Account Details' }
]
```

Each row renders as:

```slim
.flex.flex-row.items-center.gap-3
  = render item_icon
  span.c-midnight-100 = translated_name
```

**Visual rhythm:**
- Horizontal flex row
- Gap: `gap-3` = `12px`
- Dark text color (`midnight-100`)
- Mix of pictogram and UI icon sizes:
  - pictograms render `:xs`
  - standard UI icons render `:md`

### Vendor Admin Row Inside Profile Dropdown

Rendered first above standard items:

```slim
= track_link_to Routes.user_url(id: '~', tab: 'vendor_admin'), ..., { ue: 'hide-unless-admin' } do
  .flex.flex-row.items-center.gap-3
    = render Elevate::Icon::Component.new(file_name: 'pictogram-shield', size: :xs)
    span.c-midnight-100 = t('users.vendor_admin')
```

**Key point:**
- The row is in the DOM for the dropdown template, but visibility is gated by `ue='hide-unless-admin'`.
- Seller/admin state should show this row; buyer state should not.

### Sign Out Row

```slim
= track_link_to Routes.logout_url, logout_event, { data: { turbo: false } } do
  .flex.flex-row.items-center.gap-3.border-t.border-t-midnight-50.pt-1/2
    span.c-midnight-100 = t('navbar.signout')
```

**Visual characteristics:**
- Top divider line separates sign-out from profile actions
- Padding top: half unit
- Text only, no icon in current markup

### Mobile Utility Area (Below Xlarge)

Rendered after main nav list:

```slim
.flex.xl:hidden.right-menu-wrapper.ai-c
  .flex.ai-c.mx-1
    [wishlist pin icon]
  #mobile-nav.topnav__item.topnav__item--hamburger
    [hamburger link]
```

**Behavior:**
- Only visible below `1000px`
- Contains:
  - pin icon button
  - hamburger menu trigger

### Hamburger Trigger

Markup:

```slim
= track_link_to '#', Event::Navbar::MobileNav::Opened.new, class: 'd-f', ue: 'off-canvas',
  data: { toggle: 'off-canvas-right', off_canvas_targets: '.off-canvas-wrapper', off_canvas_value: 'mobile-menu--active' } do
  = inline_icon('hamburger', class: 'medium topnav__hamburger')
```

Source SCSS:

```scss
.topnav__hamburger {
  color: branding-color('midnight');
}

.mobile-menu--active svg.topnav__hamburger {
  color: branding-color('rorange');
}
```

**Exact values:**
- Default icon color: `#252530`
- Active/open color: `#ff492c`

### Off-Canvas Mobile Panel

Layout shell:

```slim
aside.off-canvas.position-right(id='off-canvas-right' data-off-canvas=true data-position='right')
  = yield :off_canvas_right
.off-canvas-content data-off-canvas-content=true
```

Foundation defaults:
- Right off-canvas width: `250px`
- Height: `100%`
- Transition length: `0.5s`
- Transition timing: `ease`

Local overrides / active styling:

```scss
.mobile-menu--active {
  .off-canvas-content { opacity: 60%; }
  .off-canvas { background: $white; }
  .position-right.is-transition-push.is-open { box-shadow: -6px 0 12px 0 rgba($black, 0.3); }
  .position-right.is-transition-push::after { background-color: $body-background; box-shadow: none; }
}
```

**Visual result:**
- White right-side sheet
- Main page dims to 60% opacity
- Sheet casts left shadow: `-6px 0 12px 0 rgba(0,0,0,0.3)`

### Mobile Menu Row Styling

From `_mobile_menu.scss`:

```scss
.mobile-menu__item { margin-bottom: $global-padding / 3; }
.mobile-menu__item--header { margin: 0; padding: 0.7rem 1rem; padding-right: 0; }
.mobile-menu__item--indented { padding-left: $global-padding; }

.mobile-menu__content {
  padding: 0.7rem 1rem;
  font-weight: $fw-semibold;
}

.mobile-menu__content--header {
  border-top: $default-border;
  padding: $global-padding 0 0 0;
  line-height: 1;
}
```

With `$global-padding = 24px`:
- Regular row padding: `0.7rem 1rem` ≈ `11.2px 16px`
- Indented rows: additional `24px` left padding
- Header block top padding: `24px`

### Mobile Menu Information Architecture

The mobile menu content appears in this order:

1. Home
2. Leave a Review
3. Browse (header)
4. Top Categories (drilldown parent)
5. All Categories
6. Software Categories
7. AI Agents
8. Service Categories
9. Compare Software
10. Deals
11. My Profile (header)
12. Logged-in rows OR Join or Log In CTA
13. G2 for Business
14. Close Menu

### Mobile Drilldown Submenu

The `Top Categories` row opens a nested `ul.menu.vertical` and Foundation drilldown animates it horizontally.

Production submenu contents:
- repeated header `Top Categories`
- dynamic top categories list from `config.top_categories.call`
- `All Categories` final row

Foundation drilldown behavior:
- child submenu positioned `left: 100%`
- active submenu transforms by `translateX(-100%)`
- closing submenu translates opposite direction
- transition duration: `0.15s linear`

### Mobile Logged-out CTA

In mobile nav, logged-out users see:

```slim
= track_link_to config.signup_link, ..., ue: 'return-to-here' do
  .btn.btn--hollow.btn--purple.btn--rounded
    = t('navbar.join_or_sign_in')
```

This is the same visual button recipe as desktop logged-out CTA, but rendered inside the drawer content.

### Mobile Logged-in Profile Section

When logged in and not bot-detected, the `My Profile` section includes:
- Profile
- Vendor Admin (`ue='hide-unless-admin'`)
- Software I Use
- Research Boards
- Notifications
- Sign Out

### Mobile Vendor Footer Row

At bottom:

```slim
= track_link_to t('navbar.sell'), config.vendor_link, ..., class: 'mobile-menu__content mobile-menu__content--header'
```

Locale value:
- `navbar.sell: G2 for Business`

### Custom Profile Suppression

Search has `.hide-for-custom-profile`.

Source utility:

```scss
.is-custom-profile {
  .hide-for-custom-profile {
    display: none;
  }
}
```

So on custom profile pages, desktop search is forcibly removed.

### Color Reference Table

Legacy production values used by this navigation:

| Usage | Source expression | Hex |
|---|---|---|
| Topbar background | `$white` | `#fefefe` |
| Border bottom | `branding-color('midnight', 40)` | `#a7a7ac` |
| Nav default text | `branding-color('midnight', 80)` | `#505059` |
| Hover background | `branding-color('blue', 10)` | `#e8f3f9` |
| Hover text | `branding-color('midnight')` | `#252530` |
| Brand logo / active hamburger | `branding-color('rorange')` | `#ff492c` |
| Simple topbar bg | `branding-color('rorange', 5)` | `#fef5f4` |
| Saved toast bg | `branding-color('offwhite', 13)` | `#fafafa` |
| Success border | `branding-color('success')` | `#14855f` |
| Mega menu active bg | `purple-100` utility | visually deep purple |
| Mega menu active text | `white` | `#ffffff` |

### Typography Summary

| Element | Production value |
|---|---|
| Top-level nav links | `15px`, semibold parent container |
| Search placeholder | `15px` |
| CTA buttons | `18px` legacy button font |
| Mobile menu rows | semibold, inherited body sizing |
| Profile trigger avatar | 31px square avatar |
| Profile card name | larger utility typography class `.l2` |
| Profile metadata | `text-xs` style row |

### Elevate Token Mapping Notes

Closest Elevate Lite token matches for static implementation:

| Production value | Elevate token suggestion |
|---|---|
| `#fefefe` topbar bg | `var(--bg-neutral-0)` (`#ffffff`) |
| `#a7a7ac` border | between `var(--border-medium)` and custom legacy value |
| `#505059` nav text | close to `var(--text-neutral)` / `var(--palette-neutral-80)` |
| `#252530` hover text | close to `var(--text-default)` / `var(--palette-neutral-100)` |
| `#e8f3f9` hover bg | no exact Elevate token; custom legacy value required |
| `#ff492c` brand accent | `var(--bg-brand)` |
| Deep purple CTA / active left nav | close to `var(--bg-primary)` |
| White text | `var(--text-inverted)` |
| Search focus outline `#c3bde5` | close to `var(--border-focus)` |

**Important:** exact fidelity requires retaining some custom legacy values rather than forcing every color into an existing Elevate token.

---

## Behavioral Specifications

### Top-Level Render Conditions

The topbar computes several runtime flags before rendering:

```ruby
logged_in = current_user.present?
resolved_vendor_id = logged_in ? config.topnav_admin_vendor_id_resolver.call(current_user) : nil
topnav_admin_eligible = resolved_vendor_id.present?
hide_bot_link = config.bot_detected_resolver.call(self)
```

These values affect:
- whether auth UI is buyer or logged-out state,
- whether seller/admin CTA frame replaces `Leave a Review`,
- whether review CTA is hidden from bots.

### Caching

Topbar shell is cached for 15 minutes using a key that includes:
- `simple_top_bar?`
- `logged_in`
- config
- nav class
- localization route state
- `topnav_admin_eligible`
- `hide_bot_link`

Off-canvas mobile menu is separately cached for 15 minutes using:
- `logged_in`
- config

For Elevate Lite static HTML, caching is irrelevant, but it matters because production UI is intentionally split into fragments.

### Desktop vs Mobile Switching

The nav does not transform one DOM tree into another. It renders **two different interaction systems**:

1. **Desktop system** at `xlarge+`:
   - horizontal list
   - hoverable mega menus
   - hoverable vendor dropdown
   - lazy-loaded profile dropdown

2. **Mobile system** below `xlarge`:
   - pin + hamburger utility row
   - right off-canvas panel
   - drilldown submenu for top categories

### Mega Menu Trigger Behavior

Each category trigger uses pure hover for visible opening:

```slim
.group-hover:flex
```

The visible body is not controlled by `simple-menu`; it is CSS hover + Turbo frame.

Behavior sequence:

1. User hovers `Software` or `Services`
2. Hoverable `li` gains pale blue background
3. Hidden absolute container becomes `display:flex`
4. Turbo frame loads remote content from:
   - `/navigation/software/items`
   - `/navigation/service/items`
   - localized prefix added for non-default locales
5. While frame is empty, a loading skeleton placeholder (`.h-96`) is shown
6. Once content arrives, left pane shows parent categories, right pane shows selected parent’s subcategories

### Mega Menu Content Routing Behavior

Controller logic:

```ruby
def selected_parent
  @selected_parent ||= if params[:id]
                         Category.find_by_friendly_id(params[:id])
                       else
                         mega_menu.data.keys.first
                       end
end
```

Implications:
- initial frame request with no `:id` selects the first parent category
- clicking a parent category re-requests the Turbo frame with a specific `:id`
- the frame is server-driven, not client-side filtering

### Mega Menu Edge Pin Behavior

`EdgePinController` behavior:

```js
if (this.pinned) {
  const rect = this.element.getBoundingClientRect();
  this.element.style.left = `-${rect.left}px`;
  this.element.style.width = `${window.innerWidth}px`;
}
```

This solves a layout problem:
- the dropdown is nested inside a centered page container
- but the dropdown needs to visually align to viewport edges
- on visibility, JS offsets left and forces full viewport width

For static Elevate Lite, the simplest recreation is to place the dropdown outside the centered shell or simulate the same width/offset with CSS/JS.

### Vendor Dropdown Behavior (`simple-menu`)

Vendor menu opts:

```ruby
menu_attrs = {
  ue: 'simple-menu',
  'data-simple-menu-on-hover': 1,
  'data-simple-menu-body': '.simple-menu__body--plain'
}
```

`simple_menu/base.js` behavior:

```js
if (opts.onHover) {
  $el.hover(menu.show, menu.hide);
  $el.on('click', menu.show);
  handleVis();
}
```

Actual effects:
- hover opens menu
- mouse leave hides menu
- click on menu container also shows menu
- anchor `aria-expanded` toggles true/false
- body `aria-hidden` toggles false/true
- outside click closes
- `Escape` closes
- Enter key on anchor opens

### Profile Dropdown Behavior (`popover-menu`)

Trigger button uses:

```html
data-action="click->popover-menu#toggle"
```

Stimulus behavior:

```js
toggle() {
  if (this.hasCardTarget) {
    this.hide();
  } else {
    this.show();
  }
}
```

Rendered popup behavior:
- template content is stored in a `<template>` target
- on show, content is cloned and appended to the trigger root
- outside click closes via `useClickOutside`
- explicit close button inside card also closes

There is also unused hover support in the controller (`toggleHover` with 200ms hide delay), but the profile trigger in this nav uses click only.

### Seller/Admin CTA Lazy Loading

Desktop CTA area logic:

```slim
- if topnav_admin_eligible
  turbo-frame.elv-h-full id='topnav-admin-cta' src=main_app.topnav_admin_cta_path loading='lazy'
- else
  = render 'web_style/header/topnav_control_cta'
```

Controller:

```ruby
vendor_id = current_user ? Users::PrimaryVendorForUser.vendor_id_for(current_user) : nil
return head :no_content if vendor_id.blank?
```

Behavior sequence:

1. Shell determines eligibility by resolver
2. If eligible, it inserts empty lazy Turbo frame
3. Browser fetches `/topnav_admin_cta`
4. If no vendor found, frame returns `204 No Content`
5. If vendor exists, frame renders `Vendors::TopNav::CtaComponent`

### Seller/Admin CTA Interaction Model

Seller/admin CTA is itself another `simple-menu` on hover.

Markup root:

```slim
.elv-h-full ue='simple-menu' data-simple-menu-on-hover=1 data-simple-menu-body='.simple-menu__body'
```

Trigger label:
- `"#{vendor.name} Product Hub"`

Dropdown contents:
- optional `YOUR TOP PRODUCTS` heading
- up to 4 featured product rows
- `View All Products` tertiary button
- `Create Solution Page` primary button that opens an Elevate modal

**Static implementation note:**
- This is a separate seller-only interaction cluster, not just a different CTA label.

### Saved Notification Broadcast Behavior

Widget boot:

```js
const template = partials.byName('web_style/header/saved_entry');
broadcastSavedNotifications($el, template);
```

Broadcast behavior:

```js
notifier.onNotification((savedProduct) => {
  const markup = templateFn(savedProduct);
  $el.html(markup);
  $el.show();
  setTimeout(() => $el.fadeOut(500), 5000);
});
```

**Exact timing:**
- display immediately on notification
- hide starts after `5000ms`
- fade duration `500ms`

### Search Field Clear Button Behavior

Search field JS:

```js
const $clearButton = $el.find('.rounded-search__clear-input-button');
const $input = $el.find('.rounded-search__input');

toggleVisibility(false, $clearButton);

$input.on('input focus', function () {
  const hasValue = $(this).val().length > 0;
  toggleVisibility(hasValue, $clearButton);
});

$clearButton.on('click', function () {
  $input.val('').trigger('input').typeahead('open').focus();
  toggleVisibility(false, $clearButton);
});
```

Effects:
- clear button hidden on empty input
- appears once the input has content
- click clears value, reopens typeahead menu, refocuses field

### Login Modal Toggle Behavior

The actual widget implementation was not located in the audited source set, but the system behavior is inferable from helpers and markup.

Server-side behaviors:

1. `login_required` helper automatically appends `ue='login-modal-toggle'`
2. Links may receive data attributes like:
   - `data-login-modal-toggle-allow-untrusted-user="true"`
   - `data-login-and-return="true"`
   - `data-login-modal-toggle-onboard="true"`
   - `data-prompt-login="true"`
   - `data-login-redirect="..."`

3. `widgetCompiler.js` marks `login-modal-toggle` as above-the-fold, so it is eagerly available.

Observed topnav usages:
- hidden Monty login anchor
- wishlist pin links
- desktop `Join or Log In` button

**Reasonable production behavior summary:**
- clicking protected nav items while unauthenticated opens login/onboarding modal instead of immediate hard navigation
- user may be returned to the initiating action after auth

### Off-Canvas Mobile Open/Close Behavior

Hamburger link declares:

```html
ue="off-canvas"
data-toggle="off-canvas-right"
data-off-canvas-targets=".off-canvas-wrapper"
data-off-canvas-value="mobile-menu--active"
```

Widget behavior:

```js
$('#off-canvas-right').on('open.zf.trigger toggle.zf.trigger closed.zf.offcanvas', function () {
  $targetElements.toggleClass(toggleClass);
});
```

Effects:
- toggles `mobile-menu--active` on `.off-canvas-wrapper`
- drives active hamburger color and page dimming styles
- close link in drawer also uses `ue='off-canvas'` with `data-close='off-canvas-right'`

### Mobile Drilldown Behavior

The drawer root uses:

```slim
ul.mobile-menu.menu.vertical.off-canvas-menu.off-canvas-list.drilldown data-drilldown=true
```

Foundation drilldown then:
- turns parent submenu rows into forward-navigation items
- injects a back row (`.js-drilldown-back`) when moving into a nested list
- animates submenu panels horizontally

### User-State Comparison Table

| Area | Logged Out | Logged In Buyer | Logged In Seller/Admin |
|---|---|---|---|
| Logo | same | same | same |
| Search | same by viewport | same by viewport | same by viewport |
| Software mega menu | yes | yes | yes |
| AI Agents | yes | yes | yes |
| Services mega menu (`xxlarge+`) | yes | yes | yes |
| G2 for Business dropdown (`xxlarge+`) | yes | yes | yes |
| Deals (`xxlarge+`, if configured) | yes | yes | yes |
| Research Boards pin | yes, auth-protected | yes | yes |
| CTA slot | `Leave a Review` | `Leave a Review` | `topnav-admin-cta` lazy seller menu |
| Saved notification toast | no | yes | yes |
| Profile/avatar trigger | no | yes | yes |
| Join or Log In button | yes | no | no |
| Profile dropdown buyer items | n/a | yes | yes |
| Vendor Admin row in profile dropdown | n/a | hidden via gate | visible via gate |
| Mobile My Profile section | auth CTA only | buyer links | buyer links + vendor admin |

### Profile Dropdown Item Table

| Order | Item | Icon | Visible to buyer | Visible to seller/admin |
|---|---|---|---|---|
| 1 | Vendor Admin | `pictogram-shield` | gated hidden | gated visible |
| 2 | Products I Use | `pictogram-laptop` | yes | yes |
| 3 | Research Boards | `ui-icon-pin` | yes | yes |
| 4 | My Reviews | `pictogram-review` | yes | yes |
| 5 | Achievements | `pictogram-medal` | yes | yes |
| 6 | Rewards | `pictogram-trophy` | yes | yes |
| 7 | Notifications | `pictogram-notification` | yes | yes |
| 8 | Settings & Preferences | `ui-icon-settings` | yes | yes |
| 9 | Account Details | `pictogram-clipboard` | yes | yes |
| 10 | Sign Out | no icon in current markup | yes | yes |

### Mobile Menu Item Table

| Order | Row | Type |
|---|---|---|
| 1 | Home | link |
| 2 | Leave a Review | link |
| 3 | Browse | header |
| 4 | Top Categories | drilldown parent |
| 5 | All Categories | link |
| 6 | Software Categories | link |
| 7 | AI Agents | link |
| 8 | Service Categories | link |
| 9 | Compare Software | link |
| 10 | Deals | link |
| 11 | My Profile | header |
| 12a | Profile | logged-in only |
| 12b | Vendor Admin | admin-gated only |
| 12c | Software I Use | logged-in only |
| 12d | Research Boards | logged-in only |
| 12e | Notifications | logged-in only |
| 12f | Sign Out | logged-in only |
| 12g | Join or Log In button | logged-out only |
| 13 | G2 for Business | link/header style |
| 14 | Close Menu | drawer close action |

---

## Accessibility

### Landmark and Labels

Top-level nav markup:

```slim
nav.topnav__inner.page aria-label=t('navbar.mega_menu')
```

Locale value:
- `G2 Top Navigation Menu`

Desktop list markup:

```slim
ul.topnav__item.topnav__nav#nav role='menubar' aria-label=t('navbar.mega_menu')
```

This gives the desktop menu explicit `menubar` semantics.

### Menuitem Roles

Desktop link items often set:

```html
role="menuitem"
```

List items use:

```html
role="none"
```

This is correct menubar pattern structure for the static desktop list.

### Trigger ARIA on Dropdowns

Category trigger and vendor trigger both use:

```html
aria-haspopup="true"
aria-expanded="false"
```

Vendor dropdown JS actively toggles `aria-expanded` when open/closed.

Mega menu trigger markup sets `aria-expanded="false"`, but because visibility is handled through CSS hover + Turbo content, there is no audited JS here updating the attribute during hover. That is an accessibility gap in production.

### Search Accessibility

Desktop and mobile search both include:
- `role="search"` on form
- visible search icon
- hidden text label via `.sr-only`
- explicit `id`/`for` relationships

Search placeholder text:
- `Search Software and Services`

### Logo Accessibility

Logo SVG receives:
- `aria_label: t('navbar.logo_alt')`

Locale value:
- `G2 - Business Software Reviews`

### Wishlist Pin Accessibility

Pin button carries:

```ruby
aria: { label: t('navbar.my_list') }
```

Accessible label resolves to:
- `Research Boards`

### Hamburger Accessibility

Hamburger icon receives:

```ruby
aria_label: t('aria.icons.expand_collapse', item: '')
```

The trigger is still a link to `#`, not a semantic `<button>`, so production semantics are acceptable but not ideal.

### Profile Dropdown Accessibility

Trigger is a real button component and therefore preferable to the anchor-based desktop menu triggers.

Strengths:
- button semantics
- explicit click-to-toggle behavior
- outside-click close

Gaps:
- no documented `aria-expanded` wiring on the profile button in this template
- no audited keyboard arrow navigation inside menu
- no focus trapping within dropdown card

### Mobile Drawer Accessibility

Strengths:
- Foundation off-canvas handles overlay/open/close lifecycle
- close link provided at bottom
- drilldown menus get back-link generation

Gaps:
- trigger is an anchor rather than a button
- no audited `aria-expanded` on hamburger trigger
- drilldown submenu announcements depend on Foundation defaults rather than explicit authored semantics

### Turbo Frame Accessibility Concerns

The nav relies on lazy frames for:
- profile menu
- seller/admin CTA
- category mega-menu bodies

Potential production issues:
- screen readers may encounter a loading spinner before menu content exists
- hover-open mega menu body may not be keyboard-discoverable before content loads

### Production Accessibility Gaps to Fix in Static Recreation

1. **Mega menu keyboard support**
   - Production hover pattern is not enough.
   - Static version should open on focus and button/Enter/Space.

2. **Trigger state management**
   - Update `aria-expanded` reliably on all interactive triggers.

3. **Use buttons instead of dead `javascript:void` anchors**
   - Especially for category triggers and hamburger.

4. **Drawer dialog semantics**
   - Static mobile nav should use a dialog/panel pattern with `aria-modal` if implemented as true overlay.

5. **Profile popover semantics**
   - Add `aria-haspopup="menu"` and keyboard support.

6. **Focusable lazy content fallback**
   - For static HTML, include the content directly so it is immediately available to assistive tech.

### Minimum Accessibility Contract for Elevate Lite Recreation

Required:
- semantic `<nav>` with label
- search form with `role="search"`
- button triggers for dropdowns
- `aria-expanded` on all expandable triggers
- keyboard open/close for mega menu, vendor menu, profile menu, and drawer
- visible focus states matching or improving on production
- meaningful labels on icon-only buttons

---

## Component Architecture

### Production Architecture Tree

```text
_topbar.html.slim
├── logo link
├── _search.html.slim
│   └── typeahead/_navbar.html.slim
│       └── search_field widget + typeahead widget
├── desktop nav list
│   ├── hidden .js-monty-login anchor
│   ├── _category_nav_link.html.slim (Software)
│   │   └── Turbo frame -> NavigationController -> navigation/_menu.html.slim
│   ├── AI Agents link
│   ├── _category_nav_link.html.slim (Services)
│   │   └── Turbo frame -> NavigationController -> navigation/_menu.html.slim
│   ├── _vendor_menu.html.slim
│   │   └── simple-menu widget
│   ├── Deals link
│   ├── Elevate IconButton pin
│   ├── CTA slot
│   │   ├── _topnav_control_cta.html.slim OR
│   │   └── topnav-admin-cta Turbo frame
│   │       └── TopnavCtasController
│   │           └── Vendors::TopNav::CtaComponent
│   │               └── simple-menu widget + modal trigger
│   └── auth slot
│       ├── _signup_links.html.slim OR
│       └── profile-dropdown-menu Turbo frame
│           └── Users::Profile::DropdownComponent
│               ├── PopoverMenuController
│               ├── Users::AvatarComponent
│               ├── Linkedin::Verify::ModalComponent
│               ├── Linkedin::Verify::VerificationDisplayComponent
│               └── Users::Profile::Dropdown::ItemComponent collection
├── mobile search row
└── mobile utility row
    ├── pin icon
    └── hamburger trigger

content_for :off_canvas_right
└── _mobile_nav.html.slim
    └── Foundation off-canvas + drilldown
```

### Request/Render Dependencies

#### 1. Topbar shell
- server-rendered in page layout
- cached fragment

#### 2. Mega menu bodies
- **lazy loaded** per category type through Turbo frame
- endpoint:
  - `/navigation/software/items`
  - `/navigation/service/items`

#### 3. Profile dropdown
- **lazy loaded** through Turbo frame `src=config.user_menu_link.call`
- default path from config: `/user_menus`

#### 4. Seller/admin CTA
- **lazy loaded** through Turbo frame `src=main_app.topnav_admin_cta_path`

#### 5. Saved notification
- not server-loaded on demand; instead uses client-side broadcast to inject Mustache-rendered HTML

### Why Static Elevate Lite Should Flatten This

The production architecture is optimized for dynamic app behavior, not reusable documentation or prototyping.

A static HTML component should flatten these dependencies into:

1. one HTML shell for each user state,
2. inlined mega-menu markup,
3. inlined profile dropdown markup,
4. optional seller/admin CTA variant markup,
5. optional JS only for open/close interactions.

### Desktop Shell Structure Recommended for Static Recreation

```text
nav.g2-topnav
├── logo
├── search
├── primary-links
│   ├── software-trigger + mega-panel
│   ├── ai-agents-link
│   ├── services-trigger + mega-panel
│   ├── g2-for-business-trigger + vendor-panel
│   ├── deals-link
│   ├── research-boards-pin
│   ├── primary-cta OR seller-hub-trigger
│   └── auth block OR profile-trigger + profile-panel
└── mobile utilities
```

### State-Based Static Templates Needed

At minimum Elevate Lite should ship three desktop templates and one mobile drawer template per auth state.

Suggested template set:

1. `g2-topnav-logged-out.html`
2. `g2-topnav-logged-in-buyer.html`
3. `g2-topnav-logged-in-seller.html`
4. `g2-topnav-mobile-logged-out.html`
5. `g2-topnav-mobile-logged-in-buyer.html`
6. `g2-topnav-mobile-logged-in-seller.html`

### Category Mega Menu Data Shape

Production expects a `Categories::MegaMenu` object with:
- parent categories as keys
- arrays of subcategories as values

Static recreation should replace this with hard-coded sample content or documented placeholders.

### Seller CTA Data Shape

Production expects:
- seller/vendor object
- featured product array (up to 4)
- solution-eligible product array

Static recreation should represent this as:
- company avatar/logo
- trigger label `[Vendor Name] Product Hub`
- 0–4 product rows
- `View All Products` button
- `Create Solution Page` primary action

### Profile Dropdown Data Shape

Production needs:
- avatar image or initials
- preferred name
- optional industry + company
- member-since date
- LinkedIn verification state
- admin eligibility flag

Static recreation should expose these as documented content slots.

### Config-Driven Links in Production

Defaults from `WebStyle::Config`:

| Link | Default |
|---|---|
| root | `/` |
| signup | `/login?form=signup` |
| profile | `/users/~` |
| vendor admin | `/users/~?tab=vendor_admin` |
| stack | `/users/~/stack` |
| research boards | `/users/~?tab=my_lists` |
| notifications | `/users/~?tab=notifications` |
| logout | `/logout` |
| software categories | `/categories?q[category_type_eq]=software` |
| services | `https://sell.g2.com/g2-for-services` (vendor menu) |
| compare | `/compare` |
| categories | `/categories` |
| deals | `/deals` |
| AI agents | `/categories/ai-agents` |
| new review link | proc default `/review` but topnav locale also references review flow |
| vendor link | `https://sell.g2.com` |

### Notes on Mixed Legacy + Elevate UI Composition

This nav is visually inconsistent by design lineage:
- topbar shell and search are legacy G2 web_style pieces
- wishlist pin uses Elevate icon button
- profile trigger uses Elevate button + icon
- seller/admin CTA menu uses full Elevate components inside legacy topbar

This is important for static recreation: **faithful reproduction may look like a hybrid**, because production actually is a hybrid.

---

## Code Snippets

### 1. Topbar Shell

```slim
.topnav data-eventscope='Topbar' class="#{nav_class} #{simple_top_bar? ? 'topnav--simple' : ''}"
  nav.topnav__inner.page aria-label=t('navbar.mega_menu')
    .topnav__item.topnav__item--logo
      = track_link_to config.root_link, Event::Navbar::IconClicked.new, id: 'primary-nav-logo' do
        = inline_icon ::AssetPath::Image::G2Logo::Icon.name, class: 'topnav__item__g2 g2-logo', aria_label: t('navbar.logo_alt')
```

### 2. Core Topnav SCSS Constants

```scss
$topnav-logo-size: 52px;
$topnav-height: 72px;

.topnav {
  $hover-bg-color: branding-color('blue', 10);
  $hover-color: branding-color('midnight');
  @include border-bottom(branding-color(midnight, 40));
  background: $white;
  position: relative;
  z-index: $sticky-wrapper-z-index + 1;
}
```

### 3. Desktop Nav Link Styling

```scss
.topnav__nav {
  .topnav__link {
    font-size: rem-calc(15);
    padding: rem-calc(10) rem-calc(12);

    &:hover {
      background-color: $hover-bg-color;
      color: $hover-color;
    }
  }
}
```

### 4. Category Trigger + Turbo Frame

```slim
li class="topnav__nav__li topnav__nav__li--hoverable group #{responsive_class}" role='none'
  = link_to 'javascript:void', role: 'menuitem', aria: { haspopup: true, expanded: false }, class: 'topnav__link js-menu-anchor' do
    = category_type_name
    = render Elevate::Icon::Component.new(file_name: 'ui-icon-chevron-down', size: :sm,
                                          class: 'elv-ml-1', aria: t('navbar.expand_menu', menu: category_type_name))

  .p-a.z-50.top-full.d-n.group-hover:flex.jc-c.left-0.right-0.pointer-events-none ue='edge-pin'
    .page-width.pointer-events-auto
      .z-50.w-full.bg-white.shadow-lg.rounded-lg.overflow-hidden class='max-h-2/3-screen'
        = turbo_frame_tag "navigation-#{category_type}-menu", src: localized_path, loading: 'lazy', class: 'max-h-inherit' do
          .loading-container.ajax-loading.ajax-loading--tiny
            .h-96
```

### 5. Mega Menu Content Layout

```slim
= turbo_frame_tag "navigation-#{category_type}-menu", class: 'max-h-inherit' do
  .grid-x.grid-margin-x.h-full.max-h-inherit.fw-initial data-eventscope="#{category_type.capitalize} menu"
    .cell.small-12.medium-3.overflow-y-auto.max-h-inherit.bg-gray-100 data-eventscope="Parents"
      .py-1/2.pl-1/2
        ul.list.list--plain.w-full
          ruby:
            cls = %w(d-f ai-c px-1 font-medium h-9 rounded-l-lg transition)
            active_cls = cls + %w(bg-purple-100 text-white hover:text-white)
            inactive_cls = cls + %w(text-midnight hover:bg-purple-20 hover:text-midnight)

    .cell.small-12.medium-9.overflow-y-auto.max-h-inherit data-eventscope=selected_parent.name
      .my-1
        ul.list.list--plain.columns-2
```

### 6. Vendor Dropdown Trigger

```slim
li.topnav__nav__li.show-for-xxlarge *menu_attrs
  = link_to 'javascript:void(0);',
            role: 'menuitem',
            class: 'flex ai-c topnav__link simple-menu__anchor',
            aria: { haspopup: true, expanded: false } do
    = t('navbar.for_vendors')
    = render Elevate::Icon::Component.new(file_name: 'ui-icon-chevron-down', size: :sm,
                                          class: 'elv-ml-1', aria: t('navbar.expand_menu', menu: 'vendor'))
  ul.simple-menu__body.simple-menu__body--plain aria-hidden='true'
```

### 7. Vendor Dropdown Items

```slim
- keys = %i(vendor sales services invest)
- keys.each do |key|
  li = track_link_to(link_url,
                     Event::Navbar::VendorDropdownClicked.new(dropdown_item: key),
                     role: 'menuitem',
                     class: 'topnav__link topnav__link--plain') do
    .fd-c.w-40
      div = t("navbar.seller.#{key}.link")
      .text-tiny-no-fw = t("navbar.seller.#{key}.sub_head")
```

### 8. Logged-out CTA

```slim
= link_to WebStyle.config.signup_link,
          ue: 'login-modal-toggle',
          class: 'btn btn--rounded btn--hollow btn--purple',
          data: { login_modal_toggle_allow_untrusted_user: 'true', login_and_return: true, login_modal_toggle_onboard: true, onboard: true } do
  = t 'navbar.join_or_sign_in'
```

### 9. Primary Review CTA

```slim
= track_link_to config.new_review_link.call,
                Event::SurveyResponses::Take::Click.new(placement: 'Navbar'),
                { class: 'btn btn--rounded btn--purple', ue: 'global-review-button', 'data-turbo-frame': '_top' } do
  = t('navbar.write_review')
```

### 10. Seller/Admin CTA Frame Gate

```slim
- if topnav_admin_eligible
  turbo-frame.elv-h-full id='topnav-admin-cta' src=main_app.topnav_admin_cta_path loading='lazy'
- else
  = render 'web_style/header/topnav_control_cta', hide_link: hide_bot_link, config: config
```

### 11. Seller/Admin CTA Trigger

```slim
.elv-h-full ue='simple-menu' data-simple-menu-on-hover=1 data-simple-menu-body='.simple-menu__body' role='none'
  = link_to 'javascript:void(0);', role: 'menuitem', class: 'simple-menu__anchor elv-h-full elv-flex elv-items-center',
                                   aria: { haspopup: true, expanded: false } do
    = render Elevate::ControlButton::Component.new(size: :md, type: :button) do |c|
      - c.with_label(size: :md) do
        .elv-flex.elv-items-center.elv-gap-2
          = render Elevate::ProductAvatar::Component.new(size: :xxs, file_url: company_logo_url)
          = trigger_label
      - c.with_dropdown_menu(size: :md)
```

### 12. Search Form in Topnav

```slim
.search-box-wrapper.js-search-field ue='typeahead' id=navbar.id class=navbar.classes data=navbar.typeahead_options
  = form_tag Typeahead.config.search_path, method: :get, role: 'search', class: "rounded-search #{modifier}" do
    .rounded-search__top ue='search-field'
      .rounded-search__label
        = inline_icon 'search', decorative: true
      = button_tag type: 'button', class: 'rounded-search__clear-input-button absolute right-2 z-10' do
        = inline_icon 'close-circled', class: 'small', color: '#6F6D78', decorative: true
      = label_tag navbar.id, navbar.label, class: 'sr-only'
      = text_field_tag navbar.name, navbar.default_value,
        { autocomplete: :off, placeholder: navbar.placeholder, id: navbar.id,
          class: 'ajax-search-field js-query rounded-search__input' }.merge(navbar.input_options)
```

### 13. Search Clear Button JS

```js
export function widget($el, _options) {
  const $clearButton = $el.find('.rounded-search__clear-input-button');
  const $input = $el.find('.rounded-search__input');

  toggleVisibility(false, $clearButton);

  $input.on('input focus', function () {
    const hasValue = $(this).val().length > 0;
    toggleVisibility(hasValue, $clearButton);
  });

  $clearButton.on('click', function () {
    $input.val('').trigger('input').typeahead('open').focus();
    toggleVisibility(false, $clearButton);
  });
}
```

### 14. Profile Dropdown Trigger + Template

```slim
.js-log-click ue='popover-menu' data-event-options=dropdown_opened_event.event_options
  = render Elevate::Button::Component.new(variant: :text,
                                          icon_position: :right,
                                          icon: 'ui-icon-chevron-down',
                                          html_options: { class: 'elv-text-neutral',
                                                          data: { action: 'click->popover-menu#toggle' } }) do
    .relative
      = render user_avatar(size: :tiny)
  template data-popover-menu-target='content'
    div[data-popover-menu-target="card" class=popover_card_classes]
```

### 15. Profile Dropdown Items

```ruby
def items
  [
    { name: 'my_software', tab: 'products_used', icon: 'pictogram-laptop', translation: I18n.t('navbar.my_software') },
    { name: 'research_boards', tab: 'my_lists', url: requirements_path, icon: 'ui-icon-pin', translation: I18n.t('navbar.research_boards') },
    { name: 'my_reviews', tab: 'my_reviews', anchor: 'main', icon: 'pictogram-review', translation: I18n.t('navbar.my_reviews') },
    { name: 'achievements', tab: 'achievements', icon: 'pictogram-medal', translation: I18n.t('navbar.achievements') },
    { name: 'rewards', tab: 'my_rewards', icon: 'pictogram-trophy', translation: I18n.t('navbar.rewards') },
    { name: 'notifications', tab: 'notifications', icon: 'pictogram-notification', translation: I18n.t('navbar.notifications') },
    { name: 'settings_and_preferences', tab: 'privacy_settings', icon: 'ui-icon-settings', translation: I18n.t('navbar.settings_and_preferences') },
    { name: 'account_details', tab: 'profile_details', icon: 'pictogram-clipboard', translation: I18n.t('navbar.account_details') }
  ]
end
```

### 16. Popover Menu Controller

```js
export default class PopoverMenuController extends ApplicationController {
  static targets = ['card', 'content'];

  connect() {
    useClickOutside(this);
  }

  clickOutside() {
    this.hide();
  }

  toggle() {
    if (this.hasCardTarget) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    let content = null;
    if (this.hasContentTarget) content = this.contentTarget.innerHTML;
    if (!content) return;
    this.render(content);
  }
}
```

### 17. Saved Notification Template

```html
<div class='d-f p-half fd-c'>
  <div class="d-f ai-c c-success-100">
    <%= inline_icon('checkmark-thick', class: 'tiny mr-half c-success-100', decorative: true) %>
    <div class="fw-semibold">{{ notification_text.saved }}</div>
  </div>
  <div class="paper paper--box d-f ai-c jc-fs p-half my-1 ellipsis">
    <div class="logo-wrap m-0">
      <img class="xsmall-logo" src="{{ favicon_url }}" />
    </div>
    <div class="ml-half">
      <div>{{ name }}</div>
    </div>
  </div>
  <div>
    <%= link_to "{{ notification_text.see_all }}", "{{ notification_link }}", class: 'link' %>
  </div>
</div>
```

### 18. Saved Notification Timing

```js
const NOTIFICATION_FADEOUT_MS = 500;

export function broadcastSavedNotifications($el, templateFn, hideAfterTime = 5000) {
  notifier.onNotification((savedProduct) => {
    const markup = templateFn(savedProduct);
    $el.html(markup);
    $el.show();
    setTimeout(() => $el.fadeOut(NOTIFICATION_FADEOUT_MS), hideAfterTime);
  });
}
```

### 19. Mobile Drawer Root

```slim
aside.off-canvas.position-right(id='off-canvas-right'
                                data-off-canvas=true
                                data-position='right')
  = yield :off_canvas_right
.off-canvas-content data-off-canvas-content=true
```

### 20. Mobile Menu Structure

```slim
ul.mobile-menu.menu.vertical.off-canvas-menu.off-canvas-list.drilldown data-drilldown=true
  li.mobile-menu__item.mt-half.pt-half
    = track_link_to t('navbar.home'), config.root_link, ...
  li.mobile-menu__item
    = track_link_to t('navbar.write_review'), config.new_review_link.call, ...
  li.mobile-menu__item.mobile-menu__item--header.pr-0
    .mobile-menu__content.mobile-menu__content--header.fw-regular = t('navbar.browse')
```

### 21. Mobile Drilldown Submenu

```slim
li.mobile-menu__item.mobile-menu__item--indented
  = link_to t('navbar.top_categories'), '#', class: 'mobile-menu__content'
  ul.menu.vertical
    .mobile-menu__item.mobile-menu__item--header.pr-0
      .mobile-menu__content.mobile-menu__content--header.fw-regular = t('navbar.top_categories')
    - categories = config.top_categories.call
    - categories.each do |link|
      li.mobile-menu__item.mobile-menu__item--indented.mb-0
        = track_link_to link.label, link.path, ...
```

### 22. Off-canvas Widget Hook

```js
function widget($el, opts) {
  const $targetElements = $(opts.targets);
  const toggleClass = opts.value;
  if (toggleClass) {
    $('#off-canvas-right').on(
      'open.zf.trigger toggle.zf.trigger closed.zf.offcanvas',
      function () {
        $targetElements.toggleClass(toggleClass);
      }
    );
  }
}
```

### 23. Edge Pin Controller

```js
render() {
  if (this.pinned) {
    const rect = this.element.getBoundingClientRect();
    this.element.style.left = `-${rect.left}px`;
    this.element.style.width = `${window.innerWidth}px`;
  } else {
    this.element.style.left = this.originalLeft;
    this.element.style.width = this.originalWidth;
  }
}
```

### 24. Login-required Helper Auto-Appending Widget

```ruby
def add_widget!(obj)
  initial_value = obj['ue'].to_s
  obj['ue'] = "#{initial_value} #{WIDGET_NAME}"
end
```

This is why many auth-protected nav actions implicitly carry `login-modal-toggle`.

---

## Notes for Elevate Lite Implementation

### Simplification Opportunities

1. **Inline all lazy content**
   - Replace Turbo frames with static HTML for mega menus, profile dropdown, and seller/admin CTA.

2. **Flatten state variants into separate examples**
   - Do not attempt to dynamically infer logged-in/admin state in static HTML.
   - Ship discrete examples for logged out, buyer, and seller/admin.

3. **Replace legacy widget hooks with small explicit JS**
   - `ue='simple-menu'` → plain dropdown controller
   - `ue='off-canvas'` → basic drawer toggle
   - `ue='saved-notification'` → optional demo-only toast trigger
   - `ue='edge-pin'` → unnecessary if dropdown is structurally relocated

4. **Drop Monty-specific invisible login trigger**
   - It exists for chat integration, not nav fidelity.

5. **Replace `javascript:void` links with buttons**
   - Better semantics, cleaner examples, identical appearance.

### What Must Stay Exact for Fidelity

Non-negotiable production details:

1. Topbar height: **72px**
2. Logo size: **52px**
3. Nav link font size: **15px**
4. Hover background: **legacy pale blue `#e8f3f9`**
5. Hover text color: **midnight `#252530`**
6. Border-bottom color: **`#a7a7ac`**
7. Stacking order: **99**
8. Mega menu left/right split: **3 columns / 9 columns**
9. Mega menu active parent state: **purple background + white text**
10. Mobile nav must use **drawer + drilldown**, not a simple stacked list, if interaction parity is desired

### Static HTML Strategy by Section

#### 1. Topbar shell
Keep:
- white 72px bar
- logo left
- centered search
- right action cluster

Simplify:
- remove fragment cache concerns

#### 2. Mega menus
Keep:
- Software and Services triggers
- full-width dropdown feel
- left parent nav + right 2-column subcategory list
- active purple parent state

Simplify:
- inline all category content
- use focus/click-open instead of server roundtrip

#### 3. Vendor dropdown
Keep:
- trigger label `G2 for Business`
- 5-item vertical dropdown with title + subhead rows

Simplify:
- no server feature flag required; use a single static version containing Developers row or provide a note

#### 4. Search
Keep:
- understated rounded field
- search icon left
- clear button behavior
- focus ring styling

Simplify:
- replace typeahead with plain input or optional static suggestion menu example

#### 5. Logged-out auth
Keep:
- hollow purple rounded button `Join or Log In`

Simplify:
- link directly to placeholder URL; no login modal widget required

#### 6. Buyer profile dropdown
Keep:
- tiny avatar trigger
- 288px-ish dropdown card
- large identity block
- LinkedIn verification slot
- action list + divider + sign out

Simplify:
- use static user copy and placeholder links

#### 7. Seller/admin CTA
Keep:
- separate seller-only trigger replacing review CTA
- product hub label with company avatar
- product rows + View All Products + Create Solution Page

Simplify:
- static menu content
- modal trigger can be non-functional or open a demo dialog

#### 8. Mobile nav
Keep:
- pin + hamburger in top row
- right-side drawer
- top categories drilldown
- different logged-in/out profile section content

Simplify:
- no Foundation dependency; use native JS/CSS transform panel and nested menus

### Recommended Elevate Lite CSS Token Strategy

Use Elevate tokens where close enough, but allow explicit custom overrides for legacy fidelity.

Suggested token usage:

```css
background: var(--bg-neutral-0);
color: var(--text-default);
font-family: var(--font-sans);
box-shadow: var(--shadow-2);
```

Suggested custom legacy overrides:

```css
--g2-topnav-border: #a7a7ac;
--g2-topnav-link: #505059;
--g2-topnav-hover-bg: #e8f3f9;
--g2-topnav-hover-text: #252530;
--g2-topnav-brand: #ff492c;
--g2-topnav-simple-bg: #fef5f4;
```

### Tailwind/Utility Translation Cheatsheet

| Production class/pattern | Static equivalent |
|---|---|
| `.topnav` | `.g2-topnav` |
| `.topnav__inner` | flex row, 72px height |
| `.topnav__item--logo` | flex center, full height |
| `.topnav__nav` | hidden `<1000px`, flex at desktop |
| `.topnav__nav__li--hoverable` | hoverable dropdown wrapper |
| `.rounded-search--understated` | 18px radius search field |
| `.simple-menu__body--plain` | bordered white dropdown |
| `w-72` | `width: 288px` |
| `w-40` | `width: 160px` |
| `h-9` | `height: 36px` |
| `gap-3` | `gap: 12px` |
| `bg-purple-100 text-white` | active parent tab style |

### Recommended Static JS Scope

Required JS only:
- desktop mega menu open/close via hover + focus + click
- vendor dropdown toggle
- profile dropdown toggle + outside click
- mobile drawer open/close
- mobile drilldown open/back
- search clear button show/hide

Optional demo JS:
- saved notification toast simulator
- seller CTA modal demo

### Recommended Improvements Over Production

1. **Keyboard-open mega menus**
2. **Button semantics for all expandable controls**
3. **Consistent `aria-expanded` updates**
4. **Visible focus ring on nav items and dropdown rows**
5. **No lazy frame dependency**
6. **Single CSS source of truth using Elevate tokens + custom legacy variables**

### Explicit Notes Per Required Audit Section

#### For Visual Specifications
- Use production code values even if `DESIGN.md` disagrees.
- Specifically preserve 72px bar + 52px logo.

#### For Behavioral Specifications
- Document where production depends on Turbo or widgets.
- In static implementation, replace those with simpler direct interactions.

#### For Accessibility
- Treat production as baseline, not ideal target.
- Static component should improve keyboard and ARIA behavior.

#### For Component Architecture
- Represent the production architecture faithfully, but flatten it for implementation.

#### For Code Snippets
- Keep source snippets recognizable and traceable back to UE files.

### Things Elevate Lite Should Not Attempt to Replicate Literally

1. Rails cache keys
2. event-tracking objects
3. `track_link_to`
4. Turbo frame fetch lifecycle
5. login-modal-toggle internals
6. server category data objects
7. vendor resource caching
8. mustache partial registry plumbing

### Things Elevate Lite Should Recreate Visually Anyway

1. loading-state placeholders where useful in docs
2. profile dropdown structure
3. seller hub menu structure
4. success toast appearance
5. drawer and drilldown look/feel
6. breakpoint-dependent item presence

### Suggested Deliverables After This Audit

1. Desktop logged-out nav template
2. Desktop buyer nav template
3. Desktop seller/admin nav template
4. Mobile drawer variants
5. Shared nav CSS
6. Tiny nav interaction script

---

## Summary

The G2 top navigation is a **hybrid legacy-production system** with more moving parts than a typical design-system header. It is not a single component; it is a composed system of server-rendered shells, lazy-loaded fragments, legacy dropdown widgets, Foundation off-canvas/drilldown behavior, and modern Stimulus-powered popovers.

**Most important production facts:**
- Topbar height is **72px**
- Logo footprint is **52px**
- Desktop nav links are **15px**
- Hover background is **`#e8f3f9`**
- Hover text is **`#252530`**
- Border-bottom is **`#a7a7ac`**
- Topbar z-index is **99**
- Mega menu is a **Turbo-loaded 3/9 split layout** with active **purple/white** parent rows
- Mobile nav is a **right off-canvas drawer with drilldown submenu**
- There are **three real user states**: logged out, buyer, seller/admin

**Most important implementation guidance for Elevate Lite:**
- recreate the visuals exactly,
- flatten the dynamic architecture into static HTML variants,
- improve accessibility where production is weak,
- keep legacy colors/spacing where they materially affect fidelity,
- do not let `DESIGN.md` override production code values for this component.

**If someone builds from this audit without looking at source code, they should know:**
- what renders in every user state,
- what appears at every breakpoint,
- what every dropdown contains,
- how the mega menu is structured,
- how the mobile drawer behaves,
- what values to use for height, type, color, spacing, and radius,
- which parts of production are server-driven and should be flattened for static HTML.

---

**Audit completed:** April 30, 2026
**Auditor:** GPT-5.4
**Primary production area audited:** UE `web_style` top navigation + dependent components
**Top navigation source of truth:** production Slim / SCSS / Ruby / widget code, not `DESIGN.md`
