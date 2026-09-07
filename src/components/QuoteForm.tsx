"use client";

import Link from "next/link";
import { useState } from "react";
import QuoteSummary, { type QuoteContext } from "./QuoteSummary";

const profiles = [
  { value: "escuela", label: "Escuela" },
  { value: "distribuidor", label: "Distribuidor" },
  { value: "docente", label: "Docente" },
];

export default function QuoteForm({
  initialProfile = "escuela",
  context,
}: {
  initialProfile?: string;
  context: QuoteContext;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [sent, setSent] = useState(false);
  const suggestedQuantity = context.students ?? context.quantity ?? 30;

  if (sent) {
    return (
      <div className="confirmation">
        <span className="confirmation__mark" aria-hidden="true">
          ✓
        </span>
        <h2>Solicitud registrada</h2>
        <p className="muted">
          Un asesor de Stanford Publishing respondería con la cotización formal y las condiciones de
          la zona. Referencia de seguimiento: <strong>COT-2026-0184</strong>.
        </p>
        <div className="row">
          <Link href="/catalogo" className="btn btn--sm">
            Seguir viendo el catálogo
          </Link>
          <button type="button" className="btn btn--sm btn--ghost" onClick={() => setSent(false)}>
            Enviar otra solicitud
          </button>
        </div>
        <p className="small muted">
          Demostración visual. No se realizará ningún cobro ni se enviará información.
        </p>
      </div>
    );
  }

  return (
    <div className="quote">
      <QuoteSummary context={context} />

      <form
        className="quote-form card"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <fieldset className="quote-form__profiles">
          <legend>¿Quién solicita?</legend>
          <div className="row">
            {profiles.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`toggle ${profile === p.value ? "is-on" : ""}`}
                aria-pressed={profile === p.value}
                onClick={() => setProfile(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="field-row">
          <div className="field">
            <label htmlFor="institucion">
              {profile === "distribuidor" ? "Razón social" : "Nombre de la institución"}
            </label>
            <input id="institucion" name="institucion" required placeholder="Colegio Miguel Hidalgo" />
          </div>
          <div className="field">
            <label htmlFor="contacto">Persona de contacto</label>
            <input id="contacto" name="contacto" required placeholder="Nombre y apellido" />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="correo">Correo</label>
            <input id="correo" name="correo" type="email" required placeholder="compras@escuela.mx" />
          </div>
          <div className="field">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" type="tel" placeholder="443 000 0000" />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="estado">Estado</label>
            <select id="estado" name="estado" defaultValue="Michoacán">
              <option>Michoacán</option>
              <option>Ciudad de México</option>
              <option>Jalisco</option>
              <option>Guanajuato</option>
              <option>Nuevo León</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="alumnos">
              {profile === "distribuidor" ? "Ejemplares estimados" : "Número de alumnos"}
            </label>
            <input
              id="alumnos"
              name="alumnos"
              type="number"
              min={1}
              defaultValue={suggestedQuantity}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="detalle">Comentarios</label>
          <textarea
            id="detalle"
            name="detalle"
            placeholder="Fechas de entrega, facturación, condiciones de pago."
          />
        </div>

        <button type="submit" className="btn btn--institutional">
          Enviar solicitud
        </button>
        <p className="small muted">
          Demostración visual. No se realizará ningún cobro ni se enviará información.
        </p>
      </form>
    </div>
  );
}
