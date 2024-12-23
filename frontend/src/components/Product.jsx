import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
      component={Link}
      to={`/product/${product._id}`}
      sx={{
        textDecoration: 'none',
        borderRadius: '12px',
        backgroundColor: '#1c1c1c',
        width: '100%',
        color: '#e0e0e0',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component='img'
        image={`${product.image}`}
        alt={product.name}
        sx={{
          height: 200,
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backgroundColor: '#1c1c1c',
          height: '150px',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 500,
            fontSize: '1.1rem',
            color: '#f5f5f5',
            textAlign: 'center',
          }}
        >
          {product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
            color: '#76ff03',
          }}
        >
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='#76ff03'
          />
        </Box>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            fontSize: '1.3rem',
            color: '#76ff03',
          }}
        >
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
