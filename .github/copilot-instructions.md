# Copilot Instructions — Vasriya

## Project Overview

Vasriya is a **static HTML/CSS/JS website** (no frameworks, no build tools, no backend) focused on AI tool reviews and guides. Hosted via GitHub → Cloudflare Pages at [vasriya.com](https://vasriya.com). The entire site is hand-authored HTML — treat every file as a source-of-truth artifact, not a generated output.

## Architecture

- **Single shared stylesheet:** `assets/styles.css` — all pages use this. Never create per-page CSS files.
- **Single shared script:** `assets/script.js` — vanilla JS IIFE, no modules/bundlers. Features: nav toggle, dark/light theme (persisted in `localStorage` key `vasriya-theme`), client-side search (hardcoded index in JS), scroll-to-top, reading progress bar, cookie consent, copy-prompt buttons, lazy loading via `IntersectionObserver`.
- **Articles live in** `articles/` — each is a standalone HTML file; use any existing article as a template.
- **Top-level pages:** `index.html`, `tools.html`, `articles.html`, `guides.html`, `about.html`, `contact.html`, `privacy.html`, `disclaimer.html`.

## Adding a New Article — Checklist

1. Copy an existing `articles/*.html` file as the template.
2. Required `<head>` elements (see `articles/best-ai-writing-tools-india.html` as reference):
   - `<title>` ≤ 60 chars, ending with `— Vasriya`
   - `<meta name="description">` ≤ 155 chars
   - `<link rel="canonical">` with full URL
   - Open Graph + Twitter Card meta tags
   - **Three JSON-LD blocks:** `Article`, `BreadcrumbList`, `FAQPage`
   - AdSense script in `<head>`, fonts via Google Fonts (`Manrope`, `Inter`, `JetBrains Mono`)
3. Content rules: single `<h1>`, logical H2/H3 hierarchy, 1,200+ words, 2+ internal links, FAQ section at bottom.
4. Place 3 `<div class="ad-unit">` placeholders: after intro, mid-article, end of article.
5. Affiliate links use class `affiliate-btn`.
6. **After creating the article:**
   - Add URL entry to `sitemap.xml`
   - Add article card to `index.html` (Latest Articles grid) and `articles.html`
   - Update `searchIndex` array in `assets/script.js`
   - Cross-link from at least 2 existing articles

## CSS Conventions

- Design system defined in `:root` CSS variables (colors, fonts, spacing, shadows, radii) — always use variables, never hardcode values.
- Light theme is default; dark theme via `[data-theme="dark"]` selector.
- Modern color: OKLCH overrides inside `@supports (color: oklch(0 0 0))` blocks for both themes.
- Key layout: `--max-w: 1200px`, `--pad: clamp(1rem, 4vw, 3rem)`, 12-column grid on desktop.
- Card patterns: `.article-card`, `.ai-tool-card`, glass morphism via `--card-bg-glass` + `backdrop-filter`.
- Mobile bottom nav (`.bottom-nav`) shown instead of header nav on small screens.
- Performance target: Lighthouse 95+, CSS under 30KB. System font fallbacks are always included.

## HTML Patterns

- Every page starts with `<a href="#main" class="skip-link">Skip to content</a>`.
- Header structure: `.header-inner` > `.logo` + `.nav-toggle` + `<nav>` + `.theme-toggle`.
- Footer: `.footer-inner` with brand, nav columns (Explore, Company, Legal), social links, affiliate disclosure.
- Bottom nav + cookie consent banner + scroll-to-top button appear at end of `<body>`, before the script tag.
- Script loaded with `defer`: `<script src="/assets/script.js" defer></script>`.
- Favicon is an inline SVG data URI (⚡ emoji), not a file.

## SEO & Deployment

- All paths are absolute from root (`/assets/styles.css`, `/articles/...`).
- `sitemap.xml` is manually maintained — update it when adding/removing pages.
- `robots.txt` allows all crawling.
- Domain: `vasriya.com` (`.in` redirects to `.com` via Cloudflare Page Rule).
- No build step — push to `main` and Cloudflare Pages auto-deploys from repo root.

## Do Not

- Introduce build tools, bundlers, or package managers — this is intentionally zero-dependency.
- Add external font services beyond the existing Google Fonts link.
- Create page-specific CSS/JS files — everything goes through the shared assets.
- Use ES module syntax in `script.js` — it's a plain IIFE using `var` and ES5-compatible patterns.
- Remove or alter the AdSense client ID (`ca-pub-3412848514366354`).
