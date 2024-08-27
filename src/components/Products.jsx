import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "../store/slices/productsSlice"; // Adjust the path if necessary
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Product List</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "90vw",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
