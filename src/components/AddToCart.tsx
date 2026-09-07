"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({
  bookId,
  label = "Agregar al carrito",
  block = false,
}: {
  bookId: string;
  label?: string;
  block?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={`btn ${block ? "btn--block" : ""}`}
      onClick={() => {
        add(bookId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
    >
      {added ? "Agregado" : label}
    </button>
  );
}
