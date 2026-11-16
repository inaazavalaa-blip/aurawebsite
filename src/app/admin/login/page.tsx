import { redirect } from "next/navigation";
import { iniciarSesion } from "@/app/admin/acciones";
import SelectorIdioma from "@/app/admin/SelectorIdioma";
import { textos } from "@/app/admin/textos";
import { Logo } from "@/components/ui";
import { clienteServidor } from "@/lib/supabase/servidor";

const campo = "mt-1 w-full border-b border-tinta/25 bg-transparent py-3 outline-none focus:border-oro";

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { idioma, t } = await textos();
  const errores: Record<string, string> = { datos: t.errorDatos, acceso: t.errorAcceso };
  const supabase = await clienteServidor();

  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub && !error) redirect("/admin");
  }

  return (
    <main className="grid min-h-svh place-items-center bg-papel px-5">
      <div className="w-full max-w-sm rounded-[2rem] bg-papel-2 p-8">
        <div className="flex items-start justify-between gap-4">
          <Logo />
          <SelectorIdioma idioma={idioma} etiqueta={t.cambiarIdioma} />
        </div>
        <h1 className="titulo mt-8 text-4xl">{t.tituloEntrada}</h1>
        {!supabase ? (
          <p role="alert" className="mt-6 leading-relaxed text-suave">
            {t.sinConexion}
          </p>
        ) : (
          <form action={iniciarSesion} className="mt-6 grid gap-5">
            {error && errores[error] && (
              <p role="alert" className="text-[0.9rem] text-lirio">
                {errores[error]}
              </p>
            )}
            <label className="text-[0.85rem] text-suave">
              {t.correo}
              <input name="correo" type="email" required autoComplete="username" className={campo} />
            </label>
            <label className="text-[0.85rem] text-suave">
              {t.contrasena}
              <input name="contrasena" type="password" required autoComplete="current-password" className={campo} />
            </label>
            <button type="submit" className="rounded-full bg-laca px-6 py-4 text-[0.75rem] tracking-[0.16em] text-papel uppercase hover:bg-tinta">
              {t.entrar}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
