import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/supabase/servidor";

/**
 * Cliente con la clave SECRETA de Supabase. Salta las reglas de seguridad, así que
 * solo se usa en el servidor y después de comprobar un pago de Stripe o un enlace privado.
 * Devuelve null si falta la clave.
 */
export function clienteServicio() {
  const clave = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !clave) return null;
  return createClient(supabaseUrl, clave, { auth: { persistSession: false, autoRefreshToken: false } });
}
