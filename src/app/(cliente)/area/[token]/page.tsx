import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconoWhatsApp, Logo } from "@/components/ui";
import { categorias, whatsappUrl } from "@/content/categorias";
import { ruta } from "@/i18n/config";
import { fechaHora } from "@/lib/reservas";
import { MAX_FOTOS, pedidoPorToken } from "@/lib/pedidos";
import { preguntas, textosCliente } from "../../textos";
import { fotosSubidas } from "./acciones";
import Cuestionario from "./Cuestionario";
import SubirFotos from "./SubirFotos";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Aura" };

export default async function AreaPrivada({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const pedido = await pedidoPorToken(token);
  if (!pedido) notFound();

  const lang = pedido.idioma;
  const t = textosCliente[lang];
  const cat = categorias[lang][pedido.categoria];
  const subidas = await fotosSubidas(token);
  const nombre = pedido.nombre?.split(" ")[0] ?? "";
  const listaFotos = [...t.fotos.base, ...(pedido.paquete === "vip" ? [t.fotos.vip] : [])];

  return (
    <main lang={lang} className="mx-auto max-w-3xl px-5 py-12 md:py-16">
      <title>{t.tituloPestana}</title>
      <header className="flex items-center justify-between gap-4">
        <Link href={ruta(lang, pedido.categoria)}>
          <Logo />
        </Link>
        <span className="rounded-full border border-oro/50 px-4 py-2 text-[0.75rem] tracking-[0.08em]">
          {t.paquete}: {pedido.paquete_nombre}
        </span>
      </header>

      <section className="mt-14">
        <h1 className="titulo text-[clamp(2.6rem,7vw,4.4rem)]">{t.hola(nombre)}</h1>
        <p className="mt-5 max-w-xl leading-[1.8] text-suave">{t.intro}</p>
        <p className="mt-4 max-w-xl rounded-2xl bg-papel-2 px-4 py-3 text-[0.85rem] text-suave">{t.privado}</p>
      </section>

      <section className="mt-14 rounded-[2rem] bg-papel-2 p-6 md:p-10">
        <h2 className="titulo text-3xl">{t.paso1}</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{t.paso1Texto}</p>
        {pedido.cuestionario_enviado && (
          <p className="mt-3 text-[0.85rem] text-oro">{t.enviadoEl(fechaHora(pedido.cuestionario_enviado, lang))}</p>
        )}
        <Cuestionario
          token={token}
          preguntas={preguntas(lang, pedido.categoria)}
          iniciales={pedido.cuestionario ?? {}}
          t={{ opcional: t.opcional, guardar: t.guardar, guardando: t.guardando, guardado: t.guardado, error: t.error }}
        />
      </section>

      <section className="mt-8 rounded-[2rem] bg-papel-2 p-6 md:p-10">
        <h2 className="titulo text-3xl">{t.paso2}</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{t.paso2Texto}</p>
        <ol className="mt-6 grid gap-2 text-[0.92rem]">
          {listaFotos.map((f, i) => (
            <li key={f} className="flex gap-3">
              <span className="titulo w-5 shrink-0 text-oro">{i + 1}</span>
              {f}
            </li>
          ))}
        </ol>
        <SubirFotos
          token={token}
          iniciales={subidas}
          max={MAX_FOTOS}
          t={{
            elegir: t.elegir,
            subiendo: t.subiendo,
            subidas: t.subidas,
            limite: t.limite,
            errorFoto: t.errorFoto,
          }}
        />
      </section>

      <section className="mt-8 rounded-[2rem] border border-oro/40 p-6 md:p-10">
        <h2 className="titulo text-3xl">{t.paso3}</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{t.paso3Texto}</p>
        <a
          href={whatsappUrl(lang === "es" ? `Hola Aura, soy ${pedido.nombre ?? ""} y contraté ${pedido.paquete_nombre} (${cat.label}).` : `Hello Aura, I'm ${pedido.nombre ?? ""} and I booked ${pedido.paquete_nombre} (${cat.label}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 text-[0.8rem] tracking-[0.14em] uppercase"
        >
          <IconoWhatsApp className="h-4 w-4 text-[#1f7a4d]" /> {t.dudas}
        </a>
      </section>
    </main>
  );
}
