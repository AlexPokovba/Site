import React from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import Paginate from '../../components/Paginate';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { Link, useParams } from 'react-router-dom';

const OrderListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber,
  });
  return (
    <Box sx={{ padding: 4, backgroundColor: '#1e4620' }}>
      <Typography
        variant='h4'
        sx={{
          marginBottom: 3,
          color: '#76ff03',
          fontWeight: 'bold',
          textAlign: 'start',
        }}
      >
        Orders
      </Typography>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 4,
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: '#263238' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    USER
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    DATE
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    TOTAL
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    PAID
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                    DELIVERED
                  </TableCell>
                  <TableCell
                    sx={{ color: '#fff', fontWeight: 'bold' }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.orders.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    sx={{
                      '&:hover': { backgroundColor: '#f0f0f0' },
                    }}
                  >
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user && order.user.name}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        <Typography sx={{ color: 'green', fontWeight: 'bold' }}>
                          {order.paidAt.substring(0, 10)}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            color: 'red',
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <FaTimes />
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        <Typography sx={{ color: 'green', fontWeight: 'bold' }}>
                          {order.deliveredAt.substring(0, 10)}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            color: 'red',
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <FaTimes />
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/order/${order._id}`}
                        variant='contained'
                        size='small'
                        sx={{
                          textTransform: 'none',
                          backgroundColor: '#00c853',
                          '&:hover': { backgroundColor: '#00b348' },
                        }}
                      >
                        Details
                      </Button>
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

export default OrderListScreen;
