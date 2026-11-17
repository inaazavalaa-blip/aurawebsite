import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { MarcoArco } from "@/components/ornamentos/Marcos";
import HeroInicio from "@/components/secciones/HeroInicio";
import { contenedor, LlamadoFinal, Marquesina, MetodoBreve } from "@/components/secciones/Comunes";
import Maniqui from "@/components/vitrina/Maniqui";
import { Encabezado, Flecha } from "@/components/ui";
import type { Categoria } from "@/content/categorias";
import { piezaPorId, type Pieza } from "@/content/vitrina";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Inicio({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const d = dic(lang);
  const t = d.inicio;
  const color = cat.areas.find((a) => a.id === "color");
  const rostro = cat.areas.find((a) => a.id === "rostro");
  const silueta = cat.areas.find((a) => a.id === "silueta");
  const base = piezaPorId(lang, cat.slug, cat.unaPrenda.base);

  return (
    <>
      {/* 1. Propuesta de valor */}
      <HeroInicio lang={lang} cat={cat} />
      <Marquesina palabras={cat.areas.map((a) => a.nombre)} />

      {/* 2. Qué es la asesoría de imagen de Aura */}
      <section className="bg-papel-2">
        <div className={`${contenedor} grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="mx-auto w-full max-w-[380px]">
            <MarcoArco className="aspect-[3/4]">
              <Image src={cat.choix.imagen.src} alt={cat.choix.imagen.alt} fill sizes="380px" className="object-cover" />
            </MarcoArco>
          </Reveal>
          <Reveal delay={150}>
            <Encabezado eyebrow={t.introEyebrow}>
              {t.introTitulo} <em className="text-oro">{t.introEnfasis}</em>
            </Encabezado>
            <p className="mt-6 max-w-xl leading-[1.85] text-suave">{t.introTexto}</p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {t.introPuntos.map((p) => (
                <li key={p} className="rounded-full border border-oro/50 px-4 py-2 text-[0.8rem] tracking-[0.06em]">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 3. El Método Aura, en breve */}
      <MetodoBreve lang={lang} cat={cat} />

      {/* 4. Los dos paquetes */}
      <section className="bg-papel-2">
        <div className={`${contenedor} py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow={t.serviciosEyebrow} centrado>
              {t.serviciosTitulo} <em className="text-oro">{t.serviciosEnfasis}</em>
            </Encabezado>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            {cat.paquetes.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 120}>
                <Link
                  href={ruta(lang, cat.slug, "servicios")}
                  className={`group relative flex h-full flex-col items-center rounded-t-[999px] border px-8 pb-10 pt-16 text-center transition-transform duration-500 hover:-translate-y-2 ${
                    p.destacado ? "border-oro bg-laca text-papel" : "border-oro/50 bg-papel"
                  }`}
                >
                  <p className="versalitas text-[0.6rem] text-oro">{p.etiqueta}</p>
                  <h3 className="titulo mt-4 text-3xl">{p.nombre}</h3>
                  <p className={`mt-4 text-[0.9rem] leading-relaxed ${p.destacado ? "text-papel/75" : "text-suave"}`}>
                    {p.descripcion}
                  </p>
                  <p className="titulo mt-6 text-3xl">{p.usd}</p>
                  <p className="text-[0.75rem] opacity-60">{p.mxn}</p>
                  <span className="versalitas mt-8 inline-flex items-center gap-2 text-oro">
                    {t.verDetalle} <Flecha />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-[0.85rem] text-suave">{t.serviciosNota}</p>
        </div>
      </section>

      {/* 5. Resultados esperados: ejemplos ilustrativos de entregables */}
      <section className="bg-papel">
        <div className={`${contenedor} py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow={t.resultadosEyebrow} centrado>
              {t.resultadosTitulo} <em className="text-oro">{t.resultadosEnfasis}</em>
            </Encabezado>
            <p className="mx-auto mt-6 max-w-xl text-center leading-[1.8] text-suave">{t.resultadosTexto}</p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Entregable titulo={t.entregables[0].titulo} texto={t.entregables[0].texto} sello={d.comunes.ilustrativo} delay={0}>
              <div className="flex h-full items-end gap-1.5">
                {color?.muestra.colores?.map((c, i) => (
                  <span key={c} className="flex-1 rounded-t-full" style={{ background: c, height: `${55 + ((i * 17) % 40)}%` }} />
                ))}
              </div>
            </Entregable>
            <Entregable titulo={t.entregables[1].titulo} texto={t.entregables[1].texto} sello={d.comunes.ilustrativo} delay={120}>
              <ul className="grid h-full content-center gap-2">
                {[...(rostro?.muestra.puntos.slice(0, 2) ?? []), ...(silueta?.muestra.puntos.slice(0, 2) ?? [])].map((p) => (
                  <li key={p} className="rounded-full bg-papel px-3 py-1.5 text-[0.78rem]">
                    {p}
                  </li>
                ))}
              </ul>
            </Entregable>
            <Entregable titulo={t.entregables[2].titulo} texto={t.entregables[2].texto} sello={d.comunes.ilustrativo} delay={240}>
              <div className="relative grid h-full place-items-center">
                <div className="absolute h-full w-[56%] translate-x-5 rotate-6 rounded-md bg-papel shadow-sm" />
                <div className="relative flex h-full w-[56%] flex-col items-center rounded-md bg-papel px-3 pb-3 pt-4 shadow-md">
                  <span className="font-script text-3xl leading-none">Aura</span>
                  <span className="mt-1 text-[0.4rem] tracking-[0.3em] uppercase">Dossier</span>
                  <span className="mt-auto flex w-full gap-0.5">
                    {color?.muestra.colores?.map((c) => <span key={c} className="h-2 flex-1" style={{ background: c }} />)}
                  </span>
                  <span className="mt-2 h-1 w-3/4 rounded bg-tinta/10" />
                  <span className="mt-1.5 h-1 w-1/2 rounded bg-tinta/10" />
                </div>
              </div>
            </Entregable>
          </div>

          {/* Una prenda, tres looks */}
          <div className="mt-20 grid items-center gap-10 rounded-[2rem] bg-papel-2 p-6 md:p-10 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <p className="versalitas text-[0.6rem] text-suave">{d.comunes.ilustrativo}</p>
              <h3 className="titulo mt-3 text-3xl">{t.prendaTitulo}</h3>
              <p className="mt-4 max-w-sm leading-[1.8] text-suave">{t.prendaTexto(base?.nombre.toLowerCase() ?? "")}</p>
            </Reveal>
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {cat.unaPrenda.looks.map((look, i) => {
                const seleccion = look.piezas.map((id) => piezaPorId(lang, cat.slug, id)).filter(Boolean) as Pieza[];
                return (
                  <Reveal key={look.ocasion} delay={i * 120} className="text-center">
                    <div className="mx-auto max-w-[200px] rounded-t-[999px] bg-papel p-3 pt-8">
                      <Maniqui seleccion={seleccion} />
                    </div>
                    <p className="versalitas mt-4 text-[0.6rem] text-oro">{look.ocasion}</p>
                    <p className="titulo mt-1 text-lg italic md:text-xl">{look.nota}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contratar */}
      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}

function Entregable({
  titulo,
  texto,
  sello,
  delay,
  children,
}: {
  titulo: string;
  texto: string;
  sello: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[999px] border border-oro/40 bg-papel-2 px-[14%] pb-6 pt-[18%]">
        {children}
      </div>
      <p className="versalitas mt-5 text-[0.55rem] text-suave">{sello}</p>
      <h3 className="titulo mt-2 text-2xl">{titulo}</h3>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-suave">{texto}</p>
    </Reveal>
  );
}
