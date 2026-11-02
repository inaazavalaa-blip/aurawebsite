import type { Metadata } from "next";
import Acordeon from "@/components/Acordeon";
import Reveal from "@/components/Reveal";
import { Guirnalda } from "@/components/ornamentos/Botanica";
import { FrascoPerfume } from "@/components/ornamentos/Curiosidades";
import { Destello, MarcoArco } from "@/components/ornamentos/Marcos";
import { contenedor, LlamadoFinal } from "@/components/secciones/Comunes";
import { Encabezado, IconoWhatsApp } from "@/components/ui";
import { categorias, whatsappUrl, type CategoriaSlug } from "@/content/categorias";

type Props = { params: Promise<{ categoria: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categorias[(await params).categoria as CategoriaSlug];
  return { title: `Servicios · ${cat.label}`, description: "Paquetes de asesoría de imagen: Express, Transformación y VIP." };
}

const comparativa: { rasgo: string; valores: [string, string, string] }[] = [
  { rasgo: "Colorimetría y paleta personal", valores: ["✦", "✦", "✦"] },
  { rasgo: "Diagnóstico de estilo", valores: ["✦", "✦", "✦"] },
  { rasgo: "Análisis de rostro, cabello y silueta", valores: ["—", "✦", "✦"] },
  { rasgo: "Sesiones en vivo", valores: ["—", "1", "2"] },
  { rasgo: "Revisión de armario", valores: ["—", "✦", "En vivo"] },
  { rasgo: "Dossier de imagen", valores: ["PDF", "20+ págs.", "20+ págs."] },
  { rasgo: "Armario cápsula y ruta de compras", valores: ["—", "—", "✦"] },
  { rasgo: "Acompañamiento por WhatsApp", valores: ["—", "14 días", "30 días"] },
];

const preguntas = [
  {
    pregunta: "¿Las sesiones son en línea o presenciales?",
    respuesta:
      "Trabajamos en línea en todo el país y también ofrecemos sesiones presenciales. Escríbenos por WhatsApp y te decimos qué opción se adapta mejor a ti.",
  },
  {
    pregunta: "¿El cambio incluye cabello y rostro, o solo ropa?",
    respuesta:
      "El cambio es total. Definimos el corte, el color, el maquillaje o grooming y la rutina que te favorecen, y te damos una guía exacta para tu estilista. Después lo llevamos a tu armario.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda la transformación?",
    respuesta:
      "El diagnóstico Express se entrega en 48–72 horas. La Transformación y la experiencia VIP se desarrollan en dos a cuatro semanas, con acompañamiento por WhatsApp.",
  },
  {
    pregunta: "¿Cómo se paga?",
    respuesta:
      "Después de agendar te enviamos un enlace de pago seguro (Stripe o PayPal). Tu lugar queda confirmado con el pago.",
  },
  {
    pregunta: "¿Y si no sé qué paquete elegir?",
    respuesta: "Cuéntanos qué te gustaría cambiar y te recomendamos la experiencia ideal, sin compromiso.",
  },
];

export default async function Servicios({ params }: Props) {
  const cat = categorias[(await params).categoria as CategoriaSlug];

  return (
    <>
      <section className="bg-hero text-hero-fg">
        <div className={`${contenedor} grid items-center gap-10 py-16 md:grid-cols-[1.5fr_1fr] md:py-24`}>
          <Reveal>
            <p className="versalitas flex items-center gap-3">
              <Destello className="h-3 w-3" /> Les services
            </p>
            <h1 className="titulo mt-6 text-[clamp(3rem,7vw,6.2rem)]">
              Elige tu <em className={cat.slug === "mujer" ? "" : "texto-dorado"}>experiencia.</em>
            </h1>
            <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.8] opacity-85">
              Tres caminos hacia tu nueva imagen. Todos empiezan por conocerte y terminan con un estilo que puedes
              sostener cada día.
            </p>
          </Reveal>
          <Reveal delay={150} className="mx-auto w-40 md:w-56">
            <FrascoPerfume className="w-full drop-shadow-[0_24px_30px_rgb(20_18_16/0.35)]" />
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} grid gap-8 py-24 md:py-32 lg:grid-cols-3 lg:items-stretch`}>
          {cat.paquetes.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 120} className={p.destacado ? "lg:-mt-6" : ""}>
              <MarcoArco className="h-full">
                <div className={`flex h-full flex-col px-8 pb-10 pt-24 text-center ${p.destacado ? "bg-laca text-papel" : "bg-papel"}`}>
                  <p className="versalitas text-[0.6rem] text-oro">{p.etiqueta}</p>
                  <h2 className="titulo mt-4 text-[2.1rem]">{p.nombre}</h2>
                  <p className={`mt-4 text-[0.9rem] leading-relaxed ${p.destacado ? "text-papel/75" : "text-suave"}`}>
                    {p.descripcion}
                  </p>
                  <p className="titulo mt-8 text-4xl">{p.usd}</p>
                  <p className="text-[0.75rem] opacity-60">{p.mxn}</p>
                  <ul className="mt-8 flex-1 space-y-3 border-t border-current/15 pt-6 text-left text-[0.88rem]">
                    {p.incluye.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Destello className="mt-1.5 h-3 w-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(`Hola Aura, me interesa el paquete "${p.nombre}" (${cat.label}). ¿Me dan más información?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-10 inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 text-[0.72rem] tracking-[0.16em] uppercase transition ${
                      p.destacado ? "dorado text-laca hover:brightness-110" : "bg-laca text-papel hover:bg-tinta"
                    }`}
                  >
                    <IconoWhatsApp className="h-4 w-4" /> Quiero este paquete
                  </a>
                </div>
              </MarcoArco>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-papel-2">
        <Guirnalda className="h-12 w-full" />
        <div className={`${contenedor} py-20 md:py-28`}>
          <Reveal>
            <Encabezado eyebrow="Comparativa" centrado>
              Todo lo que <em className="text-oro">incluye cada una.</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120} className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-tinta/30">
                  <th className="py-4 font-normal" />
                  {cat.paquetes.map((p) => (
                    <th key={p.nombre} className="titulo px-4 py-4 text-center text-xl font-normal">
                      {p.nombre.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativa.map((fila) => (
                  <tr key={fila.rasgo} className="border-b border-linea">
                    <th className="py-4 pr-4 text-[0.92rem] font-normal">{fila.rasgo}</th>
                    {fila.valores.map((v, i) => (
                      <td key={i} className={`px-4 py-4 text-center text-[0.9rem] ${v === "✦" ? "text-oro" : v === "—" ? "text-suave/50" : ""}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="bg-papel">
        <div className={`${contenedor} grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]`}>
          <Reveal>
            <Encabezado eyebrow="Preguntas frecuentes">
              Lo que <em className="text-oro">nos suelen preguntar.</em>
            </Encabezado>
          </Reveal>
          <Reveal delay={120}>
            <Acordeon items={preguntas} />
          </Reveal>
        </div>
      </section>

      <LlamadoFinal cat={cat} />
    </>
  );
}
