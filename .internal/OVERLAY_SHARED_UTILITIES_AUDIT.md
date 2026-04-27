# Overlay and Shared Utilities Audit

## Overview

This document captures shared patterns, utilities, and configurations used by overlay components (Modal, SlideOutPanel, Popover, Tooltip) in the Elevate design system. These utilities enable backdrop rendering, animations, focus management, scroll locking, and accessibility features.

**Purpose:**
- Document reusable patterns across overlay components
- Provide implementation guidance for Elevate Lite
- Identify CSS-only vs JavaScript-dependent features
- Ensure accessibility requirements are met

---

## Backdrop Implementation

### Native Dialog Backdrop

Elevate uses the native `<dialog>` element's `::backdrop` pseudo-element for modal overlays.

**CSS Implementation:**

```css
/* Applied via Tailwind utilities */
.backdrop\:elv-bg-neutral-100::backdrop {
  background-color: var(--color-neutral-100); /* #201f23 */
}

.backdrop\:elv-opacity-40::backdrop {
  opacity: 0.40;
}
```

**Key Characteristics:**
- Semi-transparent dark overlay (neutral-100 at 40% opacity)
- Native browser rendering (no custom div required)
- Automatically positioned in dialog's top layer
- Blocks interaction with content behind modal

**HTML Example:**

```html
<dialog class="elv-bg-neutral-0 backdrop:elv-bg-neutral-100 backdrop:elv-opacity-40">
  <!-- Modal content -->
</dialog>
```

### Z-Index Strategy

**Implementation:** Native dialog stacking context

Elevate relies on the browser's native `<dialog>` element, which automatically manages z-index via the "top layer":

- No explicit z-index values needed
- Dialog and backdrop automatically stack above all other content
- Multiple open dialogs stack in order of opening
- Browser handles stacking order naturally

**Modal utility class** closes other dialogs before opening:

```javascript
closeOtherModals() {
  // Close other native dialogs
  document.querySelectorAll('dialog[open]').forEach((dialog) => {
    if (dialog !== this.modalDialog) {
      dialog.close();
    }
  });
  
  // Hide legacy role="dialog" elements
  document.querySelectorAll('div[role="dialog"]').forEach((dialog) => {
    if (dialog !== this.modalDialog) {
      dialog.style.display = 'none';
    }
  });
}
```

---

## Scroll Lock Pattern

### Body Scroll Lock

**Implementation:** CSS `:has()` selector

Scroll locking prevents background content from scrolling when a modal is open. Elevate uses a clever CSS-only approach:

```javascript
// Applied once in Modal constructor
document.body.classList.add(`[&:has(dialog[open])]:elv-overflow-hidden`);
```

**How It Works:**

1. The class `[&:has(dialog[open])]:elv-overflow-hidden` is added to `<body>` once
2. CSS `:has()` pseudo-class checks if body contains an open dialog
3. When a dialog opens (`showModal()`), the rule activates automatically
4. When the dialog closes, the rule deactivates automatically

**Generated CSS:**

```css
body:has(dialog[open]) {
  overflow: hidden;
}
```

**Benefits:**
- Pure CSS solution (no JavaScript toggle on open/close)
- Automatically handles multiple modals
- No need to remove on close
- Works with native dialog open/close

**Browser Support:** Modern browsers (2022+). Fallback: manually toggle overflow on show/hide.

---

## Focus Management

### Focus Trap Implementation

**Purpose:** Keep keyboard focus within the modal while open, preventing interaction with background content.

**Implementation in Modal Controller:**

```javascript
focusFirstElement() {
  // Wait for modal to be visible
  requestAnimationFrame(() => {
    const container = this.hasFocusContainerTarget
      ? this.focusContainerTarget  // Optional custom container
      : this.modalDialogTarget;    // Default to entire dialog
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });
}
```

**Focusable Element Selector:**

```javascript
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
```

Includes:
- Interactive elements: `button`, links (`[href]`)
- Form inputs: `input`, `select`, `textarea`
- Custom focusable elements with `tabindex >= 0`
- Excludes elements explicitly marked non-focusable (`tabindex="-1"`)

### Focus Restoration

**Pattern:** Store trigger element reference, restore focus on close

```javascript
show(event) {
  // Store trigger for focus restoration
  if (event && event.currentTarget) {
    this.triggerElement = event.currentTarget;
    this.triggerElement.setAttribute('aria-expanded', 'true');
  }
  this.modal.show();
  this.focusFirstElement();
}

close() {
  this.modal.hide();
  
  // Restore focus to trigger element
  if (this.triggerElement) {
    this.triggerElement.setAttribute('aria-expanded', 'false');
    this.triggerElement.focus();
  }
}
```

**Behavior:**
1. On open: Save reference to trigger element, set `aria-expanded="true"`
2. Focus first focusable element inside modal
3. On close: Return focus to trigger, set `aria-expanded="false"`

### Initial Focus Target Logic

