import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '@/lib/nhost/queries';
import { Product } from '@/types';

export function useProduct(slug: string) {
  return useQuery<Product>({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  });
} 