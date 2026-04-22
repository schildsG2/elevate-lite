# Elevate — G2 Design System

> Elevate is G2's design system.
> This file is the single source of truth for G2's design language.
> Always reference this file when generating, reviewing, or modifying any G2 UI.
> Never invent values. If a value is not defined here, ask before proceeding.

---

## Overview

G2's design system is called **Elevate**. It is a B2B software marketplace built on real reviews, transparent scoring, and verified trust signals. The design system reflects this: every surface functions as both a premium product experience and a structured answer layer that serves human buyers and AI agents equally.

The Creative North Star is "The Decision Interface." Every page should function as both a premium product experience and a structured answer surface: easy to scan, easy to compare, and easy for AI systems to interpret, cite, and act on. The trust layer underpins this — review counts, recency, authenticity signals, scoring badges, and methodology links are treated as first-class design elements, not footnotes.

We use high-contrast typography, restrained surfaces, and disciplined spacing to replace directory clutter with clarity. Metadata becomes the visual grammar of trust — ratings, review proof, category context, and product relationships are consistently formatted so both people and agents can reliably read the same signals.

This means each page does two jobs at once: support human confidence and enable trustworthy agent behaviour. The interface helps buyers validate claims and compare options, while the underlying structure and consistency help AI systems extract entities, understand relationships, and propagate only grounded, review-backed answers.

The result is a marketplace that feels less like a list of vendors and more like a reliable recommendation system with an explicit trust backbone. It communicates authority to buyers, predictability to agents, and confidence to both.

---

# Design system usage

## Figma reference
- Primary design-system file: https://www.figma.com/design/eQDuhWVGsBJI3ksubA1xyk/Design-System-For-Claude?node-id=0-1&m=dev
- Preferred inspection targets: component pages, variable collections, core templates, and canonical flows
- When implementing UI, start from the closest existing frame/component link

## Component policy
- Always prefer existing components and variants
- Reuse variables/tokens before introducing literals
- Reuse established layouts before creating new composition patterns

## State policy
- Every component should account for default, hover, focus, active, disabled, loading, empty, and error states where relevant
- Skeletons should mirror final layout structure
- Empty and error states should preserve trust and clarity

## Escalation rules
- If Figma and code disagree, report the mismatch
- If a component exists in Figma but not in code, implement using the closest coded primitive and note the gap
- If neither exists, propose a new primitive with rationale

## Principles

**Answer-first, not page-first.**
Every screen should behave like a high-quality answer surface: it should be obvious what the page helps you decide (e.g. "Which project management tool?", "Which category should I explore next?"), and that answer should be visible in the first scroll without relying on chrome or side quests.

**Trust-layered by default.**
Design always carries the trust layer: ratings, review counts, recency, scoring badges, and links to methodology or Trust & Security are treated as core content, not garnish. Wherever the interface makes a claim ("Best Products 2026", "Trending Products", "G2 Buyer Behavior Report"), there should be visually consistent signals that explain why a buyer or agent should trust it.

**Agent-readable, human-legible.**
Structures are designed so humans can scan and agents can parse the same hierarchy. This means stable patterns for headings, product entities, categories, review proof, and CTAs across homepage, category, product, comparison, and content views — so any consumer, human or AI, can reliably recognise "what this block is" and "what it's for."

**Calm density over clutter.**
G2 is inherently information-dense, but never noisy. We use whitespace, tonal layering, and disciplined typography so sections like "Most Popular Software Categories", report sliders, testimonials, and deep link lists feel structured rather than crowded, even when they contain dozens of options.

**Consistent accents, restrained palette.**
Rorange and supporting blues carry almost all emphasis, with neutrals doing the heavy lifting for readability. New colours appear only when they serve a clear semantic role (status, alerts, data visualisation), so CTAs, trust signals, and navigation never have to shout over visual noise.

**Stateful and honest.**
Loading, empty, and error states are never afterthoughts. Skeletons mirror the final layout, empty states explain and guide, and errors own what went wrong and how to recover — so the experience feels reliable even when data is in flux or AI-enhanced answers aren't available.

---

## Trust Layer

