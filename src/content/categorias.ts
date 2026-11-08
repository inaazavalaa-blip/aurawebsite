import type { Lang } from "@/i18n/config";

export type CategoriaSlug = "hombre" | "mujer";

export type Imagen = { src: string; alt: string };

export type Paquete = {
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

export type MarcoTipo = "arco" | "sol" | "cuadrilobulo";

export type Area = {
  id: string;
  numeral: string;
  nombre: string;
  titulo: string;
  texto: string;
  trabajamos: string[];
  imagen?: Imagen;
  marco: MarcoTipo;
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
  mujerHero: unsplash("1743660606584-a08c89003d13", 1100),
  mujerCabello: unsplash("1580618672591-eb180b1a973f", 900),
  mujerRostro: unsplash("1636023730877-233b9237d4ec", 900),
  hombreChoix: "/images/hombre-choix.jpg",
  hombreHero: unsplash("1676278746061-c5bac5b34ae5", 1100),
  hombreCabello: unsplash("1599011176306-4a96f1516d4d", 900),
  hombreRostro: unsplash("1503951914875-452162b0f3f1", 900),
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
    { numeral: "I", titulo: "Escríbenos", texto: "Por WhatsApp nos cuentas qué quieres cambiar y qué te gustaría proyectar." },
    { numeral: "II", titulo: "Diagnóstico", texto: "Analizamos tu rostro, tu color, tu silueta, tu cabello y tu armario." },
    { numeral: "III", titulo: "Transformación", texto: "Llevamos el plan a la realidad: corte, color, maquillaje o grooming, prendas y looks." },
    { numeral: "IV", titulo: "Seguimiento", texto: "Te acompañamos para que tu nueva imagen se sostenga en el día a día." },
  ],
  en: [
    { numeral: "I", titulo: "Message us", texto: "Tell us on WhatsApp what you want to change and how you'd like to come across." },
    { numeral: "II", titulo: "Diagnosis", texto: "We analyse your face, your colouring, your silhouette, your hair and your wardrobe." },
    { numeral: "III", titulo: "Transformation", texto: "We bring the plan to life: cut, colour, makeup or grooming, clothes and looks." },
    { numeral: "IV", titulo: "Follow-up", texto: "We stay by your side so your new image holds up day to day." },
  ],
};

const precios = [
  { usd: "$139 USD", mxn: "$2,790 MXN" },
  { usd: "$280 USD", mxn: "$5,500 MXN" },
];

