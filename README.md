# Brew & Bean Artisan Coffee — Website (WEDE POE Part 3)

A responsive, multi-page website for **Brew & Bean Artisan Coffee**, a Cape Town coffee shop founded in 2018 by siblings Mia and James Peterson. Built with HTML5, CSS3 and vanilla JavaScript.

- **Live site:** _add your Netlify / GitHub Pages link here_
- **Repository:** _add your GitHub repository link here_

## Project structure

| File / folder | Purpose |
|---|---|
| `index.html`, `menu.html`, `about.html`, `events.html` | Main content pages |
| `enquiry.html` | Enquiry form: instant price and availability response |
| `contact.html` | General message form (compiled into an email), map, hours, newsletter |
| `404.html`, `thank-you.html` | Error page and form confirmation page |
| `style.css` | Single stylesheet (Part 2 styles + Part 3 components) |
| `script.js` | All JavaScript (menu/events data, interactive elements, forms) |
| `robots.txt`, `sitemap.xml` | Crawler instructions and site map |
| `_headers` | Security and caching headers (Netlify) |
| `images/` | Optimised AVIF photos with descriptive file names, plus `og-cover.jpg` for social sharing |
| `documents/`, `screenshots/` | Proposals and Part 2 responsive screenshots |

## Part 3 features

### JavaScript enhancements
- **Accordion** (FAQ on the home page), **tabs** (About page, arrow-key navigation) and **modal** (event details, focus trap, Esc to close). Written in vanilla JavaScript; no jQuery needed.
- **Interactive map** on the Contact page using **Leaflet** with OpenStreetMap tiles, lazy-loaded when scrolled into view. A "How far am I?" button uses the Geolocation API and the Haversine formula to calculate the distance to the café.
- **Animations and transitions:** CSS scroll-reveal (triggered by `IntersectionObserver`), fade-up transitions, hover lifts, accordion slide, button spinner. All are disabled for visitors who prefer reduced motion.
- **Advanced DOM manipulation:** content is built with a small `el()` helper using `createElement`, `replaceChildren`, `dataset`, event delegation and `textContent` (never `innerHTML`, which prevents injected HTML).
- **Gallery with lightbox** (Home, About and Events pages): click any photo, including the home hero image and the large About image, to enlarge it. Previous/next buttons, arrow keys and Esc work on desktop; on phones and tablets swipe left/right to browse and swipe down to close. Neighbouring photos are preloaded, the page does not scroll behind the viewer, and focus returns to the photo you opened.
- **Dynamic content:** the menu (12 items) and events (7) are loaded from JavaScript data and rendered on the page. The home page shows featured items and the next upcoming event automatically.
- **Search, filter and sort:** the menu has live search, category buttons, vegetarian/vegan filters, sorting by price or name, a result counter and favourites saved in `localStorage`. The events page has search, type filter and Upcoming/Past/All toggle. Whether an event is "past" is calculated from today's date.
- **Opening hours:** an "Open now / Closed now" indicator calculated in Cape Town time.

