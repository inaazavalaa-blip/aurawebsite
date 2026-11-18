import Image from "next/image";
import Reveal from "@/components/Reveal";
import { contenedor } from "@/components/secciones/Comunes";
import { BotonPrincipal, Flecha } from "@/components/ui";
import { imagenesEsencia, type Categoria } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

/**
 * La Esencia Aura: la filosofía de la marca en cuatro bloques.
 * 1. Portada · 2. Filosofía (tres principios) · 3. Cómo entendemos la imagen · 4. Cierre hacia Servicios.
 */
export default function Esencia({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).esencia;
  const img = imagenesEsencia[lang];
  const retrato = img[cat.slug];

  return (
    <>
      {/* 1. Portada */}
      <section className="bg-papel">
        <div className={`${contenedor} grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-20`}>
          <Reveal>
            <p className="versalitas text-oro">{t.eyebrow}</p>
            <h1 className="titulo mt-6 text-balance text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.08]">
              {t.titulo} <em className="mt-3 block text-oro">{t.enfasis}</em>
            </h1>
            <div className="mt-10 h-px w-24 bg-oro/60" aria-hidden />
            <p className="mt-8 max-w-xl text-[1.02rem] leading-[1.85] text-suave">{t.texto}</p>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border border-oro/50" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-papel-2">
              <Image src={retrato.src} alt={retrato.alt} fill priority sizes="(min-width: 1024px) 460px, 90vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Nuestra filosofía */}
      <section className="bg-papel-2">
        <div className={`${contenedor} grid gap-14 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="versalitas text-oro">{t.filosofiaEyebrow}</p>
            <h2 className="titulo mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]">
              {t.filosofiaTitulo} <em className="block text-oro">{t.filosofiaEnfasis}</em>
            </h2>
          </Reveal>
          <ol className="grid">
            {t.pilares.map((p, i) => (
              <Reveal
                as="li"
                key={p.titulo}
                delay={i * 120}
                className={`grid grid-cols-[4.5rem_1fr] gap-x-6 border-t border-tinta/15 py-10 last:border-b md:grid-cols-[6.5rem_1fr] ${
                  ["", "md:ml-[8%]", "md:ml-[16%]"][i]
                }`}
              >
                <span className="titulo text-[clamp(3rem,6vw,4.8rem)] italic leading-none text-oro/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="titulo text-[clamp(1.8rem,3vw,2.6rem)]">{p.titulo}</h3>
                  <p className="mt-3 max-w-md leading-[1.8] text-suave">{p.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Nuestra forma de entender la imagen */}
      <section className="bg-papel">
        <div className={`${contenedor} grid items-center gap-16 py-24 md:py-32 lg:grid-cols-2 lg:gap-24`}>
          <Reveal className="relative mx-auto w-full max-w-[480px] pb-16 pr-10 lg:order-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-papel-2">
              <Image src={img.espejo.src} alt={img.espejo.alt} fill sizes="(min-width: 1024px) 440px, 85vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 aspect-square w-[42%] overflow-hidden rounded-full border-[6px] border-papel bg-papel-2 shadow-[0_20px_40px_-20px_rgb(20_18_16/0.4)]">
              <Image src={img.textura.src} alt={img.textura.alt} fill sizes="200px" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="versalitas text-oro">{t.imagenEyebrow}</p>
            <h2 className="titulo mt-5 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05]">
              {t.imagenTitulo} <em className="block text-oro">{t.imagenEnfasis}</em>
            </h2>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.85] text-suave">{t.imagenTexto}</p>
          </Reveal>
        </div>
      </section>

      {/* 4. Cierre */}
      <section className="bg-laca text-papel">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:py-32">
          <div className="h-px w-16 bg-pan/70" aria-hidden />
          <h2 className="titulo mt-10 text-balance text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.08]">
            {t.cierreTitulo} <em className="texto-dorado block">{t.cierreEnfasis}</em>
          </h2>
          <BotonPrincipal href={ruta(lang, cat.slug, "servicios")} variante="oro" className="mt-12">
            {t.cierreBoton} <Flecha />
          </BotonPrincipal>
        </Reveal>
      </section>
    </>
  );
}
