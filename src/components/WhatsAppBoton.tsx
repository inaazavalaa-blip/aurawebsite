"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IconoWhatsApp } from "@/components/ui";
import { categorias, whatsappUrl, type CategoriaSlug } from "@/content/categorias";
import { analizarRuta, type Lang } from "@/i18n/config";
import { dic } from "@/i18n/diccionarios";

export default function WhatsAppBoton({ lang, cat }: { lang: Lang; cat: CategoriaSlug }) {
  const pathname = usePathname();
  const t = dic(lang);
  const { seccion } = analizarRuta(pathname);
  const pagina = seccion ? t.nav[seccion] : t.nav.inicio;
  const texto = t.wa.pagina(pagina, categorias[lang][cat].label);

  return (
    <motion.a
      href={whatsappUrl(texto)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.wa.botonAria}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-8 md:right-8"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-laca px-4 py-2 text-[0.7rem] tracking-[0.14em] text-papel uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        {t.wa.boton}
      </span>
      <span className="dorado relative grid h-14 w-14 place-items-center rounded-full p-[3px] shadow-[0_12px_30px_-8px_rgb(20_18_16/0.55)]">
        <span className="grid h-full w-full place-items-center rounded-full bg-[#1f7a4d] text-white">
          <IconoWhatsApp className="h-7 w-7" />
        </span>
      </span>
    </motion.a>
  );
}
