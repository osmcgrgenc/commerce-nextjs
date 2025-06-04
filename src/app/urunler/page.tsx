'use client';

import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/products/product-card';
import { ProductSkeleton } from '@/components/products/product-skeleton';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Ürünler yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Henüz ürün bulunmuyor
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Daha sonra tekrar kontrol edin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
