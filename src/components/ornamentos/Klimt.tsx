import { useId } from "react";

type Variante = "espirales" | "mosaico" | "ojos";

/** Patrones inspirados en el pan de oro de Klimt, como fondo decorativo. */
export function FondoKlimt({
  variante = "espirales",
  className = "",
  opacidad = 1,
}: {
  variante?: Variante;
  className?: string;
  opacidad?: number;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden style={{ opacity: opacidad }}>
      <defs>
        {variante === "espirales" && (
          <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
            <Espiral x={18} y={18} r={13} />
            <Espiral x={50} y={50} r={10} />
            <circle cx="50" cy="14" r="3" fill="#d9b45a" />
            <circle cx="12" cy="50" r="2" fill="#b8892e" />
          </pattern>
        )}
        {variante === "mosaico" && (
          <pattern id={id} width="72" height="96" patternUnits="userSpaceOnUse">
            <rect x="4" y="6" width="18" height="34" fill="#141210" />
            <rect x="26" y="4" width="10" height="20" fill="#f4ecd8" />
            <rect x="40" y="8" width="26" height="14" fill="#b8892e" />
            <rect x="28" y="28" width="16" height="30" fill="#8b867c" />
            <rect x="48" y="28" width="14" height="22" fill="#141210" />
            <rect x="6" y="46" width="14" height="14" fill="#f4ecd8" />
            <rect x="4" y="66" width="24" height="24" fill="#d9b45a" />
            <rect x="34" y="64" width="8" height="26" fill="#141210" />
            <rect x="48" y="58" width="20" height="32" fill="#f4ecd8" />
            <rect x="52" y="64" width="6" height="10" fill="#141210" />
          </pattern>
        )}
        {variante === "ojos" && (
          <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
            <Ojo x={20} y={20} colores={["#d9506b", "#f4ecd8", "#d9506b"]} />
            <Ojo x={60} y={60} colores={["#5b7fd1", "#f4ecd8", "#8b6bc8"]} />
            <Ojo x={60} y={18} colores={["#3e8e4e", "#d9b45a", "#141210"]} r={9} />
            <Ojo x={18} y={62} colores={["#8b6bc8", "#f4ecd8", "#d9506b"]} r={9} />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function Espiral({ x, y, r }: { x: number; y: number; r: number }) {
  // Espiral de Arquímedes aproximada con arcos.
  const pasos = [1, 0.78, 0.56, 0.36, 0.18];
  const d = pasos
    .map((f, i) => {
      const rr = r * f;
      const sig = r * (pasos[i + 1] ?? 0.05);
      return i === 0
        ? `M${x + rr} ${y} A${rr} ${rr} 0 1 1 ${x - sig} ${y}`
        : `A${(rr + sig) / 2} ${(rr + sig) / 2} 0 1 1 ${x + sig} ${y}`;
    })
    .join(" ");
  return <path d={d} fill="none" stroke="#c9a24a" strokeWidth="1.3" strokeLinecap="round" />;
}

function Ojo({ x, y, colores, r = 13 }: { x: number; y: number; colores: string[]; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={colores[0]} />
      <circle cx={x} cy={y} r={r * 0.62} fill={colores[1]} />
      <circle cx={x} cy={y} r={r * 0.3} fill={colores[2]} />
    </g>
  );
}

/** Franja de mosaico para separar secciones. */
export function FranjaKlimt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-6 overflow-hidden bg-pan ${className}`} aria-hidden>
      <FondoKlimt variante="mosaico" />
    </div>
  );
}
