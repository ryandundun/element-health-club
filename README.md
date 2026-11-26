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
| `/memberships` | `memberships.html` | Membership plans, founding prices, first-class-free offer and terms (prices and wording live in the `plans.*`, `welcome.*` and `rules.*` keys in `site.js`) |
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

### Free first class, the 3-class pack and memberships also run on Vorzal

- **Free first class**: Vorzal decides who is new (no class booked before with that WhatsApp number or email). Their booking is confirmed straight away with nothing to pay, and "You're booked" says the first class is free. The page no longer asks "First time at Element?" when booking online.
- **3-class pack**: when a spot is waiting for payment, Vorzal says which packs that visitor may buy. The payment step then offers "This class" or "3 classes in 7 days", and switching asks Vorzal for the new amount and payment link (`POST /bookings/<id>/option`). Once paid, the visitor's next two classes within 7 days of the first are booked free with the same WhatsApp number. A pack is once per person, and its price comes off the first month of a membership started within those 7 days.
- **Memberships** (`/memberships`, `join.js` and `join.css`): each plan's Reserve button opens a panel (name, WhatsApp, email, an OK to be charged every month). The card or Nequi account is saved in Wompi's own window, so card numbers never touch this site. Vorzal charges the first month at once and then every month on the same day, and members book classes free on `/schedule` with the same WhatsApp number (the Recovery Pass has no classes). The team cancels, freezes or records a payment in Vorzal (Agenda → Members). If Vorzal can't be reached, Reserve opens WhatsApp as before.
- **Manage my membership**: every member has their own page on Vorzal (vorzal.com/member/…) to see their payments, put in another card or Nequi account, freeze, or cancel. The link is in every membership email. On this site, any link with a `data-manage` attribute (two on `/memberships`, text in `site.js` under `manage.line`) opens a small panel in `join.js` that asks for the email and has Vorzal email the link (`POST /member-link`); the page never shows whether that email is a member. If Vorzal can't be reached, the link opens WhatsApp.
- **Prices**: what visitors are charged for classes, packs and memberships is set in Vorzal (Change prices on the timetable for a class; Members → Prices for packs, memberships and the free first class). The prices typed on these pages (`site.js`, `PACK3` and `PRICE_REG` in `schedule.js`) are for display, so keep them the same as in Vorzal.

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
