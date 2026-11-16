import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseClave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cliente con la sesión de quien navega. Devuelve null si faltan las claves. */
export async function clienteServidor() {
  if (!supabaseUrl || !supabaseClave) return null;
  const almacen = await cookies();
  return createServerClient(supabaseUrl, supabaseClave, {
    cookies: {
      getAll: () => almacen.getAll(),
      setAll: (nuevas) => {
        try {
          nuevas.forEach(({ name, value, options }) => almacen.set(name, value, options));
        } catch {
          // Las páginas no pueden escribir cookies; el middleware renueva la sesión.
        }
      },
    },
  });
}
