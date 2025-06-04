import { useQuery } from '@tanstack/react-query';
import { getCategoryProducts } from '@/lib/nhost/queries';
import { Product } from '@/types';

export function useCategoryProducts(slug: string) {
  return useQuery<Product[]>({
    queryKey: ['category-products', slug],
    queryFn: () => getCategoryProducts(slug),
  });
} 