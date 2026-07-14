---
name: design-md-creator
description: Create or refine a DESIGN.md from a public website URL, then use that design system to build and open a standalone HTML page based on either a reference URL or the user's requested page and content. Visually validate the HTML and feed reusable corrections back into DESIGN.md. Use when the user wants a DESIGN.md, an HTML preview or replica, a new page in an extracted visual style, or an awesome-design-md style folder whose preview can expose and correct missing design details.
---

# DESIGN.md Creator

Turn a public website into a reusable `DESIGN.md` and a faithful HTML implementation that verifies it.

## Core Workflow

1. Open the design reference URL and inspect the rendered page at desktop and mobile widths when possible.
2. Determine the HTML implementation target from the user's request:
   - If the user describes a page, product, content, or workflow to implement, build that requested experience with the extracted design system. The reference URL supplies the visual language, not necessarily the page structure.
   - If the user explicitly asks to clone or reproduce a URL, recreate that page.
   - If the user provides only a reference URL and no separate implementation brief, recreate that page as the default visual test.
3. Inspect 1-3 additional high-signal pages only when the reference does not reveal enough of the shared visual system:
   - pricing
   - docs
   - product/dashboard
   - signup/auth
4. Extract only publicly visible design information. Separate observed values from conservative inference.
5. Draft or update `DESIGN.md` using the section order in [output-template.md](references/output-template.md).
6. Build `preview.html` from that `DESIGN.md`, following the implementation target chosen in step 2.
7. Render the HTML at representative desktop and mobile sizes and evaluate both adherence to the design system and fulfillment of the user's requested content and layout.
8. When the comparison exposes a missing or incorrect reusable rule, update `DESIGN.md` first, then bring the HTML back into alignment. Repeat until the document and preview agree.
9. Open the final HTML in the user's default browser and report its absolute file path.

Use [extraction-checklist.md](references/extraction-checklist.md) before finalizing both artifacts.

## What To Capture

- Visual theme and atmosphere
- Color palette with semantic roles
- Typography families, sizes, weights, tracking, and line heights
- Component styling for buttons, cards, inputs, nav, badges, and links
- Layout system: spacing, container widths, grid, radius, section rhythm
- Depth/elevation: borders, shadows, blur, overlays
- Responsive behavior visible from the site or strongly implied by the layout
- Design guardrails: repeated patterns worth preserving and anti-patterns to avoid

## How To Analyze

- Start from rendered UI, not marketing copy or CSS class names.
- Prefer computed and visible values over implementation-specific names.
- Sample repeated components before deciding a token is canonical.
- Normalize near-duplicates only when they are visually or functionally equivalent.
- Keep brand-specific naming when it clarifies intent; otherwise use neutral semantic names.
- Capture interaction states only if visible or strongly implied by the live UI.
- If the site has light and dark surfaces, document both and state which one the reference page uses.

## HTML Implementation Rules

- Implement the page the user requested. Do not replace a concrete brief with a generic token catalog or an unrelated landing page.
- In clone mode, preserve the target URL's visible copy, hierarchy, navigation labels, calls to action, section sequence, and defining visual details where publicly accessible.
- In style-application mode, use the user's requested content, information architecture, and features while applying the reference's documented visual system consistently. Do not force the reference page's original content structure onto a different requested page.
- Match the large-scale silhouette first: header, hero, content bands, grids, major imagery, and footer. Then refine typography, spacing, color, borders, radius, and effects.
- Treat `DESIGN.md` as the source of truth. Do not hide documentation gaps with one-off CSS; record reusable findings in `DESIGN.md` first.
- Prefer a standalone `preview.html` with semantic HTML, CSS, and only the minimal JavaScript needed for visible interactions. Do not add a framework or build step unless the user requests one or the existing project requires it.
- Reuse publicly accessible page assets when practical. Otherwise use a faithful local approximation and disclose meaningful substitutions.
- Implement responsive layout rather than scaling a desktop screenshot. Avoid screenshot-as-page recreations.
- Keep links and controls safe and local by default. Do not reproduce authentication, payments, tracking, private APIs, or backend behavior.

## Scope

Implement one complete page by default. Use the page explicitly described by the user; otherwise use the referenced URL itself. Include the content and presentation-level interactions that materially affect the requested preview.

Implement additional pages, application flows, complex interactions, or deeper component states only when the user asks. Keep added pages on the same documented design system and update `DESIGN.md` when they reveal new shared rules.

## Browser Delivery

- After validation, resolve and report the absolute path to every generated HTML entry point.
- Open the primary HTML entry point in the user's default browser using the environment's standard mechanism.
- Prefer opening the file directly. Start a lightweight local preview server only when routes, modules, or browser security rules prevent correct rendering from a file URL.
- If no usable browser is available or opening fails, do not hide the failure. Tell the user that the preview could not be opened, provide the HTML path so they can open it manually, and ask which available browser or environment they want to use if they want help opening it.
- Always provide the path even when the browser opens successfully.

## Output Rules

- Write `DESIGN.md` for another AI agent, not for a human designer.
- Be concrete. Prefer `#0A0A0A`, `14px`, `600`, `12px 16px`, and `1px solid #E5E7EB`.
- Avoid filler, praise, and generic design commentary.
- Do not claim exactness where the site only suggests a pattern.
- Mark inferred values briefly with `Inferred:` when that distinction matters.
- Keep terminology internally consistent across the document and HTML.
- Make the HTML useful as a visual test of the document, not a separate design system.

## Repo Conventions

When working in an `awesome-design-md` style repo, create or update:

- `design-md/<slug>/DESIGN.md`
- `design-md/<slug>/preview.html`
- `design-md/<slug>/preview-dark.html` only when the reference exposes a distinct dark version worth validating or the user requests it
- `design-md/<slug>/README.md`

Slug rules:

- Use the brand/domain form already used by the repo when it exists.
- Otherwise use lowercase domain-style naming, preserving meaningful dots such as `linear.app` or `x.ai`.

## Visual Validation

- Render the result; do not validate HTML by source inspection alone.
- In clone mode, compare the reference and preview at equivalent viewport sizes.
- In style-application mode, compare visual tokens and component behavior with the reference, then verify the page structure and content against the user's brief.
- Check overall geometry before local styling details.
- Check at least one desktop width and one mobile width when the reference is responsive.
- Verify that visible overflow, broken assets, missing sections, fallback fonts, and nonfunctional presentation interactions are resolved.
- If a mismatch identifies a reusable design rule, correct `DESIGN.md` before correcting the preview.

## Minimum Quality Bar

- Capture the site's primary palette, neutral scale, and main type hierarchy.
- Cover at least the nav, hero, buttons, cards/surfaces, and forms or inputs when present.
- Reproduce the requested page's major sections and content in `preview.html`.
- In clone mode, match the reference page's layout hierarchy and responsive behavior closely enough to expose errors in `DESIGN.md`.
- In style-application mode, satisfy the user's page brief while remaining recognizably faithful to the extracted design system.
- Keep every major visual decision in the preview explainable by the document.
- Avoid vague statements that cannot guide implementation.

## Failure Handling

- If the reference blocks access, use what is publicly reachable and state what coverage is missing.
- If the site is visually inconsistent, document the dominant system used on the reference page.
- If exact fonts or assets are unavailable, use the closest visible match and note the uncertainty.
- If a cloned target depends on private data or application state, recreate the visible state with static representative content and no private integration.
