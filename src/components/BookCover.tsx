"use client";

import { useState } from "react";
import type { Book } from "@/data/types";
import { coverSrc } from "@/data/catalog";

type Props = {
  book: Book;
  eager?: boolean;
  className?: string;
};

/**
 * Uses the local copy in /public/covers when it exists and the publisher's URL
 * otherwise. If neither loads, a typographic cover keeps the layout intact.
 */
export default function BookCover({ book, eager = false, className }: Props) {
  const local = coverSrc(book);
  const [src, setSrc] = useState(local);
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
        src={src}
        alt={`Portada de ${book.title}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => {
          if (src !== book.cover) setSrc(book.cover);
          else setFailed(true);
        }}
      />
    </div>
  );
}
