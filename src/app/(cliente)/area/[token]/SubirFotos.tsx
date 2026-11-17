"use client";

import { createClient } from "@supabase/supabase-js";
import { useRef, useState } from "react";
import { permisoSubida } from "./acciones";

type Textos = {
  elegir: string;
  subiendo: (n: number, total: number) => string;
  subidas: (n: number, max: number) => string;
  limite: (max: number) => string;
  errorFoto: (nombre: string) => string;
};

const MAX_BYTES = 10 * 1024 * 1024;
const BUCKET = "fotos-clientes";

/**
 * Sube las fotos directo a la carpeta privada del pedido en Supabase. Cada foto
 * necesita un permiso de un solo uso que da el servidor tras comprobar el enlace.
 */
export default function SubirFotos({ token, iniciales, max, t }: { token: string; iniciales: number; max: number; t: Textos }) {
  const [subidas, setSubidas] = useState(iniciales);
  const [progreso, setProgreso] = useState<string | null>(null);
  const [errores, setErrores] = useState<string[]>([]);
  const entrada = useRef<HTMLInputElement>(null);

  async function subir(archivos: FileList | null) {
    if (!archivos?.length) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const clave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !clave) return;
    const supabase = createClient(url, clave, { auth: { persistSession: false } });

    const lista = [...archivos].slice(0, Math.max(0, max - subidas));
    const fallos: string[] = [];
    let hechas = 0;
    for (const [i, archivo] of lista.entries()) {
      setProgreso(t.subiendo(i + 1, lista.length));
      if (archivo.size > MAX_BYTES) {
        fallos.push(t.errorFoto(archivo.name));
        continue;
      }
      const permiso = await permisoSubida(token, archivo.type || "image/jpeg").catch(() => ({ ok: false as const }));
      if (!permiso.ok) {
        fallos.push(t.errorFoto(archivo.name));
        continue;
      }
      const { error } = await supabase.storage.from(BUCKET).uploadToSignedUrl(permiso.ruta, permiso.permiso, archivo, {
        contentType: archivo.type || "image/jpeg",
      });
      if (error) fallos.push(t.errorFoto(archivo.name));
      else hechas++;
    }
    setSubidas((n) => n + hechas);
    setErrores(fallos);
    setProgreso(null);
    if (entrada.current) entrada.current.value = "";
  }

  const lleno = subidas >= max;
  return (
    <div className="mt-8">
      <div className="h-2 overflow-hidden rounded-full bg-papel" aria-hidden>
        <div className="h-full rounded-full bg-oro transition-all" style={{ width: `${(subidas / max) * 100}%` }} />
      </div>
      <p className="mt-3 text-[0.85rem] text-suave" role="status">
        {progreso ?? t.subidas(subidas, max)}
      </p>
      <label
        className={`mt-5 inline-flex cursor-pointer items-center gap-3 rounded-full bg-laca px-7 py-4 text-[0.75rem] tracking-[0.16em] text-papel uppercase transition hover:bg-tinta ${
          lleno || progreso ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {t.elegir}
        <input
          ref={entrada}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          disabled={lleno || Boolean(progreso)}
          onChange={(e) => subir(e.target.files)}
          className="sr-only"
        />
      </label>
      {lleno && <p className="mt-3 text-[0.85rem] text-suave">{t.limite(max)}</p>}
      {errores.length > 0 && (
        <ul className="mt-4 grid gap-1 text-[0.85rem] text-lirio" role="alert">
          {errores.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
