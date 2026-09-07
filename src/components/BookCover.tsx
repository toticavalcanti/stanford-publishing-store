"use client";

import { useState } from "react";
import type { Book } from "@/data/types";

type Props = {
  book: Book;
  eager?: boolean;
  className?: string;
};

/**
 * Covers come from the publisher's public site. If a remote image cannot be
 * loaded the component falls back to a typographic cover so the layout never
 * breaks during a demo.
 */
export default function BookCover({ book, eager = false, className }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`cover cover--fallback ${className ?? ""}`} aria-hidden="true">
        <span className="cover__collection">{book.collection}</span>
        <span className="cover__title">{book.title}</span>
        <span className="cover__mark">Stanford Publishing</span>
      </div>
    );
  }

  return (
    <div className={`cover ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.cover}
        alt={`Portada de ${book.title}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
