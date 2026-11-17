import type Stripe from "stripe";
import { registrarPedido, stripe } from "@/lib/pedidos";

/*
 * Aviso automático de Stripe. Cuando un pago se confirma, Stripe llama aquí y
 * registramos el pedido (y enviamos el correo con el enlace privado).
 * La firma se comprueba con STRIPE_WEBHOOK_SECRET: nadie más puede imitar a Stripe.
 */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const s = stripe();
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;
  const firma = request.headers.get("stripe-signature");
  if (!s || !secreto || !firma) return new Response("No configurado", { status: 400 });

  let evento: Stripe.Event;
  try {
    evento = s.webhooks.constructEvent(await request.text(), firma, secreto);
  } catch {
    return new Response("Firma no válida", { status: 400 });
  }

  if (evento.type === "checkout.session.completed" || evento.type === "checkout.session.async_payment_succeeded") {
    try {
      await registrarPedido(evento.data.object);
    } catch (e) {
      console.error("Error al registrar el pedido desde Stripe:", e instanceof Error ? e.message : e);
      // Stripe reintentará más tarde.
      return new Response("Error", { status: 500 });
    }
  }
  return new Response("ok");
}
