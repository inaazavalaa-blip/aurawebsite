"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BesoRodin, Busto } from "@/components/ornamentos/Curiosidades";
import { EspejoCuadrilobulo, EspejoSol } from "@/components/ornamentos/Marcos";
import { imagenes } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic, type Diccionario } from "@/i18n/diccionarios";

type ObjetoId = keyof Diccionario["maison"]["objetos"];

const dibujos: Record<ObjetoId, ReactNode> = {
  versalles: (
    <EspejoSol className="w-full">
      <Image src={imagenes.es.versalles.src} alt="" fill sizes="160px" className="object-cover" />
    </EspejoSol>
  ),
  klimt: (
    <EspejoCuadrilobulo className="w-full">
      <Image src={imagenes.es.klimt.src} alt="" fill sizes="160px" className="object-cover object-[50%_30%]" />
    </EspejoCuadrilobulo>
  ),
  rodin: <BesoRodin className="w-full" />,
  busto: <Busto className="mx-auto w-[80%]" />,
};

const orden: ObjetoId[] = ["versalles", "klimt", "rodin", "busto"];

/** Gabinete de curiosidades: las inspiraciones de la marca, como un escaparate de anticuario. */
export default function Gabinete({ lang }: { lang: Lang }) {
  const textos = dic(lang).maison.objetos;
  const objetos = orden.map((id) => ({ id, ...textos[id], dibujo: dibujos[id] }));
  const [activoId, setActivoId] = useState<ObjetoId>("versalles");
  const activo = objetos.find((o) => o.id === activoId) ?? objetos[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div className="relative overflow-hidden rounded-t-[999px] bg-laca px-5 pb-6 pt-24 shadow-[inset_0_0_0_6px_#b8892e,inset_0_0_0_10px_#141210,inset_0_0_0_12px_#d9b45a]">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-x-4">
          {objetos.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setActivoId(o.id)}
              onMouseEnter={() => setActivoId(o.id)}
              aria-pressed={activo.id === o.id}
              className="group flex flex-col items-center border-b-[3px] border-pan/60 px-2 pb-4 pt-6"
            >
              <span
                className={`block w-full max-w-[150px] transition-transform duration-500 ${
                  activo.id === o.id ? "-translate-y-2 scale-105" : "group-hover:-translate-y-1"
                }`}
              >
                {o.dibujo}
              </span>
              <span className={`versalitas mt-3 text-[0.55rem] ${activo.id === o.id ? "text-flora" : "text-papel/60"}`}>
                {o.origen}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activo.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45 }}
          aria-live="polite"
        >
          <p className="versalitas text-oro">{activo.origen}</p>
          <h3 className="titulo mt-3 text-[clamp(2rem,3.6vw,3.2rem)] italic">{activo.nombre}</h3>
          <p className="mt-6 max-w-md leading-[1.85] text-suave">{activo.texto}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
