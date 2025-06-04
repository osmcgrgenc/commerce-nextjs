import { Suspense } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { getCategoryDetails } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = generateMetadata({
  title: 'Kategoriler',
  description:
    'Liman Design ürün kategorileri. Mobilya, dekorasyon, aydınlatma ve daha fazlası. Her tarza uygun ürünler ve çözümler.',
  image: '/images/categories-og.jpg',
});

// Yükleme durumu için bileşen
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Ürün kartı render fonksiyonu
function renderProductCard(product: any) {
  return (
    <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      href={product.href}
      category={product.category}
      stock={product.stock}
      isNew={product.isNew}
      arrivalDate={product.arrivalDate || ''}
      variants={product.variants}
    />
  );
}

// Kategori detayları bölümü
async function CategoryDetailsSection({ slug }: { slug: string }) {
  const { category, products } = await getCategoryDetails(slug);

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="mt-2 text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => renderProductCard(product))}
      </div>
    </section>
  );
}

// Bu veri normalde bir API'den gelecek
const categories = [
  {
    id: 1,
    name: 'Oturma Odası',
    description: 'Modern ve konforlu oturma odası mobilyaları',
    image: '/images/categories/oturma-odasi.jpg',
  },
  {
    id: 2,
    name: 'Yatak Odası',
    description: 'Huzurlu bir uyku için yatak odası takımları',
    image: '/images/categories/yatak-odasi.jpg',
  },
  {
    id: 3,
    name: 'Yemek Odası',
    description: 'Şık ve kullanışlı yemek odası takımları',
    image: '/images/categories/yemek-odasi.jpg',
  },
  {
    id: 4,
    name: 'Mutfak',
    description: 'Modern mutfak mobilyaları ve aksesuarları',
    image: '/images/categories/mutfak.jpg',
  },
  {
    id: 5,
    name: 'Çocuk Odası',
    description: 'Çocuklarınız için özel tasarlanmış mobilyalar',
    image: '/images/categories/cocuk-odasi.jpg',
  },
  {
    id: 6,
    name: 'Ofis',
    description: 'Profesyonel ofis mobilyaları',
    image: '/images/categories/ofis.jpg',
  },
];

// Ana sayfa bileşeni
export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Kategoriler</h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          İhtiyacınıza uygun kategorileri keşfedin
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {categories.map(category => (
          <article key={category.id} className="flex flex-col items-start">
            <div className="relative w-full">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 text-xs">
                <Link
                  href={`/kategoriler/${category.id}`}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Link href={`/kategoriler/${category.id}`}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
