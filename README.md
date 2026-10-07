# Element Health Club

Bilingual (English / Spanish) marketing site for Element Health Club, a health and wellness club in Laureles, Medellín.

Static site: a single `index.html` with no build step. Deployed on Vercel.

## Editing

- All copy lives in the `T` dictionary at the bottom of `index.html` (`en` and `es` keys). Elements reference keys with `data-i18n="..."`.
- The language toggle is in the nav. The site remembers the choice in `localStorage`, honors `?lang=es` / `?lang=en` in the URL, and otherwise defaults to the browser language.
- Replace `WA_NUMBER` in `index.html` with the club's WhatsApp number (country code, digits only).
- Update the email and Instagram handle in the Location and footer sections.

## Local preview

```bash
npx serve .
```
