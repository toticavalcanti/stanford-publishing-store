"use client";

import OrderSummaryLines from "./OrderSummaryLines";
import { useCart } from "./CartProvider";
import { getBook, getBookById, getBooksByIds, isbnLabel, levelLabel, stageLabel } from "@/data/catalog";
import { packages } from "@/data/packages";
import { mxn, percent } from "@/lib/format";
import { lineKey, lineTotal, round2 } from "@/lib/pricing";

export type QuoteContext = {
  bookSlug?: string;
  quantity?: number;
  packageId?: string;
  students?: number;
  includedIds?: string[];
  fromCart?: boolean;
};

/** "Resumen de la solicitud": what the buyer was looking at when they asked for a quote. */
export default function QuoteSummary({ context }: { context: QuoteContext }) {
  const { lines, totals } = useCart();

  if (context.bookSlug) {
    const book = getBook(context.bookSlug);
    if (!book) return null;
    return (
      <section className="quote-summary" aria-labelledby="resumen">
        <h2 id="resumen">Resumen de la solicitud</h2>
        <dl className="quote-summary__rows">
          <div>
            <dt>Título</dt>
            <dd>{book.title}</dd>
          </div>
          <div>
            <dt>ISBN</dt>
            <dd>{isbnLabel(book)}</dd>
          </div>
          <div>
            <dt>Nivel</dt>
            <dd>
              {levelLabel[book.level]} · {stageLabel(book)}
            </dd>
          </div>
          {context.quantity ? (
            <div>
              <dt>Cantidad</dt>
              <dd>{context.quantity}</dd>
            </div>
          ) : null}
          <div>
            <dt>Precio unitario</dt>
            <dd>{mxn(book.price)}</dd>
          </div>
        </dl>
        <p className="hypothesis">
          Precio hipotético para esta muestra, sujeto a validación con Stanford Publishing.
        </p>
      </section>
    );
  }

  if (context.packageId) {
    const pack = packages.find((p) => p.id === context.packageId);
    if (!pack) return null;
    const includedIds = context.includedIds?.length ? context.includedIds : pack.bookIds;
    const included = getBooksByIds(includedIds.filter((id) => pack.bookIds.includes(id)));
    const removed = getBooksByIds(pack.bookIds.filter((id) => !includedIds.includes(id)));
    const students = context.students ?? 30;
    const perStudent = included.reduce((sum, b) => sum + b.price, 0);
    const gross = perStudent * students;
    const estimated = round2(gross * (1 - pack.discount));

    return (
      <section className="quote-summary" aria-labelledby="resumen">
        <h2 id="resumen">Resumen de la solicitud</h2>
        <dl className="quote-summary__rows">
          <div>
            <dt>Paquete</dt>
            <dd>{pack.name}</dd>
          </div>
          <div>
            <dt>Nivel</dt>
            <dd>
              {levelLabel[pack.level]} · {pack.scope}
            </dd>
          </div>
          <div>
            <dt>Alumnos</dt>
            <dd>{students}</dd>
          </div>
          <div>
            <dt>Títulos incluidos</dt>
            <dd>{included.length}</dd>
          </div>
        </dl>

        <ul className="quote-summary__books">
          {included.map((b) => (
            <li key={b.id}>
              <span>{b.title}</span>
              <span className="muted small">{mxn(b.price)}</span>
            </li>
          ))}
        </ul>

        {removed.length > 0 && (
          <>
            <p className="quote-summary__label">Títulos retirados por la escuela</p>
            <ul className="quote-summary__books quote-summary__books--removed">
              {removed.map((b) => (
                <li key={b.id}>
                  <span>{b.title}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <dl className="summary-lines">
          <div>
            <dt>Precio por alumno</dt>
            <dd>{mxn(perStudent)}</dd>
          </div>
          <div>
            <dt>Total de ejemplares</dt>
            <dd>{included.length * students}</dd>
          </div>
          <div>
            <dt>Precio de lista</dt>
            <dd>{mxn(gross)}</dd>
          </div>
          <div className="summary-lines__discount">
            <dt>Descuento institucional ({percent(pack.discount)})</dt>
            <dd>−{mxn(round2(gross - estimated))}</dd>
          </div>
          <div className="summary-lines__total">
            <dt>Total estimado</dt>
            <dd>{mxn(estimated)}</dd>
          </div>
        </dl>
        <p className="hypothesis">
          Precios y descuento institucional hipotéticos para esta muestra, sujetos a validación con
          Stanford Publishing.
        </p>
      </section>
    );
  }

  if (context.fromCart) {
    if (lines.length === 0) return null;
    return (
      <section className="quote-summary" aria-labelledby="resumen">
        <h2 id="resumen">Resumen de la solicitud</h2>
        <ul className="quote-summary__books">
          {lines.map((line) => {
            const book = getBookById(line.bookId);
            return (
              <li key={lineKey(line)}>
                <span>
                  {book?.title ?? line.bookId}
                  <span className="muted small"> × {line.quantity}</span>
                  {line.packageName && <span className="muted small"> · {line.packageName}</span>}
                </span>
                <span className="muted small">{mxn(lineTotal(line))}</span>
              </li>
            );
          })}
        </ul>
        <OrderSummaryLines
          totals={totals}
          discountRate={lines.find((l) => l.discount)?.discount}
        />
      </section>
    );
  }

  return null;
}
