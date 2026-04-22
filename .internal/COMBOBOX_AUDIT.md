# Elevate Combobox Component Audit

**Audit Date**: April 22, 2026  
**Source**: UE Elevate Production (`/Users/schilds/projects/ue/engines/elevate`)  
**Status**: 🔍 Research Phase

---

## Component Overview

**Name**: Combobox (Multi-Select Searchable Dropdown)  
**Type**: Form Input Component  
**Category**: Complex Interactive Component  
**Dependencies**: Choices.js library

### Purpose
Multi-select dropdown with search/autocomplete functionality. Allows users to select multiple items from a list, search/filter options, and optionally fetch options remotely via AJAX.

### Key Features
- ✅ Multi-select capability
- ✅ Local search/filter
- ✅ Remote data fetching (AJAX autocomplete)
- ✅ Custom item creation (optional)
- ✅ Maximum items limit
- ✅ Clear all selected items
- ✅ Selected items displayed as chips
- ✅ Keyboard navigation
- ✅ Accessible (ARIA support via Choices.js)

---

## Component Anatomy

### File Structure
```
/Users/schilds/projects/ue/engines/elevate/app/components/elevate/form/combobox/
├── component.rb           # ViewComponent class definition
├── component.html.slim    # HTML template
├── controller.js          # Stimulus controller (Choices.js integration)
├── preview.rb            # Lookbook preview controller
└── preview.html.slim     # Lookbook examples

/Users/schilds/projects/ue/engines/elevate/app/assets/stylesheets/elevate/
└── combobox.css          # Component-specific styles
```

### HTML Structure
```html
<div data-controller="elevate--form--combobox"
     data-elevate--form--combobox-choices-value="[...]"
     data-elevate--form--combobox-placeholder-value="Select...">
  <label>Label Text</label>
  <div class="elv-mt-2 elv-relative">
    <!-- Clear all button + Chevron (positioned absolute right) -->
    <div class="elv-flex elv-right-0 elv-absolute elv-h-full elv-items-center">
      <svg class="elv-z-10 elv-w-4 elv-h-4 elv-mr-1 elv-cursor-pointer elv-fill-neutral-80"
           data-action="click->elevate--form--combobox#clearAll"
           data-elevate--form--combobox-target="clearAllButton">
        <!-- ui-icon-cancel-circle-filled -->
      </svg>
      <svg class="chevron"><!-- chevron icon --></svg>
    </div>
    <select multiple data-elevate--form--combobox-target="select">
      <option value="1">Item One</option>
      <option value="2">Item Two</option>
      <!-- ... -->
    </select>
  </div>
  <div class="hint">Helper text (optional)</div>
</div>
```

**Note**: The `<select>` element is enhanced by Choices.js, which hides it and creates a custom UI.

---

## Variants & States

### Sizes
- **Small** (sm): Compact version
- **Medium** (md): Default size
- **Large** (lg): Larger touch target

### States
- **Default**: Normal state
- **Error**: Red border, error helper text
- **Disabled**: Grayed out, non-interactive
- **Loading**: Shows "Loading..." text while fetching remote data

### Modes
- **Local**: Static list of options with client-side search
- **Remote**: Fetches options via AJAX as user types
- **Hybrid**: Starts with local options, allows adding custom values

---

## JavaScript Controller (Stimulus)

### Dependencies
- **Choices.js**: Third-party library for enhanced select inputs
- **stimulus-use**: Debounce utility for remote search

### Key Methods

#### `connect()`
Initializes Choices.js instance when component mounts.

#### `setup()`
Configures Choices.js with options:
- `items`: Pre-selected values
- `choices`: Available options
- `placeholder`: Placeholder text
- `removeItemButton`: Show X button on chips
- `searchChoices`: Enable/disable local search
- `maxItemCount`: Maximum selectable items
- `addChoices`: Allow creating custom items

#### `clearAll()`
Removes all selected items and dispatches change event.

#### `handleItemChange()`
- Shows/hides "Clear All" button based on selection
- Updates placeholder visibility
- Adjusts input width

#### `remoteQuery(event)`
- Debounced (200ms) remote search
- Fetches from `remote_url` with query parameter
- Updates dropdown choices dynamically

