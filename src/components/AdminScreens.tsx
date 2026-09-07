"use client";

import { useState } from "react";
import { adminMetrics, distributors, orders, schools } from "@/data/admin";
import { books, isbnLabel, levelLabel } from "@/data/catalog";
import { mxn } from "@/lib/format";

const tabs = [
  { id: "resumen", label: "Resumen" },
  { id: "catalogo", label: "Catálogo" },
  { id: "pedidos", label: "Pedidos" },
  { id: "escuelas", label: "Escuelas" },
  { id: "distribuidores", label: "Distribuidores" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminScreens() {
  const [tab, setTab] = useState<TabId>("resumen");

  return (
    <div className="admin">
      <div
        className="admin__tabs"
        role="tablist"
        aria-label="Secciones de administración"
        onKeyDown={(event) => {
          const index = tabs.findIndex((t) => t.id === tab);
          if (event.key === "ArrowRight") {
            setTab(tabs[(index + 1) % tabs.length].id);
          } else if (event.key === "ArrowLeft") {
            setTab(tabs[(index - 1 + tabs.length) % tabs.length].id);
          }
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={`admin__tab ${tab === t.id ? "is-on" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "resumen" && (
        <div className="stack" role="tabpanel" id="panel-resumen" aria-labelledby="tab-resumen" tabIndex={0}>
          <div className="metrics">
            {adminMetrics.map((m) => (
              <div key={m.label} className="metric">
                <p className="metric__value">{m.value}</p>
                <p className="metric__label">{m.label}</p>
                <p className="small muted">{m.detail}</p>
              </div>
            ))}
          </div>

          <div>
            <h2>Pedidos recientes</h2>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Comprador</th>
                    <th>Canal</th>
                    <th>Ejemplares</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.buyer}</td>
                      <td>{o.channel}</td>
                      <td>{o.items}</td>
                      <td>{mxn(o.total)}</td>
                      <td>
                        <span className="badge badge--outline">{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "catalogo" && (
        <div className="stack" role="tabpanel" id="panel-catalogo" aria-labelledby="tab-catalogo" tabIndex={0}>
          <div className="section-head">
            <div>
              <h2>Catálogo</h2>
              <p>{books.length} títulos publicados en la tienda.</p>
            </div>
            <span className="btn btn--sm" aria-disabled="true">
              Nuevo título
            </span>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Nivel</th>
                  <th>Disciplina</th>
                  <th>Colección</th>
                  <th>ISBN</th>
                  <th>Precio</th>
                  <th>Digital</th>
                </tr>
              </thead>
              <tbody>
                {books.slice(0, 18).map((b) => (
                  <tr key={b.id}>
                    <td>{b.title}</td>
                    <td>{levelLabel[b.level]}</td>
                    <td>{b.subject}</td>
                    <td>{b.collection}</td>
                    <td>{isbnLabel(b)}</td>
                    <td>{mxn(b.price)}</td>
                    <td>{b.digital ? "Sí" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small muted">Vista recortada a 18 registros para la muestra.</p>
        </div>
      )}

      {tab === "pedidos" && (
        <div className="stack" role="tabpanel" id="panel-pedidos" aria-labelledby="tab-pedidos" tabIndex={0}>
          <h2>Pedidos</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Fecha</th>
                  <th>Comprador</th>
                  <th>Canal</th>
                  <th>Estado</th>
                  <th>Ejemplares</th>
                  <th>Total</th>
                  <th>Entidad</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.date}</td>
                    <td>{o.buyer}</td>
                    <td>{o.channel}</td>
                    <td>
                      <span className="badge badge--outline">{o.status}</span>
                    </td>
                    <td>{o.items}</td>
                    <td>{mxn(o.total)}</td>
                    <td>{o.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "escuelas" && (
        <div className="stack" role="tabpanel" id="panel-escuelas" aria-labelledby="tab-escuelas" tabIndex={0}>
          <h2>Escuelas</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Escuela</th>
                  <th>Ciudad</th>
                  <th>Nivel</th>
                  <th>Alumnos</th>
                  <th>Contacto</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.city}</td>
                    <td>{s.level}</td>
                    <td>{s.students}</td>
                    <td>{s.contact}</td>
                    <td>
                      <span className="badge badge--outline">{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "distribuidores" && (
        <div className="stack" role="tabpanel" id="panel-distribuidores" aria-labelledby="tab-distribuidores" tabIndex={0}>
          <h2>Distribuidores</h2>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Distribuidor</th>
                  <th>Región</th>
                  <th>Entidades</th>
                  <th>Pedidos activos</th>
                  <th>Descuento</th>
                </tr>
              </thead>
              <tbody>
                {distributors.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.region}</td>
                    <td>{d.states}</td>
                    <td>{d.activeOrders}</td>
                    <td>{d.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
