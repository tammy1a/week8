// src/store/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold cart items with id and quantity
  count:0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        // Update quantity if item already exists
        existingItem.quantity += quantity;
      } else {
        // Add new item to the cart
        state.items.push({ id, quantity });
        state.count++;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.count--;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.count=0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state) => state.cart.items;
export const cartItemCount = (state)=>state.cart?.count || 0;

export default cartSlice.reducer;
