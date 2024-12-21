import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  Button,
  Divider,
} from '@mui/material';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
  }, [cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#121212', color: '#fff' }}>
      <CheckoutSteps step3 />
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              backgroundColor: '#1c1c1c',
              padding: 3,
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typography variant='h5' sx={{ color: '#76ff03', marginBottom: 2 }}>
              Shipping
            </Typography>
            <Typography variant='body1' sx={{ color: '#bdbdbd' }}>
              <strong>Address:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </Typography>
          </Card>

          <Card
            sx={{
              backgroundColor: '#1c1c1c',
              padding: 3,
              borderRadius: 2,
              marginTop: 3,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typography variant='h5' sx={{ color: '#76ff03', marginBottom: 2 }}>
              Order Items
            </Typography>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <List>
                {cart.cartItems.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid #333',
                      padding: 2,
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box
                      component='img'
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        objectFit: 'cover',
                        marginRight: 2,
                      }}
                    />
                    <Typography
                      component={Link}
                      to={`/product/${item.product}`}
                      sx={{
                        color: '#76ff03',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                        flexGrow: 1,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant='body2' sx={{ color: '#bdbdbd' }}>
                      {item.qty} x ${item.price} = $
                      {(item.qty * item.price).toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: '#1c1c1c',
              padding: 3,
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typography variant='h5' sx={{ color: '#76ff03', marginBottom: 2 }}>
              Order Summary
            </Typography>
            <Divider sx={{ backgroundColor: '#333', marginBottom: 2 }} />
            <List>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 1,
                  color: '#bdbdbd',
                }}
              >
                <Typography>Items:</Typography>
                <Typography>${cart.itemsPrice}</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 1,
                  color: '#bdbdbd',
                }}
              >
                <Typography>Shipping:</Typography>
                <Typography>${cart.shippingPrice}</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 1,
                  color: '#bdbdbd',
                }}
              >
                <Typography>Tax:</Typography>
                <Typography>${cart.taxPrice}</Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 1,
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                <Typography>Total:</Typography>
                <Typography>${cart.totalPrice}</Typography>
              </ListItem>
            </List>
            {error && (
              <Message severity='error' sx={{ marginTop: 2 }}>
                {error.data.message}
              </Message>
            )}
            <Button
              fullWidth
              variant='contained'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              sx={{
                backgroundColor: '#76ff03',
                color: '#121212',
                marginTop: 3,
                '&:hover': { backgroundColor: '#64dd03' },
              }}
            >
              Place Order
            </Button>
            {isLoading && <Loader />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrderScreen;
