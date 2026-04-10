# Contributing to Awesome Design MD

Thanks for contributing.

This repository is a curated collection of DESIGN.md files extracted from popular websites. Each file captures a site's complete visual language in a format any AI agent can read.

## How to Contribute

We welcome pull requests for both improving existing designs and adding new ones.

## Create a New DESIGN.md

Use the repo skill:

```text
Use $design-md-creator to analyze https://example.com and create a new DESIGN.md.
```

Recommended workflow:

1. Pick a public website URL
2. Use `skills/design-md-creator`
3. Create `design-md/<slug>/DESIGN.md`
4. Create `preview.html` and `preview-dark.html` when useful
5. Add or update `design-md/<slug>/README.md`
6. Open a PR with the site URL and a short summary of what was extracted

### Improve an Existing DESIGN.md

If you notice issues with an existing file:

1. Open the site's `DESIGN.md`
2. Compare against the live site
3. Fix incorrect hex values, missing tokens, or weak descriptions
4. Update the `preview.html` and `preview-dark.html` if your changes affect displayed tokens
5. Open a PR with before/after rationale

## Pull Request Notes

- Keep changes scoped to the target site
- Prefer concrete values over vague descriptions
- Keep previews aligned with the documented tokens
- If some values are inferred, make that clear in the DESIGN.md

## License

By contributing, you agree your contributions are provided under the repository license terms.
