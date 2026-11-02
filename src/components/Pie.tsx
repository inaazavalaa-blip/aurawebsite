import Link from "next/link";
import { FranjaKlimt } from "@/components/ornamentos/Klimt";
import { IconoWhatsApp, Logo } from "@/components/ui";
import { categorias, enlaces, paginas, whatsappUrl, type CategoriaSlug } from "@/content/categorias";

export default function Pie({ cat }: { cat: CategoriaSlug }) {
  return (
    <footer className="bg-laca text-papel">
      <FranjaKlimt />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-10">
        <div>
          <Logo claro className="items-start" />
          <p className="mt-6 max-w-xs text-[0.85rem] leading-relaxed text-papel/70">
            Una maison de imagen integral: cabello, rostro, color, silueta y armario. Para que te veas como eres.
          </p>
        </div>
        <nav aria-label="Pie" className="grid content-start gap-3 text-[0.85rem]">
          {[...paginas, { ruta: "/reserva", label: "Reserva" }].map((p) => (
            <Link key={p.ruta} href={`/${cat}${p.ruta}`} className="w-fit text-papel/80 hover:text-pan">
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="grid content-start gap-4 text-[0.85rem]">
          <a
            href={whatsappUrl("Hola Aura, me gustaría información.")}
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
          <Link href="/" className="versalitas mt-4 w-fit text-pan hover:text-papel">
            Cambiar a {cat === "mujer" ? categorias.hombre.label : categorias.mujer.label} →
          </Link>
        </div>
      </div>
      <p className="border-t border-papel/10 px-5 py-6 text-center text-[0.7rem] tracking-[0.2em] text-papel/50 uppercase">
        © {new Date().getFullYear()} Aura · Maison d&apos;image
      </p>
    </footer>
  );
}
