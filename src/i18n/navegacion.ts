import type { Lang, SeccionId } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

/** Enlaces principales del sitio (sin "Contratar", que tiene su propio botón). */
export function enlacesNav(lang: Lang): { seccion?: SeccionId; label: string }[] {
  const t = dic(lang).nav;
  return [
    { label: t.inicio },
    { seccion: "servicios", label: t.servicios },
    { seccion: "metodo", label: t.metodo },
    { seccion: "esencia", label: t.esencia },
  ];
}

/** Los cinco enlaces completos, para el menú del celular y el pie de página. */
export function enlacesCompletos(lang: Lang): { seccion?: SeccionId; label: string }[] {
  return [...enlacesNav(lang), { seccion: "contratar", label: dic(lang).nav.contratar }];
}
