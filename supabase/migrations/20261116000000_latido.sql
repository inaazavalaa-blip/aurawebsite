-- Latido diario: una consulta mínima para que Supabase no pause el proyecto
-- gratuito por inactividad. No lee ni cambia ningún dato.

create function public.latido()
returns timestamptz
language sql
stable
security invoker
set search_path = ''
as $$
  select now();
$$;

revoke all on function public.latido() from public;
grant execute on function public.latido() to anon, authenticated;
