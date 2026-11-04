import type { CategoriaSlug } from "@/content/categorias";
import type { Lang } from "@/i18n/config";

export type TipoPieza =
  | "vestido"
  | "vestido-largo"
  | "falda"
  | "blusa"
  | "playera"
  | "camisa"
  | "blazer"
  | "abrigo"
  | "pantalon"
  | "corbata"
  | "mono"
  | "collar"
  | "panuelo"
  | "panuelo-bolsillo"
  | "sombrero"
  | "lentes"
  | "aretes"
  | "bolso"
  | "clutch"
  | "tacon"
  | "mocasin"
  | "bota"
  | "tenis"
  | "reloj"
  | "labial"
  | "perfume"
  | "cinturon";

/** Dónde se coloca la pieza sobre el maniquí. Una pieza por lugar. */
export type Lugar =
  | "cabeza"
  | "rostro"
  | "orejas"
  | "cuello"
  | "torso"
  | "capa"
  | "cuerpo"
  | "piernas"
  | "cintura"
  | "bolsillo"
  | "mano"
  | "muneca"
  | "pies"
  | "belleza";

export const lugarDe: Record<TipoPieza, Lugar> = {
  vestido: "cuerpo",
  "vestido-largo": "cuerpo",
  falda: "piernas",
  blusa: "torso",
  playera: "torso",
  camisa: "torso",
  blazer: "capa",
  abrigo: "capa",
  pantalon: "piernas",
  corbata: "cuello",
  mono: "cuello",
  collar: "cuello",
  panuelo: "cuello",
  "panuelo-bolsillo": "bolsillo",
  sombrero: "cabeza",
  lentes: "rostro",
  aretes: "orejas",
  bolso: "mano",
  clutch: "mano",
  tacon: "pies",
  mocasin: "pies",
  bota: "pies",
  tenis: "pies",
  reloj: "muneca",
  labial: "belleza",
  perfume: "belleza",
  cinturon: "cintura",
};

/** Los "pisos" del muro, como el degradado del Colorama. */
export const familias = [
  { id: "negro", nombre: "Noir", fondo: "#dedad3", texto: "#1d1a16" },
  { id: "perla", nombre: "Perle", fondo: "#efe9de", texto: "#1d1a16" },
  { id: "rosa", nombre: "Rose", fondo: "#f6d9dc", texto: "#1d1a16" },
  { id: "lila", nombre: "Lilas", fondo: "#e2d8f0", texto: "#1d1a16" },
  { id: "azul", nombre: "Bleu", fondo: "#d6e1f3", texto: "#1d1a16" },
  { id: "verde", nombre: "Vert", fondo: "#d8e8d6", texto: "#1d1a16" },
  { id: "amarillo", nombre: "Jaune", fondo: "#f8e9a3", texto: "#1d1a16" },
  { id: "oro", nombre: "Or", fondo: "#ecd9ae", texto: "#1d1a16" },
] as const;

export type FamiliaId = (typeof familias)[number]["id"];

export type Pieza = {
  id: string;
  tipo: TipoPieza;
  nombre: string;
  color: string;
  familia: FamiliaId;
};

const p = (id: string, tipo: TipoPieza, nombre: string, color: string, familia: FamiliaId): Pieza => ({
  id,
  tipo,
  nombre,
  color,
  familia,
});

