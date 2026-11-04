import type { Metadata } from "next";
import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";
import "../globals.css";
import { alternativas, SITIO } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";
import { idiomaValido, parametrosIdioma, type ParamsLang } from "@/i18n/params";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

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
      <body className={`${bodoni.variable} ${jost.variable} ${pinyon.variable} antialiased`}>{children}</body>
    </html>
  );
}