The experience is built on an explicit trust layer that turns G2's proof points into structured, repeatable design patterns. Review volume, recency, authenticity checks, and scoring badges are surfaced consistently so buyers can quickly gauge confidence while agents can reliably interpret the same signals.

Every key view (home, category, product, comparison) must expose its trust scaffolding: clear rating visuals, review counts, methodology links, and contextual cues that tie back to G2's published scoring methods, policies, and Trust & Security standards. These elements are treated as primary UI, not footer boilerplate, and are visually stable across layouts so they remain easy to parse, cite, and reuse in AI-driven flows.

Visually, the trust layer avoids theatrics in favour of stable, legible patterns: neutral surfaces, precise typographic hierarchy, and restrained use of colour around ratings, badges, and verification markers. The goal is for users and agents to recognise "trusted G2 signals" instantly, whether they appear on the homepage, inside a comparison table, or embedded as structured answer units in external experiences.

---

## Colours

The palette is rooted in the interplay between deep, credible purples and high-visibility accent oranges (Rorange), supported by calm neutral surfaces for dense information and comparison states. Colour must signal authority, scannability, and clear calls to action — not decoration.

### Brand Core

| Token | Hex | Usage |
|---|---|---|
| Brand / Rorange | `#ff492c` | Primary brand colour. |
| Brand / Primary (Purple) | `#5746b2` | Secondary brand colour. Use for product identity, primary ctsa, data primary, eyebrow text. |
| Brand / Midnight | `#201f23` | Near-black. Use for all dark text — never use pure `#000000`. |
| Brand / Pure White | `#ffffff` | Base white. Use for card surfaces and inverted text. |

### Surface Philosophy

To maintain a premium, information-forward feel, 1px solid borders are a last resort for sectioning and should be used sparingly. Boundaries between content areas are primarily defined through:

- **Background colour shifts:** moving from a base surface (soft neutral off-white) to slightly deeper panels for sections like "Most Popular Software Categories" or "Research popular software & services."
- **Subtle tonal transitions:** using small shifts in value to indicate the edge of cards, rails, and hero modules without relying on harsh strokes.

Think of the UI as layers of printed cards placed on a neutral table:

- **Base (page background):** global page background — a soft, low-chroma neutral that keeps long category lists, tables, and navigation feeling light and legible. Use `bg-neutral-5` (`#fafafa`) or N1 (`#fcfcfd`).
- **Level 1 (section panels):** slightly elevated panels for major zones like the hero, "Most Popular Software Categories," and "Research popular software & services," creating reading rhythm down the page.
- **Level 2 (interactive cards):** product tiles, carousels, and featured content cards sit on the lightest, most contrasted surface — `bg-neutral-0` (`#ffffff`) — often paired with subtle tonal framing to create a "natural lift" for interactive or high-intent elements.

By placing lighter, crisper cards on gently tinted section backgrounds, we create an architectural hierarchy that feels structured and trustworthy, matching G2's dense content without sliding into "database grid" aesthetics.

### Rorange Tone Scale

| Token | Hex |
|---|---|
| R20 | `#fff6f5` |
| R40 | `#ffd7d1` |
| R60 | `#ffa394` |
| R80 | `#ff7761` |
| R100 | `#ff492c` |
| R120 | `#eb2000` |
| R140 | `#b21800` |
| R160 | `#610d00` |
| R180 | `#2e0600` |

### Purple Tone Scale

| Token | Hex |
|---|---|
| P5 | `#f5f4fb` |
| P10 | `#f2f0f9` |
| P20 | `#ebe9f6` |
| P30 | `#dedaf1` |
| P40 | `#c3bde5` |
| P60 | `#988ed2` |
| P80 | `#7769c4` |
| P100 | `#5746b2` |
| P120 | `#45388f` |
| P140 | `#342a6a` |
| P160 | `#211b46` |
| P180 | `#15112c` |

### Secondary Brand Colours

| Token | Hex | Usage |
|---|---|---|
| Blue | `#0073f5` | Links, informational states |
| Green | `#27d3bc` | Success, positive sentiment |
| Yellow | `#ffc800` | Warning states |

### Blue Tone Scale

