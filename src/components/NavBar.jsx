// src/components/Navbar.js
import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartItemCount } from '../store/slices/cartSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const count = useSelector(cartItemCount);

  // Navigate to the cart page
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="fixed"  className='nav-bar'>
      <Toolbar>
        {/* Left Side: App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"} style={{color:'white'}}>
          MyStore</Link>
        </Typography>
        {/* Right Side: Cart Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Badge color="secondary" badgeContent={count}>
              <IconButton color="inherit" onClick={handleCartClick}>
                <ShoppingCartIcon />
              </IconButton>
        </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
