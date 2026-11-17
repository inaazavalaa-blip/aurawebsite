import { cookies } from "next/headers";
import type { EstadoReserva } from "@/lib/reservas";

/*
 * Textos del panel en español e inglés.
 * Si cambias un texto en español, cambia también el inglés.
 */

export type IdiomaPanel = "es" | "en";
export const COOKIE_IDIOMA = "panel_idioma";

/** Idioma elegido con el botón ES / EN. Si no se ha elegido, español. */
export async function idiomaPanel(): Promise<IdiomaPanel> {
  return (await cookies()).get(COOKIE_IDIOMA)?.value === "en" ? "en" : "es";
}

const es = {
  tituloPestana: "Panel · Aura",
  cambiarIdioma: "Idioma del panel",
  // Entrada
  tituloEntrada: "Panel de Aura",
  sinConexion: "El panel aún no está conectado a Supabase. Faltan las claves del proyecto.",
  errorDatos: "El correo o la contraseña no son correctos.",
  errorAcceso: "Esta cuenta no tiene permiso para entrar al panel.",
  correo: "Correo",
  contrasena: "Contraseña",
  entrar: "Entrar",
  // Menú
  reservas: "Reservas",
  clientes: "Clientes",
  salir: "Salir",
  // Reservas
  filtrar: "Filtrar por estado",
  todas: "Todas",
  errorReservas: "No se pudieron cargar las reservas. Revisa que las tablas de Supabase estén creadas.",
  sinReservas: "No hay reservas aquí todavía.",
  mostrando: (n: number) => `Mostrando las ${n} más recientes.`,
  servicio: "Servicio",
  coleccion: "Colección",
  mujer: "Mujer",
  hombre: "Hombre",
  espanol: "español",
  ingles: "inglés",
  modalidad: "Modalidad",
  fechaPreferida: "Fecha preferida",
  quiereCambiar: "Quiere cambiar",
  estado: "Estado",
  notas: "Notas internas",
  guardar: "Guardar",
  // Pedidos
  pedidos: "Pedidos",
  ayudaPedidos: "Compras pagadas en línea con Stripe, con su cuestionario y sus fotos.",
  errorPedidos: "No se pudieron cargar los pedidos. Revisa que las tablas de pedidos estén creadas en Supabase.",
  sinPedidos: "Todavía no hay pedidos pagados.",
  enlacePrivado: "Enlace privado del cliente",
  enlaceAyuda: "Compártelo solo con este cliente (por ejemplo, por WhatsApp).",
  correoEnviado: "Correo con el enlace enviado",
  correoPendiente: "Correo no enviado: compártele el enlace tú.",
  cuestionario: "Cuestionario",
  sinCuestionario: "Aún no ha enviado el cuestionario.",
  fotosTitulo: "Fotos",
  sinFotos: "Aún no ha subido fotos.",
  estadosPedido: { pagado: "Pagado", en_proceso: "En proceso", entregado: "Entregado", reembolsado: "Reembolsado" },
  // Clientes
  ayudaClientes: "Se agrupan por teléfono a partir de las reservas.",
  errorClientes: "No se pudieron cargar los clientes. Revisa que las tablas de Supabase estén creadas.",
  sinClientes: "Todavía no hay clientes.",
  nombre: "Nombre",
  contacto: "Contacto",
  ultima: "Última",
  estados: {
    nueva: "Nueva",
    contactada: "Contactada",
    agendada: "Agendada",
    pagada: "Pagada",
    terminada: "Terminada",
    cancelada: "Cancelada",
  } satisfies Record<EstadoReserva, string>,
};

const en: typeof es = {
  tituloPestana: "Dashboard · Aura",
  cambiarIdioma: "Dashboard language",
  tituloEntrada: "Aura Dashboard",
  sinConexion: "The dashboard isn't connected to Supabase yet. The project keys are missing.",
  errorDatos: "The email or password is incorrect.",
  errorAcceso: "This account isn't allowed to access the dashboard.",
  correo: "Email",
  contrasena: "Password",
  entrar: "Sign in",
  reservas: "Bookings",
  clientes: "Clients",
  salir: "Sign out",
  filtrar: "Filter by status",
  todas: "All",
  errorReservas: "Bookings couldn't be loaded. Check that the Supabase tables exist.",
  sinReservas: "No bookings here yet.",
  mostrando: (n: number) => `Showing the ${n} most recent.`,
  servicio: "Service",
  coleccion: "Collection",
  mujer: "Women",
  hombre: "Men",
  espanol: "Spanish",
  ingles: "English",
  modalidad: "Format",
  fechaPreferida: "Preferred date",
  quiereCambiar: "Wants to change",
  estado: "Status",
  notas: "Internal notes",
  guardar: "Save",
  pedidos: "Orders",
  ayudaPedidos: "Purchases paid online with Stripe, with their questionnaire and photos.",
  errorPedidos: "Orders couldn't be loaded. Check that the order tables exist in Supabase.",
  sinPedidos: "No paid orders yet.",
  enlacePrivado: "Client's private link",
  enlaceAyuda: "Share it only with this client (for example, on WhatsApp).",
  correoEnviado: "Email with the link sent",
  correoPendiente: "Email not sent: share the link yourself.",
  cuestionario: "Questionnaire",
  sinCuestionario: "The questionnaire hasn't been sent yet.",
  fotosTitulo: "Photos",
  sinFotos: "No photos uploaded yet.",
  estadosPedido: { pagado: "Paid", en_proceso: "In progress", entregado: "Delivered", reembolsado: "Refunded" },
  ayudaClientes: "Grouped by phone number from their bookings.",
  errorClientes: "Clients couldn't be loaded. Check that the Supabase tables exist.",
  sinClientes: "No clients yet.",
  nombre: "Name",
  contacto: "Contact",
  ultima: "Latest",
  estados: {
    nueva: "New",
    contactada: "Contacted",
    agendada: "Scheduled",
    pagada: "Paid",
    terminada: "Completed",
    cancelada: "Cancelled",
  },
};

export const textosPanel = { es, en };

export async function textos() {
  const idioma = await idiomaPanel();
  return { idioma, t: textosPanel[idioma] };
}
