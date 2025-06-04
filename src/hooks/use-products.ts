import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, getProductBySlug } from '@/lib/nhost/queries';
import { createProduct, updateProduct, deleteProduct } from '@/lib/nhost/mutations';
import type { Product } from '@/lib/nhost/types';
import { getProducts as getProductsApi } from '@/lib/api';

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProductsApi,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) => 
      updateProduct(id, product),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
} 