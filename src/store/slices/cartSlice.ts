import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product, ProductVariant } from '../../types';

const loadCartFromStorage = (): CartState => {
  try {
    const stored = localStorage.getItem('africlothing-cart');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
  }
  return { items: [], total: 0 };
};

const saveCartToStorage = (cart: CartState) => {
  try {
    localStorage.setItem('africlothing-cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + parseFloat(item.variant.price) * item.quantity;
  }, 0);
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        variant: ProductVariant;
        quantity: number;
      }>
    ) => {
      const { product, variant, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, variant, quantity });
      }

      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: number; variantId: string }>
    ) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.product.id === productId && item.variant.id === variantId)
      );

      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId: string;
        quantity: number;
      }>
    ) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product.id === productId && item.variant.id === variantId
      );

      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(
            (i) => !(i.product.id === productId && i.variant.id === variantId)
          );
        }
      }

      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
