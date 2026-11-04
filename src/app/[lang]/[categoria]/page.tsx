import type { Metadata } from "next";
import { alternativas } from "@/i18n/config";
import { resolverCategoria, type ParamsCategoria } from "@/i18n/params";
import Inicio from "@/vistas/Inicio";

export async function generateMetadata({ params }: { params: ParamsCategoria }): Promise<Metadata> {
  const { id, cat } = await resolverCategoria(params);
  return { title: cat.label, description: cat.hero.intro, alternates: alternativas(id) };
}

export default async function Page({ params }: { params: ParamsCategoria }) {
  const { lang, cat } = await resolverCategoria(params);
  return <Inicio lang={lang} cat={cat} />;
}
