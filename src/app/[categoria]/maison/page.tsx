import type { Metadata } from "next";
import Image from "next/image";
import Gabinete from "@/components/Gabinete";
import Reveal from "@/components/Reveal";
import { Ramo } from "@/components/ornamentos/Botanica";
import { BesoRodin } from "@/components/ornamentos/Curiosidades";
import { FondoKlimt } from "@/components/ornamentos/Klimt";
import { Destello, MarcoArco } from "@/components/ornamentos/Marcos";
import { CitaKlimt, contenedor, LlamadoFinal } from "@/components/secciones/Comunes";
import { Encabezado } from "@/components/ui";
import { categorias, imagenes, type CategoriaSlug } from "@/content/categorias";

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categorias[(await params).categoria as CategoriaSlug];
  return { title: `La Maison · ${cat.label}`, description: "La historia, la filosofía y las inspiraciones de Aura." };
}

const valores = [
  { titulo: "Autenticidad", texto: "No te convertimos en otra persona: revelamos la mejor versión de quien ya eres." },
  { titulo: "Elegancia fresca", texto: "Sofisticación con alegría, color y juventud. Nada rígido, nada de disfraz." },
  { titulo: "Cambio integral", texto: "Cabello, rostro, color, silueta y armario, pensados como un solo proyecto." },
];

export default async function Maison({ params }: Props) {
  const cat = categorias[(await params).categoria as CategoriaSlug];

  return (
    <>
      <section className="relative overflow-hidden bg-papel">
        <div className={`${contenedor} grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1fr_1.1fr]`}>
          <Reveal className="relative mx-auto w-full max-w-[440px]">
            <MarcoArco cresta className="aspect-[3/4]">
              <Image src={imagenes.versalles.src} alt={imagenes.versalles.alt} fill priority sizes="440px" className="object-cover" />
            </MarcoArco>
            <Ramo className="pointer-events-none absolute -bottom-10 -left-14 w-[40%]" />
          </Reveal>
          <Reveal delay={150}>
            <p className="versalitas flex items-center gap-3 text-oro">
              <Destello className="h-3 w-3" /> La Maison
            </p>
            <h1 className="titulo mt-6 text-[clamp(3rem,6.6vw,6rem)]">
              Donde la elegancia <em className="text-oro">se vuelve tuya.</em>
            </h1>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.85] text-suave">
              Aura nació de una idea sencilla: verte bien cambia la forma en que vives. Nos inspira el barroco francés,
              el oro de Klimt y la frescura de un jardín en flor, y lo traducimos a una imagen moderna, juvenil y
              sofisticada que te representa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel-2">
        <div className={`${contenedor} py-24 md:py-32`}>
          <Reveal>
            <Encabezado eyebrow="Gabinete de curiosidades">
              Lo que nos inspira, <em className="text-oro">en una vitrina.</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <Gabinete />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-laca text-papel">
        <FondoKlimt variante="ojos" opacidad={0.12} />
        <div className={`${contenedor} relative grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1fr_1.1fr]`}>
          <Reveal className="mx-auto w-full max-w-[320px]">
            <MarcoArco className="aspect-[3/4]">
              <Image src={imagenes.klimt.src} alt={imagenes.klimt.alt} fill sizes="320px" className="object-cover object-[50%_25%]" />
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
            <Encabezado eyebrow="Dos besos">
              El oro y el mármol, <em className="texto-dorado">tu imagen y tu esencia.</em>
            </Encabezado>
            <p className="mt-6 leading-[1.85] text-papel/75">
              Klimt pintó un abrazo en pan de oro; Rodin lo esculpió en mármol francés. Para nosotros, una imagen
              lograda es eso: el encuentro entre cómo te ven y quién eres. Cuando ambos se abrazan, aparece tu aura.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} py-24 md:py-28`}>
          <div className="grid gap-10 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 120} className="border-t border-oro/50 pt-6">
                <p className="titulo text-5xl italic text-oro">{["I", "II", "III"][i]}</p>
                <h3 className="titulo mt-4 text-3xl">{v.titulo}</h3>
                <p className="mt-3 leading-relaxed text-suave">{v.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CitaKlimt />
      <LlamadoFinal cat={cat} />
    </>
  );
}
