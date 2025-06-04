import { useQuery } from '@tanstack/react-query';
import { getRelatedPosts } from '@/lib/nhost/queries';
import { Post } from '@/types';

export function useRelatedPosts(slug: string) {
  return useQuery<Post[]>({
    queryKey: ['related-posts', slug],
    queryFn: () => getRelatedPosts(slug),
  });
} 