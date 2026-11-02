"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Acordeon({ items }: { items: { pregunta: string; respuesta: string }[] }) {
  const [abierto, setAbierto] = useState<number | null>(0);
  return (
    <ul className="border-t border-linea">
      {items.map((it, i) => {
        const activo = abierto === i;
        return (
          <li key={it.pregunta} className="border-b border-linea">
            <button
              type="button"
              aria-expanded={activo}
              onClick={() => setAbierto(activo ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="titulo text-[1.4rem]">{it.pregunta}</span>
              <motion.span animate={{ rotate: activo ? 45 : 0 }} className="text-2xl text-oro">
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {activo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-[1.8] text-suave">{it.respuesta}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
