import type { Metadata } from "next";
import { alternativas, type Lang, type SeccionId } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { parametrosSeccion, resolverSeccion, type ParamsSeccion } from "@/i18n/params";
import type { Categoria } from "@/content/categorias";
import Maison from "@/vistas/Maison";
import Reserva from "@/vistas/Reserva";
import Servicios from "@/vistas/Servicios";
import Transformacion from "@/vistas/Transformacion";
import Vitrina from "@/vistas/Vitrina";

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return parametrosSeccion(params.lang);
}

const vistas: Record<SeccionId, (p: { lang: Lang; cat: Categoria }) => React.ReactNode> = {
  transformacion: Transformacion,
  vitrina: Vitrina,
  servicios: Servicios,
  maison: Maison,
  reserva: Reserva,
};

export async function generateMetadata({ params }: { params: ParamsSeccion }): Promise<Metadata> {
  const { lang, id, cat, seccion } = await resolverSeccion(params);
  const t = dic(lang).meta;
  return {
    title: `${t[seccion]} · ${cat.label}`,
    description: t[`${seccion}Desc`],
    alternates: alternativas(id, seccion),
  };
}

export default async function Page({ params }: { params: ParamsSeccion }) {
  const { lang, cat, seccion } = await resolverSeccion(params);
  const Vista = vistas[seccion];
  return <Vista lang={lang} cat={cat} />;
}
