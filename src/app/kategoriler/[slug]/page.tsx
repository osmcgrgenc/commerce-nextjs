'use client';

import { useCategory } from '@/hooks/use-category';
import { useCategoryProducts } from '@/hooks/use-category-products';
import { CategorySkeleton } from '@/components/categories/category-skeleton';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';

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

export default function CategoryPage({ params }: CategoryPageProps) {
  const { data: category, isLoading, error } = useCategory(params.slug);
  const { data: products } = useCategoryProducts(params.slug);

  if (isLoading) {
    return <CategorySkeleton />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Kategori yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Kategori bulunamadı
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Aradığınız kategori mevcut değil veya kaldırılmış olabilir
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {category.name}
          </h1>
          <p className="mt-2 text-sm text-gray-600">{category.description}</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/kategoriler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Kategoriler
          </Link>
        </Button>
      </div>

      {products && products.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Bu kategoride henüz ürün bulunmuyor
          </p>
        </div>
      )}
    </div>
  );
}
