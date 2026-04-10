---
name: design-md-creator
description: Create a new DESIGN.md from a public website URL by inspecting the site's visual system, extracting design tokens and interaction patterns, and writing a structured DESIGN.md for AI coding/design agents. Use when the user gives a website or landing-page URL and wants a new design-md, a DESIGN.md file, or an awesome-design-md style folder with DESIGN.md plus previews.
---

# DESIGN.md Creator

Use this skill to turn a public website into a reusable `DESIGN.md`.

## Workflow

1. Open the target URL and inspect the homepage first.
2. Inspect 1-3 additional high-signal pages if needed:
   - pricing
   - docs
   - product/dashboard
   - signup/auth
3. Extract only publicly visible design information. Do not invent private brand rules.
4. Separate observed values from inferred rules. When exact values are unclear, infer conservatively and say so.
5. Write the final `DESIGN.md` using the section order in [output-template.md](references/output-template.md).

## What To Capture

- Visual theme and atmosphere
- Color palette with semantic roles
- Typography families, sizes, weights, tracking, line heights
- Component styling for buttons, cards, inputs, nav, badges, links
- Layout system: spacing, container widths, grid, radius, section rhythm
- Depth/elevation: borders, shadows, blur, overlays
- Responsive behavior visible from the site or implied by the layout
- Design guardrails: repeated patterns worth preserving and anti-patterns to avoid

Use [extraction-checklist.md](references/extraction-checklist.md) while analyzing.

## How To Analyze

- Start from rendered UI, not marketing copy.
- Prefer computed/visible values over class names.
- Sample repeated components before deciding a token is canonical.
- Normalize near-duplicates only when they are visually or functionally equivalent.
- Keep brand-specific naming when it clarifies intent; otherwise use neutral semantic names.
- Capture interaction states only if visible or strongly implied by the live UI.
- If the site has both light and dark surfaces, document both and state which one is primary.

## Output Rules

- Write for another AI agent, not for a human designer.
- Be concrete. Prefer `#0A0A0A`, `14px`, `600`, `12px 16px`, `1px solid #E5E7EB`.
- Avoid filler, praise, and generic design commentary.
- Do not claim exactness where the site only suggests a pattern.
- Mark inferred values briefly with `Inferred:` when that distinction matters.
- Keep terminology internally consistent across all sections.

## Repo Conventions

When working in an `awesome-design-md` style repo, create or update:

- `design-md/<slug>/DESIGN.md`
- `design-md/<slug>/preview.html`
- `design-md/<slug>/preview-dark.html` when dark mode exists or is useful
- `design-md/<slug>/README.md`

Slug rules:

- Use the brand/domain form already used by the repo when it exists.
- Otherwise use lowercase domain-style naming, preserving meaningful dots such as `linear.app` or `x.ai`.

Keep preview files aligned with the documented tokens. The preview is a verification artifact, not a separate design system.

## Minimum Quality Bar

- Capture the site's primary palette and neutral scale
- Capture the main type hierarchy
- Cover at least the nav, hero, button styles, cards/surfaces, and forms or inputs if present
- Include enough layout guidance that another agent can build a convincing page in the same style
- Avoid vague statements that cannot guide implementation

## Failure Handling

- If the target blocks access, use what is publicly reachable and say what coverage is missing.
- If the site is visually inconsistent, document the dominant system used on the main product or landing experience.
- If exact fonts are unavailable, name the best visible match and note the uncertainty.
