-- GO Along website: blog CMS + contact messages
-- Run once in Supabase → SQL Editor. Safe to re-run.

-- ---------------------------------------------------------------
-- Admins: emails allowed to manage the blog at /admin
-- ---------------------------------------------------------------
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins" on public.admins
  for select to authenticated using (public.is_admin());

-- ---------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  description text not null default '',
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_published_idx on public.posts (published, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  if new.published and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before insert or update on public.posts
  for each row execute function public.touch_updated_at();

alter table public.posts enable row level security;

drop policy if exists "public reads published posts" on public.posts;
create policy "public reads published posts" on public.posts
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "admins insert posts" on public.posts;
create policy "admins insert posts" on public.posts
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update posts" on public.posts;
create policy "admins update posts" on public.posts
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete posts" on public.posts;
create policy "admins delete posts" on public.posts
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------
-- Contact form messages (backup copy of every email sent)
-- ---------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  topic text,
  message text not null,
  emailed boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;

drop policy if exists "anyone submits contact" on public.contact_messages;
create policy "anyone submits contact" on public.contact_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "admins read contact" on public.contact_messages;
create policy "admins read contact" on public.contact_messages
  for select to authenticated using (public.is_admin());

drop policy if exists "admins delete contact" on public.contact_messages;
create policy "admins delete contact" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------
-- Storage bucket for blog images (public read, admin write)
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do update set public = true;

drop policy if exists "public reads blog images" on storage.objects;
create policy "public reads blog images" on storage.objects
  for select to anon, authenticated using (bucket_id = 'blog');

drop policy if exists "admins upload blog images" on storage.objects;
create policy "admins upload blog images" on storage.objects
  for insert to authenticated with check (bucket_id = 'blog' and public.is_admin());

drop policy if exists "admins update blog images" on storage.objects;
create policy "admins update blog images" on storage.objects
  for update to authenticated using (bucket_id = 'blog' and public.is_admin());

drop policy if exists "admins delete blog images" on storage.objects;
create policy "admins delete blog images" on storage.objects
  for delete to authenticated using (bucket_id = 'blog' and public.is_admin());

-- ---------------------------------------------------------------
-- First admin: replace with the email you created in Authentication → Users
-- ---------------------------------------------------------------
-- insert into public.admins (email) values ('info@goalong.co.th') on conflict do nothing;
