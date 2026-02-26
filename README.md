# Vasriya — AI Tools, Reviews & Guides for India

A static website built to provide honest AI tool reviews, comparisons, and guides for Indian users. Designed for performance, SEO, and monetization via AdSense + affiliate marketing.

**Live site:** [vasriya.com](https://vasriya.com)

---

## Tech Stack

- **Static HTML/CSS/JS** — no build tools, no frameworks, no backend
- **Hosting:** GitHub → Cloudflare Pages (free)
- **Domain:** vasriya.com (vasriya.in redirects to .com)
- **Performance target:** Lighthouse 95+, CSS under 30KB
- **Fonts:** System fonts only (zero external font requests)

---

## Repository Structure

```
/
│ index.html              ← Homepage
│ privacy.html            ← Privacy Policy
│ disclaimer.html         ← Disclaimer
│ robots.txt              ← Search engine crawl rules
│ sitemap.xml             ← Sitemap for search engines
│ plan.md                 ← Master plan & instructions
│ README.md               ← This file
│
├── assets/
│     styles.css           ← Shared stylesheet (all pages)
│     script.js            ← Minimal vanilla JS (nav toggle)
│
└── articles/
      best-ai-writing-tools-india.html
      chatgpt-vs-gemini-india.html
      free-ai-image-generators.html
      earn-money-ai-tools-india.html
```

---

## Deployment Guide

### 1. Deploy to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vasriya.git
git branch -M main
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project** → **Connect to Git**
3. Select your GitHub repository (`vasriya`)
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

### 3. Add Custom Domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `vasriya.com`
3. If using Cloudflare DNS, it auto-configures. Otherwise, add the CNAME record shown
4. For `vasriya.in` redirect:
   - Add a **Page Rule** on vasriya.in: `vasriya.in/*` → **Forwarding URL (301)** → `https://vasriya.com/$1`

### 4. Insert Google AdSense Code

Find all `<div class="ad-unit">` placeholders across pages and replace the placeholder text with your actual AdSense code:

```html
<div class="ad-unit">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

Also add the AdSense script tag to the `<head>` of each page:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

Ad placement locations (3 per article page):
- Below hero / introduction
- Mid-article
- End of article

### 5. Replace Affiliate URLs

All affiliate links use the class `affiliate-btn`. Search for this class to find and update URLs:

```bash
grep -rn "affiliate-btn" articles/
```

Replace the `href` values with your actual affiliate tracking links:
- **Hostinger:** Your Hostinger affiliate link
- **Canva:** Your Canva affiliate link
- **Amazon India:** Your Amazon Associates links
- **SEMrush:** Your SEMrush affiliate link

### 6. Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → **URL prefix** → `https://vasriya.com`
3. Verify ownership via Cloudflare DNS (TXT record) or HTML file
4. Submit sitemap: `https://vasriya.com/sitemap.xml`
5. Request indexing for your homepage and key articles

---

## Adding New Articles

1. Create a new HTML file in `/articles/` using an existing article as a template
2. Required elements for every article:
   - One `<h1>` only
   - Logical H2/H3 hierarchy
   - Meta title (≤ 60 chars), meta description (≤ 155 chars)
   - Open Graph tags
   - Canonical tag
   - Article JSON-LD schema
   - FAQ section with FAQ JSON-LD schema
   - At least 2 internal links to other articles
   - 3 ad unit placeholders (intro, mid, end)
   - 1,200+ word minimum
3. Update `sitemap.xml` with the new URL
4. Add a card for the new article on `index.html`
5. Update internal links on existing articles to cross-link

---

## 90-Day Growth Roadmap

### Month 1 (Days 1–30): Foundation
- [x] Launch 4 cornerstone articles
- [x] Set up Cloudflare Pages
- [x] Submit to Google Search Console
- [ ] Apply for Google AdSense
- [ ] Set up affiliate accounts (Hostinger, Canva, Amazon, SEMrush)
- [ ] Publish 2 new articles (target: 6 total)

### Month 2 (Days 31–60): Content Velocity
- [ ] Publish 4 new articles (target: 10 total)
- [ ] Focus on long-tail keywords with low competition
- [ ] Build internal linking matrix between all articles
- [ ] Start getting indexed pages (check Search Console)
- [ ] First AdSense earnings (even if small)

### Month 3 (Days 61–90): Optimization
- [ ] Publish 4 more articles (target: 14 total)
- [ ] Optimize top-performing articles based on Search Console data
- [ ] Add comparison tables and structured data to high-CTR pages
- [ ] Target first affiliate conversion
- [ ] Reach 800–1,500 pageviews/month

---

## Weekend Publishing Workflow

1. **Saturday morning:** Research keyword + outline article (1 hour)
2. **Saturday afternoon:** Write and format article (2–3 hours)
3. **Sunday morning:** Add internal links, schema, review SEO (1 hour)
4. **Sunday afternoon:** Update sitemap, deploy, submit to Search Console (30 min)

Target: **1 article per weekend** = 4 articles/month

---

## Keyword Expansion Strategy

Start with low-competition, India-specific long-tail keywords:

| Priority | Keyword Pattern | Example |
|----------|----------------|---------|
| High | "best [tool type] for India 2026" | "best AI writing tools for India 2026" |
| High | "[tool A] vs [tool B] India" | "ChatGPT vs Gemini India" |
| Medium | "how to [task] with AI India" | "how to earn money with AI India" |
| Medium | "free [tool type] no sign up" | "free AI image generator no sign up" |
| Low | "[tool name] review India" | "Notion AI review India" |
| Low | "[tool name] pricing in INR" | "ChatGPT pricing in INR" |

Research tools: Google Trends (free), Google Search autocomplete, "People Also Ask" boxes.

---

## Internal Linking Expansion Plan

Maintain a linking matrix — every article should link to at least 2 other articles:

| Article | Links To |
|---------|----------|
| AI Writing Tools | ChatGPT vs Gemini, Earn with AI |
| ChatGPT vs Gemini | AI Writing Tools, Image Generators |
| Image Generators | Earn with AI, AI Writing Tools |
| Earn with AI | AI Writing Tools, Image Generators |

As you add articles, update the matrix so every page links to 3–5 others.

---

## Scaling to 50+ Articles

The current architecture supports this cleanly:
- All pages use shared `/assets/styles.css` — no per-page CSS duplication
- Article template is consistent and copy-paste ready
- `sitemap.xml` is manually maintained (simple, no build step)
- No framework lock-in — just add HTML files

**Recommended article categories to expand into:**
1. AI tools for students
2. AI tools for business (India)
3. AI video editing tools
4. AI coding tools
5. Tool-specific deep reviews
6. "How to use [tool] for [task]" tutorials
7. AI tools pricing comparisons (INR)

---

## Strategy to Reach ₹10,000/month

| Revenue Source | Target | Monthly Est. |
|---------------|--------|-------------|
| Google AdSense | 5,000–10,000 pageviews/month | ₹1,500–₹3,000 |
| Affiliate (Hostinger) | 2 conversions/month | ₹3,000–₹10,000 |
| Affiliate (Canva) | 1 conversion/month | ₹2,500–₹3,000 |
| Affiliate (Amazon) | 3–5 conversions/month | ₹500–₹1,500 |
| **Total** | | **₹7,500–₹17,500** |

**Key levers:**
1. Publish consistently (4 articles/month)
2. Target high-intent keywords ("best hosting India", "Canva Pro vs free")
3. Optimize CTR on affiliate buttons (placement, copy)
4. Build email list for repeat traffic (future)
5. Create comparison articles (highest affiliate conversion rate)

---

## Risk Mitigation

### AdSense Rejection
- Ensure 15+ pages of quality content before applying
- Have privacy policy and disclaimer pages
- No misleading content or excessive ads
- Reapply after 2 weeks with improvements

### Low Initial Traffic
- Normal — organic traffic takes 3–6 months to build
- Focus on long-tail keywords (less competition)
- Share articles on relevant Reddit/Quora threads
- Engage in Indian tech communities

### Indexing Delay
- Submit sitemap to Search Console immediately
- Request indexing for each new page manually
- Ensure no `noindex` tags or robots.txt blocks
- Check for crawl errors weekly

### Affiliate Link Compliance
- Always include disclosure ("Some links are affiliate links...")
- FTC-compliant disclosures on every page with affiliate links
- Never disguise affiliate links as editorial recommendations without disclosure

### Algorithm Updates
- Diversify traffic sources (not just Google)
- Focus on genuine quality content (not keyword stuffing)
- Build topical authority in AI tools niche
- Update articles regularly with fresh information

---

## Long-Term Vision

This site is designed to evolve into:
- **50+ SEO-ranked articles** covering the Indian AI tools landscape
- **Stable organic traffic** of 10,000+ monthly pageviews
- **₹5,000–₹10,000/month baseline** from AdSense + affiliates
- Expandable into:
  - Digital products (AI prompt packs, templates)
  - Email newsletter
  - AI tools directory / comparison engine
  - Sponsored content

---

## License

Content © 2026 Vasriya. All rights reserved.
