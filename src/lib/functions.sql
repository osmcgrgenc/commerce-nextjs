-- Auth fonksiyonları
create or replace function public.get_user_id()
returns uuid
language sql stable
as $$
  select
    coalesce(
      current_setting('request.jwt.claim.sub', true),
      (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
    )::uuid
$$; 