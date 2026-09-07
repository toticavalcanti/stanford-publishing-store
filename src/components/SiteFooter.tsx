import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer__grid">
        <div>
          <p className="footer__brand">Stanford Publishing</p>
          <p className="small muted">
            Desde 2015 elaboramos proyectos educativos para los diferentes sectores escolares de
            México.
          </p>
        </div>
        <nav aria-label="Tienda">
          <p className="footer__title">Tienda</p>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/paquetes">Paquetes escolares</Link>
          <Link href="/recursos">Recursos digitales</Link>
          <Link href="/carrito">Carrito</Link>
        </nav>
        <nav aria-label="Institucional">
          <p className="footer__title">Escuelas y distribuidores</p>
          <Link href="/cotizacion">Solicitar cotización</Link>
          <Link href="/paquetes">Armar paquete por grupo</Link>
          <Link href="/admin">Administración (demo)</Link>
        </nav>
        <div>
          <p className="footer__title">Contacto</p>
          <p className="small muted">
            800 890 7051
            <br />
            contacto@stanfordpublishing.com.mx
            <br />
            José Blas Abadiano #206, Morelia, Michoacán.
          </p>
        </div>
      </div>
      <div className="shell footer__legal">
        <p className="small muted">
          Prototipo visual preparado por Código Fluente para Stanford Publishing. Sin transacciones
          reales, sin datos de producción.
        </p>
      </div>
    </footer>
  );
}
