import { useQuery, useMutation } from '@tanstack/react-query';
import { orderAPI } from '../utils/apiService';
import toast from 'react-hot-toast';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderAPI.getOrders(),
    staleTime: 5 * 60 * 1000
  });
};

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderAPI.getOrderById(id),
    enabled: !!id
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: any) => orderAPI.createOrder(data),
    onSuccess: () => {
      toast.success('Order created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create order');
    }
  });
};

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (data: any) => orderAPI.createPaymentIntent(data),
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to create payment');
    }
  });
};

export const useConfirmPayment = () => {
  return useMutation({
    mutationFn: (data: any) => orderAPI.confirmPayment(data),
    onSuccess: () => {
      toast.success('Payment confirmed!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Payment failed');
    }
  });
};

export const useCancelOrder = () => {
  return useMutation({
    mutationFn: (id: string) => orderAPI.cancelOrder(id),
    onSuccess: () => {
      toast.success('Order cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to cancel order');
    }
  });
};