function paquetes(lang: Lang, hombre: boolean): Paquete[] {
  const es: Omit<Paquete, "usd" | "mxn">[] = [
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
  const en: Omit<Paquete, "usd" | "mxn">[] = [
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
  return (lang === "es" ? es : en).map((p, i) => ({ ...p, ...precios[i] }));
}

const mujerEs: Categoria = {
  slug: "mujer",
  label: "Mujer",
  choix: {
    caption: "Fresca, luminosa, auténtica",
    imagen: { src: fotos.mujerChoix, alt: "Mujer con vestido amarillo frente a una pared amarilla" },
  },
  hero: {
    eyebrow: "Maison de imagen integral",
    titulo: "No es ropa nueva.",
    enfasis: "Es una nueva tú.",
    intro:
      "Cabello, rostro, color, silueta y armario. Diseñamos tu imagen completa para que cada vez que te mires sientas que por fin te ves como eres.",
    imagen: { src: fotos.mujerHero, alt: "Mujer con vestido amarillo y sombrero en una sesión editorial" },
  },
  areas: [
    {
      id: "cabello",
      numeral: "I",
      nombre: "Cabello",
      titulo: "El marco de tu rostro",
      texto:
        "Elegimos corte, largo, volumen y color según tus facciones, tu textura y tu rutina real. Un buen corte cambia la forma en que te ven antes que cualquier prenda.",
      trabajamos: ["Corte según tu rostro", "Color que ilumina tu piel", "Peinados para tu día a día"],
      imagen: { src: fotos.mujerCabello, alt: "Estilista peinando a una clienta con cepillo redondo" },
      marco: "arco",
    },
    {
      id: "rostro",
      numeral: "II",
      nombre: "Rostro",
      titulo: "Tu mejor luz",
      texto:
        "Visagismo y maquillaje pensados para resaltar lo que ya es tuyo. Aprendes una rutina sencilla para el día, otra para la noche y los trucos para cada ocasión.",
      trabajamos: ["Visagismo y cejas", "Automaquillaje día y noche", "Rutina de cuidado"],
      imagen: { src: fotos.mujerRostro, alt: "Maquillista aplicando maquillaje a una mujer" },
      marco: "sol",
    },
    {
      id: "color",
      numeral: "III",
      nombre: "Color",
      titulo: "Los colores que te encienden",
      texto:
        "Descubrimos tu estación y tu paleta personal: los tonos que iluminan tu piel, tus ojos y tu cabello, en ropa, accesorios y maquillaje.",
      trabajamos: ["Colorimetría y estación", "Paleta para ropa y maquillaje", "Metales: oro o plata"],
      marco: "cuadrilobulo",
    },
    {
      id: "silueta",
      numeral: "IV",
      nombre: "Silueta",
      titulo: "Proporción y armonía",
      texto:
        "Entendemos tu cuerpo para elegir cortes, largos, escotes y tejidos que te favorecen y te hacen sentir cómoda y poderosa.",
      trabajamos: ["Morfología corporal", "Cortes y escotes", "Tejidos y caídas"],
      marco: "arco",
    },
    {
      id: "armario",
      numeral: "V",
      nombre: "Armario",
      titulo: "Menos prendas, más looks",
      texto:
        "Ordenamos tu armario, rescatamos lo que funciona y diseñamos un armario cápsula con combinaciones para cada momento de tu vida.",
      trabajamos: ["Detox de armario", "Armario cápsula", "Ruta de compras inteligente"],
      marco: "sol",
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
    eyebrow: "Full image maison",
    titulo: "It's not new clothes.",
    enfasis: "It's a new you.",
    intro:
      "Hair, face, colour, silhouette and wardrobe. We design your complete image so that every time you look in the mirror you finally see yourself as you are.",
    imagen: { src: fotos.mujerHero, alt: "Woman in a yellow dress and hat in an editorial shoot" },
  },
  areas: [
    {
      ...mujerEs.areas[0],
      nombre: "Hair",
      titulo: "The frame of your face",
      texto:
        "We choose the cut, length, volume and colour for your features, texture and real routine. A good cut changes how people see you before any garment does.",
      trabajamos: ["A cut for your face shape", "Colour that lights up your skin", "Styling for every day"],
      imagen: { src: fotos.mujerCabello, alt: "Stylist blow-drying a client's hair with a round brush" },
    },
    {
      ...mujerEs.areas[1],
      nombre: "Face",
      titulo: "Your best light",
      texto:
        "Face mapping and makeup designed to bring out what is already yours. You learn a simple routine for day, another for night, and tricks for every occasion.",
      trabajamos: ["Face mapping and brows", "Day and night self-makeup", "Skincare routine"],
      imagen: { src: fotos.mujerRostro, alt: "Makeup artist applying makeup to a woman" },
    },
    {
      ...mujerEs.areas[2],
      nombre: "Colour",
      titulo: "The colours that light you up",
      texto:
        "We discover your season and personal palette: the tones that brighten your skin, eyes and hair, in clothing, accessories and makeup.",
      trabajamos: ["Colour analysis and season", "Palette for clothes and makeup", "Metals: gold or silver"],
    },
    {
      ...mujerEs.areas[3],
      nombre: "Silhouette",
      titulo: "Proportion and harmony",
      texto:
        "We get to know your body to choose cuts, lengths, necklines and fabrics that flatter you and make you feel comfortable and powerful.",
      trabajamos: ["Body shape analysis", "Cuts and necklines", "Fabrics and drape"],
    },
    {
      ...mujerEs.areas[4],
      nombre: "Wardrobe",
      titulo: "Fewer clothes, more looks",
      texto:
        "We organise your wardrobe, rescue what works and design a capsule wardrobe with combinations for every moment of your life.",
      trabajamos: ["Wardrobe detox", "Capsule wardrobe", "Smart shopping route"],
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
    eyebrow: "Maison de imagen integral",
    titulo: "No es ropa nueva.",
    enfasis: "Es tu mejor versión.",
    intro:
      "Corte, barba, rostro, color, silueta y armario. Construimos una imagen completa y coherente que habla por ti antes de que digas una palabra.",
    imagen: { src: fotos.hombreHero, alt: "Hombre con traje sentado en una silla" },
  },
  areas: [
    {
      id: "cabello",
      numeral: "I",
      nombre: "Cabello y barba",
      titulo: "El marco de tu rostro",
      texto:
        "Definimos el corte y el diseño de barba que equilibran tus facciones y se adaptan a tu ritmo. Lo más visible de tu imagen, resuelto con precisión.",
      trabajamos: ["Corte según tu rostro", "Diseño de barba", "Productos y rutina"],
      imagen: { src: fotos.hombreCabello, alt: "Barbero recortando la barba de un hombre" },
      marco: "arco",
    },
    {
      id: "rostro",
      numeral: "II",
      nombre: "Rostro",
      titulo: "Presencia y cuidado",
      texto:
        "Visagismo, cejas y una rutina de cuidado de la piel simple y efectiva. Te ves descansado, cuidado y seguro, sin que se note el esfuerzo.",
      trabajamos: ["Visagismo", "Cuidado de la piel", "Lentes según tu rostro"],
      imagen: { src: fotos.hombreRostro, alt: "Hombre sentado en la silla del barbero" },
      marco: "sol",
    },
    {
      id: "color",
      numeral: "III",
      nombre: "Color",
      titulo: "Los tonos que te favorecen",
      texto:
        "Tu paleta personal para camisas, trajes, corbatas y accesorios: los colores que iluminan tu rostro y proyectan autoridad.",
      trabajamos: ["Colorimetría y estación", "Paleta para ropa y accesorios", "Combinaciones seguras"],
      marco: "cuadrilobulo",
    },
    {
      id: "silueta",
      numeral: "IV",
      nombre: "Silueta",
      titulo: "El ajuste lo es todo",
      texto:
        "Proporción, largos y calce. Aprendes qué cortes de saco, pantalón y camisa te estilizan y cuándo vale la pena el sastre.",
      trabajamos: ["Morfología corporal", "Calce y sastrería", "Tejidos según la ocasión"],
      marco: "arco",
    },
    {
      id: "armario",
      numeral: "V",
      nombre: "Armario",
      titulo: "Un armario que trabaja para ti",
      texto:
        "Ordenamos lo que tienes, eliminamos lo que no suma y armamos un armario cápsula de casual a formal, con una ruta de compras clara.",
      trabajamos: ["Detox de armario", "Armario cápsula", "Ruta de compras inteligente"],
      marco: "sol",
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
    eyebrow: "Full image maison",
    titulo: "It's not new clothes.",
    enfasis: "It's your best version.",
    intro:
      "Cut, beard, face, colour, silhouette and wardrobe. We build a complete, coherent image that speaks for you before you say a word.",
    imagen: { src: fotos.hombreHero, alt: "Man in a suit sitting on a chair" },
  },
  areas: [
    {
      ...hombreEs.areas[0],
      nombre: "Hair & beard",
      titulo: "The frame of your face",
      texto:
        "We define the haircut and beard design that balance your features and fit your pace. The most visible part of your image, done with precision.",
      trabajamos: ["A cut for your face shape", "Beard design", "Products and routine"],
      imagen: { src: fotos.hombreCabello, alt: "Barber trimming a man's beard" },
    },
    {
      ...hombreEs.areas[1],
      nombre: "Face",
      titulo: "Presence and care",
      texto:
        "Face mapping, brows and a simple, effective skincare routine. You look rested, cared for and confident, without the effort showing.",
      trabajamos: ["Face mapping", "Skincare", "Glasses for your face shape"],
      imagen: { src: fotos.hombreRostro, alt: "Man sitting in a barber's chair" },
    },
    {
      ...hombreEs.areas[2],
      nombre: "Colour",
      titulo: "The tones that suit you",
      texto:
        "Your personal palette for shirts, suits, ties and accessories: the colours that brighten your face and project authority.",
      trabajamos: ["Colour analysis and season", "Palette for clothes and accessories", "Safe combinations"],
    },
    {
      ...hombreEs.areas[3],
      nombre: "Silhouette",
      titulo: "Fit is everything",
      texto:
        "Proportion, lengths and fit. You learn which jacket, trouser and shirt cuts flatter you and when the tailor is worth it.",
      trabajamos: ["Body shape analysis", "Fit and tailoring", "Fabrics for each occasion"],
    },
    {
      ...hombreEs.areas[4],
      nombre: "Wardrobe",
      titulo: "A wardrobe that works for you",
      texto:
        "We sort what you have, remove what doesn't add up and build a capsule wardrobe from casual to formal, with a clear shopping route.",
      trabajamos: ["Wardrobe detox", "Capsule wardrobe", "Smart shopping route"],
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
