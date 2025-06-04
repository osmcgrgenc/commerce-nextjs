'use client';

import { useState, useEffect } from 'react';
import nhost from '@/lib/nhost/client';
import { ProductCard } from '@/components/products/product-card';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  image: string;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
}

export default function DiscountsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const { data, error: fetchError } = await nhost.graphql.request<{
          products: Product[];
        }>(`
          query GetDiscountedProducts {
            products(where: {discount_price: {_is_null: false}}) {
              id
              name
              description
              price
              discount_price
              image
              slug
              category {
                name
                slug
              }
            }
          }
        `);

        if (fetchError) throw fetchError;

        setProducts(
          data.products.map(product => ({
            ...product,
            discountPrice: product.discount_price,
          }))
        );
      } catch (err) {
        setError('Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              İndirimli Ürünler
            </h1>
            <p className="mt-4 text-base text-gray-500">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              İndirimli Ürünler
            </h1>
            <p className="mt-4 text-base text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            İndirimli Ürünler
          </h1>
          <p className="mt-4 text-base text-gray-500">
            {products.length} adet indirimli ürün bulundu
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </div>
    </div>
  );
}
