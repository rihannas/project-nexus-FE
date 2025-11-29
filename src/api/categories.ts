// src/api/categories.ts
import { apiClient } from './client';
import { Category } from '../types';

// Define the API response structure
interface CategoriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export const categoriesApi = {
  getCategories: () => {
    console.log('🌐 Making categories API call...');
    return apiClient.get<CategoriesResponse>('/api/store/categories/');
  },
};
