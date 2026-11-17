"use client";

import { useState, type FormEvent } from "react";
import type { Pregunta } from "../../textos";
import { guardarCuestionario } from "./acciones";

const campo =
  "mt-2 w-full rounded-xl border border-tinta/15 bg-papel px-4 py-3 outline-none transition-colors placeholder:text-suave/60 focus:border-oro";

type Textos = { opcional: string; guardar: string; guardando: string; guardado: string; error: string };

export default function Cuestionario({
  token,
  preguntas,
  iniciales,
  t,
}: {
  token: string;
  preguntas: Pregunta[];
  iniciales: Record<string, string>;
  t: Textos;
}) {
  const [estado, setEstado] = useState<"listo" | "enviando" | "ok" | "error">("listo");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const datos = Object.fromEntries([...new FormData(e.currentTarget)].map(([k, v]) => [k, String(v)]));
    const r = await guardarCuestionario(token, datos).catch(() => ({ ok: false }));
    setEstado(r.ok ? "ok" : "error");
  }

  return (
    <form onSubmit={enviar} className="mt-8 grid gap-6">
      {preguntas.map((p) => (
        <label key={p.id} className="block">
          <span className="text-[0.95rem]">
            {p.texto} {p.opcional && <span className="text-[0.8rem] text-suave">({t.opcional})</span>}
          </span>
          {p.ayuda && <span className="mt-1 block text-[0.8rem] text-suave">{p.ayuda}</span>}
          {p.larga ? (
            <textarea name={p.id} rows={3} maxLength={2000} required={!p.opcional} defaultValue={iniciales[p.id] ?? ""} className={`${campo} resize-y`} />
          ) : (
            <input name={p.id} maxLength={300} required={!p.opcional} defaultValue={iniciales[p.id] ?? ""} className={campo} />
          )}
        </label>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="rounded-full bg-laca px-7 py-4 text-[0.75rem] tracking-[0.16em] text-papel uppercase transition hover:bg-tinta disabled:opacity-60"
        >
          {estado === "enviando" ? t.guardando : t.guardar}
        </button>
        <p role="status" className={`text-[0.85rem] ${estado === "error" ? "text-lirio" : "text-hoja"}`}>
          {estado === "ok" ? t.guardado : estado === "error" ? t.error : ""}
        </p>
      </div>
    </form>
  );
}
