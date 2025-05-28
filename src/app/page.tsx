import { Suspense } from 'react'
import { ProductCard } from '@/components/products/product-card'
import { CategoryCard } from '@/components/category-card'
import { HeroSlider } from '@/components/hero-slider'
import { getCategories, getFeaturedProducts, getBanners } from '@/lib/api'

// Yükleme durumu için bileşenler
function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-gray-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
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

// Kategoriler bölümü
async function CategoriesSection() {
  const categories = await getCategories()

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold">Kategoriler</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

// Öne çıkan ürünler bölümü
async function FeaturedProductsSection() {
  const products = await getFeaturedProducts()

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold">Öne Çıkan Ürünler</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            priority={product.id <= 4} // İlk 4 ürün için priority true
          />
        ))}
      </div>
    </section>
  )
}

// Ana sayfa bileşeni
export default async function HomePage() {
  const banners = await getBanners()

  return (
    <main>
      <HeroSlider banners={banners} />
      <div className="space-y-16 py-8">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesSection />
        </Suspense>

        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProductsSection />
        </Suspense>
      </div>
    </main>
  )
}
