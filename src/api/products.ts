import { apiClient } from './client';
import { Product, PaginatedResponse } from '../types';

export const productsApi = {
  getProducts: (params?: {
    page?: number;
    page_size?: number;
    category?: string;
    category__slug?: string;
    category_id?: number;
    min_price?: number;
    max_price?: number;
    variants__size?: string;
    search?: string;
    ordering?: string;
  }) => {
    // Clean up params - remove undefined and empty values
    const cleanParams: any = {};
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== '' && value !== null) {
          cleanParams[key] = value;
        }
      });
    }

    console.log('🌐 API Call - Products with params:', cleanParams);
    return apiClient.get<PaginatedResponse<Product>>('/api/store/products/', {
      params: cleanParams,
    });
  },

  getProduct: (slug: string) => {
    return apiClient.get<Product>(`/api/store/products/${slug}/`);
  },

  getFeaturedProducts: () => {
    return apiClient.get<PaginatedResponse<Product>>('/api/store/products/', {
      params: { page_size: 8 },
    });
  },
};
