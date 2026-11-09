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

Shared by every page: `styles.css` (design), `site.js` (language toggle, mobile menu, all EN/ES copy). For search engines: `sitemap.xml` and `robots.txt`.

## Editing

- All copy lives in the `T` dictionary in `site.js` (`en` and `es` keys). Elements reference keys with `data-i18n="..."`. Each page has its own title and description keys (`meta.title.*`, `meta.description.*`).
- The language toggle is in the nav. The site remembers the choice in `localStorage` across pages, honors `?lang=es` / `?lang=en` in the URL, and otherwise defaults to the browser language.
- Replace `WA_NUMBER` in `site.js` with the club's WhatsApp number (country code, digits only).
- Update the email and Instagram handle in `location.html` and the footer of each page.
- The nav, footer and the closing "Ready to find your element?" block are repeated in every page's HTML (so search engines see the links without running JavaScript). When you change one, change it in all six files.

## Adding a page

1. Copy an existing page (not `index.html`) to a new file, e.g. `classes.html`, and replace the section content.
2. Give it its own `<title>`, meta description, `<link rel="canonical">` and `og:url`, plus matching `meta.title.*` / `meta.description.*` keys in both languages in `site.js`.
3. Add it to the nav and footer of every page, and to `sitemap.xml`.

## Local preview

```bash
npx serve .
```
