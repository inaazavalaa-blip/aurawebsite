import { redirect } from "next/navigation";
import { cache } from "react";
import { clienteServidor } from "@/lib/supabase/servidor";

/**
 * Exige una cuenta autorizada. Si no la hay, manda a la pantalla de acceso.
 * `cache` hace que se compruebe una sola vez por página, aunque la pidan
 * el menú y la sección a la vez.
 */
export const exigirAdmin = cache(async () => {
  const supabase = await clienteServidor();
  if (!supabase) redirect("/admin/login");

  // getClaims comprueba la firma de la sesión; con claves modernas lo hace sin ir a Supabase.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) redirect("/admin/login");

  const { data: fila } = await supabase.from("administradores").select("user_id").eq("user_id", claims.sub).maybeSingle();
  if (!fila) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=acceso");
  }

  return { supabase, user: { id: claims.sub, email: typeof claims.email === "string" ? claims.email : "" } };
});
