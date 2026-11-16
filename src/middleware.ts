import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Mantiene viva la sesión del panel. No afecta a las páginas públicas. */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let respuesta = NextResponse.next({ request });
  if (!url || !clave) return respuesta;

  const supabase = createServerClient(url, clave, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (nuevas) => {
        nuevas.forEach(({ name, value }) => request.cookies.set(name, value));
        respuesta = NextResponse.next({ request });
        nuevas.forEach(({ name, value, options }) => respuesta.cookies.set(name, value, options));
      },
    },
  });

  // Renueva la sesión si está por vencer. getClaims evita ir a Supabase cuando no hace falta.
  await supabase.auth.getClaims();
  return respuesta;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
