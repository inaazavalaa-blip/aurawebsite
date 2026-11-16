import { createClient } from "@supabase/supabase-js";
import { supabaseClave, supabaseUrl } from "@/lib/supabase/servidor";

/*
 * Tarea diaria de Vercel (ver vercel.json): hace una consulta mínima a Supabase
 * para que el proyecto gratuito no se pause por inactividad.
 * No lee ni cambia reservas.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Si existe CRON_SECRET en Vercel, solo Vercel puede llamar a esta ruta.
  const secreto = process.env.CRON_SECRET;
  if (secreto && request.headers.get("authorization") !== `Bearer ${secreto}`) {
    return Response.json({ ok: false }, { status: 401 });
  }
  if (!supabaseUrl || !supabaseClave) {
    return Response.json({ ok: false, motivo: "faltan las claves de Supabase" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseClave, { auth: { persistSession: false } });
  const { error } = await supabase.rpc("latido");
  if (error) {
    console.error("Latido de Supabase falló:", error.code);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
