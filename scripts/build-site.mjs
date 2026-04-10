import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "design-md");
const siteDir = path.join(rootDir, "site");
const outputDir = path.join(rootDir, "dist");
const repoUrl = "https://github.com/iFurySt/DESIGN.md";
const siteTitle = "DESIGN.md";
const siteTagline = "Design system inspirations from popular websites. Drop one in and let coding agents build matching UI.";

const featuredSlugs = ["spacex", "ibm", "lamborghini"];

const categoryRules = [
  { label: "AI & LLM Platforms", match: ["claude", "cohere", "cursor", "elevenlabs", "lovable", "meta", "minimax", "mistral", "ollama", "opencode", "runway", "together", "voltagent", "x.ai"] },
  { label: "Developer Tools & IDEs", match: ["cal", "expo", "mintlify", "raycast", "resend", "warp", "webflow"] },
  { label: "Backend, Database & DevOps", match: ["clickhouse", "hashicorp", "mongodb", "posthog", "replicate", "sentry", "supabase", "sanity"] },
  { label: "Productivity & SaaS", match: ["airtable", "intercom", "linear", "miro", "notion", "superhuman", "zapier"] },
  { label: "Design & Creative Tools", match: ["clay", "figma", "framer", "pinterest"] },
  { label: "Fintech & Crypto", match: ["binance", "coinbase", "kraken", "revolut", "stripe", "wise"] },
  { label: "E-commerce & Retail", match: ["airbnb", "meta", "nike", "shopify"] },
  { label: "Media & Consumer Tech", match: ["apple", "notion", "spotify", "tesla", "uber", "vercel", "x.ai"] },
  { label: "Automotive", match: ["bmw", "ferrari", "lamborghini", "renault"] }
];

marked.setOptions({
  gfm: true,
  breaks: false
});

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });
await copyRecursive(path.join(siteDir, "assets"), path.join(outputDir, "assets"));
await copyRecursive(sourceDir, path.join(outputDir, "design-md"));
await fs.writeFile(path.join(outputDir, ".nojekyll"), "");

const entries = await loadEntries();
const categories = [...new Set(entries.map((entry) => entry.category))];
const manifest = {
  title: siteTitle,
  tagline: siteTagline,
  generatedAt: new Date().toISOString(),
  counts: {
    websites: entries.length,
    categories: categories.length
  },
  entries
};

await fs.mkdir(path.join(outputDir, "data"), { recursive: true });
await fs.writeFile(path.join(outputDir, "data", "manifest.json"), JSON.stringify(manifest, null, 2));
await fs.writeFile(path.join(outputDir, "index.html"), renderHomePage(manifest));

for (const entry of entries) {
  const detailDir = path.join(outputDir, entry.slug, "design-md");
  await fs.mkdir(detailDir, { recursive: true });
  await fs.writeFile(path.join(detailDir, "index.html"), renderDetailPage(entry));
}

