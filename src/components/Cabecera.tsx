"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui";
import { categorias, slugs, whatsappUrl, type CategoriaSlug } from "@/content/categorias";
import { analizarRuta, ruta, type Lang, type SeccionId } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { enlacesNav } from "@/i18n/navegacion";

export default function Cabecera({ lang, cat }: { lang: Lang; cat: CategoriaSlug }) {
  const pathname = usePathname();
  const t = dic(lang);
  const { seccion: actual } = analizarRuta(pathname);
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
  }, [abierto]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled ? "bg-papel/92 shadow-[0_1px_0_var(--linea)] backdrop-blur-md" : "bg-papel"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <Link href={ruta(lang, cat)} aria-label={t.nav.inicioAria(categorias[lang][cat].label)} onClick={() => setAbierto(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label={lang === "es" ? "Principal" : "Main"}>
          {enlacesNav(lang).map((p) => {
            const activo = actual === p.seccion;
            return (
              <Link
                key={p.label}
                href={ruta(lang, cat, p.seccion)}
                aria-current={activo ? "page" : undefined}
                className="relative whitespace-nowrap py-2 text-[0.8rem] tracking-[0.08em] transition-colors hover:text-oro"
              >
                {p.label}
                {activo && <motion.span layoutId="nav-activo" className="absolute inset-x-0 -bottom-0.5 h-px bg-oro" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <SwitchCategoria lang={lang} cat={cat} seccion={actual} />
          <SwitchIdioma lang={lang} cat={cat} seccion={actual} />
          <Link
            href={ruta(lang, cat, "reserva")}
            className="dorado rounded-full px-6 py-3 text-[0.72rem] font-medium tracking-[0.18em] text-laca uppercase transition hover:brightness-110"
          >
            {t.nav.reservar}
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={abierto ? t.nav.cerrarMenu : t.nav.abrirMenu}
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          <span className={`h-px w-7 bg-tinta transition-transform ${abierto ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-tinta transition-transform ${abierto ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.nav
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-flora px-6 pb-10 pt-28"
          >
            {[...enlacesNav(lang), { seccion: "reserva" as SeccionId, label: t.nav.reserva }].map((p, i) => (
              <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                <Link
                  href={ruta(lang, cat, p.seccion)}
                  onClick={() => setAbierto(false)}
                  className="titulo block border-b border-tinta/15 py-3 text-4xl"
                >
                  {p.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <SwitchCategoria lang={lang} cat={cat} seccion={actual} />
              <SwitchIdioma lang={lang} cat={cat} seccion={actual} />
              <a
                href={whatsappUrl(t.wa.info(categorias[lang][cat].label))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-laca px-5 py-3 text-[0.72rem] tracking-[0.16em] text-papel uppercase"
              >
                WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function SwitchCategoria({ lang, cat, seccion }: { lang: Lang; cat: CategoriaSlug; seccion?: SeccionId }) {
  return (
    <div className="flex rounded-full border border-tinta/20 p-1 text-[0.65rem] font-medium tracking-[0.2em] uppercase">
      {slugs.map((s) => (
        <Link
          key={s}
          href={ruta(lang, s, seccion)}
          aria-current={s === cat ? "page" : undefined}
          className={`rounded-full px-4 py-2 transition-colors ${s === cat ? "bg-laca text-papel" : "hover:text-oro"}`}
        >
          {categorias[lang][s].label}
        </Link>
      ))}
    </div>
  );
}

/** Enlace a la misma página en el otro idioma. */
export function SwitchIdioma({
  lang,
  cat,
  seccion,
  className = "",
}: {
  lang: Lang;
  cat?: CategoriaSlug;
  seccion?: SeccionId;
  className?: string;
}) {
  const otro: Lang = lang === "es" ? "en" : "es";
  const t = dic(lang).nav;
  return (
    <Link
      href={ruta(otro, cat, seccion)}
      hrefLang={otro}
      lang={otro}
      aria-label={t.idiomaAria}
      title={t.idioma}
      className={`grid h-10 w-10 place-items-center rounded-full border border-tinta/20 text-[0.65rem] font-medium tracking-[0.12em] transition-colors hover:border-oro hover:text-oro ${className}`}
    >
      {t.idiomaCorto}
    </Link>
  );
}
