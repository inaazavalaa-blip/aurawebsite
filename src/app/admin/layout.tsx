import type { Metadata } from "next";
import "../globals.css";
import { clasesFuentes } from "@/app/fuentes";
import { textos } from "@/app/admin/textos";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await textos();
  return { title: t.tituloPestana, robots: { index: false, follow: false } };
}

export default async function AdminRaiz({ children }: Readonly<{ children: React.ReactNode }>) {
  const { idioma } = await textos();
  return (
    <html lang={idioma}>
      <body className={`${clasesFuentes} antialiased`}>{children}</body>
    </html>
  );
}