### Forms (HTML + JavaScript validation + AJAX)
- **`enquiry.html`** — the visitor chooses catering, private event, workshop seats or take-home beans. Fields change to match the choice. After validation, the input is processed and a response is shown: price, delivery, deposit and availability (for example minimum notice, capacity limits, seats left, stock).
- **`contact.html`** — name, email, optional phone, type of message, subject and message. After validation the input is **compiled into an email** (preview + "Send email" button that opens the visitor's mail app addressed to `hello@brewandbeancoffee.com`, plus a copy button).
- **Newsletter** sign-up with validation.
- **Validation:** HTML5 attributes (`required`, `type`, `minlength`, `maxlength`, `min`, `max`) plus JavaScript rules (South African phone numbers, names, email format, dates today or later and within 12 months, character counters). Errors show beside each field with `aria-invalid`/`aria-describedby`, the first invalid field receives focus, and checks run on blur and on submit.
- **AJAX submission:** `fetch()` posts the form in the background (no page reload) to the form's `action`. On Netlify, `data-netlify="true"` stores submissions in the Netlify Forms dashboard. Without a backend the visitor is told to email us. A hidden honeypot field blocks simple spam bots.

### SEO
- **On-page:** unique, keyword-focused `<title>` (under 60 characters) and meta description on every page; one `<h1>` per page with logical `h2`/`h3` structure; descriptive image file names and alt text; clean lowercase URLs; internal links in content, footer and breadcrumbs; canonical URLs; Open Graph/Twitter tags; `CafeOrCoffeeShop` JSON-LD structured data with address, hours and coordinates; mobile-friendly viewport and layout.
- **Keywords targeted:** artisan coffee Cape Town, ethically sourced single-origin coffee, coffee workshops Cape Town, coffee catering, vegan coffee shop menu.
- **Off-page / local SEO plan** (done outside the code): claim and complete a Google Business Profile; list the café on local directories and review sites; ask local food bloggers, suppliers and event listings to link to the site; share events and menu updates on Instagram and Facebook (links are in the footer); encourage customer reviews. The NAP (name, address, phone) is identical on every page and in the structured data.
- **`robots.txt`** allows crawling, blocks `thank-you.html`, `documents/` and `screenshots/`, and points to the sitemap. **`sitemap.xml`** lists the six main pages.

### Page speed and security
- **Speed:** modern AVIF images with width/height set (no layout shift) and `loading="lazy"`; hero image prioritised; one CSS file and one deferred JavaScript file; Leaflet only loads when the map is visible; font `preconnect` and `display=swap`; long cache lifetimes for images in `_headers`.
- **Security:** Content-Security-Policy (meta tag and header), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS in `_headers`; `rel="noopener noreferrer"` on external links; input length limits and sanitising; `textContent` instead of `innerHTML`; honeypot spam field; no secrets in the code.

## Before you publish — replace the placeholders
1. Replace `https://YOUR-SITE.netlify.app` in all `.html` files, `robots.txt` and `sitemap.xml` with your live URL.
2. The address (12 Roast Lane, Cape Town), phone number and map coordinates are sample details; update them in the pages, `script.js` (`SHOP`) and the JSON-LD block if they change.
3. Replace the Instagram and Facebook links in the footer with the café's real profiles.

## Deployment
1. Push the project to GitHub (see commands below).
2. **Netlify:** Add new site → Import from Git → pick the repository → build command empty, publish directory `/`. (Alternative: GitHub Pages → Settings → Pages → deploy from `main`.)
3. Paste the live link at the top of this README and submit the repository link on the LMS.

```bash
git add .
git commit -m "Part 3: JavaScript features, SEO files, forms and README update"
git push origin main
```

## Changelog

### Part 3 — 26 October 2026

**Edits from Part 2 (code review fixes — add your lecturer's actual feedback points below if they differ)**
- **Fixed missing stylesheet:** the pages linked to `style.css`, but the CSS only existed inside a file called `CSS style.html`. Extracted it into a real `style.css` so every page is styled.
- **Fixed missing script:** pages referenced `script.js`, which did not exist. Created it (see Part 3 additions).
- **Fixed broken navigation link:** all menus pointed to `contact.html` but the file was named `contacts.html`. Renamed to `contact.html` and added the new `enquiry.html` page to every menu.
- **Removed duplicate files:** deleted the duplicated `css/` folder of HTML copies and the two competing `menu.html` / `menu (2).html` versions, merged into one `menu.html` with photos.
- **Completed the home page:** the footer was an empty comment; added the full footer with links, hours, address and contact details.
- **Replaced placeholder content:** the placeholder phone number (`+27 00 000 0000`), "Your local neighbourhood café" address and "Google Maps embed area" box were replaced with real details and an interactive map.
- **Updated the events calendar:** the September/October dates had passed; events now have full dates (including year) so upcoming and past events are handled automatically.
- **Improved accessibility:** darker accent colour for text contrast (WCAG AA), skip link, visible focus outlines, `aria-current` on the active page, labelled forms and buttons, `prefers-reduced-motion` support.
- **Improved semantics and structure:** valid HTML5 document structure on each page, a single `<h1>` per page, `<nav>` landmarks with labels, breadcrumbs, and lists for menu items.
- **Renamed images:** photo files renamed from camera-style IDs to descriptive names (e.g. `latte-art-on-coffee-beans.avif`) and given width, height and alt text.

**New in Part 3**
- Added `script.js`: accordion, tabs, modal, lightbox gallery, scroll animations, mobile navigation toggle, dynamic menu and events with search/filter/sort, favourites, next-event widget, opening-hours indicator.
- Extended the lightbox to the Home and Events pages and to single images (home hero, About image); added touch swipe gestures, slide animation and image preloading.
- Added Leaflet interactive map and distance-to-café feature on the Contact page.
- Added `enquiry.html` with conditional fields, validation and a calculated price/availability response; rebuilt `contact.html` with validation, compiled email and AJAX submission; added newsletter validation.
- Added SEO: unique titles/descriptions, Open Graph tags, canonical URLs, JSON-LD, `robots.txt`, `sitemap.xml`, breadcrumbs, internal linking, `404.html`.
- Added performance and security: lazy loading, deferred script, caching and security headers (`_headers`), Content-Security-Policy, honeypot spam field, input sanitising.
- Added `thank-you.html` as the form `action` target.
- Updated this README with Part 3 information, the changelog and references.

### Part 2
- Built the responsive layout, colour scheme and styles for Home, Menu, About Us, Events and Contact pages (see `screenshots/`).

### Part 1
- Created the Brew & Bean proposal, page structure and content (see `documents/`).

## References
Fonts: Google Fonts (2026) *Inter*. Available at: https://fonts.google.com/specimen/Inter (Accessed: 26 October 2026).

Google (2026) *SEO starter guide*. Google Search Central. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide (Accessed: 26 October 2026).

Google (2026) *Build and submit a sitemap*. Google Search Central. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (Accessed: 26 October 2026).

Google (2026) *Introduction to robots.txt*. Google Search Central. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 26 October 2026).

Leaflet (2026) *Leaflet quick start guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 26 October 2026).

MDN Web Docs (2026) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation (Accessed: 26 October 2026).

MDN Web Docs (2026) *Using the Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch (Accessed: 26 October 2026).

MDN Web Docs (2026) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 26 October 2026).

MDN Web Docs (2026) *Content Security Policy (CSP)*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP (Accessed: 26 October 2026).

Netlify (2026) *Forms setup*. Available at: https://docs.netlify.com/manage/forms/setup/ (Accessed: 26 October 2026).

OpenStreetMap (2026) *Copyright and license*. Available at: https://www.openstreetmap.org/copyright (Accessed: 26 October 2026).

Schema.org (2026) *CafeOrCoffeeShop*. Available at: https://schema.org/CafeOrCoffeeShop (Accessed: 26 October 2026).

Unsplash (2025) *Can I use Unsplash images for personal or commercial projects?* Available at: https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects (Accessed: 26 October 2026).

W3C (2026) *WAI-ARIA Authoring Practices Guide: Tabs, Accordion and Dialog (Modal) patterns*. Available at: https://www.w3.org/WAI/ARIA/apg/patterns/ (Accessed: 26 October 2026).

Proposal references (MDN Web Docs, GitHub, Google Developers) from Part 1 remain valid; see `documents/website-proposals.docx`.