**Priority:**

1. **Custom focus container** (if `focusContainerTarget` exists)
2. **Entire modal dialog** (default)
3. **First focusable element** within container

**Timing:** Uses `requestAnimationFrame()` to ensure modal is visible before focusing.

---

## Animation Configuration

### Tailwind Animation Config

**Location:** `/engines/elevate/tailwind.config.js`

```javascript
extend: {
  keyframes: {
    translateXToZero: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' }
    },
    dialogShake: {
      '0%': { transform: 'translateX(0)' },
      '15%': { transform: 'translateX(-8px)' },
      '30%': { transform: 'translateX(8px)' },
      '45%': { transform: 'translateX(-6px)' },
      '60%': { transform: 'translateX(6px)' },
      '75%': { transform: 'translateX(-3px)' },
      '90%': { transform: 'translateX(3px)' },
      '100%': { transform: 'translateX(0)' }
    }
  },
  animation: {
    'slide-transition-in': 'translateXToZero 0.5s ease-in-out forwards',
    'dialog-shake': 'dialogShake 0.4s ease'
  }
}
```

**Animations:**

1. **`slide-transition-in`** — Slide from right (SlideOutPanel)
   - Duration: 500ms
   - Easing: ease-in-out
   - Direction: translateX(100%) → translateX(0)

2. **`dialog-shake`** — Error feedback animation
   - Duration: 400ms
   - Easing: ease
   - Pattern: Decreasing oscillation (±8px → ±6px → ±3px → 0)

### Transition Patterns

**Modal/SlideOutPanel Open/Close:**

```javascript
// Show pattern (from use-floating mixin)
show() {
  cleanup = autoUpdate(trigger, floating, update);
  floating.classList.remove(HIDDEN_CLASS);  // Remove display: none
  floating.offsetHeight;                     // Force reflow
  floating.classList.remove(TRANSITION_CLASS); // Remove opacity-0
}

// Hide pattern
hide() {
  floating.classList.add(TRANSITION_CLASS);  // Add opacity-0
  if (cleanup) cleanup();
  hideTimeout = setTimeout(() => {
    floating.classList.add(HIDDEN_CLASS);    // Add display: none
  }, 300);
}
```

**Transition Durations:**

- **Opacity fade:** 300ms (hardcoded timeout in use-floating)
- **Slide animation:** 500ms (Tailwind `slide-transition-in`)

**CSS Classes:**

- `TRANSITION_CLASS`: `elv-opacity-0` (fade out)
- `HIDDEN_CLASS`: `!elv-hidden` (display: none)

**Pattern:**
1. Remove `display: none` → make visible
2. Force reflow (`offsetHeight`) → ensure display change renders
3. Remove `opacity-0` → trigger CSS transition
4. On close: reverse order, delay `display: none` until transition completes

---

## Event Handling Patterns

### Click Outside to Close

**Implementation:** Modal utility class

```javascript
build() {
  this.modalDialog.addEventListener(
    'click',
    this.clickOutsideToClose.bind(this, this.modalDialog)
  );
}

clickOutsideToClose(modalDialog, event) {
  if (event.target === modalDialog) {
    this.hide();
  }
}
```

**How It Works:**

- Click events bubble up from content to dialog element
- If `event.target === modalDialog` (not a child), click was on backdrop
- Dialog's backdrop is part of the dialog element in the event system

**Key Detail:** Check for `event.target === modalDialog` (strict equality) to ensure click was directly on dialog, not bubbled from child.

### Keyboard Handling

**ESC Key:** Native dialog behavior

```html
<dialog>
  <!-- Browser automatically closes on ESC key -->
</dialog>
```

No custom JavaScript needed — native `<dialog>` handles ESC by default.

**Enter/Space on Trigger:**

```javascript
handleTriggerKeydown(event) {
  // Open modal on Enter or Space key
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    this.show(event);
  }
}
```

Applied to trigger button:

```javascript
modal_actions = 
  "click->#{controller}#show keydown->#{controller}#handleTriggerKeydown"
```

**Tab Key Management:**

Native `<dialog>` provides automatic focus trap:
- Tab cycles through focusable elements within dialog
- Does not escape to background content
- No custom JavaScript needed

---

## Accessibility Utilities

### ARIA Patterns

**Modal Trigger (Button/Link):**

```javascript
opener_html_options = {
  'aria-controls' => id,           // Points to dialog ID
  'aria-haspopup' => 'dialog',     // Indicates opens dialog
  'aria-expanded' => 'false',      // Initially collapsed
  'role' => 'button',              // Semantic role
  'tabindex' => '0'                // Keyboard focusable
}
```

**Dialog Element:**

```javascript
dialog_html_options = {
  'id' => id,                      // Unique identifier
  'aria-modal' => 'true',          // Indicates modal behavior
  'role' => 'dialog'               // Semantic role
}
```

**State Management:**

