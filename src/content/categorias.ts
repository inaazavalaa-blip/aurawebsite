import type { Lang } from "@/i18n/config";

export type CategoriaSlug = "hombre" | "mujer";

export type Imagen = { src: string; alt: string };

export type PaqueteId = "transformacion" | "vip";
export type Moneda = "usd" | "mxn";

export type Paquete = {
  id: PaqueteId;
  /** Monto que cobra Stripe, en centavos. Sale de los mismos precios que se muestran. */
  centavos: Record<Moneda, number>;
  etiqueta: string;
  nombre: string;
  /** Nombre corto para las columnas de la tabla comparativa. */
  corto: string;
  descripcion: string;
  usd: string;
  mxn: string;
  incluye: string[];
  destacado?: boolean;
};

export type AreaId = "color" | "rostro" | "silueta" | "armario" | "estilo";

/** Las cinco áreas de El Método Aura. */
export type Area = {
  id: AreaId;
  numeral: string;
  nombre: string;
  titulo: string;
  /** Cómo se trabaja esta área. */
  texto: string;
  trabajamos: string[];
  imagen: Imagen;
  /** Pequeña muestra ilustrativa del tipo de recomendación que recibe el cliente. */
  muestra: { titulo: string; colores?: string[]; puntos: string[] };
};

export type Categoria = {
  slug: CategoriaSlug;
  label: string;
  choix: { caption: string; imagen: Imagen };
  hero: {
    eyebrow: string;
    titulo: string;
    enfasis: string;
    intro: string;
    imagen: Imagen;
  };
  areas: Area[];
  /** "Una prenda, tres looks": ids de piezas de la vitrina. */
  unaPrenda: { base: string; looks: { ocasion: string; piezas: string[]; nota: string }[] };
  paquetes: Paquete[];
};

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=82`;

export const enlaces = {
  email: "inaazavalaa@gmail.com",
  whatsapp: "5214424663774",
  whatsappVisible: "+52 1 442 466 3774",
};

export function whatsappUrl(texto: string) {
  return `https://wa.me/${enlaces.whatsapp}?text=${encodeURIComponent(texto)}`;
}

const fotos = {
  versalles: unsplash("1633117678740-989810c62541", 1400),
  klimt: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Gustav_Klimt_016.jpg",
  mujerChoix: unsplash("1685206752060-d200820e092c", 900),
  mujerHero: "/images/mujer-portada.jpg",
  mujerCabello: unsplash("1580618672591-eb180b1a973f", 900),
  mujerRostro: unsplash("1636023730877-233b9237d4ec", 900),
  hombreChoix: "/images/hombre-choix.jpg",
  hombreHero: unsplash("1676278746061-c5bac5b34ae5", 1100),
  hombreCabello: unsplash("1599011176306-4a96f1516d4d", 900),
  hombreRostro: unsplash("1503951914875-452162b0f3f1", 900),
  // El Método Aura (fotos editoriales de Unsplash, licencia libre; no son clientes).
  color: unsplash("1581079289196-67865ea83118", 1200),
  mujerSilueta: unsplash("1753162659146-c2997eb8bc45", 1200),
  hombreSilueta: unsplash("1628565931779-4f4f0b4f578a", 1200),
  mujerArmario: unsplash("1604882767135-b41fac508fff", 1200),
  hombreArmario: unsplash("1633655442432-620aa55d7ac1", 1200),
  mujerEstilo: unsplash("1770970831074-6e88b6cc260b", 1200),
  hombreEstilo: unsplash("1613379171002-3610ae01cf4a", 1200),
};

export const imagenes: Record<Lang, { versalles: Imagen; klimt: Imagen }> = {
  es: {
    versalles: { src: fotos.versalles, alt: "Salón palaciego con candelabros dorados" },
    klimt: { src: fotos.klimt, alt: "El beso, de Gustav Klimt (1908), detalle en pan de oro" },
  },
  en: {
    versalles: { src: fotos.versalles, alt: "Palace hall with gilded chandeliers" },
    klimt: { src: fotos.klimt, alt: "The Kiss by Gustav Klimt (1908), gold-leaf detail" },
  },
};

