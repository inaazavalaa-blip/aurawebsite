export type CategoriaSlug = "hombre" | "mujer";

export type Imagen = { src: string; alt: string };

export type Paquete = {
  etiqueta: string;
  nombre: string;
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

export const imagenes = {
  versalles: {
    src: unsplash("1633117678740-989810c62541", 1400),
    alt: "Salón palaciego con candelabros dorados",
  },
  klimt: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Gustav_Klimt_016.jpg",
    alt: "El beso, de Gustav Klimt (1908), detalle en pan de oro",
  },
} satisfies Record<string, Imagen>;

export const pasosProceso = [
  {
    numeral: "I",
    titulo: "Escríbenos",
    texto: "Por WhatsApp nos cuentas qué quieres cambiar y qué te gustaría proyectar.",
  },
  {
    numeral: "II",
    titulo: "Diagnóstico",
    texto: "Analizamos tu rostro, tu color, tu silueta, tu cabello y tu armario.",
  },
  {
    numeral: "III",
    titulo: "Transformación",
    texto: "Llevamos el plan a la realidad: corte, color, maquillaje o grooming, prendas y looks.",
  },
  {
    numeral: "IV",
    titulo: "Seguimiento",
    texto: "Te acompañamos para que tu nueva imagen se sostenga en el día a día.",
  },
];

const paquetesBase = (hombre: boolean): Paquete[] => [
  {
    etiqueta: "Diagnóstico",
    nombre: "Express de Color y Estilo",
    descripcion: "Descubre tus colores ideales y tu estilo personal con una experiencia totalmente digital.",
    usd: "$49 USD",
    mxn: "$990 MXN",
    incluye: [
      "Análisis de color online y estación",
      hombre
        ? "Paleta digital para ropa, accesorios y grooming"
        : "Paleta digital para ropa, maquillaje y accesorios",
      "Test y diagnóstico de estilo personal",
      "PDF por correo en 48–72 horas",
    ],
  },
  {
    etiqueta: "La más elegida",
    nombre: "Transformación de Estilo",
    descripcion: "Una transformación completa con acompañamiento y un manual de estilo hecho para ti.",
    usd: "$139 USD",
    mxn: "$2,790 MXN",
    incluye: [
      "Todo lo del paquete Express",
      hombre ? "Análisis de rostro, barba y cabello" : "Análisis de rostro, cabello y silueta",
      "Sesión en vivo de 60 minutos",
      "Revisión de tu armario actual",
      "Dossier de imagen de más de 20 páginas",
      "14 días de acompañamiento por WhatsApp",
    ],
    destacado: true,
  },
  {
    etiqueta: "Experiencia total",
    nombre: "VIP · Armario Cápsula",
    descripcion: "La renovación completa: imagen, armario y un catálogo de compras a tu medida.",
    usd: "$280 USD",
    mxn: "$5,500 MXN",
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

export const categorias: Record<CategoriaSlug, Categoria> = {
  mujer: {
    slug: "mujer",
    label: "Mujer",
    choix: {
      caption: "Fresca, luminosa, auténtica",
      imagen: {
        src: unsplash("1685206752060-d200820e092c", 900),
        alt: "Mujer con vestido amarillo frente a una pared amarilla",
      },
    },
    hero: {
      eyebrow: "Maison de imagen integral",
      titulo: "No es ropa nueva.",
      enfasis: "Es una nueva tú.",
      intro:
        "Cabello, rostro, color, silueta y armario. Diseñamos tu imagen completa para que cada vez que te mires sientas que por fin te ves como eres.",
      imagen: {
        src: unsplash("1743660606584-a08c89003d13", 1100),
        alt: "Mujer con vestido amarillo y sombrero en una sesión editorial",
      },
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
        imagen: { src: unsplash("1580618672591-eb180b1a973f", 900), alt: "Estilista peinando a una clienta con cepillo redondo" },
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
        imagen: { src: unsplash("1636023730877-233b9237d4ec", 900), alt: "Maquillista aplicando maquillaje a una mujer" },
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
    paquetes: paquetesBase(false),
  },
  hombre: {
    slug: "hombre",
    label: "Hombre",
    choix: {
      caption: "Sobrio, seguro, con carácter",
      imagen: {
        src: unsplash("1676377630356-d8e7acd02ead", 900),
        alt: "Hombre con traje ajustándose la corbata",
      },
    },
    hero: {
      eyebrow: "Maison de imagen integral",
      titulo: "No es ropa nueva.",
      enfasis: "Es tu mejor versión.",
      intro:
        "Corte, barba, rostro, color, silueta y armario. Construimos una imagen completa y coherente que habla por ti antes de que digas una palabra.",
      imagen: {
        src: unsplash("1676278746061-c5bac5b34ae5", 1100),
        alt: "Hombre con traje sentado en una silla",
      },
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
        imagen: { src: unsplash("1599011176306-4a96f1516d4d", 900), alt: "Barbero recortando la barba de un hombre" },
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
        imagen: { src: unsplash("1503951914875-452162b0f3f1", 900), alt: "Hombre sentado en la silla del barbero" },
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
    paquetes: paquetesBase(true),
  },
};

export const slugs: CategoriaSlug[] = ["mujer", "hombre"];

export function esCategoria(valor: string): valor is CategoriaSlug {
  return (slugs as string[]).includes(valor);
}

export const paginas = [
  { ruta: "", label: "Inicio" },
  { ruta: "/transformacion", label: "Transformación" },
  { ruta: "/vitrina", label: "La Vitrina" },
  { ruta: "/servicios", label: "Servicios" },
  { ruta: "/maison", label: "La Maison" },
];