async function loadEntries() {
  const dirents = await fs.readdir(sourceDir, { withFileTypes: true });
  const entries = [];

  for (const dirent of dirents) {
    if (!dirent.isDirectory()) continue;

    const slug = dirent.name;
    const dir = path.join(sourceDir, slug);
    const designPath = path.join(dir, "DESIGN.md");
    const lightPreviewPath = path.join(dir, "preview.html");
    const darkPreviewPath = path.join(dir, "preview-dark.html");

    if (!(await exists(designPath)) || !(await exists(lightPreviewPath)) || !(await exists(darkPreviewPath))) {
      continue;
    }

    const markdown = await fs.readFile(designPath, "utf8");
    const previewHtml = await fs.readFile(lightPreviewPath, "utf8");
    const name = extractName(markdown, previewHtml, slug);
    const intro = extractIntro(markdown);
    const shortDescription = summariseIntro(intro, name);
    const mdHtml = marked.parse(markdown);
    const category = inferCategory(slug, name, shortDescription);

    entries.push({
      slug,
      name,
      category,
      intro,
      shortDescription,
      mdHtml,
      command: `npx getdesign@latest add ${slug}`,
      detailPath: `${slug}/design-md/`,
      previewLightPath: `../../design-md/${slug}/preview.html`,
      previewDarkPath: `../../design-md/${slug}/preview-dark.html`,
      designSourcePath: `../../design-md/${slug}/DESIGN.md`,
      githubPath: `${repoUrl}/tree/main/design-md/${slug}`,
      featured: featuredSlugs.includes(slug)
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

function extractName(markdown, previewHtml, slug) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const heading = titleMatch[1].trim();
    const headingName = heading
      .replace(/^Design System (?:(?:Inspiration (?:of|for))|(?:Inspired by))\s+/i, "")
      .replace(/\s+Design System$/i, "")
      .trim();
    if (headingName) return headingName;
  }

  const previewTitleMatch = previewHtml.match(/<title>Design System Inspired by\s+(.+?)<\/title>/i);
  if (previewTitleMatch) return previewTitleMatch[1].trim();

  return slug
    .replace(/\.(ai|app)$/i, "")
    .replace(/[.-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractIntro(markdown) {
  const lines = markdown.split("\n");
  const startIndex = lines.findIndex((line) => /^##\s+1\./.test(line));
  if (startIndex === -1) return "";

  const paragraphLines = [];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      if (paragraphLines.length > 0) break;
      continue;
    }
    if (/^##\s+/.test(line)) break;
    if (/^\*\*Key Characteristics:\*\*/.test(line)) break;
    if (/^###\s+/.test(line)) continue;
    paragraphLines.push(line);
  }

  return paragraphLines.join(" ").trim();
}

function summariseIntro(intro, name) {
  if (!intro) return `${name} inspired design system.`;
  const clean = intro.replace(/`/g, "").replace(/\s+/g, " ").trim();
  const sentenceMatch = clean.match(/^(.+?[.!?])(\s|$)/);
  const firstSentence = sentenceMatch ? sentenceMatch[1] : clean;
  return firstSentence.length > 140 ? `${firstSentence.slice(0, 137).trim()}...` : firstSentence;
}

function inferCategory(slug, name, description) {
  const haystack = `${slug} ${name} ${description}`.toLowerCase();
  for (const rule of categoryRules) {
    if (rule.match.some((token) => haystack.includes(token))) return rule.label;
  }
  return "Productivity & SaaS";
}

function renderHomePage(manifest) {
  const featured = manifest.entries.filter((entry) => entry.featured);
  const categoryButtons = [
    { label: "All", count: manifest.entries.length },
    ...[...new Set(manifest.entries.map((entry) => entry.category))].map((label) => ({
      label,
      count: manifest.entries.filter((entry) => entry.category === label).length
    }))
  ];

  const brandsStrip = manifest.entries.slice(0, 16).map((entry) => `<span>${escapeHtml(entry.name)}</span>`).join("");
  const rows = manifest.entries.map((entry) => renderRow(entry, "")).join("");

  return renderPage({
    title: "DESIGN.md Collection for AI Agents",
    description: siteTagline,
    assetPrefix: "",
    bodyClass: "page-home",
    content: `
      ${renderHeader("")}
      <main class="page-shell">
        <section class="hero-grid">
          <div class="hero-panel hero-copy">
            <h1 class="display-title">DESIGN.md</h1>
            <p class="hero-lede">${escapeHtml(siteTagline)}</p>
            <div class="hero-actions">
              <a class="button button-secondary" href="#find-designs">Browse DESIGN.md Files</a>
            </div>
          </div>
          <aside class="hero-panel hero-stats">
            <div class="eyebrow"><span>▸</span><h3>Quick Stats</h3></div>
            <div class="stat-list">
              <div class="stat-row"><span>Websites</span><strong>${manifest.counts.websites}</strong></div>
              <div class="stat-row"><span>Categories</span><strong>${manifest.counts.categories}</strong></div>
            </div>
            <div class="eyebrow feature-eyebrow"><span>▸</span><h3>Featured Designs</h3></div>
            <div class="featured-grid">
              ${featured.map((entry) => `<a class="featured-link" href="${entry.detailPath}">${escapeHtml(entry.name)}</a>`).join("")}
              <div class="featured-cta">Feature your brand?</div>
            </div>
          </aside>
          <aside class="hero-panel hero-marquee">
            <div class="mini-window">
              <div class="mini-window-bar">iFurySt - DESIGN.md</div>
              <div class="brand-strip">
                <div class="brand-strip-track">${brandsStrip}${brandsStrip}</div>
              </div>
            </div>
          </aside>
        </section>

        <section class="list-section" id="find-designs">
          <div class="section-heading">
            <div>
              <p class="section-kicker">Find Designs</p>
              <h2>Design Systems</h2>
            </div>
            <div class="section-tools">
              <input class="search-input" type="search" placeholder="Search designs" data-search-input />
            </div>
          </div>
          <div class="filters" data-filter-group>
            ${categoryButtons.map((category, index) => `
              <button
                class="filter-chip${index === 0 ? " is-active" : ""}"
                type="button"
                data-filter-value="${escapeAttribute(category.label)}"
              >${escapeHtml(category.label)} <span>${category.count}</span></button>
            `).join("")}
          </div>
          <div class="table-shell">
            <div class="table-head">
              <span>Design Systems</span>
              <span>Installs</span>
              <span>Bookmarked</span>
            </div>
            <div class="design-list" data-design-list>
              ${rows}
            </div>
            <p class="empty-state" data-empty-state hidden>No matching designs found.</p>
          </div>
        </section>
      </main>
      ${renderFooter("")}
    `
  });
}

function renderDetailPage(entry) {
  return renderPage({
    title: `Design System Inspired by ${entry.name}`,
    description: entry.shortDescription,
    assetPrefix: "../../",
    bodyClass: "page-detail",
    content: `
      ${renderHeader("../../")}
      <main class="page-shell detail-shell">
        <section class="detail-hero">
          <a class="back-link" href="../../">Back to designs</a>
          <h1>${escapeHtml(entry.name)}</h1>
          <p class="detail-subtitle">${escapeHtml(entry.shortDescription)}</p>
        </section>

        <section class="usage-card">
          <div class="usage-command">
            <div class="terminal-line">
              <span>${escapeHtml(entry.command)}</span>
              <button type="button" class="icon-button" data-copy-text="${escapeAttribute(entry.command)}">Copy</button>
            </div>
            <p>Run this command from your project root, then ask your AI assistant to use <code>DESIGN.md</code> for UI work.</p>
          </div>
          <div class="usage-stats">
            <a class="button button-primary fill" href="${entry.githubPath}">Open Source</a>
            <div class="metric-card"><span>Installs</span><strong>—</strong></div>
            <div class="metric-card"><span>Bookmarked</span><strong>—</strong></div>
          </div>
          <p class="usage-note">Not an official ${escapeHtml(entry.name)} design system. A curated starting point for building ${escapeHtml(entry.name.toLowerCase())}-like UIs with your AI coding agent.</p>
        </section>

        <section class="intro-copy">
          <p>${escapeHtml(entry.intro || entry.shortDescription)}</p>
        </section>

        <section class="preview-section" data-preview-root>
          <div class="preview-toolbar">
            <div class="toggle-group">
              <button class="toggle-button is-active" type="button" data-view="preview">Live Preview</button>
              <button class="toggle-button" type="button" data-view="design">DESIGN.md</button>
            </div>
            <div class="toggle-group">
              <button class="toggle-button is-active" type="button" data-theme="light">Light</button>
              <button class="toggle-button" type="button" data-theme="dark">Dark</button>
            </div>
          </div>

          <div class="preview-frame-shell" data-preview-panel>
            <iframe
              src="${entry.previewLightPath}"
              title="${escapeAttribute(entry.name)} design preview"
              loading="lazy"
              sandbox="allow-same-origin"
              data-light-src="${entry.previewLightPath}"
              data-dark-src="${entry.previewDarkPath}"
            ></iframe>
          </div>

          <article class="markdown-shell" data-design-panel hidden>
            <div class="markdown-toolbar">
              <a class="button button-secondary" href="${entry.designSourcePath}">Open Raw DESIGN.md</a>
            </div>
            <div class="markdown-body">${entry.mdHtml}</div>
          </article>
        </section>
      </main>
      ${renderFooter("../../")}
    `
  });
}

function renderRow(entry, prefix) {
  return `
    <a
      class="design-row"
      href="${prefix}${entry.detailPath}"
      data-name="${escapeAttribute(entry.name.toLowerCase())}"
      data-category="${escapeAttribute(entry.category)}"
      data-description="${escapeAttribute(entry.shortDescription.toLowerCase())}"
    >
      <span class="row-badge">${escapeHtml(initials(entry.name))}</span>
      <span class="row-name">${escapeHtml(entry.name)}</span>
      <span class="row-description">${escapeHtml(entry.shortDescription)}</span>
      <span class="row-stat">—</span>
      <span class="row-stat">—</span>
    </a>
  `;
}

function renderPage({ title, description, assetPrefix, bodyClass, content }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttribute(description)}">
  <link rel="icon" href="${assetPrefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${assetPrefix}assets/site.css">
</head>
<body class="${bodyClass}">
  ${content}
  <script type="module" src="${assetPrefix}assets/site.js"></script>
</body>
</html>`;
}

function renderHeader(prefix) {
  return `
    <header class="site-header">
      <div class="site-header-inner">
        <div class="header-left">
          <a class="brand-mark" href="${prefix}">get<span>design</span>.md</a>
          <a class="button button-accent small-hide" href="${repoUrl}/pulls">Submit PR</a>
        </div>
        <nav class="header-nav">
          <a href="${prefix}#find-designs">Browse</a>
          <a href="${repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter(prefix) {
  return `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <a class="footer-owner" href="${repoUrl}" target="_blank" rel="noreferrer">Maintained by iFurySt</a>
        <div class="footer-brand">
          <span class="brand-mark small">get<span>design</span>.md</span>
          <span>${escapeHtml(siteTagline)}</span>
        </div>
        <div class="footer-links">
          <a href="${prefix}">Home</a>
          <a href="${repoUrl}/pulls" target="_blank" rel="noreferrer">Pull Requests</a>
        </div>
      </div>
    </footer>
  `;
}

function initials(name) {
  return name
    .split(/[\s().-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyRecursive(from, to) {
  await fs.mkdir(to, { recursive: true });
  const dirents = await fs.readdir(from, { withFileTypes: true });
  for (const dirent of dirents) {
    const sourcePath = path.join(from, dirent.name);
    const targetPath = path.join(to, dirent.name);
    if (dirent.isDirectory()) {
      await copyRecursive(sourcePath, targetPath);
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}
