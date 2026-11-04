import Link from "next/link";
import { FranjaKlimt } from "@/components/ornamentos/Klimt";
import { IconoWhatsApp, Logo } from "@/components/ui";
import { categorias, enlaces, whatsappUrl, type CategoriaSlug } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { enlacesNav } from "@/i18n/navegacion";

export default function Pie({ lang, cat }: { lang: Lang; cat: CategoriaSlug }) {
  const t = dic(lang);
  const otra: CategoriaSlug = cat === "mujer" ? "hombre" : "mujer";
  const otroIdioma: Lang = lang === "es" ? "en" : "es";
  return (
    <footer className="bg-laca text-papel">
      <FranjaKlimt />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-10">
        <div>
          <Logo claro className="items-start" />
          <p className="mt-6 max-w-xs text-[0.85rem] leading-relaxed text-papel/70">{t.pie.texto}</p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-3 text-[0.85rem]">
          {[...enlacesNav(lang), { seccion: "reserva" as const, label: t.nav.reserva }].map((p) => (
            <Link key={p.label} href={ruta(lang, cat, p.seccion)} className="w-fit text-papel/80 hover:text-pan">
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-4 text-[0.85rem]">
          <a
            href={whatsappUrl(t.wa.infoGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-3 hover:text-pan"
          >
            <IconoWhatsApp className="h-5 w-5 text-pan" />
            {enlaces.whatsappVisible}
          </a>
          <a href={`mailto:${enlaces.email}`} className="w-fit text-papel/80 hover:text-pan">
            {enlaces.email}
          </a>
          <Link href={ruta(lang, otra)} className="versalitas mt-4 w-fit text-pan hover:text-papel">
            {t.pie.cambiar(categorias[lang][otra].label)}
          </Link>
          <Link href={ruta(otroIdioma, cat)} hrefLang={otroIdioma} className="versalitas w-fit text-pan hover:text-papel">
            {t.nav.idioma} →
          </Link>
        </div>
      </div>
      <p className="border-t border-papel/10 px-5 py-6 text-center text-[0.7rem] tracking-[0.2em] text-papel/50 uppercase">
        © {new Date().getFullYear()} Aura · Maison d&apos;image
      </p>
    </footer>
  );
}
