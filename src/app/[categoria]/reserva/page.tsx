import type { Metadata } from "next";
import FormularioReserva from "@/components/FormularioReserva";
import Reveal from "@/components/Reveal";
import { Guirnalda } from "@/components/ornamentos/Botanica";
import { SagradoCorazon } from "@/components/ornamentos/Curiosidades";
import { Destello } from "@/components/ornamentos/Marcos";
import { contenedor } from "@/components/secciones/Comunes";
import { IconoWhatsApp } from "@/components/ui";
import { categorias, enlaces, whatsappUrl, type CategoriaSlug } from "@/content/categorias";

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categorias[(await params).categoria as CategoriaSlug];
  return { title: `Reserva · ${cat.label}`, description: "Reserva tu transformación de imagen con Aura por WhatsApp." };
}

const pasos = [
  { numeral: "I", titulo: "Escríbenos", texto: "Llena el formulario o mándanos un WhatsApp. Respondemos en menos de 24 horas." },
  { numeral: "II", titulo: "Agenda", texto: "Elegimos juntos fecha, hora y modalidad para tu sesión." },
  { numeral: "III", titulo: "Confirma", texto: "Asegura tu lugar con un enlace de pago seguro (Stripe o PayPal)." },
];

export default async function Reserva({ params }: Props) {
  const cat = categorias[(await params).categoria as CategoriaSlug];

  return (
    <>
      <section className="bg-hero text-hero-fg">
        <div className={`${contenedor} grid items-center gap-10 py-16 md:grid-cols-[1.6fr_1fr] md:py-24`}>
          <Reveal>
            <p className="versalitas flex items-center gap-3">
              <Destello className="h-3 w-3" /> Reserva
            </p>
            <h1 className="titulo mt-6 text-[clamp(3rem,7vw,6.2rem)]">
              Tu transformación <em className={cat.slug === "mujer" ? "" : "texto-dorado"}>empieza hoy.</em>
            </h1>
          </Reveal>
          <Reveal delay={150} className="mx-auto w-32 md:w-44">
            <SagradoCorazon className="w-full" />
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} grid gap-16 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr]`}>
          <div>
            <ol className="space-y-8">
              {pasos.map((p, i) => (
                <Reveal as="li" key={p.titulo} delay={i * 110} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="titulo text-4xl italic text-oro">{p.numeral}</span>
                  <div>
                    <h2 className="titulo text-2xl">{p.titulo}</h2>
                    <p className="mt-1 leading-relaxed text-suave">{p.texto}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={300} className="mt-12 rounded-t-[999px] border border-oro/50 bg-papel-2 px-8 pb-8 pt-16 text-center">
              <p className="versalitas text-oro">Contacto directo</p>
              <a
                href={whatsappUrl(`Hola Aura, quiero reservar mi sesión (${cat.label}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="titulo mt-4 flex items-center justify-center gap-3 text-2xl hover:text-oro"
              >
                <IconoWhatsApp className="h-6 w-6 text-[#1f7a4d]" />
                {enlaces.whatsappVisible}
              </a>
              <a href={`mailto:${enlaces.email}`} className="mt-3 block text-suave hover:text-tinta">
                {enlaces.email}
              </a>
            </Reveal>
          </div>
          <Reveal delay={150} className="rounded-[2rem] bg-papel-2 p-6 md:p-10">
            <h2 className="titulo text-3xl">Cuéntanos de ti</h2>
            <p className="mt-2 mb-8 text-[0.9rem] text-suave">
              Al enviar se abre WhatsApp con tu mensaje listo para mandarlo.
            </p>
            <FormularioReserva cat={cat} />
          </Reveal>
        </div>
        <Guirnalda className="h-12 w-full" />
      </section>
    </>
  );
}
