# Element Health Club

Bilingual (English / Spanish) marketing site for Element Health Club, a health and wellness club in Laureles, Medellín.

Static multi-page site: plain HTML, CSS and JS with no build step. Deployed on Vercel with clean URLs (`/experiences` serves `experiences.html`).

## Pages

| URL | File | Content |
| --- | --- | --- |
| `/` | `index.html` | Hero, stats, call to action |
| `/elements` | `elements.html` | The four elements (philosophy) |
| `/experiences` | `experiences.html` | Everything inside: all services |
| `/a-day-here` | `a-day-here.html` | A day at Element timeline |
| `/memberships` | `memberships.html` | Membership plans |
| `/location` | `location.html` | Address, hours, contact, map |
| `/schedule` | `schedule.html` | Class schedule and booking (uses `schedule.css` and `schedule.js`) |

Shared by every page: `styles.css` (design), `site.js` (language toggle, mobile menu, all EN/ES copy). For search engines: `sitemap.xml` and `robots.txt`.

## Blog

The blog is written in Spanish and organized as SEO "silos": one pillar page per topic with supporting posts underneath it, all inside the same URL folder.

| URL | File | Role |
| --- | --- | --- |
| `/blog` | `blog/index.html` | Blog hub, lists every silo |
| `/blog/sauna` | `blog/sauna/index.html` | Sauna silo: pillar page |
| `/blog/sauna/terapia-de-sauna` | `blog/sauna/terapia-de-sauna.html` | Sauna silo: supporting post |
| `/blog/sauna/sauna-en-medellin` | `blog/sauna/sauna-en-medellin.html` | Sauna silo: supporting post |
| `/blog/sauna/turco-en-medellin` | `blog/sauna/turco-en-medellin.html` | Sauna silo: supporting post |
| `/blog/baile-ejercicio` | `blog/baile-ejercicio/index.html` | Dance silo: pillar page |
| `/blog/baile-ejercicio/zumba` | `blog/baile-ejercicio/zumba.html` | Dance silo: supporting post |
| `/blog/pilates` | `blog/pilates/index.html` | Pilates silo: pillar page |
| `/blog/jugos-naturales` | `blog/jugos-naturales/index.html` | Juice bar silo: pillar page |

- Each post has a JSON-LD `@graph` in its `<head>` (HealthClub, WebSite, BlogPosting, BreadcrumbList, FAQPage). If you change a post's FAQ, update the visible answer and the matching `acceptedAnswer` text in the JSON-LD so they stay identical.
- Blog pages set `<html data-lang-lock="es">`, so the language toggle is hidden and visiting a post does not change the visitor's saved language.
- Keep links inside a silo (pillar <-> supporting posts) and link out to `/memberships` with descriptive anchor text. Add every new post to `sitemap.xml`.

## Class schedule and booking

`/schedule` shows two weeks of classes and lets visitors book. The settings are at the top of `schedule.js`:

- `OPENING`: first day of classes (Tuesday 1 December 2026). Days before it are not shown.
- `PRICE_REG` and `PRICE_FOUNDING`: regular price ($60.000) and founding price ($40.000), which applies to classes before `FOUNDING_END` (1 January 2027).
- `CAP`: spots per class (16). Spot counts are never shown; "Last spots" and "Full" appear only once real availability is connected.
- `SLOTS`, `TYPES` and `ROTA`: class times, instructors and the weekly rotation (Mon & Thu, Tue & Fri, Wed & Sat repeat).
- `PAYMENTS_LIVE`: `false` for now. Each booking ends with a pre-filled WhatsApp message to the club (class, date, price, name, WhatsApp, email, first visit, waiver accepted). Staff confirm the spot and send a Wompi payment link.

Add `?demo=1` to the URL to preview the pay-online flow with sample availability and a simulated checkout, and `?now=2026-12-02T07:30` to preview a given Medellín date and time.

### Online payments (next step)

To take payments on the site, Wompi's checkout needs a small server part, deployed on Vercel with the site:

1. In the Vercel project settings, add the Wompi keys as environment variables (never in the code): public key, integrity secret and events secret, for sandbox first, then production.
2. A server function creates the booking, holds the spot for 15 minutes and returns a signed Wompi reference; `startPayment()` in `schedule.js` opens Wompi's checkout with it.
3. A second function receives Wompi's payment events, checks their signature, confirms the booking and sends the confirmation.
4. Set `PAYMENTS_LIVE = true`.

## Editing

- All copy lives in the `T` dictionary in `site.js` (`en` and `es` keys). Elements reference keys with `data-i18n="..."`. Each page has its own title and description keys (`meta.title.*`, `meta.description.*`).
- The language toggle is in the nav. The site remembers the choice in `localStorage` across pages, honors `?lang=es` / `?lang=en` in the URL, and otherwise defaults to the browser language.
- Replace `WA_NUMBER` in `site.js` with the club's WhatsApp number (country code, digits only).
- Update the email and Instagram handle in `location.html` and the footer of each page.
- The nav, footer and the closing "Ready to find your element?" block are repeated in every page's HTML (so search engines see the links without running JavaScript). When you change one, change it in all sixteen pages (the seven site pages and the nine blog pages; the blog copies are written in Spanish).

## Adding a page

1. Copy an existing page (not `index.html`) to a new file, e.g. `classes.html`, and replace the section content.
2. Give it its own `<title>`, meta description, `<link rel="canonical">` and `og:url`, plus matching `meta.title.*` / `meta.description.*` keys in both languages in `site.js`.
3. Add it to the nav and footer of every page, and to `sitemap.xml`.

## Local preview

```bash
npx serve .
```
