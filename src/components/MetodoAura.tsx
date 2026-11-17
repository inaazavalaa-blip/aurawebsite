"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MarcoArco } from "@/components/ornamentos/Marcos";
import type { Area } from "@/content/categorias";

type Textos = {
  areasAria: string;
  trabajamos: string;
  ilustrativo: string;
  aviso: string;
  anterior: string;
  siguiente: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * El Método Aura: cinco áreas numeradas. Al elegir una cambian la imagen,
 * la descripción y la muestra ilustrativa. La URL guarda el área (?area=color)
 * para poder compartirla o enlazarla desde Inicio.
 */
export default function MetodoAura({ areas, t }: { areas: Area[]; t: Textos }) {
  const [indice, setIndice] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const area = areas[indice];

  // Abre el área indicada en la dirección (por ejemplo, desde Inicio).
  useEffect(() => {
    const pedida = new URLSearchParams(window.location.search).get("area");
    const i = areas.findIndex((a) => a.id === pedida);
    if (i > 0) setIndice(i);
  }, [areas]);

  function elegir(i: number, enfocar = false) {
    const n = (i + areas.length) % areas.length;
    setIndice(n);
    const url = new URL(window.location.href);
    url.searchParams.set("area", areas[n].id);
    window.history.replaceState(null, "", url);
    if (enfocar) pestanas.current[n]?.focus();
  }

  function teclas(e: KeyboardEvent) {
    const mover = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (mover) {
      e.preventDefault();
      elegir(indice + mover, true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      elegir(e.key === "Home" ? 0 : areas.length - 1, true);
    }
  }

  return (
    // En celular: pestañas, imagen y descripción. En escritorio: imagen a la izquierda y lo demás a la derecha.
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
      {/* Imagen protagonista */}
      <div className="relative order-2 mx-auto w-full max-w-[340px] lg:sticky lg:top-28 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[520px] lg:self-start">
        <MarcoArco className="aspect-[5/6] w-full lg:aspect-[4/5]">
          <AnimatePresence initial={false}>
            <motion.div
              key={area.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Image
                src={area.imagen.src}
                alt={area.imagen.alt}
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover"
                priority={indice === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-laca/70 to-transparent" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={area.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
              className="titulo absolute bottom-[6%] left-[9%] text-[clamp(4rem,9vw,7rem)] leading-none text-papel"
              aria-hidden
            >
              {area.numeral}
            </motion.p>
          </AnimatePresence>
        </MarcoArco>
        <p className="mt-4 text-center text-[0.72rem] text-suave">{t.aviso}</p>
      </div>

      {/* Navegación entre las cinco áreas */}
      <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
        <div
          role="tablist"
          aria-label={t.areasAria}
          onKeyDown={teclas}
          className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
        >
          {areas.map((a, i) => {
            const activa = i === indice;
            return (
              <button
                key={a.id}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pestana-${a.id}`}
                aria-selected={activa}
                aria-controls="panel-metodo"
                tabIndex={activa ? 0 : -1}
                onClick={() => elegir(i)}
                className={`group relative shrink-0 snap-start border-t px-1 pb-2 pt-4 text-left transition-colors ${
                  activa ? "border-oro" : "border-tinta/15 hover:border-tinta/40"
                }`}
              >
                {activa && <motion.span layoutId="metodo-activo" className="absolute inset-x-0 -top-px h-0.5 bg-oro" />}
                <span className={`titulo block text-2xl ${activa ? "text-oro" : "text-tinta/40 group-hover:text-tinta/70"}`}>
                  {a.numeral}
                </span>
                <span className={`mt-1 block whitespace-nowrap pr-3 text-[0.8rem] tracking-[0.06em] ${activa ? "text-tinta" : "text-suave"}`}>
                  {a.nombre}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
        {/* Descripción del área elegida */}
        <div id="panel-metodo" role="tabpanel" aria-labelledby={`pestana-${area.id}`} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="versalitas text-oro">{area.nombre}</p>
              <h2 className="titulo mt-3 text-[clamp(2.2rem,4vw,3.4rem)]">{area.titulo}</h2>
              <p className="mt-6 max-w-xl leading-[1.85] text-suave">{area.texto}</p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="versalitas text-[0.6rem] text-suave">{t.trabajamos}</p>
                  <ul className="mt-4 grid gap-3 border-t border-linea pt-4">
                    {area.trabajamos.map((item) => (
                      <li key={item} className="flex items-baseline gap-3 text-[0.95rem]">
                        <span className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-oro" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Muestra ilustrativa del tipo de recomendación */}
                <figure className="rounded-[1.5rem] border border-oro/40 bg-papel-2 p-5">
                  <figcaption>
                    <span className="versalitas inline-block rounded-full border border-tinta/15 px-2.5 py-1 text-[0.55rem] text-suave">
                      {t.ilustrativo}
                    </span>
                    <span className="titulo mt-3 block text-xl italic">{area.muestra.titulo}</span>
                  </figcaption>
                  {area.muestra.colores && (
                    <div className="mt-4 flex" aria-hidden>
                      {area.muestra.colores.map((c, i) => (
                        <motion.span
                          key={c}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.05 }}
                          className="h-12 flex-1 origin-bottom first:rounded-l-lg last:rounded-r-lg"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {area.muestra.puntos.map((p) => (
                      <li key={p} className="rounded-full bg-papel px-3 py-1.5 text-[0.8rem]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </figure>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => elegir(indice - 1)}
            aria-label={t.anterior}
            className="grid h-11 w-11 place-items-center rounded-full border border-tinta/20 transition-colors hover:border-oro hover:text-oro"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => elegir(indice + 1)}
            aria-label={t.siguiente}
            className="grid h-11 w-11 place-items-center rounded-full border border-tinta/20 transition-colors hover:border-oro hover:text-oro"
          >
            <span aria-hidden>→</span>
          </button>
          <span className="ml-2 text-[0.8rem] tracking-[0.12em] text-suave">
            {area.numeral} / {areas[areas.length - 1].numeral}
          </span>
        </div>
      </div>
    </div>
  );
}
