-- Reservas y clientes de Aura.
-- Seguridad: el público solo puede CREAR una solicitud; nunca leerla.
-- Solo las cuentas de la tabla "administradores" pueden ver y actualizar reservas.

create table public.administradores (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.administradores enable row level security;

create policy "cada cuenta ve solo su propia fila"
  on public.administradores for select to authenticated
  using (user_id = auth.uid());

create function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.administradores where user_id = auth.uid());
$$;

create table public.reservas (
  id uuid primary key default gen_random_uuid(),
  creada timestamptz not null default now(),
  nombre text not null check (char_length(nombre) between 1 and 120),
  telefono text not null check (telefono ~ '^\+?[0-9]{7,20}$'),
  correo text check (correo is null or char_length(correo) <= 200),
  categoria text not null check (categoria in ('mujer', 'hombre')),
  idioma text not null check (idioma in ('es', 'en')),
  servicio text not null check (char_length(servicio) between 1 and 120),
  modalidad text check (modalidad is null or char_length(modalidad) <= 60),
  fecha_preferida date,
  mensaje text check (mensaje is null or char_length(mensaje) <= 2000),
  consentimiento boolean not null check (consentimiento),
  estado text not null default 'nueva'
    check (estado in ('nueva', 'contactada', 'agendada', 'pagada', 'terminada', 'cancelada')),
  notas text check (notas is null or char_length(notas) <= 5000)
);

create index reservas_creada_idx on public.reservas (creada desc);
create index reservas_telefono_idx on public.reservas (telefono);

alter table public.reservas enable row level security;

create policy "el público puede enviar una solicitud nueva"
  on public.reservas for insert to anon
  with check (estado = 'nueva' and notas is null);

create policy "administradores ven reservas"
  on public.reservas for select to authenticated
  using (public.es_admin());

create policy "administradores actualizan reservas"
  on public.reservas for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());

-- Permisos mínimos. El público no puede leer, modificar ni borrar.
revoke all on public.reservas from anon, authenticated;
revoke all on public.administradores from anon, authenticated;
grant insert (nombre, telefono, correo, categoria, idioma, servicio, modalidad, fecha_preferida, mensaje, consentimiento)
  on public.reservas to anon;
grant select on public.reservas to authenticated;
grant update (estado, notas) on public.reservas to authenticated;
grant select on public.administradores to authenticated;
revoke all on function public.es_admin() from public, anon;
grant execute on function public.es_admin() to authenticated;

-- Clientes: una fila por teléfono. Respeta los permisos de quien consulta.
create view public.clientes
with (security_invoker = true)
as
select
  telefono,
  (array_agg(nombre order by creada desc))[1] as nombre,
  (array_agg(correo order by creada desc) filter (where correo is not null))[1] as correo,
  count(*)::int as total_reservas,
  max(creada) as ultima_reserva,
  (array_agg(estado order by creada desc))[1] as ultimo_estado
from public.reservas
group by telefono;

revoke all on public.clientes from anon, authenticated;
grant select on public.clientes to authenticated;
