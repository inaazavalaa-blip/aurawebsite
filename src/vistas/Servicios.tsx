import Acordeon from "@/components/Acordeon";
import Reveal from "@/components/Reveal";
import { MarcoArco } from "@/components/ornamentos/Marcos";
import { contenedor, LlamadoFinal } from "@/components/secciones/Comunes";
import { Encabezado, IconoWhatsApp } from "@/components/ui";
import { whatsappUrl, type Categoria } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Servicios({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const d = dic(lang);
  const t = d.servicios;

  return (
    <>
      <section className="bg-hero text-hero-fg">
        <div className={`${contenedor} py-16 md:py-24`}>
          <Reveal>
            <p className="versalitas">{t.eyebrow}</p>
            <h1 className="titulo mt-6 text-[clamp(3rem,7vw,6.2rem)]">
              {t.titulo} <em className={cat.slug === "mujer" ? "" : "texto-dorado"}>{t.enfasis}</em>
            </h1>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.8] opacity-85">{t.texto}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-24 md:grid-cols-2 md:items-stretch md:px-10 md:py-32">
          {cat.paquetes.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 120} className={p.destacado ? "lg:-mt-6" : ""}>
              <MarcoArco className="h-full">
                <div className={`flex h-full flex-col px-8 pb-10 pt-24 text-center ${p.destacado ? "bg-laca text-papel" : "bg-papel"}`}>
                  <p className="versalitas text-[0.6rem] text-oro">{p.etiqueta}</p>
                  <h2 className="titulo mt-4 text-[2.1rem]">{p.nombre}</h2>
                  <p className={`mt-4 text-[0.9rem] leading-relaxed ${p.destacado ? "text-papel/75" : "text-suave"}`}>
                    {p.descripcion}
                  </p>
                  <p className="titulo mt-8 text-4xl">{p.usd}</p>
                  <p className="text-[0.75rem] opacity-60">{p.mxn}</p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-current/15 pt-6 text-left text-[0.88rem]">
                    {p.incluye.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="shrink-0 text-oro" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(d.wa.paquete(p.nombre, cat.label))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-10 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-[0.72rem] tracking-[0.16em] uppercase transition ${
                      p.destacado ? "dorado text-laca hover:brightness-110" : "bg-laca text-papel hover:bg-tinta"
                    }`}
                  >
                    <IconoWhatsApp className="h-4 w-4" /> {t.quiero}
                  </a>
                </div>
              </MarcoArco>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-papel-2">
        <div className={`${contenedor} py-20 md:py-28`}>
          <Reveal>
            <Encabezado eyebrow={t.compEyebrow} centrado>
              {t.compTitulo} <em className="text-oro">{t.compEnfasis}</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120} className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-tinta/30">
                  <th className="py-4 font-normal" />
                  {cat.paquetes.map((p) => (
                    <th key={p.nombre} className="titulo px-4 py-4 text-center text-xl font-normal">
                      {p.corto}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.comparativa.map((fila) => (
                  <tr key={fila.rasgo} className="border-b border-linea">
                    <th className="py-4 pr-4 text-[0.92rem] font-normal">{fila.rasgo}</th>
                    {fila.valores.map((v, i) => (
                      <td key={i} className={`px-4 py-4 text-center text-[0.9rem] ${v === "✓" ? "text-oro" : v === "—" ? "text-suave/50" : ""}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} py-20 md:py-28`}>
          <Reveal>
            <Encabezado eyebrow={t.extrasEyebrow} centrado>
              {t.extrasTitulo} <em className="text-oro">{t.extrasEnfasis}</em>
            </Encabezado>
            <p className="mx-auto mt-6 max-w-xl text-center leading-[1.8] text-suave">{t.extrasTexto}</p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.extras.map((extra, i) => (
              <Reveal key={extra.nombre} delay={i * 100} className="flex flex-col rounded-[2rem] border border-oro/40 bg-papel-2 p-7">
                <h3 className="titulo text-2xl">{extra.nombre}</h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-suave">{extra.texto}</p>
                <a
                  href={whatsappUrl(d.wa.extra(extra.nombre, cat.label))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 border-b border-tinta/30 pb-1 text-[0.72rem] tracking-[0.14em] uppercase hover:border-tinta"
                >
                  <IconoWhatsApp className="h-4 w-4" /> {t.extrasBoton}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-papel-2">
        <div className={`${contenedor} grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]`}>
          <Reveal>
            <Encabezado eyebrow={t.faqEyebrow}>
              {t.faqTitulo} <em className="text-oro">{t.faqEnfasis}</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120}>
            <Acordeon items={t.preguntas} />
          </Reveal>
        </div>
      </section>

      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
