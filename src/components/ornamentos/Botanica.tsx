/*
 * Ilustraciones botánicas propias (lirio, aciano, margarita, hoja) para componer
 * ramos y guirnaldas como un jardín pintado.
 */

const LIRIO = "#d9506b";
const LIRIO_CLARO = "#f08aa0";
const ACIANO = "#5b7fd1";
const HOJA = "#3e8e4e";
const HOJA_CLARA = "#6bb36f";

export function Lirio({ x = 0, y = 0, s = 1, r = 0 }: { x?: number; y?: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d="M0 0 C7 -9 8 -26 0 -40 C-8 -26 -7 -9 0 0Z" fill={LIRIO} />
          <path d="M0 -4 C2 -14 2 -26 0 -34" stroke={LIRIO_CLARO} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {[-30, -10, 10, 30].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1="0" x2="0" y2="-24" stroke="#7a5718" strokeWidth="0.8" />
          <ellipse cx="0" cy="-25" rx="1.6" ry="3" fill="#b8892e" />
        </g>
      ))}
      <circle r="3" fill="#f6e3a1" />
    </g>
  );
}

export function Aciano({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${i * 36})`}
          d="M0 0 L5 -14 L3 -13 L1.5 -18 L0 -13 L-1.5 -18 L-3 -13 L-5 -14 Z"
          fill={ACIANO}
        />
      ))}
      <circle r="4" fill="#2c3f75" />
      <circle r="1.6" fill="#f6e3a1" />
    </g>
  );
}

export function Margarita({ x = 0, y = 0, s = 1, centro = "#f3d33b" }: { x?: number; y?: number; s?: number; centro?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} transform={`rotate(${i * 30})`} cx="0" cy="-9" rx="3" ry="8" fill="#fffdf6" stroke="#d8cdb4" strokeWidth="0.6" />
      ))}
      <circle r="5" fill={centro} />
      <circle r="5" fill="none" stroke="#b8892e" strokeWidth="0.8" strokeDasharray="0 1.6" strokeLinecap="round" />
    </g>
  );
}

export function Hoja({ x = 0, y = 0, s = 1, r = 0, clara = false }: { x?: number; y?: number; s?: number; r?: number; clara?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C9 -10 9 -30 0 -46 C-9 -30 -9 -10 0 0Z" fill={clara ? HOJA_CLARA : HOJA} />
      <path d="M0 -2 L0 -40" stroke="#25603a" strokeWidth="0.9" opacity="0.6" />
    </g>
  );
}

function Tallo({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={HOJA} strokeWidth="2.2" strokeLinecap="round" />;
}

/** Ramo vertical: un jardín de flores que crece desde abajo. */
export function Ramo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 400" className={className} aria-hidden>
      <Tallo d="M100 400 C96 320 104 240 98 150" />
      <Tallo d="M60 400 C58 340 46 290 40 230" />
      <Tallo d="M140 400 C144 340 156 300 162 250" />
      <Tallo d="M80 400 C78 360 70 330 66 300" />
      <Tallo d="M120 400 C124 370 130 340 134 318" />
      <Hoja x={100} y={300} r={-38} />
      <Hoja x={98} y={250} r={36} clara />
      <Hoja x={50} y={330} r={-24} s={0.9} />
      <Hoja x={150} y={340} r={28} s={0.9} clara />
      <Hoja x={66} y={370} r={-50} s={0.7} />
      <Hoja x={132} y={378} r={50} s={0.7} />
      <Lirio x={98} y={140} s={1} r={8} />
      <Lirio x={40} y={222} s={0.8} r={-14} />
      <Lirio x={162} y={242} s={0.82} r={18} />
      <Aciano x={66} y={294} s={1.1} />
      <Aciano x={134} y={312} s={1.1} />
      <Aciano x={140} y={170} s={0.9} />
      <Margarita x={58} y={160} s={0.9} />
      <Margarita x={112} y={210} s={0.7} centro="#d9b45a" />
      <Margarita x={30} y={300} s={0.6} />
      <Margarita x={172} y={300} s={0.6} />
    </svg>
  );
}

/** Guirnalda horizontal que se repite. */
export function Guirnalda({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 60" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <path d="M0 30 C60 10 100 50 160 30 S260 10 320 30 S380 50 400 30" fill="none" stroke={HOJA} strokeWidth="2" />
      {[20, 90, 150, 220, 290, 360].map((x, i) => (
        <g key={x}>
          <Hoja x={x} y={30} r={i % 2 ? 60 : -60} s={0.5} clara={i % 3 === 0} />
          <Hoja x={x + 10} y={30} r={i % 2 ? 120 : -120} s={0.45} />
        </g>
      ))}
      <Lirio x={60} y={24} s={0.45} />
      <Aciano x={125} y={38} s={0.9} />
      <Margarita x={190} y={26} s={0.75} />
      <Lirio x={255} y={34} s={0.42} r={20} />
      <Aciano x={325} y={24} s={0.9} />
      <Margarita x={385} y={36} s={0.7} centro="#d9b45a" />
    </svg>
  );
}

/** Flor suelta para salpicar composiciones. */
export function Flor({ tipo, className = "" }: { tipo: "lirio" | "aciano" | "margarita"; className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden>
      {tipo === "lirio" && <Lirio s={1.1} />}
      {tipo === "aciano" && <Aciano s={2.4} />}
      {tipo === "margarita" && <Margarita s={2.6} />}
    </svg>
  );
}
