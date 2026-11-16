"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_IDIOMA } from "@/app/admin/textos";
import { estadosReserva, type EstadoReserva } from "@/lib/reservas";
import { exigirAdmin } from "@/lib/supabase/admin";
import { clienteServidor } from "@/lib/supabase/servidor";

export async function iniciarSesion(formulario: FormData) {
  const supabase = await clienteServidor();
  if (!supabase) redirect("/admin/login");

  const { error } = await supabase.auth.signInWithPassword({
    email: String(formulario.get("correo") ?? ""),
    password: String(formulario.get("contrasena") ?? ""),
  });
  if (error) redirect("/admin/login?error=datos");
  redirect("/admin");
}

export async function cerrarSesion() {
  const supabase = await clienteServidor();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

/** Guarda el idioma elegido con el botón ES / EN durante un año. */
export async function cambiarIdioma(formulario: FormData) {
  const idioma = formulario.get("idioma") === "en" ? "en" : "es";
  (await cookies()).set(COOKIE_IDIOMA, idioma, {
    path: "/admin",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
  });
  revalidatePath("/admin", "layout");
}

export async function actualizarReserva(formulario: FormData) {
  const { supabase } = await exigirAdmin();
  const id = String(formulario.get("id") ?? "");
  const estado = String(formulario.get("estado") ?? "") as EstadoReserva;
  const notas = String(formulario.get("notas") ?? "").trim().slice(0, 5000);
  if (!id || !estadosReserva.includes(estado)) return;

  const { error } = await supabase.from("reservas").update({ estado, notas: notas || null }).eq("id", id);
  if (error) console.error("No se pudo actualizar la reserva:", error.code);
  revalidatePath("/admin", "layout");
}
