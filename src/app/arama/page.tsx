'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/product-filters';
import nhost from '@/lib/nhost/client';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
  category: string;
  color?: string;
  material?: string;
  style?: string;
}

interface Filter {
  id: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
    count: number;
  }>;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category');
        const color = searchParams.get('color');
        const material = searchParams.get('material');
        const style = searchParams.get('style');
        const sort = searchParams.get('sort') || 'newest';

        const { data, error } = await nhost.graphql.request<{
          products: Array<{
            id: string;
            name: string;
            price: number;
            images: Array<{ image_url: string; is_primary: boolean }>;
            category: { name: string; slug: string };
            color?: string;
            material?: string;
            style?: string;
          }>;
          filters: Array<{
            id: string;
            name: string;
            options: Array<{
              value: string;
              label: string;
              count: number;
            }>;
          }>;
        }>(
          `
          query SearchProducts(
            $query: String
            $category: String
            $color: String
            $material: String
            $style: String
            $sort: String
          ) {
            products(
              where: {
                _or: [
                  { name: { _ilike: $query } }
                  { description: { _ilike: $query } }
                ]
                category: { slug: { _eq: $category } }
                color: { _eq: $color }
                material: { _eq: $material }
                style: { _eq: $style }
              }
              order_by: {
                created_at: desc
                price: asc
                name: asc
              }
            ) {
              id
              name
              price
              images(where: { is_primary: { _eq: true } }) {
                image_url
              }
              category {
                name
                slug
              }
              color
              material
              style
            }
            filters {
              id
              name
              options {
                value
                label
                count
              }
            }
          }
        `,
          {
            query: query ? `%${query}%` : null,
            category,
            color,
            material,
            style,
            sort,
          }
        );

        if (error) throw error;

        setProducts(
          data.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.image_url || '/images/placeholder.jpg',
            href: `/urunler/${product.category.slug}/${product.id}`,
            category: product.category.name,
            color: product.color,
            material: product.material,
            style: product.style,
          }))
        );

        setFilters(data.filters);
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (isLoading) {
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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-24 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Arama Sonuçları</h1>
        <p className="mt-4 text-base text-gray-500">{products.length} ürün bulundu</p>
      </div>

      <div className="pb-24 pt-6 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
        <aside>
          <ProductFilters filters={filters} />
        </aside>

        <main className="mt-6 lg:col-span-3 lg:mt-0 xl:col-span-4">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
