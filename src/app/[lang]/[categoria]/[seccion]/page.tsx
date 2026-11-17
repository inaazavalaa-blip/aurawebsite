import type { Metadata } from "next";
import { alternativas, type Lang, type SeccionId } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { parametrosSeccion, resolverSeccion, type ParamsSeccion } from "@/i18n/params";
import type { Categoria } from "@/content/categorias";
import Contratar from "@/vistas/Contratar";
import Esencia from "@/vistas/Esencia";
import Metodo from "@/vistas/Metodo";
import Servicios from "@/vistas/Servicios";

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return parametrosSeccion(params.lang);
}

const vistas: Record<SeccionId, (p: { lang: Lang; cat: Categoria }) => React.ReactNode> = {
  servicios: Servicios,
  metodo: Metodo,
  esencia: Esencia,
  contratar: Contratar,
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
