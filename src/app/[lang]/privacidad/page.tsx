import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { idiomaValido, type ParamsLang } from "@/i18n/params";

/*
 * Aviso según el RGPD (Aura opera desde República Checa).
 * Pendiente: agregar el domicilio postal cuando esté confirmado
 * y pedir a un profesional que revise este texto.
 */
const correoPrivacidad = "bzarvintage@gmail.com";

const textos = {
  es: {
    titulo: "Aviso de privacidad",
    volver: "Volver al inicio",
    secciones: [
      [
        "Quién es responsable",
        `Paulina Zavala, que opera bajo la marca Aura desde República Checa, es la responsable del tratamiento de tus datos personales. Puedes contactarla en ${correoPrivacidad}. Aura es un proyecto en línea de asesoría de imagen: análisis de color personalizado, recomendaciones de colores por estación y asesoría de imagen.`,
      ],
      ["Qué datos usamos", "Tu nombre, teléfono o WhatsApp, correo si lo compartes, el servicio que te interesa, la modalidad, la fecha preferida y lo que nos cuentes en tu mensaje."],
      [
        "Para qué los usamos y con qué base",
        "Para responder tu solicitud, agendar y dar seguimiento a tu servicio. Los tratamos con tu consentimiento y porque son necesarios para preparar y prestar el servicio que pides. No los vendemos ni los usamos para otros fines.",
      ],
      [
        "Con quién se comparten",
        "Se guardan en nuestro proveedor de base de datos, Supabase, y la conversación continúa por WhatsApp o correo, según elijas. Estos proveedores los procesan solo para prestarnos su servicio y pueden hacerlo fuera de la Unión Europea, con las garantías que exige el RGPD.",
      ],
      ["Cuánto tiempo los guardamos", "Solo el tiempo necesario para atender tu solicitud y dar seguimiento a tu servicio. Después los borramos, salvo que la ley nos obligue a conservarlos."],
      [
        "Tus derechos",
        `Puedes pedir acceder a tus datos, corregirlos, borrarlos, limitar u oponerte a su uso, llevártelos a otro servicio o retirar tu consentimiento en cualquier momento, escribiendo a ${correoPrivacidad}. También puedes presentar una queja ante la autoridad checa de protección de datos (Úřad pro ochranu osobních údajů, uoou.gov.cz).`,
      ],
    ],
  },
  en: {
    titulo: "Privacy notice",
    volver: "Back to home",
    secciones: [
      [
        "Who is responsible",
        `Paulina Zavala, operating under the brand Aura from the Czech Republic, is the controller of your personal data. You can contact her at ${correoPrivacidad}. Aura is an online image consulting project offering personalized color analysis, seasonal color recommendations and image consulting.`,
      ],
      ["What data we use", "Your name, phone or WhatsApp number, email if you share it, the service you're interested in, the format, your preferred date and anything you tell us in your message."],
      [
        "Why we use it and on what basis",
        "To answer your request, schedule and follow up on your service. We process it with your consent and because it is needed to prepare and provide the service you ask for. We don't sell it or use it for other purposes.",
      ],
      [
        "Who it is shared with",
        "It is stored with our database provider, Supabase, and the conversation continues on WhatsApp or email, as you choose. These providers process it only to provide their service to us and may do so outside the European Union, with the safeguards the GDPR requires.",
      ],
      ["How long we keep it", "Only as long as needed to handle your request and follow up on your service. After that we delete it, unless the law requires us to keep it."],
      [
        "Your rights",
        `You can ask to access, correct or delete your data, restrict or object to its use, take it to another service, or withdraw your consent at any time by writing to ${correoPrivacidad}. You can also lodge a complaint with the Czech data protection authority (Úřad pro ochranu osobních údajů, uoou.gov.cz).`,
      ],
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: ParamsLang }): Promise<Metadata> {
  const lang = idiomaValido((await params).lang);
  return { title: textos[lang].titulo };
}

export default async function Privacidad({ params }: { params: ParamsLang }) {
  const lang = idiomaValido((await params).lang);
  const t = textos[lang];
  return (
    <main className="mx-auto min-h-svh max-w-2xl px-5 py-16">
      <Link href={lang === "es" ? "/" : "/en"} aria-label={t.volver}>
        <Logo />
      </Link>
      <h1 className="titulo mt-12 text-5xl">{t.titulo}</h1>
      <div className="mt-10 space-y-8">
        {t.secciones.map(([titulo, texto]) => (
          <section key={titulo}>
            <h2 className="titulo text-2xl">{titulo}</h2>
            <p className="mt-2 leading-relaxed text-suave">{texto}</p>
          </section>
        ))}
      </div>
      <Link href={lang === "es" ? "/" : "/en"} className="mt-12 inline-block border-b border-tinta/30 pb-1 text-[0.85rem]">
        {t.volver}
      </Link>
    </main>
  );
}
