'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition duration-300 group-hover:scale-105"
            loading="lazy"
            quality={85}
          />
        </Link>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          <Link
            href={`/blog/kategori/${post.category.slug}`}
            className="hover:text-gray-900"
          >
            {post.category.name}
          </Link>
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {post.description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-10 w-10">
          <Image
            src={post.author.image}
            alt={post.author.name}
            fill
            sizes="40px"
            className="rounded-full object-cover"
            loading="lazy"
            quality={75}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
          <p className="text-sm text-gray-500">Yazar</p>
        </div>
      </div>
    </div>
  );
} 