import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/placeorder');
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        backgroundColor: '#1c1c1c',
        color: '#fff',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <CheckoutSteps step2 />
      <Typography
        variant='h4'
        sx={{
          fontWeight: 'bold',
          color: '#76ff03',
          marginBottom: 3,
        }}
      >
        Shipping
      </Typography>
      <form onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label='Address'
              fullWidth
              variant='outlined'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                '& label': { color: '#76ff03' },
                '& label.Mui-focused': { color: '#76ff03' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#76ff03' },
                  '&:hover fieldset': { borderColor: '#b2ff59' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='City'
              fullWidth
              variant='outlined'
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{
                '& label': { color: '#76ff03' },
                '& label.Mui-focused': { color: '#76ff03' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#76ff03' },
                  '&:hover fieldset': { borderColor: '#b2ff59' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Postal Code'
              fullWidth
              variant='outlined'
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              sx={{
                '& label': { color: '#76ff03' },
                '& label.Mui-focused': { color: '#76ff03' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#76ff03' },
                  '&:hover fieldset': { borderColor: '#b2ff59' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Country'
              fullWidth
              variant='outlined'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              sx={{
                '& label': { color: '#76ff03' },
                '& label.Mui-focused': { color: '#76ff03' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#76ff03' },
                  '&:hover fieldset': { borderColor: '#b2ff59' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: '#76ff03',
                color: '#121212',
                '&:hover': {
                  backgroundColor: '#64dd03',
                },
                padding: '10px',
                fontWeight: 'bold',
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ShippingScreen;
