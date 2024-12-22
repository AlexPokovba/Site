import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Input,
} from '@mui/material';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#1b3a27',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Button
        component={Link}
        to='/admin/productlist'
        variant='outlined'
        sx={{
          color: '#ffffff',
          borderColor: '#ffffff',
          textTransform: 'none',
          marginBottom: 3,
          '&:hover': {
            backgroundColor: '#76ff03',
            color: '#263238',
          },
        }}
      >
        Go Back
      </Button>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#263238',
          color: '#fff',
        }}
      >
        <Typography
          variant='h4'
          sx={{
            color: '#76ff03',
            fontWeight: 'bold',
            marginBottom: 3,
            textAlign: 'center',
          }}
        >
          Edit Product
        </Typography>

        {loadingUpdate && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <CircularProgress color='primary' />
          </Box>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color='primary' />
          </Box>
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant='outlined'
              margin='normal'
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <TextField
              fullWidth
              label='Price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant='outlined'
              margin='normal'
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
              <Typography
                variant='body2'
                sx={{ marginBottom: 1, color: '#9e9e9e' }}
              >
                Upload Image
              </Typography>
              <Input
                type='file'
                onChange={uploadFileHandler}
                sx={{
                  color: '#9e9e9e',
                  '&::file-selector-button': {
                    backgroundColor: '#76ff03',
                    color: '#263238',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#00b348',
                    },
                  },
                }}
              />
              {loadingUpload && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress color='primary' />
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              label='Brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              variant='outlined'
              margin='normal'
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <TextField
              fullWidth
              label='Count In Stock'
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              variant='outlined'
              margin='normal'
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <TextField
              fullWidth
              label='Category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant='outlined'
              margin='normal'
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <TextField
              fullWidth
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant='outlined'
              margin='normal'
              multiline
              rows={4}
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#76ff03' },
              }}
            />

            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{
                backgroundColor: '#76ff03',
                color: '#263238',
                textTransform: 'none',
                fontWeight: 'bold',
                marginTop: 3,
                '&:hover': { backgroundColor: '#00b348' },
              }}
            >
              Update
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ProductEditScreen;
