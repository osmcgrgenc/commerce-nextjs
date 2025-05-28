import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { CategoryCard } from '@/components/category-card';

const categories = [
  {
    id: 1,
    name: 'Oturma Grupları',
    image: '/images/categories/oturma-gruplari.jpg',
    href: '/kategoriler/oturma-gruplari',
  },
  {
    id: 2,
    name: 'Yatak Odası',
    image: '/images/categories/yatak-odasi.jpg',
    href: '/kategoriler/yatak-odasi',
  },
  {
    id: 3,
    name: 'Yemek Odası',
    image: '/images/categories/yemek-odasi.jpg',
    href: '/kategoriler/yemek-odasi',
  },
  {
    id: 4,
    name: 'Çalışma Odası',
    image: '/images/categories/calisma-odasi.jpg',
    href: '/kategoriler/calisma-odasi',
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk.jpg',
    href: '/urunler/modern-kose-koltuk',
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
  },
  {
    id: 3,
    name: 'Yemek Odası Takımı',
    price: 29999,
    image: '/images/products/yemek-odasi.jpg',
    href: '/urunler/yemek-odasi-takimi',
  },
  {
    id: 4,
    name: 'Çalışma Masası',
    price: 8999,
    image: '/images/products/calisma-masasi.jpg',
    href: '/urunler/calisma-masasi',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Liman Design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Modern ve Şık Mobilyalar
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl">
            Evinizi güzelleştirmek için en kaliteli ve şık mobilyalar
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/kategoriler"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
            >
              Koleksiyonu Keşfet
            </Link>
            <Link
              href="/hakkimizda"
              className="rounded-md bg-transparent px-6 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-white/10"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">Kategoriler</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
