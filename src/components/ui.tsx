import type { ReactNode } from "react";
import { Destello } from "@/components/ornamentos/Marcos";

export function Logo({ className = "", claro = false }: { className?: string; claro?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`font-script text-[2.6rem] leading-[0.8] ${claro ? "texto-dorado" : ""}`}>Aura</span>
      <span className="mt-1 text-[0.5rem] font-medium tracking-[0.42em] uppercase">Maison d&apos;image</span>
    </span>
  );
}

export function Flecha({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function IconoWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <path d="M16 3C8.8 3 3 8.6 3 15.6c0 2.5.8 4.9 2.1 6.9L3.6 28.6l6.3-1.6c1.8 1 3.9 1.5 6.1 1.5 7.2 0 13-5.6 13-12.6S23.2 3 16 3Zm0 23c-2 0-3.9-.5-5.5-1.5l-.4-.2-3.7 1 1-3.6-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.7C5.4 9.9 10.2 5.3 16 5.3s10.6 4.6 10.6 10.3S21.8 26 16 26Zm5.8-7.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
    </svg>
  );
}

/** Encabezado de sección: versalitas con destello + título en Bodoni. */
export function Encabezado({
  eyebrow,
  children,
  className = "",
  centrado = false,
}: {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  centrado?: boolean;
}) {
  return (
    <div className={`${centrado ? "mx-auto text-center" : ""} ${className}`}>
      <p className={`versalitas flex items-center gap-3 text-oro ${centrado ? "justify-center" : ""}`}>
        <Destello className="h-3 w-3" />
        {eyebrow}
        <Destello className="h-3 w-3" />
      </p>
      <h2 className="titulo mt-5 text-[clamp(2.4rem,5vw,4.6rem)]">{children}</h2>
    </div>
  );
}

export function BotonPrincipal({
  href,
  children,
  externo = false,
  variante = "laca",
  className = "",
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
  variante?: "laca" | "oro" | "claro";
  className?: string;
}) {
  const estilos = {
    laca: "bg-laca text-papel hover:bg-tinta",
    oro: "dorado text-laca hover:brightness-110",
    claro: "border border-current hover:bg-laca hover:text-papel",
  }[variante];
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-4 rounded-full px-7 py-4 text-[0.75rem] font-medium tracking-[0.18em] uppercase transition-all ${estilos} ${className}`}
    >
      {children}
    </a>
  );
}