const piezasMujer: Pieza[] = [
  p("m-vestido-negro", "vestido", "Vestido negro", "#1d1b19", "negro"),
  p("m-pantalon-negro", "pantalon", "Pantalón sastre", "#24211e", "negro"),
  p("m-bolso-negro", "bolso", "Bolso de mano", "#1a1816", "negro"),
  p("m-mocasin-negro", "mocasin", "Mocasín", "#211e1b", "negro"),
  p("m-tacon-negro", "tacon", "Stiletto negro", "#191715", "negro"),
  p("m-blusa-marfil", "blusa", "Blusa de seda", "#f1e8d6", "perla"),
  p("m-playera-blanca", "playera", "Playera blanca", "#fbfaf6", "perla"),
  p("m-tenis-blancos", "tenis", "Tenis blancos", "#f7f5ef", "perla"),
  p("m-collar-perlas", "collar", "Collar de perlas", "#f3ede0", "perla"),
  p("m-vestido-lirio", "vestido", "Vestido lirio", "#d9506b", "rosa"),
  p("m-blusa-rosa", "blusa", "Blusa rosa", "#f0b8c4", "rosa"),
  p("m-clutch-rosa", "clutch", "Clutch rosa", "#e7a1b2", "rosa"),
  p("m-labial-rosa", "labial", "Labial rosa", "#c93d5c", "rosa"),
  p("m-falda-lila", "falda", "Falda plisada", "#b9a3d9", "lila"),
  p("m-vestido-largo-lila", "vestido-largo", "Vestido de gala", "#8b6bc8", "lila"),
  p("m-panuelo-prado", "panuelo", "Mascada", "#9d82d2", "lila"),
  p("m-jeans", "pantalon", "Jeans rectos", "#4a6a9c", "azul"),
  p("m-blazer-aciano", "blazer", "Blazer aciano", "#5b7fd1", "azul"),
  p("m-bolso-azul", "bolso", "Bolso azul", "#3f5fa8", "azul"),
  p("m-vestido-verde", "vestido", "Vestido jardín", "#3e8e4e", "verde"),
  p("m-falda-verde", "falda", "Falda midi", "#5d9c63", "verde"),
  p("m-aretes-esmeralda", "aretes", "Aretes esmeralda", "#1f7a55", "verde"),
  p("m-vestido-flora", "vestido", "Vestido Flora", "#f3d33b", "amarillo"),
  p("m-bolso-amarillo", "bolso", "Bolso amarillo", "#f0c92e", "amarillo"),
  p("m-tacon-amarillo", "tacon", "Tacón amarillo", "#f3d33b", "amarillo"),
  p("m-perfume-flora", "perfume", "Perfume floral", "#f5da4f", "amarillo"),
  p("m-sombrero-paja", "sombrero", "Sombrero de paja", "#e3c98b", "amarillo"),
  p("m-blazer-camel", "blazer", "Blazer camel", "#c49a6c", "oro"),
  p("m-tacon-nude", "tacon", "Tacón nude", "#d9b79a", "oro"),
  p("m-aretes-oro", "aretes", "Aretes de oro", "#d9b45a", "oro"),
  p("m-cinturon-oro", "cinturon", "Cinturón dorado", "#c9a24a", "oro"),
  p("m-lentes-carey", "lentes", "Lentes carey", "#7a4a2a", "oro"),
  p("m-reloj-oro", "reloj", "Reloj dorado", "#d2ac55", "oro"),
];

