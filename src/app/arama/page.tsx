'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { ProductCard } from '@/components/product-card'

// Bu veri normalde bir API'den gelecek
const products = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk.jpg',
    href: '/urunler/modern-kose-koltuk',
    category: 'Oturma Grubu',
  },
  {
    id: 2,
    name: '3+2 Koltuk Takımı',
    price: 34999,
    image: '/images/products/3-2-koltuk.jpg',
    href: '/urunler/3-2-koltuk-takimi',
    category: 'Oturma Grubu',
  },
  {
    id: 3,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
    category: 'Yatak Odası',
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

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'oturma-grubu', name: 'Oturma Grubu' },
  { id: 'yatak-odasi', name: 'Yatak Odası' },
  { id: 'yemek-odasi', name: 'Yemek Odası' },
]

const sortOptions = [
  { id: 'newest', name: 'En Yeniler' },
  { id: 'price-asc', name: 'Fiyat (Düşükten Yükseğe)' },
  { id: 'price-desc', name: 'Fiyat (Yüksekten Düşüğe)' },
  { id: 'name-asc', name: 'İsim (A-Z)' },
  { id: 'name-desc', name: 'İsim (Z-A)' },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('newest')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada normalde URL'i güncelleriz
    console.log('Arama:', searchQuery)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Arama Formu */}
          <form onSubmit={handleSearch} className="relative mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          {/* Filtreler ve Sıralama */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Kategori Filtresi */}
            <div className="flex items-center gap-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Kategori:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sıralama */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sırala:
              </label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Fiyat Aralığı:</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
                className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Sonuçlar */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {filteredProducts.length} ürün bulundu
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 