| Token | Hex |
|---|---|
| B20 | `#dbecff` |
| B40 | `#9eccff` |
| B60 | `#66aeff` |
| B80 | `#2e90ff` |
| B100 | `#0073f5` |
| B120 | `#005bc2` |
| B140 | `#00438f` |
| B160 | `#002b5c` |
| B180 | `#001329` |

### Green Tone Scale

| Token | Hex |
|---|---|
| G20 | `#d0f6f1` |
| G80 | `#5be1cf` |
| G100 | `#27d3bc` |
| G120 | `#1fa896` |
| G140 | `#177d6f` |
| G160 | `#0f5249` |
| G180 | `#072723` |

### Yellow Tone Scale

| Token | Hex |
|---|---|
| Y20 | `#fff9e5` |
| Y40 | `#fff2c2` |
| Y60 | `#ffe78f` |
| Y80 | `#ffd747` |
| Y100 | `#ffc800` |
| Y120 | `#cca000` |
| Y140 | `#997800` |
| Y160 | `#665000` |
| Y180 | `#332800` |

### Neutral Scale

| Token | Hex | Usage |
|---|---|---|
| N0 / Pure White | `#ffffff` | Card surfaces |
| N1 | `#fcfcfd` | Page background |
| N5 | `#fafafa` | Subtle backgrounds |
| N10 | `#f2f2f3` | Dividers, hover states |
| N20 | `#dfdfe2` | Border light |
| N40 | `#b0afb6` | Border medium, disabled |
| N70 | `#6f6d78` | Text non-essential |
| N80 | `#4c4b53` | Text subtle |
| N100 | `#201f23` | Text default (Midnight) |

### Semantic Text Colours

| Token | Hex | Usage |
|---|---|---|
| text-default | `#201f23` | All body text |
| text-subtle | `#4c4b53` | Secondary text |
| text-nonessential | `#6f6d78` | Metadata, captions |
| text-brand | `#ff492c` | Brand-coloured text |
| text-inverted | `#ffffff` | Text on dark backgrounds |

### Background Colours

| Token | Hex | Usage |
|---|---|---|
| bg-neutral-0 | `#ffffff` | Card backgrounds |
| bg-neutral-5 | `#fafafa` | Page backgrounds |
| bg-hero | `#fcf6f4` | Hero section background |
| bg-success | `#1fa896` | Success banners |
| bg-critical | `#eb2000` | Error/critical banners |

### Border Colours

| Token | Hex | Usage |
|---|---|---|
| border-light | `#dfdfe2` | Default borders |
| border-medium | `#b0afb6` | Emphasis borders |

---

## Typography

We use typography to balance search utility, dense category structures, and review detail with an elevated, editorial tone. Type choices should feel modern, neutral, and highly legible, so both humans and agents can parse hierarchy at a glance.

Use **Figtree** for all UI text. There is no secondary typeface.

### Display and Headlines

Headlines and key wayfinding elements use Figtree's clean geometric forms to carry the voice of authority for the marketplace — clear, confident, and tech-forward. Hero statements such as "Where you go for software" and key banners for "Best Products 2026," "Trending Products," or AI/LLM information should use larger display sizes to create a locked-in editorial feel across the top of the experience.

### Body, Labels and Dense UI

Body copy, navigation, filters, review metadata, and table content rely on Figtree's legibility at small sizes and long reading sessions. This supports the heavy use of lists ("Most Popular Software Categories"), multi-column link groups ("Research popular software & services"), and policy content (scoring methodologies, trust & security, legal) that buyers and agents rely on.

### Type Scale

| Style | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| Heading 2XL | 67px | 80px | 700 | Hero display and campaign headlines |
| Heading XL | 51px | 64px | 700 | Page heroes and major feature headers |
| Heading Lg | 38px | 48px | 700 | Section heroes and large callout headings |
| Heading Md | 28px | 36px | 700 | Section headings |
| Heading Sm | 21px | 28px | 700 | Sub-headings and card titles |
| Body | 16px | 24px | 400 | All body copy |
| Body XS | 12px | 16px | 400 | Small body text, metadata, secondary information |
| Label Sm | 14px | 20px | 600 | Buttons, labels, metadata |
| Label Xs | 12px | 16px | 600 | Badges, chips, captions |

### Typography Rules