const piezasHombre: Pieza[] = [
  p("h-saco-negro", "blazer", "Smoking", "#1b1917", "negro"),
  p("h-oxford-negro", "mocasin", "Oxford negro", "#1a1816", "negro"),
  p("h-mono-negro", "mono", "Moño", "#141210", "negro"),
  p("h-cinturon-negro", "cinturon", "Cinturón de piel", "#221f1c", "negro"),
  p("h-lentes", "lentes", "Lentes de sol", "#1d1b19", "negro"),
  p("h-pantalon-gris", "pantalon", "Pantalón gris", "#7d8088", "perla"),
  p("h-abrigo-gris", "abrigo", "Abrigo gris", "#5f6268", "perla"),
  p("h-reloj", "reloj", "Reloj de acero", "#b9bdc2", "perla"),
  p("h-camisa-blanca", "camisa", "Camisa blanca", "#fbfaf6", "perla"),
  p("h-playera-blanca", "playera", "Playera blanca", "#f6f4ee", "perla"),
  p("h-tenis-blancos", "tenis", "Tenis blancos", "#f4f2ec", "perla"),
  p("h-panuelo-blanco", "panuelo-bolsillo", "Pañuelo blanco", "#ffffff", "perla"),
  p("h-camisa-rosa", "camisa", "Camisa rosa", "#e8b7bf", "rosa"),
  p("h-corbata-lila", "corbata", "Corbata lila", "#8b6bc8", "lila"),
  p("h-saco-azul", "blazer", "Saco azul marino", "#24345a", "azul"),
  p("h-camisa-celeste", "camisa", "Camisa celeste", "#a9c4e6", "azul"),
  p("h-jeans", "pantalon", "Jeans oscuros", "#34507e", "azul"),
  p("h-corbata-azul", "corbata", "Corbata azul", "#3b5ea6", "azul"),
  p("h-saco-verde", "blazer", "Saco verde botella", "#2f5d46", "verde"),
  p("h-corbata-verde", "corbata", "Corbata verde", "#3e8e4e", "verde"),
  p("h-playera-verde", "playera", "Playera olivo", "#6f7d4f", "verde"),
  p("h-panuelo-flora", "panuelo-bolsillo", "Pañuelo amarillo", "#f3d33b", "amarillo"),
  p("h-playera-amarilla", "playera", "Polo amarillo", "#f1d35a", "amarillo"),
  p("h-corbata-oro", "corbata", "Corbata dorada", "#c9a24a", "oro"),
  p("h-pantalon-arena", "pantalon", "Pantalón arena", "#cbb48f", "oro"),
  p("h-mocasin-cafe", "mocasin", "Mocasín café", "#6b3e22", "oro"),
  p("h-abrigo-camel", "abrigo", "Abrigo camel", "#c49a6c", "oro"),
  p("h-bota-cafe", "bota", "Botín café", "#5a3520", "oro"),
  p("h-perfume", "perfume", "Fragancia", "#d9b45a", "oro"),
];

const piezasBase: Record<CategoriaSlug, Pieza[]> = {
  mujer: piezasMujer,
  hombre: piezasHombre,
};

export const ocasiones = ["Oficina", "Cita", "Evento", "Fin de semana"] as const;
export type Ocasion = (typeof ocasiones)[number];

export type Outfit = { nombre: string; ocasion: Ocasion; piezas: string[]; nota: string };

