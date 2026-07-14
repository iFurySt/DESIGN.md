# Extraction Checklist

Use this as a pass list before finalizing `DESIGN.md` and its HTML recreation.

## Page Coverage

- Primary reference page inspected
- 1-3 supporting pages inspected if needed
- Primary mode identified: light / dark / mixed
- HTML target selected: clone the reference / implement the user's requested page
- User-requested content, features, and page structure identified when provided

## Colors

- Brand primary
- Main accent
- Background(s)
- Surface(s)
- Heading/body/muted text
- Borders/dividers
- Success/warning/error if visible
- Overlay/blur/tint colors if visible

## Typography

- Primary font family
- Monospace/font for code if present
- Hero size/weight/tracking
- Section heading style
- Body sizes
- Button/link text styles
- Caption/meta text

## Components

- Primary button
- Secondary/ghost button
- Card/container
- Navigation/header
- Input/search/form control
- Badge/tag/chip
- Link styling

## Layout

- Target page shell and section order
- Major content hierarchy and alignment patterns
- Max container width
- Common horizontal padding
- Section spacing rhythm
- Grid behavior
- Radius scale

## Depth

- Border-first or shadow-first system
- Shadow values if visible
- Blur/glass effects if visible

## Output Quality

- Exact values captured where possible
- Inferred values labeled when needed
- No generic filler
- Every major preview decision is supported by `DESIGN.md`

## HTML Implementation

- User's requested page implemented rather than a generic design-system catalog
- In clone mode, visible copy, hierarchy, section order, and calls to action preserved
- In style-application mode, requested content and structure use the extracted visual system consistently
- Relevant page regions such as header, hero, content bands, imagery, grids, application shell, and footer represented when present or requested
- Public assets reused or meaningful substitutions disclosed
- Semantic HTML and maintainable CSS used
- No screenshot-as-page shortcut
- No unnecessary framework, build step, backend, tracking, auth, or payment behavior

## Visual Feedback Loop

- Preview rendered at a representative desktop width
- Preview rendered at a representative mobile width when responsive
- In clone mode, reference and preview compared at equivalent viewport sizes
- In style-application mode, visual fidelity checked against the reference and structure checked against the user's brief
- Overall silhouette and container geometry checked before local details
- Typography, spacing, colors, borders, radii, effects, and responsive behavior checked
- Broken assets, overflow, fallback fonts, and missing sections resolved
- Reusable discrepancies corrected in `DESIGN.md` first, then in the HTML
- Final `DESIGN.md` and preview agree

## Delivery

- Absolute path to each HTML entry point reported
- Primary HTML opened in the user's default browser
- If opening failed, failure disclosed and manual path provided
- If needed, user asked which available browser or environment to use
