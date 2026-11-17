"use server";

import { randomUUID } from "node:crypto";
import { BUCKET_FOTOS, MAX_FOTOS, pedidoPorToken } from "@/lib/pedidos";
import { clienteServicio } from "@/lib/supabase/servicio";
import { preguntas } from "../../textos";

/*
 * Acciones del área privada. Cada una comprueba primero el enlace privado (token):
 * sin un token válido no se puede leer ni escribir nada.
 */

const TIPOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export async function guardarCuestionario(token: string, respuestas: Record<string, string>): Promise<{ ok: boolean }> {
  const pedido = await pedidoPorToken(token);
  const db = clienteServicio();
  if (!pedido || !db) return { ok: false };

  // Solo se guardan las preguntas conocidas, con un largo máximo.
  const limpio: Record<string, string> = {};
  for (const p of preguntas(pedido.idioma, pedido.categoria)) {
    const v = respuestas[p.id];
    if (typeof v === "string" && v.trim()) limpio[p.id] = v.trim().slice(0, 2000);
  }

  const { error } = await db
    .from("pedidos")
    .update({ cuestionario: limpio, cuestionario_enviado: new Date().toISOString() })
    .eq("id", pedido.id);
  return { ok: !error };
}

async function contarFotos(pedidoId: string) {
  const { data } = (await clienteServicio()?.storage.from(BUCKET_FOTOS).list(pedidoId, { limit: 100 })) ?? {};
  return data?.filter((f) => f.name !== ".emptyFolderPlaceholder").length ?? 0;
}

export async function fotosSubidas(token: string): Promise<number> {
  const pedido = await pedidoPorToken(token);
  return pedido ? contarFotos(pedido.id) : 0;
}

/** Permiso de un solo uso para subir una foto directamente a la carpeta privada del pedido. */
export async function permisoSubida(
  token: string,
  tipo: string,
): Promise<{ ok: true; ruta: string; permiso: string } | { ok: false }> {
  const pedido = await pedidoPorToken(token);
  const db = clienteServicio();
  if (!pedido || !db || !TIPOS.includes(tipo)) return { ok: false };
  if ((await contarFotos(pedido.id)) >= MAX_FOTOS) return { ok: false };

  const extension = tipo.split("/")[1].replace("jpeg", "jpg");
  const ruta = `${pedido.id}/${randomUUID()}.${extension}`;
  const { data, error } = await db.storage.from(BUCKET_FOTOS).createSignedUploadUrl(ruta);
  if (error || !data) return { ok: false };
  return { ok: true, ruta, permiso: data.token };
}