```javascript
// On open
this.triggerElement.setAttribute('aria-expanded', 'true');

// On close
this.triggerElement.setAttribute('aria-expanded', 'false');
```

### Focus Helpers

**Focusable Element Selector:**

```javascript
const FOCUSABLE_SELECTOR = 
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
```

**Focus Restoration Logic:**

```javascript
// 1. Store trigger on open
this.triggerElement = event.currentTarget;

// 2. Focus first element inside modal
this.focusFirstElement();

// 3. Restore focus on close
this.triggerElement.focus();
```

**First Element Focus:**

```javascript
focusFirstElement() {
  requestAnimationFrame(() => {
    const container = this.hasFocusContainerTarget
      ? this.focusContainerTarget
      : this.modalDialogTarget;
    const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  });
}
```

---

## Visibility Helper Utility

**Location:** `/app/assets/javascript/elevate/helpers/visibility.js`

```javascript
export class Visibility {
  static HIDDEN_CLASS = 'elv-hidden';

  static show(element) {
    element.classList.remove(this.HIDDEN_CLASS);
  }

  static hide(element) {
    element.classList.add(this.HIDDEN_CLASS);
  }
}
```

**Usage:**
- Simple utility for toggling visibility
- Uses `elv-hidden` class (display: none)
- Static methods for convenience

---

## Implementation Notes for Elevate Lite

### CSS-Only Features

These can be implemented without JavaScript:

✅ **Backdrop styling** — `::backdrop` pseudo-element
✅ **Scroll lock** — `:has()` selector (modern browsers)
✅ **Animations** — CSS transitions and keyframes
✅ **ESC key handling** — Native `<dialog>` behavior
✅ **Focus trap** — Native `<dialog>` behavior

### JavaScript-Required Features

These need custom JavaScript:

❌ **Click outside to close** — Event listener on dialog
❌ **Focus restoration** — Store trigger, restore on close
❌ **Initial focus** — Query and focus first element
❌ **Open/close other modals** — Query open dialogs, close them
❌ **ARIA state management** — Toggle `aria-expanded` on trigger
❌ **Opacity transitions** — Class toggle with timeout for display: none

### Browser Compatibility

**Native Dialog:**
- Supported: Chrome 37+, Firefox 98+, Safari 15.4+ (2022+)
- Fallback: Polyfill or legacy implementation required

**CSS :has() Selector:**
- Supported: Chrome 105+, Firefox 121+, Safari 15.4+ (2022+)
- Fallback: Manual overflow toggle on open/close

**Modern Features:**
- All patterns assume modern browsers (2022+)
- Production code may need polyfills for older browsers

### Accessibility Requirements

**Cannot Be Skipped:**

1. ✅ **ARIA attributes** — `aria-modal`, `aria-expanded`, `aria-controls`, `aria-haspopup`
2. ✅ **Focus management** — Trap focus, restore on close
3. ✅ **Keyboard navigation** — ESC to close, Enter/Space to open
4. ✅ **Focusable trigger** — `role="button"`, `tabindex="0"`
5. ✅ **Screen reader announcements** — Proper role and aria-modal

**Testing:**
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Test focus order and restoration
- Verify ESC key closes modal
- Confirm backdrop blocks background interaction

---

## Code Snippets Summary

### Backdrop Styling

```html
<dialog class="backdrop:elv-bg-neutral-100 backdrop:elv-opacity-40">
  <!-- Modal content -->
</dialog>
```

### Scroll Lock

```javascript
// Add once in constructor
document.body.classList.add('[&:has(dialog[open])]:elv-overflow-hidden');
```

### Focus Management

```javascript
// On open
focusFirstElement() {
  requestAnimationFrame(() => {
    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  });
}

// On close
close() {
  dialog.close();
  this.triggerElement?.focus();
}
```

### Click Outside to Close

```javascript
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
```

### Animation Keyframes

```css
@keyframes translateXToZero {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0); }
}

.elv-animate-slide-transition-in {
  animation: translateXToZero 0.5s ease-in-out forwards;
}
```

---

## Related Documentation

- **Modal Component:** `/Users/schilds/projects/elevate-lite/.internal/COMPONENT_AUDIT_MODAL.md`
- **Tailwind Config:** `/Users/schilds/projects/ue/engines/elevate/tailwind.config.js`
- **Modal Utility:** `/Users/schilds/projects/ue/engines/elevate/app/assets/javascript/elevate/components/modal.js`
- **Modal Controller:** `/Users/schilds/projects/ue/engines/elevate/app/components/elevate/modal/controller.js`
- **use-floating Mixin:** `/Users/schilds/projects/ue/engines/elevate/app/assets/javascript/elevate/mixin/use-floating.js`

---

## Questions or Issues?

For questions about overlay utilities:
- Check component-specific audit files (COMPONENT_AUDIT_*.md)
- Review Elevate Lookbook examples
- Reference UE production implementation in `/engines/elevate/`
