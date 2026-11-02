"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IconoWhatsApp } from "@/components/ui";
import { categorias, paginas, whatsappUrl, type CategoriaSlug } from "@/content/categorias";

export default function WhatsAppBoton({ cat }: { cat: CategoriaSlug }) {
  const pathname = usePathname();
  const subruta = pathname.replace(`/${cat}`, "");
  const pagina = [...paginas, { ruta: "/reserva", label: "Reserva" }].find((p) => p.ruta === subruta)?.label ?? "Inicio";
  const texto = `Hola Aura, vi la página "${pagina}" (${categorias[cat].label}) y me gustaría información para mi cambio de imagen.`;

  return (
    <motion.a
      href={whatsappUrl(texto)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-8 md:right-8"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-laca px-4 py-2 text-[0.7rem] tracking-[0.14em] text-papel uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Escríbenos
      </span>
      <span className="dorado relative grid h-14 w-14 place-items-center rounded-full p-[3px] shadow-[0_12px_30px_-8px_rgb(20_18_16/0.55)]">
        <span className="grid h-full w-full place-items-center rounded-full bg-[#1f7a4d] text-white">
          <IconoWhatsApp className="h-7 w-7" />
        </span>
      </span>
    </motion.a>
  );
}
