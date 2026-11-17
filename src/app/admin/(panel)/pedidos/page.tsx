import type { Metadata } from "next";
import { actualizarPedido } from "@/app/admin/acciones";
import { textos } from "@/app/admin/textos";
import { preguntas } from "@/app/(cliente)/textos";
import CopiarEnlace from "@/app/(cliente)/CopiarEnlace";
import { categorias } from "@/content/categorias";
import { fechaHora } from "@/lib/reservas";
import { BUCKET_FOTOS, tokenDe, urlArea, type Pedido } from "@/lib/pedidos";
import { exigirAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await textos();
  return { title: `${t.pedidos} · ${t.tituloPestana}` };
}

const estados = ["pagado", "en_proceso", "entregado", "reembolsado"] as const;

function monto(p: Pedido) {
  return `${(p.monto / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })} ${p.moneda.toUpperCase()}`;
}

export default async function Pedidos() {
  const { supabase } = await exigirAdmin();
  const { idioma, t } = await textos();
  const { data, error } = await supabase.from("pedidos").select("*").order("creado", { ascending: false }).limit(200);
  const pedidos = (data ?? []) as Pedido[];

  // Fotos de cada pedido, con enlaces temporales (1 hora) que solo funcionan con sesión de administradora.
  const fotos = new Map<string, string[]>();
  await Promise.all(
    pedidos.map(async (p) => {
      const { data: lista } = await supabase.storage.from(BUCKET_FOTOS).list(p.id, { limit: 50 });
      const rutas = (lista ?? []).filter((f) => f.name !== ".emptyFolderPlaceholder").map((f) => `${p.id}/${f.name}`);
      if (!rutas.length) return;
      const { data: firmadas } = await supabase.storage.from(BUCKET_FOTOS).createSignedUrls(rutas, 3600);
      fotos.set(p.id, (firmadas ?? []).map((f) => f.signedUrl).filter(Boolean) as string[]);
    }),
  );

  const conToken = Boolean(process.env.AURA_TOKEN_SECRET);

  return (
    <>
      <h1 className="titulo text-5xl">{t.pedidos}</h1>
      <p className="mt-3 text-suave">{t.ayudaPedidos}</p>

      {error && (
        <p role="alert" className="mt-8 text-lirio">
          {t.errorPedidos}
        </p>
      )}
      {!error && pedidos.length === 0 && <p className="mt-8 text-suave">{t.sinPedidos}</p>}

      <ul className="mt-8 grid gap-4">
        {pedidos.map((p) => {
          const enlace = conToken ? urlArea(tokenDe(p.stripe_sesion)) : null;
          const lista = preguntas(p.idioma, p.categoria);
          const susFotos = fotos.get(p.id) ?? [];
          return (
            <li key={p.id} className="rounded-[1.5rem] bg-papel-2 p-6">
              <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="text-[0.8rem] text-suave">{fechaHora(p.creado, idioma)}</p>
                  <h2 className="titulo mt-1 text-3xl">{p.nombre ?? "—"}</h2>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem]">
                    {p.correo && (
                      <a href={`mailto:${p.correo}`} className="underline">
                        {p.correo}
                      </a>
                    )}
                    {p.telefono && (
                      <a href={`https://wa.me/${p.telefono.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline">
                        {p.telefono}
                      </a>
                    )}
                  </p>
                  <p className="mt-3 text-[0.9rem]">
                    <span className="text-tinta">{p.paquete_nombre}</span>{" "}
                    <span className="text-suave">
                      · {categorias[p.idioma][p.categoria].label} · {monto(p)}
                    </span>
                  </p>
                  {enlace && (
                    <div className="mt-4 rounded-xl border border-oro/40 bg-papel p-4">
                      <p className="text-[0.8rem] text-suave">{t.enlacePrivado}</p>
                      <p className="mt-1 break-all font-mono text-[0.75rem]">{enlace}</p>
                      <p className="mt-1 text-[0.75rem] text-suave">{p.correo_enviado ? t.correoEnviado : t.correoPendiente}</p>
                      <CopiarEnlace enlace={enlace} textos={{ copiar: idioma === "es" ? "Copiar enlace" : "Copy link", copiado: idioma === "es" ? "Copiado" : "Copied" }} />
                    </div>
                  )}
                </div>
                <form action={actualizarPedido} className="grid content-start gap-3">
                  <input type="hidden" name="id" value={p.id} />
                  <label className="text-[0.8rem] text-suave">
                    {t.estado}
                    <select name="estado" defaultValue={p.estado} className="mt-1 w-full rounded-lg border border-linea bg-papel p-2 text-tinta">
                      {estados.map((e) => (
                        <option key={e} value={e}>
                          {t.estadosPedido[e]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-[0.8rem] text-suave">
                    {t.notas}
                    <textarea
                      name="notas"
                      rows={3}
                      maxLength={5000}
                      defaultValue={p.notas ?? ""}
                      className="mt-1 w-full rounded-lg border border-linea bg-papel p-2 text-tinta"
                    />
                  </label>
                  <button type="submit" className="w-fit rounded-full bg-laca px-5 py-2.5 text-[0.75rem] tracking-[0.12em] text-papel uppercase hover:bg-tinta">
                    {t.guardar}
                  </button>
                </form>
              </div>

              <details className="mt-6 border-t border-linea pt-4">
                <summary className="cursor-pointer text-[0.9rem]">
                  {t.cuestionario} {p.cuestionario_enviado ? `· ${fechaHora(p.cuestionario_enviado, idioma)}` : ""}
                </summary>
                {p.cuestionario ? (
                  <dl className="mt-4 grid gap-4 text-[0.9rem]">
                    {lista
                      .filter((q) => p.cuestionario?.[q.id])
                      .map((q) => (
                        <div key={q.id}>
                          <dt className="text-suave">{q.texto}</dt>
                          <dd className="mt-1 whitespace-pre-line">{p.cuestionario?.[q.id]}</dd>
                        </div>
                      ))}
                  </dl>
                ) : (
                  <p className="mt-3 text-[0.9rem] text-suave">{t.sinCuestionario}</p>
                )}
              </details>

              <details className="mt-4 border-t border-linea pt-4">
                <summary className="cursor-pointer text-[0.9rem]">
                  {t.fotosTitulo} · {susFotos.length}
                </summary>
                {susFotos.length ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                    {susFotos.map((url) => (
                      <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="block aspect-square overflow-hidden rounded-lg bg-papel">
                        {/* eslint-disable-next-line @next/next/no-img-element -- enlaces firmados temporales */}
                        <img src={url} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-[0.9rem] text-suave">{t.sinFotos}</p>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </>
  );
}
