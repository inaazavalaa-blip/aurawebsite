"use client";

import { useState, type FormEvent } from "react";
import { IconoWhatsApp } from "@/components/ui";
import { enlaces, whatsappUrl, type Categoria } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

const campo =
  "w-full border-b border-tinta/25 bg-transparent py-3 outline-none transition-colors placeholder:text-suave/60 focus:border-oro";

export default function FormularioReserva({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).reserva;
  const [enviado, setEnviado] = useState(false);

  function mensaje(form: HTMLFormElement) {
    const d = new FormData(form);
    const valor = (k: string) => String(d.get(k) ?? "");
    return t.mensaje({
      nombre: valor("nombre"),
      cat: cat.label,
      servicio: valor("servicio"),
      modalidad: valor("modalidad"),
      fecha: valor("fecha"),
      cambio: valor("mensaje"),
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(whatsappUrl(mensaje(e.currentTarget)), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  function porCorreo(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    window.location.href = `mailto:${enlaces.email}?subject=${encodeURIComponent(t.asunto(cat.label))}&body=${encodeURIComponent(mensaje(form))}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="versalitas text-[0.6rem] text-suave">{t.nombre}</span>
        <input name="nombre" required autoComplete="name" placeholder={t.nombrePh} className={campo} />
      </label>
      <label>
        <span className="versalitas text-[0.6rem] text-suave">{t.servicio}</span>
        <select name="servicio" required defaultValue="" className={campo}>
          <option value="" disabled>
            {t.servicioPh}
          </option>
          {cat.paquetes.map((p) => (
            <option key={p.nombre}>{p.nombre}</option>
          ))}
          <option>{t.noSe}</option>
        </select>
      </label>
      <label>
        <span className="versalitas text-[0.6rem] text-suave">{t.fecha}</span>
        <input name="fecha" type="date" className={campo} />
      </label>
      <fieldset className="sm:col-span-2">
        <legend className="versalitas text-[0.6rem] text-suave">{t.modalidad}</legend>
        <div className="mt-3 flex gap-6">
          {t.modalidades.map((m, i) => (
            <label key={m} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="modalidad" value={m} defaultChecked={i === 0} className="accent-[var(--oro)]" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="sm:col-span-2">
        <span className="versalitas text-[0.6rem] text-suave">{t.cambiar}</span>
        <textarea name="mensaje" rows={3} placeholder={t.cambiarPh} className={`${campo} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-full bg-[#1f7a4d] px-7 py-4 text-[0.75rem] tracking-[0.16em] text-white uppercase transition hover:brightness-110"
        >
          <IconoWhatsApp className="h-4 w-4" /> {t.enviar}
        </button>
        <button
          type="button"
          onClick={porCorreo}
          className="rounded-full border border-tinta/30 px-6 py-4 text-[0.75rem] tracking-[0.16em] uppercase hover:border-tinta"
        >
          {t.correo}
        </button>
      </div>
      {enviado && (
        <p className="text-[0.85rem] text-hoja sm:col-span-2" role="status">
          {t.enviado}
        </p>
      )}
    </form>
  );
}
