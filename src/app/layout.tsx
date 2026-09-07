import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "Stanford Publishing · Tienda en línea (prototipo)",
    template: "%s · Stanford Publishing",
  },
  description:
    "Prototipo visual de tienda en línea para Stanford Publishing: catálogo por grado y semestre, paquetes escolares, pedidos de escuelas y distribuidores y acceso a recursos digitales.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          <a href="#contenido" className="skip-link">
            Ir al contenido
          </a>
          <SiteHeader />
          <main id="contenido">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
