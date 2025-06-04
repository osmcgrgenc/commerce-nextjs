'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/kategoriler/${category.slug}`}
      className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
    >
      <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:opacity-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <h3 className="text-2xl font-bold">{category.name}</h3>
        <p className="mt-2 text-sm">{category.description}</p>
      </div>
    </Link>
  );
} 