import MetodoAura from "@/components/MetodoAura";
import Reveal from "@/components/Reveal";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { contenedor } from "@/components/secciones/Comunes";
import { BotonPrincipal, Flecha } from "@/components/ui";
import type { Categoria } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Metodo({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const d = dic(lang);
  const t = d.metodo;
  const mujer = cat.slug === "mujer";

  return (
    <>
      <section className="relative overflow-hidden bg-hero text-hero-fg">
        {!mujer && <FondoKlimt variante="mosaico" opacidad={0.07} />}
        <div className={`${contenedor} relative py-14 md:py-20`}>
          <Reveal className="max-w-5xl">
            <p className="versalitas">{t.eyebrow}</p>
            <h1 className="titulo mt-6 text-[clamp(3rem,7vw,6.2rem)]">
              {t.titulo} <em className={mujer ? "" : "texto-dorado"}>{t.enfasis}</em>
            </h1>
            <p className="mt-8 max-w-xl text-[1.02rem] leading-[1.8] opacity-85">{t.texto}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} py-16 md:py-24`}>
          <MetodoAura
            areas={cat.areas}
            t={{
              areasAria: t.areasAria,
              trabajamos: t.trabajamos,
              ilustrativo: d.comunes.ilustrativo,
              aviso: t.aviso,
              anterior: t.anterior,
              siguiente: t.siguiente,
            }}
          />
        </div>
      </section>

      <section className="bg-laca text-papel">
        <div className={`${contenedor} flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20`}>
          <Reveal>
            <h2 className="titulo text-[clamp(2rem,4vw,3.4rem)]">
              {t.cierreTitulo} <em className="texto-dorado">{t.cierreEnfasis}</em>
            </h2>
            <p className="mt-4 max-w-lg text-papel/70">{t.cierreTexto}</p>
          </Reveal>
          <Reveal delay={120} className="shrink-0">
            <BotonPrincipal href={ruta(lang, cat.slug, "servicios")} variante="oro">
              {t.cierreBoton} <Flecha />
            </BotonPrincipal>
          </Reveal>
        </div>
      </section>
    </>
  );
}