const outfitsBase: Record<CategoriaSlug, Outfit[]> = {
  mujer: [
    { nombre: "Poder suave", ocasion: "Oficina", piezas: ["m-blazer-aciano", "m-blusa-marfil", "m-pantalon-negro", "m-mocasin-negro", "m-bolso-negro"], nota: "El azul aciano proyecta confianza sin perder frescura." },
    { nombre: "Mañana dorada", ocasion: "Oficina", piezas: ["m-blazer-camel", "m-blusa-marfil", "m-falda-lila", "m-tacon-nude", "m-reloj-oro"], nota: "Neutros cálidos con un toque de color inesperado." },
    { nombre: "Flora", ocasion: "Cita", piezas: ["m-vestido-flora", "m-tacon-nude", "m-aretes-oro", "m-clutch-rosa", "m-labial-rosa"], nota: "Amarillo luminoso, oro y un labio rosa." },
    { nombre: "Lirio", ocasion: "Cita", piezas: ["m-vestido-lirio", "m-tacon-negro", "m-collar-perlas", "m-perfume-flora"], nota: "Romántico y seguro: el color hace el trabajo." },
    { nombre: "Prado de noche", ocasion: "Evento", piezas: ["m-vestido-largo-lila", "m-clutch-rosa", "m-aretes-esmeralda", "m-tacon-nude"], nota: "Violeta y esmeralda, como un jardín de Klimt." },
    { nombre: "Negro absoluto", ocasion: "Evento", piezas: ["m-vestido-negro", "m-collar-perlas", "m-tacon-amarillo", "m-bolso-amarillo", "m-labial-rosa"], nota: "El clásico, despertado con amarillo." },
    { nombre: "Domingo", ocasion: "Fin de semana", piezas: ["m-playera-blanca", "m-jeans", "m-tenis-blancos", "m-lentes-carey", "m-bolso-amarillo"], nota: "Básicos impecables y un accesorio protagonista." },
    { nombre: "Jardín", ocasion: "Fin de semana", piezas: ["m-vestido-verde", "m-sombrero-paja", "m-tenis-blancos", "m-panuelo-prado"], nota: "Fresco, juvenil y sin esfuerzo." },
  ],
  hombre: [
    { nombre: "Consejo", ocasion: "Oficina", piezas: ["h-saco-azul", "h-camisa-blanca", "h-corbata-oro", "h-pantalon-gris", "h-oxford-negro", "h-reloj"], nota: "Azul marino y oro: autoridad con calidez." },
    { nombre: "Gris ejecutivo", ocasion: "Oficina", piezas: ["h-abrigo-gris", "h-camisa-celeste", "h-corbata-azul", "h-pantalon-gris", "h-oxford-negro"], nota: "Monocromático, preciso y moderno." },
    { nombre: "Terraza", ocasion: "Cita", piezas: ["h-saco-verde", "h-camisa-blanca", "h-pantalon-arena", "h-mocasin-cafe", "h-panuelo-flora"], nota: "Verde botella y un pañuelo amarillo que se recuerda." },
    { nombre: "Rosa suave", ocasion: "Cita", piezas: ["h-camisa-rosa", "h-pantalon-arena", "h-mocasin-cafe", "h-reloj", "h-lentes"], nota: "El rosa bien llevado transmite seguridad." },
    { nombre: "Gala", ocasion: "Evento", piezas: ["h-saco-negro", "h-camisa-blanca", "h-mono-negro", "h-oxford-negro", "h-panuelo-blanco"], nota: "El smoking, impecable." },
    { nombre: "Verde botella", ocasion: "Evento", piezas: ["h-saco-verde", "h-camisa-blanca", "h-corbata-lila", "h-pantalon-gris", "h-oxford-negro", "h-perfume"], nota: "Una alternativa elegante al negro." },
    { nombre: "Sábado", ocasion: "Fin de semana", piezas: ["h-playera-blanca", "h-jeans", "h-tenis-blancos", "h-lentes", "h-abrigo-camel"], nota: "Básicos con un abrigo que lo eleva todo." },
    { nombre: "Campo", ocasion: "Fin de semana", piezas: ["h-playera-verde", "h-pantalon-arena", "h-bota-cafe", "h-abrigo-camel", "h-cinturon-negro"], nota: "Tonos tierra, texturas y comodidad." },
  ],
};


export const etiquetaOcasion: Record<Lang, Record<Ocasion, string>> = {
  es: { Oficina: "Oficina", Cita: "Cita", Evento: "Evento", "Fin de semana": "Fin de semana" },
  en: { Oficina: "Office", Cita: "Date", Evento: "Event", "Fin de semana": "Weekend" },
};

