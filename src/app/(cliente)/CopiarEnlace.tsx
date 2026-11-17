"use client";

import { useState } from "react";

export default function CopiarEnlace({ enlace, textos }: { enlace: string; textos: { copiar: string; copiado: string } }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(enlace);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2500);
      }}
      className="mt-3 rounded-full border border-tinta/25 px-4 py-2 text-[0.75rem] tracking-[0.12em] uppercase hover:border-tinta"
    >
      {copiado ? textos.copiado : textos.copiar}
    </button>
  );
}
