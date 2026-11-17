-- Pedidos pagados con Stripe, cuestionario y fotos del área privada del cliente.
-- Seguridad:
--   * El público (anon) no puede leer ni escribir nada de esto.
--   * Solo el servidor del sitio (clave secreta) registra pedidos confirmados por Stripe
--     y guarda el cuestionario después de comprobar el enlace privado.
--   * Las cuentas de "administradores" pueden ver pedidos y fotos, y escribir notas.

create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  creado timestamptz not null default now(),
  stripe_sesion text not null unique,
  -- Huella (sha-256) del enlace privado. El enlace en sí nunca se guarda.
  token_hash text not null unique,
  paquete text not null check (paquete in ('transformacion', 'vip')),
  paquete_nombre text not null,
  categoria text not null check (categoria in ('mujer', 'hombre')),
  idioma text not null check (idioma in ('es', 'en')),
  moneda text not null check (moneda in ('usd', 'mxn')),
  monto integer not null check (monto > 0),
  nombre text check (nombre is null or char_length(nombre) <= 200),
  correo text check (correo is null or char_length(correo) <= 200),
  telefono text check (telefono is null or char_length(telefono) <= 40),
  correo_enviado timestamptz,
  cuestionario jsonb,
  cuestionario_enviado timestamptz,
  estado text not null default 'pagado'
    check (estado in ('pagado', 'en_proceso', 'entregado', 'reembolsado')),
  notas text check (notas is null or char_length(notas) <= 5000)
);

create index pedidos_creado_idx on public.pedidos (creado desc);

alter table public.pedidos enable row level security;

create policy "administradores ven pedidos"
  on public.pedidos for select to authenticated
  using (public.es_admin());

create policy "administradores actualizan pedidos"
  on public.pedidos for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());

revoke all on public.pedidos from anon, authenticated;
grant select on public.pedidos to authenticated;
grant update (estado, notas) on public.pedidos to authenticated;

-- Fotos: carpeta privada, una subcarpeta por pedido. Solo imágenes de hasta 10 MB.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos-clientes', 'fotos-clientes', false, 10485760,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

create policy "administradores ven fotos de clientes"
  on storage.objects for select to authenticated
  using (bucket_id = 'fotos-clientes' and public.es_admin());