export const pasosProceso: Record<Lang, { numeral: string; titulo: string; texto: string }[]> = {
  es: [
    { numeral: "I", titulo: "Contrata", texto: "Pagas en línea y en tu área privada nos cuentas de ti con un cuestionario y tus fotos." },
    { numeral: "II", titulo: "Diagnóstico", texto: "Analizamos tu rostro, tu color, tu silueta, tu cabello y tu armario." },
    { numeral: "III", titulo: "Transformación", texto: "Llevamos el plan a la realidad: corte, color, maquillaje o grooming, prendas y looks." },
    { numeral: "IV", titulo: "Seguimiento", texto: "Te acompañamos para que tu nueva imagen se sostenga en el día a día." },
  ],
  en: [
    { numeral: "I", titulo: "Book", texto: "You pay online and, in your private area, tell us about yourself with a questionnaire and your photos." },
    { numeral: "II", titulo: "Diagnosis", texto: "We analyse your face, your colouring, your silhouette, your hair and your wardrobe." },
    { numeral: "III", titulo: "Transformation", texto: "We bring the plan to life: cut, colour, makeup or grooming, clothes and looks." },
    { numeral: "IV", titulo: "Follow-up", texto: "We stay by your side so your new image holds up day to day." },
  ],
};

/** Precios: se escriben una sola vez y sirven para lo que se muestra y para lo que se cobra. */
const precios: { id: PaqueteId; usd: number; mxn: number }[] = [
  { id: "transformacion", usd: 139, mxn: 2790 },
  { id: "vip", usd: 280, mxn: 5500 },
];

const formato = (n: number) => n.toLocaleString("en-US");

function paquetes(lang: Lang, hombre: boolean): Paquete[] {
  const es: Omit<Paquete, "usd" | "mxn" | "id" | "centavos">[] = [
    {
      etiqueta: "Recomendada",
      nombre: "Transformación de Estilo",
      corto: "Transformación",
      descripcion: "Una transformación completa con acompañamiento y un manual de estilo hecho para ti.",
      incluye: [
        "Análisis de color online y estación",
        hombre ? "Paleta digital para ropa, accesorios y grooming" : "Paleta digital para ropa, maquillaje y accesorios",
        "Test y diagnóstico de estilo personal",
        hombre ? "Análisis de rostro, barba y cabello" : "Análisis de rostro, cabello y silueta",
        "Sesión en vivo de 60 minutos",
        "Revisión de tu armario actual",
        "3 looks armados con tu propia ropa",
        "Dossier de imagen de más de 20 páginas",
        "14 días de acompañamiento por WhatsApp",
      ],
      destacado: true,
    },
    {
      etiqueta: "Experiencia total",
      nombre: "VIP · Armario Cápsula",
      corto: "VIP",
      descripcion: "La renovación completa: imagen, armario y un catálogo de compras a tu medida.",
      incluye: [
        "Todo lo del paquete Transformación",
        "Dos sesiones en vivo de 60 minutos",
        "Detox y organización de armario en vivo",
        "Armario cápsula con más de 20 combinaciones",
        "Ruta de compras con enlaces directos",
        "30 días de acompañamiento y revisión de looks",
      ],
    },
  ];
  const en: Omit<Paquete, "usd" | "mxn" | "id" | "centavos">[] = [
    {
      etiqueta: "Recommended",
      nombre: "Style Transformation",
      corto: "Transformation",
      descripcion: "A complete transformation with personal guidance and a style manual made for you.",
      incluye: [
        "Online colour analysis and season",
        hombre ? "Digital palette for clothing, accessories and grooming" : "Digital palette for clothing, makeup and accessories",
        "Personal style test and diagnosis",
        hombre ? "Face, beard and hair analysis" : "Face, hair and silhouette analysis",
        "60-minute live session",
        "Review of your current wardrobe",
        "3 looks put together from your own clothes",
        "Image dossier of 20+ pages",
        "14 days of WhatsApp support",
      ],
      destacado: true,
    },
    {
      etiqueta: "The full experience",
      nombre: "VIP · Capsule Wardrobe",
      corto: "VIP",
      descripcion: "The complete renewal: image, wardrobe and a shopping guide tailored to you.",
      incluye: [
        "Everything in the Transformation package",
        "Two 60-minute live sessions",
        "Live wardrobe detox and organisation",
        "Capsule wardrobe with 20+ combinations",
        "Shopping route with direct links",
        "30 days of support and outfit reviews",
      ],
    },
  ];
  return (lang === "es" ? es : en).map((p, i) => {
    const precio = precios[i];
    return {
      ...p,
      id: precio.id,
      usd: `$${formato(precio.usd)} USD`,
      mxn: `$${formato(precio.mxn)} MXN`,
      centavos: { usd: precio.usd * 100, mxn: precio.mxn * 100 },
    };
  });
}

