import Link from "next/link";
import { cerrarSesion } from "@/app/admin/acciones";
import SelectorIdioma from "@/app/admin/SelectorIdioma";
import { textos } from "@/app/admin/textos";
import { Logo } from "@/components/ui";
import { exigirAdmin } from "@/lib/supabase/admin";

// El panel nunca se guarda como página fija: siempre comprueba la sesión.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await exigirAdmin();
  const { idioma, t } = await textos();
  return (
    <div className="min-h-svh bg-papel">
      <header className="border-b border-linea bg-papel-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" aria-label={t.reservas}>
              <Logo />
            </Link>
            <nav className="flex gap-5 text-[0.9rem]" aria-label={t.tituloEntrada}>
              <Link href="/admin" className="hover:text-oro">
                {t.reservas}
              </Link>
              <Link href="/admin/clientes" className="hover:text-oro">
                {t.clientes}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SelectorIdioma idioma={idioma} etiqueta={t.cambiarIdioma} />
            <form action={cerrarSesion} className="flex items-center gap-4 text-[0.8rem] text-suave">
              <span className="hidden sm:inline">{user.email}</span>
              <button type="submit" className="rounded-full border border-tinta/25 px-4 py-2 text-tinta hover:border-tinta">
                {t.salir}
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
