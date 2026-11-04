import Link from "next/link";
import AntesDespues from "@/components/AntesDespues";
import Reveal from "@/components/Reveal";
import { Cresta, Destello, EspejoCuadrilobulo } from "@/components/ornamentos/Marcos";
import HeroInicio from "@/components/secciones/HeroInicio";
import { CitaKlimt, contenedor, LlamadoFinal, Marquesina, Medallones } from "@/components/secciones/Comunes";
import PiezaIcono from "@/components/vitrina/PiezaIcono";
import { Encabezado, Flecha } from "@/components/ui";
import type { Categoria } from "@/content/categorias";
import { familias, piezasDe } from "@/content/vitrina";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Inicio({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).inicio;
  const piezas = piezasDe(lang, cat.slug);

  return (
    <>
      <HeroInicio lang={lang} cat={cat} />
      <Marquesina palabras={cat.areas.map((a) => a.nombre)} />
      <Medallones lang={lang} cat={cat} />

      {/* Adelanto de La Vitrina: un muro en degradado como el Colorama */}
      <section className="bg-papel-2">
        <div className={`${contenedor} grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.3fr] lg:items-center`}>
          <Reveal>
            <Encabezado eyebrow={t.vitrinaEyebrow}>
              {t.vitrinaTitulo} <em className="text-oro">{t.vitrinaEnfasis}</em>
            </Encabezado>
            <p className="mt-6 max-w-md leading-[1.8] text-suave">{t.vitrinaTexto}</p>
            <Link
              href={ruta(lang, cat.slug, "vitrina")}
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-laca px-7 py-4 text-[0.75rem] tracking-[0.18em] text-papel uppercase"
            >
              {t.vitrinaCta} <Flecha />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <Link
              href={ruta(lang, cat.slug, "vitrina")}
              className="group grid grid-cols-4 gap-1.5 rounded-t-[999px] bg-laca p-3 pt-10"
              aria-label={t.vitrinaAria}
            >
              {familias.map((f) => {
                const delPiso = piezas.filter((x) => x.familia === f.id).slice(0, 3);
                return (
                  <div
                    key={f.id}
                    className="flex aspect-[3/4] flex-col items-center justify-around p-2 transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ background: f.fondo }}
                  >
                    {delPiso.map((x) => (
                      <PiezaIcono key={x.id} tipo={x.tipo} color={x.color} className="h-[24%] max-w-[80%]" />
                    ))}
                  </div>
                );
              })}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Antes y después */}
      <section className="bg-papel">
        <div className={`${contenedor} grid gap-14 py-24 md:py-32 lg:grid-cols-2 lg:items-center`}>
          <Reveal className="order-2 lg:order-1">
            <EspejoCuadrilobulo className="mx-auto w-full max-w-[520px]">
              <AntesDespues lang={lang} pie={t.adPie} />
            </EspejoCuadrilobulo>
          </Reveal>
          <Reveal delay={150} className="order-1 lg:order-2">
            <Encabezado eyebrow={t.adEyebrow}>
              {t.adTitulo} <em className="text-oro">{t.adEnfasis}</em>
            </Encabezado>
            <p className="mt-6 max-w-md leading-[1.8] text-suave">{t.adTexto}</p>
            <Link
              href={ruta(lang, cat.slug, "transformacion")}
              className="group mt-8 inline-flex items-center gap-3 border-b border-tinta/30 pb-1 text-[0.8rem] tracking-[0.14em] uppercase"
            >
              {t.adCta} <Flecha />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Resumen de servicios */}
      <section className="bg-papel-2">
        <div className={`${contenedor} py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow={t.serviciosEyebrow} centrado>
              {t.serviciosTitulo} <em className="text-oro">{t.serviciosEnfasis}</em>
            </Encabezado>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {cat.paquetes.map((p, i) => (
              <Reveal key={p.nombre} delay={i * 120}>
                <Link
                  href={ruta(lang, cat.slug, "servicios")}
                  className={`group relative flex h-full flex-col items-center rounded-t-[999px] border px-8 pb-10 pt-16 text-center transition-transform duration-500 hover:-translate-y-2 ${
                    p.destacado ? "border-oro bg-laca text-papel" : "border-oro/50 bg-papel"
                  }`}
                >
                  <Cresta className="absolute -top-6 w-20" />
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
          <p className="mt-10 flex items-center justify-center gap-3 text-center text-[0.85rem] text-suave">
            <Destello className="h-3 w-3" /> {t.serviciosNota}
          </p>
        </div>
      </section>

      <CitaKlimt lang={lang} />
      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
