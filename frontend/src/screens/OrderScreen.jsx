import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#121212', color: '#fff' }}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error.data.message}</Message>
      ) : (
        <>
          <Typography
            variant='h4'
            sx={{
              color: '#76ff03',
              fontWeight: 'bold',
              marginBottom: 3,
            }}
          >
            Order {order._id}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                  marginBottom: 3,
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    color: '#76ff03',
                    marginBottom: 2,
                  }}
                >
                  Shipping
                </Typography>
                <Typography variant='body1' sx={{ color: '#bdbdbd' }}>
                  <strong>Name: </strong> {order.user.name}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: '#bdbdbd', marginBottom: 2 }}
                >
                  <strong>Email: </strong>
                  <a
                    href={`mailto:${order.user.email}`}
                    style={{ color: '#76ff03', textDecoration: 'none' }}
                  >
                    {order.user.email}
                  </a>
                </Typography>
                <Typography variant='body1' sx={{ color: '#bdbdbd' }}>
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  {order.isDelivered ? (
                    <Message severity='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message severity='error'>Not Delivered</Message>
                  )}
                </Box>
              </Card>

              <Card
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    color: '#76ff03',
                    marginBottom: 2,
                  }}
                >
                  Order Items
                </Typography>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <List>
                    {order.orderItems.map((item, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 2,
                          borderBottom: '1px solid #333',
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
                            flexGrow: 1,
                            '&:hover': { textDecoration: 'underline' },
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
                <Typography
                  variant='h5'
                  sx={{
                    color: '#76ff03',
                    marginBottom: 2,
                  }}
                >
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
                    <Typography>${order.itemsPrice}</Typography>
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
                    <Typography>${order.shippingPrice}</Typography>
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
                    <Typography>${order.taxPrice}</Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 1,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}
                  >
                    <Typography>Total:</Typography>
                    <Typography>${order.totalPrice}</Typography>
                  </ListItem>
                </List>
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && !order.isDelivered && (
                  <Button
                    fullWidth
                    variant='contained'
                    onClick={deliverHandler}
                    sx={{
                      backgroundColor: '#76ff03',
                      color: '#121212',
                      marginTop: 3,
                      '&:hover': { backgroundColor: '#64dd03' },
                    }}
                  >
                    Mark As Delivered
                  </Button>
                )}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default OrderScreen;
