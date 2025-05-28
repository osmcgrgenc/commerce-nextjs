'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/products/product-card'

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
]

const sortOptions = [
  { name: 'En Yeniler', value: 'newest' },
  { name: 'Fiyat (Düşükten Yükseğe)', value: 'price-asc' },
  { name: 'Fiyat (Yüksekten Düşüğe)', value: 'price-desc' },
  { name: 'İsim (A-Z)', value: 'name-asc' },
  { name: 'İsim (Z-A)', value: 'name-desc' },
]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('newest');
  console.log(params);
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Kategori bulunamadı</h1>
          <p className="mt-4">
            <Link href="/kategoriler" className="text-indigo-600 hover:text-indigo-500">
              Tüm kategorilere dön
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const sortedProducts = [...category.products].sort((a, b) => {
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Kategori Başlığı */}
      <div className="relative h-[300px] overflow-hidden rounded-lg">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg">{category.description}</p>
        </div>
      </div>

      {/* Sıralama ve Filtreler */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sırala:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}