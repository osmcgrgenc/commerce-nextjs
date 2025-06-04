'use client';

import { usePosts } from '@/hooks/use-posts';
import { PostCard } from '@/components/blog/post-card';
import { PostSkeleton } from '@/components/blog/post-skeleton';

export default function BlogPage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          Blog yazıları yüklenirken bir hata oluştu
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Lütfen daha sonra tekrar deneyin
        </p>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Henüz blog yazısı bulunmuyor
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Daha sonra tekrar kontrol edin
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
