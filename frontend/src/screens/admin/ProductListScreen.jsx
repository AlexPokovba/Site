import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error.data.message}</Message>
  ) : (
    <Box sx={{ padding: 4, backgroundColor: '#1e4620' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'flex-start',
          marginBottom: 2,
        }}
      >
        <Typography
          variant='h4'
          sx={{
            marginBottom: 3,
            color: '#76ff03',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Products
        </Typography>
        <Button
          variant='contained'
          startIcon={<FaPlus />}
          onClick={createProductHandler}
          sx={{
            backgroundColor: '#00c853',
            color: '#fff',
            maxHeight: '40px',
            '&:hover': {
              backgroundColor: '#00b348',
            },
          }}
        >
          Create Product
        </Button>
      </Box>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#263238' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    NAME
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    PRICE
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    CATEGORY
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    BRAND
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/admin/product/${product._id}/edit`}
                        sx={{ color: '#00c853', marginRight: 1 }}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteHandler(product._id)}
                        sx={{ color: '#e53935' }}
                      >
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </Box>
  );
};

export default ProductListScreen;