const mujerEs: Categoria = {
  slug: "mujer",
  label: "Mujer",
  choix: {
    caption: "Fresca, luminosa, auténtica",
    imagen: { src: fotos.mujerChoix, alt: "Mujer con vestido amarillo frente a una pared amarilla" },
  },
  hero: {
    eyebrow: "Asesoría de imagen personalizada",
    titulo: "Descubre lo que tu imagen",
    enfasis: "puede hacer por ti.",
    intro:
      "Cabello, rostro, color, silueta y armario. Diseñamos tu imagen completa para que cada vez que te mires sientas que por fin te ves como eres.",
    imagen: { src: fotos.mujerHero, alt: "Vestido bordado con mosaico dorado inspirado en El beso de Klimt" },
  },
  areas: [
    {
      id: "color",
      numeral: "01",
      nombre: "Color",
      titulo: "Los colores que te encienden",
      texto:
        "Observamos el subtono de tu piel, el color de tus ojos y de tu cabello, y el contraste entre ellos. Con fotos tomadas con luz natural probamos tonos cálidos y fríos, claros y profundos, hasta encontrar tu estación y una paleta personal para ropa, maquillaje y accesorios.",
      trabajamos: ["Subtono y contraste", "Estación y paleta personal", "Metales: oro o plata"],
      imagen: { src: fotos.color, alt: "Abanico de muestras de color ordenadas como un degradado" },
      muestra: {
        titulo: "Paleta de ejemplo",
        colores: ["#7a2e3a", "#b5654a", "#d9a441", "#6b7a4a", "#2f4a5c", "#e8dcc4"],
        puntos: ["Tonos cálidos y suaves", "Metales en oro", "Neutros: camel y crema"],
      },
    },
    {
      id: "rostro",
      numeral: "02",
      nombre: "Rostro y cabello",
      titulo: "El marco de tu rostro",
      texto:
        "Estudiamos la forma de tu rostro, tus proporciones y tus rasgos más expresivos. A partir de ahí recomendamos cortes, largos, volumen y peinados, además de cejas, maquillaje y accesorios que equilibran y resaltan lo que ya es tuyo, pensando en tu textura y en tu rutina real.",
      trabajamos: ["Visagismo y proporciones", "Corte, color y peinados", "Cejas, maquillaje y accesorios"],
      imagen: { src: fotos.mujerCabello, alt: "Estilista peinando a una mujer con cepillo redondo" },
      muestra: {
        titulo: "Recomendaciones de ejemplo",
        puntos: ["Capas largas que suavizan el contorno", "Raya al lado para dar altura", "Aretes medianos de líneas curvas"],
      },
    },
    {
      id: "silueta",
      numeral: "03",
      nombre: "Silueta",
      titulo: "Proporción y armonía",
      texto:
        "Analizamos tus proporciones y escuchamos cómo te gusta sentirte con la ropa. Así definimos cortes, largos, escotes, cinturas y tejidos que te favorecen, que son cómodos y que te hacen sentir segura en cada ocasión.",
      trabajamos: ["Proporciones y líneas", "Cortes, largos y escotes", "Tejidos y caídas"],
      imagen: { src: fotos.mujerSilueta, alt: "Costurera tomando medidas a una mujer para una prenda a medida" },
      muestra: {
        titulo: "Recomendaciones de ejemplo",
        puntos: ["Cintura marcada", "Escote en V", "Pantalón de tiro alto y pierna recta"],
      },
    },
    {
      id: "armario",
      numeral: "04",
      nombre: "Armario",
      titulo: "Menos prendas, más looks",
      texto:
        "Revisamos contigo tu armario actual: qué usas, qué ya no te representa y qué piezas tienen más potencial. Con lo que funciona armamos combinaciones para tu día a día y detectamos las pocas prendas clave que vale la pena sumar.",
      trabajamos: ["Revisión de armario", "Looks con tu propia ropa", "Lista de prendas clave"],
      imagen: { src: fotos.mujerArmario, alt: "Abrigos y sacos en tonos neutros colgados en un perchero" },
      muestra: {
        titulo: "Fórmula de ejemplo",
        puntos: ["1 blazer camel", "+ 3 bases neutras", "= 6 looks para la semana"],
      },
    },
    {
      id: "estilo",
      numeral: "05",
      nombre: "Estilo personal",
      titulo: "Una imagen que te representa",
      texto:
        "Integramos todo lo anterior con tu personalidad, tus gustos y tu estilo de vida. El resultado es una dirección de estilo clara, con palabras, referencias y ejemplos, para que cada decisión de imagen sea coherente contigo y fácil de mantener.",
      trabajamos: ["Test de estilo personal", "Palabras y referencias", "Guía para decidir con seguridad"],
      imagen: { src: fotos.mujerEstilo, alt: "Muestras de tela, bocetos y flores sobre una mesa de trabajo" },
      muestra: {
        titulo: "Dirección de ejemplo",
        puntos: ["Natural", "Pulida", "Con un toque romántico"],
      },
    },
  ],
  unaPrenda: {
    base: "m-blazer-camel",
    looks: [
      { ocasion: "Oficina", piezas: ["m-blazer-camel", "m-blusa-marfil", "m-pantalon-negro", "m-mocasin-negro", "m-bolso-negro"], nota: "Pulido y seguro" },
      { ocasion: "Cita", piezas: ["m-blazer-camel", "m-vestido-lirio", "m-tacon-nude", "m-aretes-oro"], nota: "Romántico con estructura" },
      { ocasion: "Fin de semana", piezas: ["m-blazer-camel", "m-playera-blanca", "m-jeans", "m-tenis-blancos", "m-lentes-carey"], nota: "Relajado y chic" },
    ],
  },
  paquetes: paquetes("es", false),
};

