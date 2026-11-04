import Image from "next/image";
import AntesDespues from "@/components/AntesDespues";
import Reveal from "@/components/Reveal";
import { Ramo } from "@/components/ornamentos/Botanica";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { Destello, EspejoCuadrilobulo, EspejoSol, Marco } from "@/components/ornamentos/Marcos";
import { contenedor, IlustracionArea, LlamadoFinal, Marquesina } from "@/components/secciones/Comunes";
import Maniqui from "@/components/vitrina/Maniqui";
import PiezaIcono from "@/components/vitrina/PiezaIcono";
import { Encabezado } from "@/components/ui";
import { pasosProceso, type Categoria } from "@/content/categorias";
import { piezaPorId, type Pieza } from "@/content/vitrina";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Transformacion({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).transformacion;
  const base = piezaPorId(lang, cat.slug, cat.unaPrenda.base);
  const mujer = cat.slug === "mujer";

  return (
    <>
      {/* Portada */}
      <section className="relative overflow-hidden bg-hero text-hero-fg">
        {!mujer && <FondoKlimt variante="mosaico" opacidad={0.07} />}
        <div className={`${contenedor} relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]`}>
          <Reveal>
            <p className="versalitas flex items-center gap-3">
              <Destello className="h-3 w-3" /> {t.eyebrow}
            </p>
            <h1 className="titulo mt-6 text-[clamp(3rem,7vw,6.4rem)]">
              {t.titulo} <em className={mujer ? "" : "texto-dorado"}>{t.enfasis}</em>
            </h1>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.8] opacity-85">{t.texto}</p>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-[460px]">
            {mujer && <Ramo className="pointer-events-none absolute -bottom-10 -right-12 z-10 w-[42%]" />}
            <EspejoCuadrilobulo>
              <Image src={cat.choix.imagen.src} alt={cat.choix.imagen.alt} fill priority sizes="460px" className="object-cover" />
            </EspejoCuadrilobulo>
          </Reveal>
        </div>
      </section>

      <Marquesina palabras={cat.areas.map((a) => a.nombre)} />

      {/* Capítulos */}
      {cat.areas.map((area, i) => (
        <section key={area.id} id={area.id} className={`scroll-mt-20 ${i % 2 ? "bg-papel-2" : "bg-papel"}`}>
          <div className={`${contenedor} grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20`}>
            <Reveal className={`mx-auto w-full max-w-[440px] ${i % 2 ? "lg:order-2" : ""}`}>
              <Marco tipo={area.marco} cresta={area.marco === "arco"} className={area.marco === "arco" ? "aspect-[4/5]" : ""}>
                <IlustracionArea area={area} cat={cat} />
              </Marco>
            </Reveal>
            <Reveal delay={120}>
              <p className="titulo text-[5rem] leading-none text-oro/80">{area.numeral}</p>
              <p className="versalitas mt-4 text-oro">{area.nombre}</p>
              <h2 className="titulo mt-3 text-[clamp(2.2rem,4vw,3.6rem)]">{area.titulo}</h2>
              <p className="mt-6 max-w-lg leading-[1.85] text-suave">{area.texto}</p>
              <ul className="mt-8 grid gap-3 border-t border-linea pt-6">
                {area.trabajamos.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Destello className="h-3 w-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ))}

      {/* Antes y después */}
      <section className="relative overflow-hidden bg-laca text-papel">
        <FondoKlimt variante="espirales" opacidad={0.18} />
        <div className={`${contenedor} relative py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow={t.adEyebrow} centrado>
              {t.adTitulo} <em className="texto-dorado">{t.adEnfasis}</em>
            </Encabezado>
            <p className="mx-auto mt-6 max-w-xl text-center leading-[1.8] text-papel/70">{t.adTexto}</p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {t.adEtiquetas.map((etiqueta, i) => (
              <Reveal key={etiqueta} delay={i * 120} className="text-center">
                <EspejoCuadrilobulo className="mx-auto w-full max-w-[340px]">
                  <AntesDespues lang={lang} pie={etiqueta} />
                </EspejoCuadrilobulo>
                <p className="titulo mt-6 text-2xl italic">{etiqueta}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Una prenda, tres looks */}
      <section className="bg-papel">
        <div className={`${contenedor} py-24 md:py-32`}>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <Encabezado eyebrow={t.prendaEyebrow}>
                {t.prendaTitulo} <em className="text-oro">{t.prendaEnfasis}</em>
              </Encabezado>
              <p className="mt-6 max-w-sm leading-[1.8] text-suave">{t.prendaTexto(base?.nombre.toLowerCase() ?? "")}</p>
              {base && (
                <EspejoSol className="mt-10 w-48">
                  <div className="grid h-full place-items-center bg-papel p-[18%]">
                    <PiezaIcono tipo={base.tipo} color={base.color} className="w-full" />
                  </div>
                </EspejoSol>
              )}
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {cat.unaPrenda.looks.map((look, i) => {
                const seleccion = look.piezas.map((id) => piezaPorId(lang, cat.slug, id)).filter(Boolean) as Pieza[];
                return (
                  <Reveal key={look.ocasion} delay={i * 120} className="text-center">
                    <div className="mx-auto max-w-[220px] rounded-t-[999px] bg-papel-2 p-4 pt-10">
                      <Maniqui seleccion={seleccion} />
                    </div>
                    <p className="versalitas mt-5 text-oro">{look.ocasion}</p>
                    <p className="titulo mt-1 text-2xl italic">{look.nota}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-flora">
        <div className={`${contenedor} py-24 md:py-28`}>
          <Reveal>
            <Encabezado eyebrow={t.metodoEyebrow} centrado>
              {t.metodoTitulo} <em>{t.metodoEnfasis}</em>
            </Encabezado>
          </Reveal>
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {pasosProceso[lang].map((p, i) => (
              <Reveal as="li" key={p.titulo} delay={i * 110} className="border-t border-tinta/25 pt-6">
                <span className="titulo text-5xl italic">{p.numeral}</span>
                <h3 className="titulo mt-4 text-2xl">{p.titulo}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-tinta/75">{p.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
