'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Share2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/urunler/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition duration-300 group-hover:scale-105"
            loading="lazy"
            quality={85}
          />
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link href={`/urunler/${product.slug}`}>
            <span className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-2 text-lg font-medium text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => {
            // TODO: Sepete ekleme işlemi
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Sepete Ekle
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            // TODO: Paylaşma işlemi
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 