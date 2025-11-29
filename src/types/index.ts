export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  product_count: number;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_main: boolean;
}

export interface ProductVariant {
  id: string;
  size: string;
  price: string;
  inventory_quantity: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category: Category;
  main_image?: string;
  images?: ProductImage[];
  variants: ProductVariant[];
  price_range?: {
    min: string;
    max: string;
  };
  available_sizes?: string[];
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    size: string;
    search: string;
    ordering: string;
  };
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

export interface PaginatedCategoriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}
