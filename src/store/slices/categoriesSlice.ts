import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesApi } from '../../api/categories';
import { CategoriesState, Category } from '../../types';

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    console.log('🔄 Fetching categories from API...');
    const response = await categoriesApi.getCategories();
    console.log('✅ Categories API response:', response.data);

    // Extract the results array from the API response
    const categoriesData = response.data.results || response.data || [];
    console.log('📋 Extracted categories:', categoriesData);

    return categoriesData;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        console.log('⏳ Categories fetch pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('✅ Categories fetch fulfilled:', action.payload);
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
        console.log('📦 Categories in state:', state.items);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error('❌ Categories fetch rejected:', action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
        state.items = [];
      });
  },
});

export default categoriesSlice.reducer;
