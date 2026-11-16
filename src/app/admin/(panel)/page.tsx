import Link from "next/link";
import { actualizarReserva } from "@/app/admin/acciones";
import { textos } from "@/app/admin/textos";
import { estadosReserva, fechaHora, type EstadoReserva, type Reserva } from "@/lib/reservas";
import { exigirAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const LIMITE = 200;

export default async function Reservas({ searchParams }: { searchParams: Promise<{ estado?: string }> }) {
  const { supabase } = await exigirAdmin();
  const { idioma, t } = await textos();
  const pedido = (await searchParams).estado;
  const estado = estadosReserva.includes(pedido as EstadoReserva) ? (pedido as EstadoReserva) : undefined;

  let consulta = supabase.from("reservas").select("*").order("creada", { ascending: false }).limit(LIMITE);
  if (estado) consulta = consulta.eq("estado", estado);
  const { data, error } = await consulta;
  const reservas = (data ?? []) as Reserva[];

  return (
    <>
      <h1 className="titulo text-5xl">{t.reservas}</h1>
      <nav className="mt-6 flex flex-wrap gap-2 text-[0.8rem]" aria-label={t.filtrar}>
        <Filtro href="/admin" activo={!estado} texto={t.todas} />
        {estadosReserva.map((e) => (
          <Filtro key={e} href={`/admin?estado=${e}`} activo={estado === e} texto={t.estados[e]} />
        ))}
      </nav>

      {error && (
        <p role="alert" className="mt-8 text-lirio">
          {t.errorReservas}
        </p>
      )}
      {!error && reservas.length === 0 && <p className="mt-8 text-suave">{t.sinReservas}</p>}
      {reservas.length === LIMITE && <p className="mt-8 text-suave">{t.mostrando(LIMITE)}</p>}

      <ul className="mt-8 grid gap-4">
        {reservas.map((r) => (
          <li key={r.id} className="grid gap-6 rounded-[1.5rem] bg-papel-2 p-6 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[0.8rem] text-suave">{fechaHora(r.creada, idioma)}</p>
              <h2 className="titulo mt-1 text-3xl">{r.nombre}</h2>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem]">
                <a href={`https://wa.me/${r.telefono.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline">
                  {r.telefono}
                </a>
                {r.correo && (
                  <a href={`mailto:${r.correo}`} className="underline">
                    {r.correo}
                  </a>
                )}
              </p>
              <dl className="mt-4 grid gap-1 text-[0.9rem] text-suave">
                <Dato titulo={t.servicio} valor={r.servicio} />
                <Dato titulo={t.coleccion} valor={`${r.categoria === "mujer" ? t.mujer : t.hombre} (${r.idioma === "es" ? t.espanol : t.ingles})`} />
                <Dato titulo={t.modalidad} valor={r.modalidad} />
                <Dato titulo={t.fechaPreferida} valor={r.fecha_preferida} />
                <Dato titulo={t.quiereCambiar} valor={r.mensaje} />
              </dl>
            </div>
            <form action={actualizarReserva} className="grid content-start gap-3">
              <input type="hidden" name="id" value={r.id} />
              <label className="text-[0.8rem] text-suave">
                {t.estado}
                <select name="estado" defaultValue={r.estado} className="mt-1 w-full rounded-lg border border-linea bg-papel p-2 text-tinta">
                  {estadosReserva.map((e) => (
                    <option key={e} value={e}>
                      {t.estados[e]}
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
                  defaultValue={r.notas ?? ""}
                  className="mt-1 w-full rounded-lg border border-linea bg-papel p-2 text-tinta"
                />
              </label>
              <button type="submit" className="w-fit rounded-full bg-laca px-5 py-2.5 text-[0.75rem] tracking-[0.12em] text-papel uppercase hover:bg-tinta">
                {t.guardar}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}

function Filtro({ href, activo, texto }: { href: string; activo: boolean; texto: string }) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={`rounded-full px-4 py-2 ${activo ? "bg-laca text-papel" : "border border-tinta/20 hover:border-tinta"}`}
    >
      {texto}
    </Link>
  );
}

function Dato({ titulo, valor }: { titulo: string; valor: string | null }) {
  if (!valor) return null;
  return (
    <div>
      <dt className="inline text-tinta">{titulo}: </dt>
      <dd className="inline">{valor}</dd>
    </div>
  );
}
