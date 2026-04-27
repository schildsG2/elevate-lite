# Modal Component Audit

## Overview

The Modal component is a native HTML `<dialog>` implementation that provides overlay dialogs with configurable sizes, states, and behaviors. It consists of a main modal container with three optional child components: Header, Body, and Footer.

**Primary Use Cases:**
- Confirmation dialogs (delete, submit actions)
- Form inputs requiring focus
- Multi-step workflows
- Alert/warning messages with state variants
- Auto-opening modals (e.g., tour popups, notifications)

**File Locations:**

**Ruby ViewComponents:**
- `/engines/elevate/app/components/elevate/modal/component.rb` — Main modal wrapper
- `/engines/elevate/app/components/elevate/modal/header/component.rb` — Header with title, state icon, close button
- `/engines/elevate/app/components/elevate/modal/body/component.rb` — Body content wrapper
- `/engines/elevate/app/components/elevate/modal/footer/component.rb` — Footer with action buttons

**Templates:**
- `/engines/elevate/app/components/elevate/modal/component.html.slim`
- `/engines/elevate/app/components/elevate/modal/header/component.html.slim`

**JavaScript:**
- `/engines/elevate/app/components/elevate/modal/controller.js` — Stimulus controller (168 lines)
- `/engines/elevate/app/assets/javascript/elevate/components/modal.js` — Core Modal class (49 lines)

**Component Hierarchy:**
```
Elevate::Modal::Component (wrapper)
├── trigger (optional slot)
├── dialog (native HTML element)
    ├── Elevate::Modal::Header::Component (optional)
    │   ├── icon (state icon, optional)
    │   ├── text (H5 typography)
    │   ├── subheader (P typography, optional)
    │   └── close button
    ├── Elevate::Modal::Body::Component (optional)
    └── Elevate::Modal::Footer::Component (optional)
```

---

## Visual Specifications

### Size Variants

Modal width is controlled by the `size` parameter on the main component:

```ruby
option :size, type: Types::Symbol.enum(:sm, :md, :lg, :xl), default: -> { :md }
```

**Size Classes:**
```ruby
size do
  sm { %w(elv-w-[450px]) }   # 450px fixed width
  md { %w(elv-w-[564px]) }   # 564px fixed width (default)
  lg { %w(elv-w-[680px]) }   # 680px fixed width
  xl { %w(elv-w-[clamp(410px,_80%,_1000px)]) }  # Responsive: 410-1000px, 80% viewport
end
```

**Height:** Not constrained — modals grow to fit content. Overflow is handled by browser's native dialog scrolling unless `overflow: :visible` is specified.

### Dialog Base Styles

Applied to the `<dialog>` element:

```ruby
base do
  %w(
    elv-bg-neutral-0           # Background: #ffffff (pure white)
    elv-shadow-3               # Shadow: 0 8px 32px 0 rgba(32, 31, 35, 0.12)
    elv-rounded-md             # Border radius: 8px (radius-md)
    elv-p-0                    # No default padding (children handle spacing)
    backdrop:elv-bg-neutral-100    # Backdrop color: #0c0b0e (dark gray)
    backdrop:elv-opacity-40        # Backdrop opacity: 40%
  )
end
```

**Note:** DESIGN.md specifies `rgba(32, 31, 35, 0.40)` for backdrop and `0 8px 32px 0 rgba(32, 31, 35, 0.12)` for shadow, which aligns with `elv-shadow-3`. Border radius in DESIGN.md says 16-20px (radius-lg/xl), but UE uses `elv-rounded-md` (8px).

**Overflow Variant:**
```ruby
overflow do
  visible { %w(elv-overflow-visible) }  # Allows content to overflow (e.g., dropdowns)
end
```

### Header Styles

```ruby
base do
  %w(
    elv-py-3               # Padding Y: 12px
    elv-px-5               # Padding X: 20px
    elv-rounded-t-md       # Top border radius: 8px
    elv-border-b           # Bottom border: 1px solid
    elv-border-medium      # Border color: medium token
    elv-bg-neutral-5       # Background: neutral-5 (very light gray)
  )
end
```

**Layout:**
```slim
.elv-flex.elv-items-center.elv-justify-between
  .elv-flex.elv-gap-x-2.elv-items-center
    - if icon?
      = icon                # State icon (lg size, 24px)
    = text                  # H5 typography component (:sm variant)
  button*close_button_html_options
    = Icon (close icon, :sm size)  # 16px close icon
- if subheader?
  .elv-py-2
    = subheader             # P typography component (:sm variant)
```

