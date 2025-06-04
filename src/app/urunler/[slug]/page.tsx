'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProduct } from '@/hooks/use-product';
import { useRelatedProducts } from '@/hooks/use-related-products';
import { ProductSkeleton } from '@/components/products/product-skeleton';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Share2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { data: product, isLoading, error } = useProduct(params.slug);
  const { data: relatedProducts } = useRelatedProducts(params.slug);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Ürün yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Ürün bulunamadı
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Aradığınız ürün mevcut değil veya kaldırılmış olabilir
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8">
        <div className="lg:col-span-1">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
              priority
              quality={90}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  selectedImage === index
                    ? 'ring-2 ring-indigo-500'
                    : 'ring-1 ring-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 25vw"
                  className="object-cover object-center"
                  loading="lazy"
                  quality={75}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 lg:col-span-1 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <div className="mt-3">
            <h2 className="sr-only">Ürün bilgileri</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Açıklama</h3>
            <div className="space-y-6 text-base text-gray-700">
              {product.description}
            </div>
          </div>

          <div className="mt-8 flex">
            <Button
              className="flex-1"
              onClick={() => {
                // TODO: Sepete ekleme işlemi
                toast.success('Ürün sepete eklendi');
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Sepete Ekle
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4"
              onClick={() => {
                // TODO: Paylaşma işlemi
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Benzer Ürünler
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
