# Stanford Publishing — Online Store (Visual Prototype)

A clickable, front-end-only prototype of an online bookstore for **Stanford Publishing**
(Morelia, Michoacán), a Mexican educational publisher. It was built to be shown to the
decision-maker as a concrete illustration of the proposal: what the store could look like,
how the catalogue could be organised, and how families, schools and distributors would each
buy through it.

**This is not a production system.** There is no database, no payment processing, no
authentication, no stock or distributor integration, no real order submission and no real
release of digital resources. Every screen runs on local mock data.

The UI copy is in Spanish (Mexico), the audience of the product. Code, comments and this
document are in English.

---

## Stack

- Next.js 15 (App Router) + TypeScript
- Plain CSS with design tokens — no UI framework, no runtime CSS dependency
- No external runtime dependencies beyond React and Next
- Mobile-first, responsive, keyboard accessible, `prefers-reduced-motion` respected
- Ready to deploy on Vercel as a standalone project

## Run locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run lint      # exits 0, no interactive setup
npm run build && npm start
npm run covers    # optional: download covers locally before a demo
```

Node 18.18+ is required.

## Deploy to Vercel

Push to a Git repository and import it in Vercel. Framework preset: **Next.js**. No
environment variables, no build settings to change. The official Stanford Publishing site is
not touched in any way — this deploys to its own URL.

---

## Screens

| Route | What it shows |
|---|---|
| `/` | Store home: positioning, entry by grade/semester, new releases, collections, the three buying audiences, package teaser, digital resources |
| `/catalogo` | Full catalogue with search and filters (level, grade/semester, subject, collection, digital resources) |
| `/libro/[slug]` | Book page: cover, title, author, ISBN, subject, collection, description, digital-resources note, buy or request-quote actions |
| `/paquetes` | School package builder: pick a package, add or remove titles, set the number of students, see the total |
| `/carrito` | Cart with quantities, package discounts and totals; also converts the same order into an institutional quote |
| `/pedido/checkout` | Simulated checkout: contact, delivery address, payment method. No gateway, no backend |
| `/pedido/confirmado` | Order confirmation built from a frozen snapshot, so the totals match the checkout exactly |
| `/cotizacion` | Quote request for schools, distributors and teachers (submits to a confirmation state, sends nothing) |
| `/recursos` | How digital access could be released after purchase, plus a simulated "my resources" view |
| `/admin` | Illustrative admin screens: overview, catalogue, orders, schools, distributors |

## Project structure

```
src/
  app/            App Router routes, one folder per screen
    globals.css   Design tokens + all component styles
  components/     Reusable UI (header, footer, book card, cart, filters, admin, …)
  data/           Mock data: books, packages, admin records, helpers
  lib/            Small utilities (currency formatting)
```

### Data

`src/data/books.ts` and `src/data/books-secundaria.ts` hold 74 titles transcribed from the
publisher's public catalogue (secundaria and bachillerato), including author, ISBN, subject,
collection and cover URL. `src/data/catalog.ts` merges them and exposes the lookup and filter
helpers used across the app.

Covers are loaded directly from `stanfordpublishing.com.mx`. If a cover cannot be fetched,
`BookCover` falls back to a typographic cover, so a demo never shows a broken image.

### ISBNs

All 74 ISBNs were validated (format, prefix, check digit) against the publisher's public
catalogue. 39 are verified, 3 are marked "En trámite" because the official page says so, and
32 cannot be confirmed — the source itself prints malformed values (a `971-` prefix that is
not a valid ISBN-13 prefix, failed check digits, or evident `123-456` placeholders). Nothing
was invented: those titles display `Por confirmar`.

The full breakdown, with the reason for each one, is in `docs/isbn-status.md`.

### Covers

Covers load from a local copy when one exists and from the publisher's site otherwise, with a
typographic cover as the last fallback. To remove the dependency on the remote server before a
demo:

```bash
npm run covers
```

This downloads every cover into `public/covers/` and rewrites `src/data/covers.ts` with the
files that actually saved. Anything that fails is listed in `covers-pendientes.json` and left
out of the manifest, so a missing file can never produce a 404 and no cover is ever swapped
for another.

### Simulated on purpose

Prices, discounts, shipping, stock, order folios, access codes and every admin record are
invented placeholders. Wherever a viewer makes a decision, the screen carries a short note:
*"Precio hipotético para esta muestra, sujeto a validación con Stanford Publishing."* They
exist to make the flow legible, not to state commercial terms.

### Money

`src/lib/pricing.ts` is the single source of truth for totals. Cart, checkout, quote and
confirmation all render through `OrderSummaryLines`, so subtotal, discount, shipping and total
are always the same numbers. Package lines carry their origin and discount rate, which is why
a 15% institutional discount survives from the package builder all the way to the
confirmation.

## Visual direction

The prototype keeps the publisher's institutional character (deep blue, Mexican educational
vocabulary, the real catalogue and its covers) while modernising typography, spacing,
navigation and — above all — the mobile experience, which is the weakest point of the current
site. Scroll motion is a single restrained reveal and is disabled for users who ask for
reduced motion.

All brand values live in one place, at the top of `src/app/globals.css`:

```css
--navy, --blue, --wash, --crimson, --jade, --line, --paper
--sans, --display
```

Swapping in the official brand kit (exact hexes, logo file, licensed typefaces) is a
single-file change. The wordmark placeholder is in `src/components/SiteHeader.tsx`.

## Open questions to confirm with the publisher

The prototype makes reasonable assumptions where the answers are not yet known. Each one is
isolated so it can be changed quickly:

1. **Priority channel** — direct-to-consumer, institutional orders, or both. The prototype
   shows both, side by side.
2. **Public prices and stock** — prices are shown publicly and institutional buyers can also
   request a quote. If some customers must always request a quote, the price block on
   `/libro/[slug]` and the cart become conditional.
3. **Digital resources after purchase** — modelled as one access code per copy, delivered on
   confirmation, with a bulk file for schools. Needs to be aligned with how the existing
   platform actually grants access.

---

Prepared by **Código Fluente** for Stanford Publishing. Catalogue data, titles and cover
images belong to Stanford Publishing and are used here solely to illustrate the proposal.
