# Slide-Out Panel Component Audit

## Overview

The **Slide-Out Panel** is a full-height modal variant that slides in from the right side of the screen. It extends the base Modal component, inheriting its behavior and accessibility features while adding slide-specific animations and sizing.

**Component Purpose:**
- Display secondary content, forms, or detailed views without navigating away
- Provide contextual actions and information in a focused, contained space
- Slide in from right edge, overlaying main content

**Relationship to Modal:**
- Extends `Elevate::Modal::Component` directly
- Inherits all Modal behavior (open/close, focus management, keyboard handling)
- Overrides dialog styling to add slide animation and full-height layout
- Uses the same Stimulus controller (`elevate--modal`) as standard modals

**File Locations:**
- ViewComponent: `/engines/elevate/app/components/elevate/slide_out_panel/component.rb`
- Header Component: `/engines/elevate/app/components/elevate/slide_out_panel/header/component.rb`
- Template: `/engines/elevate/app/components/elevate/slide_out_panel/component.html.slim`
- Header Template: `/engines/elevate/app/components/elevate/slide_out_panel/header/component.html.slim`
- CSS: `/engines/elevate/app/assets/stylesheets/elevate/components/slide_out_panel.css`
- Shared Controller: `/engines/elevate/app/components/elevate/modal/controller.js`
- Shared Modal Class: `/engines/elevate/app/assets/javascript/elevate/components/modal.js`

---

## Visual Specifications

### Size Variants

Three responsive width variants control panel size:

**1. Third Screen (`:third_screen`)**
```css
.slide-out-panel--third {
  @apply md:elv-w-1/2 lg:elv-w-1/3;
}
```
- Mobile: 100% width
- Tablet (md): 50% width
- Desktop (lg): 33.33% width

**2. Half Screen (`:half_screen`)** — default
```css
.slide-out-panel--half {
  @apply md:elv-w-1/2;
}
```
- Mobile: 100% width
- Tablet+ (md): 50% width

**3. Full Screen (`:full_screen`)**
```css
.slide-out-panel--full {
  @apply md:elv-w-full md:elv-max-w-full;
}
```
- All viewports: 100% width

### Base Dialog Styling

```css
.slide-out-panel {
  @apply elv-bg-neutral-0 elv-p-0 backdrop:elv-bg-neutral-100 backdrop:elv-opacity-40
    elv-h-screen elv-min-h-screen elv-shadow-left-3 elv-my-0 elv-ml-auto elv-mr-0
    elv-w-full elv-max-w-full open:elv-animate-slide-transition-in;
}
```

