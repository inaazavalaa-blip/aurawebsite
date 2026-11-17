import type { CategoriaSlug } from "@/content/categorias";
import type { Lang } from "@/i18n/config";

/*
 * Textos del área privada del cliente y de la página de pago recibido.
 * Si cambias un texto en español, cambia también el inglés.
 */

export type Pregunta = { id: string; texto: string; ayuda?: string; larga?: boolean; opcional?: boolean };

const preguntasComunes: Record<Lang, Pregunta[]> = {
  es: [
    { id: "dia", texto: "¿A qué te dedicas y cómo es un día normal para ti?", larga: true },
    { id: "percepcion", texto: "¿Cómo te gustaría que te percibieran?", ayuda: "Por ejemplo: cercana, profesional, creativa, elegante…", larga: true },
    { id: "palabras", texto: "Tres palabras que describan el estilo que buscas" },
    { id: "colores", texto: "Colores que te encantan y colores que evitas", larga: true },
    { id: "favoritos", texto: "Prendas o looks con los que te sientes mejor", larga: true },
    { id: "cambiar", texto: "¿Qué te gustaría cambiar de tu imagen actual?", larga: true },
    { id: "tallas", texto: "Tus tallas habituales (ropa y calzado)" },
    { id: "presupuesto", texto: "Presupuesto aproximado para compras", opcional: true },
    { id: "inspiracion", texto: "Enlaces de inspiración (Pinterest, Instagram…)", opcional: true, larga: true },
    { id: "extra", texto: "¿Algo más que debamos saber?", ayuda: "Ocasiones especiales, materiales que no toleras, etc.", opcional: true, larga: true },
  ],
  en: [
    { id: "dia", texto: "What do you do, and what does a normal day look like for you?", larga: true },
    { id: "percepcion", texto: "How would you like to come across?", ayuda: "For example: approachable, professional, creative, elegant…", larga: true },
    { id: "palabras", texto: "Three words that describe the style you're looking for" },
    { id: "colores", texto: "Colours you love and colours you avoid", larga: true },
    { id: "favoritos", texto: "Clothes or looks you feel your best in", larga: true },
    { id: "cambiar", texto: "What would you like to change about your current image?", larga: true },
    { id: "tallas", texto: "Your usual sizes (clothing and shoes)" },
    { id: "presupuesto", texto: "Approximate shopping budget", opcional: true },
    { id: "inspiracion", texto: "Inspiration links (Pinterest, Instagram…)", opcional: true, larga: true },
    { id: "extra", texto: "Anything else we should know?", ayuda: "Special occasions, materials you can't wear, etc.", opcional: true, larga: true },
  ],
};

const preguntaCategoria: Record<Lang, Record<CategoriaSlug, Pregunta>> = {
  es: {
    mujer: { id: "rutina", texto: "¿Cómo es tu rutina de cabello y maquillaje?", ayuda: "Cuánto tiempo le dedicas y qué productos usas.", larga: true },
    hombre: { id: "rutina", texto: "¿Cómo es tu rutina de cabello, barba y cuidado de la piel?", ayuda: "Cuánto tiempo le dedicas y qué productos usas.", larga: true },
  },
  en: {
    mujer: { id: "rutina", texto: "What is your hair and makeup routine like?", ayuda: "How much time you spend on it and which products you use.", larga: true },
    hombre: { id: "rutina", texto: "What is your hair, beard and skincare routine like?", ayuda: "How much time you spend on it and which products you use.", larga: true },
  },
};

export function preguntas(lang: Lang, cat: CategoriaSlug): Pregunta[] {
  const lista = [...preguntasComunes[lang]];
  lista.splice(6, 0, preguntaCategoria[lang][cat]);
  return lista;
}

const fotosEs = {
  base: [
    "Tu rostro de frente, con luz natural (cerca de una ventana) y sin filtros.",
    "Tu rostro de perfil, con el cabello recogido.",
    "Cuerpo completo de frente, con ropa ajustada y sencilla.",
    "Cuerpo completo de lado.",
    "Dos o tres looks que uses seguido.",
  ],
  vip: "Tu armario abierto, por secciones, para preparar la sesión de armario.",
};

const fotosEn = {
  base: [
    "Your face from the front, in natural light (near a window) and without filters.",
    "Your face in profile, with your hair tied back.",
    "Full body from the front, in simple, fitted clothes.",
    "Full body from the side.",
    "Two or three outfits you wear often.",
  ],
  vip: "Your open wardrobe, section by section, to prepare the wardrobe session.",
};

