import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Guirnalda } from "@/components/ornamentos/Botanica";
import { Encabezado } from "@/components/ui";
import Vitrina from "@/components/vitrina/Vitrina";
import { LlamadoFinal } from "@/components/secciones/Comunes";
import { categorias, type CategoriaSlug } from "@/content/categorias";

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categorias[(await params).categoria as CategoriaSlug];
  return {
    title: `La Vitrina · ${cat.label}`,
    description: "Arma outfits con piezas ordenadas por color y descubre ideas para cada ocasión.",
  };
}

export default async function VitrinaPage({ params }: Props) {
  const cat = categorias[(await params).categoria as CategoriaSlug];
  return (
    <>
      <section className="bg-papel">
        <Guirnalda className="h-12 w-full" />
        <Reveal className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center">
          <Encabezado eyebrow="La Vitrina" centrado>
            Un muro de color <em className="text-oro">para inspirarte.</em>
          </Encabezado>
          <p className="mx-auto mt-6 max-w-xl leading-[1.8] text-suave">
            Inspirado en las vitrinas de las grandes maisons: cientos de piezas ordenadas como un degradado. Elige un
            outfit sugerido o toca cada pieza para probarla en el maniquí.
          </p>
        </Reveal>
      </section>
      <Vitrina cat={cat} />
      <LlamadoFinal cat={cat} />
    </>
  );
}
