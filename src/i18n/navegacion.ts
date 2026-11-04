import type { Lang, SeccionId } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

/** Enlaces principales del sitio (sin "Reserva", que tiene su propio botón). */
export function enlacesNav(lang: Lang): { seccion?: SeccionId; label: string }[] {
  const t = dic(lang).nav;
  return [
    { label: t.inicio },
    { seccion: "transformacion", label: t.transformacion },
    { seccion: "vitrina", label: t.vitrina },
    { seccion: "servicios", label: t.servicios },
    { seccion: "maison", label: t.maison },
  ];
}
