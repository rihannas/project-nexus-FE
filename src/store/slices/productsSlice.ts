import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../../api/products';
import { Product, PaginatedResponse, ProductsState } from '../../types';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    size: '',
    search: '',
    ordering: '-created_at',
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params?: any) => {
    try {
      console.log('🔄 Fetching products with params:', params);
      const response = await productsApi.getProducts(params);
      console.log('✅ API Response received:', response);
      return response.data;
    } catch (error: any) {
      console.error('❌ API Error:', error);
      throw error;
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (slug: string) => {
    const response = await productsApi.getProduct(slug);
    return response.data;
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    const response = await productsApi.getProducts({ page_size: 8 });
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<ProductsState['filters']>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('🔄 Products fetch pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('✅ Products fetch fulfilled:', action.payload);
        state.loading = false;
        state.items = action.payload.results || [];
        state.pagination = {
          count: action.payload.count || 0,
          next: action.payload.next || null,
          previous: action.payload.previous || null,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error('❌ Products fetch rejected:', action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
        state.items = [];
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.items = action.payload.results;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
