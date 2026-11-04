"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from "motion/react";
import Maniqui from "@/components/vitrina/Maniqui";
import PiezaIcono from "@/components/vitrina/PiezaIcono";
import { Destello } from "@/components/ornamentos/Marcos";
import { IconoWhatsApp } from "@/components/ui";
import { whatsappUrl, type Categoria } from "@/content/categorias";
import {
  etiquetaOcasion,
  familias,
  lugarDe,
  ocasiones,
  outfitsDe,
  piezasDe,
  type Lugar,
  type Ocasion,
  type Pieza,
} from "@/content/vitrina";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

const ease = [0.22, 1, 0.36, 1] as const;

/** Un vestido completo ocupa torso y piernas; al revés, una prenda suelta lo quita. */
function conflictos(lugar: Lugar): Lugar[] {
  if (lugar === "cuerpo") return ["torso", "piernas"];
  if (lugar === "torso" || lugar === "piernas") return ["cuerpo"];
  return [];
}

export default function Vitrina({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang);
  const piezas = piezasDe(lang, cat.slug);
  const outfits = outfitsDe(lang, cat.slug);
  const [look, setLook] = useState<Partial<Record<Lugar, Pieza>>>(() => cargar(outfits[0].piezas));
  const [ocasion, setOcasion] = useState<Ocasion>("Oficina");
  const [panelMovil, setPanelMovil] = useState(false);
  const muro = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: muro, offset: ["start center", "end center"] });
  const alturaRiel = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  function cargar(ids: string[]) {
    const nuevo: Partial<Record<Lugar, Pieza>> = {};
    ids.forEach((id) => {
      const p = piezas.find((x) => x.id === id);
      if (p) nuevo[lugarDe[p.tipo]] = p;
    });
    return nuevo;
  }

  function alternar(p: Pieza) {
    const lugar = lugarDe[p.tipo];
    setLook((actual) => {
      const nuevo = { ...actual };
      if (nuevo[lugar]?.id === p.id) {
        delete nuevo[lugar];
        return nuevo;
      }
      conflictos(lugar).forEach((l) => delete nuevo[l]);
      nuevo[lugar] = p;
      return nuevo;
    });
  }

  const seleccion = useMemo(() => Object.values(look).filter(Boolean) as Pieza[], [look]);
  const mensaje = t.wa.look(cat.label, seleccion.map((p) => p.nombre).join(", "));

  const panel = (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[260px] rounded-t-[999px] bg-papel p-4 pt-10 shadow-[inset_0_0_0_1px_var(--linea)]">
        <Maniqui seleccion={seleccion} />
      </div>
      <p className="versalitas mt-6 text-oro">{t.vitrina.tuLook(seleccion.length)}</p>
      <ul className="mt-3 flex max-w-[300px] flex-wrap justify-center gap-1.5">
        {seleccion.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => alternar(p)}
              className="flex items-center gap-1.5 rounded-full border border-linea bg-papel px-3 py-1 text-[0.72rem] hover:border-lirio"
              aria-label={t.vitrina.quitar(p.nombre)}
            >
              <span className="h-2.5 w-2.5 rounded-full border border-tinta/20" style={{ background: p.color }} />
              {p.nombre} ×
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappUrl(mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full bg-laca px-5 py-3 text-[0.7rem] tracking-[0.16em] text-papel uppercase ${
            seleccion.length === 0 ? "pointer-events-none opacity-40" : ""
          }`}
        >
          <IconoWhatsApp className="h-4 w-4" /> {t.vitrina.pedir}
        </a>
        <button
          type="button"
          onClick={() => setLook({})}
          className="rounded-full border border-tinta/25 px-5 py-3 text-[0.7rem] tracking-[0.16em] uppercase hover:border-tinta"
        >
          {t.vitrina.vaciar}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Outfits sugeridos por ocasión */}
      <section className="bg-papel">
        <div className="mx-auto max-w-[1440px] px-5 pb-12 md:px-10">
          <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label={t.vitrina.ocasionesAria}>
              {ocasiones.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="tab"
                  aria-selected={o === ocasion}
                  onClick={() => setOcasion(o)}
                  className="relative rounded-full px-5 py-2.5 text-[0.75rem] tracking-[0.14em] uppercase"
                >
                  {o === ocasion && (
                    <motion.span layoutId="ocasion" className="absolute inset-0 rounded-full bg-laca" transition={{ duration: 0.5, ease }} />
                  )}
                  <span className={`relative ${o === ocasion ? "text-papel" : ""}`}>{etiquetaOcasion[lang][o]}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {outfits
                .filter((o) => o.ocasion === ocasion)
                .map((o, i) => (
                  <motion.article
                    key={o.nombre}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                    className="flex min-w-0 flex-col gap-5 rounded-[2rem] border border-oro/40 bg-papel-2 p-6 sm:flex-row sm:items-center"
                  >
                    <div className="flex h-24 min-w-0 flex-1 items-end gap-2">
                      {o.piezas.map((id) => {
                        const p = piezas.find((x) => x.id === id);
                        return p ? <PiezaIcono key={id} tipo={p.tipo} color={p.color} titulo={p.nombre} className="h-full max-h-24 min-w-0 flex-1" /> : null;
                      })}
                    </div>
                    <div className="shrink-0 sm:w-44">
                      <h3 className="titulo text-2xl italic">{o.nombre}</h3>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-suave">{o.nota}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setLook(cargar(o.piezas));
                          setPanelMovil(true);
                        }}
                        className="versalitas mt-3 text-oro hover:text-tinta"
                      >
                        {t.vitrina.probar}
                      </button>
                    </div>
                  </motion.article>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* El muro: pisos de color como bajando una escalera */}
      <section className="relative bg-papel-2">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:px-10 lg:grid-cols-[auto_1fr_340px]">
          {/* Riel de color: indica en qué piso vas */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 h-[60svh] w-2 overflow-hidden rounded-full">
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(${familias.map((f) => f.fondo).join(",")})` }}
              />
              <motion.div style={{ height: alturaRiel }} className="dorado absolute inset-x-0 top-0" />
            </div>
          </div>

          <div ref={muro} className="space-y-6">
            {familias.map((f) => {
              const delPiso = piezas.filter((p) => p.familia === f.id);
              if (delPiso.length === 0) return null;
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.9, ease }}
                  className="overflow-hidden rounded-[1.5rem] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.6)]"
                  style={{ background: f.fondo, color: f.texto }}
                >
                  <div className="flex items-baseline justify-between px-6 pt-5">
                    <h3 className="titulo text-3xl italic">{f.nombre}</h3>
                    <span className="versalitas text-[0.6rem] opacity-60">{t.vitrina.piezas(delPiso.length)}</span>
                  </div>
                  <ul className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5">
                    {delPiso.map((p, i) => {
                      const activa = look[lugarDe[p.tipo]]?.id === p.id;
                      return (
                        <motion.li
                          key={p.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease, delay: (i % 5) * 0.06 }}
                          className="border-b-2 border-white/70"
                        >
                          <button
                            type="button"
                            onClick={() => alternar(p)}
                            aria-pressed={activa}
                            className={`group flex h-full w-full flex-col items-center gap-2 px-3 pb-3 pt-5 transition-colors ${
                              activa ? "bg-white/55" : "hover:bg-white/35"
                            }`}
                          >
                            <span className="relative grid h-24 w-full place-items-center">
                              <PiezaIcono
                                tipo={p.tipo}
                                color={p.color}
                                className="max-h-24 max-w-[78%] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                              />
                              {activa && (
                                <motion.span
                                  layoutId={`marca-${p.id}`}
                                  className="absolute right-1 top-0"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <Destello className="h-4 w-4" />
                                </motion.span>
                              )}
                            </span>
                            <span className="text-center text-[0.72rem] leading-tight">{p.nombre}</span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Maniquí fijo en escritorio */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">{panel}</div>
          </aside>
        </div>
      </section>

      {/* Panel móvil */}
      <button
        type="button"
        onClick={() => setPanelMovil(true)}
        className="fixed bottom-5 left-5 z-[55] flex items-center gap-2 rounded-full bg-laca px-5 py-4 text-[0.7rem] tracking-[0.16em] text-papel uppercase shadow-xl lg:hidden"
      >
        {t.vitrina.tuLookCorto(seleccion.length)}
      </button>
      <AnimatePresence>
        {panelMovil && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-end bg-laca/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanelMovil(false)}
          >
            <motion.div
              role="dialog"
              aria-label={t.vitrina.tuLookAria}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88svh] w-full overflow-y-auto rounded-t-[2rem] bg-papel-2 px-5 pb-10 pt-4"
            >
              <button
                type="button"
                onClick={() => setPanelMovil(false)}
                className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-tinta/25"
                aria-label={t.vitrina.cerrar}
              />
              {panel}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
