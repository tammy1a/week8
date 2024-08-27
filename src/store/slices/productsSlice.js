import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  products: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Define an async thunk for fetching products from the API
const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
});

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk
export { fetchProducts };

// Export the selector for accessing products
export const selectProducts = (state) => state.products.products;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

// Export the reducer to be used in the store
export default productsSlice.reducer;
export const selectProductById = (state, id) =>
  state.products.products.find((product) => product.id === parseInt(id, 10));
