"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui";
import { categorias, paginas, slugs, whatsappUrl, type CategoriaSlug } from "@/content/categorias";

export default function Cabecera({ cat }: { cat: CategoriaSlug }) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const subruta = pathname.replace(`/${cat}`, "");

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
        <Link href={`/${cat}`} aria-label={`Aura ${categorias[cat].label}, inicio`} onClick={() => setAbierto(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {paginas.map((p) => {
            const activo = subruta === p.ruta;
            return (
              <Link
                key={p.ruta}
                href={`/${cat}${p.ruta}`}
                aria-current={activo ? "page" : undefined}
                className="relative py-2 text-[0.8rem] tracking-[0.08em] transition-colors hover:text-oro"
              >
                {p.label}
                {activo && (
                  <motion.span layoutId="nav-activo" className="absolute inset-x-0 -bottom-0.5 h-px bg-oro" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <SwitchCategoria cat={cat} subruta={subruta} />
          <Link
            href={`/${cat}/reserva`}
            className="dorado rounded-full px-6 py-3 text-[0.72rem] font-medium tracking-[0.18em] text-laca uppercase transition hover:brightness-110"
          >
            Reservar
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
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
            aria-label="Menú móvil"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-flora px-6 pb-10 pt-28"
          >
            {[...paginas, { ruta: "/reserva", label: "Reserva" }].map((p, i) => (
              <motion.div
                key={p.ruta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <Link
                  href={`/${cat}${p.ruta}`}
                  onClick={() => setAbierto(false)}
                  className="titulo block border-b border-tinta/15 py-3 text-4xl"
                >
                  {p.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-auto flex flex-wrap items-center gap-4">
              <SwitchCategoria cat={cat} subruta={subruta} />
              <a
                href={whatsappUrl(`Hola Aura, me gustaría información (${categorias[cat].label}).`)}
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

function SwitchCategoria({ cat, subruta }: { cat: CategoriaSlug; subruta: string }) {
  return (
    <div className="flex rounded-full border border-tinta/20 p-1 text-[0.65rem] font-medium tracking-[0.2em] uppercase">
      {slugs.map((s) => (
        <Link
          key={s}
          href={`/${s}${subruta}`}
          aria-current={s === cat ? "page" : undefined}
          className={`rounded-full px-4 py-2 transition-colors ${s === cat ? "bg-laca text-papel" : "hover:text-oro"}`}
        >
          {categorias[s].label}
        </Link>
      ))}
    </div>
  );
}
