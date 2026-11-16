"use server";

import { createClient } from "@supabase/supabase-js";
import { normalizarTelefono } from "@/lib/reservas";
import { supabaseClave, supabaseUrl } from "@/lib/supabase/servidor";

export type DatosReserva = {
  nombre: string;
  telefono: string;
  correo: string;
  categoria: string;
  idioma: string;
  servicio: string;
  modalidad: string;
  fecha: string;
  mensaje: string;
  consentimiento: boolean;
  /** Campo oculto: solo los robots lo llenan. */
  sitio: string;
};

const texto = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Guarda la solicitud. Nunca debe impedir que el cliente llegue a WhatsApp. */
export async function guardarReserva(datos: DatosReserva): Promise<{ ok: boolean }> {
  if (texto(datos.sitio, 200)) return { ok: true };
  if (!supabaseUrl || !supabaseClave) return { ok: false };

  const nombre = texto(datos.nombre, 120);
  const telefono = normalizarTelefono(texto(datos.telefono, 40));
  const servicio = texto(datos.servicio, 120);
  const categoria = datos.categoria === "hombre" ? "hombre" : "mujer";
  const idioma = datos.idioma === "en" ? "en" : "es";
  const fecha = /^\d{4}-\d{2}-\d{2}$/.test(datos.fecha) ? datos.fecha : null;
  if (!nombre || !servicio || !datos.consentimiento || !/^\+?\d{7,20}$/.test(telefono)) return { ok: false };

  const supabase = createClient(supabaseUrl, supabaseClave, { auth: { persistSession: false } });
  const { error } = await supabase.from("reservas").insert({
    nombre,
    telefono,
    correo: texto(datos.correo, 200) || null,
    categoria,
    idioma,
    servicio,
    modalidad: texto(datos.modalidad, 60) || null,
    fecha_preferida: fecha,
    mensaje: texto(datos.mensaje, 2000) || null,
    consentimiento: true,
  });

  if (error) {
    console.error("No se pudo guardar la reserva:", error.code);
    return { ok: false };
  }
  return { ok: true };
}
