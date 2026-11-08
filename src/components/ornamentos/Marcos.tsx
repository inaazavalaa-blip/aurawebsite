import type { CSSProperties, ReactNode } from "react";
import type { MarcoTipo } from "@/content/categorias";

type Props = { children?: ReactNode; className?: string };

/** Arco con doble filete dorado y negro, como la etiqueta de un frasco de perfume. */
export function MarcoArco({ children, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
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
