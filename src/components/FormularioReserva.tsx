"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconoWhatsApp } from "@/components/ui";
import { enlaces, whatsappUrl, type Categoria } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { guardarReserva } from "@/lib/guardarReserva";

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

  /** Guarda en segundo plano: si falla, el cliente igual llega a WhatsApp o al correo. */
  function guardar(form: HTMLFormElement) {
    const d = new FormData(form);
    const valor = (k: string) => String(d.get(k) ?? "");
    guardarReserva({
      nombre: valor("nombre"),
      telefono: valor("telefono"),
      correo: valor("correo"),
      categoria: cat.slug,
      idioma: lang,
      servicio: valor("servicio"),
      modalidad: valor("modalidad"),
      fecha: valor("fecha"),
      mensaje: valor("mensaje"),
      consentimiento: d.get("consentimiento") === "on",
      sitio: valor("sitio"),
    }).catch(() => {});
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // WhatsApp debe abrirse primero: si se espera a guardar, el navegador bloquea la ventana.
    window.open(whatsappUrl(mensaje(e.currentTarget)), "_blank", "noopener,noreferrer");
    guardar(e.currentTarget);
    setEnviado(true);
  }

  function porCorreo(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    guardar(form);
    window.location.href = `mailto:${enlaces.email}?subject=${encodeURIComponent(t.asunto(cat.label))}&body=${encodeURIComponent(mensaje(form))}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="versalitas text-[0.6rem] text-suave">{t.nombre}</span>
        <input name="nombre" required maxLength={120} autoComplete="name" placeholder={t.nombrePh} className={campo} />
      </label>
      <label>
        <span className="versalitas text-[0.6rem] text-suave">{t.telefono}</span>
        <input
          name="telefono"
          type="tel"
          required
          autoComplete="tel"
          pattern="[+0-9() \-]{7,30}"
          title={t.telefonoAyuda}
          placeholder={t.telefonoPh}
          className={campo}
        />
      </label>
      <label>
        <span className="versalitas text-[0.6rem] text-suave">{t.correoCampo}</span>
        <input name="correo" type="email" maxLength={200} autoComplete="email" placeholder={t.correoPh} className={campo} />
      </label>
      {/* Trampa para robots: las personas no ven este campo. */}
      <input name="sitio" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />

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
        <textarea name="mensaje" rows={3} maxLength={2000} placeholder={t.cambiarPh} className={`${campo} resize-none`} />
      </label>
      <label className="flex items-start gap-3 text-[0.85rem] text-suave sm:col-span-2">
        <input type="checkbox" name="consentimiento" required className="mt-1 accent-[var(--oro)]" />
        <span>
          {t.acepto}{" "}
          <Link href={lang === "es" ? "/privacidad" : "/en/privacidad"} target="_blank" className="underline hover:text-tinta">
            {t.aviso}
          </Link>
          .
        </span>
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
