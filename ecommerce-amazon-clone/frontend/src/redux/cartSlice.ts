import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  product: any;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product._id !== action.payload
      );

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (i) => i.product._id === action.payload.productId
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },

    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setCart,
  setLoading,
  setError
} = cartSlice.actions;

export default cartSlice.reducer;
