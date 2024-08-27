import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice'; // Adjust the path if necessary
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart:cartReducer,
    
    
  },
});

export default store;
