"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BookCover from "./BookCover";
import { useCart } from "./CartProvider";
import { packages } from "@/data/packages";
import { getBooksByIds, levelLabel } from "@/data/catalog";
import { mxn, percent } from "@/lib/format";
import { round2 } from "@/lib/pricing";

export default function PackageBuilder() {
  const [selectedId, setSelectedId] = useState(packages[0].id);
  const [students, setStudents] = useState(30);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const pack = packages.find((p) => p.id === selectedId)!;
  const allBooks = getBooksByIds(pack.bookIds);
  const includedBooks = useMemo(
    () => allBooks.filter((b) => !excluded.includes(b.id)),
    [allBooks, excluded]
  );

  const perStudent = includedBooks.reduce((sum, b) => sum + b.price, 0);
  const listTotal = round2(perStudent * students);
  const discountValue = round2(listTotal * pack.discount);
  const estimated = round2(listTotal - discountValue);

  function toggle(bookId: string) {
    setExcluded((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
    setAdded(false);
  }

  function selectPackage(id: string) {
    setSelectedId(id);
    setExcluded([]);
    setAdded(false);
  }

  const quoteHref =
    `/cotizacion?paquete=${pack.id}` +
    `&alumnos=${students}` +
    `&incluidos=${includedBooks.map((b) => b.id).join(",")}`;

  return (
    <div className="packages">
      <div className="packages__picker" role="group" aria-label="Paquetes disponibles">
        {packages.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === selectedId}
            className={`package-tab ${p.id === selectedId ? "is-on" : ""}`}
            onClick={() => selectPackage(p.id)}
          >
            <span className="package-tab__name">{p.name}</span>
            <span className="package-tab__meta">
              {levelLabel[p.level]} · {p.bookIds.length} títulos
            </span>
          </button>
        ))}
      </div>

      <div className="packages__panel">
        <div className="packages__contents">
          <h2>{pack.name}</h2>
          <p className="muted">{pack.note}</p>

          <ul className="package-list">
            {allBooks.map((book) => {
              const isIn = !excluded.includes(book.id);
              return (
                <li key={book.id} className={isIn ? "" : "is-out"}>
                  <BookCover book={book} className="cover--mini" />
                  <div>
                    <p className="package-list__title">{book.title}</p>
                    <p className="small muted">
                      {book.subject} · {mxn(book.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn--quiet btn--sm"
                    onClick={() => toggle(book.id)}
                  >
                    {isIn ? "Quitar" : "Incluir"}
                    <span className="visually-hidden"> {book.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="packages__summary">
          <h3>Resumen del pedido</h3>

          <div className="field">
            <label htmlFor="alumnos-paquete">Número de alumnos</label>
            <input
              id="alumnos-paquete"
              type="number"
              min={1}
              max={2000}
              value={students}
              onChange={(e) => {
                setStudents(Math.max(1, Number(e.target.value) || 1));
                setAdded(false);
              }}
            />
          </div>

          <dl className="summary-lines">
            <div>
              <dt>Títulos por alumno</dt>
              <dd>{includedBooks.length}</dd>
            </div>
            <div>
              <dt>Precio por alumno</dt>
              <dd>{mxn(perStudent)}</dd>
            </div>
            <div>
              <dt>Total de ejemplares</dt>
              <dd>{includedBooks.length * students}</dd>
            </div>
            <div>
              <dt>Precio de lista</dt>
              <dd>{mxn(listTotal)}</dd>
            </div>
            <div className="summary-lines__discount">
              <dt>Descuento institucional ({percent(pack.discount)})</dt>
              <dd>−{mxn(discountValue)}</dd>
            </div>
            <div className="summary-lines__total">
              <dt>Total estimado</dt>
              <dd>{mxn(estimated)}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="btn btn--block"
            disabled={includedBooks.length === 0}
            onClick={() => {
              includedBooks.forEach((b) =>
                add(b.id, {
                  quantity: students,
                  packageId: pack.id,
                  packageName: pack.name,
                  discount: pack.discount,
                })
              );
              setAdded(true);
              window.setTimeout(() => setAdded(false), 2200);
            }}
          >
            {added ? "Paquete agregado" : "Agregar el paquete al carrito"}
          </button>

          <Link href={quoteHref} className="btn btn--ghost btn--block">
            Solicitar cotización formal
          </Link>

          <p className="hypothesis">
            Precios y descuento institucional hipotéticos para esta muestra, sujetos a validación
            con Stanford Publishing.
          </p>
        </aside>
      </div>
    </div>
  );
}
