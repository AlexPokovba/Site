import { Grid, Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import gym from '../assets/gym_shop.jpg';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : keyword ? (
        <Box
          sx={{
            position: 'relative',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), #00c853, #1e4620)',
          }}
        >
          {data.products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product._id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Product product={product} />
            </Grid>
          ))}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: 'relative',
              height: '500px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), #00c853, #1e4620)',
              color: '#fff',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '700px',
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              <Typography
                variant='h1'
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  letterSpacing: '2px',
                }}
              >
                Unlock Your Potential
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontSize: '1.25rem',
                  marginBottom: '30px',
                  lineHeight: '1.5',
                  color: '#ddd',
                }}
              >
                Join our community and elevate your fitness goals. Expert
                advisors, quality and premium products will help you to achive
                your goals.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant='contained'
                  as='a'
                  href='#discover'
                  sx={{
                    textDecoration: 'none',
                    backgroundColor: '#fff',
                    color: '#00c853',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    padding: '12px 36px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: '#e0ffe3',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant='outlined'
                  as='a'
                  href='#items'
                  sx={{
                    textDecoration: 'none',
                    color: '#fff',
                    borderColor: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    padding: '12px 36px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#00c853',
                    },
                  }}
                >
                  Learn More →
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: '50px 20px',
              background: '#1e4620',
              color: '#f5f5f5',
            }}
            id='discover'
          >
            <Grid container spacing={4} alignItems='center'>
              <Grid item xs={12} md={6}>
                <Box
                  component='img'
                  src={gym}
                  alt='Learn More'
                  sx={{
                    width: '100%',
                    borderRadius: '12px',
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 700,
                    marginBottom: '20px',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    textTransform: 'uppercase',
                  }}
                >
                  Discover Our Expertise
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    marginBottom: '30px',
                    color: '#d3d3d3',
                  }}
                >
                  From cutting-edge equipment to tailored fitness plans, we
                  offer everything you need to achieve your goals. Our team of
                  professional trainers is here to guide you every step of the
                  way. Let’s unlock your true potential together.
                </Typography>
                <Button
                  variant='contained'
                  as='a'
                  href='#items'
                  sx={{
                    textDecoration: 'none',
                    backgroundColor: '#00c853',
                    color: '#fff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    padding: '12px 36px',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: '#00b348',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Meta />
          <Box
            sx={{
              padding: '50px 20px',
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 1), #00c853, #1e4620)',
            }}
            id='items'
          >
            <Typography
              variant='h2'
              sx={{
                fontWeight: 700,
                color: '#76ff03',
                textAlign: 'center',
                textTransform: 'uppercase',
                marginBottom: '40px',
              }}
            >
              Latest Products
            </Typography>
            <Grid container spacing={4}>
              {data.products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