const nombresEn: Record<string, string> = {
  "m-vestido-negro": "Black dress",
  "m-pantalon-negro": "Tailored trousers",
  "m-bolso-negro": "Handbag",
  "m-mocasin-negro": "Loafer",
  "m-tacon-negro": "Black stiletto",
  "m-blusa-marfil": "Silk blouse",
  "m-playera-blanca": "White tee",
  "m-tenis-blancos": "White sneakers",
  "m-collar-perlas": "Pearl necklace",
  "m-vestido-lirio": "Lily dress",
  "m-blusa-rosa": "Pink blouse",
  "m-clutch-rosa": "Pink clutch",
  "m-labial-rosa": "Pink lipstick",
  "m-falda-lila": "Pleated skirt",
  "m-vestido-largo-lila": "Evening gown",
  "m-panuelo-prado": "Silk scarf",
  "m-jeans": "Straight jeans",
  "m-blazer-aciano": "Cornflower blazer",
  "m-bolso-azul": "Blue bag",
  "m-vestido-verde": "Garden dress",
  "m-falda-verde": "Midi skirt",
  "m-aretes-esmeralda": "Emerald earrings",
  "m-vestido-flora": "Flora dress",
  "m-bolso-amarillo": "Yellow bag",
  "m-tacon-amarillo": "Yellow heel",
  "m-perfume-flora": "Floral perfume",
  "m-sombrero-paja": "Straw hat",
  "m-blazer-camel": "Camel blazer",
  "m-tacon-nude": "Nude heel",
  "m-aretes-oro": "Gold earrings",
  "m-cinturon-oro": "Gold belt",
  "m-lentes-carey": "Tortoiseshell glasses",
  "m-reloj-oro": "Gold watch",
  "h-saco-negro": "Tuxedo",
  "h-oxford-negro": "Black oxford",
  "h-mono-negro": "Bow tie",
  "h-cinturon-negro": "Leather belt",
  "h-lentes": "Sunglasses",
  "h-pantalon-gris": "Grey trousers",
  "h-abrigo-gris": "Grey coat",
  "h-reloj": "Steel watch",
  "h-camisa-blanca": "White shirt",
  "h-playera-blanca": "White tee",
  "h-tenis-blancos": "White sneakers",
  "h-panuelo-blanco": "White pocket square",
  "h-camisa-rosa": "Pink shirt",
  "h-corbata-lila": "Lilac tie",
  "h-saco-azul": "Navy blazer",
  "h-camisa-celeste": "Sky-blue shirt",
  "h-jeans": "Dark jeans",
  "h-corbata-azul": "Blue tie",
  "h-saco-verde": "Bottle-green blazer",
  "h-corbata-verde": "Green tie",
  "h-playera-verde": "Olive tee",
  "h-panuelo-flora": "Yellow pocket square",
  "h-playera-amarilla": "Yellow polo",
  "h-corbata-oro": "Gold tie",
  "h-pantalon-arena": "Sand trousers",
  "h-mocasin-cafe": "Brown loafer",
  "h-abrigo-camel": "Camel coat",
  "h-bota-cafe": "Brown boot",
  "h-perfume": "Fragrance",
};

const outfitsEn: Record<string, { nombre: string; nota: string }> = {
  "Poder suave": { nombre: "Soft power", nota: "Cornflower blue projects confidence without losing freshness." },
  "Mañana dorada": { nombre: "Golden morning", nota: "Warm neutrals with an unexpected touch of colour." },
  Flora: { nombre: "Flora", nota: "Luminous yellow, gold and a pink lip." },
  Lirio: { nombre: "Lily", nota: "Romantic and confident: the colour does the work." },
  "Prado de noche": { nombre: "Night meadow", nota: "Violet and emerald, like a Klimt garden." },
  "Negro absoluto": { nombre: "Absolute black", nota: "The classic, woken up with yellow." },
  Domingo: { nombre: "Sunday", nota: "Flawless basics and one statement accessory." },
  Jardín: { nombre: "Garden", nota: "Fresh, youthful and effortless." },
  Consejo: { nombre: "Boardroom", nota: "Navy and gold: authority with warmth." },
  "Gris ejecutivo": { nombre: "Executive grey", nota: "Monochrome, precise and modern." },
  Terraza: { nombre: "Terrace", nota: "Bottle green and a yellow pocket square people remember." },
  "Rosa suave": { nombre: "Soft pink", nota: "Pink, worn well, signals confidence." },
  Gala: { nombre: "Gala", nota: "The tuxedo, flawless." },
  "Verde botella": { nombre: "Bottle green", nota: "An elegant alternative to black." },
  Sábado: { nombre: "Saturday", nota: "Basics with a coat that lifts everything." },
  Campo: { nombre: "Countryside", nota: "Earth tones, texture and comfort." },
};

export function piezasDe(lang: Lang, cat: CategoriaSlug): Pieza[] {
  if (lang === "es") return piezasBase[cat];
  return piezasBase[cat].map((x) => ({ ...x, nombre: nombresEn[x.id] ?? x.nombre }));
}

export function outfitsDe(lang: Lang, cat: CategoriaSlug): Outfit[] {
  if (lang === "es") return outfitsBase[cat];
  return outfitsBase[cat].map((o) => ({ ...o, ...outfitsEn[o.nombre] }));
}

export function piezaPorId(lang: Lang, cat: CategoriaSlug, id: string) {
  return piezasDe(lang, cat).find((x) => x.id === id);
}
