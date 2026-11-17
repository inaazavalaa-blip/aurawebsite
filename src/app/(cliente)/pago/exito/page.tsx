import { headers } from "next/headers";
import Link from "next/link";
import { BotonPrincipal, Flecha, IconoWhatsApp, Logo } from "@/components/ui";
import { whatsappUrl } from "@/content/categorias";
import { ruta, type Lang } from "@/i18n/config";
import { registrarPedido, stripe, urlArea } from "@/lib/pedidos";
import CopiarEnlace from "../../CopiarEnlace";
import { textosCliente } from "../../textos";

export const dynamic = "force-dynamic";
export const metadata = { title: "Aura" };

/**
 * Página a la que Stripe envía al cliente después de pagar. Pregunta a Stripe si la
 * sesión está pagada; solo entonces registra el pedido y muestra el enlace privado.
 */
export default async function PagoExito({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const s = stripe();

  let sesion = null;
  if (s && session_id?.startsWith("cs_")) {
    sesion = await s.checkout.sessions.retrieve(session_id).catch(() => null);
  }
  const lang: Lang = sesion?.metadata?.idioma === "en" ? "en" : "es";
  const t = textosCliente[lang];
  const cat = sesion?.metadata?.categoria === "hombre" ? "hombre" : "mujer";
  const pagado = sesion?.payment_status === "paid";
  const resultado = pagado && sesion ? await registrarPedido(sesion).catch(() => null) : null;

  const cab = await headers();
  const host = cab.get("x-forwarded-host") ?? cab.get("host") ?? "";
  const proto = cab.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const enlace = resultado ? urlArea(resultado.token, `${proto}://${host}`) : null;

  return (
    <main lang={lang} className="grid min-h-svh place-items-center px-5 py-16">
      <div className="w-full max-w-xl rounded-[2rem] bg-papel-2 p-8 text-center md:p-12">
        <Link href={ruta(lang, cat)} className="inline-block">
          <Logo />
        </Link>

        {resultado && enlace ? (
          <>
            <h1 className="titulo mt-10 text-[clamp(2.4rem,6vw,3.6rem)]">
              {t.graciasTitulo} <em className="mt-1 block text-oro">{t.graciasEnfasis}</em>
            </h1>
            <p className="mx-auto mt-6 max-w-md leading-[1.8] text-suave">{t.graciasTexto(resultado.pedido.paquete_nombre)}</p>
            <BotonPrincipal href={enlace} className="mt-10">
              {t.graciasBoton} <Flecha />
            </BotonPrincipal>
            <div className="mt-10 rounded-2xl border border-oro/40 bg-papel p-5 text-left">
              <p className="text-[0.85rem] text-suave">{t.graciasGuardar}</p>
              <p className="mt-2 break-all font-mono text-[0.8rem]">{enlace}</p>
              <CopiarEnlace enlace={enlace} textos={{ copiar: t.copiar, copiado: t.copiado }} />
              {resultado.pedido.correo && process.env.RESEND_API_KEY && (
                <p className="mt-3 text-[0.8rem] text-suave">{t.graciasCorreo}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="titulo mt-10 text-[clamp(2rem,5vw,3rem)]">{sesion && !pagado ? t.pendienteTitulo : t.fallidoTitulo}</h1>
            <p className="mx-auto mt-6 max-w-md leading-[1.8] text-suave">{sesion && !pagado ? t.pendienteTexto : t.fallidoTexto}</p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href={whatsappUrl(lang === "es" ? "Hola Aura, tengo una duda sobre mi pago." : "Hello Aura, I have a question about my payment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[0.8rem] tracking-[0.14em] uppercase"
              >
                <IconoWhatsApp className="h-4 w-4" /> {t.dudas}
              </a>
              <Link href={ruta(lang, cat, "contratar")} className="text-[0.85rem] text-suave underline">
                {t.volver}
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
