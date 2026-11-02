import type { Metadata } from "next";
import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Aura · Maison de imagen",
    template: "%s · Aura",
  },
  description:
    "Aura es una maison de asesoría de imagen integral para mujer y hombre: cabello, rostro, color, silueta y armario. Un cambio total, con estilo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bodoni.variable} ${jost.variable} ${pinyon.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
