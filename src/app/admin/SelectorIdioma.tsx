import { cambiarIdioma } from "@/app/admin/acciones";
import type { IdiomaPanel } from "@/app/admin/textos";

/** Botón ES / EN del panel. */
export default function SelectorIdioma({ idioma, etiqueta }: { idioma: IdiomaPanel; etiqueta: string }) {
  return (
    <form action={cambiarIdioma} aria-label={etiqueta} className="flex overflow-hidden rounded-full border border-tinta/25 text-[0.75rem]">
      {(["es", "en"] as const).map((opcion) => (
        <button
          key={opcion}
          type="submit"
          name="idioma"
          value={opcion}
          aria-pressed={idioma === opcion}
          className={`px-3 py-1.5 uppercase ${idioma === opcion ? "bg-laca text-papel" : "text-tinta hover:bg-papel"}`}
        >
          {opcion}
        </button>
      ))}
    </form>
  );
}
