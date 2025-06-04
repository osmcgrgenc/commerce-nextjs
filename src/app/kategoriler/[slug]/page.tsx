'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/products/product-card';
import { VirtualizedProductList } from '@/components/products/virtualized-product-list';
import { getCategoryDetails } from '@/lib/api';
import { generateMetadata } from '@/lib/metadata';

const categories = [
  {
    id: 1,
    name: 'Oturma Grupları',
    slug: 'oturma-gruplari',
    description: 'Modern ve konforlu oturma grupları',
    image: '/images/categories/oturma-gruplari.jpg',
    products: [
      {
        id: 1,
        name: 'Modern Köşe Koltuk',
        price: 24999,
        image: '/images/products/kose-koltuk.jpg',
        href: '/urunler/modern-kose-koltuk',
        category: 'Oturma Grupları',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 2,
        name: '3+2 Koltuk Takımı',
        price: 34999,
        image: '/images/products/3-2-koltuk.jpg',
        href: '/urunler/3-2-koltuk-takimi',
        category: 'Oturma Grupları',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 3,
        name: '2+1 Koltuk Takımı',
        price: 29999,
        image: '/images/products/2-1-koltuk.jpg',
        href: '/urunler/2-1-koltuk-takimi',
        category: 'Oturma Grupları',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 4,
        name: 'Kanepe',
        price: 19999,
        image: '/images/products/kanepe.jpg',
        href: '/urunler/kanepe',
        category: 'Oturma Grupları',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
    ],
  },
  {
    id: 2,
    name: 'Yatak Odası',
    slug: 'yatak-odasi',
    description: 'Şık ve konforlu yatak odası takımları',
    image: '/images/categories/yatak-odasi.jpg',
    products: [
      {
        id: 5,
        name: 'Yatak Odası Takımı',
        price: 34999,
        image: '/images/products/yatak-odasi.jpg',
        href: '/urunler/yatak-odasi-takimi',
        category: 'Yatak Odası',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 6,
        name: 'Gardırop',
        price: 14999,
        image: '/images/products/gardolap.jpg',
        href: '/urunler/gardolap',
        category: 'Yatak Odası',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 7,
        name: 'Yatak',
        price: 9999,
        image: '/images/products/yatak.jpg',
        href: '/urunler/yatak',
        category: 'Yatak Odası',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
      {
        id: 8,
        name: 'Gece Lambası',
        price: 1999,
        image: '/images/products/gece-lambasi.jpg',
        href: '/urunler/gece-lambasi',
        category: 'Yatak Odası',
        arrivalDate: '2025-01-01',
        stock: 10,
      },
    ],
  },
  // Diğer kategoriler...
];

const sortOptions = [
  { name: 'En Yeniler', value: 'newest' },
  { name: 'Fiyat (Düşükten Yükseğe)', value: 'price-asc' },
  { name: 'Fiyat (Yüksekten Düşüğe)', value: 'price-desc' },
  { name: 'İsim (A-Z)', value: 'name-asc' },
  { name: 'İsim (Z-A)', value: 'name-desc' },
];

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

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

// Ürün listesi bileşeni
async function ProductList({ slug, sortBy }: { slug: string; sortBy: string }) {
  const { category, products } = await getCategoryDetails(slug);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="mt-8">
      <VirtualizedProductList
        products={sortedProducts}
        width={1200}
        height={800}
        columnCount={4}
        columnWidth={300}
        rowHeight={400}
      />
    </div>
  );
}

// Kategori başlığı bileşeni
async function CategoryHeader({ slug }: { slug: string }) {
  const { category } = await getCategoryDetails(slug);

  return (
    <div className="relative h-[300px] overflow-hidden rounded-lg">
      <Image src={category.image} alt={category.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-lg">{category.description}</p>
      </div>
    </div>
  );
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sort?: string };
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList slug={params.slug} sortBy={searchParams.sort || 'default'} />
      </Suspense>
    </main>
  );
}
