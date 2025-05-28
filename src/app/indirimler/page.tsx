'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DiscountCampaigns } from '@/components/discount-campaigns'
import { ProductCard } from '@/components/products/product-card'
import { getDiscountedProducts } from '@/lib/api'

// Bu veri normalde bir API'den gelecek
const discounts = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    image: '/images/products/kose-koltuk-1.jpg',
    href: '/urunler/modern-kose-koltuk',
    category: 'Oturma Grubu',
    endDate: '2024-03-31',
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
    category: 'Yatak Odası',
    endDate: '2024-03-31',
  },
  {
    id: 3,
    name: '3+2 Koltuk Takımı',
    price: 34999,
    originalPrice: 42999,
    discount: 19,
    image: '/images/products/3-2-koltuk.jpg',
    href: '/urunler/3-2-koltuk-takimi',
    category: 'Oturma Grubu',
    endDate: '2024-03-31',
  },
  {
    id: 4,
    name: 'Yemek Odası Takımı',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    image: '/images/products/yemek-odasi.jpg',
    href: '/urunler/yemek-odasi-takimi',
    category: 'Yemek Odası',
    endDate: '2024-03-31',
  },
]

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
  )
}

// İndirimli ürünler bölümü
async function DiscountedProductsSection() {
  const products = await getDiscountedProducts()

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">İndirimli Ürünler</h1>
        <p className="mt-2 text-gray-600">
          En iyi fırsatları kaçırmayın! Seçili ürünlerde %50&apos;ye varan indirimler
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default function DiscountsPage() {
  const [sortBy, setSortBy] = useState<'discount' | 'price'>('discount')

  const sortedDiscounts = [...discounts].sort((a, b) => {
    if (sortBy === 'discount') {
      return b.discount - a.discount
    }
    return a.price - b.price
  })

  return (
    <div className="bg-white">
      {/* Kampanyalar */}
      <DiscountCampaigns />

      {/* İndirimli Ürünler */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">İndirimli Ürünler</h1>
            <p className="mt-2 text-sm text-gray-500">
              En yüksek indirim oranına sahip ürünlerimizi keşfedin
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sırala:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'discount' | 'price')}
              className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="discount">İndirim Oranı</option>
              <option value="price">Fiyat</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedDiscounts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    %{product.discount} İndirim
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    }).format(product.price)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    }).format(product.originalPrice)}
                  </p>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                İndirim sona erme: {new Date(product.endDate).toLocaleDateString('tr-TR')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="py-8">
        <Suspense fallback={<ProductsSkeleton />}>
          <DiscountedProductsSection />
        </Suspense>
      </main>
    </div>
  )
} 