const mujerEn: Categoria = {
  ...mujerEs,
  label: "Women",
  choix: {
    caption: "Fresh, luminous, authentic",
    imagen: { src: fotos.mujerChoix, alt: "Woman in a yellow dress in front of a yellow wall" },
  },
  hero: {
    eyebrow: "Personalised image consulting",
    titulo: "Discover what your image",
    enfasis: "can do for you.",
    intro:
      "Hair, face, colour, silhouette and wardrobe. We design your complete image so that every time you look in the mirror you finally see yourself as you are.",
    imagen: { src: fotos.mujerHero, alt: "Embroidered dress with a gold mosaic inspired by Klimt's The Kiss" },
  },
  areas: [
    {
      ...mujerEs.areas[0],
      nombre: "Colour",
      titulo: "The colours that light you up",
      texto:
        "We look at your skin's undertone, the colour of your eyes and hair, and the contrast between them. Using photos taken in natural light we test warm and cool, light and deep tones until we find your season and a personal palette for clothing, makeup and accessories.",
      trabajamos: ["Undertone and contrast", "Season and personal palette", "Metals: gold or silver"],
      imagen: { src: fotos.color, alt: "Fan of colour swatches arranged like a gradient" },
      muestra: {
        titulo: "Sample palette",
        colores: mujerEs.areas[0].muestra.colores,
        puntos: ["Warm, soft tones", "Gold metals", "Neutrals: camel and cream"],
      },
    },
    {
      ...mujerEs.areas[1],
      nombre: "Face & hair",
      titulo: "The frame of your face",
      texto:
        "We study the shape of your face, your proportions and your most expressive features. From there we recommend cuts, lengths, volume and hairstyles, plus brows, makeup and accessories that balance and highlight what is already yours, with your texture and real routine in mind.",
      trabajamos: ["Face mapping and proportions", "Cut, colour and styling", "Brows, makeup and accessories"],
      imagen: { src: fotos.mujerCabello, alt: "Stylist blow-drying a woman's hair with a round brush" },
      muestra: {
        titulo: "Sample recommendations",
        puntos: ["Long layers that soften the outline", "Side parting for height", "Medium earrings with curved lines"],
      },
    },
    {
      ...mujerEs.areas[2],
      nombre: "Silhouette",
      titulo: "Proportion and harmony",
      texto:
        "We analyse your proportions and listen to how you like to feel in your clothes. That's how we define the cuts, lengths, necklines, waistlines and fabrics that flatter you, feel comfortable and make you feel confident on every occasion.",
      trabajamos: ["Proportions and lines", "Cuts, lengths and necklines", "Fabrics and drape"],
      imagen: { src: fotos.mujerSilueta, alt: "Seamstress taking a woman's measurements for a tailored garment" },
      muestra: {
        titulo: "Sample recommendations",
        puntos: ["Defined waist", "V-neckline", "High-rise, straight-leg trousers"],
      },
    },
    {
      ...mujerEs.areas[3],
      nombre: "Wardrobe",
      titulo: "Fewer clothes, more looks",
      texto:
        "We go through your current wardrobe with you: what you wear, what no longer represents you and which pieces have the most potential. With what works we put together combinations for your everyday life and spot the few key pieces worth adding.",
      trabajamos: ["Wardrobe review", "Looks from your own clothes", "List of key pieces"],
      imagen: { src: fotos.mujerArmario, alt: "Coats and jackets in neutral tones hanging on a rail" },
      muestra: {
        titulo: "Sample formula",
        puntos: ["1 camel blazer", "+ 3 neutral basics", "= 6 looks for the week"],
      },
    },
    {
      ...mujerEs.areas[4],
      nombre: "Personal style",
      titulo: "An image that represents you",
      texto:
        "We bring everything together with your personality, your tastes and your lifestyle. The result is a clear style direction, with words, references and examples, so that every image decision is true to you and easy to keep up.",
      trabajamos: ["Personal style test", "Words and references", "A guide to decide with confidence"],
      imagen: { src: fotos.mujerEstilo, alt: "Fabric swatches, sketches and flowers on a work table" },
      muestra: {
        titulo: "Sample direction",
        puntos: ["Natural", "Polished", "With a romantic touch"],
      },
    },
  ],
  unaPrenda: {
    base: mujerEs.unaPrenda.base,
    looks: [
      { ...mujerEs.unaPrenda.looks[0], ocasion: "Office", nota: "Polished and confident" },
      { ...mujerEs.unaPrenda.looks[1], ocasion: "Date", nota: "Romantic with structure" },
      { ...mujerEs.unaPrenda.looks[2], ocasion: "Weekend", nota: "Relaxed and chic" },
    ],
  },
  paquetes: paquetes("en", false),
};

