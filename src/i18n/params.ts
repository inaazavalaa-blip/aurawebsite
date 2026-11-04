import { notFound } from "next/navigation";
import { categorias, slugs, type CategoriaSlug } from "@/content/categorias";
import { categoriaDesdeSlug, esIdioma, idiomas, seccionDesdeSlug, secciones, slugsCategoria, slugsSeccion, type Lang } from "@/i18n/config";

export type ParamsLang = Promise<{ lang: string }>;
export type ParamsCategoria = Promise<{ lang: string; categoria: string }>;
export type ParamsSeccion = Promise<{ lang: string; categoria: string; seccion: string }>;

export function idiomaValido(valor: string): Lang {
  if (!esIdioma(valor)) notFound();
  return valor;
}

/** Traduce los parámetros de la URL a ids internos, o 404 si no existen en ese idioma. */
export async function resolverCategoria(params: ParamsCategoria) {
  const p = await params;
  const lang = idiomaValido(p.lang);
  const id: CategoriaSlug | undefined = categoriaDesdeSlug(lang, p.categoria);
  if (!id) notFound();
  return { lang, id, cat: categorias[lang][id] };
}

export async function resolverSeccion(params: ParamsSeccion) {
  const p = await params;
  const base = await resolverCategoria(Promise.resolve(p));
  const seccion = seccionDesdeSlug(base.lang, p.seccion);
  if (!seccion) notFound();
  return { ...base, seccion };
}

export const parametrosIdioma = () => idiomas.map((lang) => ({ lang }));

export function parametrosCategoria(lang: string) {
  return esIdioma(lang) ? slugs.map((id) => ({ categoria: slugsCategoria[lang][id] })) : [];
}

export function parametrosSeccion(lang: string) {
  return esIdioma(lang) ? secciones.map((s) => ({ seccion: slugsSeccion[lang][s] })) : [];
}
