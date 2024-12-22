import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#1e4620',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
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
          Edit User
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
              variant='outlined'
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#76ff03',
                },
              }}
            />
            <TextField
              fullWidth
              label='Email Address'
              variant='outlined'
              margin='normal'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { color: '#fff' } }}
              InputLabelProps={{ style: { color: '#9e9e9e' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#9e9e9e' },
                  '&:hover fieldset': { borderColor: '#76ff03' },
                  '&.Mui-focused fieldset': { borderColor: '#76ff03' },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#76ff03',
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  sx={{
                    color: '#76ff03',
                    '&.Mui-checked': { color: '#76ff03' },
                  }}
                />
              }
              label='Is Admin'
              sx={{
                color: '#fff',
                marginBottom: 2,
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

export default UserEditScreen;
