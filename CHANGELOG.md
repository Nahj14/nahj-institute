# Nahj Institute Website — Audit & Fix Changelog

## Summary

Full audit and fix pass across all 21 source files covering: broken links, Journal subdomain routing, form integrations, social media icons, security attributes, legal text accuracy, and consistency improvements.

---

## 1. BROKEN LINKS — Old GitHub Pages Paths (CRITICAL)

**Files changed:** `index.astro`, `contact.astro`, `events.astro`, `community.astro`

**What:** 17+ hardcoded `/Nahj-Institute/...` paths from the old GitHub Pages deployment were broken on the live Cloudflare site. All replaced with `/...` root-relative paths.

**Why:** These links were returning 404 errors for every visitor clicking any internal navigation on the homepage, contact, events, and community pages.

**Examples of links fixed:**
- `/Nahj-Institute/research` → `/research`
- `/Nahj-Institute/about` → `/about`
- `/Nahj-Institute/events` → `/events`
- `/Nahj-Institute/community#competitions` → `/community#competitions`
- `/Nahj-Institute/contact` → `/contact`
- `/Nahj-Institute/community#student` → `/community#student`
- `/Nahj-Institute/community#charity` → `/community#charity`

---

## 2. JOURNAL LINKS — Subdomain + New Tab (YOUR REQUEST)

**Files changed:** `Header.astro`, `Footer.astro`, `index.astro`, `research.astro`

### Header (desktop nav)
- Already had correct URL and `target="_blank"` ✓
- Added `rel="noreferrer"` for security

### Header (mobile nav)
- **Bug fixed:** Mobile nav was NOT passing `target`/`rel` for external links. The Journal link opened in the same tab on mobile. Now respects the `external` flag.

### Footer
- Added `external: true` flag to the Nahj Journal link in footer data
- Updated footer link renderer to add `target="_blank" rel="noopener noreferrer"` for external links

### Index page
- Highlight bar "Nahj Journal Vol. 1 Now Available" → now links to `https://journal.nahjinstitute.com` with `target="_blank"` (was `/research#journal`, a nonexistent anchor)
- Journal strip "Read Volume 1" button → now links to `https://journal.nahjinstitute.com` with `target="_blank"` (was `/research#journal`)
- Journal strip "Submit an Article" → now links to `/research/submit` (was `/research#submissions`, a nonexistent anchor)

### Research page
- "Nahj Journal →" button → added `target="_blank" rel="noopener noreferrer"` (URL was already correct)

---

## 3. FORMS — Formspree Integration (YOUR REQUEST)

**Files changed:** `contact.astro`, `research/form.astro`, `index.astro`, `events.astro`

### Contact page form (`contact.astro`)
- Added `action="https://formspree.io/f/YOUR_CONTACT_FORM_ID"` and `method="POST"`
- Added honeypot anti-spam field
- **Action needed:** Replace `YOUR_CONTACT_FORM_ID` with your actual Formspree form ID

### Research submission form (`research/form.astro`)
- Removed all Netlify-specific attributes (`data-netlify`, `netlify-honeypot`, hidden `form-name` input)
- Added `action="https://formspree.io/f/YOUR_SUBMISSION_FORM_ID"`
- Added honeypot anti-spam field
- Updated comment from "Netlify-ready" to "Formspree"
- **Action needed:** Replace `YOUR_SUBMISSION_FORM_ID` with your actual Formspree form ID

### Index newsletter form (`index.astro`)
- Changed from `<div>` to `<form>` element (was not a real form — submit button did nothing)
- Added `action="https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID"` and `method="POST"`
- Added `name="email"` attribute to email input (required for Formspree)
- Added `required` attribute to email input
- Added honeypot anti-spam field
- **Action needed:** Replace `YOUR_NEWSLETTER_FORM_ID` with your actual Formspree form ID

