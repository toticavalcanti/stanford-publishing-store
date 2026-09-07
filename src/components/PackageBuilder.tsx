"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BookCover from "./BookCover";
import { useCart } from "./CartProvider";
import { packages } from "@/data/packages";
import { getBooksByIds, levelLabel } from "@/data/catalog";
import { mxn } from "@/lib/format";

export default function PackageBuilder() {
  const [selectedId, setSelectedId] = useState(packages[0].id);
  const [students, setStudents] = useState(30);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const pack = packages.find((p) => p.id === selectedId)!;
  const allBooks = getBooksByIds(pack.bookIds);
  const includedBooks = allBooks.filter((b) => !excluded.includes(b.id));

  const perStudent = useMemo(
    () => includedBooks.reduce((sum, b) => sum + b.price, 0),
    [includedBooks]
  );
  const listTotal = perStudent * students;
  const discounted = Math.round(listTotal * (1 - pack.discount));

  function toggle(bookId: string) {
    setExcluded((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  }

  function selectPackage(id: string) {
    setSelectedId(id);
    setExcluded([]);
    setAdded(false);
  }

  return (
    <div className="packages">
      <div className="packages__picker" role="tablist" aria-label="Paquetes disponibles">
        {packages.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === selectedId}
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
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="packages__summary">
          <h3>Resumen del pedido</h3>

          <label className="field">
            <span>Número de alumnos</span>
            <input
              type="number"
              min={1}
              max={2000}
              value={students}
              onChange={(e) => setStudents(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>

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
              <dt>Condición institucional</dt>
              <dd>−{Math.round(pack.discount * 100)}%</dd>
            </div>
            <div className="summary-lines__total">
              <dt>Total estimado</dt>
              <dd>{mxn(discounted)}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="btn btn--block"
            disabled={includedBooks.length === 0}
            onClick={() => {
              includedBooks.forEach((b) => add(b.id, students));
              setAdded(true);
              window.setTimeout(() => setAdded(false), 2200);
            }}
          >
            {added ? "Paquete agregado" : "Agregar el paquete al carrito"}
          </button>

          <Link href={`/cotizacion?paquete=${pack.id}&alumnos=${students}`} className="btn btn--ghost btn--block">
            Solicitar cotización formal
          </Link>

          <p className="small muted">
            El descuento mostrado es un supuesto del prototipo. Las condiciones reales se definen con
            Stanford Publishing.
          </p>
        </aside>
      </div>
    </div>
  );
}
