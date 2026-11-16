/** Se muestra al instante mientras carga una sección del panel. */
export default function Cargando() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="h-14 w-64 rounded-xl bg-papel-2" />
      <div className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-10 w-24 rounded-full bg-papel-2" />
        ))}
      </div>
      <div className="mt-8 h-48 rounded-[1.5rem] bg-papel-2" />
    </div>
  );
}
