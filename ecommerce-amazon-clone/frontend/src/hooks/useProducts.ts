import { useQuery, useMutation } from '@tanstack/react-query';
import { productAPI } from '../utils/apiService';
import toast from 'react-hot-toast';

export const useProducts = (params: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productAPI.getProducts(params),
    staleTime: 5 * 60 * 1000
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: any) => productAPI.createProduct(data),
    onSuccess: () => {
      toast.success('Product created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create product');
    }
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: ({ id, data }: any) => productAPI.updateProduct(id, data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update product');
    }
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => productAPI.deleteProduct(id),
    onSuccess: () => {
      toast.success('Product deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to delete product');
    }
  });
};
