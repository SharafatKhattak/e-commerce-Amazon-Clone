import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  filters: {
    category: string;
    search: string;
    sort: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  filters: {
    category: '',
    search: '',
    sort: ''
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0
  },
  isLoading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },

    setFilters: (
      state,
      action: PayloadAction<Partial<typeof initialState.filters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },

    setPagination: (
      state,
      action: PayloadAction<Partial<typeof initialState.pagination>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
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
  setProducts,
  setSelectedProduct,
  setFilters,
  setPage,
  setPagination,
  setLoading,
  setError
} = productsSlice.actions;

export default productsSlice.reducer;
