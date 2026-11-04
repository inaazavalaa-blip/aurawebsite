import type { CategoriaSlug } from "@/content/categorias";

export const idiomas = ["es", "en"] as const;
export type Lang = (typeof idiomas)[number];

export function esIdioma(valor: string): valor is Lang {
  return (idiomas as readonly string[]).includes(valor);
}

export type SeccionId = "transformacion" | "vitrina" | "servicios" | "maison" | "reserva";
export const secciones: SeccionId[] = ["transformacion", "vitrina", "servicios", "maison", "reserva"];

/** Slugs de URL por idioma. Los ids internos siguen en español. */
export const slugsCategoria: Record<Lang, Record<CategoriaSlug, string>> = {
  es: { mujer: "mujer", hombre: "hombre" },
  en: { mujer: "women", hombre: "men" },
};

export const slugsSeccion: Record<Lang, Record<SeccionId, string>> = {
  es: {
    transformacion: "transformacion",
    vitrina: "vitrina",
    servicios: "servicios",
    maison: "maison",
    reserva: "reserva",
  },
  en: {
    transformacion: "transformation",
    vitrina: "showcase",
    servicios: "services",
    maison: "maison",
    reserva: "booking",
  },
};

export function categoriaDesdeSlug(lang: Lang, slug: string): CategoriaSlug | undefined {
  const par = Object.entries(slugsCategoria[lang]).find(([, s]) => s === slug);
  return par?.[0] as CategoriaSlug | undefined;
}

export function seccionDesdeSlug(lang: Lang, slug: string): SeccionId | undefined {
  const par = Object.entries(slugsSeccion[lang]).find(([, s]) => s === slug);
  return par?.[0] as SeccionId | undefined;
}

/**
 * URL pública. El español vive en la raíz (/mujer/vitrina) y el inglés bajo /en
 * (/en/women/showcase); next.config reescribe la raíz hacia el segmento [lang]="es".
 */
export function ruta(lang: Lang, cat?: CategoriaSlug, seccion?: SeccionId) {
  const base = lang === "es" ? "" : "/en";
  if (!cat) return base || "/";
  const camino = `${base}/${slugsCategoria[lang][cat]}`;
  return seccion ? `${camino}/${slugsSeccion[lang][seccion]}` : camino;
}

/** Deduce categoría y sección a partir de la ruta actual (para el selector de idioma). */
export function analizarRuta(pathname: string): { lang: Lang; cat?: CategoriaSlug; seccion?: SeccionId } {
  const partes = pathname.split("/").filter(Boolean);
  const lang: Lang = partes[0] === "en" ? "en" : "es";
  if (partes[0] === "en" || partes[0] === "es") partes.shift();
  const cat = partes[0] ? categoriaDesdeSlug(lang, partes[0]) : undefined;
  const seccion = partes[1] ? seccionDesdeSlug(lang, partes[1]) : undefined;
  return { lang, cat, seccion };
}

export const SITIO = "https://aurawebsite-hazel.vercel.app";

/** Alternativas hreflang para los metadatos de cada página. */
export function alternativas(cat?: CategoriaSlug, seccion?: SeccionId) {
  return {
    languages: {
      es: ruta("es", cat, seccion),
      en: ruta("en", cat, seccion),
      "x-default": ruta("es", cat, seccion),
    },
  };
}
