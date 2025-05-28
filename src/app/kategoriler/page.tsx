import { Suspense } from 'react'
import { ProductCard } from '@/components/products/product-card'
import { getCategoryDetails } from '@/lib/api'

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

// Kategori detayları bölümü
async function CategoryDetailsSection({ slug }: { slug: string }) {
  const { category, products } = await getCategoryDetails(slug)

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="mt-2 text-gray-600">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

// Ana sayfa bileşeni
export default function CategoriesPage() {
  return (
    <main className="py-8">
      <Suspense fallback={<ProductsSkeleton />}>
        <CategoryDetailsSection slug="oturma-gruplari" />
      </Suspense>
    </main>
  )
} 