- Letter spacing: 0 (tracking-base) across all styles.
- Never use pure `#000000` for text. Always use `text-default` (`#201f23`).
- Use `text-subtle` (`#4c4b53`) for secondary text hierarchy.
- Use `text-nonessential` (`#6f6d78`) for metadata, timestamps, and captions.
- Never exceed three font sizes on a single screen view. Use weight and colour to create hierarchy within a single type size before introducing a new size.
- Avoid text smaller than 14px for anything interactive.
- Hero H1 uses Heading XL (51px / 700 / line-height 64px) in `text-default`. Do not apply Rorange or any accent colour to part of the H1.
- Hero kicker (eyebrow label above the H1) is plain text in P100 (`#5746b2`). No background, no container, no pill.
- Eyebrow text above any section heading uses P100 (`#5746b2`). Never use Rorange for eyebrows.
- Section eyebrows, Heading Md titles, and section lead paragraphs must be centre-aligned.
- All headlines must use title case.

---

## Spacing

Base unit: 4px. All spacing is a multiple of 4.

| Token | Value | Usage |
|---|---|---|
| space-1 | 4px | Micro gaps, icon padding |
| space-2 | 8px | Tight internal padding |
| space-3 | 12px | Default internal padding (small components) |
| space-4 | 16px | Default component padding |
| space-5 | 20px | — |
| space-6 | 24px | Card padding |
| space-8 | 32px | Section gaps |
| space-10 | 40px | Large section gaps |
| space-12 | 48px | Minimum touch target height |
| space-16 | 64px | Page-level spacing |
| space-20 | 80px | Hero section spacing |

---

## Border Radius

### Box Radius

| Token | Value | Usage |
|---|---|---|
| radius-2xs | 2px | Subtle rounding of rectangular edges |
| radius-xs | 4px | Tiny components like status badges and checkboxes |
| radius-sm | 8px | Small buttons and inputs |
| radius-md | 12px | Larger buttons, inputs, and small containers |
| radius-lg | 16px | Medium-sized and nested cards and containers |
| radius-xl | 20px | Reserved for the largest cards and containers |

### Pill Radius

| Token | Value | Usage |
|---|---|---|
| radius-pill-3xs | 8px | 3XS UI |
| radius-pill-2xs | 12px | 2XS UI |
| radius-pill-xs | 16px | XS UI |
| radius-pill-sm | 20px | Small UI |
| radius-pill-md | 24px | Medium (Default) UI |
| radius-pill-lg | 48px | Large UI |

---

## Elevation & Depth

Depth exists to support scannability and trust, not decoration. The marketplace is already dense with categories, links, and review signals, so elevation must stay subtle and predictable across hero, category blocks, sliders, and footers.

### The Layering Principle

Avoid heavy, "app-default" shadows for static cards. Depth is primarily created through the surface hierarchy described in the Colours section: neutral page base, slightly lifted section panels, and crisp, lighter cards for interactive or high-intent content such as product tiles, carousels, and promo blocks. This keeps the page feeling structured and editorial rather than like a grid of floating widgets.

- **Static cards:** no shadow. Define edges through background colour contrast alone.
- **Card surface:** `bg-neutral-0` (`#ffffff`) lifts off the page background naturally.
- **Floating elements (modals, dropdowns):** `bg-neutral-0` with soft shadow.

Shadow for floating elements:
```
box-shadow: 0 4px 16px 0 rgba(32, 31, 35, 0.10);
```

Shadow for modals:
```
box-shadow: 0 8px 32px 0 rgba(32, 31, 35, 0.12);
```

### Ambient Shadows

When shadows are used — primarily for active states or modal/overlay patterns — they should be broad and diffused, with a subtle tint drawn from the core text/surface colour rather than pure black. Think low-contrast, wide-radius ambiance that suggests "lift" for elements like modals and key dialogs — never hard, high-opacity drop shadows. Never use shadows with opacity above 12%.

### Ghost Borders

For high-density constructs (comparison tables, long category lists, footer link stacks) or stricter accessibility needs, use ghost borders: ultra-low-contrast dividers that gently separate rows and columns without visually slicing the interface into boxes. Use `border-light` (`#dfdfe2`) at 1px. These borders should sit just above the background tone so they are felt, not seen — letting text and trust signals remain the primary focus.

