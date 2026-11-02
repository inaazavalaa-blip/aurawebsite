import type { CSSProperties, ReactNode } from "react";
import type { MarcoTipo } from "@/content/categorias";

type Props = { children?: ReactNode; className?: string; cresta?: boolean };

/** Arco con doble filete dorado y negro, como la etiqueta de un frasco de perfume. */
export function MarcoArco({ children, className = "", cresta = false }: Props) {
  return (
    <div className={`relative ${className}`}>
      {cresta && <Cresta className="absolute -top-[9%] left-1/2 z-10 w-[30%] -translate-x-1/2" />}
      <div className="dorado grid h-full rounded-t-[999px] p-[3.2%] shadow-[0_30px_60px_-30px_rgb(20_18_16/0.55)]">
        <div className="grid rounded-t-[999px] bg-laca p-[1.6%]">
          <div className="dorado grid rounded-t-[999px] p-[0.8%]">
            <div className="relative overflow-hidden rounded-t-[999px] bg-papel-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cuadrilobulado (cuatro semicírculos sobre un cuadrado) en un lienzo de 100×100.
const cuadrilobulo = "M25 25 A25 25 0 0 1 75 25 A25 25 0 0 1 75 75 A25 25 0 0 1 25 75 A25 25 0 0 1 25 25 Z";
const mascaraCuadrilobulo = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${cuadrilobulo.replaceAll(" ", "%20")}'/></svg>")`;

function escala(inset: number) {
  const s = (100 - inset * 2) / 100;
  return `translate(${inset} ${inset}) scale(${s})`;
}

/** Espejo cuadrilobulado con moldura de perlas, como el del escaparate. */
export function EspejoCuadrilobulo({ children, className = "" }: Props) {
  const mascara: CSSProperties = {
    WebkitMaskImage: mascaraCuadrilobulo,
    maskImage: mascaraCuadrilobulo,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_20px_30px_rgb(20_18_16/0.35)]" aria-hidden>
        <defs>
          <linearGradient id="oro-cuadrilobulo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6420" />
            <stop offset="0.3" stopColor="#d9b45a" />
            <stop offset="0.5" stopColor="#f6e3a1" />
            <stop offset="0.7" stopColor="#b8892e" />
            <stop offset="1" stopColor="#7a5718" />
          </linearGradient>
        </defs>
        <path d={cuadrilobulo} transform={escala(0)} fill="url(#oro-cuadrilobulo)" />
        <path d={cuadrilobulo} transform={escala(3.2)} fill="none" stroke="#f6e3a1" strokeWidth="1.2" strokeDasharray="0 2.6" strokeLinecap="round" />
        <path d={cuadrilobulo} transform={escala(5.6)} fill="#141210" />
        <path d={cuadrilobulo} transform={escala(6.6)} fill="url(#oro-cuadrilobulo)" />
      </svg>
      <div className="absolute inset-[7.6%] overflow-hidden bg-papel-2" style={mascara}>
        {children}
      </div>
    </div>
  );
}

/** Espejo sol barroco con rayos alternados. */
export function EspejoSol({ children, className = "" }: Props) {
  const rayos = Array.from({ length: 48 }, (_, i) => {
    const largo = i % 2 === 0 ? 98 : i % 4 === 1 ? 84 : 90;
    const a = (i / 48) * Math.PI * 2;
    const w = 0.055;
    const punto = (r: number, ang: number) => `${(100 + Math.cos(ang) * r).toFixed(2)},${(100 + Math.sin(ang) * r).toFixed(2)}`;
    return `${punto(60, a - w)} ${punto(largo, a)} ${punto(60, a + w)}`;
  });
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="oro-sol" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a6420" />
            <stop offset="0.35" stopColor="#e3c272" />
            <stop offset="0.55" stopColor="#f6e3a1" />
            <stop offset="1" stopColor="#8a6420" />
          </linearGradient>
        </defs>
        {rayos.map((pts, i) => (
          <polygon key={i} points={pts} fill="url(#oro-sol)" />
        ))}
        <circle cx="100" cy="100" r="64" fill="url(#oro-sol)" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#f6e3a1" strokeWidth="1.6" strokeDasharray="0 4" strokeLinecap="round" />
        <circle cx="100" cy="100" r="56" fill="#141210" />
        <circle cx="100" cy="100" r="54" fill="url(#oro-sol)" />
      </svg>
      <div className="absolute inset-[24%] overflow-hidden rounded-full bg-papel-2">{children}</div>
    </div>
  );
}

export function Marco({ tipo, ...props }: Props & { tipo: MarcoTipo }) {
  if (tipo === "sol") return <EspejoSol {...props} />;
  if (tipo === "cuadrilobulo") return <EspejoCuadrilobulo {...props} />;
  return <MarcoArco {...props} />;
}

/** Concha/corona barroca que remata los arcos. */
export function Cresta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden>
      <defs>
        <linearGradient id="oro-cresta" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6420" />
          <stop offset="0.45" stopColor="#f3dc95" />
          <stop offset="1" stopColor="#8a6420" />
        </linearGradient>
      </defs>
      <path
        d="M60 66 C40 66 22 58 14 44 C24 46 30 42 30 36 C20 36 12 28 14 18 C22 24 30 24 34 18 C30 10 36 2 46 4 C46 12 52 16 60 16 C68 16 74 12 74 4 C84 2 90 10 86 18 C90 24 98 24 106 18 C108 28 100 36 90 36 C90 42 96 46 106 44 C98 58 80 66 60 66 Z"
        fill="url(#oro-cresta)"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M60 62 L${36 + i * 8} 26`}
          stroke="#7a5718"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
      <circle cx="60" cy="62" r="5" fill="#141210" />
      <circle cx="60" cy="62" r="3" fill="#d9506b" />
    </svg>
  );
}

/** Destello de cuatro puntas. */
export function Destello({ className = "", color = "#d9b45a" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0 Z" fill={color} />
    </svg>
  );
}
