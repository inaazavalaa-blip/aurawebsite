import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import WhatsAppBoton from "@/components/WhatsAppBoton";
import { parametrosCategoria, resolverCategoria, type ParamsCategoria } from "@/i18n/params";

export const dynamicParams = false;

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return parametrosCategoria(params.lang);
}

export default async function CategoriaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ParamsCategoria;
}) {
  const { lang, id } = await resolverCategoria(params);

  return (
    <div data-cat={id} className="min-h-svh bg-papel text-tinta">
      <Cabecera lang={lang} cat={id} />
      {children}
      <Pie lang={lang} cat={id} />
      <WhatsAppBoton lang={lang} cat={id} />
    </div>
  );
}
