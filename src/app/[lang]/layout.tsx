import type { Metadata } from "next";
import "../globals.css";
import { clasesFuentes } from "@/app/fuentes";
import { alternativas, SITIO } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { idiomaValido, parametrosIdioma, type ParamsLang } from "@/i18n/params";
import { Analytics } from "@vercel/analytics/next";

export const dynamicParams = false;
export const generateStaticParams = parametrosIdioma;

export async function generateMetadata({ params }: { params: ParamsLang }): Promise<Metadata> {
  const lang = idiomaValido((await params).lang);
  const t = dic(lang).meta;
  return {
    metadataBase: new URL(SITIO),
    title: { default: t.sitio, template: "%s · Aura" },
    description: t.descripcion,
    alternates: alternativas(),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: ParamsLang;
}>) {
  const lang = idiomaValido((await params).lang);
  return (
    <html lang={lang}>
      <body className={`${clasesFuentes} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
