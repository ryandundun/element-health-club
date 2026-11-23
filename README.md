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

`/schedule` shows two weeks of classes and lets visitors book and pay.

### Booking and payments run on Vorzal

**The timetable, the spots left, every booking and the Wompi payment live in Vorzal, the club's booking system (vorzal.com), not in this repository.** `schedule.js` only draws what Vorzal sends and passes bookings to it:

- On load the page asks Vorzal for the next two weeks of classes (`VORZAL` at the top of `schedule.js`): each class with its time, instructor, price and whether it is open, nearly full ("Last spots"), full, or closed for online booking.
- When a visitor continues from their details, Vorzal takes the spot, holds it for 15 minutes and answers with a Wompi checkout link. "Pay with Wompi" sends the visitor there.
- Wompi sends the visitor back to `/schedule?booking=…&id=…`. The page asks Vorzal where the booking stands and shows "You're booked", the payment step again (declined, or not paid yet), or that the hold ran out.
- Vorzal sends the confirmation email, tells the team about each booking and keeps the list of who is coming to each class.

What this means when editing this site:

- **To change the timetable (a time, an instructor, a new class, a price, the number of spots), change it in Vorzal.** Editing `ROTA`, `SAT_ORDERS`, `OVERRIDES` or the prices here does not change what visitors see or book.
- **Do not add a database, server functions or Wompi keys to this project.** The Wompi keys are kept in Vorzal. This repository is public, so nothing secret may ever be committed here.
- A class Vorzal sends is matched to this page's wording and colours by its short key (`hiit`, `tramp`, `pil` in `TYPES`). A new kind of class shows with the name Vorzal gives it until a key is added here.

The settings at the top of `schedule.js`:

- `PAYMENTS_LIVE`: `true`. With `false`, or whenever Vorzal can't be reached, the page falls back to the built-in timetable below and each booking ends with a pre-filled WhatsApp message to the club (class, date, price, name, WhatsApp, email, first visit, waiver accepted), so the page keeps working.
- `VORZAL`: the address of the club's classes in Vorzal.
- `OPENING`: first day of classes (Tuesday 1 December 2026). Days before it are not shown.
- `CAP` and `LAST`: used for display only. Spot counts are never shown; Vorzal tells the page when a class is down to its last spots or full.
- The fallback timetable, used only when Vorzal can't be reached: `PRICE_REG` and `PRICE_FOUNDING` (regular price $60.000 and founding price $40.000 for classes before `FOUNDING_END`, 1 January 2027), and `TYPES`, `ROTA`, `SAT_ORDERS` and `OVERRIDES` (instructors, the weekday rotation by start hour, Saturday's three rotating morning classes, and one-off changes for single dates). Keep it roughly in step with Vorzal.

Add `?demo=1` to the URL to preview the pay-online flow with sample availability and a simulated checkout (it does not talk to Vorzal), and `?now=2026-12-02T07:30` to preview a given Medellín date and time.

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
