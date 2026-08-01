-- Crie esta estrutura no SQL Editor do Supabase

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'morador' check (role in ('sindico', 'morador', 'porteiro', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'morador'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Syndicos and admins can manage all profiles"
  on public.profiles for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role in ('sindico', 'admin')
    )
  );

create policy "Syndicos and admins can update all profiles"
  on public.profiles for update
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role in ('sindico', 'admin')
    )
  );