**State Icons:**
Header can display state-based icons via the `state` parameter:
```ruby
option :state, type: Types::Symbol.enum(:critical, :info, :success, :warning), optional: true
```

State icons use `func-icon-{state}` pattern and are rendered at `:lg` size (24px).

**Typography:**
- Title: H5 typography component (`:sm` variant) — Figtree Semi Bold 18px
- Subheader: P typography component (`:sm` variant) — Figtree Regular 14px

**Close Button:**
- Icon: `ui-icon-close` (configurable via `close_icon_file_name`)
- Size: `:sm` (16px)
- Default classes: `elv-fill-neutral-80`
- Button type: `:button` (default) or `:submit`

### Body Styles

Simplest component — just a padding wrapper:

```ruby
base do
  %w(elv-p-6)  # Padding: 24px all sides
end
```

**Override:** Both Body and Header support `override_style` option to completely replace base styles.

### Footer Styles

```ruby
base do
  %w(
    elv-pt-3               # Padding top: 12px
    elv-pb-4               # Padding bottom: 16px
    elv-px-4               # Padding X: 16px
    elv-rounded-b-md       # Bottom border radius: 8px
    elv-border-t           # Top border: 1px solid
    elv-border-medium      # Border color: medium token
    elv-flex               # Flexbox container
    elv-gap-x-1            # Gap: 4px between buttons
    elv-items-center       # Vertical center alignment
  )
end
```

**Position Variants:**
```ruby
position do
  left { %w(elv-justify-start) }
  center { %w(elv-justify-center) }
  right { %w(elv-justify-end) }    # Default
end
```

### Color Specifications

