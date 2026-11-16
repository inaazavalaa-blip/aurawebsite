import { redirect } from "next/navigation";
import { clienteServidor } from "@/lib/supabase/servidor";

/** Exige una cuenta autorizada. Si no la hay, manda a la pantalla de acceso. */
export async function exigirAdmin() {
  const supabase = await clienteServidor();
  if (!supabase) redirect("/admin/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: fila } = await supabase.from("administradores").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!fila) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=acceso");
  }

  return { supabase, user };
}
