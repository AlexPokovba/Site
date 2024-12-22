import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const [tabValue, setTabValue] = useState('1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        padding: '40px 20px',
        background: '#1e4620',
        color: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          marginBottom: '20px',
          textTransform: 'uppercase',
          color: '#76ff03',
          textAlign: 'center',
        }}
      >
        Profile Dashboard
      </Typography>
      <TabContext value={tabValue}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '20px' }}
        >
          <TabList
            onChange={handleTabChange}
            aria-label='Profile Tabs'
            centered
            sx={{
              '& .MuiTab-root': {
                color: '#9e9e9e',
                fontWeight: 'bold',
                '&.Mui-selected': {
                  color: '#76ff03',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#76ff03',
              },
            }}
          >
            <Tab label='Profile' value='1' />
            <Tab label='Orders' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Box
            sx={{
              backgroundColor: '#263238',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                marginBottom: '20px',
                color: '#76ff03',
                textTransform: 'uppercase',
              }}
            >
              User Profile
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                fullWidth
                label='Name'
                variant='outlined'
                margin='normal'
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': { color: '#f5f5f5' },
                  '& .MuiInputLabel-root': { color: '#9e9e9e' },
                }}
              />
              <TextField
                fullWidth
                label='Email Address'
                variant='outlined'
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': { color: '#f5f5f5' },
                  '& .MuiInputLabel-root': { color: '#9e9e9e' },
                }}
              />
              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='outlined'
                margin='normal'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': { color: '#f5f5f5' },
                  '& .MuiInputLabel-root': { color: '#9e9e9e' },
                }}
              />
              <TextField
                fullWidth
                label='Confirm Password'
                type='password'
                variant='outlined'
                margin='normal'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  '& .MuiInputBase-input': { color: '#f5f5f5' },
                  '& .MuiInputLabel-root': { color: '#9e9e9e' },
                }}
              />
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                  marginTop: '20px',
                  backgroundColor: '#00c853',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  '&:hover': { backgroundColor: '#00b348' },
                }}
              >
                Update
              </Button>
              {loadingUpdateProfile && <Loader />}
            </form>
          </Box>
        </TabPanel>
        <TabPanel value='2'>
          <Typography
            variant='h5'
            sx={{
              marginBottom: '20px',
              textTransform: 'uppercase',
              color: '#76ff03',
              textAlign: 'center',
            }}
          >
            My Orders
          </Typography>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: '#263238', color: '#f5f5f5' }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#f5f5f5' }}>ID</TableCell>
                    <TableCell sx={{ color: '#f5f5f5' }}>DATE</TableCell>
                    <TableCell sx={{ color: '#f5f5f5' }}>TOTAL</TableCell>
                    <TableCell sx={{ color: '#f5f5f5' }}>PAID</TableCell>
                    <TableCell sx={{ color: '#f5f5f5' }}>DELIVERED</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell sx={{ color: '#f5f5f5' }}>
                        {order._id}
                      </TableCell>
                      <TableCell sx={{ color: '#f5f5f5' }}>
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell sx={{ color: '#f5f5f5' }}>
                        ${order.totalPrice}
                      </TableCell>
                      <TableCell sx={{ color: '#f5f5f5' }}>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell sx={{ color: '#f5f5f5' }}>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: 'red' }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          component={Link}
                          to={`/order/${order._id}`}
                          sx={{
                            backgroundColor: '#00c853',
                            color: '#fff',
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
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ProfileScreen;
