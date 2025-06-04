'use client';

import Image from 'next/image';
import { memo } from 'react';

interface ProductImageProps {
  image: string;
  name: string;
  isNew?: boolean;
}

export const ProductImage = memo(function ProductImage({ image, name, isNew }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        quality={85}
        priority={false}
      />
      {isNew && (
        <div className="absolute left-2 top-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
          Yeni
        </div>
      )}
    </div>
  );
});
