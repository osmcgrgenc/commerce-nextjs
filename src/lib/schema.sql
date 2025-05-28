-- Kullanıcılar tablosu (Nhost auth.users ile senkronize)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  postal_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Kategoriler tablosu
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  parent_id uuid references public.categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ürünler tablosu
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price decimal(10,2) not null,
  discount_price decimal(10,2),
  stock_quantity integer not null default 0,
  category_id uuid references public.categories(id) not null,
  is_featured boolean default false,
  is_new boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ürün görselleri tablosu
create table public.product_images (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ürün varyantları tablosu
create table public.product_variants (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  name text not null,
  price_adjustment decimal(10,2) default 0,
  stock_quantity integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Siparişler tablosu
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text not null default 'pending',
  total_amount decimal(10,2) not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal_code text not null,
  shipping_phone text not null,
  payment_method text not null,
  payment_status text not null default 'pending',
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sipariş detayları tablosu
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  variant_id uuid references public.product_variants(id),
  quantity integer not null,
  unit_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- İade talepleri tablosu
create table public.return_requests (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) not null,
  user_id uuid references public.profiles(id) not null,
  reason text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- İade detayları tablosu
create table public.return_items (
  id uuid default gen_random_uuid() primary key,
  return_request_id uuid references public.return_requests(id) on delete cascade not null,
  order_item_id uuid references public.order_items(id) not null,
  quantity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Politikaları
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.return_requests enable row level security;
alter table public.return_items enable row level security;

-- Profiller için politikalar
create policy "Profiller herkese açık"
  on public.profiles for select
  using (true);

create policy "Kullanıcılar kendi profillerini düzenleyebilir"
  on public.profiles for update
  using (public.get_user_id() = id);

-- Kategoriler için politikalar
create policy "Kategoriler herkese açık"
  on public.categories for select
  using (true);

-- Ürünler için politikalar
create policy "Ürünler herkese açık"
  on public.products for select
  using (true);

-- Siparişler için politikalar
create policy "Kullanıcılar kendi siparişlerini görebilir"
  on public.orders for select
  using (public.get_user_id() = user_id);

create policy "Kullanıcılar sipariş oluşturabilir"
  on public.orders for insert
  with check (public.get_user_id() = user_id);

-- İade talepleri için politikalar
create policy "Kullanıcılar kendi iade taleplerini görebilir"
  on public.return_requests for select
  using (public.get_user_id() = user_id);

create policy "Kullanıcılar iade talebi oluşturabilir"
  on public.return_requests for insert
  with check (public.get_user_id() = user_id);

-- Trigger fonksiyonları
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Updated at trigger'ları
create trigger handle_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.categories
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.products
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.product_variants
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.orders
  for each row
  execute procedure public.handle_updated_at();

create trigger handle_updated_at
  before update on public.return_requests
  for each row
  execute procedure public.handle_updated_at(); 