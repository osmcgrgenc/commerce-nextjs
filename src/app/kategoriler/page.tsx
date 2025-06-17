'use client';

import { useCategories } from '@/hooks/use-categories';
import { CategoryCard } from '@/components/categories/category-card';
import { CategorySkeleton } from '@/components/categories/category-skeleton';

// Ana sayfa bileşeni
export default function CategoriesPage() {
  const { data: categoriesData, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Kategoriler yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!categoriesData?.length) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Henüz kategori bulunmuyor
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Daha sonra tekrar kontrol edin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categoriesData.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
