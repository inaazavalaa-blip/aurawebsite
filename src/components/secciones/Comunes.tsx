import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Guirnalda } from "@/components/ornamentos/Botanica";
import { Busto } from "@/components/ornamentos/Curiosidades";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { Destello, EspejoSol } from "@/components/ornamentos/Marcos";
import PiezaIcono from "@/components/vitrina/PiezaIcono";
import { BotonPrincipal, Encabezado, Flecha, IconoWhatsApp } from "@/components/ui";
import { whatsappUrl, type Area, type Categoria } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export const contenedor = "mx-auto max-w-[1440px] px-5 md:px-10";

export function Marquesina({ palabras, tono = "laca" }: { palabras: string[]; tono?: "laca" | "flora" }) {
  const fila = [...palabras, ...palabras, ...palabras];
  return (
    <div
      className={`overflow-hidden py-5 ${tono === "laca" ? "bg-laca text-papel" : "bg-flora text-tinta"}`}
      aria-label={palabras.join(", ")}
    >
      <div className="marquesina flex w-max items-center" aria-hidden>
        {[...fila, ...fila].map((p, i) => (
          <span key={i} className="flex items-center">
            <span className="titulo px-8 text-[clamp(1.6rem,3vw,2.6rem)] italic">{p}</span>
            <Destello className="h-4 w-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Ilustración o foto que representa cada área de la transformación. */
export function IlustracionArea({ area, cat }: { area: Area; cat: Categoria }) {
  if (area.imagen) {
    return <Image src={area.imagen.src} alt={area.imagen.alt} fill sizes="(min-width: 768px) 30vw, 70vw" className="object-cover" />;
  }
  if (area.id === "color") {
    return (
      <div
        className="h-full w-full"
        style={{
          background:
            "conic-gradient(from 20deg, #d9506b, #f08aa0, #8b6bc8, #5b7fd1, #a9c4e6, #3e8e4e, #9fc7a4, #f3d33b, #d9b45a, #b0653f, #d9506b)",
        }}
      >
        <div className="grid h-full w-full place-items-center">
          <div className="h-[46%] w-[46%] rounded-full bg-papel shadow-inner" />
        </div>
      </div>
    );
  }
  if (area.id === "silueta") {
    return (
      <div className="grid h-full w-full place-items-center bg-papel-2 p-[12%]">
        <Busto className="h-full" collar={cat.slug === "mujer" ? "#f3ede0" : "#d9b45a"} />
      </div>
    );
  }
  const [a, b] = cat.slug === "mujer" ? (["vestido", "#f3d33b"] as const) : (["blazer", "#2f5d46"] as const);
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-papel-2 p-[16%]">
      <PiezaIcono tipo={a} color={b} className="h-full" />
      <PiezaIcono tipo="bolso" color="#1d1b19" className="h-1/2 self-end" />
    </div>
  );
}

export function Medallones({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).comunes;
  return (
    <section className="relative bg-papel">
      <div className={`${contenedor} py-24 md:py-32`}>
        <Reveal>
          <Encabezado eyebrow={t.medallonesEyebrow} centrado>
            {t.medallonesTitulo} <em className="text-oro">{t.medallonesEnfasis}</em>
          </Encabezado>
          <p className="mx-auto mt-6 max-w-xl text-center leading-[1.8] text-suave">{t.medallonesTexto}</p>
        </Reveal>
        <ol className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-5">
          {cat.areas.map((area, i) => (
            <Reveal as="li" key={area.id} delay={i * 90} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
              <Link href={`${ruta(lang, cat.slug, "transformacion")}#${area.id}`} className="group block text-center">
                <EspejoSol className="mx-auto w-full max-w-[220px] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-105">
                  <IlustracionArea area={area} cat={cat} />
                </EspejoSol>
                <p className="titulo mt-4 text-lg text-oro">{area.numeral}</p>
                <h3 className="titulo mt-1 text-2xl">{area.nombre}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-[0.85rem] text-suave">{area.titulo}</p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CitaKlimt({ lang }: { lang: Lang }) {
  const t = dic(lang).comunes;
  return (
    <section className="relative overflow-hidden bg-laca py-28 text-papel md:py-36">
      <FondoKlimt variante="espirales" opacidad={0.35} />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center">
        <Destello className="mx-auto h-6 w-6" />
        <blockquote className="titulo mt-8 text-[clamp(2rem,4.4vw,3.8rem)] italic leading-tight">
          {t.cita}
        </blockquote>
        <p className="versalitas mt-8 text-pan">{t.citaAutor}</p>
      </Reveal>
    </section>
  );
}

export function LlamadoFinal({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang);
  return (
    <section className="relative overflow-hidden bg-flora">
      <Guirnalda className="h-14 w-full" />
      <div className={`${contenedor} grid gap-10 py-20 md:grid-cols-[1.4fr_1fr] md:items-center md:py-28`}>
        <Reveal>
          <h2 className="titulo text-[clamp(2.6rem,6vw,5.4rem)]">
            {t.comunes.llamadoTitulo} <em>{t.comunes.llamadoEnfasis}</em>
          </h2>
          <p className="mt-6 max-w-lg leading-[1.8] text-tinta/80">{t.comunes.llamadoTexto}</p>
        </Reveal>
        <Reveal delay={150} className="flex flex-col items-start gap-4 md:items-end">
          <BotonPrincipal href={whatsappUrl(t.wa.agendar(cat.label))} externo>
            <IconoWhatsApp className="h-4 w-4" />
            {t.comunes.llamadoBoton}
          </BotonPrincipal>
          <Link
            href={ruta(lang, cat.slug, "reserva")}
            className="group inline-flex items-center gap-3 text-[0.8rem] tracking-[0.14em] uppercase"
          >
            {t.comunes.llamadoReserva} <Flecha />
          </Link>
        </Reveal>
      </div>
      <Guirnalda className="h-14 w-full rotate-180" />
    </section>
  );
}
