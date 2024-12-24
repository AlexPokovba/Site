import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Message from './Message';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + itemsPerPage >= products.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(products.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage
    );
  };

  return isLoading ? null : error ? (
    <Message severity='error'>{error?.data?.message || error.error}</Message>
  ) : (
    <Box
      sx={{
        position: 'relative',
        padding: 2,
        backgroundColor: '#121212',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '400px',
      }}
    >
      <Button
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#1c1c1c',
          color: 'lime',
          zIndex: 2,
          borderRadius: '50%',
          minWidth: '40px',
          height: '40px',
          '&:hover': {
            backgroundColor: '#76ff03',
          },
        }}
      >
        <FaChevronLeft />
      </Button>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${(activeIndex / products.length) * 100}%)`,
          width: `${(products.length / itemsPerPage) * 100}%`,
          height: '400px',
        }}
      >
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={product._id}
            sx={{
              height: '100%',
            }}
          >
            <Card
              component={Link}
              to={`/product/${product._id}`}
              sx={{
                backgroundColor: '#1c1c1c',
                color: 'white',
                textDecoration: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(118, 255, 3, 0.5)',
                },
                height: '100%',
              }}
            >
              <CardMedia
                component='img'
                image={`/${product.image}`}
                alt={product.name}
                sx={{
                  height: 200,
                  borderRadius: '8px 8px 0 0',
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant='h6' gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant='body1' color='lime'>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#1c1c1c',
          color: 'lime',
          zIndex: 2,
          borderRadius: '50%',
          minWidth: '40px',
          height: '40px',
          '&:hover': {
            backgroundColor: '#76ff03',
          },
        }}
      >
        <FaChevronRight />
      </Button>
    </Box>
  );
};

export default ProductCarousel;
