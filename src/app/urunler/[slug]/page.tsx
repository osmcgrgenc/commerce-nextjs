'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ProductReviews } from '@/components/product-reviews';
import nhost from '@/lib/nhost/client';
import { generateMetadata } from '@/lib/metadata';
import { getProduct } from '@/lib/api';

interface ProductImage {
  image_url: string;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  name: string;
  price_adjustment: number;
  stock_quantity: number;
}

interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  reviews: ProductReview[];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return generateMetadata({
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız ürün bulunamadı.',
    });
  }

  return generateMetadata({
    title: product.name,
    description: product.description,
    image: product.image,
    url: `https://www.limandesign.com/urunler/${params.slug}`,
  });
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await nhost.graphql.request<{ products: Product[] }>(
          `
          query GetProduct($slug: String!) {
            products(where: {slug: {_eq: $slug}}) {
              id
              name
              price
              description
              images {
                image_url
                is_primary
              }
              features
              dimensions
              colors
              stock_quantity
              reviews {
                average_rating
                total_reviews
                items {
                  id
                  user {
                    name
                    avatar_url
                  }
                  rating
                  created_at
                  title
                  comment
                  likes
                  dislikes
                  is_verified
                }
              }
              variants {
                id
                name
                price_adjustment
                stock_quantity
              }
            }
          }
        `,
          { slug: params.slug }
        );

        if (error) throw error;
        if (!data.products[0]) throw new Error('Ürün bulunamadı');

        setProduct(data.products[0]);
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="aspect-square rounded-lg bg-gray-200" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-red-500">{error || 'Ürün bulunamadı'}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Ürün Görselleri */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <div className="relative h-96 w-full">
              <Image
                src={
                  product.images.find(img => img.is_primary)?.image_url ||
                  product.images[0]?.image_url ||
                  '/images/placeholder.jpg'
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map(image => (
              <button
                key={image.image_url}
                onClick={() => {
                  // Implement the logic to change the selected image
                }}
                className={`relative h-24 w-24 overflow-hidden rounded-lg ${
                  image.is_primary ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={`${product.name} - ${image.is_primary ? 'Primary' : 'Secondary'}`}
                  fill
                  sizes="96px"
                  className="object-cover object-center"
                  loading="lazy"
                  quality={75}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Ürün bilgileri</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price} TL</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Açıklama</h3>
            <div className="space-y-6 text-base text-gray-700">{product.description}</div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map(rating => (
                  <svg
                    key={rating}
                    className={`h-5 w-5 flex-shrink-0 ${
                      rating < product.reviews.average_rating ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-700">
                {product.reviews.total_reviews} değerlendirme
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Ücretsiz Kargo</span>
              </div>
              <div className="ml-4 flex items-center">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">2 Yıl Garanti</span>
              </div>
              <div className="ml-4 flex items-center">
                <RefreshCw className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">14 Gün İade</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Renk</h3>
            </div>

            <div className="mt-4">
              <div className="flex items-center space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                  >
                    <span className="sr-only">{color}</span>
                    <span
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sepete Ekle
            </button>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Heart className="h-5 w-5 text-gray-400" />
              <span className="ml-2">Favorilere Ekle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ürün Detayları */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ürün Özellikleri</h3>
          <div className="mt-4 space-y-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">Boyutlar</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Genişlik</p>
              <p className="mt-1 text-base text-gray-900">{product.dimensions.width}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Derinlik</p>
              <p className="mt-1 text-base text-gray-900">{product.dimensions.depth}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Yükseklik</p>
              <p className="mt-1 text-base text-gray-900">{product.dimensions.height}</p>
            </div>
          </div>
        </div>

        {/* Ürün Yorumları */}
        <div className="border-t border-gray-200 pt-10">
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
}
