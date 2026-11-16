import type { Metadata } from "next";
import { textos } from "@/app/admin/textos";
import { fechaHora, type Cliente } from "@/lib/reservas";
import { exigirAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await textos();
  return { title: `${t.clientes} · ${t.tituloPestana}` };
}

export default async function Clientes() {
  const { supabase } = await exigirAdmin();
  const { idioma, t } = await textos();
  const { data, error } = await supabase.from("clientes").select("*").order("ultima_reserva", { ascending: false }).limit(500);
  const clientes = (data ?? []) as Cliente[];

  return (
    <>
      <h1 className="titulo text-5xl">{t.clientes}</h1>
      <p className="mt-3 text-suave">{t.ayudaClientes}</p>

      {error && (
        <p role="alert" className="mt-8 text-lirio">
          {t.errorClientes}
        </p>
      )}
      {!error && clientes.length === 0 && <p className="mt-8 text-suave">{t.sinClientes}</p>}

      {clientes.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-[1.5rem] bg-papel-2 p-4">
          <table className="w-full min-w-[700px] border-collapse text-left text-[0.9rem]">
            <thead>
              <tr className="border-b border-tinta/30 text-suave">
                <th className="p-3 font-normal">{t.nombre}</th>
                <th className="p-3 font-normal">{t.contacto}</th>
                <th className="p-3 font-normal">{t.reservas}</th>
                <th className="p-3 font-normal">{t.ultima}</th>
                <th className="p-3 font-normal">{t.estado}</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.telefono} className="border-b border-linea">
                  <td className="p-3">{c.nombre}</td>
                  <td className="p-3">
                    <a href={`https://wa.me/${c.telefono.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline">
                      {c.telefono}
                    </a>
                    {c.correo && <span className="block text-suave">{c.correo}</span>}
                  </td>
                  <td className="p-3">{c.total_reservas}</td>
                  <td className="p-3">{fechaHora(c.ultima_reserva, idioma)}</td>
                  <td className="p-3">{t.estados[c.ultimo_estado]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
