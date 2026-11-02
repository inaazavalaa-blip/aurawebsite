import { notFound } from "next/navigation";
import Cabecera from "@/components/Cabecera";
import Pie from "@/components/Pie";
import WhatsAppBoton from "@/components/WhatsAppBoton";
import { esCategoria, slugs } from "@/content/categorias";

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((categoria) => ({ categoria }));
}

export default async function CategoriaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!esCategoria(categoria)) notFound();

  return (
    <div data-cat={categoria} className="min-h-svh bg-papel text-tinta">
      <Cabecera cat={categoria} />
      {children}
      <Pie cat={categoria} />
      <WhatsAppBoton cat={categoria} />
    </div>
  );
}
