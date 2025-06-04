import { useQuery } from '@tanstack/react-query';
import { getCategoryBySlug } from '@/lib/nhost/queries';
import { Category } from '@/types';

export function useCategory(slug: string) {
  return useQuery<Category>({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
  });
} 