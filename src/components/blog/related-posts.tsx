'use client';

import { Post } from '@/types';
import { PostCard } from './post-card';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        İlgili Yazılar
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
} 