const hombreEs: Categoria = {
  slug: "hombre",
  label: "Hombre",
  choix: {
    caption: "Sobrio, seguro, con carácter",
    imagen: { src: fotos.hombreChoix, alt: "Hombre con traje y gafas abotonándose el saco" },
  },
  hero: {
    eyebrow: "Asesoría de imagen personalizada",
    titulo: "Descubre lo que tu imagen",
    enfasis: "puede hacer por ti.",
    intro:
      "Corte, barba, rostro, color, silueta y armario. Construimos una imagen completa y coherente que habla por ti antes de que digas una palabra.",
    imagen: { src: fotos.hombreHero, alt: "Hombre con traje sentado en una silla" },
  },
  areas: [
    {
      id: "color",
      numeral: "01",
      nombre: "Color",
      titulo: "Los tonos que te favorecen",
      texto:
        "Observamos el subtono de tu piel, el color de tus ojos, tu cabello y tu barba, y el contraste entre ellos. Con fotos tomadas con luz natural probamos tonos hasta definir tu estación y una paleta personal para camisas, trajes, corbatas y accesorios.",
      trabajamos: ["Subtono y contraste", "Estación y paleta personal", "Combinaciones seguras"],
      imagen: { src: fotos.color, alt: "Abanico de muestras de color ordenadas como un degradado" },
      muestra: {
        titulo: "Paleta de ejemplo",
        colores: ["#1f2d44", "#3d5a6c", "#7d8a8f", "#5a4636", "#9b7b52", "#ece6da"],
        puntos: ["Tonos fríos y profundos", "Metales en plata", "Neutros: marino y gris"],
      },
    },
    {
      id: "rostro",
      numeral: "02",
      nombre: "Rostro y cabello",
      titulo: "El marco de tu rostro",
      texto:
        "Estudiamos la forma de tu rostro, tus proporciones y tus rasgos. A partir de ahí recomendamos el corte, el largo y el diseño de barba que equilibran tus facciones, además de cejas, cuidado de la piel y lentes, adaptados a tu ritmo y a tu rutina.",
      trabajamos: ["Visagismo y proporciones", "Corte y diseño de barba", "Cuidado de la piel y lentes"],
      imagen: { src: fotos.hombreCabello, alt: "Barbero recortando la barba de un hombre" },
      muestra: {
        titulo: "Recomendaciones de ejemplo",
        puntos: ["Degradado bajo con volumen arriba", "Barba corta y definida en el mentón", "Monturas rectangulares delgadas"],
      },
    },
    {
      id: "silueta",
      numeral: "03",
      nombre: "Silueta",
      titulo: "El ajuste lo es todo",
      texto:
        "Analizamos tus proporciones y cómo te gusta sentirte con la ropa. Así definimos cortes de saco, pantalón y camisa, largos, calce y tejidos que te estilizan, y te decimos cuándo vale la pena ajustar una prenda con el sastre.",
      trabajamos: ["Proporciones y calce", "Cortes de saco, pantalón y camisa", "Tejidos según la ocasión"],
      imagen: { src: fotos.hombreSilueta, alt: "Saco a medida sobre un maniquí de sastre" },
      muestra: {
        titulo: "Recomendaciones de ejemplo",
        puntos: ["Saco de hombro natural", "Pantalón de corte recto", "Camisa entallada en la cintura"],
      },
    },
    {
      id: "armario",
      numeral: "04",
      nombre: "Armario",
      titulo: "Un armario que trabaja para ti",
      texto:
        "Revisamos contigo tu armario actual: qué usas, qué ya no suma y qué piezas pueden rendir más. Con lo que funciona armamos combinaciones de casual a formal y detectamos las pocas prendas clave que vale la pena comprar.",
      trabajamos: ["Revisión de armario", "Looks con tu propia ropa", "Lista de prendas clave"],
      imagen: { src: fotos.hombreArmario, alt: "Sacos de lana y tweed colgados en un perchero" },
      muestra: {
        titulo: "Fórmula de ejemplo",
        puntos: ["1 saco azul marino", "+ 3 bases neutras", "= 6 looks para la semana"],
      },
    },
    {
      id: "estilo",
      numeral: "05",
      nombre: "Estilo personal",
      titulo: "Una imagen que habla por ti",
      texto:
        "Integramos todo lo anterior con tu personalidad, tus gustos y tu estilo de vida. El resultado es una dirección de estilo clara, con palabras, referencias y ejemplos, para que cada decisión de imagen sea coherente contigo y fácil de mantener.",
      trabajamos: ["Test de estilo personal", "Palabras y referencias", "Guía para decidir con seguridad"],
      imagen: { src: fotos.hombreEstilo, alt: "Retrato editorial de un hombre con suéter de cuello alto" },
      muestra: {
        titulo: "Dirección de ejemplo",
        puntos: ["Clásico", "Relajado", "Con detalles de calidad"],
      },
    },
  ],
  unaPrenda: {
    base: "h-saco-azul",
    looks: [
      { ocasion: "Oficina", piezas: ["h-saco-azul", "h-camisa-blanca", "h-corbata-oro", "h-pantalon-gris", "h-oxford-negro"], nota: "Autoridad sin rigidez" },
      { ocasion: "Cita", piezas: ["h-saco-azul", "h-camisa-celeste", "h-pantalon-arena", "h-mocasin-cafe", "h-reloj"], nota: "Elegante y cercano" },
      { ocasion: "Fin de semana", piezas: ["h-saco-azul", "h-playera-blanca", "h-jeans", "h-tenis-blancos", "h-lentes"], nota: "Casual con intención" },
    ],
  },
  paquetes: paquetes("es", true),
};

