import Reveal from "@/components/Reveal";
import { Encabezado } from "@/components/ui";
import VitrinaInteractiva from "@/components/vitrina/Vitrina";
import { LlamadoFinal } from "@/components/secciones/Comunes";
import type { Categoria } from "@/content/categorias";
import type { Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function Vitrina({ lang, cat }: { lang: Lang; cat: Categoria }) {
  const t = dic(lang).vitrina;
  return (
    <>
      <section className="bg-papel">
        <Reveal className="mx-auto max-w-3xl px-5 pb-12 pt-14 text-center">
          <Encabezado eyebrow={t.eyebrow} centrado>
            {t.titulo} <em className="text-oro">{t.enfasis}</em>
          </Encabezado>
          <p className="mx-auto mt-6 max-w-xl leading-[1.8] text-suave">{t.texto}</p>
        </Reveal>
      </section>
      <VitrinaInteractiva lang={lang} cat={cat} />
      <LlamadoFinal lang={lang} cat={cat} />
    </>
  );
}