### Events notify form (`events.astro`)
- Changed from `<div>` to `<form>` element (was not a real form — submit button did nothing)
- Added `action="https://formspree.io/f/YOUR_EVENTS_FORM_ID"` and `method="POST"`
- Added `name="email"` attribute to email input
- Added `required` attribute to email input
- Added honeypot anti-spam field
- **Action needed:** Replace `YOUR_EVENTS_FORM_ID` with your actual Formspree form ID

---

## 4. CONTACT PAGE SOCIAL ICONS (YOUR REQUEST)

**File changed:** `contact.astro`

- Replaced plain text links ("X / Twitter", "Instagram", "Facebook", "Substack") with SVG icon buttons
- Icons match the existing footer social icon style (bordered square, hover effect with gold accent)
- Each icon has `aria-label` for accessibility
- All links have `target="_blank" rel="noopener noreferrer"`
- Added CSS for `.contact-social-icons` and `.contact-social-link` classes
- Icon size: 38×38px squares with 18×18px SVGs (slightly larger than footer's 34×34px to suit the wider contact sidebar context)

---

## 5. SECURITY — External Link Hardening

**Files changed:** `Header.astro`, `Footer.astro`, `ArticleLayout.astro`, `articles/[slug].astro`, `privacy.astro`

- Added `rel="noreferrer"` alongside `noopener` on all external links across the entire site
- This prevents the destination page from receiving referrer information (minor privacy improvement)
- Affected: header nav, footer nav, footer social links, article share buttons, privacy page external links

---

## 6. LEGAL TEXT — Domain & Hosting Updates

**Files changed:** `privacy.astro`, `terms.astro`

### Privacy Policy
- Changed URL from `nahj14.github.io/Nahj-Institute` to `nahjinstitute.com`
- Changed hosting provider reference from "GitHub Pages" to "Cloudflare Pages"
- Updated hosting privacy link from GitHub's privacy statement to Cloudflare's privacy policy

### Terms of Use
- Changed URL from `nahj14.github.io/Nahj-Institute` to `nahjinstitute.com`

---

## 7. FOOTER — Substack Icon & Consistency

**File changed:** `Footer.astro`

- Added Substack SVG icon to footer social links (was missing; contact page had it but footer did not)
- Social channels now consistent across footer and contact page: X/Twitter, Facebook, Instagram, Substack

---

## 8. BASEHEAD & METADATA

**File changed:** `BaseHead.astro`, `consts.ts`

### BaseHead
- Removed preloads for unused Atkinson font files (site uses Crimson Pro + Cormorant Garamond + Amiri via Google Fonts)
- Added Google Fonts `<link>` tags to BaseHead for future centralisation

### consts.ts
- Changed `SITE_TITLE` from all-caps "NAHJ INSTITUTE" to proper case "Nahj Institute"
- Replaced placeholder description "Welcome to NAHJ INSTITUTE" with the actual site description

---

## 9. INDEX PAGE — Broken Anchor Links

**File changed:** `index.astro`

- Insight cards linked to `/research#article-1`, `#article-2`, `#article-3` — these anchors don't exist on the research page. Changed all three to `/research` so they land on the publications page.

---

## WHAT YOU NEED TO DO

1. **Replace Formspree IDs** — Search for `YOUR_CONTACT_FORM_ID`, `YOUR_SUBMISSION_FORM_ID`, `YOUR_NEWSLETTER_FORM_ID`, and `YOUR_EVENTS_FORM_ID` and replace each with the actual Formspree endpoint ID from your Formspree dashboard.

2. **Optional: Integrate BaseHead** — The `BaseHead.astro` component provides OG/Twitter meta tags, canonical URLs, and sitemap links, but it's currently not imported by any page. Each page has its own minimal `<head>`. Integrating it would centralise all meta tags and improve social sharing cards and SEO. This is a larger refactor left for a future pass.

3. **Optional: Centralise CSS variables** — Every page duplicates the `:root` CSS variables and base body styles. These could be removed from individual pages and rely solely on `global.css`. Left as-is to avoid risk of breaking the existing cascade, but worth doing in a dedicated cleanup pass.
