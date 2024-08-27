// src/components/CartPage.js

import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCartItems, updateQuantity } from "../store/slices/cartSlice";
import { selectProducts } from "../store/slices/productsSlice";
import { Add, Delete, Remove } from "@mui/icons-material";


const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectProducts);
  const cartItemsWithDetails = cartItems.map((item) => {
    return {
      ...products.find((product) => product.id === parseInt(item.id, 10)),
      quantity: item.quantity,
    };
  });

  console.log(cartItemsWithDetails);

  // Calculate the total price
  const total = cartItemsWithDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
    // Handle quantity change
    const handleIncrement = (id) => {
        const item = cartItems.find(item => item.id === id);
        dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
      };
    
      const handleDecrement = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item.quantity > 1) {
          dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
        }
      };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="div" gutterBottom>
        Your Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItemsWithDetails.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => handleDecrement(item.id)} size="small">
                      <Remove />
                    </IconButton>
                    <Typography variant="h6" component="span" sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleIncrement(item.id)} size="small">
                      <Add />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleRemove(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="h6">Total:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CartPage;