### Additional Rules

- Modals use the modal shadow above, plus a backdrop overlay of `rgba(32, 31, 35, 0.40)`.
- If a container has a solid left or top accent border (callouts, highlighted rows), set `border-radius: 0`. Rounded corners and single-side accent borders are mutually exclusive.

---

## Components

### Buttons

G2's button system has seven tiers: Primary, Primary Brand, Primary Inverted, Secondary, Tertiary, Text, and Text Subtle. The most commonly used is **Primary**. All buttons use a rounded pill shape and sentence case for CTA labels (title case for text-only CTAs). CTA icons sit on the left unless it is a directional arrow. For button pairs, use Primary with Tertiary.

#### Size Variants

| Size | Padding |
|---|---|
| Large | 12px all sides |
| Medium | 8px top/bottom, 12px left/right |
| Small | 8px all sides |

#### Primary Button (default — use this most)
- Background: `#5746b2` (Brand / Primary Purple, P100)
- Text: `#ffffff` (text-inverted)
- Font: Label Sm (14px / 600)
- Border radius: radius-pill-md (24px)
- Min height: 40px
- Hover: `#45388f` (P120)
- Disabled: `#b0afb6` (N40) background, `#ffffff` text

#### Primary Brand Button (Rorange — use for brand-forward CTAs)
- Background: `#ff492c` (Rorange, R100)
- Text: `#ffffff` (text-inverted)
- Font: Label Sm (14px / 600)
- Border radius: radius-pill-md (24px)
- Min height: 40px
- Hover: `#eb2000` (R120)
- Disabled: `#b0afb6` (N40) background, `#ffffff` text

#### Secondary Button
- Background: transparent
- Border: 1.5px solid `#dfdfe2` (border-light)
- Text: `#201f23` (text-default)
- Font: Label Sm (14px / 600)
- Border radius: radius-pill-md (24px)
- Hover: `#f2f2f3` (N10) background

#### Tertiary Button
- Background: transparent
- No border
- Text: `#5746b2` (P100)
- Font: Label Sm (14px / 600)
- Hover: `#f2f0f9` (P10) background

#### Text / Text Subtle Button
- Background: transparent
- No border
- Text: `#201f23` (text-default) for Text; `#6f6d78` (text-nonessential) for Text Subtle
- Font: Label Sm (14px / 600)

#### Rules
- Default to Primary (purple) for most actions. Use Primary Brand (Rorange) only for brand-forward or marketing-facing CTAs.
- Minimum touch target height: 48px on mobile.
- Pair Primary with Tertiary for button groups — never Primary with Secondary.
- Destructive actions use R120 (`#eb2000`) background, not R100.
- Labels use sentence case. Text-only CTAs use title case.

---

### Cards

Listing and promo cards avoid heavy borders and instead rely on the surface architecture: a lighter card background on a slightly deeper section panel. Internal padding is generous enough to accommodate logos, product names, review counts, and CTAs without feeling cramped, giving each product or resource room to breathe within the grid.

Rating stars and review counts are treated as trust signals, not decoration. Their colour and placement must be consistent across all cards so buyers and agents can recognise them as the canonical expression of G2 review proof, without visually competing with primary CTAs.

- Background: `#ffffff` (bg-neutral-0)
- Border radius: radius-md (12px) or radius-lg (16px)
- No border by default — card lifts from page background through tonal contrast.
- If a border is needed: 1px solid `#dfdfe2` (border-light)
- Internal padding: 24px (space-6)
- Card title: Heading Sm (21px / 700)
- Body text: Body (16px / 400) in `text-default`
- Metadata: Label Xs (12px / 600) in `text-nonessential`

---

### Navigation

- Background: `#ffffff` with `border-bottom: 1px solid #dfdfe2`
- Default nav item: `text-default` (`#201f23`), 13px / 400 (Regular)
- Hover nav item: `#666666`, no background change
- Height: 92px
- Navigation anchor links must use `scroll-behavior: smooth` on the `html` element.
- The G2 logo must use the SVG asset (`Color=Rorange.svg`) at 56×56px. Never render it as plain text.

---

### Forms and Inputs

