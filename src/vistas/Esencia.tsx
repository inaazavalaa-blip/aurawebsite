import Image from "next/image";
import Gabinete from "@/components/Gabinete";
import Reveal from "@/components/Reveal";
import { BesoRodin } from "@/components/ornamentos/Curiosidades";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { MarcoArco } from "@/components/ornamentos/Marcos";
import { CitaKlimt, contenedor, LlamadoFinal } from "@/components/secciones/Comunes";
import { Encabezado } from "@/components/ui";
import { imagenes, type Categoria } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Esencia({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).esencia;
  const img = imagenes[lang];

  return (
    <>
      {/* Nuestra esencia */}
      <section className="relative overflow-hidden bg-papel">
        <div className={`${contenedor} grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr]`}>
          <Reveal className="relative mx-auto w-full max-w-[440px]">
            <MarcoArco className="aspect-[3/4]">
              <Image src={img.versalles.src} alt={img.versalles.alt} fill priority sizes="440px" className="object-cover" />
            </MarcoArco>
          </Reveal>
          <Reveal delay={150}>
            <p className="versalitas text-oro">{t.eyebrow}</p>
            <h1 className="titulo mt-6 text-[clamp(3rem,6.6vw,6rem)]">
              {t.titulo} <em className="text-oro">{t.enfasis}</em>
            </h1>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.85] text-suave">{t.texto}</p>
          </Reveal>
        </div>
      </section>

      {/* Nuestra filosofía: el oro y el mármol */}
      <section className="relative overflow-hidden bg-laca text-papel">
        <FondoKlimt variante="ojos" opacidad={0.12} />
        <div className={`${contenedor} relative grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1fr_1.1fr]`}>
          <Reveal className="mx-auto w-full max-w-[320px]">
            <MarcoArco className="aspect-[3/4]">
              <Image src={img.klimt.src} alt={img.klimt.alt} fill sizes="320px" className="object-cover object-[50%_25%]" />
            </MarcoArco>
            <p className="mt-4 text-center text-[0.7rem] tracking-[0.14em] text-papel/50 uppercase">Gustav Klimt · 1908</p>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[300px]">
            <div className="rounded-t-[999px] bg-papel/95 p-8 pt-14">
              <BesoRodin className="w-full" />
            </div>
            <p className="mt-4 text-center text-[0.7rem] tracking-[0.14em] text-papel/50 uppercase">Auguste Rodin · 1882</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="versalitas text-pan">{t.filosofiaEyebrow}</p>
            <h2 className="titulo mt-5 text-[clamp(2.2rem,3.4vw,3.2rem)]">
              {t.filosofiaTitulo} <em className="texto-dorado">{t.filosofiaEnfasis}</em>
            </h2>
            <p className="mt-6 leading-[1.85] text-papel/80">{t.filosofiaTexto}</p>
            <p className="mt-4 leading-[1.85] text-papel/60">{t.besosTexto}</p>
          </Reveal>
        </div>
      </section>

      {/* Lo que representa Aura */}
      <section className="bg-papel-2">
        <div className={`${contenedor} py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow={t.gabineteEyebrow}>
              {t.gabineteTitulo} <em className="text-oro">{t.gabineteEnfasis}</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <Gabinete lang={lang} />
          </Reveal>
        </div>
      </section>

      {/* Nuestros valores */}
      <section className="bg-papel">
        <div className={`${contenedor} py-24 md:py-28`}>
          <Reveal>
            <Encabezado eyebrow={t.valoresEyebrow} centrado>
              {t.valoresTitulo} <em className="text-oro">{t.valoresEnfasis}</em>
            </Encabezado>
          </Reveal>
          <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {t.valores.map((v, i) => (
              <Reveal as="li" key={v.titulo} delay={i * 100} className="border-t border-oro/50 pt-6">
                <p className="titulo text-4xl italic text-oro">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="titulo mt-4 text-2xl">{v.titulo}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-suave">{v.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Nuestra visión */}
      <section className="bg-papel-2">
        <Reveal className="mx-auto max-w-3xl px-5 py-24 text-center md:py-28">
          <p className="versalitas text-oro">{t.visionEyebrow}</p>
          <h2 className="titulo mt-5 text-[clamp(2.2rem,4.6vw,4rem)]">
            {t.visionTitulo} <em className="text-oro">{t.visionEnfasis}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-[1.85] text-suave">{t.visionTexto}</p>
        </Reveal>
      </section>

      <CitaKlimt lang={lang} />
      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
