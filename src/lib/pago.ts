"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { categorias, type CategoriaSlug, type Moneda } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { pagoEnLineaActivo, stripe } from "@/lib/pedidos";

/** Dirección pública desde la que se hizo la petición (localhost en pruebas, el dominio en producción). */
async function origen() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * Crea la página de pago de Stripe para un paquete y lleva al cliente ahí.
 * El precio sale siempre de src/content/categorias.ts, nunca del navegador.
 */
export async function iniciarPago(formulario: FormData) {
  const idioma: Lang = formulario.get("idioma") === "en" ? "en" : "es";
  const categoria: CategoriaSlug = formulario.get("categoria") === "hombre" ? "hombre" : "mujer";
  const moneda: Moneda = formulario.get("moneda") === "mxn" ? "mxn" : "usd";
  const cat = categorias[idioma][categoria];
  const paquete = cat.paquetes.find((p) => p.id === formulario.get("paquete"));
  const volver = ruta(idioma, categoria, "contratar");

  const s = stripe();
  if (!paquete || formulario.get("consentimiento") !== "on" || !s || !pagoEnLineaActivo()) {
    redirect(`${volver}?pago=error`);
  }

  const base = await origen();
  const sesion = await s.checkout.sessions.create({
    mode: "payment",
    locale: idioma,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: moneda,
          unit_amount: paquete.centavos[moneda],
          product_data: { name: `${paquete.nombre} · Aura (${cat.label})`, description: paquete.descripcion },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    metadata: { paquete: paquete.id, categoria, idioma, moneda },
    payment_intent_data: { description: `Aura · ${paquete.nombre} (${cat.label})` },
    success_url: `${base}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}${volver}?pago=cancelado&paquete=${paquete.id}`,
  });

  if (!sesion.url) redirect(`${volver}?pago=error`);
  redirect(sesion.url);
}