export const textosCliente = {
  es: {
    tituloPestana: "Tu área privada · Aura",
    hola: (nombre: string) => (nombre ? `Hola, ${nombre}.` : "Hola."),
    intro: "Este es tu espacio privado. Completa el cuestionario y sube tus fotos para que preparemos tu asesoría.",
    paquete: "Tu experiencia",
    privado: "Guarda este enlace y no lo compartas: cualquiera que lo tenga puede ver tu área.",
    paso1: "Paso 1 · Cuestionario",
    paso1Texto: "Cuéntanos de ti. No hay respuestas correctas; mientras más sincera sea tu respuesta, más personal será tu asesoría.",
    opcional: "opcional",
    guardar: "Enviar cuestionario",
    guardando: "Enviando…",
    guardado: "¡Recibido! Puedes cambiar tus respuestas y volver a enviarlas cuando quieras.",
    enviadoEl: (fecha: string) => `Enviado el ${fecha}.`,
    error: "No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.",
    paso2: "Paso 2 · Tus fotos",
    paso2Texto: "Estas fotos nos ayudan a estudiar tu color, tu rostro y tu silueta. Solo las ve el equipo de Aura.",
    fotos: fotosEs,
    elegir: "Elegir fotos",
    subiendo: (n: number, total: number) => `Subiendo ${n} de ${total}…`,
    subidas: (n: number, max: number) => `${n} de ${max} fotos subidas`,
    limite: (max: number) => `Puedes subir hasta ${max} fotos.`,
    errorFoto: (nombre: string) => `No se pudo subir «${nombre}». Usa JPG, PNG, WEBP o HEIC de hasta 10 MB.`,
    paso3: "Paso 3 · Agendamos tu sesión",
    paso3Texto: "Cuando recibamos tu cuestionario y tus fotos, te escribimos por WhatsApp o correo para agendar tu sesión en vivo.",
    dudas: "¿Dudas? Escríbenos por WhatsApp",
    noEncontrado: "Este enlace no es válido o ya no existe.",
    // Pago recibido
    graciasTitulo: "¡Gracias!",
    graciasEnfasis: "Tu pago está confirmado.",
    graciasTexto: (paquete: string) => `Contrataste ${paquete}. El siguiente paso es completar tu cuestionario y subir tus fotos en tu área privada.`,
    graciasBoton: "Ir a mi área privada",
    graciasGuardar: "Guarda este enlace: es tu acceso personal.",
    graciasCorreo: "También te lo enviamos por correo.",
    copiar: "Copiar enlace",
    copiado: "Copiado",
    pendienteTitulo: "Estamos confirmando tu pago.",
    pendienteTexto: "Algunos métodos de pago tardan unos minutos. Recarga esta página en un momento o escríbenos por WhatsApp.",
    fallidoTitulo: "No pudimos confirmar el pago.",
    fallidoTexto: "No se hizo ningún cargo. Puedes intentarlo de nuevo o escribirnos por WhatsApp.",
    volver: "Volver al sitio",
  },
  en: {
    tituloPestana: "Your private area · Aura",
    hola: (nombre: string) => (nombre ? `Hello, ${nombre}.` : "Hello."),
    intro: "This is your private space. Complete the questionnaire and upload your photos so we can prepare your consultation.",
    paquete: "Your experience",
    privado: "Keep this link safe and don't share it: anyone who has it can see your area.",
    paso1: "Step 1 · Questionnaire",
    paso1Texto: "Tell us about yourself. There are no right answers; the more honest you are, the more personal your consultation will be.",
    opcional: "optional",
    guardar: "Send questionnaire",
    guardando: "Sending…",
    guardado: "Received! You can change your answers and send them again at any time.",
    enviadoEl: (fecha: string) => `Sent on ${fecha}.`,
    error: "It couldn't be saved. Check your connection and try again.",
    paso2: "Step 2 · Your photos",
    paso2Texto: "These photos help us study your colouring, face and silhouette. Only the Aura team sees them.",
    fotos: fotosEn,
    elegir: "Choose photos",
    subiendo: (n: number, total: number) => `Uploading ${n} of ${total}…`,
    subidas: (n: number, max: number) => `${n} of ${max} photos uploaded`,
    limite: (max: number) => `You can upload up to ${max} photos.`,
    errorFoto: (nombre: string) => `“${nombre}” couldn't be uploaded. Use JPG, PNG, WEBP or HEIC up to 10 MB.`,
    paso3: "Step 3 · We schedule your session",
    paso3Texto: "Once we receive your questionnaire and photos, we'll contact you on WhatsApp or by email to schedule your live session.",
    dudas: "Questions? Message us on WhatsApp",
    noEncontrado: "This link isn't valid or no longer exists.",
    graciasTitulo: "Thank you!",
    graciasEnfasis: "Your payment is confirmed.",
    graciasTexto: (paquete: string) => `You booked ${paquete}. The next step is to complete your questionnaire and upload your photos in your private area.`,
    graciasBoton: "Go to my private area",
    graciasGuardar: "Keep this link: it's your personal access.",
    graciasCorreo: "We've also sent it to you by email.",
    copiar: "Copy link",
    copiado: "Copied",
    pendienteTitulo: "We're confirming your payment.",
    pendienteTexto: "Some payment methods take a few minutes. Reload this page in a moment or message us on WhatsApp.",
    fallidoTitulo: "We couldn't confirm the payment.",
    fallidoTexto: "You haven't been charged. You can try again or message us on WhatsApp.",
    volver: "Back to the site",
  },
};
