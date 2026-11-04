"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Ramo } from "@/components/ornamentos/Botanica";
import type { Imagen } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

type Props = {
  lang: Lang;
  antes?: Imagen;
  despues?: Imagen;
  /** Texto del espacio mientras no haya foto real. */
  pie?: string;
};

/**
 * Comparador antes/después. Sin fotos muestra espacios listos para las fotos
 * reales de clientas y clientes (siempre con su consentimiento).
 */
export default function AntesDespues({ lang, antes, despues, pie = "" }: Props) {
  const t = dic(lang).comunes;
  const [pos, setPos] = useState(50);
  const caja = useRef<HTMLDivElement>(null);
  const arrastrando = useRef(false);

  function mover(clientX: number) {
    const r = caja.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div
      ref={caja}
      className="relative h-full w-full touch-pan-y select-none"
      onPointerDown={(e) => {
        arrastrando.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        mover(e.clientX);
      }}
      onPointerMove={(e) => arrastrando.current && mover(e.clientX)}
      onPointerUp={() => (arrastrando.current = false)}
      onPointerCancel={() => (arrastrando.current = false)}
    >
      {/* Después (fondo) */}
      <div className="absolute inset-0">
        {despues ? (
          <Image src={despues.src} alt={despues.alt} fill sizes="50vw" className="object-cover" />
        ) : (
          <div className="relative h-full overflow-hidden bg-flora">
            <Ramo className="absolute -bottom-4 right-[6%] h-[62%] opacity-90" />
            <span className="versalitas absolute right-[13%] top-[30%] text-[0.6rem]">{t.despues}</span>
          </div>
        )}
      </div>

      {/* Antes (recortado) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {antes ? (
          <Image src={antes.src} alt={antes.alt} fill sizes="50vw" className="object-cover" />
        ) : (
          <div className="relative h-full bg-[#d8d2c6]">
            <span className="versalitas absolute left-[13%] top-[30%] text-[0.6rem] text-tinta/70">{t.antes}</span>
            <span className="absolute inset-x-[16%] bottom-[30%] text-center text-[0.6rem] tracking-[0.14em] text-tinta/60 uppercase">
              {pie}
            </span>
          </div>
        )}
      </div>

      {/* Divisor */}
      <div className="pointer-events-none absolute inset-y-0 w-px bg-papel" style={{ left: `${pos}%` }}>
        <span className="dorado absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-laca shadow-lg">
          ‹ ›
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={t.compararAria}
        className="absolute inset-x-[20%] bottom-[8%] h-6 cursor-ew-resize opacity-0 focus-visible:opacity-100"
      />
    </div>
  );
}