### Data Attributes
```javascript
data-elevate--form--combobox-choices-value="[{value: 1, label: 'Item One'}, ...]"
data-elevate--form--combobox-remote-url-value="/api/search?q=$0"
data-elevate--form--combobox-placeholder-value="Select..."
data-elevate--form--combobox-add-choices-value="false"
data-elevate--form--combobox-max-items-count-value="3"
data-elevate--form--combobox-loading-text-value="Loading..."
data-elevate--form--combobox-no-choices-text-value="Type to search"
```

**Remote URL Pattern**: Use `$0` as placeholder for search query (e.g., `/api/products?name=$0`)

---

## CSS Styling

### Key Classes

#### Wrapper
```css
.combobox-wrapper { /* Contains entire component */ }
```

#### Choices.js Overrides
```css
/* Search input visibility when open */
.combobox-wrapper .choices.is-open .choices__input.choices__input--cloned {
  @apply elv-block;
}

/* Inner container padding for icons */
.combobox-wrapper .choices__inner {
  @apply elv-pr-14 elv-flex-wrap; /* Right padding for clear/chevron */
}

/* Highlighted item (keyboard navigation) */
.combobox-wrapper .choices__item.choices__item--selectable.is-highlighted {
  @apply elv-bg-primary-20 elv-border-0;
}

/* Hide "no choices" message */
.combobox-wrapper .choices__list--dropdown:has(.choices__item.choices__notice.has-no-choices) {
  @apply elv-hidden;
}
```

#### Selected Items (Chips)
```css
/* Chip container */
.combobox-wrapper div.choices__list--multiple {
  @apply elv-flex elv-flex-wrap elv-gap-2;
}

/* Individual chip styling */
.combobox-wrapper div.choices__list--multiple .choices__item {
  @apply elv-text-base 
         elv-border-none 
         elv-bg-primary-20 
         elv-text-primary 
         elv-rounded-xs 
         elv-text-sm 
         elv-m-0 
         elv-py-0.5 
         elv-pr-1 
         elv-pl-[6px];
}
```

#### Remove Button (X icon on chips)
```css
div.choices[data-type*="select-multiple"] .choices__button {
  @apply elv-border-l-0 
         elv-opacity-100 
         elv-bg-auto 
         elv-ml-1 
         elv-mr-0 
         elv-bg-[url('data:image/svg+xml,...')]; /* Custom X icon */
}
```

