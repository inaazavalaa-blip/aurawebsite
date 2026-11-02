"use client";

import { AnimatePresence, motion } from "motion/react";
import PiezaIcono from "@/components/vitrina/PiezaIcono";
import { lugarDe, type Lugar, type Pieza, type TipoPieza } from "@/content/vitrina";

// Posición de cada tipo sobre el maniquí, en % del lienzo (300 × 560).
const posicion: Record<TipoPieza, { top: number; left: number; w: number }> = {
  sombrero: { top: 0.5, left: 27, w: 46 },
  lentes: { top: 8.6, left: 37, w: 26 },
  aretes: { top: 11, left: 36, w: 28 },
  collar: { top: 19.5, left: 36, w: 28 },
  panuelo: { top: 19.5, left: 33, w: 34 },
  corbata: { top: 20.5, left: 45.5, w: 9 },
  mono: { top: 20.2, left: 42, w: 16 },
  blusa: { top: 21, left: 21, w: 58 },
  playera: { top: 21, left: 21, w: 58 },
  camisa: { top: 20.6, left: 21, w: 58 },
  blazer: { top: 20.4, left: 18, w: 64 },
  abrigo: { top: 20.4, left: 18, w: 64 },
  vestido: { top: 20.6, left: 23, w: 54 },
  "vestido-largo": { top: 20.6, left: 20, w: 60 },
  pantalon: { top: 50, left: 30, w: 40 },
  falda: { top: 49, left: 24, w: 52 },
  cinturon: { top: 48.5, left: 30, w: 40 },
  "panuelo-bolsillo": { top: 31, left: 59, w: 9 },
  bolso: { top: 52, left: 72, w: 26 },
  clutch: { top: 56, left: 71, w: 28 },
  reloj: { top: 52, left: 9, w: 8 },
  tacon: { top: 88, left: 33, w: 34 },
  mocasin: { top: 89, left: 33, w: 34 },
  bota: { top: 85, left: 33, w: 32 },
  tenis: { top: 89, left: 33, w: 34 },
  labial: { top: 77, left: 82, w: 7 },
  perfume: { top: 75, left: 79, w: 13 },
};

const capa: Record<Lugar, number> = {
  piernas: 1,
  cuerpo: 2,
  torso: 3,
  cintura: 4,
  capa: 5,
  cuello: 6,
  bolsillo: 7,
  cabeza: 8,
  rostro: 8,
  orejas: 8,
  muneca: 9,
  mano: 9,
  pies: 9,
  belleza: 9,
};

export default function Maniqui({ seleccion, className = "" }: { seleccion: Pieza[]; className?: string }) {
  return (
    <div className={`relative aspect-[300/560] w-full ${className}`}>
      <svg viewBox="0 0 300 560" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="lino-maniqui" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e5dcc7" />
            <stop offset="0.5" stopColor="#f8f2e4" />
            <stop offset="1" stopColor="#dcd2bb" />
          </linearGradient>
          <linearGradient id="oro-maniqui" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6420" />
            <stop offset="0.5" stopColor="#f3dc95" />
            <stop offset="1" stopColor="#8a6420" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="62" rx="30" ry="38" fill="#141210" />
        <rect x="139" y="96" width="22" height="24" fill="#141210" />
        <path
          d="M80 132 C90 120 120 118 150 118 C180 118 210 120 220 132 L210 190 C204 220 192 240 190 262 C196 286 206 306 205 330 H95 C94 306 104 286 110 262 C108 240 96 220 90 190 Z"
          fill="url(#lino-maniqui)"
          stroke="#c9bfa8"
        />
        <path d="M150 122 V328" stroke="#c9bfa8" strokeDasharray="3 4" />
        <rect x="146" y="330" width="8" height="176" fill="url(#oro-maniqui)" />
        <path d="M100 520 C110 504 190 504 200 520 Z" fill="url(#oro-maniqui)" />
      </svg>

      <AnimatePresence>
        {seleccion.map((p) => {
          const pos = posicion[p.tipo];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.6, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute"
              style={{ top: `${pos.top}%`, left: `${pos.left}%`, width: `${pos.w}%`, zIndex: capa[lugarDe[p.tipo]] }}
            >
              <PiezaIcono tipo={p.tipo} color={p.color} className="h-auto w-full drop-shadow-[0_4px_6px_rgb(20_18_16/0.18)]" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