**Background Colors:**
- Dialog: `elv-bg-neutral-0` (#ffffff)
- Header: `elv-bg-neutral-5` (light gray surface)
- Backdrop: `elv-bg-neutral-100` at 40% opacity

**Borders:**
- Header bottom: `elv-border-medium`
- Footer top: `elv-border-medium`

**Shadows:**
- Dialog: `elv-shadow-3` (0 8px 32px 0 rgba(32, 31, 35, 0.12))

### Alignment with DESIGN.md

**Discrepancies:**
1. **Border Radius:** UE uses `elv-rounded-md` (8px), DESIGN.md specifies 16-20px
2. **Padding:** DESIGN.md says 32px, UE Body uses 24px (`elv-p-6`)
3. **Max Width:** DESIGN.md says 560px default, UE md size is 564px (close enough)
4. **Title Size:** DESIGN.md says Heading Sm (21px/700), UE uses H5:sm (18px) — needs verification

**Alignments:**
- ✅ Background: White (#ffffff)
- ✅ Shadow: Matches 0 8px 32px rgba(32, 31, 35, 0.12)
- ✅ Backdrop: Matches rgba(32, 31, 35, 0.40)

---

## Behavioral Specifications

### Opening the Modal

**Via Trigger Element:**
Modal can render an optional trigger slot that automatically wires up event handlers:

```ruby
renders_one :trigger
```

**Trigger HTML Options:**
```ruby
{
  'data' => { 'action' => "click->#{controller}#show keydown->#{controller}#handleTriggerKeydown" },
  'aria-controls' => id,
  'aria-haspopup' => 'dialog',
  'aria-expanded' => 'false',
  'role' => 'button',
  'tabindex' => '0',
  'class' => trigger_classes  # Default: 'elv-cursor-pointer elv-w-fit'
}
```

**Keyboard Support on Trigger:**
- **Enter** or **Space**: Opens modal (prevents default)

**Open on Connect:**
```ruby
option :open_on_connect, type: Types::Bool, default: -> { false }
option :open_on_connect_delay, type: Types::Integer, default: -> { 5000 }  # 5 seconds
```

If `open_on_connect: true`, modal opens automatically after delay, but only if no other modals are currently open. Retries up to 5 times if blocked by other modals.

**Debounce Delay:**
```ruby
option :delay, type: Types::Integer, default: -> { 0 }
```

Applied to `show` method via `stimulus-use` debounce.

### Closing the Modal

**Methods:**
1. **Click backdrop** — Clicking outside modal content closes it
2. **ESC key** — Native browser behavior for `<dialog>` element
3. **Close button** — Any element with `data-action="#{controller}#close"`
4. **Form submission** — If `close_on_submit: true`, closes on successful Turbo form submit

**Close on Submit:**
```ruby
option :close_on_submit, type: Types::Bool, default: -> { false }
```

Listens for `turbo:submit-end` event. Only closes if:
- Event target is inside the modal
- Submission was successful (`event.detail.success`)

### Animation and Timing

**No explicit animations defined** — relies on browser's native `<dialog>` animations, which vary by browser.

**Timing:**
- **Open on connect delay:** 5000ms (configurable)
- **Retry interval:** 1000ms minimum when checking for other open modals
- **Debounce wait:** 0ms default (configurable via `delay` option)

### State Management

**Body Overflow Control:**
```javascript
document.body.classList.add(`[&:has(dialog[open])]:elv-overflow-hidden`);
```

When any dialog is open, body scrolling is disabled via CSS selector.

**Multiple Modals:**
```javascript
closeOtherModals() {
  document.querySelectorAll('dialog[open]').forEach((dialog) => {
    if (dialog !== this.modalDialog) {
      dialog.close();
    }
  });
  // Also handles legacy div[role="dialog"] modals
  document.querySelectorAll('div[role="dialog"]').forEach((dialog) => {
    if (dialog !== this.modalDialog) {
      dialog.style.display = 'none';
    }
  });
}
```

Opening a modal automatically closes all other open modals (both native `<dialog>` and legacy role-based modals).

### Event Handling

**Click Outside to Close:**
```javascript
clickOutsideToClose(modalDialog, event) {
  if (event.target === modalDialog) {
    this.hide();
  }
}
```

Only closes if click target is the `<dialog>` element itself (the backdrop), not any child elements.

**Trigger Keydown:**
Handles Enter and Space keys on trigger element to open modal with keyboard.

**Form Submission:**
Binds `turbo:submit-end` listener if `close_on_submit` is true.

### Edge Cases

1. **Open on Connect with Existing Modals:** Retries up to 5 times with 1-5 second delays between attempts
2. **Rapid Trigger Clicks:** Debounce prevents spam (configurable delay)
3. **Multiple Close Buttons:** All elements with close action handler will work
4. **Focus Restoration:** Returns focus to trigger element after closing (if trigger was used)
5. **Missing Focus Container:** Falls back to `modalDialog` if `focusContainer` target not present

---

## Accessibility

### ARIA Attributes

**On Dialog Element:**
```ruby
{
  'aria-modal' => 'true',
  'role' => 'dialog'
}
```

**On Trigger Element:**
```ruby
{
  'aria-controls' => id,        # Points to modal's ID
  'aria-haspopup' => 'dialog',
  'aria-expanded' => 'false',   # Updated to 'true' when modal opens
  'role' => 'button',
  'tabindex' => '0'
}
```

**On Close Button:**
Standard button semantics (no special ARIA needed as it's a real `<button>`).

### Keyboard Navigation

**Trigger:**
- **Tab:** Focus trigger element
- **Enter/Space:** Open modal
- **Shift+Tab:** Move focus to previous element

**Modal Open:**
- **ESC:** Close modal (native `<dialog>` behavior)
- **Tab:** Cycle through focusable elements inside modal
- **Shift+Tab:** Reverse cycle through focusable elements

**No Focus Trap Implemented:** UE modal does NOT implement focus trapping. Users can tab out of the modal into browser chrome. This is a gap from typical modal accessibility patterns.

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

**Focusable Element Selector:**
```javascript
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
```

**Focus Restoration on Close:**
```javascript
close() {
  if (this.modal) {
    this.modal.hide();
    if (this.triggerElement) {
      this.triggerElement.setAttribute('aria-expanded', 'false');
      this.triggerElement.focus();  // Restore focus to trigger
    }
  }
}
```

**Optional Focus Container:**
```javascript
static targets = ['modalDialog', 'focusContainer'];
```

If `focusContainer` target is provided, focus management only searches within that container (useful for complex modals with non-interactive header/footer).

### Screen Reader Support

**Announcements:**
- Modal opening is announced via `aria-modal="true"` and `role="dialog"`
- State changes on trigger (`aria-expanded`) announce modal visibility
- Header title is automatically read as dialog label

**Missing:**
- No explicit `aria-labelledby` or `aria-describedby` connections
- No live region announcements for dynamic content changes

---

## Component Architecture

### Class Hierarchy

```
Elevate::ApplicationViewComponent (base)
└── Elevate::Modal::Component
    ├── Elevate::Modal::Header::Component
    ├── Elevate::Modal::Body::Component
    └── Elevate::Modal::Footer::Component
```

### Stimulus Controller Structure

**Controller:** `elevate--modal--component`

**Targets:**
- `modalDialog` (required) — The `<dialog>` element
- `focusContainer` (optional) — Container to limit focus management

**Values:**
```javascript
{
  openOnConnect: Boolean (default: false),
  delay: Number (default: 0),
  openOnConnectDelay: Number (default: 5000),
  closeOnSubmit: Boolean (default: false),
  retryCount: Number (default: 5)
}
```

**Actions:**
- `show` — Open modal (debounced)
- `close` — Close modal
- `handleTriggerKeydown` — Handle Enter/Space on trigger

**Lifecycle:**
- `connect()` — Initialize Modal instance, setup debounce, bind events
- `disconnect()` — Cleanup Modal instance and event listeners

### Modal Class (Core JavaScript)

**File:** `elevate/components/modal.js`

**Constructor:**
```javascript
constructor(modalDialog) {
  this.modalDialog = modalDialog;  // HTMLDialogElement
}
```

**Methods:**

**`build()`**
Sets up body overflow control and click-outside listener:
```javascript
build() {
  document.body.classList.add(`[&:has(dialog[open])]:elv-overflow-hidden`);
  this.modalDialog.addEventListener('click', this.clickOutsideToClose.bind(this, this.modalDialog));
}
```

**`destroy()`**
Removes event listeners:
```javascript
destroy() {
  this.modalDialog.removeEventListener('click', this.clickOutsideToClose.bind(this, this.modalDialog));
}
```

**`show()`**
Closes other modals, then shows this one:
```javascript
show() {
  this.closeOtherModals();
  this.modalDialog.showModal();  // Native <dialog> API
}
```

**`hide()`**
Closes modal:
```javascript
hide() {
  this.modalDialog.close();  // Native <dialog> API
}
```

**`closeOtherModals()`**
Ensures only one modal is open at a time (handles both native and legacy modals).

**`clickOutsideToClose(modalDialog, event)`**
Closes modal if backdrop is clicked.

### Dependencies

**JavaScript:**
- `@hotwired/stimulus` — Controller framework
- `stimulus-use` — Debounce utility
- Native `<dialog>` API — Core modal functionality

**Ruby:**
- `Dry::Initializer` (via `option` DSL)
- `Elevate::ApplicationViewComponent` base class
- `SecureRandom` — UUID generation for IDs

**Components:**
- `Elevate::Typography::Component::H5` — Header title
- `Elevate::Typography::Component::P` — Header subheader
- `Elevate::Icon::Component` — State and close icons

---

## Code Snippets

### Basic Modal Structure

```html
<div data-controller="elevate--modal--component">
  <!-- Trigger (optional) -->
  <div data-action="click->elevate--modal--component#show keydown->elevate--modal--component#handleTriggerKeydown"
       aria-controls="modal-uuid"
       aria-haspopup="dialog"
       aria-expanded="false"
       role="button"
       tabindex="0"
       class="elv-cursor-pointer elv-w-fit">
    Open Modal
  </div>

  <!-- Dialog -->
  <dialog data-elevate--modal--component-target="modalDialog"
          id="modal-uuid"
          class="elv-bg-neutral-0 elv-shadow-3 elv-rounded-md elv-p-0 elv-w-[564px]
                 backdrop:elv-bg-neutral-100 backdrop:elv-opacity-40"
          aria-modal="true"
          role="dialog">
    
    <!-- Header -->
    <div class="elv-py-3 elv-px-5 elv-rounded-t-md elv-border-b elv-border-medium elv-bg-neutral-5">
      <div class="elv-flex elv-items-center elv-justify-between">
        <div class="elv-flex elv-gap-x-2 elv-items-center">
          <h5>Modal Title</h5>
        </div>
        <button data-action="elevate--modal--component#close">
          <!-- Close icon -->
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="elv-p-6">
      Modal content goes here
    </div>

    <!-- Footer -->
    <div class="elv-pt-3 elv-pb-4 elv-px-4 elv-rounded-b-md elv-border-t elv-border-medium
                elv-flex elv-gap-x-1 elv-items-center elv-justify-end">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>

  </dialog>
</div>
```

### Size Variant Classes

```css
/* Small (450px) */
.elv-w-\[450px\] { width: 450px; }

/* Medium (564px) - Default */
.elv-w-\[564px\] { width: 564px; }

/* Large (680px) */
.elv-w-\[680px\] { width: 680px; }

/* XL (Responsive 410-1000px, 80% viewport) */
.elv-w-\[clamp\(410px\,_80\%\,_1000px\)\] { 
  width: clamp(410px, 80%, 1000px); 
}
```

### Focus Management Implementation

```javascript
// Focus first element on modal open
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

// Restore focus on close
close() {
  if (this.modal) {
    this.modal.hide();
    
    if (this.triggerElement) {
      this.triggerElement.setAttribute('aria-expanded', 'false');
      this.triggerElement.focus();  // Return focus to trigger
    }
  }
}
```

### Click Outside to Close

```javascript
clickOutsideToClose(modalDialog, event) {
  if (event.target === modalDialog) {
    this.hide();
  }
}

// Setup in build()
this.modalDialog.addEventListener(
  'click',
  this.clickOutsideToClose.bind(this, this.modalDialog)
);
```

### Body Overflow Control

```javascript
// Prevents page scrolling when modal is open
document.body.classList.add(`[&:has(dialog[open])]:elv-overflow-hidden`);
```

This CSS selector applies `overflow: hidden` to body only when a dialog[open] exists anywhere in the document.

### State-Based Header Icon

```ruby
# Header component
option :state, type: Types::Symbol.enum(:critical, :info, :success, :warning), optional: true

def header_icon_file
  "func-icon-#{state}"  # func-icon-critical, func-icon-info, etc.
end
```

### Close on Submit Behavior

```javascript
// In controller connect()
if (this.closeOnSubmitValue) {
  this.handleSubmit = this.handleSubmit.bind(this);
  this.element.addEventListener('turbo:submit-end', this.handleSubmit);
}

handleSubmit(event) {
  if (!this.hasModalDialogTarget || !this.modalDialogTarget.contains(event.target)) {
    return;  // Not our form
  }

  if (event.detail.success) {
    this.close();  // Only close on successful submission
  }
}
```

---

## Notes for Elevate Lite Implementation

### Simplification Opportunities

1. **Remove Turbo Integration:** The `close_on_submit` feature requires Turbo events — can be replaced with standard form submit handler or removed entirely for static HTML.

2. **Simplify Open on Connect:** The retry logic for checking other open modals is overkill for most use cases. For static HTML, a simple delayed open is sufficient.

3. **Remove Debounce Dependency:** `stimulus-use` debounce is only needed for the delayed show. Can be replaced with native `setTimeout`.

4. **Skip Legacy Modal Support:** The `closeOtherModals()` method checks for old `div[role="dialog"]` patterns. New implementations only need to handle native `<dialog>` elements.

5. **Simplify Focus Container:** The optional `focusContainer` target adds complexity. For static HTML, always use the dialog element as the focus container.

### Required JavaScript vs Optional

**Required (Core Functionality):**
- `showModal()` / `close()` — Native dialog API
- Click-outside-to-close listener
- Focus management (first element + restoration)
- Body overflow control
- ESC key support (free via native `<dialog>`)

**Optional (Enhancement):**
- Debounce on show
- Open on connect with retry logic
- Close on submit (Turbo-specific)
- Multiple modal management
- Trigger keyboard navigation

**Can Be CSS-Only:**
- Backdrop styling (via `::backdrop` pseudo-element)
- Size variants (static classes)
- Layout of header/body/footer (flexbox)

### Tailwind Class Mappings

**Dialog Base:**
```
elv-bg-neutral-0          → bg-white
elv-shadow-3              → shadow-[0_8px_32px_0_rgba(32,31,35,0.12)]
elv-rounded-md            → rounded-lg (8px)
elv-p-0                   → p-0
backdrop:elv-bg-neutral-100   → backdrop:bg-neutral-950
backdrop:elv-opacity-40       → backdrop:opacity-40
```

**Size Variants:**
```
elv-w-[450px]                        → w-[450px]
elv-w-[564px]                        → w-[564px]
elv-w-[680px]                        → w-[680px]
elv-w-[clamp(410px,_80%,_1000px)]   → w-[clamp(410px,80%,1000px)]
```

**Header:**
```
elv-py-3           → py-3
elv-px-5           → px-5
elv-rounded-t-md   → rounded-t-lg
elv-border-b       → border-b
elv-border-medium  → border-neutral-300
elv-bg-neutral-5   → bg-neutral-50
```

**Body:**
```
elv-p-6  → p-6
```

**Footer:**
```
elv-pt-3           → pt-3
elv-pb-4           → pb-4
elv-px-4           → px-4
elv-rounded-b-md   → rounded-b-lg
elv-border-t       → border-t
elv-border-medium  → border-neutral-300
elv-flex           → flex
elv-gap-x-1        → gap-x-1
elv-items-center   → items-center
elv-justify-end    → justify-end
```

### Non-Negotiable Accessibility Requirements

1. **ARIA Attributes:**
   - `aria-modal="true"` on dialog
   - `role="dialog"` on dialog
   - `aria-controls` on trigger pointing to dialog ID
   - `aria-expanded` on trigger (updated on show/hide)
   - `aria-haspopup="dialog"` on trigger

2. **Keyboard Support:**
   - ESC key closes modal (native behavior with `<dialog>`)
   - Enter/Space on trigger opens modal
   - Tab/Shift+Tab cycles through focusable elements

3. **Focus Management:**
   - Auto-focus first focusable element on open
   - Restore focus to trigger on close
   - **CRITICAL GAP:** Should implement focus trap to prevent tabbing outside modal

4. **Screen Reader:**
   - Dialog title should be announced (consider `aria-labelledby`)
   - State changes should be announced (trigger `aria-expanded`)

### Implementation Recommendations

1. **Use Native `<dialog>` Element:** Don't try to recreate with divs — native element provides ESC key, backdrop, stacking context, and accessibility foundation for free.

2. **Implement Focus Trap:** UE modal is missing this critical accessibility feature. Elevate Lite should add it via:
   ```javascript
   // Trap Tab key within modal
   modalDialog.addEventListener('keydown', (e) => {
     if (e.key === 'Tab') {
       const focusable = modalDialog.querySelectorAll(/* focusable selector */);
       const first = focusable[0];
       const last = focusable[focusable.length - 1];
       
       if (e.shiftKey && document.activeElement === first) {
         e.preventDefault();
         last.focus();
       } else if (!e.shiftKey && document.activeElement === last) {
         e.preventDefault();
         first.focus();
       }
     }
   });
   ```

3. **Align with DESIGN.md Border Radius:** Consider using `rounded-2xl` (16px) instead of `rounded-lg` (8px) to match DESIGN.md specs.

4. **Simplify Component Structure:** For static HTML, flatten the Ruby component structure into plain HTML templates with CSS classes.

5. **Keep Body Overflow Control:** The `[&:has(dialog[open])]:overflow-hidden` pattern is elegant and works without JavaScript.

6. **Add Animation Transition:** Consider adding subtle fade-in animation via CSS:
   ```css
   dialog[open] {
     animation: fadeIn 150ms ease-out;
   }
   
   @keyframes fadeIn {
     from { opacity: 0; transform: scale(0.95); }
     to { opacity: 1; transform: scale(1); }
   }
   ```

---

## Summary

The UE Modal component is a well-structured implementation using native `<dialog>` elements with Stimulus controllers for interaction. It provides comprehensive size variants, state-based headers, and flexible content slots.

**Strengths:**
- Native `<dialog>` API usage
- Clean component hierarchy
- Multiple size variants
- State-based header icons
- Focus restoration
- Click-outside-to-close

**Gaps:**
- No focus trap (users can tab out)
- Border radius doesn't match DESIGN.md (8px vs 16-20px)
- Body padding slightly off from DESIGN.md (24px vs 32px)
- Complex retry logic for open-on-connect
- Turbo-specific features (close-on-submit)

**For Elevate Lite:**
- Simplify JavaScript to core show/hide/focus logic
- Add focus trap for full accessibility compliance
- Remove Turbo dependencies
- Align border radius and padding with DESIGN.md
- Keep native `<dialog>` approach — it's the right foundation
- Provide static HTML templates for header/body/footer patterns
- Consider single-file lightweight modal script (~100 lines) vs full Stimulus controller

---

**Audit completed:** April 27, 2026
**Auditor:** Claude Sonnet 4.5
**Total lines analyzed:** ~400+ (Ruby + Slim + JavaScript)
**UE Modal version:** Current as of audit date