**Key Specifications:**
- Background: `neutral-0` (white, #ffffff)
- No padding (content sections handle their own spacing)
- Full viewport height: `h-screen` + `min-h-screen`
- Positioned right: `ml-auto mr-0` (auto left margin, zero right margin)
- Shadow: `shadow-left-3` (strong left shadow for depth)
- Backdrop: `neutral-100` at 40% opacity (rgba(32, 31, 35, 0.4))

### Shadow Specification

**Left Shadow (depth level 3):**
```css
box-shadow: 
  0px 0px 1px 0px rgba(32, 31, 35, 0.32),      /* subtle inner edge */
  -18px 0px 28px -4px rgba(32, 31, 35, 0.15);  /* diffused left shadow */
```

This creates a strong left shadow that visually separates the panel from the content behind it.

### Internal Structure

**1. Panel Inner Container**
```css
.slide-out-panel__inner {
  @apply elv-flex elv-flex-col elv-h-full;
}
```
Flexbox column layout filling full height, allowing body to grow and footer to stick bottom.

**2. Header Section**
```css
/* Applied via Header component */
.elv-p-6 .elv-border-b .elv-border-medium .elv-bg-neutral-5
```
- Padding: 24px all sides
- Bottom border: `border-medium` (#e7e5e8, 1px)
- Background: `neutral-5` (#f7f6f7, subtle tonal separation)
- Typography: H5 heading (20px/28px, semi-bold)

**3. Body Section**
```css
.slide-out-panel__body {
  @apply elv-flex-1 elv-overflow-y-auto;
}
```
- Flex grow to fill available space
- Scrollable when content overflows

**4. Footer Section** (optional)
```css
.slide-out-panel__footer {
  @apply elv-border-t elv-border-t-medium elv-p-5;
}
```
- Top border: `border-medium` (#e7e5e8, 1px)
- Padding: 20px all sides
- Typically contains action buttons

---

## Animation Specifications

### Slide-In Animation

The panel slides in from the right edge when opened:

**Keyframe Definition** (from `tailwind.config.js`):
```javascript
keyframes: {
  translateXToZero: {
    '0%': { transform: 'translateX(100%)' },  // fully off-screen right
    '100%': { transform: 'translateX(0)' }    // fully visible
  }
}
```

**Animation Application:**
```javascript
animation: {
  'slide-transition-in': 'translateXToZero 0.5s ease-in-out forwards'
}
```

**Specifications:**
- **Duration:** 0.5s (500ms)
- **Easing:** `ease-in-out` (smooth acceleration and deceleration)
- **Direction:** Starts at `translateX(100%)` (fully off-screen right), ends at `translateX(0)` (in place)
- **Fill mode:** `forwards` (maintains final state after animation completes)
- **Trigger:** Applied via `open:elv-animate-slide-transition-in` (runs when dialog[open] attribute is present)

### Backdrop Fade

The backdrop (semi-transparent overlay behind the panel) uses the native `<dialog>` element's backdrop pseudo-element:

```css
backdrop:elv-bg-neutral-100 backdrop:elv-opacity-40
```

The browser automatically fades the backdrop in/out when the dialog opens/closes, synchronized with the slide animation.

---

## Behavioral Specifications

### Differences from Standard Modal

**Standard Modal:**
- Centered in viewport
- Fixed width variants (sm: 450px, md: 564px, lg: 680px, xl: 80% clamped)
- Fades in with opacity transition
- No slide animation

**Slide-Out Panel:**
- Anchored to right edge (`ml-auto mr-0`)
- Responsive width variants (third/half/full screen)
- Slides in from right with `translateX` animation
- Full viewport height

### Inherited Behaviors from Modal

**Opening:**
1. Trigger element clicked (or Enter/Space pressed)
2. Trigger sets `aria-expanded="true"`
3. Modal controller calls `modal.show()`
4. Other open modals/dialogs are closed
5. `<dialog>` element's `.showModal()` is called
6. Backdrop appears, slide animation runs
7. Focus moves to first focusable element inside panel

**Closing:**
1. Close button clicked (or Escape pressed)
2. Modal controller calls `modal.hide()`
3. `<dialog>` element's `.close()` is called
4. Slide animation reverses (browser default)
5. Trigger element sets `aria-expanded="false"`
6. Focus returns to trigger element

**Click Outside to Close:**
When clicking the backdrop (not the panel content), the panel closes. This is handled by the Modal class's `clickOutsideToClose` method:

```javascript
clickOutsideToClose(modalDialog, event) {
  if (event.target === modalDialog) {  // clicked backdrop, not content
    this.hide();
  }
}
```

**Body Scroll Lock:**
When any dialog is open, the body gets `overflow-hidden` to prevent background scrolling:

```javascript
document.body.classList.add(`[&:has(dialog[open])]:elv-overflow-hidden`);
```

---

## Accessibility

### ARIA Attributes

**Trigger Element:**
```html
role="button"
tabindex="0"
aria-controls="[panel-id]"
aria-haspopup="dialog"
aria-expanded="false"  <!-- toggled to "true" when open -->
```

**Dialog Element:**
```html
role="dialog"
aria-modal="true"
id="[panel-id]"
```

### Keyboard Handling

**Opening:**
- **Enter** or **Space** on trigger element → opens panel

**While Open:**
- **Escape** → closes panel (native `<dialog>` behavior)
- **Tab/Shift+Tab** → focus cycles within panel (native modal behavior)

**After Closing:**
- Focus returns to trigger element that opened the panel

### Focus Management

**On Open:**
```javascript
focusFirstElement() {
  requestAnimationFrame(() => {
    const container = this.hasFocusContainerTarget
      ? this.focusContainerTarget
      : this.modalDialogTarget;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });
}
```

**On Close:**
```javascript
if (this.triggerElement) {
  this.triggerElement.setAttribute('aria-expanded', 'false');
  this.triggerElement.focus();  // restore focus
}
```

---

## Component Architecture

### Inheritance from Modal

**Ruby Component:**
```ruby
class Component < Elevate::Modal::Component
  option :size, type: Types::Symbol.enum(:third_screen, :half_screen, :full_screen),
                default: -> { :half_screen }

  # Override controller methods to use parent's controller
  def controller?
    self.class.superclass.controller?
  end

  def derive_controller_name
    self.class.superclass.derive_controller_name
  end
end
```

**What's Inherited:**
- All Modal options: `id`, `open_on_connect`, `delay`, `close_on_submit`, `trigger_classes`
- Trigger/opener behavior
- Dialog HTML attributes (`role`, `aria-modal`, etc.)
- Stimulus controller (`elevate--modal`)
- JavaScript Modal class instantiation

**What's Overridden:**
- Dialog style classes (adds `.slide-out-panel` and size variants)
- Size options (`:third_screen`, `:half_screen`, `:full_screen` instead of `:sm`, `:md`, `:lg`, `:xl`)

### CSS Classes

**Panel-Specific Classes:**
- `.slide-out-panel` — base dialog styling
- `.slide-out-panel--third` — third screen width variant
- `.slide-out-panel--half` — half screen width variant
- `.slide-out-panel--full` — full screen width variant
- `.slide-out-panel__inner` — flexbox container
- `.slide-out-panel__body` — scrollable content area
- `.slide-out-panel__footer` — footer with top border

**Inherited Elevate Utilities:**
- Spacing: `elv-p-0`, `elv-p-5`, `elv-p-6`, `elv-my-0`, `elv-ml-auto`, `elv-mr-0`
- Layout: `elv-flex`, `elv-flex-col`, `elv-flex-1`, `elv-justify-between`, `elv-justify-start`
- Sizing: `elv-h-screen`, `elv-min-h-screen`, `elv-h-full`, `elv-w-full`, `elv-max-w-full`
- Colors: `elv-bg-neutral-0`, `elv-bg-neutral-5`, `elv-bg-neutral-100`, `elv-fill-purple`
- Borders: `elv-border-b`, `elv-border-t`, `elv-border-medium`
- Effects: `elv-shadow-left-3`, `elv-opacity-40`, `elv-overflow-y-auto`
- Animation: `open:elv-animate-slide-transition-in`

### JavaScript Controller

The panel uses the **same controller as Modal** (`elevate--modal`). No separate controller exists. The Ruby component explicitly delegates controller methods to its parent:

```ruby
def controller?
  self.class.superclass.controller?  # returns true
end

def derive_controller_name
  self.class.superclass.derive_controller_name  # returns "elevate--modal"
end
```

This means the Stimulus controller at `/engines/elevate/app/components/elevate/modal/controller.js` handles all panel interactions.

---

## Code Snippets

### Size Variant Classes

**Responsive Width Variants:**
```css
/* Third screen: 33% on desktop, 50% on tablet, 100% on mobile */
.slide-out-panel--third {
  @apply md:elv-w-1/2 lg:elv-w-1/3;
}

/* Half screen: 50% on tablet+, 100% on mobile */
.slide-out-panel--half {
  @apply md:elv-w-1/2;
}

/* Full screen: 100% on all viewports */
.slide-out-panel--full {
  @apply md:elv-w-full md:elv-max-w-full;
}
```

### Slide Animation CSS

**Keyframe Definition:**
```css
@keyframes translateXToZero {
  0% {
    transform: translateX(100%);  /* start off-screen right */
  }
  100% {
    transform: translateX(0);     /* end in place */
  }
}
```

**Animation Application:**
```css
.slide-out-panel {
  animation: translateXToZero 0.5s ease-in-out forwards;
}
```

**In Tailwind Config:**
```javascript
theme: {
  extend: {
    keyframes: {
      translateXToZero: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(0)' }
      }
    },
    animation: {
      'slide-transition-in': 'translateXToZero 0.5s ease-in-out forwards'
    }
  }
}
```

### Panel Structure HTML

**Complete Panel Template:**
```html
<div data-controller="elevate--modal">
  <!-- Trigger -->
  <div 
    data-action="click->elevate--modal#show keydown->elevate--modal#handleTriggerKeydown"
    aria-controls="panel-id"
    aria-haspopup="dialog"
    aria-expanded="false"
    role="button"
    tabindex="0">
    [Trigger Content]
  </div>

  <!-- Panel Dialog -->
  <dialog 
    id="panel-id"
    data-elevate--modal-target="modalDialog"
    class="slide-out-panel slide-out-panel--half"
    aria-modal="true"
    role="dialog">
    <div class="slide-out-panel__inner">
      <!-- Header -->
      <div class="elv-p-6 elv-border-b elv-border-medium elv-bg-neutral-5">
        <div class="elv-flex elv-justify-between">
          <div>
            <h5>Panel Title</h5>
            <p class="elv-mt-2">Optional subtitle</p>
          </div>
          <div class="elv-flex elv-justify-start">
            <div 
              class="elv-cursor-pointer"
              data-action="click->elevate--modal#close">
              [Close Icon]
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="slide-out-panel__body">
        [Panel Content]
      </div>

      <!-- Footer (optional) -->
      <div class="slide-out-panel__footer">
        [Footer Actions]
      </div>
    </div>
  </dialog>
</div>
```

### Width Calculations

**Third Screen Widths:**
- Mobile (< 768px): `100%` (full width)
- Tablet (768px - 1023px): `50%` (half width)
- Desktop (1024px+): `33.33%` (third width)

**Half Screen Widths:**
- Mobile (< 768px): `100%` (full width)
- Tablet+ (768px+): `50%` (half width)

**Full Screen Widths:**
- All viewports: `100%` (full width)

---

## Notes for Elevate Lite Implementation

### Simplifications Possible

1. **No Ruby ViewComponent logic** — static HTML only
2. **Simplified data attributes** — minimal Stimulus simulation or vanilla JS
3. **No slot rendering** — direct HTML structure
4. **CSS-only animations** — leverage native `<dialog>` + custom properties

### Animation Requirements

**Must preserve:**
- 0.5s slide-in duration
- `ease-in-out` easing for smooth motion
- `translateX(100%)` to `translateX(0)` direction
- Backdrop fade synchronized with slide

**Implementation approach:**
```css
@keyframes slide-in-from-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

dialog[open].slide-out-panel {
  animation: slide-in-from-right 0.5s ease-in-out;
}
```

### Responsive Behavior

**Critical breakpoints:**
- `768px` (md) — tablet breakpoint for half/third variants
- `1024px` (lg) — desktop breakpoint for third variant

**Mobile-first approach:**
```css
/* Base: mobile (100% width) */
.slide-out-panel { width: 100%; }

/* Tablet: half-screen variants */
@media (min-width: 768px) {
  .slide-out-panel--half,
  .slide-out-panel--third { width: 50%; }
}

/* Desktop: third-screen variant */
@media (min-width: 1024px) {
  .slide-out-panel--third { width: 33.333%; }
}
```

### Dependencies on Modal Component

**Shared behaviors to implement:**
1. **Focus trap** — Tab cycles within panel
2. **Escape to close** — native `<dialog>` provides this
3. **Click outside to close** — detect clicks on backdrop
4. **Focus restoration** — return focus to trigger on close
5. **Body scroll lock** — prevent background scrolling when open

**Implementation strategy:**
- Use native `<dialog>` element for built-in modal behavior (focus trap, Escape key, backdrop)
- Add minimal JavaScript for: click-outside-to-close, focus restoration, scroll lock
- Avoid recreating Modal's full controller — keep it lightweight

### Component Template Structure

**Suggested file structure for Elevate Lite:**
```
/shared/elevate-lite/components/templates/
  slide-out-panel.html       ← main template with examples
  slide-out-panel.css        ← component-specific styles
  slide-out-panel.js         ← minimal JS for interactions
```

**Template should include:**
- Size variant examples (third/half/full)
- Header with title, subtitle, close button
- Body with scrolling content
- Optional footer with actions
- Code snippets for each variant
- Links to DESIGN.md and Lookbook

---

## Summary

The Slide-Out Panel is a specialized Modal variant optimized for contextual, full-height content. It extends the base Modal component, inheriting robust accessibility and interaction patterns while adding:

- Slide-in animation from the right edge
- Full viewport height with internal scrolling
- Responsive width variants for different content densities
- Left shadow for visual depth
- Structured header/body/footer layout

The implementation leverages native `<dialog>` element capabilities and shares the Modal's Stimulus controller, keeping the codebase DRY and maintainable.
