'use client'

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = memo(function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={category.href}
      className="group relative block overflow-hidden rounded-lg"
    >
      <div className="relative aspect-square">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
          loading="lazy"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-xl font-semibold text-white">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}); 