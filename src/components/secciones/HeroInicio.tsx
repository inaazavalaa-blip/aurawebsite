"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { MarcoArco } from "@/components/ornamentos/Marcos";
import PanDeOro from "@/components/three/PanDeOroLazy";
import { BotonPrincipal, Flecha, IconoWhatsApp } from "@/components/ui";
import { whatsappUrl, type Categoria } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroInicio({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMarco = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const mujer = cat.slug === "mujer";

  return (
    <section ref={ref} className="relative overflow-hidden bg-hero text-hero-fg">
      {!mujer && <FondoKlimt variante="mosaico" opacidad={0.08} />}
      <PanDeOro cantidad={60} className="absolute inset-0 z-10" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-12 md:px-10 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <div className="relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="versalitas"
          >
            {cat.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
            className="titulo mt-8 text-[clamp(3rem,6.6vw,6.2rem)]"
          >
            {cat.hero.titulo}
            <em className={`mt-2 block ${mujer ? "text-tinta" : "texto-dorado"}`}>{cat.hero.enfasis}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="mt-8 max-w-md text-[1.02rem] leading-[1.8] opacity-85"
          >
            {cat.hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <BotonPrincipal
              href={whatsappUrl(t.wa.empezar(cat.label))}
              externo
              variante={mujer ? "laca" : "oro"}
            >
              <IconoWhatsApp className="h-4 w-4" />
              {t.inicio.empezar}
            </BotonPrincipal>
            <Link
              href={ruta(lang, cat.slug, "transformacion")}
              className="group inline-flex items-center gap-3 border-b border-current/40 pb-1 text-[0.8rem] tracking-[0.14em] uppercase hover:border-current"
            >
              {t.inicio.verTransformacion} <Flecha />
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div
            style={{ y: yMarco }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(-15% -10% -10% -10%)" }}
            transition={{ duration: 1.5, ease, delay: 0.5 }}
          >
            <MarcoArco className="aspect-[3/4] w-full">
              <Image
                src={cat.hero.imagen.src}
                alt={cat.hero.imagen.alt}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
            </MarcoArco>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
