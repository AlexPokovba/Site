import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: '#fff',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontWeight: 'bold',
          marginBottom: 3,
          color: '#76ff03',
        }}
      >
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Message severity='info'>
          Your cart is empty.{' '}
          <Link to='/' style={{ color: '#76ff03', textDecoration: 'none' }}>
            Go Back
          </Link>
        </Message>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card
                key={item._id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 14px',
                  marginBottom: 3,
                  backgroundColor: '#1c1c1c',
                  color: '#fff',
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                <CardMedia
                  component='img'
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 2,
                    margin: 1,
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      color: '#76ff03',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    component={Link}
                    to={`/product/${item._id}`}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant='body1'>
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <FormControl
                  sx={{
                    minWidth: 80,
                    marginRight: 2,
                  }}
                >
                  <InputLabel
                    id={`quantity-label-${item._id}`}
                    sx={{
                      color: '#76ff03',
                      '&.Mui-focused': {
                        color: '#76ff03',
                      },
                    }}
                  >
                    Qty
                  </InputLabel>
                  <Select
                    labelId={`quantity-label-${item._id}`}
                    label='Qty'
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    sx={{
                      color: '#fff',
                      backgroundColor: '#1c1c1c',
                      borderRadius: '8px',
                      borderColor: '#76ff03',
                      '& fieldset.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#76ff03',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#76ff03',
                      },
                      '& fieldset.MuiOutlinedInput-notchedOutline:hover': {
                        borderColor: '#76ff03',
                      },
                      '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: '#76ff03',
                        },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#2e2e2e',
                          color: '#fff',
                          borderRadius: '8px',
                          '& .MuiMenuItem-root': {
                            '&.Mui-selected': {
                              backgroundColor: '#76ff03',
                              color: '#121212',
                              '&:hover': {
                                backgroundColor: '#b2ff59',
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton
                  onClick={() => removeFromCartHandler(item._id)}
                  sx={{
                    color: '#f44336',
                    '&:hover': { color: '#ff7961' },
                  }}
                >
                  <FaTrash />
                </IconButton>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                padding: 3,
                backgroundColor: '#1c1c1c',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  color: '#76ff03',
                  marginBottom: 1,
                }}
              >
                Subtotal
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: '#bdbdbd',
                  marginBottom: 2,
                }}
              >
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 'bold',
                  color: '#76ff03',
                  marginBottom: 3,
                }}
              >
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Typography>
              <Button
                fullWidth
                variant='contained'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                sx={{
                  backgroundColor:
                    cartItems.length === 0 ? '#555555' : '#76ff03',
                  color: cartItems.length === 0 ? '#e0e0e0' : '#121212',
                  '&:hover': {
                    backgroundColor:
                      cartItems.length === 0 ? '#555555' : '#64dd03',
                  },
                }}
              >
                Proceed To Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartScreen;
