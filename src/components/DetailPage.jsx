// components/ProductDetails.js

import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Rating,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../store/slices/productsSlice";
import { ArrowBack } from "@mui/icons-material";
import { addToCart } from "../store/slices/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // Fetch the product from the Redux store using the selector
  const product = useSelector((state) => selectProductById(state, id));
  // Display loading or error state if needed
  if (!product) {
    return (
      <Container>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Box mt={2} mb={4} display="flex" alignItems="center">
        <IconButton onClick={()=>navigate(-1)} size="large">
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="div" ml={2}>
          {product.title}
        </Typography>
      </Box>

      <Grid container spacing={4} mt={4} alignItems="flex-start">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: "contain", height: "auto", maxHeight: "500px" }}
          />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="left"
              >
                {product.title}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                align="left"
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Box mt={1} align="left">
                <Rating
                  name="read-only"
                  value={product.rating.rate}
                  precision={0.1}
                  readOnly
                />
                <br></br>
                <Typography variant="p" color="text.secondary" align="left">
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
              <Typography variant="body1" mt={2} paragraph align="left">
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="left">
                Category: <strong>{product.category}</strong>
              </Typography>

              {/* Quantity Selector */}
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                border={0}
                borderColor="grey.400"
                borderRadius="4px"
                p={1}
              >
                <IconButton onClick={handleDecrement} size="small">
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ mx: 2, textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrement} size="small">
                  <AddIcon />
                </IconButton>
              </Box>

              <Box mt={2} textAlign={"left"}>
                <Button variant="contained" color="primary" size="large" onClick={()=>dispatch(addToCart({id,quantity}))}>
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
