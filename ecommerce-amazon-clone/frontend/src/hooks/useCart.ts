import { useQuery, useMutation } from '@tanstack/react-query';
import { cartAPI } from '../utils/apiService';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await cartAPI.getCart();
      dispatch(setCart(data));
      return data;
    }
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: any) => cartAPI.addToCart(data),
    onSuccess: () => {
      toast.success('Item added to cart!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to add to cart');
    }
  });
};

export const useUpdateCartItem = () => {
  return useMutation({
    mutationFn: (data: any) => cartAPI.updateCartItem(data),
    onSuccess: () => {
      toast.success('Cart updated!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update cart');
    }
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: (productId: string) => cartAPI.removeFromCart(productId),
    onSuccess: () => {
      toast.success('Item removed from cart');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to remove item');
    }
  });
};

export const useClearCart = () => {
  return useMutation({
    mutationFn: () => cartAPI.clearCart(),
    onSuccess: () => {
      toast.success('Cart cleared');
    }
  });
};
