// src/store/CartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Omit<CartItem, 'quantity'>; amount: number }>) => {
      console.log('Adding to cart:', action.payload);
      const existing = state.items.find(i => i.id === action.payload.product.id);
      if (existing) {
        existing.quantity += action.payload.amount;
      } else {
        state.items.push({ ...action.payload.product, quantity: action.payload.amount });
      }
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },

  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;