Inputs such as "Search software" and inline forms use a calm, slightly elevated surface with clear boundaries and ample horizontal padding for longer queries and company names. Focus states always show a clear 2px border in the primary palette, reinforcing both interactivity and accessibility while aligning with the broader trust layer (precision, clarity, no gimmicks).

- Background: `#f2f2f3` (N10)
- Border: 1px solid `#dfdfe2` (border-light)
- Border radius: radius-sm (8px)
- Height: 40px (default), 48px (large)
- Font: Body (16px / 400) for input text
- Label: Label Sm (14px / 600) in `text-default`
- Placeholder: `text-nonessential` (`#6f6d78`)
- Focus state: 2px border in `#5746b2` (P100)
- Error state: 2px border in `#eb2000` (R120)
- Disabled: background `#fafafa` (N5), text `#b0afb6` (N40)

---

### Badges and Chips

Category chips and link clusters are compact but legible tokens, using a soft background tint with clear text to signal clickability without overpowering headings. Rounded corners stay moderate — friendly but professional — mirroring the tone of G2's category lists and "Research popular software & services" panels where dense link groups need clear affordance and rhythm.

- Border radius: radius-xs (4px) for badges, radius-pill-md (24px) for chips
- Font: Label Xs (12px / 600)
- Padding: 2px 8px

| Type | Background | Text |
|---|---|---|
| Default | `#f2f2f3` (N10) | `#201f23` (text-default) |
| Brand | `#fff6f5` (R20) | `#ff492c` (text-brand) |
| Success | `#d0f6f1` (G20) | `#0f5249` (G160) |
| Warning | `#fff9e5` (Y20) | `#665000` (Y160) |
| Critical | `#ffd7d1` (R40) | `#b21800` (R140) |
| Info | `#dbecff` (B20) | `#002b5c` (B160) |
| Purple | `#ebe9f6` (P20) | `#342a6a` (P140) |

---

### Data Tables

- Header background: `#fafafa` (N5)
- Header text: Label Sm (14px / 600) in `text-subtle` (`#4c4b53`)
- Row background: `#ffffff`
- Alternate row: `#fcfcfd` (N1)
- Row hover: `#f2f2f3` (N10)
- Cell text: Body (16px / 400) in `text-default`
- Border: 1px solid `#dfdfe2` (border-light) on rows only — no vertical column dividers
- Row height: 48px minimum

---

### Modals and Overlays

- Modal background: `#ffffff`
- Border radius: radius-lg (16px) or radius-xl (20px)
- Shadow: `0 8px 32px 0 rgba(32, 31, 35, 0.12)`
- Backdrop: `rgba(32, 31, 35, 0.40)`
- Padding: 32px (space-8)
- Title: Heading Sm (21px / 700)
- Max width: 560px (default), 800px (large)

---

## Data Visualisation Colours

Use only these colours for charts and graphs. Do not use arbitrary brand colours in data contexts.

| Role | Hex | Usage |
|---|---|---|
| data-primary | `#5746b2` | Hero company / primary metric |
| data-primary-tint1 | `#7769c4` | — |
| data-primary-tint2 | `#988ed2` | — |
| data-primary-tint3 | `#c3bde5` | — |
| data-primary-tint4 | `#dedaf1` | — |
| data-neutral | `#6f6d78` | External metrics |
| data-neutral-tint1 | `#898792` | — |
| data-neutral-tint2 | `#b0afb6` | — |
| data-neutral-tint3 | `#cacace` | — |
| data-neutral-tint4 | `#dfdfe2` | — |
| data-secondary-1 | `#ffa394` | Distinct external metric |
| data-secondary-2 | `#86e9dc` | Distinct external metric |
| data-secondary-3 | `#66aeff` | Distinct external metric |
| data-tertiary-1 | `#ffd7d1` | Fallback comparison |
| data-tertiary-2 | `#a9efe5` | Fallback comparison |
| data-tertiary-3 | `#9eccff` | Fallback comparison |
| data-success | `#1fa896` | Positive trend |
| data-success-light | `#a9efe5` | Positive trend background |
| data-critical | `#eb2000` | Negative trend |
| data-critical-light | `#ffd7d1` | Negative trend background |

---

## Grid & Breakpoints

### Breakpoint Tokens

