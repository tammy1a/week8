import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const { title, price, description , category, image, rating } = product;
  const dispatch = useDispatch();

  return (
    <Card sx={{ maxWidth: 200, m: 1 }}>
      <CardMedia
         component="img"
         sx={{
           height: 140, // Fixed height
           objectFit: "contain", // Ensures the image covers the area
           width: '100%', // Makes the image fit the width of the CardMedia container
         }}
         image={image}
         alt={title}
      />
      <CardContent sx={{ padding: '8px' }}>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          sx={{ fontSize: '0.9rem', lineHeight: '1.2', textAlign: 'left' }}
        >
          {title.substring(0,22)+".."}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.8rem', lineHeight: '1.2', textAlign: 'left' }}
        >
          {description.substring(0,100) + "..."}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ mt: 1, fontSize: '1rem', textAlign: 'left' }}
        >
          ${price.toFixed(2)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.8rem', textAlign: 'left' }}
        >
          Category: {category}
        </Typography>
        {/* <Rating
          name="product-rating"
          value={rating.rate}
          precision={0.1}
          readOnly
          sx={{ mt: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.8rem', textAlign: 'left' }}
        >
          ({rating.count} reviews)
        </Typography> */}
      </CardContent>
      <CardActions sx={{ height:"50px !important" ,paddingBottom: '5', justifyContent: 'space-around' }}>
        <Button size="small" color="primary" sx={{ fontSize: '0.8rem' }} onClick={()=>dispatch(addToCart({id:(product.id),quantity:1}))}>
          Add to Cart
        </Button>
        <Button size="small" color="primary" sx={{ fontSize: '0.8rem', }}>
        
          <Link to={`./${product.id}`}>  <Typography variant='p'>View Details</Typography></Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
