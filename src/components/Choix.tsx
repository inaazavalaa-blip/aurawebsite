"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Ramo } from "@/components/ornamentos/Botanica";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { Destello, EspejoSol, MarcoArco } from "@/components/ornamentos/Marcos";
import PanDeOro from "@/components/three/PanDeOroLazy";
import { Flecha } from "@/components/ui";
import { SwitchIdioma } from "@/components/Cabecera";
import { categorias, type CategoriaSlug } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

const ease = [0.22, 1, 0.36, 1] as const;

const lados: { slug: CategoriaSlug; estilo: string }[] = [
  { slug: "mujer", estilo: "bg-flora text-tinta" },
  { slug: "hombre", estilo: "bg-laca text-[#f6eedb]" },
];

export default function Choix({ lang }: { lang: Lang }) {
  const t = dic(lang).choix;
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden md:flex-row">
      {lados.map(({ slug, estilo }, i) => {
        const cat = categorias[lang][slug];
        return (
          <Link
            key={slug}
            href={ruta(lang, slug)}
            className={`group relative flex min-h-[50svh] flex-1 items-center justify-center overflow-hidden px-6 py-14 outline-none md:min-h-svh ${estilo}`}
          >
            {slug === "mujer" ? (
              <Ramo className="pointer-events-none absolute -bottom-10 -left-16 h-[70%] opacity-90 md:h-[85%]" />
            ) : (
              <FondoKlimt variante="mosaico" opacidad={0.07} />
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.4 + i * 0.15 }}
              className="relative z-10 flex items-center gap-6 md:flex-col md:gap-8"
            >
              <MarcoArco className="aspect-[3/4] w-[34vw] max-w-[300px] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03] md:w-[22vw]">
                <Image
                  src={cat.choix.imagen.src}
                  alt={cat.choix.imagen.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 22vw, 34vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </MarcoArco>
              <div className="md:text-center">
                <p className="versalitas opacity-70">{cat.choix.caption}</p>
                <h2 className="titulo mt-3 text-6xl italic md:text-8xl">{cat.label}</h2>
                <span className="versalitas mt-5 inline-flex items-center gap-3 border-b border-current/40 pb-2 transition-colors group-hover:border-oro group-hover:text-oro group-focus-visible:text-oro">
                  {t.entrar} <Flecha />
                </span>
              </div>
            </motion.div>
          </Link>
        );
      })}

      <PanDeOro cantidad={70} className="absolute inset-0 z-20" />

      {/* Medallón central con la firma */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-32 -translate-x-1/2 -translate-y-1/2 md:top-10 md:w-44 md:translate-y-0"
      >
        <EspejoSol>
          <div className="grid h-full place-items-center bg-papel">
            <span className="font-script text-[2rem] leading-none text-tinta md:text-[2.8rem]">Aura</span>
          </div>
        </EspejoSol>
      </motion.div>

      <SwitchIdioma lang={lang} className="absolute right-4 top-4 z-40 bg-papel/90 text-tinta md:right-6 md:top-6" />

      <p className="pointer-events-none absolute inset-x-0 bottom-8 z-30 hidden items-center justify-center gap-4 text-center md:flex">
        <Destello className="h-3 w-3" />
        <span className="titulo rounded-full bg-papel/90 px-6 py-2 text-lg italic text-tinta">{t.pregunta}</span>
        <Destello className="h-3 w-3" />
      </p>
    </main>
  );
}
