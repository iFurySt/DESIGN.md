# Output Template

Use this exact section order.

```md
# Design System Inspiration of <Brand>

## 1. Visual Theme & Atmosphere

State the overall visual character, density, mood, and what makes the design recognizable.

## 2. Color Palette & Roles

- **<Token Name>** (`#HEX`): role and usage
- Include primary, secondary, accent, neutrals, borders, surfaces, status colors, overlays when visible

## 3. Typography Rules

### Font Family
- Primary:
- Secondary:
- Monospace:

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|

## 4. Component Stylings

### Buttons
### Cards & Containers
### Inputs & Forms
### Navigation
### Badges / Tags
### Links / Interactive States

Document background, text, border, radius, padding, hover/focus/active states when visible.

## 5. Layout Principles

### Spacing System
### Grid & Container
### Section Rhythm
### Border Radius Scale

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|

## 7. Do's and Don'ts

### Do
- concrete implementation rules

### Don't
- concrete anti-patterns

## 8. Responsive Behavior

- breakpoints if visible
- mobile nav behavior
- stacking/collapse rules
- touch target or density changes

## 9. Agent Prompt Guide

- Primary colors:
- Key type rules:
- Core component rules:
- Short prompt:
```

## Writing Notes

- Prefer bullets and tables over long paragraphs.
- Use short paragraphs only where interpretation is important.
- Keep token names stable and reusable.
- The final section should help another AI agent build UI quickly.
