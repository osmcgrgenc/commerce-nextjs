'use client';

import { useCategories } from '@/hooks/use-categories';
import { CategoryCard } from '@/components/categories/category-card';
import { CategorySkeleton } from '@/components/categories/category-skeleton';
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
  const { data: categoriesData, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Kategoriler yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!categoriesData?.length) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Henüz kategori bulunmuyor
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Daha sonra tekrar kontrol edin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categoriesData.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
