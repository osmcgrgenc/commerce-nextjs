'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="relative isolate">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          <Link
            href={`/blog/kategori/${post.category.slug}`}
            className="hover:text-gray-900"
          >
            {post.category.name}
          </Link>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-12 w-12">
            <Image
              src={post.author.image}
              alt={post.author.name}
              fill
              sizes="48px"
              className="rounded-full object-cover"
              loading="lazy"
              quality={75}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500">Yazar</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => {
              // TODO: Paylaşma işlemi
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 text-lg leading-8 text-gray-600">
          {post.content}
        </div>
      </div>
    </article>
  );
} 