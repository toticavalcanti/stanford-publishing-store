"use client";

import { useMemo, useState } from "react";
import BookCard from "./BookCard";
import { books, collectionsFor, gradeLabel, semesterLabel, subjectsFor } from "@/data/catalog";
import type { Level } from "@/data/types";

export type CatalogFilters = {
  query: string;
  level: Level | "todos";
  stage: string;
  subject: string;
  collection: string;
  digitalOnly: boolean;
};

const emptyFilters: CatalogFilters = {
  query: "",
  level: "todos",
  stage: "todos",
  subject: "todas",
  collection: "todas",
  digitalOnly: false,
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CatalogBrowser({ initial }: { initial: Partial<CatalogFilters> }) {
  const [filters, setFilters] = useState<CatalogFilters>({ ...emptyFilters, ...initial });

  const scopeLevel = filters.level === "todos" ? undefined : filters.level;
  const subjects = useMemo(() => subjectsFor(scopeLevel), [scopeLevel]);
  const collections = useMemo(() => collectionsFor(scopeLevel), [scopeLevel]);

  const stages =
    filters.level === "secundaria"
      ? [1, 2, 3].map((n) => ({ value: String(n), label: gradeLabel[n] }))
      : filters.level === "bachillerato"
        ? [1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: semesterLabel[n] }))
        : [];

  const results = useMemo(() => {
    const q = normalise(filters.query.trim());
    return books.filter((book) => {
      if (filters.level !== "todos" && book.level !== filters.level) return false;
      if (filters.stage !== "todos") {
        const stage = book.level === "secundaria" ? book.grade : book.semester;
        if (String(stage ?? "") !== filters.stage) return false;
      }
      if (filters.subject !== "todas" && book.subject !== filters.subject) return false;
      if (filters.collection !== "todas" && book.collection !== filters.collection) return false;
      if (filters.digitalOnly && !book.digital) return false;
      if (q) {
        const haystack = normalise(
          [book.title, book.subtitle, book.author, book.isbn, book.subject, book.collection]
            .filter(Boolean)
            .join(" ")
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  const isFiltered = JSON.stringify(filters) !== JSON.stringify(emptyFilters);

  function update<K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      // Changing the level invalidates stage-, subject- and collection-scoped picks.
      if (key === "level") {
        next.stage = "todos";
        next.subject = "todas";
        next.collection = "todas";
      }
      return next;
    });
  }

  return (
    <div className="catalog">
      <form className="filters" role="search" onSubmit={(e) => e.preventDefault()}>
        <div className="filters__search">
          <label htmlFor="q" className="visually-hidden">
            Buscar por título, autor o ISBN
          </label>
          <input
            id="q"
            type="search"
            placeholder="Buscar por título, autor o ISBN"
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
          />
        </div>

        <div className="filters__group" role="group" aria-label="Nivel">
          {(["todos", "secundaria", "bachillerato"] as const).map((level) => (
            <button
              key={level}
              type="button"
              className={`toggle ${filters.level === level ? "is-on" : ""}`}
              aria-pressed={filters.level === level}
              onClick={() => update("level", level)}
            >
              {level === "todos" ? "Todos" : level === "secundaria" ? "Secundaria" : "Bachillerato"}
            </button>
          ))}
        </div>

        <div className="filters__selects">
          <label className="select">
            <span>{filters.level === "secundaria" ? "Grado" : "Semestre"}</span>
            <select
              value={filters.stage}
              onChange={(e) => update("stage", e.target.value)}
              disabled={filters.level === "todos"}
            >
              <option value="todos">Todos</option>
              {stages.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="select">
            <span>Disciplina</span>
            <select value={filters.subject} onChange={(e) => update("subject", e.target.value)}>
              <option value="todas">Todas</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="select">
            <span>Colección</span>
            <select
              value={filters.collection}
              onChange={(e) => update("collection", e.target.value)}
            >
              <option value="todas">Todas</option>
              {collections.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="check">
            <input
              type="checkbox"
              checked={filters.digitalOnly}
              onChange={(e) => update("digitalOnly", e.target.checked)}
            />
            <span>Con recursos digitales</span>
          </label>
        </div>
      </form>

      <div className="catalog__status">
        <p className="small muted">
          {results.length} {results.length === 1 ? "título" : "títulos"}
        </p>
        {isFiltered && (
          <button type="button" className="btn btn--quiet btn--sm" onClick={() => setFilters(emptyFilters)}>
            Limpiar filtros
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <h3>Sin resultados con estos filtros</h3>
          <p className="muted small">
            Prueba con otro grado o quita la disciplina para ver el catálogo completo.
          </p>
          <button type="button" className="btn btn--sm" onClick={() => setFilters(emptyFilters)}>
            Ver todo el catálogo
          </button>
        </div>
      ) : (
        <div className="grid-books">
          {results.map((book, i) => (
            <BookCard key={book.id} book={book} eager={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
