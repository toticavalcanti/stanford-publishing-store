"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartCount from "./CartCount";

const nav = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/paquetes", label: "Paquetes escolares" },
  { href: "/recursos", label: "Recursos digitales" },
  { href: "/cotizacion", label: "Escuelas y distribuidores" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__utility">
        <div className="shell header__utility-inner">
          <span>Envíos a toda la República · 800 890 7051</span>
          <Link href="/admin">Administración (demo)</Link>
        </div>
      </div>

      <div className="shell header__main">
        <Link href="/" className="brand" aria-label="Stanford Publishing, inicio">
          <span className="brand__mark" aria-hidden="true">
            SP
          </span>
          <span className="brand__text">
            <strong>Stanford Publishing</strong>
            <span>Tienda en línea</span>
          </span>
        </Link>

        <nav className={`header__nav ${open ? "is-open" : ""}`} aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <span className="header__nav-cart">
            <CartCount />
          </span>
        </nav>

        <div className="header__actions">
          <span className="header__cart-desktop">
            <CartCount />
          </span>
          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">Menú</span>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div id="menu-principal" className={`header__drawer ${open ? "is-open" : ""}`}>
        <div className="shell">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/carrito">Carrito</Link>
          <Link href="/admin">Administración (demo)</Link>
        </div>
      </div>
    </header>
  );
}
