import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
      <Button
        component={Link}
        to='/'
        variant='outlined'
        sx={{
          color: '#fff',
          borderColor: '#76ff03',
          marginBottom: 3,
          '&:hover': {
            borderColor: '#b2ff59',
          },
        }}
      >
        Go Back
      </Button>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  overflow: 'hidden',
                  borderRadius: 4,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ marginBottom: 4 }}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 600,
                    color: '#76ff03',
                  }}
                  gutterBottom
                >
                  {product.name}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ marginBottom: 2, color: '#bdbdbd' }}
                >
                  {product.description}
                </Typography>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  sx={{
                    marginBottom: 2,
                  }}
                />
                <Typography variant='h6' sx={{ color: '#76ff03' }}>
                  Price: <strong>${product.price}</strong>
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    marginTop: 1,
                    fontWeight: 500,
                    color: product.countInStock > 0 ? '#76ff03' : '#f44336',
                  }}
                >
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Typography>
              </Box>

              {product.countInStock > 0 && (
                <FormControl
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    position: 'relative',
                  }}
                >
                  <InputLabel
                    id='quantity-label'
                    sx={{
                      color: '#76ff03',
                      '&.Mui-focused': {
                        color: '#76ff03',
                      },
                    }}
                  >
                    Quantity
                  </InputLabel>
                  <Select
                    labelId='quantity-label'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    label='Quantity'
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
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Button
                fullWidth
                variant='contained'
                sx={{
                  backgroundColor: '#76ff03',
                  color: '#121212',
                  marginTop: 2,
                  '&.MuiButton-root.Mui-disabled': {
                    backgroundColor: '#76ff0330',
                  },
                }}
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                {product.countInStock === 0 ? 'Out Of Stock' : 'Add To Cart'}
              </Button>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: 4 }}>
            <Box
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                width: '100%',
                gap: 22,
              }}
            >
              {userInfo && (
                <Box>
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#76ff03',
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    Leave a Comment
                  </Typography>
                  <Box
                    component='form'
                    onSubmit={submitHandler}
                    sx={{
                      backgroundColor: '#1c1c1c',
                      borderRadius: 3,
                      padding: 3,
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <FormControl
                      fullWidth
                      sx={{
                        marginBottom: 2,
                        position: 'relative',
                      }}
                    >
                      <InputLabel
                        id='quantity-label'
                        sx={{
                          color: '#76ff03',
                          '&.Mui-focused': {
                            color: '#76ff03',
                          },
                        }}
                      >
                        Rating
                      </InputLabel>
                      <Select
                        labelId='rating-label'
                        label='Rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
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
                        <MenuItem value='1'>1 - Poor</MenuItem>
                        <MenuItem value='2'>2 - Fair</MenuItem>
                        <MenuItem value='3'>3 - Good</MenuItem>
                        <MenuItem value='4'>4 - Very Good</MenuItem>
                        <MenuItem value='5'>5 - Excellent</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label='Your Comment'
                      multiline
                      rows={4}
                      variant='outlined'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{
                        backgroundColor: '#1c1c1c',
                        color: '#fff',
                        borderRadius: 2,
                        '& label': {
                          color: '#76ff03',
                        },
                        '& label.Mui-focused': {
                          color: '#76ff03',
                        },
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: '#76ff03',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b2ff59',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#76ff03',
                          },
                        },
                      }}
                    />
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        marginTop: 3,
                        backgroundColor: '#76ff03',
                        color: '#121212',
                        '&:hover': {
                          backgroundColor: '#64dd03',
                        },
                      }}
                    >
                      Submit Review
                    </Button>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  width: '400px',
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    color: '#76ff03',
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  Reviews
                </Typography>
                {product.reviews.length === 0 ? (
                  <Message severity='warning'>No reviews yet.</Message>
                ) : (
                  product.reviews.map((review) => (
                    <Box
                      key={review._id}
                      sx={{
                        backgroundColor: '#1c1c1c',
                        width: '100%',
                        padding: 2,
                        borderRadius: 2,
                        marginBottom: 2,
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{ color: '#76ff03', fontWeight: 600 }}
                      >
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} />
                      <Typography
                        variant='body2'
                        sx={{ color: '#bdbdbd', marginTop: 1 }}
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: '#fff', marginTop: 1 }}
                      >
                        {review.comment}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ProductScreen;
