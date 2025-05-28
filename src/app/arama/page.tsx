'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'

// Bu veri normalde bir API'den gelecek
const products = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk-1.jpg',
    href: '/urunler/modern-kose-koltuk',
    category: 'Oturma Grubu',
    color: 'Bej',
    material: 'Kumaş',
    style: 'Modern',
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
    category: 'Yatak Odası',
    color: 'Beyaz',
    material: 'MDF',
    style: 'Klasik',
  },
  {
    id: 3,
    name: '3+2 Koltuk Takımı',
    price: 34999,
    image: '/images/products/3-2-koltuk.jpg',
    href: '/urunler/3-2-koltuk-takimi',
    category: 'Oturma Grubu',
  },
  {
    id: 4,
    name: 'Yemek Odası Takımı',
    price: 24999,
    image: '/images/products/yemek-odasi.jpg',
    href: '/urunler/yemek-odasi-takimi',
    category: 'Yemek Odası',
  },
]

const filters = [
  {
    id: 'category',
    name: 'Kategori',
    options: [
      { value: 'oturma-grubu', label: 'Oturma Grubu', count: 12 },
      { value: 'yatak-odasi', label: 'Yatak Odası', count: 8 },
      { value: 'yemek-odasi', label: 'Yemek Odası', count: 6 },
      { value: 'cocuk-odasi', label: 'Çocuk Odası', count: 4 },
    ],
  },
  {
    id: 'color',
    name: 'Renk',
    options: [
      { value: 'bej', label: 'Bej', count: 8 },
      { value: 'beyaz', label: 'Beyaz', count: 6 },
      { value: 'gri', label: 'Gri', count: 4 },
      { value: 'lacivert', label: 'Lacivert', count: 2 },
    ],
  },
  {
    id: 'material',
    name: 'Materyal',
    options: [
      { value: 'kumas', label: 'Kumaş', count: 10 },
      { value: 'mdf', label: 'MDF', count: 8 },
      { value: 'metal', label: 'Metal', count: 4 },
      { value: 'cam', label: 'Cam', count: 2 },
    ],
  },
  {
    id: 'style',
    name: 'Stil',
    options: [
      { value: 'modern', label: 'Modern', count: 12 },
      { value: 'klasik', label: 'Klasik', count: 8 },
      { value: 'minimal', label: 'Minimal', count: 6 },
      { value: 'rustik', label: 'Rustik', count: 4 },
    ],
  },
]

const sortOptions = [
  { value: 'newest', label: 'En Yeniler' },
  { value: 'price-asc', label: 'Fiyat (Düşükten Yükseğe)' },
  { value: 'price-desc', label: 'Fiyat (Yüksekten Düşüğe)' },
  { value: 'name-asc', label: 'İsim (A-Z)' },
  { value: 'name-desc', label: 'İsim (Z-A)' },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value)
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let result = [...products]

    // Arama filtresi
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Kategori ve diğer filtreler
    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      if (values.length > 0) {
        result = result.filter((product) => {
          const productValue = product[filterId as keyof typeof product]?.toString().toLowerCase()
          return values.some((value) => productValue === value.toLowerCase())
        })
      }
    })

    // Sıralama
    switch (selectedSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
      default:
        // Varsayılan sıralama (en yeniler)
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedFilters, selectedSort])

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters)
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ürünler</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchQuery('')}
                >
                  <span className="sr-only">Aramayı temizle</span>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-24 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
          {/* Filtreler */}
          <div className="hidden lg:block">
            <ProductFilters
              filters={filters}
              sortOptions={sortOptions}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Ürün Listesi */}
          <div className="mt-6 lg:col-span-3 lg:mt-0 xl:col-span-4">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Ürün bulunamadı</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı filtreler deneyin.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 