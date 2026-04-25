-- Run this in Supabase SQL Editor.

create table if not exists solnova_apps (
  id           text primary key,
  sort_order   int not null default 0,
  title        text not null default '',
  subtitle     text not null default '',
  description  text not null default '',
  question     text not null default '',
  url          text not null default '',
  tags         text[] not null default '{}',
  status       text not null default 'live' check (status in ('live','wip','archived')),
  year         int,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists solnova_apps_sort_order_idx
  on solnova_apps (sort_order asc, created_at asc);

-- Auto-bump updated_at on UPDATE.
create or replace function solnova_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists solnova_apps_touch on solnova_apps;
create trigger solnova_apps_touch
  before update on solnova_apps
  for each row execute function solnova_touch_updated_at();

-- Public site reads via the anon key. Writes go through the service role
-- (server-only), which bypasses RLS automatically.
alter table solnova_apps enable row level security;

drop policy if exists "public read" on solnova_apps;
create policy "public read" on solnova_apps for select using (true);
