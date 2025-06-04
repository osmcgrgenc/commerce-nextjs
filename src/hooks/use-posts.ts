import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api';
import { Post } from '@/types';

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
} 