export const estadosReserva = ["nueva", "contactada", "agendada", "pagada", "terminada", "cancelada"] as const;
export type EstadoReserva = (typeof estadosReserva)[number];

export type Reserva = {
  id: string;
  creada: string;
  nombre: string;
  telefono: string;
  correo: string | null;
  categoria: "mujer" | "hombre";
  idioma: "es" | "en";
  servicio: string;
  modalidad: string | null;
  fecha_preferida: string | null;
  mensaje: string | null;
  estado: EstadoReserva;
  notas: string | null;
};

export type Cliente = {
  telefono: string;
  nombre: string;
  correo: string | null;
  total_reservas: number;
  ultima_reserva: string;
  ultimo_estado: EstadoReserva;
};

/** Deja el teléfono solo con dígitos y un + inicial opcional. */
export function normalizarTelefono(valor: string) {
  const limpio = valor.trim();
  return (limpio.startsWith("+") ? "+" : "") + limpio.replace(/\D/g, "");
}

export function fechaHora(iso: string, idioma: "es" | "en" = "es") {
  return new Intl.DateTimeFormat(idioma === "en" ? "en-US" : "es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(iso));
}