| Token | Value |
|---|---|
| breakpoint-sm | 640px (40rem) |
| breakpoint-md | 768px (48rem) |
| breakpoint-lg | 1024px (64rem) |
| breakpoint-xl | 1280px (80rem) |
| breakpoint-2xl | 1536px (96rem) |

### Responsive Column Grid

| Size | Breakpoint | Columns | Gutter | Outer Margin |
|---|---|---|---|---|
| XS | < 640px | 4 | 16px | 36px |
| S | >= 640px | 8 | 16px | 52px |
| M | >= 768px | 12 | 16px | 28.5px |
| L | >= 1024px | 12 | 24px | 76px |
| XL | >= 1280px | 12 | 24px | 106px |

---

## States

States are part of the trust layer. When data is loading, missing, or temporarily unavailable, the interface should still feel reliable, intentional, and safe for both buyers and agents. Every major surface — search, category lists, product cards, reports, and review flows — must have designed loading, empty, and error expressions.

### Loading States

Loading states should mirror the final layout, not replace it with spinners. Use skeletons that match the shape of hero text, category lists, product cards, testimonial blocks, and link stacks (e.g. "Most Popular Software Categories", "Research popular software & services"), so users understand what's coming and agents can still infer the underlying structure.

Skeleton colours follow the tonal architecture: slightly elevated from the base surface but never high contrast. Avoid animated effects that feel game-like; if motion is used, keep it slow and subtle so it reads as system activity, not decoration.

### Empty States

Empty states should explain, reassure, and offer a next step. For example, when a search yields no results or a user hasn't left any reviews yet, pair a clear message ("We couldn't find matches for that query") with a relevant action ("Refine filters", "Browse all categories", "Leave your first review").

Tone stays consistent with the rest of G2: practical, encouraging, and grounded in real usage, not playful error jokes. Where possible, link empty states back into the trust layer (e.g. highlighting how reviews help the 5M+ monthly buyers on G2).

### Error States

Error states acknowledge failure without leaking internal language. Copy should be plain and specific ("Something went wrong loading this content") and always include a clear recovery path: retry, adjust filters, or go back to a stable area like a top-level category or the homepage.

Visually, errors reuse existing semantic colours and typography — avoid introducing new warning colours or disruptive banners that conflict with the trust cues used elsewhere. For critical failures (e.g. comparison view unavailable), prefer a calm full-width error panel over inline fragments, so the user and any agent consuming the page can clearly understand the scope of what failed.

### AI-Enhanced and Agent-Facing States

Where AI-driven or agent-oriented explanations appear (e.g. summarised product insights, "best for" guidance, or AI-compiled lists), they must be visually distinguished but not theatrical. Use a consistent pattern — icon, label, and explanatory line — that indicates "AI-assisted" while clearly anchoring the content in review-backed data and G2 methodology.

If an AI-enhanced section cannot load or provide an answer, it should fail gracefully back to native G2 structures: raw lists, filters, and reviews. The page should always remain a valid, useful answer surface for both humans and agents, even when AI augmentation is temporarily absent.

---

## Do's and Don'ts

