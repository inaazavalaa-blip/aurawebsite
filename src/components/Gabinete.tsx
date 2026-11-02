"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Guirnalda } from "@/components/ornamentos/Botanica";
import { BesoRodin, Busto, Camafeo, FrascoPerfume, SagradoCorazon } from "@/components/ornamentos/Curiosidades";
import { EspejoCuadrilobulo, EspejoSol } from "@/components/ornamentos/Marcos";
import { imagenes } from "@/content/categorias";

type Objeto = { id: string; nombre: string; origen: string; texto: string; dibujo: ReactNode };

const objetos: Objeto[] = [
  {
    id: "versalles",
    nombre: "El espejo sol",
    origen: "Versalles",
    texto:
      "Los espejos dorados de Versalles nos recuerdan que verse es un ritual. En Aura, cada cambio empieza frente a un espejo: el que te devuelve tu mejor versión.",
    dibujo: (
      <EspejoSol className="w-full">
        <Image src={imagenes.versalles.src} alt="" fill sizes="160px" className="object-cover" />
      </EspejoSol>
    ),
  },
  {
    id: "klimt",
    nombre: "El pan de oro",
    origen: "Klimt, El beso",
    texto:
      "Oro, mosaicos y un prado de flores: Klimt nos enseñó que lo sofisticado también puede ser alegre. Por eso nuestro oro siempre va acompañado de color.",
    dibujo: (
      <EspejoCuadrilobulo className="w-full">
        <Image src={imagenes.klimt.src} alt="" fill sizes="160px" className="object-cover object-[50%_30%]" />
      </EspejoCuadrilobulo>
    ),
  },
  {
    id: "rodin",
    nombre: "El abrazo de mármol",
    origen: "Rodin, Le Baiser",
    texto:
      "La escultura francesa de Rodin habla de cercanía. Así trabajamos: una asesoría íntima, a tu lado, sin juicios y con mucho cuidado.",
    dibujo: <BesoRodin className="w-full" />,
  },
  {
    id: "flora",
    nombre: "El frasco amarillo",
    origen: "Un jardín embotellado",
    texto:
      "Amarillo luminoso, tapa dorada y flores pintadas: la frescura que buscamos en cada look. Elegante, sí; solemne, nunca.",
    dibujo: <FrascoPerfume className="mx-auto w-[70%]" />,
  },
  {
    id: "busto",
    nombre: "El busto y las perlas",
    origen: "El detalle",
    texto:
      "Un collar bien elegido cambia un look entero. Cuidamos los accesorios, el escote y cada detalle que enmarca tu rostro.",
    dibujo: <Busto className="mx-auto w-[80%]" />,
  },
  {
    id: "corazon",
    nombre: "El sagrado corazón",
    origen: "La pasión",
    texto:
      "Hacemos esto con el corazón. Detrás de cada transformación hay una historia, y la tuya merece ser contada con orgullo.",
    dibujo: <SagradoCorazon className="mx-auto w-[80%]" />,
  },
];

/** Gabinete de curiosidades: las inspiraciones de la marca, como un escaparate de anticuario. */
export default function Gabinete() {
  const [activo, setActivo] = useState(objetos[0]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <div className="relative overflow-hidden rounded-t-[999px] bg-laca px-5 pb-6 pt-24 shadow-[inset_0_0_0_6px_#b8892e,inset_0_0_0_10px_#141210,inset_0_0_0_12px_#d9b45a]">
        <Guirnalda className="absolute inset-x-0 top-14 h-10 w-full opacity-90" />
        <div className="grid grid-cols-3 gap-x-4">
          {objetos.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setActivo(o)}
              onMouseEnter={() => setActivo(o)}
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
        <Camafeo className="mx-auto mt-6 w-10 opacity-80" />
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
