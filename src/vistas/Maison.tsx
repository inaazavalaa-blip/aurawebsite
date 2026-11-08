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

export default function Maison({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).maison;
  const img = imagenes[lang];

  return (
    <>
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
            <Encabezado eyebrow={t.besosEyebrow}>
              {t.besosTitulo} <em className="texto-dorado">{t.besosEnfasis}</em>
            </Encabezado>
            <p className="mt-6 leading-[1.85] text-papel/75">{t.besosTexto}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} py-24 md:py-28`}>
          <div className="grid gap-10 md:grid-cols-3">
            {t.valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 120} className="border-t border-oro/50 pt-6">
                <p className="titulo text-5xl italic text-oro">{["I", "II", "III"][i]}</p>
                <h3 className="titulo mt-4 text-3xl">{v.titulo}</h3>
                <p className="mt-3 leading-relaxed text-suave">{v.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CitaKlimt lang={lang} />
      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
