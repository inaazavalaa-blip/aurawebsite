"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import type { Moneda, Paquete, PaqueteId } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { iniciarPago } from "@/lib/pago";

type Textos = {
  moneda: string;
  acepto: string;
  privacidad: string;
  pagar: string;
  redirigiendo: string;
  seguro: string;
  inactivo: string;
  cancelado: string;
  error: string;
};

/** Elige paquete y moneda y lleva a la página de pago segura de Stripe. */
export default function ContratarEnLinea({
  lang,
  categoria,
  paquetes,
  activo,
  t,
}: {
  lang: Lang;
  categoria: string;
  paquetes: Paquete[];
  activo: boolean;
  t: Textos;
}) {
  const [paquete, setPaquete] = useState<PaqueteId>(paquetes.find((p) => p.destacado)?.id ?? paquetes[0].id);
  const [moneda, setMoneda] = useState<Moneda>("usd");
  const [aviso, setAviso] = useState<string | null>(null);

  // Preselecciona el paquete (?paquete=vip) y muestra avisos al volver de Stripe.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const pedido = paquetes.find((p) => p.id === q.get("paquete"));
    if (pedido) setPaquete(pedido.id);
    if (q.get("pago") === "cancelado") setAviso(t.cancelado);
    if (q.get("pago") === "error") setAviso(t.error);
  }, [paquetes, t.cancelado, t.error]);

  const elegido = paquetes.find((p) => p.id === paquete) ?? paquetes[0];

  return (
    <form action={iniciarPago} className="grid gap-6">
      <input type="hidden" name="idioma" value={lang} />
      <input type="hidden" name="categoria" value={categoria} />
      <input type="hidden" name="paquete" value={paquete} />
      <input type="hidden" name="moneda" value={moneda} />

      <div role="radiogroup" className="grid gap-4 sm:grid-cols-2">
        {paquetes.map((p) => {
          const activoP = p.id === paquete;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={activoP}
              onClick={() => setPaquete(p.id)}
              className={`rounded-[1.5rem] border p-6 text-left transition ${
                activoP ? "border-oro bg-laca text-papel shadow-lg" : "border-tinta/15 bg-papel hover:border-oro/60"
              }`}
            >
              <span className="versalitas text-[0.55rem] text-oro">{p.etiqueta}</span>
              <span className="titulo mt-2 block text-2xl">{p.nombre}</span>
              <span className="titulo mt-4 block text-3xl">{moneda === "usd" ? p.usd : p.mxn}</span>
              <span className={`mt-3 block text-[0.85rem] leading-relaxed ${activoP ? "text-papel/70" : "text-suave"}`}>{p.descripcion}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[0.85rem] text-suave">{t.moneda}</span>
        <div role="radiogroup" className="flex rounded-full border border-tinta/20 p-1 text-[0.7rem] font-medium tracking-[0.16em] uppercase">
          {(["usd", "mxn"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={moneda === m}
              onClick={() => setMoneda(m)}
              className={`rounded-full px-4 py-2 transition-colors ${moneda === m ? "bg-laca text-papel" : "hover:text-oro"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 text-[0.85rem] text-suave">
        <input type="checkbox" name="consentimiento" required className="mt-1 accent-[var(--oro)]" />
        <span>
          {t.acepto}{" "}
          <Link href={lang === "es" ? "/privacidad" : "/en/privacidad"} target="_blank" className="underline hover:text-tinta">
            {t.privacidad}
          </Link>
          .
        </span>
      </label>

      {aviso && (
        <p role="alert" className="rounded-xl bg-papel px-4 py-3 text-[0.85rem]">
          {aviso}
        </p>
      )}

      {activo ? (
        <BotonPagar texto={`${t.pagar} · ${moneda === "usd" ? elegido.usd : elegido.mxn}`} redirigiendo={t.redirigiendo} />
      ) : (
        <p className="rounded-xl border border-oro/40 bg-papel px-4 py-3 text-[0.9rem]">{t.inactivo}</p>
      )}
      <p className="text-[0.8rem] text-suave">{t.seguro}</p>
    </form>
  );
}

function BotonPagar({ texto, redirigiendo }: { texto: string; redirigiendo: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="dorado w-full rounded-full px-7 py-5 text-[0.78rem] font-medium tracking-[0.18em] text-laca uppercase transition hover:brightness-110 disabled:opacity-70 sm:w-fit"
    >
      {pending ? redirigiendo : texto}
    </button>
  );
}
