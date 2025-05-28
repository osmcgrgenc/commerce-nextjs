import Image from 'next/image'
import Link from 'next/link'
import { CategoryCard } from '@/components/category-card'

// Bu veri normalde bir API'den gelecek
const categories = [
  {
    id: 1,
    name: 'Oturma Grupları',
    image: '/images/categories/oturma-gruplari.jpg',
    href: '/kategoriler/oturma-gruplari',
    description: 'Modern ve konforlu oturma grupları',
  },
  {
    id: 2,
    name: 'Yatak Odası',
    image: '/images/categories/yatak-odasi.jpg',
    href: '/kategoriler/yatak-odasi',
    description: 'Şık ve konforlu yatak odası takımları',
  },
  {
    id: 3,
    name: 'Yemek Odası',
    image: '/images/categories/yemek-odasi.jpg',
    href: '/kategoriler/yemek-odasi',
    description: 'Modern yemek odası takımları',
  },
  {
    id: 4,
    name: 'Çalışma Odası',
    image: '/images/categories/calisma-odasi.jpg',
    href: '/kategoriler/calisma-odasi',
    description: 'Fonksiyonel çalışma odası mobilyaları',
  },
]

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden rounded-lg">
        <Image
          src="/images/categories/hero.jpg"
          alt="Kategoriler"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Kategoriler
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl">
            Her zevke uygun geniş ürün yelpazemizle sizlere hizmet veriyoruz
          </p>
        </div>
      </div>

      {/* Kategoriler Grid */}
      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
} 