const hombreEn: Categoria = {
  ...hombreEs,
  label: "Men",
  choix: {
    caption: "Sober, confident, with character",
    imagen: { src: fotos.hombreChoix, alt: "Man in a suit with glasses buttoning his jacket" },
  },
  hero: {
    eyebrow: "Personalised image consulting",
    titulo: "Discover what your image",
    enfasis: "can do for you.",
    intro:
      "Cut, beard, face, colour, silhouette and wardrobe. We build a complete, coherent image that speaks for you before you say a word.",
    imagen: { src: fotos.hombreHero, alt: "Man in a suit sitting on a chair" },
  },
  areas: [
    {
      ...hombreEs.areas[0],
      nombre: "Colour",
      titulo: "The tones that suit you",
      texto:
        "We look at your skin's undertone, the colour of your eyes, hair and beard, and the contrast between them. Using photos taken in natural light we test tones until we define your season and a personal palette for shirts, suits, ties and accessories.",
      trabajamos: ["Undertone and contrast", "Season and personal palette", "Safe combinations"],
      imagen: { src: fotos.color, alt: "Fan of colour swatches arranged like a gradient" },
      muestra: {
        titulo: "Sample palette",
        colores: hombreEs.areas[0].muestra.colores,
        puntos: ["Cool, deep tones", "Silver metals", "Neutrals: navy and grey"],
      },
    },
    {
      ...hombreEs.areas[1],
      nombre: "Face & hair",
      titulo: "The frame of your face",
      texto:
        "We study the shape of your face, your proportions and your features. From there we recommend the cut, length and beard design that balance your features, plus brows, skincare and glasses, adapted to your pace and routine.",
      trabajamos: ["Face mapping and proportions", "Cut and beard design", "Skincare and glasses"],
      imagen: { src: fotos.hombreCabello, alt: "Barber trimming a man's beard" },
      muestra: {
        titulo: "Sample recommendations",
        puntos: ["Low fade with volume on top", "Short beard, defined at the chin", "Thin rectangular frames"],
      },
    },
    {
      ...hombreEs.areas[2],
      nombre: "Silhouette",
      titulo: "Fit is everything",
      texto:
        "We analyse your proportions and how you like to feel in your clothes. That's how we define jacket, trouser and shirt cuts, lengths, fit and fabrics that flatter you, and tell you when a piece is worth taking to the tailor.",
      trabajamos: ["Proportions and fit", "Jacket, trouser and shirt cuts", "Fabrics for each occasion"],
      imagen: { src: fotos.hombreSilueta, alt: "Tailored jacket on a tailor's mannequin" },
      muestra: {
        titulo: "Sample recommendations",
        puntos: ["Natural-shoulder jacket", "Straight-cut trousers", "Shirt tapered at the waist"],
      },
    },
    {
      ...hombreEs.areas[3],
      nombre: "Wardrobe",
      titulo: "A wardrobe that works for you",
      texto:
        "We go through your current wardrobe with you: what you wear, what no longer adds up and which pieces could do more. With what works we put together combinations from casual to formal and spot the few key pieces worth buying.",
      trabajamos: ["Wardrobe review", "Looks from your own clothes", "List of key pieces"],
      imagen: { src: fotos.hombreArmario, alt: "Wool and tweed jackets hanging on a rail" },
      muestra: {
        titulo: "Sample formula",
        puntos: ["1 navy jacket", "+ 3 neutral basics", "= 6 looks for the week"],
      },
    },
    {
      ...hombreEs.areas[4],
      nombre: "Personal style",
      titulo: "An image that speaks for you",
      texto:
        "We bring everything together with your personality, your tastes and your lifestyle. The result is a clear style direction, with words, references and examples, so that every image decision is true to you and easy to keep up.",
      trabajamos: ["Personal style test", "Words and references", "A guide to decide with confidence"],
      imagen: { src: fotos.hombreEstilo, alt: "Editorial portrait of a man in a turtleneck sweater" },
      muestra: {
        titulo: "Sample direction",
        puntos: ["Classic", "Relaxed", "With quality details"],
      },
    },
  ],
  unaPrenda: {
    base: hombreEs.unaPrenda.base,
    looks: [
      { ...hombreEs.unaPrenda.looks[0], ocasion: "Office", nota: "Authority without stiffness" },
      { ...hombreEs.unaPrenda.looks[1], ocasion: "Date", nota: "Elegant and approachable" },
      { ...hombreEs.unaPrenda.looks[2], ocasion: "Weekend", nota: "Casual with intention" },
    ],
  },
  paquetes: paquetes("en", true),
};

export const categorias: Record<Lang, Record<CategoriaSlug, Categoria>> = {
  es: { mujer: mujerEs, hombre: hombreEs },
  en: { mujer: mujerEn, hombre: hombreEn },
};

export const slugs: CategoriaSlug[] = ["mujer", "hombre"];
