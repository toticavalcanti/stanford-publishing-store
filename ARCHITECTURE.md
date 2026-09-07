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
