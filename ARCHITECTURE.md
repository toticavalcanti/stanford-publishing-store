# Architecture notes

Short reference for the walkthrough with the publisher, and the starting point for the
production phase.

## Page architecture

```
/                       store home
/catalogo               catalogue + filters (query params seed the initial filter state)
/libro/[slug]           book detail (statically generated for all 74 titles)
/paquetes               school package builder
/carrito                cart
/pedido/confirmado      simulated confirmation + digital hand-off
/cotizacion             institutional quote request
/recursos               digital resources explainer + simulated account view
/admin                  illustrative back-office (overview, catalogue, orders, schools, distributors)
```

## Component map

| Component | Type | Role |
|---|---|---|
| `SiteHeader` | client | Sticky header, desktop nav, mobile drawer, cart counter |
| `SiteFooter` | server | Institutional footer |
| `CartProvider` / `useCart` | client | Cart state, persisted to `localStorage` |
| `CatalogBrowser` | client | Search + filter state, renders the result grid |
| `BookCard` | server | Catalogue grid item |
| `BookCover` | client | Remote cover with typographic fallback |
| `PackageBuilder` | client | Package selection, student count, live totals |
| `CartView` | client | Cart lines, quantities, totals, checkout hand-off |
| `QuoteForm` | client | Institutional quote request with confirmation state |
| `OrderConfirmation` | client | Freezes the cart, shows the simulated order |
| `AdminScreens` | client | Tabbed back-office views over mock records |
| `Reveal` | client | Single IntersectionObserver scroll reveal |

## Data model

```ts
Book          id, slug, title, subtitle?, author, isbn, level,
              grade? | semester?, subject, collection, description,
              cover, price, digital, featured?, isNew?

SchoolPackage id, name, level, scope, bookIds[], discount, note

CartLine      bookId, quantity
```

The filter axes the publisher's catalogue actually uses — level (secundaria / bachillerato),
grade or semester, subject and collection — are first-class fields rather than free tags, so
the same shape maps cleanly onto a CMS or a relational schema later.

## What production would add

- Catalogue and pricing in a CMS or database, with per-customer price lists
- Real checkout (Mexican payment methods: cards, SPEI, OXXO) and invoicing (CFDI)
- Accounts for families, schools and distributors, with role-based pricing and credit terms
- Quote workflow: request, internal approval, formal PDF, conversion into an order
- Stock and fulfilment, plus distributor allocation by region
- Integration with the existing platform so purchases grant real access to digital resources
- Analytics on catalogue navigation and abandoned institutional quotes

## Review pass (September 2026)

| Area | Change |
|---|---|
| ISBN integrity | Every ISBN validated; `isbnStatus` added to the model; the UI shows `Por confirmar` instead of a dubious number. Report in `docs/isbn-status.md` |
| Quote context | `/cotizacion` reads `libro`, `cantidad`, `paquete`, `alumnos`, `incluidos` and `origen`, and renders "Resumen de la solicitud" |
| Package context | The builder passes the students count and the surviving titles into the quote; removed titles are listed as removed |
| Checkout | New `/pedido/checkout` step with contact, address and simulated payment method |
| Totals | `lib/pricing.ts` + `OrderSummaryLines` make cart, checkout, quote and confirmation agree |
| Package discounts | Cart lines carry `packageId`, `packageName`, `unitPrice` and `discount`; the line key is `bookId::packageId` |
| Order snapshot | Frozen in `sessionStorage` at checkout, before the cart is cleared |
| Hypotheses | `Hypothesis` component marks prices, discounts, shipping and digital-access rules |
| Covers | Local-first with remote and typographic fallbacks; `scripts/download-covers.mjs` populates the manifest |
| ESLint | Flat config (`eslint.config.mjs`), `npm run lint` runs non-interactively and exits 0 |
| Accessibility | Admin tabs use `tablist`/`tab`/`tabpanel` with arrow-key navigation; `overflow-x: hidden` removed from `body` in favour of real `min-width: 0` fixes |
