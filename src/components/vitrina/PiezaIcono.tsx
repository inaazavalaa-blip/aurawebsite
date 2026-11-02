import type { ReactNode } from "react";
import type { TipoPieza } from "@/content/vitrina";

type Dibujo = { vb: [number, number]; dibujar: (c: string) => ReactNode };

const trazo = { stroke: "rgb(29 26 22 / 0.55)", strokeWidth: 1.3, strokeLinejoin: "round" as const };
const sombra = "rgb(20 18 16 / 0.16)";
const brillo = "rgb(255 255 255 / 0.35)";

const dibujos: Record<TipoPieza, Dibujo> = {
  vestido: {
    vb: [100, 130],
    dibujar: (c) => (
      <>
        <path d="M38 4 L44 4 L50 14 L56 4 L62 4 L66 30 L60 44 L88 126 L12 126 L40 44 L34 30 Z" fill={c} {...trazo} />
        <path d="M40 44 H60" stroke={sombra} strokeWidth="3" />
        <path d="M50 46 L48 124 M64 60 L76 124 M36 60 L24 124" stroke={sombra} strokeWidth="1.2" />
      </>
    ),
  },
  "vestido-largo": {
    vb: [100, 170],
    dibujar: (c) => (
      <>
        <path d="M38 4 L44 4 L50 16 L56 4 L62 4 L66 32 L60 48 L96 166 L4 166 L40 48 L34 32 Z" fill={c} {...trazo} />
        <path d="M40 48 H60" stroke={brillo} strokeWidth="3" />
        <path d="M50 50 L50 164 M62 70 L82 164 M38 70 L18 164" stroke={sombra} strokeWidth="1.2" />
      </>
    ),
  },
  falda: {
    vb: [100, 74],
    dibujar: (c) => (
      <>
        <path d="M30 4 H70 L92 70 H8 Z" fill={c} {...trazo} />
        <path d="M30 10 H70" stroke={sombra} strokeWidth="3" />
        {[22, 36, 50, 64, 78].map((x) => (
          <path key={x} d={`M${30 + (x - 50) * 0.4 + 20} 12 L${x} 70`} stroke={sombra} strokeWidth="1" />
        ))}
      </>
    ),
  },
  blusa: {
    vb: [120, 92],
    dibujar: (c) => (
      <>
        <path d="M42 6 Q60 22 78 6 L104 18 L116 56 L102 60 L92 36 L92 88 H28 V36 L18 60 L4 56 L16 18 Z" fill={c} {...trazo} />
        <path d="M42 6 Q60 30 78 6" fill="none" stroke={sombra} strokeWidth="1.4" />
        <path d="M30 80 Q60 86 90 80" fill="none" stroke={brillo} strokeWidth="2" />
      </>
    ),
  },
  playera: {
    vb: [120, 92],
    dibujar: (c) => (
      <>
        <path d="M44 6 Q60 16 76 6 L108 20 L100 42 L88 36 V88 H32 V36 L20 42 L12 20 Z" fill={c} {...trazo} />
        <path d="M44 6 Q60 20 76 6" fill="none" stroke={sombra} strokeWidth="2" />
      </>
    ),
  },
  camisa: {
    vb: [120, 102],
    dibujar: (c) => (
      <>
        <path d="M42 8 L60 16 L78 8 L104 18 L116 70 L102 72 L92 38 L92 98 H28 V38 L18 72 L4 70 L16 18 Z" fill={c} {...trazo} />
        <path d="M42 8 L52 26 L60 16 L68 26 L78 8 L66 4 H54 Z" fill={c} {...trazo} />
        <path d="M60 18 V98" stroke={sombra} strokeWidth="1" />
        {[34, 50, 66, 82].map((y) => (
          <circle key={y} cx="63" cy={y} r="1.4" fill="rgb(29 26 22 / 0.5)" />
        ))}
      </>
    ),
  },
  blazer: {
    vb: [130, 112],
    dibujar: (c) => (
      <>
        <path d="M14 18 L4 74 L16 78 L22 46 Z M116 18 L126 74 L114 78 L108 46 Z" fill={c} {...trazo} />
        <path d="M48 6 L20 14 L14 18 L22 46 L22 108 H60 L62 56 L50 26 Z" fill={c} {...trazo} />
        <path d="M82 6 L110 14 L116 18 L108 46 L108 108 H70 L68 56 L80 26 Z" fill={c} {...trazo} />
        <path d="M48 6 L44 30 L56 40 L50 26 Z M82 6 L86 30 L74 40 L80 26 Z" fill={sombra} />
        <path d="M30 80 H48 M82 80 H100" stroke={sombra} strokeWidth="1.4" />
        <circle cx="64" cy="70" r="2" fill="rgb(29 26 22 / 0.5)" />
      </>
    ),
  },
  abrigo: {
    vb: [130, 152],
    dibujar: (c) => (
      <>
        <path d="M14 18 L4 92 L16 96 L22 50 Z M116 18 L126 92 L114 96 L108 50 Z" fill={c} {...trazo} />
        <path d="M48 6 L20 14 L14 18 L22 50 L20 148 H62 L62 58 L50 26 Z" fill={c} {...trazo} />
        <path d="M82 6 L110 14 L116 18 L108 50 L110 148 H68 L68 58 L80 26 Z" fill={c} {...trazo} />
        <path d="M48 6 L40 34 L56 44 L50 26 Z M82 6 L90 34 L74 44 L80 26 Z" fill={sombra} />
        <path d="M22 84 H62 M68 84 H110" stroke={sombra} strokeWidth="2" />
      </>
    ),
  },
  pantalon: {
    vb: [90, 132],
    dibujar: (c) => (
      <>
        <path d="M14 4 H76 L84 128 H54 L45 40 L36 128 H6 Z" fill={c} {...trazo} />
        <path d="M14 12 H76" stroke={sombra} strokeWidth="2" />
        <path d="M28 14 L22 126 M62 14 L68 126" stroke={brillo} strokeWidth="1.2" />
      </>
    ),
  },
  corbata: {
    vb: [40, 112],
    dibujar: (c) => (
      <>
        <path d="M13 4 H27 L24 16 H16 Z" fill={c} {...trazo} />
        <path d="M16 16 H24 L32 92 L20 108 L8 92 Z" fill={c} {...trazo} />
        <path d="M12 40 L28 30 M10 62 L30 50 M10 84 L31 72" stroke={brillo} strokeWidth="2" />
      </>
    ),
  },
  mono: {
    vb: [80, 40],
    dibujar: (c) => (
      <>
        <path d="M34 14 L6 4 Q2 20 6 36 L34 26 Z M46 14 L74 4 Q78 20 74 36 L46 26 Z" fill={c} {...trazo} />
        <rect x="33" y="12" width="14" height="16" rx="3" fill={c} {...trazo} />
      </>
    ),
  },
  collar: {
    vb: [100, 60],
    dibujar: (c) => (
      <>
        {Array.from({ length: 15 }, (_, i) => {
          const t = i / 14;
          return (
            <circle
              key={i}
              cx={10 + t * 80}
              cy={8 + Math.sin(t * Math.PI) * 38}
              r={i === 7 ? 6 : 4}
              fill={i === 7 ? "#d9b45a" : c}
              {...trazo}
              strokeWidth={0.8}
            />
          );
        })}
      </>
    ),
  },
  panuelo: {
    vb: [100, 64],
    dibujar: (c) => (
      <>
        <path d="M6 6 Q50 26 94 6 L80 22 Q50 34 20 22 Z" fill={c} {...trazo} />
        <path d="M44 24 L36 60 L50 46 L52 62 L58 26 Z" fill={c} {...trazo} />
        <circle cx="50" cy="26" r="6" fill={c} {...trazo} />
        <path d="M20 14 Q50 26 80 14" stroke={brillo} strokeWidth="2" fill="none" />
      </>
    ),
  },
  "panuelo-bolsillo": {
    vb: [40, 30],
    dibujar: (c) => (
      <>
        <path d="M4 14 L12 2 L20 12 L28 2 L36 14 Z" fill={c} {...trazo} />
        <rect x="2" y="14" width="36" height="14" fill="rgb(20 18 16 / 0.25)" />
      </>
    ),
  },
  sombrero: {
    vb: [140, 64],
    dibujar: (c) => (
      <>
        <ellipse cx="70" cy="48" rx="66" ry="13" fill={c} {...trazo} />
        <path d="M40 48 C40 14 50 4 70 4 C90 4 100 14 100 48 Z" fill={c} {...trazo} />
        <path d="M40 38 C56 44 84 44 100 38 L100 46 C84 52 56 52 40 46 Z" fill="#141210" opacity="0.75" />
      </>
    ),
  },
  lentes: {
    vb: [120, 42],
    dibujar: (c) => (
      <>
        <rect x="6" y="6" width="44" height="30" rx="14" fill={c} {...trazo} />
        <rect x="70" y="6" width="44" height="30" rx="14" fill={c} {...trazo} />
        <path d="M50 16 Q60 8 70 16" stroke={c} strokeWidth="4" fill="none" />
        <path d="M14 14 L24 12 M78 14 L88 12" stroke={brillo} strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
  aretes: {
    vb: [100, 44],
    dibujar: (c) => (
      <>
        {[8, 92].map((x) => (
          <g key={x}>
            <circle cx={x} cy="6" r="3" fill="#d9b45a" />
            <line x1={x} y1="9" x2={x} y2="18" stroke="#b8892e" strokeWidth="1.4" />
            <path d={`M${x} 18 C${x + 7} 26 ${x + 6} 38 ${x} 40 C${x - 6} 38 ${x - 7} 26 ${x} 18 Z`} fill={c} {...trazo} strokeWidth={0.8} />
          </g>
        ))}
      </>
    ),
  },
  bolso: {
    vb: [90, 92],
    dibujar: (c) => (
      <>
        <path d="M28 34 C28 10 62 10 62 34" fill="none" stroke={c} strokeWidth="6" />
        <path d="M28 34 C28 10 62 10 62 34" fill="none" stroke="rgb(29 26 22 / 0.4)" strokeWidth="1" />
        <path d="M12 34 H78 L86 88 H4 Z" fill={c} {...trazo} />
        <path d="M12 34 H78 L72 54 H18 Z" fill={sombra} />
        <rect x="40" y="50" width="10" height="8" rx="2" fill="#d9b45a" />
      </>
    ),
  },
  clutch: {
    vb: [100, 52],
    dibujar: (c) => (
      <>
        <rect x="4" y="6" width="92" height="42" rx="5" fill={c} {...trazo} />
        <path d="M4 10 L50 32 L96 10" fill={sombra} stroke="rgb(29 26 22 / 0.4)" strokeWidth="1" />
        <circle cx="50" cy="32" r="3.4" fill="#d9b45a" />
      </>
    ),
  },
  tacon: {
    vb: [110, 62],
    dibujar: (c) => (
      <>
        <path d="M6 54 C10 36 22 22 34 18 C44 30 66 40 96 42 C104 42 106 52 100 56 H40 C30 56 22 48 18 40 L10 58 Z" fill={c} {...trazo} />
        <path d="M18 40 L12 60" stroke={c} strokeWidth="4" />
        <path d="M40 56 H100" stroke="#141210" strokeWidth="2" />
      </>
    ),
  },
  mocasin: {
    vb: [110, 52],
    dibujar: (c) => (
      <>
        <path d="M6 42 C6 26 16 16 30 16 H56 C76 18 96 24 104 34 C108 40 104 46 96 46 H10 Z" fill={c} {...trazo} />
        <path d="M52 22 C62 22 74 26 80 32" stroke="rgb(29 26 22 / 0.45)" strokeWidth="1.4" fill="none" />
        <path d="M58 30 H72" stroke="#d9b45a" strokeWidth="2.4" />
        <path d="M8 46 H98" stroke="#141210" strokeWidth="3" />
      </>
    ),
  },
  bota: {
    vb: [100, 82],
    dibujar: (c) => (
      <>
        <path d="M14 4 H48 V40 C66 42 86 48 94 60 C96 66 94 72 86 72 H8 V60 C10 40 14 22 14 4 Z" fill={c} {...trazo} />
        <path d="M6 74 H90" stroke="#141210" strokeWidth="4" />
        <path d="M18 10 H44" stroke={brillo} strokeWidth="2" />
      </>
    ),
  },
  tenis: {
    vb: [110, 52],
    dibujar: (c) => (
      <>
        <path d="M6 38 C6 24 14 12 28 12 L44 12 C54 22 70 28 92 30 C102 32 106 38 104 42 H6 Z" fill={c} {...trazo} />
        <path d="M4 42 H106 V48 H4 Z" fill="#fbf6ea" {...trazo} />
        <path d="M40 18 L50 24 M46 14 L56 20 M52 22 L62 27" stroke="rgb(29 26 22 / 0.5)" strokeWidth="1.2" />
        <path d="M22 30 C40 34 60 34 78 32" stroke="#d9b45a" strokeWidth="2.2" fill="none" />
      </>
    ),
  },
  reloj: {
    vb: [40, 72],
    dibujar: (c) => (
      <>
        <rect x="12" y="2" width="16" height="68" rx="4" fill={c} {...trazo} />
        <circle cx="20" cy="36" r="15" fill={c} {...trazo} />
        <circle cx="20" cy="36" r="11" fill="#fbf6ea" />
        <path d="M20 36 V28 M20 36 L26 38" stroke="#141210" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  labial: {
    vb: [40, 100],
    dibujar: (c) => (
      <>
        <path d="M12 30 L12 14 L26 6 L28 30 Z" fill={c} {...trazo} />
        <rect x="9" y="30" width="22" height="14" fill="#d9b45a" {...trazo} />
        <rect x="7" y="44" width="26" height="52" rx="2" fill="#141210" />
        <path d="M11 50 V90" stroke="rgb(255 255 255 / 0.25)" strokeWidth="2" />
      </>
    ),
  },
  perfume: {
    vb: [70, 104],
    dibujar: (c) => (
      <>
        <rect x="22" y="4" width="26" height="22" rx="2" fill="#d9b45a" {...trazo} />
        <path d="M10 40 L18 28 H52 L60 40 V98 H10 Z" fill={c} {...trazo} />
        <path d="M20 94 V58 C20 50 26 46 35 46 C44 46 50 50 50 58 V94 Z" fill="#fbf6ea" stroke="#141210" strokeWidth="2" />
        <circle cx="35" cy="66" r="5" fill="#d9506b" />
        <circle cx="29" cy="76" r="3.4" fill="#5b7fd1" />
        <path d="M35 70 V90" stroke="#3e8e4e" strokeWidth="1.6" />
      </>
    ),
  },
  cinturon: {
    vb: [120, 26],
    dibujar: (c) => (
      <>
        <rect x="2" y="7" width="116" height="12" rx="2" fill={c} {...trazo} />
        <rect x="50" y="3" width="20" height="20" rx="3" fill="none" stroke="#d9b45a" strokeWidth="3.4" />
      </>
    ),
  },
};

export function vbDe(tipo: TipoPieza) {
  return dibujos[tipo].vb;
}

export default function PiezaIcono({
  tipo,
  color,
  className = "",
  titulo,
}: {
  tipo: TipoPieza;
  color: string;
  className?: string;
  titulo?: string;
}) {
  const d = dibujos[tipo];
  return (
    <svg
      viewBox={`0 0 ${d.vb[0]} ${d.vb[1]}`}
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      {d.dibujar(color)}
    </svg>
  );
}
