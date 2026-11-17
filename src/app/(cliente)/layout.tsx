import type { Metadata } from "next";
import "../globals.css";
import { clasesFuentes } from "@/app/fuentes";

/** Páginas privadas del cliente: no se indexan y no comparten la dirección con otros sitios. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ClienteRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${clasesFuentes} min-h-svh bg-papel text-tinta antialiased`}>{children}</body>
    </html>
  );
}
