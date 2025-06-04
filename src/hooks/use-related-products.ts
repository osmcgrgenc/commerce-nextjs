import { useQuery } from '@tanstack/react-query';
import { getRelatedProducts } from '@/lib/nhost/queries';
import { Product } from '@/types';

export function useRelatedProducts(slug: string) {
  return useQuery<Product[]>({
    queryKey: ['related-products', slug],
    queryFn: () => getRelatedProducts(slug),
  });
} 