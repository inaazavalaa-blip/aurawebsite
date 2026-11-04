import type { Lang } from "@/i18n/config";

/*
 * Textos de interfaz por idioma. El inglés se tipa con la forma del español,
 * así TypeScript avisa si falta una traducción.
 */

const es = {
  meta: {
    sitio: "Aura · Maison de imagen",
    descripcion:
      "Aura es una maison de asesoría de imagen integral para mujer y hombre: cabello, rostro, color, silueta y armario. Un cambio total, con estilo.",
    transformacion: "La transformación",
    transformacionDesc: "Cabello, rostro, color, silueta y armario: así es un cambio de imagen total con Aura.",
    vitrina: "La Vitrina",
    vitrinaDesc: "Arma outfits con piezas ordenadas por color y descubre ideas para cada ocasión.",
    servicios: "Servicios",
    serviciosDesc: "Paquetes de asesoría de imagen: Express, Transformación y VIP.",
    maison: "La Maison",
    maisonDesc: "La historia, la filosofía y las inspiraciones de Aura.",
    reserva: "Reserva",
    reservaDesc: "Reserva tu transformación de imagen con Aura por WhatsApp.",
  },
  nav: {
    inicio: "Inicio",
    transformacion: "Transformación",
    vitrina: "La Vitrina",
    servicios: "Servicios",
    maison: "La Maison",
    reserva: "Reserva",
    reservar: "Reservar",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    inicioAria: (cat: string) => `Aura ${cat}, inicio`,
    idioma: "English",
    idiomaCorto: "EN",
    idiomaAria: "Ver el sitio en inglés",
  },
  wa: {
    info: (cat: string) => `Hola Aura, me gustaría información (${cat}).`,
    infoGeneral: "Hola Aura, me gustaría información.",
    pagina: (pagina: string, cat: string) =>
      `Hola Aura, vi la página "${pagina}" (${cat}) y me gustaría información para mi cambio de imagen.`,
    empezar: (cat: string) => `Hola Aura, quiero empezar mi cambio de imagen (${cat}).`,
    agendar: (cat: string) => `Hola Aura, quiero agendar mi transformación (${cat}).`,
    paquete: (paquete: string, cat: string) =>
      `Hola Aura, me interesa el paquete "${paquete}" (${cat}). ¿Me dan más información?`,
    reservar: (cat: string) => `Hola Aura, quiero reservar mi sesión (${cat}).`,
    look: (cat: string, piezas: string) =>
      `Hola Aura, armé este look en La Vitrina (${cat}): ${piezas}. ¿Me ayudan a crearlo con mi estilo?`,
    boton: "Escríbenos",
    botonAria: "Escríbenos por WhatsApp",
  },
  pie: {
    texto: "Una maison de imagen integral: cabello, rostro, color, silueta y armario. Para que te veas como eres.",
    cambiar: (cat: string) => `Cambiar a ${cat} →`,
  },
  choix: {
    pregunta: "¿Qué colección deseas descubrir?",
    entrar: "Entrar",
  },
  comunes: {
    medallonesEyebrow: "El cambio es total",
    medallonesTitulo: "No es solo ropa.",
    medallonesEnfasis: "Es todo lo que eres.",
    medallonesTexto: "Una imagen convincente nace de cinco piezas que trabajan juntas. Por eso las transformamos todas.",
    cita: "«La elegancia es cuando el interior es tan bello como el exterior.»",
    citaAutor: "Coco Chanel",
    llamadoTitulo: "Tu cambio empieza",
    llamadoEnfasis: "con un mensaje.",
    llamadoTexto: "Cuéntanos qué quieres transformar. Te respondemos por WhatsApp con una propuesta hecha para ti.",
    llamadoBoton: "Escríbenos por WhatsApp",
    llamadoReserva: "O reserva en línea",
    antes: "Antes",
    despues: "Después",
    compararAria: "Comparar antes y después",
  },
  inicio: {
    empezar: "Empieza tu cambio",
    verTransformacion: "Ver la transformación",
    vitrinaEyebrow: "La Vitrina",
    vitrinaTitulo: "Mil outfits,",
    vitrinaEnfasis: "un mismo estilo: el tuyo.",
    vitrinaTexto:
      "Recorre nuestro muro de piezas ordenadas por color, elige y arma looks para la oficina, una cita o un evento. Así trabajamos tu armario: con intención.",
    vitrinaCta: "Entrar a La Vitrina",
    vitrinaAria: "Ver La Vitrina",
    adEyebrow: "Antes y después",
    adTitulo: "Un cambio que",
    adEnfasis: "se nota y se siente.",
    adTexto:
      "Cabello, rostro, color y armario trabajando juntos. Desliza el espejo para ver la diferencia: aquí compartiremos las transformaciones reales de nuestras clientas y clientes.",
    adCta: "Conoce el proceso completo",
    adPie: "próximamente",
    serviciosEyebrow: "Les services",
    serviciosTitulo: "Tres experiencias,",
    serviciosEnfasis: "un cambio total.",
    verDetalle: "Ver detalle",
    serviciosNota: "Sesiones en línea y presenciales · Acompañamiento por WhatsApp",
  },
  transformacion: {
    eyebrow: "La transformación",
    titulo: "Un cambio",
    enfasis: "de pies a cabeza.",
    texto:
      "Tu imagen es un todo. Por eso trabajamos en cinco capítulos que se complementan: cuando cambian juntos, el resultado se nota a primera vista y se siente todos los días.",
    adEyebrow: "Antes y después",
    adTitulo: "Historias reales,",
    adEnfasis: "muy pronto aquí.",
    adTexto:
      "Estos espejos están listos para mostrar las transformaciones de nuestras clientas y clientes, siempre con su autorización. Desliza para comparar.",
    adEtiquetas: ["Cabello", "Rostro", "Look completo"],
    prendaEyebrow: "Una prenda, tres looks",
    prendaTitulo: "Comprar mejor",
    prendaEnfasis: "es combinar más.",
    prendaTexto: (prenda: string) =>
      `Así pensamos tu armario: cada pieza clave se transforma según la ocasión. Este es un ejemplo con ${prenda}.`,
    metodoEyebrow: "El método Aura",
    metodoTitulo: "Cuatro pasos,",
    metodoEnfasis: "cero improvisación.",
  },
  vitrina: {
    eyebrow: "La Vitrina",
    titulo: "Un muro de color",
    enfasis: "para inspirarte.",
    texto:
      "Inspirado en las vitrinas de las grandes maisons: cientos de piezas ordenadas como un degradado. Elige un outfit sugerido o toca cada pieza para probarla en el maniquí.",
    ocasionesAria: "Ocasiones",
    probar: "Probar en el maniquí →",
    piezas: (n: number) => `${n} piezas`,
    tuLook: (n: number) => `Tu look · ${n} piezas`,
    tuLookCorto: (n: number) => `Tu look · ${n}`,
    tuLookAria: "Tu look",
    quitar: (p: string) => `Quitar ${p}`,
    pedir: "Pedir este look",
    vaciar: "Vaciar",
    cerrar: "Cerrar",
  },
  servicios: {
    eyebrow: "Les services",
    titulo: "Elige tu",
    enfasis: "experiencia.",
    texto:
      "Tres caminos hacia tu nueva imagen. Todos empiezan por conocerte y terminan con un estilo que puedes sostener cada día.",
    quiero: "Quiero este paquete",
    compEyebrow: "Comparativa",
    compTitulo: "Todo lo que",
    compEnfasis: "incluye cada una.",
    comparativa: [
      { rasgo: "Colorimetría y paleta personal", valores: ["✦", "✦", "✦"] },
      { rasgo: "Diagnóstico de estilo", valores: ["✦", "✦", "✦"] },
      { rasgo: "Análisis de rostro, cabello y silueta", valores: ["—", "✦", "✦"] },
      { rasgo: "Sesiones en vivo", valores: ["—", "1", "2"] },
      { rasgo: "Revisión de armario", valores: ["—", "✦", "En vivo"] },
      { rasgo: "Dossier de imagen", valores: ["PDF", "20+ págs.", "20+ págs."] },
      { rasgo: "Armario cápsula y ruta de compras", valores: ["—", "—", "✦"] },
      { rasgo: "Acompañamiento por WhatsApp", valores: ["—", "14 días", "30 días"] },
    ] as { rasgo: string; valores: [string, string, string] }[],
    faqEyebrow: "Preguntas frecuentes",
    faqTitulo: "Lo que",
    faqEnfasis: "nos suelen preguntar.",
    preguntas: [
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
        respuesta: "Después de agendar te enviamos un enlace de pago seguro (Stripe o PayPal). Tu lugar queda confirmado con el pago.",
      },
      {
        pregunta: "¿Y si no sé qué paquete elegir?",
        respuesta: "Cuéntanos qué te gustaría cambiar y te recomendamos la experiencia ideal, sin compromiso.",
      },
    ],
  },
  maison: {
    eyebrow: "La Maison",
    titulo: "Donde la elegancia",
    enfasis: "se vuelve tuya.",
    texto:
      "Aura nació de una idea sencilla: verte bien cambia la forma en que vives. Nos inspira el barroco francés, el oro de Klimt y la frescura de un jardín en flor, y lo traducimos a una imagen moderna, juvenil y sofisticada que te representa.",
    gabineteEyebrow: "Gabinete de curiosidades",
    gabineteTitulo: "Lo que nos inspira,",
    gabineteEnfasis: "en una vitrina.",
    objetos: {
      versalles: {
        nombre: "El espejo sol",
        origen: "Versalles",
        texto:
          "Los espejos dorados de Versalles nos recuerdan que verse es un ritual. En Aura, cada cambio empieza frente a un espejo: el que te devuelve tu mejor versión.",
      },
      klimt: {
        nombre: "El pan de oro",
        origen: "Klimt, El beso",
        texto:
          "Oro, mosaicos y un prado de flores: Klimt nos enseñó que lo sofisticado también puede ser alegre. Por eso nuestro oro siempre va acompañado de color.",
      },
      rodin: {
        nombre: "El abrazo de mármol",
        origen: "Rodin, Le Baiser",
        texto:
          "La escultura francesa de Rodin habla de cercanía. Así trabajamos: una asesoría íntima, a tu lado, sin juicios y con mucho cuidado.",
      },
      flora: {
        nombre: "El frasco amarillo",
        origen: "Un jardín embotellado",
        texto:
          "Amarillo luminoso, tapa dorada y flores pintadas: la frescura que buscamos en cada look. Elegante, sí; solemne, nunca.",
      },
      busto: {
        nombre: "El busto y las perlas",
        origen: "El detalle",
        texto:
          "Un collar bien elegido cambia un look entero. Cuidamos los accesorios, el escote y cada detalle que enmarca tu rostro.",
      },
      corazon: {
        nombre: "El sagrado corazón",
        origen: "La pasión",
        texto:
          "Hacemos esto con el corazón. Detrás de cada transformación hay una historia, y la tuya merece ser contada con orgullo.",
      },
    },
    besosEyebrow: "Dos besos",
    besosTitulo: "El oro y el mármol,",
    besosEnfasis: "tu imagen y tu esencia.",
    besosTexto:
      "Klimt pintó un abrazo en pan de oro; Rodin lo esculpió en mármol francés. Para nosotros, una imagen lograda es eso: el encuentro entre cómo te ven y quién eres. Cuando ambos se abrazan, aparece tu aura.",
    valores: [
      { titulo: "Autenticidad", texto: "No te convertimos en otra persona: revelamos la mejor versión de quien ya eres." },
      { titulo: "Elegancia fresca", texto: "Sofisticación con alegría, color y juventud. Nada rígido, nada de disfraz." },
      { titulo: "Cambio integral", texto: "Cabello, rostro, color, silueta y armario, pensados como un solo proyecto." },
    ],
  },
  reserva: {
    eyebrow: "Reserva",
    titulo: "Tu transformación",
    enfasis: "empieza hoy.",
    pasos: [
      { numeral: "I", titulo: "Escríbenos", texto: "Llena el formulario o mándanos un WhatsApp. Respondemos en menos de 24 horas." },
      { numeral: "II", titulo: "Agenda", texto: "Elegimos juntos fecha, hora y modalidad para tu sesión." },
      { numeral: "III", titulo: "Confirma", texto: "Asegura tu lugar con un enlace de pago seguro (Stripe o PayPal)." },
    ],
    contacto: "Contacto directo",
    formTitulo: "Cuéntanos de ti",
    formTexto: "Al enviar se abre WhatsApp con tu mensaje listo para mandarlo.",
    nombre: "Tu nombre",
    nombrePh: "¿Cómo te llamas?",
    servicio: "Servicio",
    servicioPh: "Elige una experiencia",
    noSe: "Aún no lo sé, quiero asesoría",
    fecha: "Fecha preferida",
    modalidad: "Modalidad",
    modalidades: ["En línea", "Presencial"],
    cambiar: "¿Qué te gustaría cambiar?",
    cambiarPh: "Cabello, estilo, armario…",
    enviar: "Enviar por WhatsApp",
    correo: "Prefiero correo",
    enviado: "Abrimos WhatsApp con tu mensaje listo. Solo tienes que enviarlo y te responderemos muy pronto.",
    asunto: (cat: string) => `Reserva Aura (${cat})`,
    mensaje: (d: { nombre: string; cat: string; servicio: string; modalidad: string; fecha: string; cambio: string }) =>
      [
        `Hola Aura, soy ${d.nombre} y quiero reservar (${d.cat}).`,
        `Servicio: ${d.servicio}`,
        `Modalidad: ${d.modalidad}`,
        d.fecha ? `Fecha preferida: ${d.fecha}` : "",
        d.cambio ? `Lo que me gustaría cambiar: ${d.cambio}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  },
};

export type Diccionario = typeof es;

const en: Diccionario = {
  meta: {
    sitio: "Aura · Maison d'image",
    descripcion:
      "Aura is a full image consulting maison for women and men: hair, face, colour, silhouette and wardrobe. A total change, with style.",
    transformacion: "The transformation",
    transformacionDesc: "Hair, face, colour, silhouette and wardrobe: this is what a total image change with Aura looks like.",
    vitrina: "The Showcase",
    vitrinaDesc: "Build outfits from pieces arranged by colour and find ideas for every occasion.",
    servicios: "Services",
    serviciosDesc: "Image consulting packages: Express, Transformation and VIP.",
    maison: "The Maison",
    maisonDesc: "The story, philosophy and inspirations behind Aura.",
    reserva: "Booking",
    reservaDesc: "Book your image transformation with Aura on WhatsApp.",
  },
  nav: {
    inicio: "Home",
    transformacion: "Transformation",
    vitrina: "The Showcase",
    servicios: "Services",
    maison: "The Maison",
    reserva: "Booking",
    reservar: "Book",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    inicioAria: (cat: string) => `Aura ${cat}, home`,
    idioma: "Español",
    idiomaCorto: "ES",
    idiomaAria: "Ver el sitio en español",
  },
  wa: {
    info: (cat: string) => `Hello Aura, I'd like some information (${cat}).`,
    infoGeneral: "Hello Aura, I'd like some information.",
    pagina: (pagina: string, cat: string) =>
      `Hello Aura, I saw the "${pagina}" page (${cat}) and I'd like information about an image makeover.`,
    empezar: (cat: string) => `Hello Aura, I'd like to start my image makeover (${cat}).`,
    agendar: (cat: string) => `Hello Aura, I'd like to book my transformation (${cat}).`,
    paquete: (paquete: string, cat: string) =>
      `Hello Aura, I'm interested in the "${paquete}" package (${cat}). Could you tell me more?`,
    reservar: (cat: string) => `Hello Aura, I'd like to book my session (${cat}).`,
    look: (cat: string, piezas: string) =>
      `Hello Aura, I put together this look in The Showcase (${cat}): ${piezas}. Could you help me create it in my own style?`,
    boton: "Message us",
    botonAria: "Message us on WhatsApp",
  },
  pie: {
    texto: "A full image maison: hair, face, colour, silhouette and wardrobe. So you look like who you are.",
    cambiar: (cat: string) => `Switch to ${cat} →`,
  },
  choix: {
    pregunta: "Which collection would you like to discover?",
    entrar: "Enter",
  },
  comunes: {
    medallonesEyebrow: "A total change",
    medallonesTitulo: "It's not just clothes.",
    medallonesEnfasis: "It's everything you are.",
    medallonesTexto: "A convincing image comes from five pieces working together. That's why we transform them all.",
    cita: "“Elegance is when the inside is as beautiful as the outside.”",
    citaAutor: "Coco Chanel",
    llamadoTitulo: "Your change starts",
    llamadoEnfasis: "with a message.",
    llamadoTexto: "Tell us what you want to transform. We'll reply on WhatsApp with a proposal made for you.",
    llamadoBoton: "Message us on WhatsApp",
    llamadoReserva: "Or book online",
    antes: "Before",
    despues: "After",
    compararAria: "Compare before and after",
  },
  inicio: {
    empezar: "Start your change",
    verTransformacion: "See the transformation",
    vitrinaEyebrow: "The Showcase",
    vitrinaTitulo: "A thousand outfits,",
    vitrinaEnfasis: "one style: yours.",
    vitrinaTexto:
      "Browse our wall of pieces arranged by colour, then pick and build looks for the office, a date or an event. That's how we work on your wardrobe: with intention.",
    vitrinaCta: "Enter The Showcase",
    vitrinaAria: "See The Showcase",
    adEyebrow: "Before and after",
    adTitulo: "A change you",
    adEnfasis: "can see and feel.",
    adTexto:
      "Hair, face, colour and wardrobe working together. Slide the mirror to see the difference: this is where we'll share our clients' real transformations.",
    adCta: "Discover the full process",
    adPie: "coming soon",
    serviciosEyebrow: "Les services",
    serviciosTitulo: "Three experiences,",
    serviciosEnfasis: "one total change.",
    verDetalle: "See details",
    serviciosNota: "Online and in-person sessions · WhatsApp support",
  },
  transformacion: {
    eyebrow: "The transformation",
    titulo: "A change",
    enfasis: "from head to toe.",
    texto:
      "Your image is a whole. That's why we work in five chapters that complement each other: when they change together, the result shows at first sight and feels right every day.",
    adEyebrow: "Before and after",
    adTitulo: "Real stories,",
    adEnfasis: "coming soon.",
    adTexto:
      "These mirrors are ready to show our clients' transformations, always with their permission. Slide to compare.",
    adEtiquetas: ["Hair", "Face", "Full look"],
    prendaEyebrow: "One piece, three looks",
    prendaTitulo: "Buying better",
    prendaEnfasis: "means combining more.",
    prendaTexto: (prenda: string) =>
      `This is how we think about your wardrobe: each key piece changes with the occasion. Here is an example with a ${prenda}.`,
    metodoEyebrow: "The Aura method",
    metodoTitulo: "Four steps,",
    metodoEnfasis: "zero improvisation.",
  },
  vitrina: {
    eyebrow: "The Showcase",
    titulo: "A wall of colour",
    enfasis: "to inspire you.",
    texto:
      "Inspired by the window displays of the great maisons: hundreds of pieces arranged like a gradient. Choose a suggested outfit or tap any piece to try it on the mannequin.",
    ocasionesAria: "Occasions",
    probar: "Try it on the mannequin →",
    piezas: (n: number) => `${n} pieces`,
    tuLook: (n: number) => `Your look · ${n} pieces`,
    tuLookCorto: (n: number) => `Your look · ${n}`,
    tuLookAria: "Your look",
    quitar: (p: string) => `Remove ${p}`,
    pedir: "Request this look",
    vaciar: "Clear",
    cerrar: "Close",
  },
  servicios: {
    eyebrow: "Les services",
    titulo: "Choose your",
    enfasis: "experience.",
    texto:
      "Three paths to your new image. Each one starts by getting to know you and ends with a style you can keep up every day.",
    quiero: "I want this package",
    compEyebrow: "Comparison",
    compTitulo: "Everything",
    compEnfasis: "each one includes.",
    comparativa: [
      { rasgo: "Colour analysis and personal palette", valores: ["✦", "✦", "✦"] },
      { rasgo: "Style diagnosis", valores: ["✦", "✦", "✦"] },
      { rasgo: "Face, hair and silhouette analysis", valores: ["—", "✦", "✦"] },
      { rasgo: "Live sessions", valores: ["—", "1", "2"] },
      { rasgo: "Wardrobe review", valores: ["—", "✦", "Live"] },
      { rasgo: "Image dossier", valores: ["PDF", "20+ pages", "20+ pages"] },
      { rasgo: "Capsule wardrobe and shopping route", valores: ["—", "—", "✦"] },
      { rasgo: "WhatsApp support", valores: ["—", "14 days", "30 days"] },
    ],
    faqEyebrow: "Frequently asked questions",
    faqTitulo: "What people",
    faqEnfasis: "usually ask us.",
    preguntas: [
      {
        pregunta: "Are sessions online or in person?",
        respuesta:
          "We work online across the country and also offer in-person sessions. Message us on WhatsApp and we'll tell you which option suits you best.",
      },
      {
        pregunta: "Does the change include hair and face, or just clothes?",
        respuesta:
          "The change is total. We define the cut, colour, makeup or grooming and routine that suit you, and give you an exact guide for your stylist. Then we carry it into your wardrobe.",
      },
      {
        pregunta: "How long does the transformation take?",
        respuesta:
          "The Express diagnosis is delivered within 48–72 hours. The Transformation and VIP experiences take two to four weeks, with WhatsApp support.",
      },
      {
        pregunta: "How do I pay?",
        respuesta: "Once you've booked, we send you a secure payment link (Stripe or PayPal). Your spot is confirmed with payment.",
      },
      {
        pregunta: "What if I don't know which package to choose?",
        respuesta: "Tell us what you'd like to change and we'll recommend the right experience, no strings attached.",
      },
    ],
  },
  maison: {
    eyebrow: "The Maison",
    titulo: "Where elegance",
    enfasis: "becomes yours.",
    texto:
      "Aura was born from a simple idea: looking good changes the way you live. We're inspired by French baroque, Klimt's gold and the freshness of a garden in bloom, and we translate it into a modern, youthful and sophisticated image that represents you.",
    gabineteEyebrow: "Cabinet of curiosities",
    gabineteTitulo: "What inspires us,",
    gabineteEnfasis: "in a showcase.",
    objetos: {
      versalles: {
        nombre: "The sun mirror",
        origen: "Versailles",
        texto:
          "The gilded mirrors of Versailles remind us that seeing yourself is a ritual. At Aura, every change starts in front of a mirror: the one that shows you your best version.",
      },
      klimt: {
        nombre: "The gold leaf",
        origen: "Klimt, The Kiss",
        texto:
          "Gold, mosaics and a meadow of flowers: Klimt taught us that sophistication can also be joyful. That's why our gold always comes with colour.",
      },
      rodin: {
        nombre: "The marble embrace",
        origen: "Rodin, Le Baiser",
        texto:
          "Rodin's French sculpture speaks of closeness. That's how we work: an intimate consultation, by your side, without judgement and with great care.",
      },
      flora: {
        nombre: "The yellow bottle",
        origen: "A bottled garden",
        texto:
          "Luminous yellow, a golden cap and painted flowers: the freshness we look for in every outfit. Elegant, yes; solemn, never.",
      },
      busto: {
        nombre: "The bust and the pearls",
        origen: "The detail",
        texto:
          "A well-chosen necklace changes a whole look. We take care of accessories, necklines and every detail that frames your face.",
      },
      corazon: {
        nombre: "The sacred heart",
        origen: "Passion",
        texto:
          "We do this with heart. Behind every transformation there's a story, and yours deserves to be told with pride.",
      },
    },
    besosEyebrow: "Two kisses",
    besosTitulo: "Gold and marble,",
    besosEnfasis: "your image and your essence.",
    besosTexto:
      "Klimt painted an embrace in gold leaf; Rodin carved one in French marble. To us, a well-crafted image is just that: the meeting between how others see you and who you are. When the two embrace, your aura appears.",
    valores: [
      { titulo: "Authenticity", texto: "We don't turn you into someone else: we reveal the best version of who you already are." },
      { titulo: "Fresh elegance", texto: "Sophistication with joy, colour and youth. Nothing stiff, nothing that feels like a costume." },
      { titulo: "Total change", texto: "Hair, face, colour, silhouette and wardrobe, treated as a single project." },
    ],
  },
  reserva: {
    eyebrow: "Booking",
    titulo: "Your transformation",
    enfasis: "starts today.",
    pasos: [
      { numeral: "I", titulo: "Message us", texto: "Fill in the form or send us a WhatsApp. We reply within 24 hours." },
      { numeral: "II", titulo: "Schedule", texto: "Together we choose the date, time and format for your session." },
      { numeral: "III", titulo: "Confirm", texto: "Secure your spot with a safe payment link (Stripe or PayPal)." },
    ],
    contacto: "Direct contact",
    formTitulo: "Tell us about you",
    formTexto: "When you send it, WhatsApp opens with your message ready to go.",
    nombre: "Your name",
    nombrePh: "What's your name?",
    servicio: "Service",
    servicioPh: "Choose an experience",
    noSe: "I'm not sure yet, I'd like advice",
    fecha: "Preferred date",
    modalidad: "Format",
    modalidades: ["Online", "In person"],
    cambiar: "What would you like to change?",
    cambiarPh: "Hair, style, wardrobe…",
    enviar: "Send on WhatsApp",
    correo: "I prefer email",
    enviado: "We've opened WhatsApp with your message ready. Just send it and we'll get back to you very soon.",
    asunto: (cat: string) => `Aura booking (${cat})`,
    mensaje: (d) =>
      [
        `Hello Aura, I'm ${d.nombre} and I'd like to book (${d.cat}).`,
        `Service: ${d.servicio}`,
        `Format: ${d.modalidad}`,
        d.fecha ? `Preferred date: ${d.fecha}` : "",
        d.cambio ? `What I'd like to change: ${d.cambio}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
  },
};

export const diccionarios: Record<Lang, Diccionario> = { es, en };

export function dic(lang: Lang) {
  return diccionarios[lang];
}
