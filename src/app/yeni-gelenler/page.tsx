import { Suspense } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { getNewArrivals } from '@/lib/api';

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

// Yeni gelen ürünler bölümü
async function NewArrivalsSection() {
  const products = await getNewArrivals();

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Yeni Gelenler</h1>
        <p className="mt-2 text-gray-600">En yeni ve en trend ürünlerimizi keşfedin</p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}

// Ana sayfa bileşeni
export default function NewArrivalsPage() {
  return (
    <main className="py-8">
      <Suspense fallback={<ProductsSkeleton />}>
        <NewArrivalsSection />
      </Suspense>
    </main>
  );
}