**DO:**
- Embrace whitespace, especially around dense link clusters like "Most Popular Software Categories" and "Research popular software & services." If a block feels crowded, increase vertical spacing between groups rather than shrinking type or adding lines.
- Design mobile-first. On smaller screens, ensure cards, sliders, and testimonials land on clearly differentiated surfaces so users can distinguish background, section, and interactive content without needing heavy rules.
- Use high-contrast headlines. Large, bold headings in strong contrast against calm surfaces are a core part of G2's sense of authority and clarity.
- Surface trust cues near the content they qualify. Ratings, review counts, and links to scoring methodologies or Trust & Security should appear close to the products, categories, or claims they support — reinforcing the trust layer for both buyers and agents.
- Use `text-default` (`#201f23`) for all text — never pure `#000000`.
- Use the 4px base unit scale for all spacing values. Never invent values outside the defined scale.
- Default to Primary (purple, `#5746b2`) for all buttons. Use Primary Brand (Rorange, `#ff492c`) only for brand-forward or marketing-facing CTAs.
- Use Figtree exclusively. Never substitute another font.
- Use `border-light` (`#dfdfe2`) at 1px for all borders. No decorative thick borders.
- Use Green tones for positive/success states and R120 (`#eb2000`) for error/critical states. Never use generic CSS `green` or `red`.
- Set minimum interactive element height to 40px on desktop and 48px on mobile.
- Render the G2 logo in navigation as the SVG asset (`Color=Rorange.svg`) at 56×56px.
- Load icons via Material Symbols: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined`, rendered with `<span class="material-symbols-outlined">`. Use custom icons when supplied.
- Use `scroll-behavior: smooth` on the `html` element for all navigation anchor links.
- Use title case for all headlines.
- Set `border-radius: 0` on any container with a solid left or top accent border. Rounded corners and single-side accent borders are mutually exclusive.

**DON'T:**
- Use pure black (`#000000`). All text should use `text-default` (`#201f23`) — rich, slightly softened ink that matches the neutral surface system.
- Use hard shadows or add shadows to static cards. Avoid any shadow with opacity above 12%; depth comes from background tonal contrast, not drop shadows.
- Over-rely on dividers. Horizontal rules between every section, row, or list block make the experience feel like a spreadsheet. Prefer spacing changes, surface shifts, and typographic hierarchy instead.
- Introduce new accent colours casually. 
- Use Rorange (`#ff492c`) for sentiment, data visualisation, or eyebrow text — it is a brand colour only.
- Exceed 3 font sizes on a single screen view. Use weight and colour to create hierarchy before introducing a new size.
- Render the G2 logo as plain text in navigation.

---

## Agent Prompt Guide

**For AI agents generating Elevate UI:**

### Component Usage Patterns

**Common compositions:**
- **Login/signup pages**: Use Text Input, Password Input (with toggle), Checkbox (remember me), Primary Button
- **User profiles**: Use Avatar, Text Input, Textarea, Select, Button Group for save/cancel
- **Product displays**: Use Product Avatar, Product Chip, Star Rating, Status Badge, Content Card
- **Data tables**: Use Table with Pagination, Status Badge, Link, Icon Button for actions
- **Settings pages**: Use Toggle, Radio Button, Select, Tab navigation, Content Card containers
- **Forms**: Use Label + Helper Text for all inputs, show Error states with descriptive messages, group related fields in Content Cards

**Component selection guidelines:**
- **Buttons**: Default to Primary Button (purple). Use Brand Button (rorange) only for marketing CTAs or brand-forward actions
- **Text emphasis**: Use text-default for body, text-subtle for secondary info, text-nonessential for tertiary/helper text
- **Cards**: Content Card for content display, Inset Card for nested/summary content
- **Navigation**: Breadcrumbs for hierarchy, Tab for view switching, Link for cross-references
- **Feedback**: Status Badge for states, Notification Badge for counts, Tooltip for help text
- **Loading**: Spin Loader for async operations, Progress Bar for determinate progress

**Layout principles:**
- Start with vertical spacing (space-4 = 16px between sections)
- Use Content Cards to group related UI rather than bare dividers
- On mobile, stack components vertically with generous spacing
- Buttons should be full-width on mobile (width: 100%), fixed-width on desktop

**Interaction states:**
- Always include hover states (background changes to indicate interactivity)
- Focus states are CRITICAL: purple outline for form inputs, purple ring shadow for buttons
- Disabled states should reduce opacity AND change cursor to not-allowed
- Error states should show red border (#eb2000) plus descriptive error message below

**Accessibility requirements:**
- All interactive elements: minimum 40px height (desktop), 48px (mobile)
- All form inputs: must have associated label (using for/id) or aria-label
- Error messages: must use aria-invalid="true" and aria-describedby pointing to error text
- Focus indicators: must be visible (3px outline or 4px shadow)
- Color alone insufficient: use icons or text to convey meaning

### Reference Components By Name

When generating UI, reference components as:
- "Primary Button" or "Secondary Button"
- "Text Input" or "Password Input with toggle"
- "Content Card" or "Inset Card"
- "Status Badge" or "Notification Badge"
- "Tab navigation" or "Breadcrumb navigation"

All component specs are in the Components section above. All CSS tokens are prefixed with `--palette-`, `--bg-`, `--text-`, or `--border-`.
