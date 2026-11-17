import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import Stripe from "stripe";
import { categorias, type CategoriaSlug, type Moneda, type PaqueteId } from "@/content/categorias";
import { SITIO, type Lang } from "@/i18n/config";
import { clienteServicio } from "@/lib/supabase/servicio";

/*
 * Pedidos pagados.
 * - El pedido solo se registra cuando Stripe confirma que el pago está hecho
 *   (desde el aviso automático de Stripe o desde la página de "pago recibido").
 * - El enlace privado del cliente se calcula a partir de la sesión de Stripe con una
 *   clave secreta (AURA_TOKEN_SECRET). En la base solo se guarda su huella.
 */

export type Pedido = {
  id: string;
  creado: string;
  stripe_sesion: string;
  paquete: PaqueteId;
  paquete_nombre: string;
  categoria: CategoriaSlug;
  idioma: Lang;
  moneda: Moneda;
  monto: number;
  nombre: string | null;
  correo: string | null;
  telefono: string | null;
  correo_enviado: string | null;
  cuestionario: Record<string, string> | null;
  cuestionario_enviado: string | null;
  estado: "pagado" | "en_proceso" | "entregado" | "reembolsado";
  notas: string | null;
};

let stripeCache: Stripe | null = null;

/** Cliente de Stripe. null si falta STRIPE_SECRET_KEY (el pago en línea queda desactivado). */
export function stripe() {
  const clave = process.env.STRIPE_SECRET_KEY;
  if (!clave) return null;
  stripeCache ??= new Stripe(clave);
  return stripeCache;
}

export function pagoEnLineaActivo() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.SUPABASE_SECRET_KEY && process.env.AURA_TOKEN_SECRET);
}

function secretoToken() {
  const s = process.env.AURA_TOKEN_SECRET;
  if (!s || s.length < 32) throw new Error("Falta AURA_TOKEN_SECRET");
  return s;
}

/** Enlace privado (token) de un pedido, calculado a partir de su sesión de Stripe. */
export function tokenDe(sesionStripe: string) {
  return createHmac("sha256", secretoToken()).update(sesionStripe).digest("base64url");
}

export function huella(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/** Comprueba que un token tiene la forma esperada antes de buscarlo. */
export function tokenValido(token: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(token);
}

export function urlArea(token: string, origen = SITIO) {
  return `${origen}/area/${token}`;
}

/** Busca el pedido de un enlace privado. Compara huellas en tiempo constante. */
export async function pedidoPorToken(token: string): Promise<Pedido | null> {
  if (!tokenValido(token)) return null;
  const db = clienteServicio();
  if (!db) return null;
  const h = huella(token);
  const { data } = await db.from("pedidos").select("*").eq("token_hash", h).maybeSingle();
  if (!data) return null;
  const a = Buffer.from(h);
  const b = Buffer.from(data.token_hash as string);
  return a.length === b.length && timingSafeEqual(a, b) ? (data as Pedido) : null;
}

/**
 * Registra un pedido a partir de una sesión de Stripe ya pagada. Se puede llamar
 * varias veces con la misma sesión: solo la primera crea el pedido y envía el correo.
 */
export async function registrarPedido(sesion: Stripe.Checkout.Session): Promise<{ pedido: Pedido; token: string } | null> {
  if (sesion.payment_status !== "paid") return null;
  const db = clienteServicio();
  if (!db) throw new Error("Falta SUPABASE_SECRET_KEY");

  const m = sesion.metadata ?? {};
  const idioma: Lang = m.idioma === "en" ? "en" : "es";
  const categoria: CategoriaSlug = m.categoria === "hombre" ? "hombre" : "mujer";
  const paquete = categorias[idioma][categoria].paquetes.find((p) => p.id === m.paquete);
  if (!paquete) throw new Error(`Paquete desconocido en la sesión ${sesion.id}`);

  const token = tokenDe(sesion.id);
  const fila = {
    stripe_sesion: sesion.id,
    token_hash: huella(token),
    paquete: paquete.id,
    paquete_nombre: paquete.nombre,
    categoria,
    idioma,
    moneda: (sesion.currency === "mxn" ? "mxn" : "usd") as Moneda,
    monto: sesion.amount_total ?? 0,
    nombre: sesion.customer_details?.name?.slice(0, 200) ?? null,
    correo: sesion.customer_details?.email?.slice(0, 200) ?? null,
    telefono: sesion.customer_details?.phone?.slice(0, 40) ?? null,
  };

  const { data: nuevo, error } = await db
    .from("pedidos")
    .upsert(fila, { onConflict: "stripe_sesion", ignoreDuplicates: true })
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`No se pudo registrar el pedido: ${error.code}`);

  if (nuevo) {
    await enviarCorreoBienvenida(nuevo as Pedido, token);
    return { pedido: nuevo as Pedido, token };
  }
  const { data: existente } = await db.from("pedidos").select("*").eq("stripe_sesion", sesion.id).single();
  return { pedido: existente as Pedido, token };
}

/** Correo con el enlace privado. Solo se envía si Resend está configurado. */
async function enviarCorreoBienvenida(pedido: Pedido, token: string) {
  const clave = process.env.RESEND_API_KEY;
  const desde = process.env.RESEND_FROM;
  if (!clave || !desde || !pedido.correo) return;

  const enlace = urlArea(token);
  const es = pedido.idioma === "es";
  const nombre = pedido.nombre?.split(" ")[0] ?? "";
  const asunto = es ? "Tu área privada de Aura" : "Your private Aura area";
  const texto = es
    ? `Hola ${nombre}:\n\nGracias por contratar ${pedido.paquete_nombre}. Tu pago está confirmado.\n\nEste es tu enlace privado para completar el cuestionario y subir tus fotos:\n${enlace}\n\nGuárdalo y no lo compartas: cualquiera con el enlace puede ver tu área.\n\nCon cariño,\nAura`
    : `Hi ${nombre},\n\nThank you for booking ${pedido.paquete_nombre}. Your payment is confirmed.\n\nThis is your private link to complete the questionnaire and upload your photos:\n${enlace}\n\nKeep it safe and don't share it: anyone with the link can see your area.\n\nWarmly,\nAura`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: desde, to: [pedido.correo], subject: asunto, text: texto }),
  });
  if (!r.ok) {
    console.error("No se pudo enviar el correo del pedido:", r.status);
    return;
  }
  await clienteServicio()?.from("pedidos").update({ correo_enviado: new Date().toISOString() }).eq("id", pedido.id);
}

export const MAX_FOTOS = 12;
export const BUCKET_FOTOS = "fotos-clientes";