**Custom X Icon**: Uses inline SVG data URL with purple (#4338ca) close icon

#### Error State
```css
.choices__inner:has([data-status="error"]) .choices__input {
  @apply elv-bg-critical-20; /* Light red background */
}
```

---

## Component API (Ruby)

### Inherited from Selectbox
```ruby
class Component < Elevate::Form::Selectbox::Component
```

### Additional Options
- `max_items` (Integer, optional): Maximum number of items user can select
- `add_choices` (Boolean, default: false): Allow users to create custom items
- `remote_url` (String, optional): AJAX endpoint for remote search
- `placeholder` (String): Placeholder text
- `choices` (Array): Array of [label, value] pairs

### Slots
- `clear_all_button`: Customizable clear all button (defaults to cancel-circle-filled icon)

### Example Usage (Rails)
```ruby
= f.combobox :tags, 
             'Select Tags', 
             choices: [['Ruby', 1], ['Rails', 2], ['JavaScript', 3]],
             size: :md,
             placeholder: 'Choose tags...',
             max_items: 3

# Remote search example
= f.combobox :products,
             'Search Products',
             choices: [],
             remote_url: '/api/products?name=$0',
             placeholder: 'Type to search...'
```

---

## Accessibility

### ARIA Support (via Choices.js)
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader announcements
- ✅ Focus management
- ✅ Required field validation
- ⚠️ Custom validation messages (uses `setCustomValidity()`)

### Keyboard Shortcuts
- **Arrow Up/Down**: Navigate options
- **Enter**: Select highlighted option
- **Backspace**: Remove last selected item
- **Escape**: Close dropdown

---

## Visual Design

### Chips (Selected Items)
- **Background**: `elv-bg-primary-20` (light purple)
- **Text**: `elv-text-primary` (purple)
- **Border Radius**: `elv-rounded-xs` (2px)
- **Padding**: `py-0.5 pr-1 pl-[6px]`
- **Gap**: `gap-2` (8px between chips)
- **Remove Button**: Purple close icon (20×20px)

### Input Field
- Inherits from Elevate Form Input component
- Right padding: `elv-pr-14` (56px) to accommodate clear button + chevron
- Placeholder shown only when no items selected

### Dropdown
- **Highlighted Item**: `elv-bg-primary-20` (light purple background)
- **Max Height**: Auto-scrolling when many options
- **Border**: Standard input border styling
- **Position**: Absolutely positioned below input

### Icons
- **Clear All**: `ui-icon-cancel-circle-filled` (20×20px, neutral-80)
- **Chevron**: Standard dropdown chevron
- **Remove (Chip)**: Custom purple X icon via CSS background

---

## Known Issues & Considerations

### Performance
- **Large Lists**: Choices.js can struggle with 1000+ options (use remote search instead)
- **Debouncing**: Remote queries debounced at 200ms

### Browser Compatibility
- Modern browsers only (ES2020+)
- Requires native `fetch()` support

### Limitations
- Cannot disable individual options (all options are selectable)
- Grouped options (`<optgroup>`) supported but not shown in preview
- No built-in validation for duplicate custom items

---

## Implementation Roadmap for Elevate Lite

### Phase 1: Static HTML Template
- [ ] Create basic HTML structure without Choices.js
- [ ] Style chips manually using Elevate classes
- [ ] Add clear all button + chevron icons

### Phase 2: JavaScript Enhancement
- [ ] **Option A**: Integrate Choices.js directly
  - Pro: Full feature parity with UE
  - Con: ~65KB dependency
- [ ] **Option B**: Build lightweight vanilla JS version
  - Pro: No dependencies, smaller bundle
  - Con: More development time, fewer features
- [ ] **Option C**: Use native `<select multiple>` with custom styling
  - Pro: Lightweight, accessible
  - Con: Limited UX (no search, chips)

### Phase 3: Advanced Features
- [ ] Remote search with debouncing
- [ ] Custom item creation
- [ ] Max items validation
- [ ] Error states and validation

### Recommended Approach
**Start with Option B** (vanilla JS):
1. Build static HTML template with chips display
2. Add basic show/hide dropdown with click handling
3. Implement keyboard navigation (Arrow keys, Enter, Escape)
4. Add search filtering (client-side only)
5. Skip remote search for v1 (use static options)

**Future Enhancement**:
- Consider Choices.js or Alpine.js if vanilla implementation becomes too complex

---

## File References

### Source Files (UE Elevate)
- Component: `/Users/schilds/projects/ue/engines/elevate/app/components/elevate/form/combobox/component.rb`
- Template: `/Users/schilds/projects/ue/engines/elevate/app/components/elevate/form/combobox/component.html.slim`
- Controller: `/Users/schilds/projects/ue/engines/elevate/app/components/elevate/form/combobox/controller.js`
- Styles: `/Users/schilds/projects/ue/engines/elevate/app/assets/stylesheets/elevate/combobox.css`
- Preview: `/Users/schilds/projects/ue/engines/elevate/app/components/elevate/form/combobox/preview.html.slim`

### Choices.js Documentation
- GitHub: https://github.com/Choices-js/Choices
- CDN: https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js

---

## Next Steps

1. ✅ **Audit Complete** — Component structure and API documented
2. [ ] **Design Specs** — Add combobox to DESIGN.md with visual specs (colors, spacing, states)
3. [ ] **Static Template** — Create HTML template in `/shared/components/templates/combobox.html`
4. [ ] **JavaScript** — Decide on implementation approach (vanilla vs library)
5. [ ] **Demo** — Add to elevate-demo.html with working examples
6. [ ] **Documentation** — Update ELEVATE_COMPONENTS.md with usage guide

---

## Summary

The Elevate Combobox is a **complex interactive component** that wraps the Choices.js library to provide multi-select, searchable dropdown functionality. It extends the base Selectbox component and adds:

- Multi-select with chip display
- Local and remote search
- Clear all functionality
- Maximum items limit
- Custom item creation (optional)

**Key Challenge for Elevate Lite**: Choices.js adds ~65KB dependency. Consider building a lightweight vanilla JS version for static prototypes, or accepting the dependency for full feature parity.

**Recommendation**: Start with static HTML template showing chips and dropdown structure. Add minimal JS for basic interactivity (show/hide, keyboard nav). Defer complex features (remote search, custom items) to future iterations.
