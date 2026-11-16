import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";

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

export const clasesFuentes = `${bodoni.variable} ${jost.variable} ${pinyon.variable}`;
