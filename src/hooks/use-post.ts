import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/nhost/queries';
import { Post } from '@/types';

export function usePost(slug: string) {
  return useQuery<Post>({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
  });
} 